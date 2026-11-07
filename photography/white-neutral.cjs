/*
  white-neutral.cjs — takes the gold's warm glow out of a white photo (owner, 2026-11-07, white zodiac pendants: "check
  all the places": the backdrop seen through the openwork, the walls of its openings and the shadow round the sign were
  pink). In the yellow photo the gold throws warm light onto everything near it; metal-swap.cjs changes only the gold
  itself (red − blue from 8, fully from 28), so those faint reflections stay warm in the white photo, where white gold
  would throw none.
  For every pixel the share that is not metal (from the yellow photo it was made from, the same weight as
  metal-swap.cjs) gets the backdrop's own tint (251, 251, 253: red = green, blue 2 above), keeping its brightness. The
  metal keeps its colour; the backdrop does not change; shadows stay as dark as they were, only neutral.
  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node white-neutral.cjs <white.png> <the yellow it was made from> <out.png> [--stone x0,y0,x1,y1 ...]
  Strongly coloured pixels (more than 25 levels between channels: a stone's fire, a ruby) are left as they are; the glow
  is faint. --stone: boxes (fractions of the photo) left exactly as they are, for a pearl (pink, but faint).
*/
const sharp = require('sharp');
const BG = [-2 / 3, -2 / 3, 4 / 3]; // 251, 251, 253 as offsets from its brightness
(async () => {
  const [wf, yf, out, ...rest] = process.argv.slice(2);
  if (!out) throw new Error('usage: node white-neutral.cjs <white> <yellow> <out> [--stone box ...]');
  const boxes = []; rest.forEach((a, i) => { if (a === '--stone') boxes.push(rest[i + 1].split(',').map(Number)); });
  const { data: d, info } = await sharp(wf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const Y = await sharp(yf).removeAlpha().resize(info.width, info.height).raw().toBuffer();
  const W = info.width, H = info.height, o = Buffer.from(d); let n = 0;
  for (let i = 0; i < W * H; i++) {
    const p = i * 3, metal = Math.min(1, Math.max(0, (Y[p] - Y[p + 2] - 8) / 20)), k = 1 - metal;
    if (!k) continue;
    if (boxes.length) { const x = (i % W) / W, y = Math.floor(i / W) / H; if (boxes.some((b) => x >= b[0] && x <= b[2] && y >= b[1] && y <= b[3])) continue; }
    if (Math.max(d[p], d[p + 1], d[p + 2]) - Math.min(d[p], d[p + 1], d[p + 2]) > 25) continue; // a stone's fire, a ruby: its own colour
    const L = (d[p] + d[p + 1] + d[p + 2]) / 3;
    for (let c = 0; c < 3; c++) o[p + c] = Math.max(0, Math.min(255, Math.round(d[p + c] + k * (L + BG[c] - d[p + c]))));
    if (Math.abs(o[p] - d[p]) + Math.abs(o[p + 2] - d[p + 2]) > 1) n++;
  }
  await sharp(o, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
  console.log(out, 'pixels changed', n);
})();
