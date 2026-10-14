/*
  gold-match.cjs — moves only the yellow gold of a finished photo to ring A's gold (owner, 2026-10-14: a colour-only
  fix on the computer, after both Higgsfield models missed ring A's gold; lesson 27).

  Measured on ring C: GPT Image 2.5's gold has ring A's hue and warmth but is lighter (luminance 191 against ring A's
  172), so it reads pale and yellow. The script darkens the gold's mid-tones with a curve on luminance and adds the
  same amount to red, green and blue, so each pixel keeps its warmth (the gold reads a little richer, as ring A's
  does). Pixels that are not gold are untouched: stones, rhodium, background, shadow (a soft weight on red − blue
  blends the gold's edges). Shape, size and sharpness do not change.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node gold-match.cjs <in.png> <out.png>
  Prints the gold before and after, measured as check-photo.cjs measures it. Then run check-photo.cjs on the result.
*/
const sharp = require('sharp');

// ring A's yellow main photo, as check-photo.cjs measures it (pixels with red − blue > 45 at 512 px)
const TARGET = [208, 165, 114];
const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
const TARGET_L = lum(...TARGET);

// how much of a pixel is gold: none below red − blue 25 (white, grey, background), all above 55
const weight = (r, b) => Math.min(1, Math.max(0, (r - b - 25) / 30));

function apply(data, ch, gamma) {
  const out = Buffer.from(data);
  for (let p = 0; p < data.length; p += ch) {
    const r = data[p], g = data[p + 1], b = data[p + 2];
    const w = weight(r, b);
    if (!w) continue;
    const L = lum(r, g, b);
    const d = w * (255 * Math.pow(L / 255, gamma) - L);
    out[p] = Math.max(0, Math.min(255, Math.round(r + d)));
    out[p + 1] = Math.max(0, Math.min(255, Math.round(g + d)));
    out[p + 2] = Math.max(0, Math.min(255, Math.round(b + d)));
  }
  return out;
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
  let lo = 0.5, hi = 2.5;
  for (let i = 0; i < 30; i++) {
    const mid = (lo + hi) / 2;
    const m = measure(apply(small.data, small.info.channels, mid), small.info.channels);
    if (lum(...m.rgb) > TARGET_L) lo = mid; else hi = mid;
  }
  const gamma = (lo + hi) / 2;

  // apply it to the full-size photo
  const full = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = full.info;
  await sharp(apply(full.data, channels, gamma), { raw: { width, height, channels } }).png().toFile(dst);

  const check = await sharp(dst).resize(512, 512, { fit: 'fill' }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const after = measure(check.data, check.info.channels);
  console.log(JSON.stringify({ src, dst, gamma: Number(gamma.toFixed(3)), before, after, target: TARGET }));
})();
