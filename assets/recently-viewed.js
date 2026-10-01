/*
  <recently-viewed> -- the row of products a visitor opened before this one
  (sections/recently-viewed.liquid, 2026-10-01).

  Keeps a short list in the visitor's own browser (localStorage) and draws the row
  from it; nothing is sent anywhere and nothing is fetched. On a product page the
  current product (read from the element's data attributes) goes to the front of the
  list; the row shows every other product on it. With nothing else to show the
  element stays `hidden`, so a first-time visitor sees the page as it was.

  Everything stored is treated as untrusted when it is read back -- it lives in the
  visitor's browser, where anything can have changed it -- so titles go in as text,
  addresses must be paths on this shop, and a picture must come from this shop or
  Shopify's CDN.
*/

(() => {
  const KEY = 'cullinan_recently_viewed';
  const KEEP = 12;

  const readList = () => {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      return Array.isArray(value) ? value : [];
    } catch (error) {
      return [];
    }
  };

  const writeList = (list) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(list));
    } catch (error) {
      /* private mode or a full store: the row simply will not remember */
    }
  };

  // a path on this shop, never "//host" or a scheme
  const isShopPath = (value) => typeof value === 'string' && /^\/(?!\/)/.test(value);

  // a picture from this shop or Shopify's CDN, as an absolute URL, or ''
  const safeImage = (value) => {
    if (typeof value !== 'string' || !value) return '';
    try {
      const url = new URL(value, window.location.href);
      const host = url.hostname;
      const ok = url.protocol === 'https:' || url.protocol === window.location.protocol;
      // Shopify serves a shop's pictures from cdn.shopify.com or from the shop's own
      // domain under /cdn/shop/, and the preview and the live shop differ in which
      const fromShopify = host === window.location.hostname || host.endsWith('shopify.com') || url.pathname.includes('/cdn/shop/');
      if (ok && fromShopify) return url.toString();
    } catch (error) {
      /* not a URL */
    }
    return '';
  };

  const withWidth = (src, width) => {
    const url = new URL(src);
    url.searchParams.set('width', String(width));
    return url.toString();
  };

  class RecentlyViewed extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('.recently-viewed__track');
      this.buttons = this.querySelector('.recently-viewed__buttons');
      if (!this.track) return;

      const max = Math.max(1, parseInt(this.dataset.max, 10) || 8);
      const current = this.dataset.handle
        ? {
            h: this.dataset.handle,
            t: this.dataset.title || '',
            u: this.dataset.url || '',
            i: this.dataset.image || '',
          }
        : null;

      let list = readList().filter(
        (item) => item && typeof item.h === 'string' && typeof item.t === 'string' && isShopPath(item.u)
      );

      if (current && isShopPath(current.u)) {
        list = [current, ...list.filter((item) => item.h !== current.h)].slice(0, KEEP);
        writeList(list);
      }

      const shown = list.filter((item) => !current || item.h !== current.h).slice(0, max);
      if (!shown.length) return;

      shown.forEach((item) => this.track.append(this.card(item)));
      this.hidden = false;
      this.setupArrows();
    }

    card(item) {
      const li = document.createElement('li');
      li.className = 'recently-viewed__item';

      const link = document.createElement('a');
      link.className = 'recently-viewed__link';
      link.href = item.u;

      const media = document.createElement('div');
      media.className = 'recently-viewed__media';

      const src = safeImage(item.i);
      if (src) {
        const img = new Image();
        img.className = 'recently-viewed__image';
        img.alt = '';
        img.loading = 'lazy';
        img.decoding = 'async';
        img.sizes = '(min-width: 990px) 25vw, 50vw';
        img.srcset = [360, 533, 720, 940].map((width) => `${withWidth(src, width)} ${width}w`).join(', ');
        img.src = withWidth(src, 533);
        media.append(img);
      }

      const title = document.createElement('p');
      title.className = 'recently-viewed__title';
      title.textContent = item.t;

      link.append(media, title);
      li.append(link);
      return li;
    }

    setupArrows() {
      if (!this.buttons) return;
      const prev = this.buttons.querySelector('.slider-button--prev');
      const next = this.buttons.querySelector('.slider-button--next');
      const track = this.track;

      const update = () => {
        const overflows = track.scrollWidth > track.clientWidth + 1;
        this.buttons.hidden = !overflows;
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      };

      // one card and its gap at a time, measured off the live elements
      const step = () => {
        const items = track.querySelectorAll('.recently-viewed__item');
        if (items.length < 2) return track.clientWidth;
        return items[1].offsetLeft - items[0].offsetLeft;
      };

      const go = (direction) => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        track.scrollBy({ left: direction * step(), behavior: reduce ? 'auto' : 'smooth' });
      };

      prev.addEventListener('click', () => go(-1));
      next.addEventListener('click', () => go(1));
      track.addEventListener('scroll', update, { passive: true });
      if ('ResizeObserver' in window) new ResizeObserver(update).observe(track);
      window.addEventListener('resize', update);
      update();
    }
  }

  if (!customElements.get('recently-viewed')) customElements.define('recently-viewed', RecentlyViewed);
})();
