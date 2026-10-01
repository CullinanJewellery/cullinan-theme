/*
  <option-menu> -- the metal or material option drawn as a drop-down menu on the
  product page (snippets/product-variant-picker.liquid, 2026-10-01).

  The menu is a <details>: its summary shows the current choice and opens the list,
  and the list is the option's own radio inputs, so Dawn's <variant-selects> reads,
  sends and redraws them exactly as it does the pills. This adds what a menu needs
  on top of that, and nothing else:

  - a pick closes it, and so does a click on the value that is already chosen;
  - Escape closes it and returns focus to the box, and so do Enter and Space on a
    value in the list; the down and up arrows on the box open it at the current value;
  - a click outside it, or keyboard focus moving outside it, closes it;
  - the dot in the box follows the pick at once, before Dawn's redraw arrives.

  A mouse press inside the list does not take focus away from where it is
  (mousedown's default is prevented there), so the list cannot close under the
  pointer between the press and the click.

  Dawn redraws the whole picker after every change (product-info.js), so each menu is
  a new element afterwards. A keyboard user stepping through the list with the arrow
  keys picks a value on every step; the next copy of the menu opens itself again and
  puts focus back on the checked value, so the steps carry on where they were. After
  a pick with the mouse or a finger, the next copy gives focus to its box if focus was
  in the menu, and otherwise leaves focus alone. A handover is honoured for a few
  seconds only, so one whose redraw never came cannot open a later copy by surprise.
*/

(() => {
  if (customElements.get('option-menu')) return;

  const HANDOVER_MS = 4000;
  const handover = new Map(); // data-key -> { mode: 'list' | 'summary', at }

  class OptionMenu extends HTMLElement {
    constructor() {
      super();
      this.pointerPick = false;
      this.onDocumentClick = (event) => {
        if (this.details && this.details.open && !this.contains(event.target)) this.details.open = false;
      };

      this.addEventListener('mousedown', (event) => {
        if (event.target.closest('.option-menu__list')) event.preventDefault();
      });
      this.addEventListener('pointerdown', (event) => {
        this.pointerPick = Boolean(event.target.closest('.option-menu__list'));
      });
      this.addEventListener('click', (event) => this.onClick(event));
      this.addEventListener('change', (event) => this.onChange(event));
      this.addEventListener('keydown', (event) => this.onKeydown(event));
      this.addEventListener('focusout', (event) => {
        const next = event.relatedTarget;
        if (this.details && this.details.open && next && !this.contains(next)) this.details.open = false;
      });
    }

    get details() {
      return this.querySelector(':scope > details');
    }

    get summary() {
      const details = this.details;
      return details ? details.querySelector(':scope > summary') : null;
    }

    connectedCallback() {
      document.addEventListener('click', this.onDocumentClick);

      const next = handover.get(this.dataset.key);
      if (!next) return;
      handover.delete(this.dataset.key);
      if (Date.now() - next.at > HANDOVER_MS || !this.summary) return;

      if (next.mode === 'list') {
        this.details.open = true;
        this.focusChecked();
      } else {
        this.summary.focus({ preventScroll: true });
      }
    }

    disconnectedCallback() {
      document.removeEventListener('click', this.onDocumentClick);
    }

    radioFrom(target) {
      return target instanceof HTMLInputElement && target.type === 'radio' && target.closest('.option-menu__list')
        ? target
        : null;
    }

    focusChecked() {
      const checked = this.querySelector('.option-menu__list input:checked');
      if (checked) checked.focus({ preventScroll: true });
    }

    close(focusSummary) {
      const details = this.details;
      if (details && details.open) details.open = false;
      if (focusSummary && this.summary) {
        this.summary.focus({ preventScroll: true });
        handover.set(this.dataset.key, { mode: 'summary', at: Date.now() });
      }
    }

    onClick(event) {
      const label = event.target.closest('.option-menu__list label');
      if (!label) return;
      const input = label.control;
      // the value already chosen: no change event follows, so close here
      if (input && input.checked) {
        this.pointerPick = false;
        this.close(this.contains(document.activeElement));
      }
    }

    onChange(event) {
      const input = this.radioFrom(event.target);
      if (!input) return;

      this.updateDot(input);

      if (this.pointerPick) {
        this.pointerPick = false;
        const focusInside = this.contains(document.activeElement);
        this.close(false);
        if (focusInside) handover.set(this.dataset.key, { mode: 'summary', at: Date.now() });
      } else {
        // a keyboard step: the next copy of the menu opens itself at this value
        handover.set(this.dataset.key, { mode: 'list', at: Date.now() });
      }
    }

    onKeydown(event) {
      this.pointerPick = false;
      const details = this.details;
      if (!details) return;

      if (event.target === this.summary && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
        event.preventDefault();
        details.open = true;
        this.focusChecked();
        return;
      }

      if (!details.open) return;

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        this.close(true);
        return;
      }

      const input = this.radioFrom(event.target);
      if (input && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        if (input.checked) {
          this.close(true);
        } else {
          this.pointerPick = true; // treated as a pick: close, and hand focus to the box
          input.click();
        }
      }
    }

    updateDot(input) {
      const dot = this.summary && this.summary.querySelector('.option-menu__dot');
      if (!dot) return;
      const value = input.dataset.optionDot;
      if (value) {
        dot.style.setProperty('--option-dot', value);
        dot.hidden = false;
      } else {
        dot.hidden = true;
      }
    }
  }

  customElements.define('option-menu', OptionMenu);
})();
