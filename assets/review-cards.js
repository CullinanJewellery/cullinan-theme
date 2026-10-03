/*
  The arrows of the homepage reviews row (sections/review-cards.liquid).

  Nothing is fetched and nothing is drawn here: the cards are printed by the section.
  This only gives the row its previous and next buttons, and only when the cards do
  not all fit -- the same behaviour as the other rows on the site (see
  assets/recently-viewed.js). The track is a plain scroll container, so a finger and
  the keyboard (Tab into a product link) already move it; the buttons step by one card
  and its gap, measured off the live elements, and honour prefers-reduced-motion.
*/
(() => {
  class ReviewCards extends HTMLElement {
    connectedCallback() {
      this.track = this.querySelector('.review-cards__track');
      this.buttons = this.querySelector('.review-cards__buttons');
      if (!this.track || !this.buttons) return;

      const prev = this.buttons.querySelector('.slider-button--prev');
      const next = this.buttons.querySelector('.slider-button--next');
      const track = this.track;
      if (!prev || !next) return;

      const update = () => {
        const overflows = track.scrollWidth > track.clientWidth + 1;
        this.buttons.hidden = !overflows;
        prev.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
      };

      // one card and its gap at a time, measured off the live elements
      const step = () => {
        const items = track.querySelectorAll('.review-cards__item');
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

  if (!customElements.get('review-cards')) customElements.define('review-cards', ReviewCards);
})();
