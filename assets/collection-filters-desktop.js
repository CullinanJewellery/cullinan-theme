/*
  Collection filters on tablets and computers (sections/main-collection-product-grid.liquid,
  filter_type "vertical"; 2026-10-06, rebuilt 2026-10-07 after moonmagic.com's desktop filters).
  - „Скрий / Покажи филтрите“ hides or shows the sidebar (a class on .facets-vertical).
  - „Сортиране“ opens a small panel of the sort options; choosing one sets the real, hidden
    select and lets Dawn's facets.js send it. Escape or a click elsewhere closes the panel.
  - The number of chosen filters on the bar follows the chips above the grid, which facets.js
    redraws with the products.
  - <cj-price-slider>: two range handles that write into Shopify's own price fields.
  Filtering and sorting themselves stay Dawn's (assets/facets.js).
*/
(function () {
  if (window.cullinanDesktopFilters) return;
  window.cullinanDesktopFilters = true;

  function closeSort(sort, focus) {
    const toggle = sort.querySelector('[data-cj-sort-toggle]');
    const panel = sort.querySelector('.cj-sort__panel');
    if (!toggle || !panel || panel.hidden) return;
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    if (focus) toggle.focus();
  }

  document.addEventListener('click', function (event) {
    const toggle = event.target.closest('[data-cj-filter-toggle]');
    if (toggle) {
      const open = toggle.getAttribute('aria-expanded') !== 'false';
      toggle.setAttribute('aria-expanded', String(!open));
      const layout = document.querySelector('.facets-vertical');
      if (layout) layout.classList.toggle('cj-filters-hidden', open);
      return;
    }

    const sortToggle = event.target.closest('[data-cj-sort-toggle]');
    if (sortToggle) {
      const panel = document.getElementById(sortToggle.getAttribute('aria-controls'));
      const open = sortToggle.getAttribute('aria-expanded') === 'true';
      sortToggle.setAttribute('aria-expanded', String(!open));
      panel.hidden = open;
      if (!open) {
        const current = panel.querySelector('[aria-pressed="true"]') || panel.querySelector('button');
        if (current) current.focus();
      }
      return;
    }

    const option = event.target.closest('[data-cj-sort-value]');
    if (option) {
      const sort = option.closest('[data-cj-sort]');
      const form = option.closest('form');
      const select = form && form.querySelector('select[name="sort_by"]');
      sort.querySelectorAll('[data-cj-sort-value]').forEach(function (button) {
        button.setAttribute('aria-pressed', String(button === option));
      });
      closeSort(sort, true);
      if (select && select.value !== option.dataset.cjSortValue) {
        select.value = option.dataset.cjSortValue;
        select.dispatchEvent(new Event('input', { bubbles: true }));
      }
      return;
    }

    document.querySelectorAll('[data-cj-sort]').forEach(function (sort) {
      if (!sort.contains(event.target)) closeSort(sort, false);
    });
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    const sort = event.target.closest && event.target.closest('[data-cj-sort]');
    if (sort) closeSort(sort, true);
  });

  // The bar's count follows the chips above the grid after every redraw.
  function syncCount() {
    const results = document.querySelector('.cj-results');
    const count = document.querySelector('[data-cj-bar-count]');
    if (!results || !count) return;
    const n = Number(results.dataset.cjActive || 0);
    count.textContent = '(' + n + ')';
    count.hidden = n === 0;
  }

  function watch() {
    const container = document.getElementById('ProductGridContainer');
    if (!container) return;
    new MutationObserver(syncCount).observe(container, { childList: true });
    syncCount();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch);
  else watch();

  if (!customElements.get('cj-price-slider')) {
    customElements.define(
      'cj-price-slider',
      class CjPriceSlider extends HTMLElement {
        connectedCallback() {
          this.max = Number(this.dataset.max) || 0;
          this.symbol = this.dataset.currency || '';
          this.lo = this.querySelector('[data-cj-range="lo"]');
          this.hi = this.querySelector('[data-cj-range="hi"]');
          this.fill = this.querySelector('[data-cj-fill]');
          this.loText = this.querySelector('[data-cj-lo]');
          this.hiText = this.querySelector('[data-cj-hi]');
          const details = this.closest('details') || this.parentElement;
          const fields = details.querySelectorAll('price-range input');
          this.minField = fields[0];
          this.maxField = fields[1];
          if (!this.lo || !this.hi || !this.minField || !this.maxField || !this.max) return;

          this.lo.addEventListener('input', () => this.fromSlider(this.lo));
          this.hi.addEventListener('input', () => this.fromSlider(this.hi));
          [this.minField, this.maxField].forEach((field) =>
            field.addEventListener('input', () => this.fromFields())
          );
          this.draw();
        }

        number(field, fallback) {
          const value = parseFloat(String(field.value).replace(/\s/g, '').replace(',', '.'));
          return Number.isFinite(value) ? value : fallback;
        }

        fromSlider(moved) {
          let lo = Number(this.lo.value);
          let hi = Number(this.hi.value);
          if (lo > hi) {
            if (moved === this.lo) lo = hi;
            else hi = lo;
            this.lo.value = lo;
            this.hi.value = hi;
          }
          // An end at its limit means no limit, as when the field is left empty.
          this.minField.value = lo > 0 ? String(lo) : '';
          this.maxField.value = hi < this.max ? String(hi) : '';
          this.minField.dispatchEvent(new Event('change', { bubbles: false }));
          this.maxField.dispatchEvent(new Event('change', { bubbles: false }));
          this.draw();
        }

        fromFields() {
          this.lo.value = Math.max(0, Math.min(this.max, this.number(this.minField, 0)));
          this.hi.value = Math.max(0, Math.min(this.max, this.number(this.maxField, this.max)));
          this.draw();
        }

        draw() {
          const lo = Number(this.lo.value);
          const hi = Number(this.hi.value);
          if (this.loText) this.loText.textContent = this.symbol + lo;
          if (this.hiText) this.hiText.textContent = this.symbol + hi;
          if (this.fill) {
            this.fill.style.left = (lo / this.max) * 100 + '%';
            this.fill.style.right = 100 - (hi / this.max) * 100 + '%';
          }
          // The handle that was moved last stays on top where the two meet.
          this.lo.style.zIndex = lo >= this.max - 1 ? '3' : '2';
        }
      }
    );
  }
})();
