/*
  A temporary second-photo preview in product rows (2026-10-06, owner): Най-продавани,
  Може да ви хареса (snippets/card-product.liquid, [data-photo-preview] on .card) and
  Наскоро разгледани (assets/recently-viewed.js, [data-photo-preview] on the link).
  Only cards that have a relevant second photo carry the attribute.

  - Mouse: the second photo shows while the pointer is over the photo, the first
    returns when it leaves. Measured against the photo's own box, because the card's
    stretched title link lies over the picture and takes its hover.
  - Touch (second pass, 2026-10-06, owner, tested on an iPhone): the second photo
    shows the moment a finger touches the photo -- no hold, no wait -- and the first
    returns when the touch ends or is cancelled. Scrolling the page or swiping the row
    makes the browser cancel the touch (pointercancel), which restores the first
    photo; a finger that wanders more than 12px does the same. A quick tap still opens
    the product. The click that follows a long look (over 500 ms) or a moved finger is
    not followed, so viewing or scrolling never opens the product by accident.
    The first pass waited 280 ms of stillness and also cancelled on any page scroll
    event; on an iPhone a touch that stops momentum scrolling, or the address bar
    resizing, fires scroll events, so the preview could be cancelled before it showed.
  The attribute data-previewing="true" drives the CSS (crown.css, section-recently-viewed.css).
  Document-level listeners, so rows filled later (recently viewed) need no wiring.
*/
(function () {
  if (window.cullinanPhotoPreview) return;
  window.cullinanPhotoPreview = true;

  var MOVE_PX = 12;
  var LOOK_MS = 500;
  var MEDIA = '.card__media, .recently-viewed__media';
  var PREVIEW_IMG = 'img.card__photo-preview, img.recently-viewed__image--preview';

  function hostAt(target) {
    var host = target && target.closest && target.closest('[data-photo-preview]');
    if (host) return host;
    // The card's stretched title link sits inside .card, so closest() finds the card;
    // this is only a fallback for anything placed beside it in the wrapper.
    var wrapper = target && target.closest && target.closest('.card-wrapper');
    return wrapper ? wrapper.querySelector('.card[data-photo-preview]') : null;
  }

  function overMedia(host, x, y) {
    var media = host.querySelector(MEDIA);
    if (!media) return false;
    var box = media.getBoundingClientRect();
    return x >= box.left && x <= box.right && y >= box.top && y <= box.bottom;
  }

  // Only swap once the second photo has actually arrived, so a touch never fades the
  // first photo out to an empty square.
  function previewReady(host) {
    var img = host.querySelector(PREVIEW_IMG);
    if (!img) return false;
    if (img.complete && img.naturalWidth > 0) return true;
    img.loading = 'eager';
    return false;
  }

  function show(host, on) {
    if (on) host.setAttribute('data-previewing', 'true');
    else host.removeAttribute('data-previewing');
  }

  // Mouse hover.
  var hovered = null;
  document.addEventListener(
    'pointermove',
    function (event) {
      if (event.pointerType !== 'mouse') return;
      var host = hostAt(event.target);
      var on = !!host && overMedia(host, event.clientX, event.clientY) && previewReady(host);
      if (hovered && (hovered !== host || !on)) {
        show(hovered, false);
        hovered = null;
      }
      if (on && hovered !== host) {
        show(host, true);
        hovered = host;
      }
    },
    { passive: true }
  );

  document.addEventListener('pointerout', function (event) {
    if (event.pointerType !== 'mouse' || !hovered) return;
    if (!event.relatedTarget || !hovered.contains(event.relatedTarget)) {
      show(hovered, false);
      hovered = null;
    }
  });

  // Touch: show at once, restore on release or cancel.
  var touch = null;
  var lastTouch = null;

  function endTouch(cancelled) {
    if (!touch) return;
    show(touch.host, false);
    lastTouch = {
      host: touch.host,
      at: Date.now(),
      skipClick: cancelled || touch.moved || Date.now() - touch.start > LOOK_MS,
    };
    touch = null;
  }

  document.addEventListener(
    'pointerdown',
    function (event) {
      if (event.pointerType === 'mouse') return;
      if (touch) endTouch(true);
      var host = hostAt(event.target);
      if (!host || !overMedia(host, event.clientX, event.clientY)) return;
      touch = { host: host, x: event.clientX, y: event.clientY, start: Date.now(), moved: false };
      if (previewReady(host)) show(host, true);
    },
    { passive: true }
  );

  document.addEventListener(
    'pointermove',
    function (event) {
      if (!touch || event.pointerType === 'mouse') return;
      if (Math.abs(event.clientX - touch.x) > MOVE_PX || Math.abs(event.clientY - touch.y) > MOVE_PX) {
        touch.moved = true;
        show(touch.host, false);
      }
    },
    { passive: true }
  );

  document.addEventListener('pointerup', function (event) {
    if (event.pointerType !== 'mouse') endTouch(false);
  });

  // The browser takes over the gesture (page scroll, row swipe): restore the first photo.
  document.addEventListener('pointercancel', function () {
    endTouch(true);
  });

  // A long look, a moved finger or a scroll is not a tap: the product does not open.
  document.addEventListener(
    'click',
    function (event) {
      if (!lastTouch || Date.now() - lastTouch.at > 700) return;
      var mine = lastTouch.host.contains(event.target) || hostAt(event.target) === lastTouch.host;
      if (mine && lastTouch.skipClick) {
        event.preventDefault();
        event.stopPropagation();
      }
      lastTouch = null;
    },
    true
  );

  // No long-press menu over a previewable photo.
  document.addEventListener('contextmenu', function (event) {
    var host = hostAt(event.target);
    if (host && overMedia(host, event.clientX, event.clientY)) event.preventDefault();
  });
})();
