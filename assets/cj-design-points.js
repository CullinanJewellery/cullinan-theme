/*
  „Нашият дизайн“ (sections/cj-design-points.liquid): the hover look follows the scroll (owner, 2026-11-11, replacing
  the 3-second loop on phones). While the list passes through the screen, its progress picks one point: scrolling down
  lights them first to last, scrolling up last to first. Computers and phones alike; the mouse hover still works.
  The list counts from when its top is at 85% of the screen height until its bottom is at 35%.
*/
if (!customElements.get('design-points-list')) {
  class DesignPointsList extends HTMLElement {
    connectedCallback() {
      this.items = Array.from(this.querySelectorAll('.design-points__item'));
      this.frame = null;
      this.onScroll = () => {
        if (this.frame) return;
        this.frame = requestAnimationFrame(() => {
          this.frame = null;
          this.update();
        });
      };
      window.addEventListener('scroll', this.onScroll, { passive: true });
      window.addEventListener('resize', this.onScroll, { passive: true });
      this.update();
    }

    disconnectedCallback() {
      window.removeEventListener('scroll', this.onScroll);
      window.removeEventListener('resize', this.onScroll);
      if (this.frame) cancelAnimationFrame(this.frame);
    }

    update() {
      const count = this.items.length;
      if (!count) return;
      const rect = this.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.85;
      const end = vh * 0.35;
      const progress = (start - rect.top) / (rect.height + start - end);
      const active = progress <= 0 || progress >= 1 ? -1 : Math.min(count - 1, Math.floor(progress * count));
      this.items.forEach((item, index) => item.classList.toggle('is-active', index === active));
    }
  }

  customElements.define('design-points-list', DesignPointsList);
}
