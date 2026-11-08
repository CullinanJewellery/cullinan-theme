/*
  tile-shadow-even.cjs — makes a 4k Nano Banana background one colour and keeps the whole shadow (2026-11-08, red set).
  bg-even.cjs cut the shadow where it crossed a tile 5 levels lighter; tile-even.cjs divided the piece too and, in tiles
  mostly covered by the piece or the shadow, measured the wrong level (blue patches, the stone turned magenta).
  Here each tile's level is the most common light neutral value, only the background and shadow are divided by it (found
  by flooding in from the edges through neutral pixels, plus large enclosed openings), and the piece is never touched.
  What is left within a few levels of 251, 251, 253 fades into exactly that, so mottling and tile seams go.
  Usage (needs sharp): node tile-shadow-even.cjs <in.png> <out.png> "x1,x2,..." "y1,y2,..."   (tile boundaries in px)
*/
const sharp = require('sharp');
const T = [251, 251, 253], R = 18;
(async () => {
  const [inp, out, xs, ys] = process.argv.slice(2);
  const { data: d, info } = await sharp(inp).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, N = W * H;
  const xb = [0, ...xs.split(',').map(Number), W], yb = [0, ...ys.split(',').map(Number), H], nx = xb.length - 1, ny = yb.length - 1;
  const spread = (p) => Math.max(d[p], d[p + 1], d[p + 2]) - Math.min(d[p], d[p + 1], d[p + 2]);
  // background and shadow
  const ok = new Uint8Array(N); for (let k = 0; k < N; k++) if (spread(k * 3) <= 14) ok[k] = 1;
  const seen = new Uint8Array(N), bg = new Uint8Array(N), q = new Int32Array(N); let enclosed = [];
  for (let k = 0; k < N; k++) { if (!ok[k] || seen[k]) continue; let h = 0, t = 0, edge = false, light = 0; q[t++] = k; seen[k] = 1;
    while (h < t) { const c = q[h++], x = c % W, y = (c / W) | 0; if (x === 0 || y === 0 || x === W - 1 || y === H - 1) edge = true; if (d[c * 3] >= 235) light++;
      for (const n of [x > 0 ? c - 1 : -1, x < W - 1 ? c + 1 : -1, y > 0 ? c - W : -1, y < H - 1 ? c + W : -1]) if (n >= 0 && ok[n] && !seen[n]) { seen[n] = 1; q[t++] = n; } }
    if (edge || (t >= 8000 && light > t * 0.8)) { for (let j = 0; j < t; j++) bg[q[j]] = 1; if (!edge) enclosed.push(t); } }
  // each tile's level: the most common light value of its background
  const lev = [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const hist = new Uint32Array(256);
    for (let y = yb[j] + R; y < yb[j + 1] - R; y += 2) for (let x = xb[i] + R; x < xb[i + 1] - R; x += 2) { const k = y * W + x; if (bg[k] && d[k * 3] >= 240) hist[Math.round((d[k * 3] + d[k * 3 + 1] + d[k * 3 + 2]) / 3)]++; }
    let m = 0; hist.forEach((c, v) => { if (c > hist[m]) m = v; }); const tot = hist.reduce((a, b) => a + b, 0), s = [0, 0, 0]; let n = 0;
    if (tot > 400) { for (let y = yb[j] + R; y < yb[j + 1] - R; y += 2) for (let x = xb[i] + R; x < xb[i + 1] - R; x += 2) { const k = y * W + x; if (bg[k] && Math.abs((d[k * 3] + d[k * 3 + 1] + d[k * 3 + 2]) / 3 - m) <= 1) { for (let c = 0; c < 3; c++) s[c] += d[k * 3 + c]; n++; } } lev.push(s.map((v) => v / n)); } else lev.push(null); }
  for (let pass = 0; pass < 4; pass++) lev.forEach((l, a) => { if (l) return; const i = a % nx, j = (a / nx) | 0, nb = [[i - 1, j], [i + 1, j], [i, j - 1], [i, j + 1]].filter(([u, v]) => u >= 0 && u < nx && v >= 0 && v < ny).map(([u, v]) => lev[v * nx + u]).filter(Boolean); if (nb.length) lev[a] = [0, 1, 2].map((c) => nb.reduce((t, b) => t + b[c], 0) / nb.length); });
  const cell = (b, v) => { let i = 0; while (i < b.length - 2 && v >= b[i + 1]) i++; return i; };
  const lerp = (b, v) => { const i = cell(b, v); let a = i, c = i, t = 0; const near = (e) => Math.abs(v - e) < R; if (i > 0 && near(b[i])) { a = i - 1; t = (v - (b[i] - R)) / (2 * R); } else if (i < b.length - 2 && near(b[i + 1])) { c = i + 1; t = (v - (b[i + 1] - R)) / (2 * R); } return [a, c, t]; };
  const o = Buffer.from(d); let n = 0;
  for (let y = 0; y < H; y++) { const [j0, j1, v] = lerp(yb, y); for (let x = 0; x < W; x++) { const k = y * W + x; if (!bg[k]) continue; const [i0, i1, u] = lerp(xb, x), p = k * 3;
    for (let c = 0; c < 3; c++) { const at = (i, j) => lev[j * nx + i][c], l = (at(i0, j0) * (1 - u) + at(i1, j0) * u) * (1 - v) + (at(i0, j1) * (1 - u) + at(i1, j1) * u) * v;
      const val = d[p + c] / l * T[c], dv = val - T[c], a = Math.abs(dv), f = a <= 3 ? 0 : a >= 7 ? 1 : ((a - 3) / 4) ** 2 * (3 - 2 * (a - 3) / 4); o[p + c] = Math.max(0, Math.min(255, Math.round(T[c] + dv * f))); } n++; } }
  await sharp(o, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
  console.log(JSON.stringify({ out, background: n, enclosed, tiles: lev.map((l) => l.map((v) => Math.round(v)).join('/')).join(' ') }));
})();
