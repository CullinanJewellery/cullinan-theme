if (!customElements.get('card-swatches')) {
  customElements.define(
    'card-swatches',
    class CardSwatches extends HTMLElement {
      connectedCallback() {
        this.buttons = Array.from(this.querySelectorAll('.card__swatch button'));
        if (!this.buttons.length) return;

        this.image = this.querySelector('.card__media img');
        this.price = this.querySelector('.price');
        this.selected = this.buttons.find((button) => button.getAttribute('aria-pressed') === 'true') || null;

        if (this.image) {
          this.initialImage = { src: this.image.src, srcset: this.image.srcset, alt: this.image.alt };
        }
        if (this.price) {
          this.initialPrice = this.capturePriceState();
        }

        this.buttons.forEach((button) => {
          button.addEventListener('click', this.onSwatchClick.bind(this, button));
          button.addEventListener('mouseenter', this.onSwatchPreview.bind(this, button));
          button.addEventListener('focus', this.onSwatchPreview.bind(this, button));
          button.addEventListener('mouseleave', this.onSwatchRevert.bind(this));
          button.addEventListener('blur', this.onSwatchRevert.bind(this));
        });
      }

      onSwatchClick(button, event) {
        event.preventDefault();
        this.selected = button;
        this.buttons.forEach((other) => {
          other.setAttribute('aria-pressed', other === button ? 'true' : 'false');
        });
        this.applyImage(button);
        this.applyPrice(button);
      }

      onSwatchPreview(button) {
        this.applyImage(button);
        this.applyPrice(button);
      }

      onSwatchRevert() {
        if (this.selected) {
          this.applyImage(this.selected);
          this.applyPrice(this.selected);
        } else {
          this.restoreInitial();
        }
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

      restoreInitial() {
        if (this.image && this.initialImage) {
          this.image.src = this.initialImage.src;
          this.image.srcset = this.initialImage.srcset;
          this.image.alt = this.initialImage.alt;
        }
        if (this.price && this.initialPrice) {
          this.restorePriceState(this.initialPrice);
        }
      }

      capturePriceState() {
        return {
          onSale: this.price.classList.contains('price--on-sale'),
          soldOut: this.price.classList.contains('price--sold-out'),
          regular: this.price.querySelector('.price__regular .price-item--regular')?.textContent,
          saleCompare: this.price.querySelector('.price__sale s.price-item--regular')?.textContent,
          saleCurrent: this.price.querySelector('.price__sale .price-item--sale')?.textContent,
          saved: this.price.querySelector('.price__sale .price-item--saved')?.textContent,
        };
      }

      restorePriceState(state) {
        this.price.classList.toggle('price--on-sale', state.onSale);
        this.price.classList.toggle('price--sold-out', state.soldOut);

        const regular = this.price.querySelector('.price__regular .price-item--regular');
        if (regular && state.regular != null) regular.textContent = state.regular;

        const saleCompare = this.price.querySelector('.price__sale s.price-item--regular');
        if (saleCompare && state.saleCompare != null) saleCompare.textContent = state.saleCompare;

        const saleCurrent = this.price.querySelector('.price__sale .price-item--sale');
        if (saleCurrent && state.saleCurrent != null) saleCurrent.textContent = state.saleCurrent;

        const saved = this.price.querySelector('.price__sale .price-item--saved');
        if (saved && state.saved != null) saved.textContent = state.saved;
      }
    }
  );
}
