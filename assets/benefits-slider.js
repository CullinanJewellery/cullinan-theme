/*
  <benefits-slider> (sections/icon-benefits.liquid), 2026-10-04.
  On phones the trust cards are a CSS scroll-snap row, one card per screen (after
  hestiahome.bg's own mobile trust row). This adds what CSS cannot:
  - a small position indicator (one dot per card, the current one filled); each dot
    is a button that scrolls to its card;
  - keyboard access: while the row scrolls sideways it is a focusable region, so the
    arrow keys scroll it, and ArrowLeft/ArrowRight step a whole card.
  No automatic rotation. Smooth scrolling only without reduced-motion. On wider
  screens, where the row is a grid, nothing is added.
*/
if (!customElements.get('benefits-slider')) {
  customElements.define(
    'benefits-slider',
    class BenefitsSlider extends HTMLElement {
      connectedCallback() {
        this.list = this.querySelector('.benefits__grid');
        this.dotsWrap = this.querySelector('.benefits__dots');
        this.items = Array.from(this.list ? this.list.children : []);
        if (!this.list || !this.dotsWrap || this.items.length < 2) return;

        this.phone = window.matchMedia('(max-width: 749px)');
        this.reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

        this.dots = this.items.map((item, i) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'benefits__dot';
          dot.setAttribute('aria-label', 'Карта ' + (i + 1) + ' от ' + this.items.length);
          dot.addEventListener('click', () => this.goTo(i));
          this.dotsWrap.appendChild(dot);
          return dot;
        });

        this.onScroll = () => {
          if (this.frame) return;
          this.frame = requestAnimationFrame(() => {
            this.frame = null;
            this.update();
          });
        };
        this.onKey = (event) => {
          if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
          event.preventDefault();
          this.goTo(this.current() + (event.key === 'ArrowRight' ? 1 : -1));
        };
        this.onMedia = () => this.setup();

        this.list.addEventListener('scroll', this.onScroll, { passive: true });
        this.phone.addEventListener('change', this.onMedia);
        this.setup();

        // 2026-10-22 (owner): on wider screens the cards take turns lifting, as if hovered, every 4 seconds, back and
        // forth (1, 2, 3, 2, 1, 2 …). Pointing at the row pauses it (the hovered card lifts by CSS); none with
        // reduced motion, on phones (there the card in view lifts) or while the row is off screen.
        this.cycleIndex = 0;
        this.cycleStep = 1;
        this.phoneStep = 1;
        this.phoneIndex = 0;
        this.list.addEventListener('mouseenter', () => { this.paused = true; this.lift(-1); });
        // Phones (2026-10-22, owner: move as on the computer): the row slides to the next card on the same beat; a
        // touch pauses it for 8 seconds so it never fights a finger.
        this.list.addEventListener('touchstart', () => { this.touchedAt = Date.now(); }, { passive: true });
        this.list.addEventListener('mouseleave', () => { this.paused = false; this.lift(this.cycleIndex); });
        this.visible = true;
        if ('IntersectionObserver' in window) {
          new IntersectionObserver((entries) => { this.visible = entries[0].isIntersecting; }).observe(this.list);
        }
        this.timer = setInterval(() => this.tick(), 4000);
        this.lift(0);
      }

      cycling() {
        return !this.phone.matches && !this.reduce.matches;
      }

      lift(index) {
        this.items.forEach((item, i) => item.classList.toggle('is-lifted', this.cycling() && i === index));
      }

      tick() {
        if (this.reduce.matches || !this.visible || document.hidden) return;
        if (this.phone.matches) {
          if (Date.now() - (this.touchedAt || 0) < 8000) return;
          const last = this.items.length - 1;
          // Its own count, not the scroll position (which lags while a smooth scroll runs); after a swipe it
          // continues from the card the visitor left in view.
          if (this.touchedAt && this.touchedAt !== this.syncedTouch) {
            this.phoneIndex = this.current();
            this.syncedTouch = this.touchedAt;
          }
          if (this.phoneIndex + this.phoneStep > last || this.phoneIndex + this.phoneStep < 0) this.phoneStep *= -1;
          this.phoneIndex += this.phoneStep;
          this.goTo(this.phoneIndex);
          return;
        }
        if (!this.cycling()) {
          this.lift(-1);
          return;
        }
        if (this.paused) return;
        const last = this.items.length - 1;
        if (this.cycleIndex + this.cycleStep > last || this.cycleIndex + this.cycleStep < 0) this.cycleStep *= -1;
        this.cycleIndex += this.cycleStep;
        this.lift(this.cycleIndex);
      }

      disconnectedCallback() {
        if (this.timer) clearInterval(this.timer);
        if (this.phone) this.phone.removeEventListener('change', this.onMedia);
      }

      setup() {
        const on = this.phone.matches;
        this.dotsWrap.hidden = !on;
        if (on) {
          this.list.setAttribute('tabindex', '0');
          this.list.addEventListener('keydown', this.onKey);
        } else {
          this.list.removeAttribute('tabindex');
          this.list.removeEventListener('keydown', this.onKey);
        }
        this.update();
      }

      current() {
        const x = this.list.scrollLeft;
        let best = 0;
        let bestDist = Infinity;
        this.items.forEach((item, i) => {
          const d = Math.abs(this.offsetOf(item) - x);
          if (d < bestDist) {
            bestDist = d;
            best = i;
          }
        });
        return best;
      }

      // A card's scroll position, measured from the first card (which sits at scroll 0).
      offsetOf(item) {
        return item.offsetLeft - this.items[0].offsetLeft;
      }

      goTo(index) {
        const i = Math.max(0, Math.min(this.items.length - 1, index));
        const item = this.items[i];
        this.list.scrollTo({ left: this.offsetOf(item), behavior: this.reduce.matches ? 'auto' : 'smooth' });
      }

      update() {
        const c = this.current();
        this.dots.forEach((dot, i) => {
          if (i === c) dot.setAttribute('aria-current', 'true');
          else dot.removeAttribute('aria-current');
        });
        // 2026-10-22 (owner): on phones the card in view lifts with the soft ruby shadow the computer shows on
        // hover (section-icon-benefits.css „Filled cards“).
        const on = this.phone.matches;
        this.items.forEach((item, i) => item.classList.toggle('is-current', on && i === c));
      }
    }
  );
}
