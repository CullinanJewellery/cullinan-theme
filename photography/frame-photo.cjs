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
    node frame-photo.cjs <shot 1|2|3> <4K source.png> <output.png> [--size 0.55]
  --size replaces the piece's share of the frame, for a piece that must look smaller than the others (owner,
  2026-10-26: the zodiac coins are smaller than the openwork zodiac pendants; 2026-10-27, measured on the owner's neck
  photos, a coin is about two thirds of an openwork pendant's height, so the coin photos use 0.55).

  If the frame reaches past the picture (the piece is large or off-centre in the source), the border is
  extended by copying its edge, but only when every edge of the photo is flat off-white background;
  otherwise the script stops: ask Higgsfield for the piece smaller and centred.
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

// true when a 16 px strip along every edge is plain, even, light background (no shadow, no piece): on each side
// the brightness varies by at most 6 (2nd to 98th percentile), stays above 240, and is nearly colourless
async function flatBorder(file) {
  const { data, info } = await sharp(file).resize(1024, 1024, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  const sides = { top: [], bottom: [], left: [], right: [] };
  for (let y = 0; y < 1024; y++) {
    for (let x = 0; x < 1024; x++) {
      const k = y < 16 ? 'top' : y >= 1008 ? 'bottom' : x < 16 ? 'left' : x >= 1008 ? 'right' : null;
      if (!k) continue;
      const i = (y * 1024 + x) * info.channels;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      if (Math.max(r, g, b) - Math.min(r, g, b) > 10) return false;
      sides[k].push((r + g + b) / 3);
    }
  }
  return Object.values(sides).every((l) => {
    l.sort((a, b) => a - b);
    const lo = l[Math.floor(0.02 * l.length)], hi = l[Math.floor(0.98 * l.length)];
    return lo > 240 && hi - lo <= 6;
  });
}

(async () => {
  const [shot, src, out, ...rest] = process.argv.slice(2);
  const si = rest.indexOf('--size');
  if (!shot || !src || !out) throw new Error('usage: node frame-photo.cjs <1|2|3> <source> <output>');
  const meta = await sharp(src).metadata();
  const W = meta.width, H = meta.height;
  let left = 0, top = 0, side = Math.min(W, H);
  let img = sharp(src);
  const f = FRAME[shot] && { ...FRAME[shot], ...(si >= 0 ? { size: +rest[si + 1] } : {}) };
  if (f) {
    const p = await findPiece(src);
    const piece = f.measure === 'h' ? p.h * H : p.w * W;
    side = Math.round(piece / f.size);
    left = Math.round(p.cx * W - f.cx * side);
    top = Math.round(p.cy * H - f.cy * side);
    if (left < 0 || top < 0 || left + side > W || top + side > H) {
      // The frame reaches past the photo. Only when the whole border is flat off-white background (no shadow, no
      // piece) is it extended by copying its edge, which cannot be seen (ring C, 2026-10-14: about 100 px at the top).
      const pad = { left: Math.max(0, -left), top: Math.max(0, -top), right: Math.max(0, left + side - W), bottom: Math.max(0, top + side - H) };
      if (!(await flatBorder(src))) {
        throw new Error(`the piece is too big or too close to the edge for the frame (crop ${left},${top} side ${side} in ${W}x${H}), and the border is not flat background`);
      }
      img = sharp(await sharp(src).extend({ ...pad, extendWith: 'copy' }).png().toBuffer());
      left += pad.left;
      top += pad.top;
      console.log(`border extended by copying its edge: ${JSON.stringify(pad)} px`);
    }
  }
  await img.extract({ left, top, width: side, height: side }).resize(2048, 2048, { kernel: 'lanczos3' }).png().toFile(out);
  const q = f ? await findPiece(out) : null;
  console.log(out, q ? `piece ${f.measure}=${(f.measure === 'h' ? q.h : q.w).toFixed(3)} centre ${q.cx.toFixed(3)},${q.cy.toFixed(3)}` : 'hand photo, not cropped');
})();
