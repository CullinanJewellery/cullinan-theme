/*
  Two photos per product card on collection pages (snippets/card-product.liquid).
  2026-10-05, owner; 2026-10-06, owner: the photo area is a sideways scroller
  ([data-card-track], CSS scroll snap in crown.css), so the photos follow the finger
  and settle on one by themselves. This script only:
  - keeps the two circles (and card.dataset.photo) in step with the scroller;
  - scrolls to a photo when its circle is tapped;
  - returns to photo 1, which shows the chosen metal, when a colour swatch is picked;
  - cancels a click that ends a sideways drag, so a swipe never opens the product.
  Document-level listeners, so cards re-drawn by filtering keep working.
*/
(function () {
  if (window.cullinanCardPhotos) return;
  window.cullinanCardPhotos = true;

  var still = window.matchMedia('(prefers-reduced-motion: reduce)');

  function cardOf(el) {
    var wrapper = el.closest('.card-wrapper');
    return wrapper && wrapper.querySelector('.card');
  }

  function indexOf(track) {
    return track.clientWidth ? Math.round(track.scrollLeft / track.clientWidth) : 0;
  }

  function mark(card, index) {
    card.dataset.photo = String(index);
    card.querySelectorAll('[data-card-photo]').forEach(function (dot) {
      dot.setAttribute('aria-pressed', String(dot.dataset.cardPhoto === String(index)));
    });
  }

  function go(card, index, smooth) {
    var track = card.querySelector('[data-card-track]');
    if (!track) return;
    track.scrollTo({ left: index * track.clientWidth, behavior: smooth && !still.matches ? 'smooth' : 'auto' });
    mark(card, index);
  }

  // Scroll events do not bubble; a capturing listener on the document sees them all.
  document.addEventListener(
    'scroll',
    function (event) {
      var track = event.target;
      if (!track.matches || !track.matches('[data-card-track]')) return;
      track.dataset.scrolledAt = String(Date.now());
      var card = cardOf(track);
      if (card) mark(card, indexOf(track));
    },
    true
  );

  var start = null;

  document.addEventListener(
    'pointerdown',
    function (event) {
      var track = event.target.closest && event.target.closest('[data-card-track]');
      start = track ? { track: track, left: track.scrollLeft } : null;
    },
    { passive: true }
  );

  document.addEventListener(
    'click',
    function (event) {
      // A drag on the photos is not a tap: the slide's link is not followed.
      var track = event.target.closest('[data-card-track]');
      if (track) {
        var moved = start && start.track === track && Math.abs(track.scrollLeft - start.left) > 4;
        var settling = Date.now() - Number(track.dataset.scrolledAt || 0) < 120;
        start = null;
        if (moved || settling) {
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      var dot = event.target.closest('[data-card-photo]');
      if (dot) {
        event.preventDefault();
        event.stopPropagation();
        var dotCard = cardOf(dot);
        if (dotCard) go(dotCard, Number(dot.dataset.cardPhoto), true);
        return;
      }
      var swatch = event.target.closest('.card__swatch button');
      if (swatch) {
        var swatchCard = cardOf(swatch);
        if (swatchCard && swatchCard.querySelector('[data-card-track]')) go(swatchCard, 0, false);
      }
    },
    true
  );

  // Hovering a swatch also picks it (card-swatches.js): show photo 1 then too.
  document.addEventListener(
    'mouseover',
    function (event) {
      var swatch = event.target.closest && event.target.closest('.card__swatch button');
      if (!swatch) return;
      var card = cardOf(swatch);
      if (card && card.dataset.photo === '1') go(card, 0, false);
    },
    true
  );
})();
