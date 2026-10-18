/*
  bg-even.cjs — evens out the plain background of a finished photo (owner, 2026-10-15: "on the computer"). Nano Banana
  builds 4k photos in tiles whose backgrounds differ by 2–3 levels (ring D: 252 against 254.5); framed, that shows as
  lighter or darker strips.

  Version 2 (default, 2026-10-18). The first version left every 8 px cell near the metal as it was, so on the crosses a
  rectangle round the piece stayed at 252–253 while the rest became 254: the owner saw "a square behind them", and the
  pieces did not share one background ("not the same background as the rings"). Now:
  - The background is found by flooding in from the photo's edges through pixels that are colourless (spread ≤ 12),
    not dark (luminance ≥ 150) and smooth (brightness range ≤ 10 in a 5×5 patch of a lightly smoothed copy). The flood stops at the piece's
    outline, so the piece, its stones, white rhodium and engraving are never touched; enclosed background (the hole of
    a standing ring) joins when it is large (≥ 4000 px) and light (median ≥ 244).
  - Every background pixel becomes ONE colour, ring A's measured background (251, 251, 253) unless --target says
    otherwise; the shadow is kept as its depth below the surrounding background (estimated from the background further
    out, so tiles do not count as shadow; the first 5 levels are treated as tile steps: cross 4 had a tile 4–5 levels darker), and stays neutral grey.
  So every piece gets exactly the same background, with no step, strip or square.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node bg-even.cjs <in.png> <out.png> [--target r,g,b]
    node bg-even.cjs <in.png> <out.png> --cells [--keep x0,y0,x1,y1 ...]   (version 1, kept for reference)
*/
const sharp = require('sharp');

const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
const RING_A_BG = [251, 251, 253];

// separable box blur with clamped edges
function boxBlur(src, W, H, r) {
  const tmp = new Float32Array(W * H), out = new Float32Array(W * H), n = 2 * r + 1;
  for (let y = 0; y < H; y++) {
    const o = y * W;
    let s = 0;
    for (let x = -r; x <= r; x++) s += src[o + Math.min(W - 1, Math.max(0, x))];
    for (let x = 0; x < W; x++) {
      tmp[o + x] = s / n;
      s += src[o + Math.min(W - 1, x + r + 1)] - src[o + Math.max(0, x - r)];
    }
  }
  for (let x = 0; x < W; x++) {
    let s = 0;
    for (let y = -r; y <= r; y++) s += tmp[Math.min(H - 1, Math.max(0, y)) * W + x];
    for (let y = 0; y < H; y++) {
      out[y * W + x] = s / n;
      s += tmp[Math.min(H - 1, y + r + 1) * W + x] - tmp[Math.max(0, y - r) * W + x];
    }
  }
  return out;
}

async function smooth(src, dst, target) {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels, N = W * H;
  const L = new Float32Array(N), chroma = new Uint8Array(N);
  for (let i = 0, p = 0; i < N; i++, p += ch) {
    L[i] = lum(data[p], data[p + 1], data[p + 2]);
    chroma[i] = Math.max(data[p], data[p + 1], data[p + 2]) - Math.min(data[p], data[p + 1], data[p + 2]);
  }
  // brightness range in a 5×5 patch (separable min and max), measured on a 3×3-smoothed copy so the model's fine
  // grain does not count as detail (cross 4, 2026-10-18: a grainy tile stopped the flood and stayed as a block)
  const Ls = boxBlur(L, W, H, 1);
  const rng = (fn, init) => {
    const a = new Float32Array(N), b = new Float32Array(N);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let v = init;
      for (let d = -2; d <= 2; d++) { const xx = x + d; if (xx >= 0 && xx < W) v = fn(v, Ls[y * W + xx]); }
      a[y * W + x] = v;
    }
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      let v = init;
      for (let d = -2; d <= 2; d++) { const yy = y + d; if (yy >= 0 && yy < H) v = fn(v, a[yy * W + x]); }
      b[y * W + x] = v;
    }
    return b;
  };
  const mx = rng(Math.max, -1), mn = rng(Math.min, 999);
  const like = new Uint8Array(N);
  for (let i = 0; i < N; i++) like[i] = chroma[i] <= 12 && L[i] >= 150 && mx[i] - mn[i] <= 10 ? 1 : 0;

  // flood from the edges
  const bg = new Uint8Array(N);
  const stack = new Int32Array(N);
  let sp = 0;
  const push = (i) => { if (like[i] && !bg[i]) { bg[i] = 1; stack[sp++] = i; } };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  const flood = () => {
    while (sp) {
      const i = stack[--sp], x = i % W;
      if (x > 0) push(i - 1);
      if (x < W - 1) push(i + 1);
      if (i >= W) push(i - W);
      if (i < N - W) push(i + W);
    }
  };
  flood();
  // enclosed background: large, light components
  const seen = new Uint8Array(N);
  let enclosed = 0;
  for (let s = 0; s < N; s++) {
    if (!like[s] || bg[s] || seen[s]) continue;
    const comp = [];
    const st = [s];
    seen[s] = 1;
    while (st.length) {
      const i = st.pop(), x = i % W;
      comp.push(i);
      for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, i - W, i + W]) {
        if (j >= 0 && j < N && like[j] && !bg[j] && !seen[j]) { seen[j] = 1; st.push(j); }
      }
    }
    if (comp.length < 4000) continue;
    const ls = comp.filter((_, k) => k % 7 === 0).map((i) => L[i]).sort((a, b) => a - b);
    if (ls[ls.length >> 1] < 244) continue;
    for (const i of comp) bg[i] = 1;
    enclosed += comp.length;
  }

  // the zone that may hold shadow: within R of anything that is not background
  const R = Math.round(0.09 * W);
  const notBg = new Float32Array(N);
  for (let i = 0; i < N; i++) notBg[i] = bg[i] ? 0 : 1;
  const zoneF = boxBlur(notBg, W, H, R);
  // the background level around the zone, carried into it (normalised convolution of the background outside the zone)
  const w = new Float32Array(N), lw = new Float32Array(N);
  for (let i = 0; i < N; i++) if (bg[i] && zoneF[i] === 0) { w[i] = 1; lw[i] = L[i]; }
  const r2 = Math.round(0.12 * W);
  let num = boxBlur(lw, W, H, r2), den = boxBlur(w, W, H, r2);
  num = boxBlur(num, W, H, r2); den = boxBlur(den, W, H, r2);

  // the soft shadow is read from a smoothed copy (the model's grain is not shadow: cross 4, 2026-10-18, grain inside
  // the zone showed as speckles ending at the zone's square edge); the dark contact shadow keeps its own detail; and
  // the shadow fades out toward the zone's edge, so there is no line where the zone ends
  const Lsm = boxBlur(boxBlur(L, W, H, 3), W, H, 3);
  const Lt = lum(...target);
  const out = Buffer.from(data);
  let changed = 0;
  for (let i = 0, p = 0; i < N; i++, p += ch) {
    if (!bg[i]) continue;
    let f = 1;
    if (zoneF[i] > 0) {
      const B = den[i] > 1e-4 ? num[i] / den[i] : Lt;
      const Luse = B - L[i] > 12 ? L[i] : Lsm[i];
      const fade = Math.min(1, zoneF[i] / 0.04);
      const d = Math.max(0, B - Luse - 5) * fade;
      f = Math.max(0, 1 - d / B);
    }
    out[p] = Math.round(target[0] * f);
    out[p + 1] = Math.round(target[1] * f);
    out[p + 2] = Math.round(target[2] * f);
    changed++;
  }
  await sharp(out, { raw: { width: W, height: H, channels: ch } }).png().toFile(dst);
  console.log(JSON.stringify({ src, dst, method: 'smooth', target, background: Number((changed / N).toFixed(3)), enclosed }));
}

async function cells(src, dst, keep) {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels;
  const C = 8, gw = Math.ceil(W / C), gh = Math.ceil(H / C);
  const metal = new Uint8Array(gw * gh);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = (y * W + x) * ch;
    if (Math.max(data[p], data[p + 1], data[p + 2]) - Math.min(data[p], data[p + 1], data[p + 2]) > 15) metal[((y / C) | 0) * gw + ((x / C) | 0)] = 1;
  }
  const near = new Uint8Array(gw * gh);
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
    if (!metal[y * gw + x]) continue;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
      const yy = y + dy, xx = x + dx;
      if (yy >= 0 && yy < gh && xx >= 0 && xx < gw) near[yy * gw + xx] = 1;
    }
  }
  const lo = new Float32Array(gw * gh).fill(255), hi = new Float32Array(gw * gh);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = (y * W + x) * ch, c = ((y / C) | 0) * gw + ((x / C) | 0), Lv = lum(data[p], data[p + 1], data[p + 2]);
    if (Lv < lo[c]) lo[c] = Lv;
    if (Lv > hi[c]) hi[c] = Lv;
  }
  const detail = new Uint8Array(gw * gh);
  for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
    if (hi[y * gw + x] - lo[y * gw + x] <= 10) continue;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const yy = y + dy, xx = x + dx;
      if (yy >= 0 && yy < gh && xx >= 0 && xx < gw) detail[yy * gw + xx] = 1;
    }
  }
  const kept = (x, y) => keep.some(([x0, y0, x1, y1]) => x >= x0 * W && x <= x1 * W && y >= y0 * H && y <= y1 * H);
  const plain = (x, y, r, g, b) => {
    const c = ((y / C) | 0) * gw + ((x / C) | 0);
    return lum(r, g, b) > 244 && Math.max(r, g, b) - Math.min(r, g, b) < 8 && !near[c] && !detail[c] && !kept(x, y);
  };
  const rs = [], gs = [], bs = [];
  for (let y = 0; y < H; y += 4) for (let x = 0; x < W; x += 4) {
    const p = (y * W + x) * ch;
    const r = data[p], g = data[p + 1], b = data[p + 2];
    if (plain(x, y, r, g, b) && lum(r, g, b) >= 249) { rs.push(r); gs.push(g); bs.push(b); }
  }
  const med = (a) => { a.sort((p, q) => p - q); return a[a.length >> 1]; };
  const target = [med(rs), med(gs), med(bs)];
  const out = Buffer.from(data);
  let changed = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = (y * W + x) * ch;
    const r = data[p], g = data[p + 1], b = data[p + 2];
    if (!plain(x, y, r, g, b)) continue;
    const wt = Math.min(1, (lum(r, g, b) - 244) / 5);
    out[p] = Math.round(r + wt * (target[0] - r));
    out[p + 1] = Math.round(g + wt * (target[1] - g));
    out[p + 2] = Math.round(b + wt * (target[2] - b));
    changed++;
  }
  await sharp(out, { raw: { width: W, height: H, channels: ch } }).png().toFile(dst);
  console.log(JSON.stringify({ src, dst, method: 'cells', target, keep, changedShare: Number((changed / (W * H)).toFixed(3)) }));
}

(async () => {
  const args = process.argv.slice(2);
  const keep = [];
  for (let i = args.indexOf('--keep'); i >= 0; i = args.indexOf('--keep')) keep.push(args.splice(i, 2)[1].split(',').map(Number));
  const ti = args.indexOf('--target');
  const target = ti >= 0 ? args.splice(ti, 2)[1].split(',').map(Number) : RING_A_BG;
  const ci = args.indexOf('--cells');
  const useCells = ci >= 0 && !!args.splice(ci, 1);
  const [src, dst] = args;
  if (!src || !dst) throw new Error('usage: node bg-even.cjs <in.png> <out.png> [--target r,g,b] | --cells [--keep x0,y0,x1,y1 ...]');
  if (useCells) await cells(src, dst, keep);
  else await smooth(src, dst, target);
})();
