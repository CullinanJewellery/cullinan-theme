/*
  stone-look.cjs — puts new stones from a Higgsfield "stones only" edit back into the approved photo, so nothing but
  the stones changes (owner, 2026-10-29, ring G: "from now on the stones for every jewellery with stones like that",
  the crisp icy-white stones of a premium online jeweller; lesson 56).

  The model redraws the whole picture, and its gold, head and background drift a little. This script keeps the
  approved photo and takes the edited one only on stone pixels: inside the boxes given, where the approved photo is
  nearly colourless (saturation under 0.14, blended out by 0.22) and is not the flat background (251, 251, 253).
  Gold claws, cups and band are coloured, so they stay exactly as approved.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node stone-look.cjs <approved.png> <stones-edit.png> <out.png> x0,y0,x1,y1 [x0,y0,x1,y1 ...]
  Boxes are fractions of the photo, one round each stone or row of stones (the same boxes as metal-swap.cjs --stone).
  Make the yellow photo first, then white and rose from it with metal-swap.cjs.
*/
const sharp = require('sharp');

(async () => {
  const [approved, edit, out, ...bx] = process.argv.slice(2);
  if (!approved || !edit || !out || !bx.length) throw new Error('usage: node stone-look.cjs <approved> <edit> <out> x0,y0,x1,y1 ...');
  const A = await sharp(approved).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = A.info.width, H = A.info.height;
  const B = await sharp(edit).resize(W, H).removeAlpha().raw().toBuffer();
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
      for (let k = 0; k < 3; k++) d[i + k] = Math.round(A.data[i + k] * (1 - w) + B[i + k] * w);
    }
  }
  await sharp(d, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
  console.log(out, 'stone pixels taken from the edit:', n);
})();
