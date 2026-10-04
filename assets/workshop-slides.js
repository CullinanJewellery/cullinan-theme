/*
  <workshop-slides> (sections/workshop-slides.liquid), 2026-10-04.
  Manual only: arrows, a step indicator, swiping on touch screens, ArrowLeft /
  ArrowRight / Home / End while focus is inside. Inactive slides are `inert`, so
  Tab never reaches them. The fade is CSS and off under reduced motion.
*/
if (!customElements.get('workshop-slides')) {
  customElements.define(
    'workshop-slides',
    class WorkshopSlides extends HTMLElement {
      connectedCallback() {
        this.slides = Array.from(this.querySelectorAll('.workshop__slide'));
        this.controls = this.querySelector('.workshop__controls');
        if (this.slides.length < 2 || !this.controls) return;

        this.prev = this.querySelector('[data-workshop-prev]');
        this.next = this.querySelector('[data-workshop-next]');
        this.dots = Array.from(this.querySelectorAll('[data-workshop-go]'));
        this.status = this.querySelector('[data-workshop-status]');
        this.index = 0;

        this.classList.add('workshop--js');
        this.controls.hidden = false;

        this.prev.addEventListener('click', () => this.go(this.index - 1));
        this.next.addEventListener('click', () => this.go(this.index + 1));
        this.dots.forEach((dot) => dot.addEventListener('click', () => this.go(Number(dot.dataset.workshopGo))));

        this.addEventListener('keydown', (event) => {
          if (event.target.closest('input, textarea, select')) return;
          const map = { ArrowLeft: this.index - 1, ArrowRight: this.index + 1, Home: 0, End: this.slides.length - 1 };
          if (!(event.key in map)) return;
          event.preventDefault();
          this.go(map[event.key]);
        });

        // Swipe: horizontal movement of 40px or more, more sideways than up or down, touch or pen only.
        const area = this.querySelector('.workshop__slides');
        let start = null;
        area.addEventListener('pointerdown', (event) => {
          if (event.pointerType === 'mouse') return;
          start = { x: event.clientX, y: event.clientY };
        });
        area.addEventListener('pointerup', (event) => {
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          start = null;
          if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
          this.go(this.index + (dx < 0 ? 1 : -1));
        });
        area.addEventListener('pointercancel', () => (start = null));

        // Theme editor: selecting a slide block shows it.
        document.addEventListener('shopify:block:select', (event) => {
          const i = this.slides.indexOf(event.target);
          if (i > -1) this.go(i);
        });

        this.render(false);
      }

      go(target) {
        const i = Math.max(0, Math.min(this.slides.length - 1, target));
        if (i === this.index) return;
        this.index = i;
        this.render(true);
      }

      render(announce) {
        this.slides.forEach((slide, i) => {
          const active = i === this.index;
          slide.classList.toggle('is-active', active);
          slide.inert = !active;
          slide.setAttribute('aria-hidden', String(!active));
        });
        this.dots.forEach((dot, i) => {
          if (i === this.index) dot.setAttribute('aria-current', 'step');
          else dot.removeAttribute('aria-current');
        });
        this.prev.disabled = this.index === 0;
        this.next.disabled = this.index === this.slides.length - 1;
        // A button that just became disabled would drop keyboard focus: hand it to the other arrow.
        if (document.activeElement === this.next && this.next.disabled) this.prev.focus();
        if (document.activeElement === this.prev && this.prev.disabled) this.next.focus();
        if (announce && this.status) {
          const slide = this.slides[this.index];
          const heading = slide.dataset.heading ? ': ' + slide.dataset.heading : '';
          this.status.textContent = 'Стъпка ' + (this.index + 1) + ' от ' + this.slides.length + heading;
        }
      }
    }
  );
}
