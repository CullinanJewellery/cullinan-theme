/*
 * „Покажи повече“ under the product description (owner, 2026-11-22).
 * The text is cut to three lines only when it is longer than that; the button
 * then opens and closes it. Without this script the whole text shows.
 */
if (!customElements.get('cj-description-more')) {
  customElements.define(
    'cj-description-more',
    class CjDescriptionMore extends HTMLElement {
      connectedCallback() {
        this.text = this.querySelector('.cj-desc-more__text');
        this.button = this.querySelector('.cj-desc-more__toggle');
        if (!this.text || !this.button) return;
        this.button.addEventListener('click', () => this.toggle());
        this.measure();
      }

      measure() {
        this.text.classList.add('is-clamped');
        const longer = this.text.scrollHeight - this.text.clientHeight > 2;
        if (!longer) {
          this.text.classList.remove('is-clamped');
          this.button.hidden = true;
          return;
        }
        this.button.hidden = false;
      }

      toggle() {
        const open = this.button.getAttribute('aria-expanded') === 'true';
        this.text.classList.toggle('is-clamped', open);
        this.button.setAttribute('aria-expanded', String(!open));
        this.button.textContent = open ? this.button.dataset.more : this.button.dataset.less;
      }
    }
  );
}
