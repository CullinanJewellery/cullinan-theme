/*
  find-source.cjs — finds which AI original a finished photo was cut from, and the crop (2026-11-17, for rebuilding
  every piece from its AI original with gold-standard.cjs). Compares shapes in greyscale, each image normalised to its
  own mean and contrast, so a recoloured or evened copy still matches its source.

  Usage (sharp, NODE_PATH as for check-photo.cjs):
    node find-source.cjs <finished.png> <candidate.png> [<candidate.png> ...]
  Prints, best first: score (lower is better; under ~0.15 is the same picture), candidate, and the crop in the
  candidate's pixels as left,top,side (a square, as frame-photo.cjs cuts). Crop by side = the whole picture when the
  finished photo is not cropped.
*/
const sharp = require('sharp');
const Q = 96, S = 384;
const norm = (a) => { let m = 0; for (const v of a) m += v; m /= a.length; let sd = 0; for (const v of a) sd += (v - m) ** 2; sd = Math.sqrt(sd / a.length) || 1; return a.map((v) => (v - m) / sd); };
(async () => {
  const [fin, ...cands] = process.argv.slice(2);
  const F = norm(Float32Array.from(await sharp(fin).resize(Q, Q, { fit: 'fill' }).greyscale().raw().toBuffer()));
  const res = [];
  for (const c of cands) {
    try {
      const meta = await sharp(c).metadata();
      const O = Float32Array.from(await sharp(c).resize(S, S, { fit: 'fill' }).greyscale().raw().toBuffer());
      let best = [1e9];
      const score = (sz, x, y, st) => {
        const k = sz / Q; const v = new Float32Array((Q / st) ** 2); let n = 0;
        for (let j = 0; j < Q; j += st) for (let i = 0; i < Q; i += st) v[n++] = O[Math.floor(y + j * k) * S + Math.floor(x + i * k)];
        const nv = norm(v); let e = 0, m = 0;
        for (let j = 0; j < Q; j += st) for (let i = 0; i < Q; i += st) { const d = nv[m++] - F[j * Q + i]; e += d * d; }
        return e / m;
      };
      for (let sz = Math.round(S * 0.3); sz <= S; sz += 6) for (let y = 0; y + sz <= S; y += 6) for (let x = 0; x + sz <= S; x += 6) { const e = score(sz, x, y, 4); if (e < best[0]) best = [e, sz, x, y]; }
      let [, bs, bx, by] = best;
      for (let sz = bs - 6; sz <= bs + 6; sz++) for (let y = by - 6; y <= by + 6; y++) for (let x = bx - 6; x <= bx + 6; x++) { if (x < 0 || y < 0 || x + sz > S || y + sz > S) continue; const e = score(sz, x, y, 2); if (e < best[0] || best.length < 5) best = [e, sz, x, y, 1]; }
      const f = meta.width / S;
      // fine pass: the finished photo at 256 px against the candidate at up to 2048 px, 1 px steps (a worn photo's
      // metal mask must line up to the pixel; the coarse pass can be ~10 px off at 4K)
      const S2 = Math.min(2048, meta.width), f2 = meta.width / S2, Q2 = 256;
      const O2 = Float32Array.from(await sharp(c).resize(S2, S2, { fit: 'fill' }).greyscale().raw().toBuffer());
      const F2 = norm(Float32Array.from(await sharp(fin).resize(Q2, Q2, { fit: 'fill' }).greyscale().raw().toBuffer()));
      const score2 = (sz, x, y) => {
        const k = sz / Q2, st = 4, v = new Float32Array((Q2 / st) ** 2); let n = 0;
        for (let j = 0; j < Q2; j += st) for (let i = 0; i < Q2; i += st) v[n++] = O2[Math.min(S2 - 1, Math.floor(y + j * k)) * S2 + Math.min(S2 - 1, Math.floor(x + i * k))];
        const nv = norm(v); let e = 0, m = 0;
        for (let j = 0; j < Q2; j += st) for (let i = 0; i < Q2; i += st) { const d = nv[m++] - F2[j * Q2 + i]; e += d * d; }
        return e / m;
      };
      let b2 = [1e9, Math.round(best[1] * S2 / S), Math.round(best[2] * S2 / S), Math.round(best[3] * S2 / S)];
      for (let pass = 0; pass < 3; pass++) {
        const [, s0, x0, y0] = b2, R = pass === 0 ? 6 : 2, step = pass === 0 ? 2 : 1;
        for (let sz = s0 - R * step; sz <= s0 + R * step; sz += step) for (let y = y0 - R * step; y <= y0 + R * step; y += step) for (let x = x0 - R * step; x <= x0 + R * step; x += step) {
          if (x < 0 || y < 0 || x + sz > S2 || y + sz > S2) continue;
          const e = score2(sz, x, y); if (e < b2[0]) b2 = [e, sz, x, y];
        }
      }
      res.push([b2[0], c, `${Math.round(b2[2] * f2)},${Math.round(b2[3] * f2)},${Math.round(b2[1] * f2)}`]);
    } catch (e) { res.push([9, c, 'error ' + e.message]); }
  }
  res.sort((a, b) => a[0] - b[0]);
  for (const r of res) console.log(r[0].toFixed(3), r[2], r[1]);
})();
