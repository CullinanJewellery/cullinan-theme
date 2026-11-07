/*
  gold-look-match.cjs — gives a photo's yellow gold the look of a reference photo's gold (owner, 2026-11-07: "make ring
  A look like the red ring"). Two photos can have the same average gold (gold-match.cjs) and still look different:
  ring A's gold leaned orange (hue about 36 deg, median brightness 223), the red ring's yellow (45 deg, 244). This maps
  the distribution of hue, saturation and brightness of the gold pixels onto the reference's (quantile mapping, per
  pixel, nothing moved or drawn). Gold = red above blue by 25+ (soft) and hue 15-70 deg, so red stones, skin-free
  backgrounds and shadows are left alone (in the reference, stones are excluded the same way).
  Usage (needs sharp, NODE_PATH as for check-photo.cjs): node gold-look-match.cjs <reference.png> <in.png> <out.png>
*/
const sharp = require('sharp');
const hsv = (r, g, b) => { const mx = Math.max(r, g, b), mn = Math.min(r, g, b), d = mx - mn; let h = 0;
  if (d) { if (mx === r) h = ((g - b) / d) * 60; else if (mx === g) h = ((b - r) / d + 2) * 60; else h = ((r - g) / d + 4) * 60; }
  if (h < 0) h += 360; return [h, mx ? d / mx : 0, mx]; };
const rgb = (h, s, v) => { const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c; let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0]; else if (h < 120) [r, g, b] = [x, c, 0]; else [r, g, b] = [c, 0, x]; return [r + m, g + m, b + m]; };
const isGold = (r, g, b) => { if (r - b <= 45) return null; const p = hsv(r, g, b); return p[0] >= 15 && p[0] <= 70 ? p : null; };
const BINS = 512, scale = [70, 1, 255];
function cdfs(d) { const h = [0, 1, 2].map(() => new Float64Array(BINS));
  for (let p = 0; p < d.length; p += 3) { const q = isGold(d[p], d[p + 1], d[p + 2]); if (!q) continue;
    for (let c = 0; c < 3; c++) h[c][Math.min(BINS - 1, Math.floor((q[c] / scale[c]) * BINS))]++; }
  return h.map((a) => { const n = a.reduce((x, y) => x + y, 0); let t = 0; return Array.from(a, (v) => (t += v) / n); }); }
(async () => {
  const [ref, inp, out] = process.argv.slice(2);
  if (!out) throw new Error('usage: node gold-look-match.cjs <reference> <in> <out>');
  const A = await sharp(ref).removeAlpha().raw().toBuffer();
  const B = await sharp(inp).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const ca = cdfs(A), cb = cdfs(B.data);
  const map = [0, 1, 2].map((c) => { const m = new Float64Array(BINS); let j = 0;
    for (let i = 0; i < BINS; i++) { while (j < BINS - 1 && ca[c][j] < cb[c][i]) j++; m[i] = ((j + 0.5) / BINS) * scale[c]; } return m; });
  const d = B.data, o = Buffer.from(d); let n = 0;
  for (let p = 0; p < d.length; p += 3) {
    const r = d[p], g = d[p + 1], b = d[p + 2]; const q = hsv(r, g, b);
    if (q[0] < 15 || q[0] > 70) continue;
    const w = Math.min(1, Math.max(0, (r - b - 25) / 25)) * Math.min(1, (q[0] - 15) / 8); if (!w) continue;
    const t = [0, 1, 2].map((c) => map[c][Math.min(BINS - 1, Math.floor((q[c] / scale[c]) * BINS))]);
    const nv = rgb(Math.min(69.9, t[0]), Math.min(1, t[1]), Math.min(255, t[2]));
    for (let c = 0; c < 3; c++) o[p + c] = Math.max(0, Math.min(255, Math.round(d[p + c] + w * (nv[c] - d[p + c])))); n++;
  }
  await sharp(o, { raw: { width: B.info.width, height: B.info.height, channels: 3 } }).png().toFile(out);
  console.log(out, 'gold pixels', n);
})();
