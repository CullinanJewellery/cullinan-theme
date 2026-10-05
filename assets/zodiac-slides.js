/*
  <zodiac-slides> (sections/zodiac-slides.liquid), 2026-10-05.
  Autoplay every 3 s (data-interval; owner, was 6) with a CSS fade. It pauses while the
  pointer is over the pictures or keyboard focus is inside, and while the slideshow is off
  screen or the tab is hidden. Tapping the picture, swiping, choosing a line indicator or the
  left/right arrow keys stop it until the pause/play button is pressed; a real button on the
  slide (a link) still opens normally. With prefers-reduced-motion it starts paused.
  No arrow buttons or counter; moving wraps round (the signs are a circle). Inactive slides
  are inert. A polite live region announces the slide only after a manual move.
*/
if (!customElements.get('zodiac-slides')) {
  customElements.define(
    'zodiac-slides',
    class ZodiacSlides extends HTMLElement {
      connectedCallback() {
        this.slides = Array.from(this.querySelectorAll('.zodiac__slide'));
        this.controls = this.querySelector('.zodiac__controls');
        if (this.slides.length < 2 || !this.controls) return;

        this.toggle = this.querySelector('[data-zodiac-toggle]');
        this.dotsBox = this.querySelector('.zodiac__dots');
        this.dots = Array.from(this.querySelectorAll('[data-zodiac-go]'));
        this.status = this.querySelector('[data-zodiac-status]');
        this.interval = Number(this.dataset.interval) || 3000;
        this.index = 0;
        this.timer = null;
        this.hovered = false;
        this.focused = false;
        this.visible = true;

        this.classList.add('zodiac--js');
        this.controls.hidden = false;
        if (this.dotsBox) this.dotsBox.hidden = false;

        var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
        this.stopped = reduce.matches;

        this.toggle.addEventListener('click', () => {
          this.stopped = !this.stopped;
          this.sync();
        });

        this.dots.forEach((dot) => dot.addEventListener('click', () => this.manual(Number(dot.dataset.zodiacGo))));

        // Hover pauses over the pictures only, so pressing play under them is not undone by
        // the pointer still being there; keyboard focus pauses, except on the play button.
        var frame = this.querySelector('.zodiac__viewport');
        frame.addEventListener('mouseenter', () => {
          this.hovered = true;
          this.sync();
        });
        frame.addEventListener('mouseleave', () => {
          this.hovered = false;
          this.sync();
        });
        this.addEventListener('focusin', (event) => {
          var target = event.target;
          this.focused = !target.closest('[data-zodiac-toggle]') && target.matches(':focus-visible');
          this.sync();
        });
        this.addEventListener('focusout', (event) => {
          if (this.contains(event.relatedTarget)) return;
          this.focused = false;
          this.sync();
        });

        this.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowLeft') this.manual(this.index - 1);
          else if (event.key === 'ArrowRight') this.manual(this.index + 1);
          else return;
          event.preventDefault();
        });

        // Swipe: touch or pen, 40px or more and more sideways than up or down.
        var area = this.querySelector('.zodiac__viewport');
        var start = null;
        var swipedAt = 0;
        area.addEventListener('pointerdown', (event) => {
          if (event.pointerType === 'mouse') return;
          start = { x: event.clientX, y: event.clientY };
        });
        area.addEventListener('pointerup', (event) => {
          if (!start) return;
          var dx = event.clientX - start.x;
          var dy = event.clientY - start.y;
          start = null;
          if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
          swipedAt = Date.now();
          this.manual(this.index + (dx < 0 ? 1 : -1));
        });
        area.addEventListener('pointercancel', () => (start = null));
        // A tap on the picture (not on its link) stops autoplay; the link itself opens as usual.
        area.addEventListener('click', (event) => {
          if (event.target.closest('a, button')) return;
          this.stopped = true;
          this.sync();
        });
        // A swipe that ends on the button must not also follow it.
        area.addEventListener(
          'click',
          (event) => {
            if (Date.now() - swipedAt > 500) return;
            event.preventDefault();
            event.stopPropagation();
          },
          true
        );

        if ('IntersectionObserver' in window) {
          new IntersectionObserver((entries) => {
            this.visible = entries[0].isIntersecting;
            this.sync();
          }).observe(this);
        }
        document.addEventListener('visibilitychange', () => this.sync());

        // Theme editor: selecting a slide shows it and holds it there.
        document.addEventListener('shopify:block:select', (event) => {
          var i = this.slides.indexOf(event.target);
          if (i < 0) return;
          this.stopped = true;
          this.show(i, false);
        });

        this.show(0, false);
      }

      manual(target) {
        this.stopped = true;
        this.show(target, true);
      }

      show(target, announce) {
        var count = this.slides.length;
        this.index = ((target % count) + count) % count;
        this.slides.forEach((slide, i) => {
          var active = i === this.index;
          slide.classList.toggle('is-active', active);
          slide.inert = !active;
          slide.setAttribute('aria-hidden', String(!active));
        });
        this.dots.forEach((dot, i) => {
          if (i === this.index) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
        if (announce && this.status) {
          var heading = this.slides[this.index].dataset.heading;
          this.status.textContent = this.index + 1 + ' от ' + count + (heading ? ': ' + heading : '');
        }
        this.sync();
      }

      sync() {
        var running = !this.stopped && !this.hovered && !this.focused && this.visible && !document.hidden;
        this.classList.toggle('is-paused', this.stopped);
        this.toggle.setAttribute(
          'aria-label',
          this.stopped ? this.toggle.dataset.labelPlay : this.toggle.dataset.labelPause
        );
        clearTimeout(this.timer);
        this.timer = null;
        if (running) {
          this.timer = setTimeout(() => this.show(this.index + 1, false), this.interval);
        }
      }

      disconnectedCallback() {
        clearTimeout(this.timer);
      }
    }
  );
}
