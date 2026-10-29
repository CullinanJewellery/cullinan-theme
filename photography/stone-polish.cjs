/*
  stone-polish.cjs — free local test (owner, 2026-10-29): makes the stones of a finished photo look like ring G's
  premium stones without a Higgsfield edit. Only stone pixels change: inside the boxes given, where the photo is nearly
  colourless (saturation under 0.14, blended out by 0.22) and not the flat background (251, 251, 253). Gold claws,
  cups and band are coloured, so they stay as they are.

  On those pixels, nothing is drawn; the stone's own facets are kept and only their tones change:
    1. colour cast removed (pink, lilac, yellow, grey) to a clean, very slightly cool white;
    2. mid-tone facets deepened (gamma) and the contrast between facets raised round the middle tone;
    3. the facet edges sharpened a little.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node stone-polish.cjs <in.png> <out.png> [--gamma 1.6] [--contrast 1.4] [--sharpen 1.2] x0,y0,x1,y1 [x0,y0,x1,y1 ...]
  Boxes are fractions of the photo, as for metal-swap.cjs --stone.
*/
const sharp = require('sharp');

const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); if (i < 0) return def; const v = +args[i + 1]; args.splice(i, 2); return v; };
const CONTRAST = opt('--contrast', 1.4), SHARPEN = opt('--sharpen', 1.2), GAMMA = opt('--gamma', 1.6);
const [src, out, ...bx] = args;

(async () => {
  if (!src || !out || !bx.length) throw new Error('usage: node stone-polish.cjs <in> <out> [--contrast k] [--sharpen s] x0,y0,x1,y1 ...');
  const A = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = A.info.width, H = A.info.height;
  const S = await sharp(src).removeAlpha().sharpen({ sigma: SHARPEN }).raw().toBuffer();
  const boxes = bx.map((s) => s.split(',').map(Number));
  const d = Buffer.from(A.data);
  let n = 0;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const fx = x / W, fy = y / H;
      if (!boxes.some((b) => fx >= b[0] && fx <= b[2] && fy >= b[1] && fy <= b[3])) continue;
      const i = (y * W + x) * 3;
      const r = A.data[i], g = A.data[i + 1], b = A.data[i + 2];
      if (Math.abs(r - 251) < 6 && Math.abs(g - 251) < 6 && Math.abs(b - 253) < 6) continue; // background
      const mx = Math.max(r, g, b);
      const s = mx ? (mx - Math.min(r, g, b)) / mx : 0;
      const w = s < 0.14 ? 1 : s < 0.22 ? (0.22 - s) / 0.08 : 0;
      if (!w) continue;
      n++;
      // luminance from the sharpened copy, then an S-curve round the middle tone
      const L = 0.3 * S[i] + 0.59 * S[i + 1] + 0.11 * S[i + 2];
      const t = Math.pow(L / 255, GAMMA); // gamma above 1 deepens the mid-tone facets
      const c = 0.5 + (t - 0.5) * CONTRAST;
      const L2 = Math.max(0, Math.min(255, 255 * (c < 0 ? 0 : c > 1 ? 1 : c)));
      const nr = L2 - 2, ng = L2, nb = Math.min(255, L2 + 3); // clean, very slightly cool white
      d[i] = Math.round(r * (1 - w) + Math.max(0, nr) * w);
      d[i + 1] = Math.round(g * (1 - w) + ng * w);
      d[i + 2] = Math.round(b * (1 - w) + nb * w);
    }
  }
  await sharp(d, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
  console.log(out, 'stone pixels changed:', n);
})();
