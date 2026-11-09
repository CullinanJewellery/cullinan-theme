/*
  collection-compose.cjs — a collection or home page picture: an empty AI scene with the real pieces put in from their finished
  photos (owner, 2026-11-09: "use the exact models we made and use ai to make the photos"). The model never sees or redraws a piece.
  From each finished photo it takes two things:
    - the piece's own pixels, unchanged (the floor is found by flooding in from the edges through smooth, colourless pixels, so
      stones, which have sharp facets, are never taken for floor; openings such as the inside of a ring are floor too);
    - the piece's real shadow, as a brightness ratio to the photo's floor, faded out before the photo's edge so a shadow the frame
      cut leaves no line.
  Then it reports how far each piece's pixels are from the original at the same size (before JPEG): anything above 0 inside the
  piece means something touched it.
  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node collection-compose.cjs <scene.png> <out.jpg> <width>x<height> --piece <photo.png>:<scale>:<centre x>:<centre y> [--piece ...]
  Scale: output photo width / 2048-style photo width (0.36 = a 2048 photo becomes 737 px). Centre: output pixels.
*/
const sharp = require('sharp');

const smooth = (a, b, x) => { const t = Math.min(1, Math.max(0, (x - a) / (b - a))); return t * t * (3 - 2 * t); };

async function layers(file) {
  const { data: d, info } = await sharp(file).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height, n = w * h;
  const neu = new Uint8Array(n), L = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const r = d[i * 3], g = d[i * 3 + 1], b = d[i * 3 + 2];
    neu[i] = Math.max(r, g, b) - Math.min(r, g, b) < 16 ? 1 : 0;
    L[i] = (r + g + b) / 3;
  }
  const raw = neu.slice();
  for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) {
    const i = y * w + x;
    if (Math.max(Math.abs(L[i] - L[i - 1]), Math.abs(L[i] - L[i + 1]), Math.abs(L[i] - L[i - w]), Math.abs(L[i] - L[i + w])) > 9) neu[i] = 0;
  }
  const lab = new Int32Array(n); const comps = [null]; let cur = 0;
  for (let s = 0; s < n; s++) {
    if (!neu[s] || lab[s]) continue;
    cur++; const st = [s]; lab[s] = cur; let area = 0, touch = false, sumG = 0;
    while (st.length) {
      const i = st.pop(); area++; const x = i % w, y = (i / w) | 0;
      if (x === 0 || y === 0 || x === w - 1 || y === h - 1) touch = true;
      if (x < w - 1) sumG += Math.abs(L[i] - L[i + 1]);
      for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, y > 0 ? i - w : -1, y < h - 1 ? i + w : -1]) if (j >= 0 && neu[j] && !lab[j]) { lab[j] = cur; st.push(j); }
    }
    comps.push({ area, touch, g: sumG / area });
  }
  const floor = new Uint8Array(n);
  for (let i = 0; i < n; i++) { const c = comps[lab[i]]; if (c && (c.touch || (c.area > 1500 && c.g < 1.2))) floor[i] = 1; }
  for (let pass = 0; pass < 3; pass++) {
    const add = [];
    for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const i = y * w + x; if (!floor[i] && raw[i] && L[i] > 120 && (floor[i - 1] || floor[i + 1] || floor[i - w] || floor[i + w])) add.push(i); }
    for (const i of add) floor[i] = 1;
  }
  const sh = Buffer.alloc(n), al = Buffer.alloc(n);
  for (let i = 0; i < n; i++) {
    al[i] = floor[i] ? 0 : 255; const x = i % w, y = (i / w) | 0;
    const ed = smooth(0, w * 0.2, Math.min(x, w - 1 - x)) * smooth(0, h * 0.12, Math.min(y, h - 1 - y));
    sh[i] = Math.round(255 * (1 - (1 - (floor[i] ? Math.min(1, L[i] / 251.7) : 1)) * ed));
  }
  const ar = await sharp(al, { raw: { width: w, height: h, channels: 1 } }).blur(0.7).raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) { rgba[i * 4] = d[i * 3]; rgba[i * 4 + 1] = d[i * 3 + 1]; rgba[i * 4 + 2] = d[i * 3 + 2]; rgba[i * 4 + 3] = ar.data[i * ar.info.channels]; }
  return { w, h, rgba, sh };
}

(async () => {
  const [scene, out, size, ...rest] = process.argv.slice(2);
  if (!size) throw new Error('usage: see the top of the file');
  const [W, H] = size.split('x').map(Number);
  const pieces = []; rest.forEach((a, i) => { if (a === '--piece') { const p = rest[i + 1].split(':'); const cy = +p.pop(), cx = +p.pop(), s = +p.pop(); pieces.push({ file: p.join(':'), s, cx, cy }); } });
  const base = await sharp(scene).removeAlpha().resize(W, H, { fit: 'cover', position: 'centre', kernel: 'lanczos3' }).raw().toBuffer();
  const report = [], over = [];
  for (const it of pieces) {
    const l = await layers(it.file), S = Math.round(l.w * it.s), x0 = Math.round(it.cx - S / 2), y0 = Math.round(it.cy - S / 2);
    if (x0 < 0 || y0 < 0 || x0 + S > W || y0 + S > H) throw new Error(`${it.file}: the photo's square leaves the picture; move it or make it smaller`);
    const sm = await sharp(l.sh, { raw: { width: l.w, height: l.h, channels: 1 } }).resize(S, S, { kernel: 'lanczos3' }).raw().toBuffer({ resolveWithObject: true });
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) { const p = ((y0 + y) * W + x0 + x) * 3, q = sm.data[(y * S + x) * sm.info.channels] / 255; for (let k = 0; k < 3; k++) base[p + k] = Math.round(base[p + k] * q); }
    const piece = await sharp(l.rgba, { raw: { width: l.w, height: l.h, channels: 4 } }).resize(S, S, { kernel: 'lanczos3' }).png().toBuffer();
    over.push({ input: piece, left: x0, top: y0 });
    it.S = S; it.x0 = x0; it.y0 = y0; it.piece = piece;
  }
  const flat = await sharp(base, { raw: { width: W, height: H, channels: 3 } }).png().toBuffer();
  const done = await sharp(flat).composite(over).png().toBuffer();
  const R = await sharp(done).removeAlpha().raw().toBuffer();
  for (const it of pieces) {
    const a = await sharp(it.piece).raw().toBuffer({ resolveWithObject: true }); let n = 0, sum = 0, max = 0;
    for (let y = 0; y < it.S; y++) for (let x = 0; x < it.S; x++) {
      const q = (y * it.S + x) * a.info.channels; if (a.data[q + 3] !== 255) continue;
      const p = ((it.y0 + y) * W + it.x0 + x) * 3; n++;
      for (let k = 0; k < 3; k++) { const e = Math.abs(R[p + k] - a.data[q + k]); sum += e; if (e > max) max = e; }
    }
    report.push({ piece: it.file.split(/[\\/]/).slice(-3, -2)[0] || it.file, size: it.S, pixels: n, meanDiff: +(sum / (n * 3)).toFixed(3), maxDiff: max });
  }
  await sharp(done).removeAlpha().jpeg({ quality: 92, chromaSubsampling: '4:4:4' }).toFile(out);
  console.log(JSON.stringify({ out, W, H, report }));
})();
