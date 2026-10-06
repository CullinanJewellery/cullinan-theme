/*
  A temporary second-photo preview in product rows (2026-10-06, owner): Най-продавани,
  Може да ви хареса (snippets/card-product.liquid, [data-photo-preview] on .card) and
  Наскоро разгледани (assets/recently-viewed.js, [data-photo-preview] on the link).
  Only cards that have a relevant second photo carry the attribute.

  - Mouse: the second photo shows while the pointer is over the photo, the first
    returns when it leaves. Measured against the photo's own box, because the card's
    stretched title link lies over the picture and takes its hover.
  - Touch: the second photo shows after the finger has rested on the photo for a
    moment, and the first returns on release. Any movement (the row swiping sideways,
    the page scrolling) cancels it, and the browser's own pointercancel when it
    starts scrolling does too. A quick tap still opens the product; the release that
    ends a hold does not, and the long-press menu is suppressed on the photo.
  The attribute data-previewing="true" drives the CSS (crown.css, section-recently-viewed.css).
  Document-level listeners, so rows filled later (recently viewed) need no wiring.
*/
(function () {
  if (window.cullinanPhotoPreview) return;
  window.cullinanPhotoPreview = true;

  var HOLD_MS = 280;
  var MOVE_PX = 8;
  var MEDIA = '.card__media, .recently-viewed__media';

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
      var on = !!host && overMedia(host, event.clientX, event.clientY);
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

  // Touch and hold.
  var hold = null;
  var heldAt = 0;
  var heldHost = null;

  function cancel() {
    if (!hold) return;
    clearTimeout(hold.timer);
    if (hold.active) show(hold.host, false);
    hold = null;
  }

  document.addEventListener(
    'pointerdown',
    function (event) {
      if (event.pointerType === 'mouse') return;
      cancel();
      var host = hostAt(event.target);
      if (!host || !overMedia(host, event.clientX, event.clientY)) return;
      hold = { host: host, x: event.clientX, y: event.clientY, active: false, timer: 0 };
      hold.timer = setTimeout(function () {
        if (!hold) return;
        hold.active = true;
        show(hold.host, true);
      }, HOLD_MS);
    },
    { passive: true }
  );

  document.addEventListener(
    'pointermove',
    function (event) {
      if (!hold || event.pointerType === 'mouse') return;
      if (Math.abs(event.clientX - hold.x) > MOVE_PX || Math.abs(event.clientY - hold.y) > MOVE_PX) cancel();
    },
    { passive: true }
  );

  document.addEventListener('pointercancel', cancel);
  // The page or the card's own row scrolling ends the preview; other scrollers do not.
  document.addEventListener(
    'scroll',
    function (event) {
      if (!hold) return;
      var t = event.target;
      if (t === document || t === document.documentElement || (t.contains && t.contains(hold.host))) cancel();
    },
    { capture: true, passive: true }
  );

  document.addEventListener('pointerup', function (event) {
    if (!hold || event.pointerType === 'mouse') return;
    if (hold.active) {
      heldAt = Date.now();
      heldHost = hold.host;
    }
    cancel();
  });

  // The release that ends a hold is not a tap: the product does not open.
  document.addEventListener(
    'click',
    function (event) {
      if (!heldHost || Date.now() - heldAt > 700) return;
      if (heldHost.contains(event.target) || hostAt(event.target) === heldHost) {
        event.preventDefault();
        event.stopPropagation();
      }
      heldHost = null;
    },
    true
  );

  // No long-press menu over a previewable photo.
  document.addEventListener('contextmenu', function (event) {
    var host = hostAt(event.target);
    if (host && (hold || Date.now() - heldAt < 700) && overMedia(host, event.clientX, event.clientY)) {
      event.preventDefault();
    }
  });
})();
