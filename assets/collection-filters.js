/*
  Collection filters on phones (snippets/facets.liquid), 2026-10-05.
  - The sort on the phone bar (#SortBy-bar) hands its value to the drawer's own sort
    (#SortBy-mobile) and fires the event Dawn's facets.js listens for, so the filters
    and the order are sent together and the URL keeps both.
  - After every update (Dawn re-renders #ProductCount) the „Филтри“ count, the
    „Покажи резултатите (N)“ number and the bar's sort are read again from the URL.
*/
(function () {
  if (window.cullinanCollectionFilters) return;
  window.cullinanCollectionFilters = true;

  function activeCount(params) {
    var count = 0;
    var price = false;
    params.forEach(function (value, key) {
      if (key.indexOf('filter.') !== 0 || value === '') return;
      if (key.indexOf('filter.v.price.') === 0) price = true;
      else count += 1;
    });
    return count + (price ? 1 : 0);
  }

  function refresh() {
    var params = new URLSearchParams(window.location.search);
    var count = activeCount(params);
    document.querySelectorAll('[data-cj-filter-count]').forEach(function (badge) {
      badge.hidden = count === 0;
      badge.querySelector('[aria-hidden]').textContent = count;
      badge.querySelector('.visually-hidden').textContent = 'избрани: ' + count;
    });

    var source = document.getElementById('ProductCount');
    if (source && source.dataset.productCount !== undefined && source.dataset.productCount !== '') {
      document.querySelectorAll('[data-cj-result-count]').forEach(function (el) {
        el.textContent = source.dataset.productCount;
      });
    }

    var bar = document.querySelector('[data-cj-sort-bar]');
    var sort = params.get('sort_by') || (bar && bar.dataset.default) || '';
    if (bar && sort && bar.querySelector('option[value="' + sort + '"]')) bar.value = sort;

    // The drawer's „Изчисти“ is not re-rendered by Dawn: point it at this page with the
    // current order and no filters.
    var keep = params.get('sort_by');
    document.querySelectorAll('[data-cj-clear]').forEach(function (link) {
      link.setAttribute('href', window.location.pathname + (keep ? '?sort_by=' + encodeURIComponent(keep) : ''));
    });
  }

  document.addEventListener('change', function (event) {
    var bar = event.target.closest && event.target.closest('[data-cj-sort-bar]');
    if (!bar) return;
    var drawerSort = document.getElementById('SortBy-mobile');
    if (!drawerSort) return;
    drawerSort.value = bar.value;
    drawerSort.dispatchEvent(new Event('input', { bubbles: true }));
  });

  function watch() {
    var source = document.getElementById('ProductCount');
    if (!source) return;
    new MutationObserver(refresh).observe(source, { childList: true, attributes: true, characterData: true, subtree: true });
    window.addEventListener('popstate', function () {
      setTimeout(refresh, 0);
    });
    refresh();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', watch);
  else watch();
})();
