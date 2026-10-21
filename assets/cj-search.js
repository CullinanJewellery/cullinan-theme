/*
  The search's first view (2026-10-21, owner): the first time a search opens, its panel under the bar is filled with
  sections/cj-search-start (popular searches and the bestsellers as product cards), fetched once per page and shared
  by both header search instances. Until then, and if the fetch fails, the panel is simply empty and the search works
  as before. While results are shown, assets/cj-search.css hides this panel.
*/
(function () {
  if (window.cullinanSearchStart) return;
  window.cullinanSearchStart = true;

  var markup = null;
  var loading = null;

  function load() {
    if (markup !== null) return Promise.resolve(markup);
    if (loading) return loading;
    var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
    loading = fetch(root + '?section_id=cj-search-start')
      .then(function (response) {
        if (!response.ok) throw new Error(response.status);
        return response.text();
      })
      .then(function (text) {
        var doc = new DOMParser().parseFromString(text, 'text/html');
        var section = doc.querySelector('.cj-search__panel');
        markup = section ? section.outerHTML : '';
        return markup;
      })
      .catch(function () {
        loading = null;
        return '';
      });
    return loading;
  }

  function fill(details) {
    var slot = details.querySelector('[data-cj-search-start]');
    if (!slot || slot.dataset.filled) return;
    load().then(function (html) {
      if (!html || slot.dataset.filled) return;
      slot.innerHTML = html;
      slot.dataset.filled = 'true';
    });
  }

  document.addEventListener(
    'toggle',
    function (event) {
      var details = event.target;
      if (!details.matches || !details.matches('.header__search details') || !details.open) return;
      fill(details);
    },
    true
  );

  // Start loading on the first hover or touch of a search icon, so the panel is usually ready when it opens.
  document.addEventListener(
    'pointerover',
    function (event) {
      if (event.target.closest && event.target.closest('.header__icon--search')) load();
    },
    { passive: true }
  );
})();
