/*
  compare-sheet.cjs — one image for the owner: the piece's raw photo(s) on the left, the new photo(s) on the right,
  labelled, so the owner can see at a glance that the piece is the same (photography/workflow.md, steps 5 and 8).

  Usage (needs sharp, NODE_PATH as for frame-photo.cjs):
    node compare-sheet.cjs <out.jpg> --raw <raw1> [raw2 …] --new <new1> [new2 …] [--note "five stones"]
*/
const sharp = require('sharp');

const S = 640;

function label(text, width) {
  const safe = String(text).replace(/[<&>]/g, '');
  return Buffer.from(
    `<svg width="${width}" height="44"><rect width="100%" height="100%" fill="#ffffff"/>` +
      `<text x="12" y="30" font-size="22" font-family="Arial, sans-serif" fill="#2a1e1a">${safe}</text></svg>`
  );
}

async function tile(file) {
  return sharp(file).rotate().resize(S, S, { fit: 'contain', background: '#ffffff' }).toBuffer();
}

(async () => {
  const args = process.argv.slice(2);
  const out = args.shift();
  const pick = (flag) => {
    const i = args.indexOf(flag);
    if (i < 0) return [];
    const list = [];
    for (let j = i + 1; j < args.length && !args[j].startsWith('--'); j++) list.push(args[j]);
    return list;
  };
  const raw = pick('--raw');
  const made = pick('--new');
  const noteI = args.indexOf('--note');
  const note = noteI >= 0 ? args[noteI + 1] : '';
  if (!out || !raw.length || !made.length) throw new Error('usage: node compare-sheet.cjs <out.jpg> --raw <files> --new <files> [--note text]');

  const rows = Math.max(raw.length, made.length);
  const top = note ? 44 : 0;
  const parts = [];
  if (note) parts.push({ input: label(note, S * 2), left: 0, top: 0 });
  for (let r = 0; r < rows; r++) {
    const y = top + r * (S + 44);
    if (raw[r]) {
      parts.push({ input: label('Сурова снимка ' + (r + 1), S), left: 0, top: y });
      parts.push({ input: await tile(raw[r]), left: 0, top: y + 44 });
    }
    if (made[r]) {
      parts.push({ input: label('Нова снимка ' + (r + 1), S), left: S, top: y });
      parts.push({ input: await tile(made[r]), left: S, top: y + 44 });
    }
  }
  await sharp({ create: { width: S * 2, height: top + rows * (S + 44), channels: 3, background: '#ffffff' } })
    .composite(parts)
    .jpeg({ quality: 88 })
    .toFile(out);
  console.log(out);
})();
