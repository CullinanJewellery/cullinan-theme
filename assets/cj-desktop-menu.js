/*
  <cj-desktop-menu> — the „☰ Меню“ panel on computers (snippets/cj-desktop-menu.liquid,
  2026-10-13, after swarovski.com).

  - The button opens a panel from the left with a dimmed page behind it; ✕, a click on the
    dimmed page and Esc close it, and focus goes back to the button. While open, Tab stays inside.
  - Every category starts closed, also each time the panel opens again; a click (or Enter / Space)
    slides out a second column with its sub-collections, a second click closes it (owner, 2026-10-13).
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
      // 2026-10-13 (owner): every category starts closed; a click opens it, a second click closes it.
      this.items.forEach((item) => {
        item.addEventListener('click', () =>
          this.show(item.getAttribute('aria-expanded') === 'true' ? null : item)
        );
      });
    }

    get isOpen() {
      return this.button.getAttribute('aria-expanded') === 'true';
    }

    show(item) {
      // 2026-10-13 (owner, as on swarovski.com): the panel is one column wide until a category is
      // open; .has-sub slides the second column out (crown.css „third pass“). When the last one
      // closes, its links stay until the column has slid back.
      clearTimeout(this.subTimer);
      this.panel.classList.toggle('has-sub', Boolean(item));
      this.items.forEach((other) => {
        const active = other === item;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-expanded', String(active));
        const sub = document.getElementById(other.dataset.cjDmenuTarget);
        if (!sub) return;
        if (item) sub.hidden = !active;
        else this.subTimer = setTimeout(() => (sub.hidden = true), 300);
      });
    }

    open() {
      this.show(null);
      clearTimeout(this.subTimer);
      this.items.forEach((other) => {
        const sub = document.getElementById(other.dataset.cjDmenuTarget);
        if (sub) sub.hidden = true;
      });
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
