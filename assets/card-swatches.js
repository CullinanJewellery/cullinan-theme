if (!customElements.get('card-swatches')) {
  customElements.define(
    'card-swatches',
    class CardSwatches extends HTMLElement {
      connectedCallback() {
        this.buttons = Array.from(this.querySelectorAll('.card__swatch button'));
        if (!this.buttons.length) return;

        this.image = this.querySelector('.card__media img');
        this.price = this.querySelector('.price');

        // Hovering a swatch picks it, same as clicking, and the picture stays on
        // that colour afterwards -- the owner asked to be able to move the cursor
        // away and still see the colour they landed on.
        this.buttons.forEach((button) => {
          button.addEventListener('click', this.onSwatchPick.bind(this, button));
          button.addEventListener('mouseenter', this.onSwatchPick.bind(this, button));
          button.addEventListener('focus', this.onSwatchPick.bind(this, button));
        });
      }

      onSwatchPick(button, event) {
        if (event) event.preventDefault();
        if (button.getAttribute('aria-pressed') === 'true') return;

        this.buttons.forEach((other) => {
          other.setAttribute('aria-pressed', other === button ? 'true' : 'false');
        });

        this.applyImage(button);
        this.applyPrice(button);
      }

      applyImage(button) {
        if (!this.image || !button.dataset.imageSrc) return;
        this.image.src = button.dataset.imageSrc;
        this.image.srcset = button.dataset.imageSrcset;
        if (button.dataset.imageAlt) this.image.alt = button.dataset.imageAlt;
      }

      applyPrice(button) {
        if (!this.price || !button.dataset.price) return;

        const onSale = Boolean(button.dataset.compareAtPrice);
        this.price.classList.toggle('price--on-sale', onSale);
        this.price.classList.toggle('price--sold-out', button.dataset.available === 'false');

        const regular = this.price.querySelector('.price__regular .price-item--regular');
        if (regular) regular.textContent = button.dataset.price;

        const saleCompare = this.price.querySelector('.price__sale s.price-item--regular');
        if (saleCompare) saleCompare.textContent = button.dataset.compareAtPrice || '';

        const saleCurrent = this.price.querySelector('.price__sale .price-item--sale');
        if (saleCurrent) saleCurrent.textContent = button.dataset.price;

        const saved = this.price.querySelector('.price__sale .price-item--saved');
        if (saved) saved.textContent = onSale ? `(-${button.dataset.savedPercent}%)` : '';
      }
    }
  );
}
