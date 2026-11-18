/*
  bg-tiles.cjs — evens out Nano Banana's tile panels in the paper of an AI original (owner, 2026-11-18: point 1,
  "do it"). A 4K Nano Banana image is built from rectangles; each can sit 1–7 levels lighter or darker than its
  neighbour, with a hard straight edge. bg-soft.cjs alone smooths with a wide, soft gain, so a hard edge stays as a
  band or "a square behind the piece" (crosses 08, 09, 23; pendants 13; 26; 27; 14 earrings; bracelet 06).

  How: the paper (pixels outside the dilated piece mask, brighter than 200) is searched for straight seams. A seam
  is a column (or row) where the paper on one side differs from the other by at least THR levels, measured as the
  median over the whole rectangle being split, so a soft shadow edge never counts. Only paper at least W/42 px from the piece counts, and a step deeper than 9 levels is a
  shadow. The image is split at the strongest seam and each half is searched again (a tile grid whose rows break at different heights in each column
  is found this way). Then the step across every boundary between two neighbouring cells is measured per channel
  (median across the boundary, the paper 16–40 px either side, inside the shadow too), and one offset per cell is solved
  so that every step becomes zero. The offsets are added to the paper pixels only, feathered over about 40 px (the AI's own ramp).
  The piece pixels are never changed. bg-soft.cjs then makes the paper exactly 251, 251, 253 as before.

  Used by bg-soft.cjs (on by default; BG_TILES=0 turns it off). Standalone, for a look:
    node bg-tiles.cjs <in.png> <out.png>      (prints the seams found and each cell's offset)
*/
const THR = +(process.env.BG_TILES_THR || 0.8); // levels; the faintest panel the owner noticed was 1–2
const MAXS = +(process.env.BG_TILES_MAX || 9); // a deeper step is a shadow (23 Православен: its panels are 10 levels, BG_TILES_MAX=14)
const G = 16, WD = 24; // a seam is a ramp 30–60 px wide: compare the paper 16–40 px either side
const MIN = 160; // smallest cell side, px at 4K-ish sizes

// data: Buffer RGB, mm: Uint8Array piece mask (1 = piece). Returns { fixed: Float32Array[3] (per channel), seams, cells }.
function untile(data, W, H, mm) {
  const N = W * H;
  const L = new Float32Array(N);
  const paper = new Uint8Array(N);
  for (let i = 0; i < N; i++) {
    const r = data[3 * i], g = data[3 * i + 1], b = data[3 * i + 2];
    L[i] = (r + g + b) / 3;
    paper[i] = !mm[i] && L[i] > 200 ? 1 : 0;
  }
  // seams are measured only on paper at least NEAR px from the piece: the piece's own shadow has steep edges close
  // to it (cross 08's arm shadow was taken for a seam on the first try)
  const NEAR = Math.round(W / 42);
  const near = new Uint8Array(N);
  { const t = new Int32Array(N);
    for (let y = 0; y < H; y++) { let c = 0; const row = y * W; for (let x = 0; x < Math.min(W, NEAR); x++) c += mm[row + x]; for (let x = 0; x < W; x++) { if (x + NEAR < W) c += mm[row + x + NEAR]; if (x - NEAR - 1 >= 0) c -= mm[row + x - NEAR - 1]; t[row + x] = c; } }
    for (let x = 0; x < W; x++) { let c = 0; for (let y = 0; y < Math.min(H, NEAR); y++) c += t[y * W + x] > 0; for (let y = 0; y < H; y++) { if (y + NEAR < H) c += t[(y + NEAR) * W + x] > 0; if (y - NEAR - 1 >= 0) c -= t[(y - NEAR - 1) * W + x] > 0; near[y * W + x] = c > 0; } } }
  for (let i = 0; i < N; i++) if (near[i]) paper[i] = 0;
  // mean of WD px starting dx px away (dx = G → right/below side, -G-WD → left/above side), NaN if not all paper
  const side = (i, dx, st = 1, A = L, c = 0, n = 1) => {
    let s = 0;
    for (let k = 0; k < WD; k += 2) { const j = i + (dx + k) * st; if (j < 0 || j >= N || !paper[j]) return NaN; s += n === 1 ? A[j] : A[3 * j + c]; }
    return s / (WD / 2);
  };
  const med = (v) => { if (v.length < 40) return 0; v.sort((a, b) => a - b); return v[v.length >> 1]; };

  // strongest straight seam in a rectangle: vertical (x) and horizontal (y) profiles of the median step
  function seam(r) {
    let best = { d: 0 };
    const step = 2;
    for (let x = r.x0 + 48; x < r.x1 - 48; x++) {
      const v = [];
      for (let y = r.y0; y < r.y1; y += step) { const i = y * W + x; const a = side(i, -G - WD), b = side(i, G); if (a === a && b === b) v.push(b - a); }
      if (v.length < 0.4 * (r.y1 - r.y0) / step) continue; // most of the column must be paper
      const d = med(v);
      if (Math.abs(d) > Math.abs(best.d)) best = { d, dir: 'v', at: x };
    }
    for (let y = r.y0 + 48; y < r.y1 - 48; y++) {
      const v = [];
      for (let x = r.x0; x < r.x1; x += step) { const i = y * W + x; const a = side(i, -G - WD, W), b = side(i, G, W); if (a === a && b === b) v.push(b - a); }
      if (v.length < 0.4 * (r.x1 - r.x0) / step) continue;
      const d = med(v);
      if (Math.abs(d) > Math.abs(best.d)) best = { d, dir: 'h', at: y };
    }
    return best;
  }

  const cells = [], seams = [];
  (function split(r, depth) {
    const s = r.x1 - r.x0 >= 2 * MIN || r.y1 - r.y0 >= 2 * MIN ? seam(r) : { d: 0 };
    if (depth < 8 && Math.abs(s.d) >= THR && Math.abs(s.d) <= MAXS) { // deeper is a shadow, not a tile
      seams.push({ dir: s.dir, at: s.at, step: +s.d.toFixed(2), in: [r.x0, r.y0, r.x1, r.y1] });
      if (s.dir === 'v') { split({ ...r, x1: s.at }, depth + 1); split({ ...r, x0: s.at }, depth + 1); }
      else { split({ ...r, y1: s.at }, depth + 1); split({ ...r, y0: s.at }, depth + 1); }
    } else cells.push(r);
  })({ x0: 0, y0: 0, x1: W, y1: H }, 0);

  const fixed = [0, 1, 2].map((c) => { const a = new Float32Array(N); for (let i = 0; i < N; i++) a[i] = data[3 * i + c]; return a; });
  if (cells.length < 2) return { fixed, seams, cells, offsets: [] };

  // steps between neighbouring cells, per channel
  const edges = [];
  for (let p = 0; p < cells.length; p++) for (let q = 0; q < cells.length; q++) {
    const a = cells[p], b = cells[q];
    if (a.x1 === b.x0) { // b right of a
      const y0 = Math.max(a.y0, b.y0), y1 = Math.min(a.y1, b.y1);
      if (y1 - y0 < 24) continue;
      const st = [0, 1, 2].map((c) => { const v = []; for (let y = y0; y < y1; y += 2) { const i = y * W + a.x1; const l = side(i, -G - WD, 1, data, c, 3), r = side(i, G, 1, data, c, 3); if (l === l && r === r) v.push(r - l); } return v; });
      if (st[0].length >= 20) edges.push({ p, q, w: st[0].length, d: st.map(med) });
    }
    if (a.y1 === b.y0) { // b below a
      const x0 = Math.max(a.x0, b.x0), x1 = Math.min(a.x1, b.x1);
      if (x1 - x0 < 24) continue;
      const st = [0, 1, 2].map((c) => { const v = []; for (let x = x0; x < x1; x += 2) { const i = a.y1 * W + x; const t = side(i, -G - WD, W, data, c, 3), u = side(i, G, W, data, c, 3); if (t === t && u === u) v.push(u - t); } return v; });
      if (st[0].length >= 20) edges.push({ p, q, w: st[0].length, d: st.map(med) });
    }
  }
  // solve offsets: o[q] - o[p] = -d (so the step disappears); anchored at the area-weighted mean 0
  const area = cells.map((r) => (r.x1 - r.x0) * (r.y1 - r.y0));
  const off = [0, 1, 2].map(() => new Float64Array(cells.length));
  for (let c = 0; c < 3; c++) {
    const o = off[c];
    for (let it = 0; it < 2000; it++) {
      for (let k = 0; k < cells.length; k++) {
        let s = 0, w = 0;
        for (const e of edges) {
          if (e.p === k) { s += e.w * (o[e.q] + e.d[c]); w += e.w; }
          else if (e.q === k) { s += e.w * (o[e.p] - e.d[c]); w += e.w; }
        }
        if (w) o[k] = s / w;
      }
      let m = 0, A = 0; for (let k = 0; k < cells.length; k++) { m += o[k] * area[k]; A += area[k]; }
      for (let k = 0; k < cells.length; k++) o[k] -= m / A;
    }
  }
  // offset map, feathered about 40 px (two separable box blurs of the per-pixel cell offset), added to non-piece pixels only
  const id = new Int16Array(N);
  cells.forEach((r, k) => { for (let y = r.y0; y < r.y1; y++) id.fill(k, y * W + r.x0, y * W + r.x1); });
  const F = 20; // two box passes ≈ the AI's own 40–60 px ramp
  for (let c = 0; c < 3; c++) {
    const om = new Float32Array(N); for (let i = 0; i < N; i++) om[i] = off[c][id[i]];
    for (let pass = 0; pass < 2; pass++) {
    const t = new Float32Array(N);
    for (let y = 0; y < H; y++) { let s = 0; const row = y * W; for (let x = -F; x <= F; x++) s += om[row + Math.min(W - 1, Math.max(0, x))]; for (let x = 0; x < W; x++) { t[row + x] = s / (2 * F + 1); s += om[row + Math.min(W - 1, x + F + 1)] - om[row + Math.max(0, x - F)]; } }
    for (let x = 0; x < W; x++) { let s = 0; for (let y = -F; y <= F; y++) s += t[Math.min(H - 1, Math.max(0, y)) * W + x]; for (let y = 0; y < H; y++) { om[y * W + x] = s / (2 * F + 1); s += t[Math.min(H - 1, y + F + 1) * W + x] - t[Math.max(0, y - F) * W + x]; } }
    }
    for (let i = 0; i < N; i++) if (!mm[i]) fixed[c][i] = Math.max(0, Math.min(255, fixed[c][i] + om[i]));
  }
  return { fixed, seams, cells, offsets: cells.map((_, k) => off.map((o) => +o[k].toFixed(2))) };
}

module.exports = { untile };

if (require.main === module) {
  const sharp = require('sharp');
  (async () => {
    const [inp, out] = process.argv.slice(2);
    const { data, info } = await sharp(inp).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, N = W * H;
    const { pieceMask } = require('./bg-soft.cjs');
    const mm = pieceMask(data, W, H);
    const r = untile(data, W, H, mm);
    console.log(JSON.stringify({ seams: r.seams, cells: r.cells.length, offsets: r.offsets }));
    const o = Buffer.alloc(3 * N);
    for (let i = 0; i < N; i++) for (let c = 0; c < 3; c++) o[3 * i + c] = Math.round(r.fixed[c][i]);
    await sharp(o, { raw: info }).png().toFile(out);
  })();
}
