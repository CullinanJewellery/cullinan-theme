/*
  recolour-piece.cjs — moves one finished piece to the standard metals in one step (owner, 2026-11-07: one script for
  the whole colour pass, so every piece is done the same way). The red ring („Комплект с червен камък / Пръстен“) is
  the reference for every metal (owner: "i want the color on one ring to look the same on all of the others").
  For every photo of the piece that is not worn (no „на ръка / на шията / на ухото / на врата / на китката“):
    yellow  gold-look-match.cjs onto the red ring's yellow, then gold-deepen.cjs 1.25 0.94 (owner chose "deeper")
    rose    the same, onto the red ring's rose
    white   metal-swap.cjs white from the look-matched yellow (before deepening), exactly how the red ring's white was
            made; rhodium parts (a zodiac sign, a cross's panel), backdrop, shadow and holes are not touched (owner,
            2026-11-07: the mask-based white-look-match left white outside the jewellery and in the jump ring)
    silver  a copy of the white
  The frame is never changed (owner, 2026-11-07: only rings share one size).
  Without --save it only writes the new files and a before/after sheet into --work (default: the system temp folder),
  for the owner to see. With --save it first copies every file it replaces into the piece's
  `чернови/преди цветовете <date>` (never overwriting an earlier backup), then saves the new ones.
  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node recolour-piece.cjs "<piece folder>" [--work <dir>] [--save] [--stone x0,y0,x1,y1 ...] [--pearl-reflect]
  --stone boxes (fractions of the photo): inside them the yellow and rose keep the old photo's own pixels except
  clearly gold ones, and they are passed to metal-swap.cjs and white-neutral.cjs, so stones and pearls keep their colour. A coloured stone (ruby) or a pearl still needs checking by eye: see lessons 69 and 71.
*/
const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');
const sharp = require('sharp');

const HERE = __dirname;
const WEB = path.resolve(HERE, '../../../Pictures/PicturesForWebFaceInstagram/pictures for the website');
const RED = path.join(WEB, '15 Комплект с червен камък - номер предстои', 'Пръстен');
const REF_Y = path.join(RED, 'жълто злато', '01 основна снимка - жълто злато.png');
const REF_R = path.join(RED, 'розово злато', '01 основна снимка - розово злато.png');
const WORN = /на ръка|на шията|на ухото|на врата|на китката/;
const M = { y: 'жълто злато', r: 'розово злато', w: 'бяло злато', s: 'сребро' };

// inside --stone boxes, give back the source's own pixels wherever they are not clearly gold (red − blue under 35,
// fully gold from 55, as metal-swap.cjs): gold-look-match.cjs and gold-deepen.cjs map every warm pixel, and a pearl's
// warm lustre came out in yellow blotches (pearl pendant, 2026-11-07)
async function keepStones(src, out, boxes, lo = 35) {
  if (!boxes.length) return;
  const { data: o, info } = await sharp(out).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const s = await sharp(src).removeAlpha().resize(info.width, info.height).raw().toBuffer();
  const W = info.width, H = info.height;
  for (let i = 0; i < W * H; i++) { const x = (i % W) / W, y = Math.floor(i / W) / H;
    if (!boxes.some((b) => x >= b[0] && x <= b[2] && y >= b[1] && y <= b[3])) continue;
    const p = i * 3, g = Math.min(1, Math.max(0, (s[p] - s[p + 2] - lo) / 20));
    for (let c = 0; c < 3; c++) o[p + c] = Math.round(s[p + c] + g * (o[p + c] - s[p + c])); }
  await sharp(o, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out + '.tmp.png');
  fs.renameSync(out + '.tmp.png', out);
}

// --pearl-reflect (pearl studs, 2026-11-07): the pearls mirror the gold in warm patches (red − blue 50–70; the claws
// 80 and over). Yellow and rose keep those patches as they were (only red − blue from 70 changes); in the white photo they
// become the pearl's own colour at their yellow brightness, as a pearl beside white metal looks
async function pearlWhite(yellow, out, boxes) {
  const { data: o, info } = await sharp(out).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const Y = await sharp(yellow).removeAlpha().resize(info.width, info.height).raw().toBuffer();
  const W = info.width, H = info.height, inb = (i) => { const x = (i % W) / W, y = Math.floor(i / W) / H; return boxes.some((b) => x >= b[0] && x <= b[2] && y >= b[1] && y <= b[3]); };
  const t = [0, 0, 0]; let n = 0; // the pearl's own tint: its plain pixels in the yellow photo
  for (let i = 0; i < W * H; i++) { const p = i * 3, v = Y[p] - Y[p + 2], L = (Y[p] + Y[p + 1] + Y[p + 2]) / 3; if (!inb(i) || v < 3 || v > 25 || L < 150) continue; for (let c = 0; c < 3; c++) t[c] += Y[p + c] - L; n++; }
  for (let c = 0; c < 3; c++) t[c] /= n || 1;
  for (let i = 0; i < W * H; i++) { if (!inb(i)) continue; const p = i * 3, v = Y[p] - Y[p + 2], r = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));
    const w = r(v, 25, 45) * (1 - r(v, 70, 90)); if (!w) continue; const L = (Y[p] + Y[p + 1] + Y[p + 2]) / 3;
    for (let c = 0; c < 3; c++) o[p + c] = Math.max(0, Math.min(255, Math.round(o[p + c] + w * (L + t[c] - o[p + c])))); }
  await sharp(o, { raw: { width: W, height: H, channels: 3 } }).png().toFile(out + '.tmp.png');
  fs.renameSync(out + '.tmp.png', out);
}

const run = (script, args) => execFileSync(process.execPath, [path.join(HERE, script), ...args], { stdio: 'pipe' }).toString();

async function sheet(rows, out) {
  const W = 360, LH = 26, cols = 6, comp = [];
  rows.forEach((cells, r) => cells.forEach(([file, label], c) => comp.push({ file, label, x: c * (W + 6), y: r * (W + LH + 6) })));
  const parts = [];
  for (const k of comp) {
    if (!fs.existsSync(k.file)) continue;
    parts.push({ input: await sharp(k.file).resize(W, W).toBuffer(), left: k.x, top: k.y + LH });
    parts.push({ input: Buffer.from(`<svg width="${W}" height="${LH}"><text x="4" y="19" font-family="Arial" font-size="16">${k.label}</text></svg>`), left: k.x, top: k.y });
  }
  await sharp({ create: { width: cols * (W + 6), height: rows.length * (W + LH + 6), channels: 3, background: '#fff' } })
    .composite(parts).jpeg({ quality: 85 }).toFile(out);
}

(async () => {
  const args = process.argv.slice(2);
  const dir = args[0];
  if (!dir || !fs.existsSync(path.join(dir, M.y))) throw new Error('usage: node recolour-piece.cjs "<piece folder with жълто злато/>" [--work dir] [--save] [--stone box ...]');
  const wi = args.indexOf('--work');
  const work = wi >= 0 ? args[wi + 1] : path.join(os.tmpdir(), 'recolour', path.basename(dir));
  const save = args.includes('--save');
  const lo = args.includes('--pearl-reflect') ? 70 : 35;
  const stones = [], boxes = []; args.forEach((a, i) => { if (a === '--stone') { stones.push('--stone', args[i + 1]); boxes.push(args[i + 1].split(',').map(Number)); } });
  fs.mkdirSync(work, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const backup = path.join(dir, 'чернови', `преди цветовете ${date}`);
  const rows = [], saved = [];

  for (const yName of fs.readdirSync(path.join(dir, M.y)).filter((f) => f.endsWith('.png') && !WORN.test(f)).sort()) {
    const k = yName.slice(0, 2);
    const src = (m) => path.join(dir, M[m], yName.replace(M.y, M[m]));
    const out = (n) => path.join(work, `${k}-${n}.png`);
    run('gold-look-match.cjs', [REF_Y, src('y'), out('ym')]); await keepStones(src('y'), out('ym'), boxes, lo);
    run('gold-deepen.cjs', [out('ym'), out('y'), '1.25', '0.94']); await keepStones(src('y'), out('y'), boxes, lo);
    if (fs.existsSync(src('r'))) { run('gold-look-match.cjs', [REF_R, src('r'), out('rm')]); run('gold-deepen.cjs', [out('rm'), out('r'), '1.25', '0.94']); await keepStones(src('r'), out('r'), boxes, lo); }
    run('metal-swap.cjs', ['white', out('ym'), out('wg'), ...stones]);
    run('white-neutral.cjs', [out('wg'), out('ym'), out('w'), ...stones]);
    if (lo === 70) await pearlWhite(src('y'), out('w'), boxes);
    rows.push([[src('y'), `${k} жълто сега`], [out('y'), 'ново'], [src('r'), 'розово сега'], [out('r'), 'ново'], [src('w'), 'бяло сега'], [out('w'), 'ново']]);
    if (save) {
      fs.mkdirSync(backup, { recursive: true });
      for (const [m, n] of [['y', 'y'], ['r', 'r'], ['w', 'w'], ['s', 'w']]) {
        const dst = src(m);
        if (!fs.existsSync(dst) || !fs.existsSync(out(n))) continue;
        const b = path.join(backup, path.basename(dst));
        if (!fs.existsSync(b)) fs.copyFileSync(dst, b);
        fs.copyFileSync(out(n), dst); saved.push(dst);
      }
    }
  }
  const sheetFile = path.join(work, 'преди и след.jpg');
  await sheet(rows, sheetFile);
  if (save) fs.copyFileSync(sheetFile, path.join(dir, 'чернови', `цветове ${date} - преди и след.jpg`));
  console.log(JSON.stringify({ piece: path.basename(dir), photos: rows.length, work, sheet: sheetFile, saved: saved.length, backup: save ? backup : null }));
})();
