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
    node recolour-piece.cjs "<piece folder>" [--work <dir>] [--save] [--stone x0,y0,x1,y1 ...]
  --stone boxes (fractions of the photo) are passed to metal-swap.cjs so stones keep their own colour in the white
  photo. A coloured stone (ruby) or a pearl still needs checking by eye: see lessons 69 and 71.
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
  const stones = []; args.forEach((a, i) => { if (a === '--stone') stones.push('--stone', args[i + 1]); });
  fs.mkdirSync(work, { recursive: true });
  const date = new Date().toISOString().slice(0, 10);
  const backup = path.join(dir, 'чернови', `преди цветовете ${date}`);
  const rows = [], saved = [];

  for (const yName of fs.readdirSync(path.join(dir, M.y)).filter((f) => f.endsWith('.png') && !WORN.test(f)).sort()) {
    const k = yName.slice(0, 2);
    const src = (m) => path.join(dir, M[m], yName.replace(M.y, M[m]));
    const out = (n) => path.join(work, `${k}-${n}.png`);
    run('gold-look-match.cjs', [REF_Y, src('y'), out('ym')]);
    run('gold-deepen.cjs', [out('ym'), out('y'), '1.25', '0.94']);
    if (fs.existsSync(src('r'))) { run('gold-look-match.cjs', [REF_R, src('r'), out('rm')]); run('gold-deepen.cjs', [out('rm'), out('r'), '1.25', '0.94']); }
    run('metal-swap.cjs', ['white', out('ym'), out('w'), ...stones]);
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
