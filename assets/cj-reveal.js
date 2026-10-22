/*
  Reveal on scroll (2026-10-22, owner: the phone categories as a vertical gallery "that catches the eye"). Children
  of a [data-cj-reveal] list rise and fade in as each one scrolls into view; CSS decides where it applies (phones,
  section-category-mosaic.css) and does nothing with reduced motion. Without this script, or before it runs,
  everything is simply shown: the hidden state exists only once the list has .cj-reveal-on.
*/
(function () {
  if (window.cullinanReveal) return;
  window.cullinanReveal = true;
  if (!('IntersectionObserver' in window)) return;

  function setup(list) {
    if (list.classList.contains('cj-reveal-on')) return;
    var items = Array.prototype.slice.call(list.children);
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          // A box beside another in the same row comes in a beat after it.
          var top = entry.target.offsetTop;
          var place = items.filter(function (other) { return other.offsetTop === top; }).indexOf(entry.target);
          if (place > 0) entry.target.style.transitionDelay = place * 0.12 + 's';
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );
    list.classList.add('cj-reveal-on');
    items.forEach(function (item) {
      observer.observe(item);
    });
  }

  function init() {
    document.querySelectorAll('[data-cj-reveal]').forEach(setup);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('shopify:section:load', init);
})();
