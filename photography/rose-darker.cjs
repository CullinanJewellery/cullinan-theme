/*
  rose-darker.cjs — moves a finished rose photo to the darker rose of 2026-11-07 (202, 152, 122, 5% darker than ring
  A's 213, 160, 128; owner: "a little bit too bright"), only on the metal, the way metal-swap.cjs makes rose: the
  metal's brightness moves away from white by the same factor (1.106) and its colour round that brightness by
  0.943 (the two targets' ratio), so highlights stay
  highlights and the body of the metal deepens. The metal is found as in gold-only-merge.cjs: the pixels that differ
  from the piece's white version of the same photo (skin, stones, background, shadow are the same in both).

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node rose-darker.cjs <rose photo> <white version> <out> [--k 1.106]
*/
const sharp = require('sharp');
// the colour round the brightness shrinks as the target's does: (202,152,122) vs (213,160,128) offsets, 0.943
const C = 0.943;
(async () => {
  const args = process.argv.slice(2);
  const ki = args.indexOf('--k');
  const K = ki >= 0 ? +args.splice(ki, 2)[1] : 1.106;
  const [rf, wf, out] = args;
  if (!out) throw new Error('usage: node rose-darker.cjs <rose> <white> <out> [--k 1.106]');
  const R = await sharp(rf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = R.info.width, H = R.info.height;
  const Wh = await sharp(wf).resize(W, H).removeAlpha().raw().toBuffer();
  const d = Buffer.from(R.data);
  let n = 0;
  for (let i = 0; i < W * H * 3; i += 3) {
    const diff = Math.abs(R.data[i] - Wh[i]) + Math.abs(R.data[i + 1] - Wh[i + 1]) + Math.abs(R.data[i + 2] - Wh[i + 2]);
    const w = Math.min(1, Math.max(0, (diff - 12) / 24));
    if (!w) continue;
    n++;
    const L = 0.3 * R.data[i] + 0.59 * R.data[i + 1] + 0.11 * R.data[i + 2], L2 = 255 - (255 - L) * K;
    for (let k = 0; k < 3; k++) {
      const v = R.data[i + k], nv = L2 + (v - L) * C;
      d[i + k] = Math.max(0, Math.min(255, Math.round(v + w * (nv - v))));
    }
  }
  await sharp(d, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
  console.log(out, 'metal pixels:', n);
})();
