/*
  The product zoom viewer (snippets/product-media-modal.liquid, assets/component-product-viewer.css),
  after moonmagic's: one picture at a time on a white screen, a vertical strip of thumbnails on the
  left from 990px up, a thin progress bar under the picture below that, CLOSE at the top right.

  Dawn's own ProductModal showed every picture in one scrolling column. This keeps what it did that
  still matters -- opened from a picture's own button (`show(opener)`), the opener's `data-media-id`
  says which picture to start on, Escape closes, focus returns to the opener -- and replaces the rest.

  Everything the visitor sees besides the pictures is built here, each time the viewer opens, from
  the pictures that are in the content at that moment: assets/product-info.js overwrites the content's
  innerHTML when a variant is chosen, so a strip printed by Liquid would go stale.
*/
if (!customElements.get('product-modal')) {
  customElements.define(
    'product-modal',
    class ProductModal extends ModalDialog {
      constructor() {
        super();
        this.current = null;
        this.index = 0;
        this.swipe = null;

        this.dialog = this.querySelector('[role="dialog"]');
        this.stage = this.querySelector('.product-media-modal__stage');
        this.thumbsBox = this.querySelector('.product-media-modal__thumbs');
        this.thumbList = this.querySelector('.product-media-modal__thumb-list');
        this.arrowUp = this.querySelector('.product-media-modal__thumbs-arrow--up');
        this.arrowDown = this.querySelector('.product-media-modal__thumbs-arrow--down');
        this.progress = this.querySelector('.product-media-modal__progress');
        this.status = this.querySelector('.product-media-modal__status');

        this.addEventListener('keydown', this.onKeyDown.bind(this));
        // ModalDialog closes a `media-modal` on any mouse click; this one closes only from the empty
        // space round the picture, so the thumbnails, the arrows and the picture itself can be clicked.
        this.addEventListener('pointerup', this.onPointerUp.bind(this));

        if (this.stage) {
          this.stage.addEventListener('pointerdown', (event) => {
            if (event.pointerType !== 'mouse') this.swipe = { x: event.clientX, y: event.clientY };
          });
          this.stage.addEventListener('pointerup', this.onSwipeEnd.bind(this));
          this.stage.addEventListener('pointercancel', () => (this.swipe = null));
        }

        if (this.thumbList) this.thumbList.addEventListener('scroll', () => this.updateArrows(), { passive: true });
        if (this.arrowUp) this.arrowUp.addEventListener('click', () => this.scrollThumbs(-1));
        if (this.arrowDown) this.arrowDown.addEventListener('click', () => this.scrollThumbs(1));
      }

      get content() {
        return this.querySelector('.product-media-modal__content');
      }

      get reducedMotion() {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      }

      // The pictures the viewer steps through: what the gallery shows. Variant pictures that the gallery
      // hides stay hidden here too, except the one that is first (the chosen variant's own).
      slides() {
        const content = this.content;
        if (!content) return [];
        const first = content.firstElementChild;
        return Array.from(content.children).filter(
          (element) => !element.classList.contains('product__media-item--variant') || element === first
        );
      }

      show(opener) {
        const slides = this.slides();
        const id = opener.getAttribute('data-media-id');
        const wanted = Math.max(
          0,
          slides.findIndex((slide) => slide.getAttribute('data-media-id') === id)
        );

        // before super.show(), which works out what can take focus
        this.buildThumbs(slides);
        super.show(opener);
        // Dawn's trap takes the first and last focusable element in the markup whether it is shown or
        // not, and the thumbnails are not shown on a phone; this one only counts what can be seen.
        removeTrapFocus();

        this.setActive(wanted, true);
        this.updateArrows();
      }

      hide() {
        super.hide();
        // the layer fades out and the picture slides away for 0.3s after `open` goes (the stylesheet)
        this.classList.add('is-closing');
        clearTimeout(this.closeTimer);
        this.closeTimer = setTimeout(() => this.classList.remove('is-closing'), 320);
      }

      buildThumbs(slides) {
        if (!this.thumbList) return;
        this.thumbList.replaceChildren();
        const several = slides.length > 1;
        if (this.thumbsBox) this.thumbsBox.hidden = !several;
        if (this.progress) this.progress.hidden = !several;
        if (!several) return;

        slides.forEach((slide, index) => {
          const image = slide.nodeName === 'IMG' ? slide : slide.querySelector('img');
          const source = image ? image.getAttribute('src') || image.currentSrc || '' : '';

          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'product-media-modal__thumb';
          button.setAttribute('aria-label', `Снимка ${index + 1} от ${slides.length}`);
          if (slide.nodeName !== 'IMG') button.classList.add('product-media-modal__thumb--video');

          if (source) {
            const thumb = document.createElement('img');
            thumb.src = source.replace(/([?&])width=\d+/, '$1width=240');
            thumb.alt = '';
            thumb.width = 100;
            thumb.height = 100;
            thumb.loading = 'lazy';
            button.append(thumb);
          }

          button.addEventListener('click', () => this.setActive(index));
          this.thumbList.append(button);
        });
      }

      setActive(index, instant = false) {
        const slides = this.slides();
        if (!slides.length) return;
        index = Math.max(0, Math.min(slides.length - 1, index));
        const next = slides[index];
        const previous = this.current && this.current !== next ? this.current : null;

        // Only the picture and its two neighbours are drawn; the rest stay display: none, so their
        // lazy images are not fetched until the visitor gets near them.
        slides.forEach((slide, i) => slide.classList.toggle('is-near', Math.abs(i - index) <= 1));
        // A picture that has just been drawn needs a frame at opacity 0 before it is made active, or it
        // appears without fading in.
        if (!instant) void this.content.offsetWidth;
        slides.forEach((slide) => slide.classList.toggle('active', slide === next));

        if (previous && !instant) {
          previous.classList.add('is-leaving');
          clearTimeout(this.leaveTimer);
          this.leaveTimer = setTimeout(() => {
            this.content.querySelectorAll('.is-leaving').forEach((element) => element.classList.remove('is-leaving'));
          }, 350);
        }

        this.current = next;
        this.index = index;

        if (window.pauseAllMedia) window.pauseAllMedia();
        if (next.nodeName === 'DEFERRED-MEDIA') {
          const template = next.querySelector('template');
          if (template && template.content && template.content.querySelector('.js-youtube')) next.loadContent();
        }

        if (this.thumbList) {
          Array.from(this.thumbList.children).forEach((button, i) => {
            button.classList.toggle('is-current', i === index);
            if (i === index) button.setAttribute('aria-current', 'true');
            else button.removeAttribute('aria-current');
          });
          this.revealThumb(index, instant);
        }

        this.style.setProperty('--viewer-index', index);
        this.style.setProperty('--viewer-count', slides.length);
        if (this.status && slides.length > 1) this.status.textContent = `Снимка ${index + 1} от ${slides.length}`;
      }

      go(step) {
        this.setActive(this.index + step);
      }

      // Scroll the strip just far enough to show the current thumbnail, if the strip is on screen.
      revealThumb(index, instant) {
        const list = this.thumbList;
        const thumb = list && list.children[index];
        if (!thumb || !list.getClientRects().length) return;
        const offset = thumb.getBoundingClientRect().top - list.getBoundingClientRect().top;
        const overshoot = offset + thumb.offsetHeight - list.clientHeight;
        const behavior = instant || this.reducedMotion ? 'auto' : 'smooth';
        if (offset < 0) list.scrollBy({ top: offset, behavior });
        else if (overshoot > 0) list.scrollBy({ top: overshoot, behavior });
      }

      scrollThumbs(direction) {
        const list = this.thumbList;
        if (!list || list.children.length < 2) return;
        const step = list.children[1].offsetTop - list.children[0].offsetTop;
        list.scrollBy({ top: direction * step, behavior: this.reducedMotion ? 'auto' : 'smooth' });
      }

      // The arrows exist only when the strip is longer than the room for it, and dim at each end.
      updateArrows() {
        const list = this.thumbList;
        if (!list || !this.arrowUp || !this.arrowDown) return;
        const overflows = list.scrollHeight > list.clientHeight + 1;
        this.arrowUp.hidden = this.arrowDown.hidden = !overflows;
        this.arrowUp.disabled = list.scrollTop <= 1;
        this.arrowDown.disabled = list.scrollTop + list.clientHeight >= list.scrollHeight - 1;
      }

      onKeyDown(event) {
        if (event.target.closest && event.target.closest('input, textarea, select, deferred-media video, deferred-media iframe, product-model')) {
          return;
        }
        if (event.key === 'Tab') {
          this.trapTab(event);
          return;
        }
        const steps = { ArrowLeft: -1, ArrowUp: -1, ArrowRight: 1, ArrowDown: 1 };
        if (event.key in steps) {
          event.preventDefault();
          this.go(steps[event.key]);
        } else if (event.key === 'Home') {
          event.preventDefault();
          this.setActive(0);
        } else if (event.key === 'End') {
          event.preventDefault();
          this.setActive(this.slides().length - 1);
        }
      }

      // Tab stays inside the viewer, wrapping between the first and last control that is actually shown.
      trapTab(event) {
        const items = Array.from(
          this.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex^="-"])')
        ).filter((element) => element.getClientRects().length > 0);
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || active === this.dialog)) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }

      onPointerUp(event) {
        if (event.pointerType !== 'mouse' || event.button !== 0) return;
        const target = event.target;
        if (target === this || target === this.dialog || target === this.stage || target === this.content) this.hide();
      }

      onSwipeEnd(event) {
        if (!this.swipe) return;
        const dx = event.clientX - this.swipe.x;
        const dy = event.clientY - this.swipe.y;
        this.swipe = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5) this.go(dx < 0 ? 1 : -1);
      }
    }
  );
}
