/*
  gold-standard.cjs — gives the yellow gold of a photo the shop's one gold look (owner, 2026-11-17: option „F“).

  Why: after many stacked edits the gold differed from photo to photo in colour, brightness and polish, and the old
  colour scripts (gold-match.cjs etc.) moved only the average colour and sometimes coloured pixels round the piece.
  This script always starts from the AI original (the Higgsfield 4K file in the piece's чернови), never from an edited
  copy, and sets the whole tone scale of the metal at once, the way a retoucher's gradient map does:
    the metal's own brightness at its 2nd / 10th / 50th / 90th / 99.5th percentile is mapped to five fixed gold colours
    (deep shadow, shadow, mid, light, highlight). So colour, brightness and polish come out the same on every piece,
    while each piece keeps its own light and reflections (only the colour scale changes, never the shape).
  Research behind F: reports/Luxury gold photo standard.md (luxury cluster ≈ 219,187,133; F measures ≈ 218,185,128,
  shine p95 ≈ 227–229, darkest 5 % ≈ 119–122 with check-photo.cjs's R−B>45 measure).

  Only metal changes. A pixel's weight is 0 unless it is clearly coloured (spread max−min from 18, fully from 40) and
  warm (red ≥ blue): background, grey shadow, white rhodium and colourless stones keep their exact bytes. The script
  counts every pixel outside the metal that changed and stops with an error if any did (spill check).
  --stone x0,y0,x1,y1 (fractions, repeatable): inside the box nothing changes (coloured stones, enamel, pearls).
  --box x0,y0,x1,y1 (fractions): only inside this box may anything change (worn photos: the ring, not the skin).
  --hue lo,hi: only pixels whose hue (degrees, HSV) is in this window count as metal (worn photos: skin is ~10–30°,
               this gold ~35–50°); default no window.
  --stops: five colours r,g,b separated by "/", replacing F (for trials only; the shop's standard is F).
  --mask file.png: also writes the metal mask (white = changed fully), to check by eye.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node gold-standard.cjs <AI original.png> <out.png> [--stone …] [--box …] [--hue lo,hi] [--mask m.png]
  Then bg-even.cjs, frame-photo.cjs, check-photo.cjs as before.
*/
const sharp = require('sharp');

const F = [[118, 78, 28], [182, 136, 70], [228, 190, 128], [246, 224, 172], [253, 245, 212]];
const QS = [0.02, 0.1, 0.5, 0.9, 0.995];

const args = process.argv.slice(2);
const take = (name, many) => {
  const out = [];
  for (let i = args.indexOf(name); i >= 0; i = args.indexOf(name)) out.push(args.splice(i, 2)[1]);
  return many ? out : out[0];
};
const nums = (s) => s.split(',').map(Number);
const STONES = take('--stone', true).map(nums);
const BOXS = take('--box');
const boxArg = BOXS ? nums(BOXS) : null;
const HUE = take('--hue');
const HUEW = HUE ? nums(HUE) : null;
const STOPS = (take('--stops') || '').split('/').filter(Boolean).map(nums);
const ST = STOPS.length === 5 ? STOPS : F;
const MASK = take('--mask');
const [inp, out] = args;
if (!inp || !out) { console.error('usage: node gold-standard.cjs in.png out.png [options]'); process.exit(1); }

const lum = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const hue = (r, g, b) => {
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn;
  if (!d) return 0;
  let h = mx === r ? ((g - b) / d) % 6 : mx === g ? (b - r) / d + 2 : (r - g) / d + 4;
  return (h * 60 + 360) % 360;
};

(async () => {
  const { data, info } = await sharp(inp).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, N = W * H, w = new Float32Array(N);
  const inside = (b, x, y) => x >= b[0] * W && x <= b[2] * W && y >= b[1] * H && y <= b[3] * H;
  const Ls = [];
  for (let i = 0; i < N; i++) {
    const x = i % W, y = (i / W) | 0;
    if (boxArg && !inside(boxArg, x, y)) continue;
    if (STONES.some((s) => inside(s, x, y))) continue;
    const r = data[3 * i], g = data[3 * i + 1], b = data[3 * i + 2];
    if (r < b) continue;
    const spread = Math.max(r, g, b) - Math.min(r, g, b);
    let wt = Math.min(1, Math.max(0, (spread - 18) / 22));
    if (HUEW && wt > 0) { const h = hue(r, g, b); if (h < HUEW[0] || h > HUEW[1]) wt = 0; }
    w[i] = wt;
    if (wt > 0.9) Ls.push(lum(r, g, b));
  }
  if (Ls.length < 1000) { console.error('too few metal pixels found:', Ls.length); process.exit(1); }
  Ls.sort((a, b) => a - b);
  const PL = QS.map((q) => Ls[Math.floor(q * (Ls.length - 1))]);
  const o = Buffer.from(data);
  for (let i = 0; i < N; i++) {
    if (!w[i]) continue;
    const L = lum(data[3 * i], data[3 * i + 1], data[3 * i + 2]);
    let k = 1;
    while (k < 4 && L > PL[k]) k++;
    const f = Math.min(1, Math.max(0, (L - PL[k - 1]) / (PL[k] - PL[k - 1] || 1)));
    for (let j = 0; j < 3; j++) {
      const c = ST[k - 1][j] + (ST[k][j] - ST[k - 1][j]) * f;
      o[3 * i + j] = Math.round(data[3 * i + j] + (c - data[3 * i + j]) * w[i]);
    }
  }
  let spill = 0;
  for (let i = 0; i < N; i++) {
    if (w[i]) continue;
    if (o[3 * i] !== data[3 * i] || o[3 * i + 1] !== data[3 * i + 1] || o[3 * i + 2] !== data[3 * i + 2]) spill++;
  }
  if (spill) { console.error('SPILL: ' + spill + ' pixels outside the metal changed; nothing written'); process.exit(2); }
  await sharp(o, { raw: info }).png().toFile(out);
  if (MASK) await sharp(Buffer.from(Array.from(w, (v) => Math.round(v * 255))), { raw: { width: W, height: H, channels: 1 } }).png().toFile(MASK);
  console.log(`${out}: metal ${Ls.length} px, source brightness p2/10/50/90/99.5 ${PL.map(Math.round).join('/')}, 0 pixels changed outside the metal`);
})();
