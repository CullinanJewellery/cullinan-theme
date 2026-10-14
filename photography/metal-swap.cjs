/*
  metal-swap.cjs — makes the white gold and rose gold versions from the finished yellow photo by changing only the
  colour of the gold (owner, 2026-10-14: "i just need the color to change, nothing else"; lesson 31). A model's
  "colour change" redraws the whole photo; this changes no pixel that is not gold.

  For every pixel the gold part is found by how warm it is (red − blue; the same soft weight as gold-match.cjs, so
  edges blend). Its brightness is kept exactly; only its colour is moved: the pixel's warmth, relative to the yellow
  photo's average gold, is given the target metal's colour instead. Highlights stay highlights, shadows stay shadows,
  sharpness and size do not change. Stones, white rhodium, background and shadow are not warm, so they are untouched.

  Targets: ring A's white and rose main photos, as check-photo.cjs measures them (white 155, 150, 150 there: a hair
  warm, so white is set a hair cool instead, the owner's rule "no yellow, beige or champagne"; rose 214, 160, 128).

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node metal-swap.cjs <white|rose> <yellow.png> <out.png>
*/
const sharp = require('sharp');

const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
// how much of a pixel takes the new metal's colour: none up to red − blue 8 (the off-white background is 2–8), all
// from 28; in between are the gold's faint reflections on the floor and in the stones, which must change with it
// (ring C, 2026-10-14: a white ring kept a gold glow on the floor when only red − blue > 25 was changed)
const weight = (r, b) => Math.min(1, Math.max(0, (r - b - 8) / 20));

// the target metal's colour as an offset from its own brightness (red, green, blue minus luminance)
const TARGET = {
  rose: [214, 160, 128],
  white: null, // neutral with a hair of cool: see below
};
function targetOffset(kind) {
  if (kind === 'white') return [-1.5, -0.5, 3]; // a cool, neutral white (blue a little above red)
  const t = TARGET[kind];
  const L = lum(...t);
  return t.map((v) => v - L);
}

(async () => {
  const [kind, src, dst] = process.argv.slice(2);
  if (!['white', 'rose'].includes(kind) || !src || !dst) throw new Error('usage: node metal-swap.cjs <white|rose> <yellow.png> <out.png>');
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;

  // the yellow photo's average gold offset (pixels clearly gold), to measure each pixel's warmth against
  const avg = [0, 0, 0];
  let n = 0;
  for (let p = 0; p < data.length; p += ch) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    if (r - b > 45) { const L = lum(r, g, b); avg[0] += r - L; avg[1] += g - L; avg[2] += b - L; n++; }
  }
  const yo = avg.map((v) => v / n);
  const ynorm = Math.hypot(...yo);
  const to = targetOffset(kind);

  const out = Buffer.from(data);
  for (let p = 0; p < data.length; p += ch) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const w = weight(r, b);
    if (!w) continue;
    const L = lum(r, g, b);
    // how warm this pixel is, along the yellow gold's direction (0 = neutral, 1 = average gold)
    const s = Math.max(0, ((r - L) * yo[0] + (g - L) * yo[1] + (b - L) * yo[2]) / (ynorm * ynorm));
    const nr = L + s * to[0], ng = L + s * to[1], nb = L + s * to[2];
    out[p] = Math.max(0, Math.min(255, Math.round(r + w * (nr - r))));
    out[p + 1] = Math.max(0, Math.min(255, Math.round(g + w * (ng - g))));
    out[p + 2] = Math.max(0, Math.min(255, Math.round(b + w * (nb - b))));
  }
  await sharp(out, { raw: { width: info.width, height: info.height, channels: ch } }).png().toFile(dst);
  console.log(JSON.stringify({ kind, src, dst, yellowOffset: yo.map((v) => Math.round(v)), targetOffset: to.map((v) => Math.round(v)) }));
})();
