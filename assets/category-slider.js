/*
  <category-slider> (sections/category-mosaic.liquid), 2026-10-05.
  Phones only: the line indicators go to their slide and mark the current one (the
  previous/next arrows were removed 2026-10-07; the code still handles them if present); the track is a focusable region (arrow keys scroll it). No autoplay.
  Smooth scrolling only without reduced motion. Nothing happens from 750px up.
*/
if (!customElements.get('category-slider')) {
  customElements.define(
    'category-slider',
    class CategorySlider extends HTMLElement {
      connectedCallback() {
        this.track = this.querySelector('.mosaic-slider__track');
        this.controls = this.querySelector('.mosaic-slider__controls');
        this.prev = this.querySelector('[data-cat-prev]');
        this.next = this.querySelector('[data-cat-next]');
        this.slides = Array.from(this.track ? this.track.children : []);
        if (!this.track || !this.controls || this.slides.length < 2) return;

        this.phone = window.matchMedia('(max-width: 749px)');
        this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

        this.lines = Array.from(this.querySelectorAll('[data-cat-go]'));
        this.lines.forEach((line) => line.addEventListener('click', () => this.goTo(Number(line.dataset.catGo))));
        if (this.prev) this.prev.addEventListener('click', () => this.step(-1));
        if (this.next) this.next.addEventListener('click', () => this.step(1));
        this.track.addEventListener('scroll', () => this.update(), { passive: true });
        this.onMedia = () => this.setup();
        this.phone.addEventListener('change', this.onMedia);
        this.setup();
      }

      disconnectedCallback() {
        if (this.phone) this.phone.removeEventListener('change', this.onMedia);
      }

      setup() {
        const on = this.phone.matches;
        this.controls.hidden = !on;
        if (on) this.track.setAttribute('tabindex', '0');
        else this.track.removeAttribute('tabindex');
        this.update();
      }

      offsetOf(slide) {
        return slide.offsetLeft - this.slides[0].offsetLeft;
      }

      current() {
        const x = this.track.scrollLeft;
        let best = 0;
        let bestDist = Infinity;
        this.slides.forEach((slide, i) => {
          const d = Math.abs(this.offsetOf(slide) - x);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        return best;
      }

      step(dir) {
        this.goTo(this.current() + dir);
      }

      goTo(index) {
        const i = Math.max(0, Math.min(this.slides.length - 1, index));
        this.track.scrollTo({ left: this.offsetOf(this.slides[i]), behavior: this.reduce.matches ? 'auto' : 'smooth' });
      }

      update() {
        const max = this.track.scrollWidth - this.track.clientWidth;
        const atEnd = this.track.scrollLeft >= max - 2;
        if (this.prev) this.prev.disabled = this.track.scrollLeft <= 2;
        if (this.next) this.next.disabled = atEnd;
        // At the far end the last slide may not reach the start edge; count it as current.
        const c = atEnd ? this.slides.length - 1 : this.current();
        (this.lines || []).forEach((line, i) => {
          if (i === c) line.setAttribute('aria-current', 'true');
          else line.removeAttribute('aria-current');
        });
      }
    }
  );
}
