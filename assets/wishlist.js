/*
  „Любими“, a wishlist without an account or an app (2026-10-07, owner).
  - The saved pieces are product handles in localStorage („cullinan-wishlist“), newest first.
    They stay in this browser on this device: another browser, another device or cleared
    site data starts empty. Private windows may not keep them.
  - Hearts: any [data-cj-wish="<handle>"] button (product cards, snippets/card-product.liquid)
    toggles its piece and shows aria-pressed; the click never opens the product or adds it
    to the cart. Cards drawn later (filters, „Любими“) are marked as they appear.
  - The header's heart (.header__icon--wishlist) is filled while anything is saved.
  - „Любими“ ([data-cj-wishlist], sections/cj-wishlist.liquid): each saved piece's card is
    fetched from /products/<handle>?section_id=cj-wishlist-card; a piece that no longer
    exists is dropped from the list. „Премахни“ or the heart removes a card at once.
*/
(function () {
  if (window.cullinanWishlist) return;
  window.cullinanWishlist = true;

  var KEY = 'cullinan-wishlist';

  function read() {
    try {
      var value = JSON.parse(window.localStorage.getItem(KEY) || '[]');
      return Array.isArray(value) ? value.filter(function (h) { return typeof h === 'string' && h; }) : [];
    } catch (error) {
      return [];
    }
  }

  function write(list) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(list));
    } catch (error) {
      /* storage blocked: the hearts still answer for this visit */
    }
  }

  var memory = null;
  function current() {
    var stored = read();
    return memory && !stored.length ? memory : stored;
  }

  function mark(root) {
    var list = current();
    (root || document).querySelectorAll('[data-cj-wish]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(list.indexOf(button.dataset.cjWish) !== -1));
    });
    document.querySelectorAll('.header__icon--wishlist').forEach(function (link) {
      link.classList.toggle('header__icon--wishlist-saved', list.length > 0);
    });
  }

  function set(handle, saved) {
    var list = current().filter(function (h) { return h !== handle; });
    if (saved) list.unshift(handle);
    memory = list;
    write(list);
    mark();
  }

  function removeCard(handle) {
    var page = document.querySelector('[data-cj-wishlist]');
    if (!page) return;
    page.querySelectorAll('.cj-wishlist__item').forEach(function (item) {
      if (item.dataset.handle === handle) item.remove();
    });
    showEmptyIfNone(page);
  }

  function showEmptyIfNone(page) {
    var grid = page.querySelector('[data-cj-wishlist-grid]');
    var empty = page.querySelector('[data-cj-wishlist-empty]');
    var none = !grid || !grid.children.length;
    if (empty) empty.hidden = !none;
    if (grid) grid.hidden = none;
  }

  document.addEventListener(
    'click',
    function (event) {
      var heart = event.target.closest && event.target.closest('[data-cj-wish]');
      if (heart) {
        event.preventDefault();
        event.stopPropagation();
        var saved = heart.getAttribute('aria-pressed') !== 'true';
        set(heart.dataset.cjWish, saved);
        if (!saved) removeCard(heart.dataset.cjWish);
        return;
      }
      var remove = event.target.closest && event.target.closest('[data-cj-wish-remove]');
      if (remove) {
        event.preventDefault();
        set(remove.dataset.cjWishRemove, false);
        removeCard(remove.dataset.cjWishRemove);
      }
    },
    true
  );

  function renderPage() {
    var page = document.querySelector('[data-cj-wishlist]');
    if (!page) return;
    var grid = page.querySelector('[data-cj-wishlist-grid]');
    var list = current();
    var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    if (!list.length) {
      page.classList.remove('is-loading');
      showEmptyIfNone(page);
      return;
    }
    Promise.all(
      list.map(function (handle) {
        return fetch(root + 'products/' + encodeURIComponent(handle) + '?section_id=cj-wishlist-card')
          .then(function (response) {
            if (response.status === 404) return { handle: handle, gone: true };
            if (!response.ok) return { handle: handle };
            return response.text().then(function (text) {
              var doc = new DOMParser().parseFromString(text, 'text/html');
              var item = doc.querySelector('li.cj-wishlist__item');
              return { handle: handle, html: item ? item.outerHTML : null, gone: !item };
            });
          })
          .catch(function () {
            return { handle: handle };
          });
      })
    ).then(function (results) {
      var gone = results.filter(function (r) { return r.gone; }).map(function (r) { return r.handle; });
      if (gone.length) {
        memory = current().filter(function (h) { return gone.indexOf(h) === -1; });
        write(memory);
      }
      grid.innerHTML = results
        .filter(function (r) { return r.html; })
        .map(function (r) { return r.html; })
        .join('');
      page.classList.remove('is-loading');
      showEmptyIfNone(page);
      mark();
    });
  }

  function start() {
    mark();
    renderPage();
    // Cards drawn later (filtering, sorting) get their hearts marked too.
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].addedNodes.length) {
          mark();
          return;
        }
      }
    }).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  // Another tab of the same shop changed the list.
  window.addEventListener('storage', function (event) {
    if (event.key === KEY) {
      memory = null;
      mark();
    }
  });
})();
