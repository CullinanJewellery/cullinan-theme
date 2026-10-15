/*
  bg-even.cjs — evens out the plain background of a finished photo (owner, 2026-10-15: "on the computer"). Nano Banana
  builds 4k photos in tiles whose backgrounds differ by 2–3 levels (ring D: 252 against 254.5); framed, that shows as
  lighter or darker strips.

  Only plain background pixels change: light (luminance above 244) and colourless (spread under 8), not near the
  metal (a margin round every coloured pixel, so gold highlights are safe) and not where there is detail (any small
  area with real contrast: stone facets, metal edges; so stones are safe without marking them). --keep boxes are
  optional and rarely needed: an unevened box shows as a patch (ring D, 2026-10-15). They move to the photo's own median background colour;
  the move fades in from luminance 244 to 249, so the shadow and its soft edge stay as they are. The piece, its
  shadow and the stones do not change.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node bg-even.cjs <in.png> <out.png> [--keep x0,y0,x1,y1 ...]   (box corners as fractions of the photo)
*/
const sharp = require('sharp');

const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;

(async () => {
  const args = process.argv.slice(2);
  const keep = [];
  for (let i = args.indexOf('--keep'); i >= 0; i = args.indexOf('--keep')) keep.push(args.splice(i, 2)[1].split(',').map(Number));
  const [src, dst] = args;
  if (!src || !dst) throw new Error('usage: node bg-even.cjs <in.png> <out.png> [--keep x0,y0,x1,y1 ...]');
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels;

  // coloured pixels (the metal), on a grid of 8 px cells, grown by 2 cells: nothing within ~16 px of metal changes
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
  // detail: any 8 px cell whose brightness varies by more than 10 (stone facets, metal edges, texture), grown by one
  // cell, stays as it is. The tiles' steps (2–3 levels) and the shadow's soft gradient are flatter than that.
  const lo = new Float32Array(gw * gh).fill(255), hi = new Float32Array(gw * gh);
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const p = (y * W + x) * ch, c = ((y / C) | 0) * gw + ((x / C) | 0), L = lum(data[p], data[p + 1], data[p + 2]);
    if (L < lo[c]) lo[c] = L;
    if (L > hi[c]) hi[c] = L;
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

  // the target: the median of the clearly plain background (luminance 249 and above)
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
    const w = Math.min(1, (lum(r, g, b) - 244) / 5);
    out[p] = Math.round(r + w * (target[0] - r));
    out[p + 1] = Math.round(g + w * (target[1] - g));
    out[p + 2] = Math.round(b + w * (target[2] - b));
    changed++;
  }
  await sharp(out, { raw: { width: W, height: H, channels: ch } }).png().toFile(dst);
  console.log(JSON.stringify({ src, dst, target, keep, changedShare: Number((changed / (W * H)).toFixed(3)) }));
})();
