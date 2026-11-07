/*
  white-look-match.cjs — gives a photo's white gold the brightness of a reference photo's white gold (owner,
  2026-11-07: "we should have a color for the white gold too"). The metal is found with the piece's yellow photo of
  the same frame (pixels clearly gold there: red - blue > 45, soft from 25), so stones, pearl, background and shadow
  are left alone (and a coloured stone, e.g. the red ring's ruby, is skipped: neutral in the white photo only). On those pixels the brightness is quantile-mapped onto the reference white's metal and the colour
  takes the reference's own tint, so every piece gets the same clean white.
  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node white-look-match.cjs <ref white> <ref yellow> <white in> <yellow of the same photo> <out> [--keep x0,y0,x1,y1]
  --keep: a box (fractions of the photo) round a pearl or a coloured stone; inside it only clearly neutral pixels
  (|red - blue| up to 6, the metal) change, so the pearl's edge where the yellow photo reflected gold stays as it is
  (pearl ring, 2026-11-07).
*/
const sharp = require('sharp');
const load = async (f, W, H) => { const i = sharp(f).removeAlpha(); return (W ? i.resize(W, H) : i).raw().toBuffer({ resolveWithObject: true }); };
const wt = (Y, p, Wd) => (Wd && Math.abs(Wd[p] - Wd[p + 2]) > 20) ? 0 : Math.min(1, Math.max(0, (Y[p] - Y[p + 2] - 25) / 20)); // not a coloured stone (ruby) in the white photo
const tint = [0, 0, 0]; // the reference white's mean offset of each channel from its brightness
function cdf(Wd, Y, ref) { const h = new Float64Array(256), s = [0, 0, 0]; for (let p = 0; p < Wd.length; p += 3) if (wt(Y, p, Wd) >= 1) { const L = (Wd[p] + Wd[p + 1] + Wd[p + 2]) / 3; h[Math.round(L)]++; for (let c = 0; c < 3; c++) s[c] += Wd[p + c] - L; }
  if (ref) { const m = h.reduce((a, b) => a + b, 0); for (let c = 0; c < 3; c++) tint[c] = s[c] / m; }
  const n = h.reduce((a, b) => a + b, 0); let t = 0; return Array.from(h, (v) => (t += v) / n); }
(async () => {
  const [rw, ry, wi, yi, out, ...rest] = process.argv.slice(2);
  const ki = rest.indexOf('--keep'), K = ki >= 0 ? rest[ki + 1].split(',').map(Number) : null;
  if (!out) throw new Error('usage: node white-look-match.cjs <ref white> <ref yellow> <white> <yellow> <out>');
  const RW = await load(rw), RY = await load(ry, RW.info.width, RW.info.height);
  const IW = await load(wi), IY = await load(yi, IW.info.width, IW.info.height);
  const cr = cdf(RW.data, RY.data, 1), ci = cdf(IW.data, IY.data);
  const map = new Uint8Array(256); let j = 0; for (let v = 0; v < 256; v++) { while (j < 255 && cr[j] < ci[v]) j++; map[v] = j; }
  const d = IW.data, o = Buffer.from(d); let n = 0;
  const Wd = IW.info.width, Hd = IW.info.height;
  for (let p = 0; p < d.length; p += 3) { const w = wt(IY.data, p, d); if (!w) continue;
    if (K) { const i = p / 3, x = (i % Wd) / Wd, y = Math.floor(i / Wd) / Hd; if (x >= K[0] && x <= K[2] && y >= K[1] && y <= K[3] && Math.abs(d[p] - d[p + 2]) > 6) continue; }
    n++;
    const L = (d[p] + d[p + 1] + d[p + 2]) / 3, L2 = map[Math.round(L)], t = tint.map((v) => L2 + v);
    for (let c = 0; c < 3; c++) o[p + c] = Math.max(0, Math.min(255, Math.round(d[p + c] + w * (t[c] - d[p + c])))); }
  await sharp(o, { raw: { width: IW.info.width, height: IW.info.height, channels: 3 } }).png().toFile(out);
  console.log(out, 'metal pixels', n);
})();
