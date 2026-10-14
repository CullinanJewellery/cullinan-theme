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
    node metal-swap.cjs <white|rose> <yellow.png> <out.png> [--hand x0,y0,x1,y1]

  --hand: the owner saw the test (ring A and ring C, 2026-10-14) and said "it works, i like it". Its weak points
  (lesson 32): gold in shadow has skin's hue, so shaded beads can stay gold, and a few skin highlights can turn into
  pale specks. For every worn photo (hand, ear, neck, wrist) show the owner the result, ask whether they like it,
  and say what more work could improve it before it is final.
  --hand (photos on a hand): skin is warm like gold, so warmth alone would tint the finger. Only pixels inside the box
  (fractions of the photo, round the ring) whose hue is gold's change: measured on ring A's hand photo, skin is hue
  12–27°, the gold 27–36° and more. The weight ramps in from hue 24° to 29° and from saturation 0.15 to 0.25, so
  edges blend; near-white highlights and the gold's reflections of the skin stay as they are (a polished white ring
  reflects skin too).
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

// hue (degrees) and saturation of a pixel
function hs(r, g, b) {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (!d) return [0, 0];
  let h = mx === r ? 60 * (((g - b) / d) % 6) : mx === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
  if (h < 0) h += 360;
  return [h, d / mx];
}
const ramp = (v, a, b) => Math.min(1, Math.max(0, (v - a) / (b - a)));
// on a hand: gold hue (24–29° in, 50–60° out) and enough colour (saturation 0.15–0.25)
function handWeight(r, g, b) {
  const [h, s] = hs(r, g, b);
  return Math.min(ramp(h, 24, 29), 1 - ramp(h, 50, 60)) * ramp(s, 0.15, 0.25);
}

(async () => {
  const args = process.argv.slice(2);
  const hi = args.indexOf('--hand');
  const box = hi >= 0 ? args.splice(hi, 2)[1].split(',').map(Number) : null;
  const [kind, src, dst] = args;
  if (!['white', 'rose'].includes(kind) || !src || !dst) throw new Error('usage: node metal-swap.cjs <white|rose> <yellow.png> <out.png> [--hand x0,y0,x1,y1]');
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels, W = info.width, H = info.height;
  const inBox = (i) => {
    if (!box) return true;
    const x = (i % W) / W, y = Math.floor(i / W) / H;
    return x >= box[0] && x <= box[2] && y >= box[1] && y <= box[3];
  };
  const pixelWeight = (i, r, g, b) => (box ? (inBox(i) ? handWeight(r, g, b) : 0) : weight(r, b));

  // the yellow photo's average gold offset (pixels clearly gold), to measure each pixel's warmth against
  const avg = [0, 0, 0];
  let n = 0;
  for (let p = 0, i = 0; p < data.length; p += ch, i++) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const gold = box ? inBox(i) && handWeight(r, g, b) === 1 : r - b > 45;
    if (gold) { const L = lum(r, g, b); avg[0] += r - L; avg[1] += g - L; avg[2] += b - L; n++; }
  }
  const yo = avg.map((v) => v / n);
  const ynorm = Math.hypot(...yo);
  const to = targetOffset(kind);

  const out = Buffer.from(data);
  for (let p = 0, i = 0; p < data.length; p += ch, i++) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const w = pixelWeight(i, r, g, b);
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
