/*
  <zodiac-slides> (sections/zodiac-slides.liquid), 2026-10-05 (owner).
  Autoplay every 3 s (data-interval) with a CSS fade, while the slideshow is on screen and
  untouched. Two kinds of stop:
  - a tap on the picture, a swipe, an arrow, a line indicator or the left/right keys stop
    it until the visitor scrolls away and comes back (then it starts again), or presses Play;
  - the Pause button holds it, also through scrolling away and back; only Play restarts it.
  Mouse hover and keyboard focus (not on the button) pause it while they last; it stops
  while off screen. With prefers-reduced-motion it starts paused and never restarts by
  itself; Play can still start it. A real link on a slide opens normally. Moving wraps
  round. Inactive slides are inert; a polite live region announces manual moves.
*/
if (!customElements.get('zodiac-slides')) {
  customElements.define(
    'zodiac-slides',
    class ZodiacSlides extends HTMLElement {
      connectedCallback() {
        this.slides = Array.from(this.querySelectorAll('.zodiac__slide'));
        this.dotsBox = this.querySelector('.zodiac__dots');
        if (this.slides.length < 2 || !this.dotsBox) return;

        this.dots = Array.from(this.querySelectorAll('[data-zodiac-go]'));
        this.status = this.querySelector('[data-zodiac-status]');
        this.interval = Number(this.dataset.interval) || 3000;
        this.index = 0;
        this.timer = null;
        this.hovered = false;
        this.focused = false;
        this.visible = false;
        this.prev = this.querySelector('[data-zodiac-prev]');
        this.next = this.querySelector('[data-zodiac-next]');

        this.classList.add('zodiac--js');
        this.dotsBox.hidden = false;
        this.toggle = this.querySelector('[data-zodiac-toggle]');
        this.userPaused = false;
        if (this.toggle) {
          this.toggle.hidden = false;
          this.toggle.addEventListener('click', () => {
            if (this.userPaused || this.stopped) {
              this.userPaused = false;
              this.stopped = false;
            } else {
              this.userPaused = true;
            }
            this.sync();
          });
        }
        [this.prev, this.next].forEach((arrow) => arrow && (arrow.hidden = false));
        if (this.prev) this.prev.addEventListener('click', () => this.manual(this.index - 1));
        if (this.next) this.next.addEventListener('click', () => this.manual(this.index + 1));

        this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.stopped = this.reduce;

        this.dots.forEach((dot) => dot.addEventListener('click', () => this.manual(Number(dot.dataset.zodiacGo))));

        // Hover over the pictures and visible keyboard focus pause it while they last.
        this.addEventListener('mouseenter', () => {
          this.hovered = true;
          this.sync();
        });
        this.addEventListener('mouseleave', () => {
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
            var nowVisible = entries[0].isIntersecting;
            // Back on screen after leaving it: autoplay starts again (not with reduced motion).
            // Back on screen after leaving it: autoplay starts again, unless the visitor pressed
            // Pause (or prefers reduced motion).
            if (nowVisible && !this.visible && !this.reduce && !this.userPaused) this.stopped = false;
            this.visible = nowVisible;
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
        var running = !this.stopped && !this.userPaused && !this.hovered && !this.focused && this.visible && !document.hidden;
        var held = this.stopped || this.userPaused;
        this.classList.toggle('is-paused', held);
        if (this.toggle) {
          this.toggle.setAttribute('aria-label', held ? this.toggle.dataset.labelPlay : this.toggle.dataset.labelPause);
        }
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
