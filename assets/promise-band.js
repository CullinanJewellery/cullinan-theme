/*
  Promise band on phones (sections/cj-promise-band.liquid, 2026-11-02, owner: as beornare.com, „the lines down when
  you swipe“ — their screenshot: a thin light line across the band with a dark part that shows where the row is).
  The list scrolls sideways (CSS scroll-snap); this sizes the dark part to the share of the row in view and slides it
  as the row scrolls. Above 749px the list is a plain grid and the line is hidden by CSS.
*/
if (!customElements.get('promise-slider')) {
  customElements.define(
    'promise-slider',
    class PromiseSlider extends HTMLElement {
      connectedCallback() {
        this.list = this.querySelector('.promise-band__list');
        this.track = this.querySelector('.promise-band__progress');
        this.bar = this.querySelector('.promise-band__progress-bar');
        if (!this.list || !this.track || !this.bar) return;
        this.list.addEventListener('scroll', () => this.update(), { passive: true });
        window.addEventListener('resize', () => this.update());
        this.update();
      }

      update() {
        const total = this.list.scrollWidth;
        const visible = this.list.clientWidth;
        if (!total || !visible) return;
        const share = Math.min(1, visible / total);
        const max = total - visible;
        const progress = max > 0 ? this.list.scrollLeft / max : 0;
        const trackWidth = this.track.clientWidth;
        const barWidth = trackWidth * share;
        this.bar.style.width = barWidth + 'px';
        this.bar.style.transform = 'translateX(' + (trackWidth - barWidth) * progress + 'px)';
      }
    }
  );
}
