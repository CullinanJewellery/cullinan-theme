/*
  gold-match.cjs — moves only the yellow gold of a finished photo to ring A's gold (owner, 2026-10-14: a colour-only
  fix on the computer, after both Higgsfield models missed ring A's gold; lesson 27).

  Measured on ring C: GPT Image 2.5's gold has ring A's hue and warmth but is lighter (luminance 191 against ring A's
  172), so it reads pale and yellow. The script darkens the gold's mid-tones with a curve on luminance and adds the
  same amount to red, green and blue, so each pixel keeps its warmth (the gold reads a little richer, as ring A's
  does). Pixels that are not gold are untouched: stones, rhodium, background, shadow (a soft weight on red − blue
  blends the gold's edges). Shape, size and sharpness do not change.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node gold-match.cjs <in.png> <out.png> [--target r,g,b] [--stone x0,y0,x1,y1 ...]
  --stone: a box round each stone; inside, only clearly gold pixels change (red − blue from 35, fully from 55), so
  the stone and its reflections stay as they are (as in metal-swap.cjs).
  --target: another gold to match, e.g. an earlier approved photo of the same piece (ring D, 2026-10-15: each Nano
  Banana edit drifted the gold paler, so it goes back to the first photo's 217,178,132). With a target, the gold's
  colour (its warmth round the brightness) is moved to the target's too, not only its brightness.
  Prints the gold before and after, measured as check-photo.cjs measures it. Then run check-photo.cjs on the result.
*/
const sharp = require('sharp');

const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
// ring A's yellow main photo, as check-photo.cjs measures it (pixels with red − blue > 45 at 512 px), or --target
const ti = process.argv.indexOf('--target');
const TARGET = ti >= 0 ? process.argv.splice(ti, 2)[1].split(',').map(Number) : [212, 172, 104]; // the owner's yellow since 2026-10-30, further from rose (ring A's 208, 165, 114 before)
const MOVE_COLOUR = ti >= 0;
const TARGET_L = lum(...TARGET);

// how much of a pixel is gold: none below red − blue 25 (white, grey, background), all above 55
const weightAll = (r, b) => Math.min(1, Math.max(0, (r - b - 25) / 30));
const STONES = [];
for (let si = process.argv.indexOf('--stone'); si >= 0; si = process.argv.indexOf('--stone')) STONES.push(process.argv.splice(si, 2)[1].split(',').map(Number));
// set per photo in apply(): width and height, to place each pixel against the stone boxes
let IMG = { W: 1, H: 1 };
const inStone = (i) => {
  const x = (i % IMG.W) / IMG.W, y = Math.floor(i / IMG.W) / IMG.H;
  return STONES.some(([x0, y0, x1, y1]) => x >= x0 && x <= x1 && y >= y0 && y <= y1);
};
const weight = (r, b, i) => (STONES.length && inStone(i) ? Math.min(1, Math.max(0, (r - b - 35) / 20)) : weightAll(r, b));

// shift: optional colour move { yo: the photo's average gold offset, delta: target offset − that offset }; each pixel
// gets it in proportion to how warm it is (its offset along the average gold's), so highlights and shadows follow
function apply(data, ch, gamma, shift, size) {
  IMG = size || IMG;
  const out = Buffer.from(data);
  const yn = shift ? shift.yo[0] ** 2 + shift.yo[1] ** 2 + shift.yo[2] ** 2 : 0;
  for (let p = 0, i = 0; p < data.length; p += ch, i++) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const w = weight(r, b, i);
    if (!w) continue;
    const L = lum(r, g, b);
    const d = w * (255 * Math.pow(L / 255, gamma) - L);
    let c = [0, 0, 0];
    if (shift) {
      const s = Math.max(0, ((r - L) * shift.yo[0] + (g - L) * shift.yo[1] + (b - L) * shift.yo[2]) / yn);
      c = shift.delta.map((v) => w * s * v);
    }
    out[p] = Math.max(0, Math.min(255, Math.round(r + d + c[0])));
    out[p + 1] = Math.max(0, Math.min(255, Math.round(g + d + c[1])));
    out[p + 2] = Math.max(0, Math.min(255, Math.round(b + d + c[2])));
  }
  return out;
}

// the average offset of the clearly gold pixels (red − blue > 45) from their brightness
function goldOffset(data, ch) {
  const o = [0, 0, 0];
  let n = 0;
  for (let p = 0; p < data.length; p += ch) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    if (r - b > 45) { const L = lum(r, g, b); o[0] += r - L; o[1] += g - L; o[2] += b - L; n++; }
  }
  return o.map((v) => v / n);
}

function measure(data, ch) {
  const s = [0, 0, 0];
  const l = [];
  for (let p = 0; p < data.length; p += ch) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    if (r - b > 45) { s[0] += r; s[1] += g; s[2] += b; l.push(lum(r, g, b)); }
  }
  const n = l.length;
  l.sort((a, c) => a - c);
  return { rgb: s.map((v) => Math.round(v / n)), shine: Math.round(l[Math.floor(0.95 * (n - 1))]) };
}

(async () => {
  const [src, dst] = process.argv.slice(2);
  if (!src || !dst) throw new Error('usage: node gold-match.cjs <in.png> <out.png>');

  // find the curve on a 512 px copy, measured exactly as check-photo.cjs does
  const small = await sharp(src).resize(512, 512, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const before = measure(small.data, small.info.channels);
  let shift = null;
  if (MOVE_COLOUR) {
    const yo = goldOffset(small.data, small.info.channels);
    const to = TARGET.map((v) => v - TARGET_L);
    shift = { yo, delta: to.map((v, i) => v - yo[i]) };
  }
  let lo = 0.5, hi = 2.5;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    const m = measure(apply(small.data, small.info.channels, mid, shift, { W: small.info.width, H: small.info.height }), small.info.channels);
    if (lum(...m.rgb) > TARGET_L) lo = mid; else hi = mid;
  }
  const gamma = (lo + hi) / 2;

  // apply it to the full-size photo
  const full = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = full.info;
  await sharp(apply(full.data, channels, gamma, shift, { W: width, H: height }), { raw: { width, height, channels } }).png().toFile(dst);

  const check = await sharp(dst).resize(512, 512, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = measure(check.data, check.info.channels);
  console.log(JSON.stringify({ src, dst, gamma: Number(gamma.toFixed(3)), before, after, target: TARGET }));
})();
