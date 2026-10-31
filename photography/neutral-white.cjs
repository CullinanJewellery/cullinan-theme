// Usage (needs sharp, NODE_PATH as for check-photo.cjs): node neutral-white.cjs <in.png> <out.png>
// Gold and rose gold are never touched: their green is above their blue.
// Turn a pink/lilac cast on rhodium (low-saturation) pixels back to neutral white; gold is left alone.
const sharp = require('sharp');
const [src, dst] = process.argv.slice(2);
(async () => {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
    const sat = mx ? (mx - mn) / mx : 0;
    // only pixels where green is the lowest channel (magenta side) and saturation is low
    if (g >= r || g >= b) continue;
    const w = Math.max(0, Math.min(1, (0.8 - sat) / 0.1));
    if (!w) continue;
    const L = 0.299 * r + 0.587 * g + 0.114 * b;
    const nr = L, ng = L, nb = L + 2;
    data[i] = Math.round(r * (1 - w) + nr * w);
    data[i + 1] = Math.round(g * (1 - w) + ng * w);
    data[i + 2] = Math.min(255, Math.round(b * (1 - w) + nb * w));
  }
  await sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toFile(dst);
})();
