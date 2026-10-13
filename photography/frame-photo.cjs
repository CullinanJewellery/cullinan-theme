/*
  frame-photo.cjs — puts a finished Higgsfield photo into the shop's fixed frame (owner, 2026-10-13:
  "a structure for the positioning", so every piece sits the same way on the site).

  The frame is ring A („Пръстен с топчета“), the owner's model. Measured on its finished photos:
    01 standing   the piece is 80.7% of the photo's height, its centre at 50.0% across, 51.3% down
    02 lying flat the piece is 78.0% of the photo's width,  its centre at 50.0% across, 50.8% down
    03 on a hand  no crop (the hand photo is framed by its own prompt)
  The script finds the piece (anything clearly coloured or darker than the off-white background and
  the grey shadow), scales and crops a square so the piece lands exactly there, and writes a
  2048 x 2048 PNG. Only cropping and resizing: no colour, background or shadow is touched (those
  are Higgsfield edits, owner 2026-10-12).

  Usage (needs sharp: `npm i sharp` in any folder, run from there or with NODE_PATH):
    node frame-photo.cjs <shot 1|2|3> <4K source.png> <output.png>

  If the piece is too small in the source to reach the frame without leaving the picture, the
  script says so instead of padding: ask Higgsfield for the piece larger in the frame.
*/
const sharp = require('sharp');

const FRAME = {
  1: { measure: 'h', size: 0.807, cx: 0.5, cy: 0.513 },
  2: { measure: 'w', size: 0.78, cx: 0.5, cy: 0.508 },
};

async function findPiece(file) {
  const { data, info } = await sharp(file).resize(1024, 1024, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
  for (let y = 0; y < 1024; y++) {
    for (let x = 0; x < 1024; x++) {
      const i = (y * 1024 + x) * info.channels;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const spread = Math.max(r, g, b) - Math.min(r, g, b);
      const light = (r + g + b) / 3;
      if (spread > 30 || light < 170) {
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
  }
  return { w: (x1 - x0) / 1024, h: (y1 - y0) / 1024, cx: (x0 + x1) / 2048, cy: (y0 + y1) / 2048 };
}

(async () => {
  const [shot, src, out] = process.argv.slice(2);
  if (!shot || !src || !out) throw new Error('usage: node frame-photo.cjs <1|2|3> <source> <output>');
  const meta = await sharp(src).metadata();
  const W = meta.width, H = meta.height;
  let left = 0, top = 0, side = Math.min(W, H);
  const f = FRAME[shot];
  if (f) {
    const p = await findPiece(src);
    const piece = f.measure === 'h' ? p.h * H : p.w * W;
    side = Math.round(piece / f.size);
    left = Math.round(p.cx * W - f.cx * side);
    top = Math.round(p.cy * H - f.cy * side);
    if (left < 0 || top < 0 || left + side > W || top + side > H) {
      throw new Error(`the piece is too big or too close to the edge for the frame (crop ${left},${top} side ${side} in ${W}x${H})`);
    }
  }
  await sharp(src).extract({ left, top, width: side, height: side }).resize(2048, 2048, { kernel: 'lanczos3' }).png().toFile(out);
  const q = f ? await findPiece(out) : null;
  console.log(out, q ? `piece ${f.measure}=${(f.measure === 'h' ? q.h : q.w).toFixed(3)} centre ${q.cx.toFixed(3)},${q.cy.toFixed(3)}` : 'hand photo, not cropped');
})();
