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
  --only file.png: a grey mask the size of the photo; only where it is white may anything change (worn photos: the
               ring's exact outline, e.g. from the difference between the AI yellow and white versions of the same
               photo, where skin and gold have the same hue; ring A's hand, 2026-11-17).
  --keep-light: worn photos. Each metal pixel keeps its own brightness and only takes F's colour at that brightness
               (the five stops placed by their own luminance), because the scene's light differs from the studio's
               (ring A's hand: the percentile map lifted the gold to the studio brightness and it went flat and pale).
  --turn deg: worn photos (use this, not --keep-light). Keeps every metal pixel's brightness and saturation as the AI
               rendered them in the scene's light and only turns its hue (YCbCr chroma angle, negative = toward
               yellow). Ring A's hand, 2026-11-17: the ring sat at −44.5° against F's −58°, but on pink skin the full
               turn read olive; −6° matched the approved F main photo by eye (lesson 84).
  --metal yellow|rose|white: which metal to make (default yellow, F). Rose and white are made from the same yellow AI
               original, so the three metals have the same light, polish and outline (silver is a copy of white).
  --stops: five colours r,g,b separated by "/", replacing F (for trials only; the shop's standard is F).
  --mask file.png: also writes the metal mask (white = changed fully), to check by eye.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node gold-standard.cjs <AI original.png> <out.png> [--stone …] [--box …] [--hue lo,hi] [--mask m.png]
  Then bg-even.cjs, frame-photo.cjs, check-photo.cjs as before.
*/
const sharp = require('sharp');

const F = [[118, 78, 28], [182, 136, 70], [228, 190, 128], [246, 224, 172], [253, 245, 212]];
// rose and white (2026-11-17): the owner's approved rose (202, 152, 122 standard) and white (209, 204, 204 standard),
// measured on the red ring's finished photos at the same tone positions as its yellow, so they keep their approved look
const METALS = {
  yellow: F,
  rose: [[110, 55, 26], [178, 110, 73], [239, 177, 143], [241, 190, 159], [248, 224, 204]], // check-photo ≈ 220, 162, 128 like ring A's and ring B's approved rose (the red ring's own measure includes its stone)
  white: [[116, 109, 107], [166, 161, 161], [219, 215, 215], [229, 225, 225], [242, 239, 236]],
};
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
const METAL = take('--metal') || 'yellow';
if (!METALS[METAL]) { console.error('--metal yellow|rose|white'); process.exit(1); }
const ST = STOPS.length === 5 ? STOPS : METALS[METAL];
const MASK = take('--mask');
const ONLY = take('--only');
const TURN = take('--turn');
const KEEP = args.includes('--keep-light'); if (KEEP) args.splice(args.indexOf('--keep-light'), 1);
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
  const only = ONLY ? await sharp(ONLY).resize(W, H).extractChannel(0).raw().toBuffer() : null;
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
    if (only) wt *= only[i] / 255;
    w[i] = wt;
    if (wt > 0.9) Ls.push(lum(r, g, b));
  }
  // rose and white: the soft rim (a mix of gold and paper, spread 4–18) kept a yellow outline round the piece (ring A,
  // 2026-11-17); within 3 px of full metal a warm pixel changes fully from spread 12. Neutral paper and the grey shadow
  // (spread under 4) are never touched. Yellow keeps the rim as it was (its photos were approved that way).
  if (METAL !== 'yellow') {
    const full = new Uint8Array(N);
    for (let i = 0; i < N; i++) full[i] = w[i] > 0.9 ? 1 : 0;
    let near = full;
    for (let k = 0; k < 3; k++) {
      const n2 = Uint8Array.from(near);
      for (let y = 1; y < H - 1; y++) for (let x = 1; x < W - 1; x++) { const i = y * W + x; if (!near[i] && (near[i - 1] || near[i + 1] || near[i - W] || near[i + W])) n2[i] = 1; }
      near = n2;
    }
    for (let i = 0; i < N; i++) {
      if (!near[i] || w[i] > 0.9 || (only && !only[i])) continue;
      const x = i % W, y = (i / W) | 0;
      if (boxArg && !inside(boxArg, x, y)) continue;
      if (STONES.some((st) => inside(st, x, y))) continue;
      const r = data[3 * i], g = data[3 * i + 1], b = data[3 * i + 2];
      if (r < b) continue;
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      w[i] = Math.max(w[i], Math.min(1, Math.max(0, (spread - 4) / 8)));
    }
  }
  if (Ls.length < 1000) { console.error('too few metal pixels found:', Ls.length); process.exit(1); }
  Ls.sort((a, b) => a - b);
  const PL = QS.map((q) => Ls[Math.floor(q * (Ls.length - 1))]);
  const SL = ST.map((c) => lum(c[0], c[1], c[2]));
  const FL = F.map((c) => lum(c[0], c[1], c[2]));
  const o = Buffer.from(data);
  for (let i = 0; i < N; i++) {
    if (!w[i]) continue;
    if (TURN) {
      const a = (+TURN * Math.PI) / 180, r = data[3 * i], g = data[3 * i + 1], b = data[3 * i + 2];
      const Y = 0.299 * r + 0.587 * g + 0.114 * b, Cb = -0.168736 * r - 0.331264 * g + 0.5 * b, Cr = 0.5 * r - 0.418688 * g - 0.081312 * b;
      const x = Cr * Math.cos(a) - Cb * Math.sin(a), y = Cr * Math.sin(a) + Cb * Math.cos(a);
      const c = [Y + 1.402 * x, Y - 0.344136 * y - 0.714136 * x, Y + 1.772 * y];
      for (let j = 0; j < 3; j++) o[3 * i + j] = Math.round(data[3 * i + j] + (Math.max(0, Math.min(255, c[j])) - data[3 * i + j]) * w[i]);
      continue;
    }
    const L = lum(data[3 * i], data[3 * i + 1], data[3 * i + 2]);
    const P = KEEP ? SL : PL;
    let k = 1;
    while (k < 4 && L > P[k]) k++;
    const f = Math.min(1, Math.max(0, (L - P[k - 1]) / (P[k] - P[k - 1] || 1)));
    const c = [0, 1, 2].map((j) => ST[k - 1][j] + (ST[k][j] - ST[k - 1][j]) * f);
    if (KEEP) {
      // rose and white keep their studio brightness against yellow: lifted by the ratio of their stops to F's at this tone
      let kk = 1;
      while (kk < 4 && L > FL[kk]) kk++;
      const ff = Math.min(1, Math.max(0, (L - FL[kk - 1]) / (FL[kk] - FL[kk - 1] || 1)));
      const ratio = (SL[kk - 1] / FL[kk - 1]) * (1 - ff) + (SL[kk] / FL[kk]) * ff;
      const L2 = Math.min(250, L * ratio);
      let k2 = 1;
      while (k2 < 4 && L2 > SL[k2]) k2++;
      const f2 = Math.min(1, Math.max(0, (L2 - SL[k2 - 1]) / (SL[k2] - SL[k2 - 1] || 1)));
      for (let j = 0; j < 3; j++) c[j] = ST[k2 - 1][j] + (ST[k2][j] - ST[k2 - 1][j]) * f2;
      const q = L2 / (lum(c[0], c[1], c[2]) || 1);
      for (let j = 0; j < 3; j++) c[j] = Math.min(255, c[j] * q);
    }
    for (let j = 0; j < 3; j++) {
      o[3 * i + j] = Math.round(data[3 * i + j] + (c[j] - data[3 * i + j]) * w[i]);
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
