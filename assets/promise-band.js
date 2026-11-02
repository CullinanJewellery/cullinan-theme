/*
  Promise band on phones (sections/cj-promise-band.liquid, 2026-11-02, owner: as beornare.com, „the lines down when
  you swipe“). The list scrolls sideways (CSS scroll-snap); the two thin arrows under it move it one item at a time
  and fade at either end. Above 749px the list is a plain grid and the arrows are hidden by CSS.
*/
if (!customElements.get('promise-slider')) {
  customElements.define(
    'promise-slider',
    class PromiseSlider extends HTMLElement {
      connectedCallback() {
        this.list = this.querySelector('.promise-band__list');
        this.prev = this.querySelector('[data-promise-prev]');
        this.next = this.querySelector('[data-promise-next]');
        if (!this.list || !this.prev || !this.next) return;
        this.prev.addEventListener('click', () => this.move(-1));
        this.next.addEventListener('click', () => this.move(1));
        this.list.addEventListener('scroll', () => this.update(), { passive: true });
        window.addEventListener('resize', () => this.update());
        this.update();
      }

      step() {
        const item = this.list.firstElementChild;
        if (!item) return this.list.clientWidth;
        const gap = parseFloat(getComputedStyle(this.list).columnGap) || 0;
        return item.getBoundingClientRect().width + gap;
      }

      move(direction) {
        this.list.scrollBy({ left: direction * this.step(), behavior: 'smooth' });
      }

      update() {
        const max = this.list.scrollWidth - this.list.clientWidth;
        this.prev.disabled = this.list.scrollLeft <= 2;
        this.next.disabled = this.list.scrollLeft >= max - 2;
      }
    }
  );
}
