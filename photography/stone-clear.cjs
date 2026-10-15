/*
  stone-clear.cjs — takes a colour cast out of a clear stone (owner, 2026-10-15: fix the stone's tint on the computer).
  Each Nano Banana edit of ring D tinted its zircon a little more lilac (red − green 4 → 7 → 10). The stone's
  colourless pixels inside the box get the measured cast moved back to the target cast; gold (red − blue over 25,
  fading in from 18) and anything outside the box are untouched, so the setting and the background do not change.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node stone-clear.cjs <in.png> <out.png> x0,y0,x1,y1 [--like ref.png]
  The box (fractions of the photo) goes round the stone. --like: copy the cast of the same box in an earlier,
  approved photo of the same piece; without it the stone becomes neutral with a hair of cool (blue 2 above red/green).
*/
const sharp = require('sharp');

const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
// colourless stone pixels, not gold: full weight up to red − blue 18, none from 25
const weight = (r, g, b) => {
  const spread = Math.max(r, g, b) - Math.min(r, g, b);
  if (spread > 40 || r + g + b < 200) return 0;
  return Math.min(1, Math.max(0, (25 - (r - b)) / 7));
};

async function cast(file, box) {
  const { data, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const o = [0, 0, 0];
  let n = 0;
  for (let y = Math.round(box[1] * H); y < Math.round(box[3] * H); y++) for (let x = Math.round(box[0] * W); x < Math.round(box[2] * W); x++) {
    const p = (y * W + x) * 3, r = data[p], g = data[p + 1], b = data[p + 2];
    if (weight(r, g, b) < 1) continue;
    const L = lum(r, g, b);
    o[0] += r - L; o[1] += g - L; o[2] += b - L; n++;
  }
  return { data, W, H, cast: o.map((v) => v / n), n };
}

(async () => {
  const args = process.argv.slice(2);
  const li = args.indexOf('--like');
  const like = li >= 0 ? args.splice(li, 2)[1] : null;
  const [src, dst, boxArg] = args;
  if (!src || !dst || !boxArg) throw new Error('usage: node stone-clear.cjs <in.png> <out.png> x0,y0,x1,y1 [--like ref.png]');
  const box = boxArg.split(',').map(Number);
  const s = await cast(src, box);
  const target = like ? (await cast(like, box)).cast : [-0.7, -0.7, 2.6].map((v) => v - (0.3 * -0.7 + 0.59 * -0.7 + 0.11 * 2.6));
  const delta = target.map((v, i) => v - s.cast[i]);

  const { data, W, H } = s;
  const out = Buffer.from(data);
  for (let y = Math.round(box[1] * H); y < Math.round(box[3] * H); y++) for (let x = Math.round(box[0] * W); x < Math.round(box[2] * W); x++) {
    const p = (y * W + x) * 3, r = data[p], g = data[p + 1], b = data[p + 2];
    const w = weight(r, g, b);
    if (!w) continue;
    out[p] = Math.max(0, Math.min(255, Math.round(r + w * delta[0])));
    out[p + 1] = Math.max(0, Math.min(255, Math.round(g + w * delta[1])));
    out[p + 2] = Math.max(0, Math.min(255, Math.round(b + w * delta[2])));
  }
  await sharp(out, { raw: { width: W, height: H, channels: 3 } }).png().toFile(dst);
  const after = await cast(dst, box);
  console.log(JSON.stringify({ src, dst, box, pixels: s.n, castBefore: s.cast.map((v) => +v.toFixed(1)), target: target.map((v) => +v.toFixed(1)), castAfter: after.cast.map((v) => +v.toFixed(1)) }));
})();
