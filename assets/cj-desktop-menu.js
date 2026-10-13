/*
  <cj-desktop-menu> — the „☰ Меню“ panel on computers (snippets/cj-desktop-menu.liquid,
  2026-10-13, after swarovski.com).

  - The button opens a panel from the left with a dimmed page behind it; ✕, a click on the
    dimmed page and Esc close it, and focus goes back to the button. While open, Tab stays inside.
  - A category in the left column shows its sub-collections in the right column when the pointer
    rests on it or when it is clicked / chosen with the keyboard.
  - The panel and the dim layer are moved to <body> once, so the sticky header cannot clip or
    shift them.
*/
(() => {
  if (customElements.get('cj-desktop-menu')) return;

  const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

  class CjDesktopMenu extends HTMLElement {
    connectedCallback() {
      this.button = this.querySelector('.cj-dmenu__open');
      this.panel = this.querySelector('.cj-dmenu__panel');
      this.overlay = this.querySelector('.cj-dmenu__overlay');
      if (!this.button || !this.panel || !this.overlay) return;

      document.body.append(this.overlay, this.panel);

      this.onKey = this.onKey.bind(this);
      this.button.addEventListener('click', () => (this.isOpen ? this.close() : this.open()));
      [this.overlay, ...this.panel.querySelectorAll('[data-cj-dmenu-close]')].forEach((el) =>
        el.addEventListener('click', () => this.close())
      );

      this.items = Array.from(this.panel.querySelectorAll('[data-cj-dmenu-target]'));
      this.items.forEach((item) => {
        item.addEventListener('click', () => this.show(item));
        item.addEventListener('mouseenter', () => {
          clearTimeout(this.hoverTimer);
          this.hoverTimer = setTimeout(() => this.show(item), 90);
        });
        item.addEventListener('mouseleave', () => clearTimeout(this.hoverTimer));
      });
    }

    get isOpen() {
      return this.button.getAttribute('aria-expanded') === 'true';
    }

    show(item) {
      this.items.forEach((other) => {
        const active = other === item;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-expanded', String(active));
        const sub = document.getElementById(other.dataset.cjDmenuTarget);
        if (sub) sub.hidden = !active;
      });
    }

    open() {
      this.overlay.hidden = false;
      this.panel.hidden = false;
      this.button.setAttribute('aria-expanded', 'true');
      document.documentElement.classList.add('cj-dmenu-open');
      requestAnimationFrame(() => {
        this.overlay.classList.add('is-open');
        this.panel.classList.add('is-open');
      });
      document.addEventListener('keydown', this.onKey);
      const close = this.panel.querySelector('.cj-dmenu__close');
      if (close) close.focus({ preventScroll: true });
    }

    close() {
      if (!this.isOpen) return;
      this.button.setAttribute('aria-expanded', 'false');
      this.overlay.classList.remove('is-open');
      this.panel.classList.remove('is-open');
      document.documentElement.classList.remove('cj-dmenu-open');
      document.removeEventListener('keydown', this.onKey);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const hide = () => {
        if (this.isOpen) return;
        this.overlay.hidden = true;
        this.panel.hidden = true;
      };
      if (reduce) hide();
      else setTimeout(hide, 300);
      this.button.focus({ preventScroll: true });
    }

    onKey(event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        this.close();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(this.panel.querySelectorAll(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  customElements.define('cj-desktop-menu', CjDesktopMenu);
})();
