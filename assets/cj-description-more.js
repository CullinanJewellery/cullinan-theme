/*
 * The product description above the price: its first sentence, then „Прочетете повече“, which opens the whole text
 * (owner, 2026-11-23: "make the first sentence apear then to be written прочете повече and when you click it to
 * apear the hole description"). Before (2026-11-22): three lines with „Покажи повече“.
 * The sentence is copied into a <p class="cj-desc-more__lead"> and the full text is hidden (.is-short) only when it
 * says more than that sentence. Without this script the whole text shows.
 */
if (!customElements.get('cj-description-more')) {
  customElements.define(
    'cj-description-more',
    class CjDescriptionMore extends HTMLElement {
      connectedCallback() {
        if (this.ready) return;
        this.text = this.querySelector('.cj-desc-more__text');
        this.button = this.querySelector('.cj-desc-more__toggle');
        if (!this.text || !this.button) return;
        this.ready = true;

        const whole = this.text.textContent.replace(/\s+/g, ' ').trim();
        const first = this.firstSentence(whole);
        if (!first || whole.length - first.length < 3) {
          this.button.hidden = true;
          return;
        }

        this.lead = document.createElement('p');
        this.lead.className = 'cj-desc-more__lead';
        this.lead.textContent = first;
        this.text.before(this.lead);
        this.classList.add('is-short');
        this.button.hidden = false;
        this.button.addEventListener('click', () => this.toggle());
      }

      firstSentence(s) {
        // up to the first . ! ? or … that is followed by a space (or the end), so „14K.“ inside a word stays whole
        const m = s.match(/^[\s\S]*?[.!?…]["“”»)]?(?=\s|$)/);
        return m ? m[0].trim() : s;
      }

      toggle() {
        const open = this.button.getAttribute('aria-expanded') === 'true';
        this.classList.toggle('is-short', open);
        this.lead.hidden = !open;
        this.button.setAttribute('aria-expanded', String(!open));
        this.button.textContent = open ? this.button.dataset.more : this.button.dataset.less;
      }
    }
  );
}
