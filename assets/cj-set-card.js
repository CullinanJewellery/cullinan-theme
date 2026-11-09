// A set on the Комплекти page: the metal circles switch every piece of the set together
// (snippets/cj-set-card.liquid). Like the circles on the product cards, pointing at one picks it.
if (!customElements.get('cj-set-card')) {
  customElements.define(
    'cj-set-card',
    class CjSetCard extends HTMLElement {
      connectedCallback() {
        this.buttons = Array.from(this.querySelectorAll('.cj-set-card__metal'));
        this.layers = Array.from(this.querySelectorAll('.cj-set-card__layer'));
        this.current = this.querySelector('[data-current]');
        if (this.buttons.length < 2) return;

        this.buttons.forEach((button, index) => {
          ['click', 'mouseenter', 'focus'].forEach((type) => {
            button.addEventListener(type, () => this.pick(index));
          });
        });

        this.preloadWhenNear();
      }

      // The other metals' photos start loading as the card comes near, so a tap shows them at once.
      preloadWhenNear() {
        if (!('IntersectionObserver' in window)) return;
        const observer = new IntersectionObserver(
          (entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();
            this.querySelectorAll('img[loading="lazy"]').forEach((image) => {
              image.loading = 'eager';
            });
          },
          { rootMargin: '300px 0px' }
        );
        observer.observe(this);
      }

      pick(index) {
        const button = this.buttons[index];
        if (button.getAttribute('aria-pressed') === 'true') return;

        this.dataset.picked = 'true';
        this.buttons.forEach((other, otherIndex) => {
          other.setAttribute('aria-pressed', otherIndex === index ? 'true' : 'false');
        });
        this.layers.forEach((layer, layerIndex) => {
          layer.hidden = layerIndex !== index;
        });
        if (this.current) this.current.textContent = button.dataset.metal;
      }
    }
  );
}
