/*
  <gallery-dots>: the row of dots between the product gallery's two arrows on a
  phone, in place of Dawn's "1 / 4" counter (moonmagic's own gallery has dots).

  It does no scrolling of its own. The slider is Dawn's <slider-component>, which
  already scrolls, snaps and knows which slide is showing (`currentPage`, and a
  `slideChanged` event whenever it changes); this only draws that. The dots are
  printed by Liquid so the row is there before any script runs, and this keeps
  them honest afterwards: the count follows the slides (a variant change can add
  or remove one) and the lit dot follows the slider.
*/
if (!customElements.get('gallery-dots')) {
  customElements.define(
    'gallery-dots',
    class GalleryDots extends HTMLElement {
      connectedCallback() {
        this.viewer = this.closest('slider-component');
        this.list = this.viewer && this.viewer.querySelector('[id^="Slider-"]');
        if (!this.list) return;

        this.onSlide = () => this.sync();
        this.viewer.addEventListener('slideChanged', this.onSlide);
        this.list.addEventListener('scroll', this.onSlide, { passive: true });

        this.observer = new MutationObserver(() => this.render());
        this.observer.observe(this.list, { childList: true });

        this.render();
      }

      disconnectedCallback() {
        if (this.observer) this.observer.disconnect();
        if (this.viewer && this.onSlide) this.viewer.removeEventListener('slideChanged', this.onSlide);
        if (this.list && this.onSlide) this.list.removeEventListener('scroll', this.onSlide);
      }

      slideCount() {
        return Array.from(this.list.children).filter((slide) => slide.clientWidth > 0).length;
      }

      render() {
        const wanted = this.slideCount();
        while (this.children.length < wanted) {
          const dot = document.createElement('span');
          dot.className = 'gallery-dots__dot';
          this.appendChild(dot);
        }
        while (this.children.length > wanted) this.removeChild(this.lastElementChild);
        this.sync();
      }

      sync() {
        // Dawn numbers its pages from 1 and only sets `currentPage` once it has measured the slider.
        const lit = Math.max(0, (this.viewer.currentPage || 1) - 1);
        Array.from(this.children).forEach((dot, index) => dot.classList.toggle('is-active', index === lit));
      }
    }
  );
}
