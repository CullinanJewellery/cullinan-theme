/*
  gold-only-merge.cjs — applies a gold change to a worn photo (hand, neck) only where the gold is, never on the skin
  (2026-10-30: the owner's brighter yellow, 212, 172, 104, on the finished worn photos; gold-match.cjs alone would
  also warm the skin, which has gold's hue).

  The piece's white-gold version of the same photo was made from the yellow one by metal-swap.cjs with the photo's own
  hand or neck settings, so the pixels that differ between the yellow and the white photo are exactly the gold. Those
  pixels take the recoloured photo; everything else stays the original.

  The change itself is a fixed, gentle step from the old yellow to the new one (red, green and blue each multiplied
  by new / old, 212/208, 172/165, 104/114), not gold-match.cjs: gold-match measures the gold over the whole photo,
  skin included, and on worn photos pushed the gold to lemon (first run, 2026-10-30, rejected before saving).

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node gold-only-merge.cjs <yellow original> <white version> <out> [--from 208,165,114] [--to 212,172,104]
*/
const sharp = require('sharp');

(async () => {
  const args = process.argv.slice(2);
  const opt = (n, d) => { const i = args.indexOf(n); return i < 0 ? d : args.splice(i, 2)[1].split(',').map(Number); };
  const FROM = opt('--from', [208, 165, 114]), TO = opt('--to', [212, 172, 104]);
  const K = TO.map((v, k) => v / FROM[k]);
  const [yf, wf, out] = args;
  if (!out) throw new Error('usage: node gold-only-merge.cjs <yellow> <white> <out>');
  const Y = await sharp(yf).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = Y.info.width, H = Y.info.height;
  const Wh = await sharp(wf).resize(W, H).removeAlpha().raw().toBuffer();
  const d = Buffer.from(Y.data);
  let n = 0;
  for (let i = 0; i < W * H * 3; i += 3) {
    const diff = Math.abs(Y.data[i] - Wh[i]) + Math.abs(Y.data[i + 1] - Wh[i + 1]) + Math.abs(Y.data[i + 2] - Wh[i + 2]);
    const w = Math.min(1, Math.max(0, (diff - 12) / 24)); // 12 or less: untouched by the metal swap; 36 and more: gold
    if (!w) continue;
    n++;
    for (let k = 0; k < 3; k++) d[i + k] = Math.min(255, Math.round(Y.data[i + k] * (1 + w * (K[k] - 1))));
  }
  await sharp(d, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out);
  console.log(out, 'gold pixels:', n);
})();
