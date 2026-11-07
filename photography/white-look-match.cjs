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
  --piece (tried 2026-11-07, NOT used: it left white blotches outside the jewellery and in the jump ring; whites of
  pieces with rhodium parts are made with metal-swap.cjs from the look-matched yellow, see recolour-piece.cjs): the whole piece changes, not only what is gold in the yellow photo (owner, 2026-11-07, zodiac pendants: "you
  missed some places"): rhodium parts (the sign in the middle), highlights and edges. The piece is everything that is not
  backdrop or shadow; those are found as the smooth area grown from the plain backdrop (steps of at most 2 levels
  between neighbours), and thin bits along the edge are dropped (opened by 2 px). Use it for pieces without stones. --mask f.jpg writes the changed area in red, to check.
  --polish A: after the match, the polish curve of polish-curve.cjs on the changed metal (owner, 2026-11-07: "polish the white
  good"): highlights a little brighter, dark mirror bands deeper, around the metal's own mid tone; 0.4 is the yellow default.
*/
const sharp = require('sharp');
const load = async (f, W, H) => { const i = sharp(f).removeAlpha(); return (W ? i.resize(W, H) : i).raw().toBuffer({ resolveWithObject: true }); };
const wt = (Y, p, Wd) => (Wd && Math.abs(Wd[p] - Wd[p + 2]) > 20) ? 0 : Math.min(1, Math.max(0, (Y[p] - Y[p + 2] - 25) / 20)); // not a coloured stone (ruby) in the white photo
const tint = [0, 0, 0]; // the reference white's mean offset of each channel from its brightness
function cdf(Wd, Y, ref) { const h = new Float64Array(256), s = [0, 0, 0]; for (let p = 0; p < Wd.length; p += 3) if (wt(Y, p, Wd) >= 1) { const L = (Wd[p] + Wd[p + 1] + Wd[p + 2]) / 3; h[Math.round(L)]++; for (let c = 0; c < 3; c++) s[c] += Wd[p + c] - L; }
  if (ref) { const m = h.reduce((a, b) => a + b, 0); for (let c = 0; c < 3; c++) tint[c] = s[c] / m; }
  const n = h.reduce((a, b) => a + b, 0); let t = 0; return Array.from(h, (v) => (t += v) / n); }
// the backdrop and its shadow: smooth areas grown from smooth seed pixels (steps of at most 2 levels between
// neighbours). Seeds are the plain backdrop (light, any tint: the backdrop seen through an openwork pendant is a little
// pink) and smooth shadow (a 9 x 9 window within 3 levels: the shadow seen through the ring for the chain), never on gold.
function backdrop(d, W, H, g) { const N = W * H, bg = new Uint8Array(N), q = new Int32Array(N); let h = 0, t = 0;
  const L = new Float32Array(N); for (let i = 0; i < N; i++) L[i] = (d[i * 3] + d[i * 3 + 1] + d[i * 3 + 2]) / 3;
  const flat = (i, r, tol) => { let lo = 1e9, hi = -1; for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) { const v = L[i + dy * W + dx]; if (v < lo) lo = v; if (v > hi) hi = v; if (hi - lo > tol) return false; } return true; };
  for (let y = 4; y < H - 4; y++) for (let x = 4; x < W - 4; x++) { const i = y * W + x; if (g[i]) continue;
    if ((L[i] >= 236 && flat(i, 2, 1.5)) || (L[i] >= 120 && flat(i, 4, 3))) { bg[i] = 1; q[t++] = i; } }
  while (h < t) { const i = q[h++], x = i % W, y = (i / W) | 0;
    for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, y > 0 ? i - W : -1, y < H - 1 ? i + W : -1]) { if (j < 0 || bg[j] || g[j]) continue;
      const a = i * 3, b = j * 3; if (Math.abs(d[a] - d[b]) <= 2 && Math.abs(d[a + 1] - d[b + 1]) <= 2 && Math.abs(d[a + 2] - d[b + 2]) <= 2) { bg[j] = 1; q[t++] = j; } } }
  return bg; }
// weight 0-255 for the change: full on what is gold in the yellow photo, with its inner highlights filled in (closed by
// 4 px, but never onto backdrop or shadow: the hole of the ring for the chain stays as it is); on the rest of the piece
// (rhodium, e.g. the sign in the middle) it rises over 8 px from its edge, so contact shadows round it stay as they are
function pieceMask(d, W, H, Y) { const N = W * H;
  const morph = (m, v) => { const o = new Uint8Array(N); for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { let r = 1 - v;
    for (let dy = -2; dy <= 2 && r !== v; dy++) for (let dx = -2; dx <= 2; dx++) { const yy = y + dy, xx = x + dx; if (yy >= 0 && yy < H && xx >= 0 && xx < W && m[yy * W + xx] === v) { r = v; break; } }
    o[y * W + x] = r; } return o; };
  const g = new Uint8Array(N); for (let i = 0; i < N; i++) g[i] = Y[i * 3] - Y[i * 3 + 2] > 25 ? 1 : 0;
  const bg = backdrop(d, W, H, g), Gc = morph(morph(morph(morph(g, 1), 1), 0), 0);
  const G = new Uint8Array(N); for (let i = 0; i < N; i++) G[i] = g[i] || (Gc[i] && !bg[i]) ? 1 : 0;
  const pc = morph(morph(bg.map((v) => 1 - v), 0), 1), rest = new Uint8Array(N); for (let i = 0; i < N; i++) rest[i] = pc[i] && !G[i] ? 1 : 0;
  const ramp = new Uint8Array(N); let e = rest; for (let k = 0; k < 4; k++) { e = morph(e, 0); for (let i = 0; i < N; i++) ramp[i] += e[i]; }
  const out = new Uint8Array(N); for (let i = 0; i < N; i++) { if (G[i]) out[i] = 255; else if (rest[i]) out[i] = Math.round(255 * ramp[i] / 4); }
  return out; }
(async () => {
  const [rw, ry, wi, yi, out, ...rest] = process.argv.slice(2);
  const PIECE = rest.includes('--piece'); const pi = rest.indexOf('--polish'), A = pi >= 0 ? +rest[pi + 1] : 0;
  const ki = rest.indexOf('--keep'), K = ki >= 0 ? rest[ki + 1].split(',').map(Number) : null;
  if (!out) throw new Error('usage: node white-look-match.cjs <ref white> <ref yellow> <white> <yellow> <out>');
  const RW = await load(rw), RY = await load(ry, RW.info.width, RW.info.height);
  const IW = await load(wi), IY = await load(yi, IW.info.width, IW.info.height);
  const cr = cdf(RW.data, RY.data, 1), ci = cdf(IW.data, IY.data);
  const map = new Uint8Array(256); let j = 0; for (let v = 0; v < 256; v++) { while (j < 255 && cr[j] < ci[v]) j++; map[v] = j; }
  const d = IW.data, o = Buffer.from(d); let n = 0;
  const Wd = IW.info.width, Hd = IW.info.height;
  const PM = PIECE ? pieceMask(d, Wd, Hd, IY.data) : null;
  const mi = rest.indexOf('--mask'); if (PM && mi >= 0) { const v = Buffer.from(d); for (let i = 0; i < Wd * Hd; i++) if (PM[i]) { const k = PM[i] / 255; v[i * 3] = Math.round(v[i * 3] * (1 - k) + 255 * k); v[i * 3 + 1] = Math.round(v[i * 3 + 1] * (1 - 0.6 * k)); v[i * 3 + 2] = Math.round(v[i * 3 + 2] * (1 - 0.6 * k)); }
    await sharp(v, { raw: { width: Wd, height: Hd, channels: 3 } }).jpeg().toFile(rest[mi + 1]); }
  for (let p = 0; p < d.length; p += 3) { const w = PM ? (Math.abs(d[p] - d[p + 2]) <= 20 ? PM[p / 3] / 255 : 0) : wt(IY.data, p, d); if (!w) continue;
    if (K) { const i = p / 3, x = (i % Wd) / Wd, y = Math.floor(i / Wd) / Hd; if (x >= K[0] && x <= K[2] && y >= K[1] && y <= K[3] && Math.abs(d[p] - d[p + 2]) > 6) continue; }
    n++;
    const L = (d[p] + d[p + 1] + d[p + 2]) / 3, L2 = map[Math.round(L)], t = tint.map((v) => L2 + v);
    for (let c = 0; c < 3; c++) o[p + c] = Math.max(0, Math.min(255, Math.round(d[p + c] + w * (t[c] - d[p + c])))); }
  if (A) { let sm = 0, sn = 0; for (let p = 0; p < o.length; p += 3) if (o[p] !== d[p] || o[p + 1] !== d[p + 1]) { sm += (o[p] + o[p + 1] + o[p + 2]) / 3; sn++; } const M = sm / sn;
    for (let p = 0; p < o.length; p += 3) { const w = PM ? (Math.abs(d[p] - d[p + 2]) <= 20 ? PM[p / 3] / 255 : 0) : wt(IY.data, p, d); if (!w) continue; const L = (o[p] + o[p + 1] + o[p + 2]) / 3;
      const x = L >= M ? (L - M) / (255 - M) : (L - M) / M, y = Math.max(-1, Math.min(1, x + A * Math.sin(Math.PI * Math.abs(x)) * Math.sign(x) * 0.5)), L2 = y >= 0 ? M + y * (255 - M) : M + y * M;
      for (let c = 0; c < 3; c++) o[p + c] = Math.max(0, Math.min(255, Math.round(o[p + c] + w * (L2 - L)))); } }
  await sharp(o, { raw: { width: IW.info.width, height: IW.info.height, channels: 3 } }).png().toFile(out);
  console.log(out, 'metal pixels', n);
})();
