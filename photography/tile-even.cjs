// tile-even.cjs in.png out.png "xb1,xb2,.." "yb1,yb2,.." : the background is made of flat tiles with slightly
// different levels; measure each tile's flat level (per channel, from its brightest flat pixels) and divide every
// pixel by it, times 251,251,253. Shadows keep their relative darkness; the piece changes by the same small ratio.
// Boundaries blend over +-18 px.
const s = require('sharp');
const [inp, out, xbS, ybS] = process.argv.slice(2);
const T = [251, 251, 253], R = 18;
(async () => {
  const { data, info } = await s(inp).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height;
  const xb = [0, ...xbS.split(',').map(Number), W], yb = [0, ...ybS.split(',').map(Number), H];
  const nx = xb.length - 1, ny = yb.length - 1, lev = [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const hist = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], lum = new Uint32Array(256);
    for (let y = yb[j] + R; y < yb[j + 1] - R; y += 2) for (let x = xb[i] + R; x < xb[i + 1] - R; x += 2) {
      const k = (y * W + x) * 3; const L = Math.round((data[k] + data[k + 1] + data[k + 2]) / 3); lum[L]++;
    }
    let tot = lum.reduce((a, b) => a + b, 0), acc = 0, p95 = 255;
    for (let v = 255; v >= 0; v--) { acc += lum[v]; if (acc > tot * 0.30) { p95 = v; break; } }
    for (let y = yb[j] + R; y < yb[j + 1] - R; y += 2) for (let x = xb[i] + R; x < xb[i + 1] - R; x += 2) {
      const k = (y * W + x) * 3; const L = Math.round((data[k] + data[k + 1] + data[k + 2]) / 3);
      if (Math.abs(L - p95) <= 1) for (let c = 0; c < 3; c++) hist[c][data[k + c]]++;
    }
    const mean = hist.map(h => { let t = 0, n = 0; h.forEach((c, v) => { t += c * v; n += c; }); return n ? t / n : 251; });
    lev.push(mean);
  }
  console.log(lev.map((m, q) => `cell${q % nx},${(q / nx) | 0}:` + m.map(v => v.toFixed(1)).join('/')).join(' '));
  const wAxis = (b, p) => { // index of cell and blend to next
    let i = 0; while (i < b.length - 2 && p >= b[i + 1]) i++;
    let lo = i, hi = i, t = 0;
    if (i + 1 < b.length - 1 && p > b[i + 1] - R) { hi = i + 1; t = (p - (b[i + 1] - R)) / (2 * R); }
    else if (i > 0 && p < b[i] + R) { lo = i - 1; hi = i; t = (p - (b[i] - R)) / (2 * R); }
    t = t * t * (3 - 2 * t); return [lo, hi, t];
  };
  const o = Buffer.alloc(W * H * 3);
  for (let y = 0; y < H; y++) {
    const [j0, j1, ty] = wAxis(yb, y);
    for (let x = 0; x < W; x++) {
      const [i0, i1, tx] = wAxis(xb, x); const k = (y * W + x) * 3;
      for (let c = 0; c < 3; c++) {
        const a = lev[j0 * nx + i0][c] * (1 - tx) + lev[j0 * nx + i1][c] * tx;
        const b = lev[j1 * nx + i0][c] * (1 - tx) + lev[j1 * nx + i1][c] * tx;
        const L = a * (1 - ty) + b * ty;
        o[k + c] = Math.max(0, Math.min(255, Math.round(data[k + c] * T[c] / L)));
      }
    }
  }
  await s(o, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
})();
