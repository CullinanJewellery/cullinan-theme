#!/usr/bin/env node
/*
  paste-pendant.cjs: puts the approved pendant from its main photo onto a worn (neck) photo, exactly as it is,
  over the pendant the model drew there (owner, 2026-10-31: on the neck "the models must be exact the same").

  The pendant is cut out of the main photo (flat 251,251,253 background): everything reachable from the border
  without crossing gold is background; the rest is the pendant, so white rhodium parts enclosed by gold stay in.
  Background-coloured pixels above the medallion (the hole of the jump ring) are left out. The cut-out is scaled
  to the given height, placed with its bail top at (cx, top), and a soft contact shadow is laid under it.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node paste-pendant.cjs <main.png> <worn.png> <out.png> --cx X --top Y --height H [--shadow 0.28]
                           [--open [--dark 120] [--near 24]] [--mask <yellow.png or cut-out>]
  X, Y, H in pixels of the worn photo: H is the pendant's full height including the bail.
  Measure them on the drawn pendant first; the pasted one must cover it (make H a little larger if needed),
  or use a worn photo with the chain only (no pendant drawn), as for the new pendants (2026-10-31).
  --open for openwork pieces: gaps showing the floor become transparent (see the comment in the code).
*/
const sharp = require('sharp');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? +args[i + 1] : d; };
const [mainP, wornP, outP] = args;
const CX = opt('--cx'), TOP = opt('--top'), HT = opt('--height'), SH = opt('--shadow', 0.28);
const OPEN = args.includes('--open'), DARK = opt('--dark', 120), NEAR = opt('--near', 24);
const MASKP = args.includes('--mask') ? args[args.indexOf('--mask') + 1] : null;

(async () => {
  // --mask: the pendant's shape is found on this file (the yellow photo or its cut-out) and the colours are
  // taken from <main.png> (the white or rose photo made from it, same geometry)
  const shapeP = MASKP || mainP;
  const meta = await sharp(shapeP).metadata();
  const { data, info } = await sharp(shapeP).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, N = W * H;
  const col = MASKP ? await sharp(mainP).removeAlpha().resize(W, H).raw().toBuffer() : data;
  // a cut-out with its own transparency (e.g. Higgsfield's background remover) is used as it is
  const given = meta.hasAlpha ? await sharp(shapeP).extractChannel(3).raw().toBuffer() : null;
  const gold = new Uint8Array(N);
  for (let p = 0; p < N; p++) {
    const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2], mx = Math.max(r, g, b);
    gold[p] = mx > 90 && (mx - Math.min(r, g, b)) / mx > 0.25 && r > b ? 1 : 0;
  }
  // background = reachable from the border through non-gold pixels
  const outside = new Uint8Array(N), stack = [];
  const push = (p) => { if (!outside[p] && !gold[p]) { outside[p] = 1; stack.push(p); } };
  for (let x = 0; x < W; x++) { push(x); push((H - 1) * W + x); }
  for (let y = 0; y < H; y++) { push(y * W); push(y * W + W - 1); }
  while (stack.length) {
    const p = stack.pop(), x = p % W, y = (p / W) | 0;
    if (x > 0) push(p - 1); if (x < W - 1) push(p + 1); if (y > 0) push(p - W); if (y < H - 1) push(p + W);
  }
  // bounding box of the pendant
  let x0 = W, x1 = 0, y0 = H, y1 = 0;
  for (let p = 0; p < N; p++) if (!outside[p]) { const x = p % W, y = (p / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  // widest row = the medallion; above its top, background-coloured enclosed pixels are holes (jump ring)
  let medTop = y1;
  for (let y = y0; y <= y1; y++) { let c = 0; for (let x = x0; x <= x1; x++) if (!outside[y * W + x]) c++; if (c > 0.6 * (x1 - x0)) { medTop = y; break; } }
  const alpha = Buffer.alloc(N);
  if (given) {
    for (let p = 0; p < N; p++) alpha[p] = given[p];
    x0 = W; x1 = 0; y0 = H; y1 = 0;
    for (let p = 0; p < N; p++) if (alpha[p] > 128) { const x = p % W, y = (p / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  } else if (!OPEN) {
    for (let p = 0; p < N; p++) {
      if (outside[p]) continue;
      const y = (p / W) | 0, r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2];
      const nearBg = Math.abs(r - 251) + Math.abs(g - 251) + Math.abs(b - 253) < 14;
      if (nearBg && y < medTop) continue;
      alpha[p] = 255;
    }
  } else {
    // Openwork piece: gold is kept; every other region (separated by background-coloured pixels) is kept only
    // if it holds the dark reflections of polished rhodium (luminance < DARK). Open gaps showing the floor and
    // the soft shadow have none, so they become transparent; white rhodium parts outside the gold (a bee's
    // tail) are kept too.
    const lum = (p) => 0.299 * data[p * 3] + 0.587 * data[p * 3 + 1] + 0.114 * data[p * 3 + 2];
    const nearBg = (p) => Math.abs(data[p * 3] - 251) + Math.abs(data[p * 3 + 1] - 251) + Math.abs(data[p * 3 + 2] - 253) < 10;
    const seen = new Uint8Array(N);
    for (let p = 0; p < N; p++) {
      if (gold[p]) { alpha[p] = 255; continue; }
      if (seen[p] || nearBg(p)) continue;
      const comp = [p]; seen[p] = 1; let dark = 0;
      for (let k = 0; k < comp.length; k++) {
        const q = comp[k], x = q % W, y = (q / W) | 0;
        if (lum(q) < DARK) dark++;
        for (const n of [x > 0 ? q - 1 : -1, x < W - 1 ? q + 1 : -1, y > 0 ? q - W : -1, y < H - 1 ? q + W : -1]) {
          if (n < 0 || seen[n] || gold[n] || nearBg(n)) continue;
          seen[n] = 1; comp.push(n);
        }
      }
      if (dark >= 30) for (const q of comp) alpha[q] = 255;
    }
    // the region test lets the shadow that touches a kept rhodium part through; drop the shadow-like pixels
    // (neutral, mid-light, smooth) that are not near gold or a dark reflection
    const anchor = Buffer.alloc(N);
    for (let p = 0; p < N; p++) anchor[p] = gold[p] || lum(p) < DARK ? 255 : 0;
    const near = await sharp(anchor, { raw: { width: W, height: H, channels: 1 } }).blur(NEAR / 2).extractChannel(0).raw().toBuffer();
    for (let p = 0; p < N; p++) {
      if (!alpha[p] || gold[p]) continue;
      const r = data[p * 3], g = data[p * 3 + 1], b = data[p * 3 + 2], mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const L = lum(p);
      if (mx - mn < 12 && L > 170 && L < 247 && near[p] < 4) alpha[p] = 0;
    }
    // the bounding box must follow what is kept
    x0 = W; x1 = 0; y0 = H; y1 = 0;
    for (let p = 0; p < N; p++) if (alpha[p]) { const x = p % W, y = (p / W) | 0; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  }
  // soften the edge by one pixel so no light fringe from the old background remains
  const a1 = given ? Buffer.from(alpha) : await sharp(alpha, { raw: { width: W, height: H, channels: 1 } }).blur(1.2).extractChannel(0).raw().toBuffer();
  if (!given) for (let p = 0; p < N; p++) a1[p] = Math.max(0, Math.min(255, (a1[p] - 70) * 255 / 185));
  const bw = x1 - x0 + 1, bh = y1 - y0 + 1;
  const rgba = Buffer.alloc(bw * bh * 4);
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
    const p = (y + y0) * W + x + x0, q = (y * bw + x) * 4;
    rgba[q] = col[p * 3]; rgba[q + 1] = col[p * 3 + 1]; rgba[q + 2] = col[p * 3 + 2]; rgba[q + 3] = a1[p];
  }
  const scale = HT / bh, nw = Math.round(bw * scale), nh = Math.round(HT);
  const piece = await sharp(rgba, { raw: { width: bw, height: bh, channels: 4 } }).resize(nw, nh, { kernel: 'lanczos3' }).png().toBuffer();
  // bail top centre: centre of the topmost rows
  let bx = 0, bn = 0;
  for (let y = y0; y < y0 + Math.max(3, bh * 0.02); y++) for (let x = x0; x <= x1; x++) if (alpha[y * W + x] > 128) { bx += x; bn++; }
  const bailCx = (bx / bn - x0) * scale;
  const left = Math.round(CX - bailCx), top = Math.round(TOP);

  // soft shadow: the pendant's alpha, blurred, a little down and to the right of the light (light from the left)
  const sa = await sharp(piece).extractChannel(3).blur(Math.max(2, nh * 0.012)).raw().toBuffer();
  const worn = sharp(wornP).removeAlpha();
  const wm = await worn.metadata();
  const shadow = Buffer.alloc(nw * nh * 4);
  for (let i = 0; i < nw * nh; i++) { shadow[i * 4] = 40; shadow[i * 4 + 1] = 25; shadow[i * 4 + 2] = 20; shadow[i * 4 + 3] = Math.round(sa[i] * SH); }
  const sh = await sharp(shadow, { raw: { width: nw, height: nh, channels: 4 } }).png().toBuffer();
  const off = Math.max(2, Math.round(nh * 0.012));
  await worn.composite([
    { input: sh, left: left + off, top: top + off, blend: 'multiply' },
    { input: piece, left, top },
  ]).png().toFile(outP);
  console.log(JSON.stringify({ main: mainP, worn: wornP, out: outP, cutout: [x0, y0, x1, y1], medallionTop: medTop, placed: { left, top, width: nw, height: nh }, wornSize: [wm.width, wm.height] }));
})();
