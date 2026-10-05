/*
  Two photos per product card on collection pages (snippets/card-product.liquid,
  2026-10-05, owner). Document-level listeners, so cards re-drawn by filtering keep
  working. A sideways touch swipe on the photo or a tap on a dot switches photos; the
  tap that ends a swipe does not open the product; vertical scrolling is untouched
  (touch-action: pan-y in crown.css). Picking a colour swatch returns to photo 1, which
  shows the chosen metal.
*/
(function () {
  if (window.cullinanCardPhotos) return;
  window.cullinanCardPhotos = true;

  function setPhoto(card, index) {
    card.dataset.photo = String(index);
    card.querySelectorAll('[data-card-photo]').forEach(function (dot) {
      dot.setAttribute('aria-pressed', String(dot.dataset.cardPhoto === String(index)));
    });
  }

  var start = null;
  var swipedAt = 0;

  document.addEventListener(
    'pointerdown',
    function (event) {
      if (event.pointerType === 'mouse') return;
      var card = event.target.closest('.card');
      if (!card || !card.querySelector('.card__photo-2')) return;
      var media = card.querySelector('.card__media');
      var box = media.getBoundingClientRect();
      if (event.clientY > box.bottom || event.clientY < box.top) return;
      start = { card: card, x: event.clientX, y: event.clientY };
    },
    { passive: true }
  );

  document.addEventListener('pointerup', function (event) {
    if (!start) return;
    var s = start;
    start = null;
    var dx = event.clientX - s.x;
    var dy = event.clientY - s.y;
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
    swipedAt = Date.now();
    setPhoto(s.card, dx < 0 ? 1 : 0);
  });

  document.addEventListener('pointercancel', function () {
    start = null;
  });

  document.addEventListener(
    'click',
    function (event) {
      // The click that ends a swipe never opens the product.
      if (Date.now() - swipedAt < 500 && event.target.closest('.card')) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      var dot = event.target.closest('[data-card-photo]');
      if (dot) {
        event.preventDefault();
        event.stopPropagation();
        setPhoto(dot.closest('.card'), Number(dot.dataset.cardPhoto));
        return;
      }
      var swatch = event.target.closest('.card__swatch button');
      if (swatch) {
        var card = swatch.closest('.card-wrapper') && swatch.closest('.card-wrapper').querySelector('.card');
        if (card && card.querySelector('.card__photo-2')) setPhoto(card, 0);
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
      var wrapper = swatch.closest('.card-wrapper');
      var card = wrapper && wrapper.querySelector('.card');
      if (card && card.dataset.photo === '1') setPhoto(card, 0);
    },
    true
  );
})();
