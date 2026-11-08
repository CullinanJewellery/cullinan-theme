/*
  metals-from-yellow.cjs — all metals of a NEW piece from its approved photo (owner, 2026-11-08, red set). Takes the framed
  yellow photo after gold-look-match.cjs and before gold-deepen.cjs, the same order as recolour-piece.cjs, so nothing moves
  between metals:
    yellow  gold-deepen.cjs 1.25 0.94
    rose    metal-swap.cjs rose, gold-look-match.cjs onto the red ring's rose, gold-deepen.cjs 1.25 0.94
    white   metal-swap.cjs white, white-neutral.cjs (silver is a copy)
  --red-stone: a red stone is "gold" to metal-swap.cjs (red − blue is large), so after each swap its pixels (hue under 22 or
  over 330 degrees in the yellow photo) are put back from the yellow (lesson 61).
  --stone x0,y0,x1,y1: passed on, for clear stones and pearls.
  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node metals-from-yellow.cjs <look-matched framed yellow.png> <work dir> <name> [--red-stone] [--stone box ...]
  Writes <name>-y.png, -r.png, -w.png into the work dir.
*/
const path = require('path'); const fs = require('fs'); const { execFileSync } = require('child_process'); const sharp = require('sharp');
const HERE = __dirname, WEB = path.resolve(HERE, '../../../Pictures/PicturesForWebFaceInstagram/pictures for the website');
const REF_R = path.join(WEB, '15 Комплект с червен камък - номер предстои', 'Пръстен', 'розово злато', '01 основна снимка - розово злато.png');
const run = (s, a) => execFileSync(process.execPath, [path.join(HERE, s), ...a], { stdio: 'pipe' });
async function redBack(yellow, f) {
  const { data: o, info } = await sharp(f).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const Y = await sharp(yellow).removeAlpha().raw().toBuffer(); let n = 0;
  for (let p = 0; p < o.length; p += 3) { const r = Y[p], g = Y[p + 1], b = Y[p + 2], mx = Math.max(r, g, b), mn = Math.min(r, g, b); if (mx - mn < 30) continue;
    let h = mx === r ? ((g - b) / (mx - mn)) * 60 : mx === g ? ((b - r) / (mx - mn) + 2) * 60 : ((r - g) / (mx - mn) + 4) * 60; if (h < 0) h += 360;
    const w = h < 16 || h > 330 ? 1 : h < 22 ? (22 - h) / 6 : 0; if (!w) continue; for (let c = 0; c < 3; c++) o[p + c] = Math.round(o[p + c] + w * (Y[p + c] - o[p + c])); n++; }
  await sharp(o, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toFile(f + '.tmp.png'); fs.renameSync(f + '.tmp.png', f); return n;
}
// pale gold (a lit rim) sits at the thresholds of metal-swap.cjs and gold-look-match.cjs, so its edge came out ragged in rose: pale
// metal pixels (light, red − blue 6 to 45 in the yellow) take the rose's own tint at their brightness, measured on the piece's lit gold
async function softRose(ym, rs, r) {
  const { data: o, info } = await sharp(r).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const Y = await sharp(ym).removeAlpha().raw().toBuffer(), t = [0, 0, 0]; let n = 0;
  for (let p = 0; p < o.length; p += 3) { const L = (o[p] + o[p + 1] + o[p + 2]) / 3; if (Y[p] - Y[p + 2] > 70 && L > 190 && L < 240) { for (let c = 0; c < 3; c++) t[c] += o[p + c] / L; n++; } }
  for (let c = 0; c < 3; c++) t[c] /= n || 1;
  const ramp = (x, a, b) => Math.min(1, Math.max(0, (x - a) / (b - a)));
  for (let p = 0; p < o.length; p += 3) { const v = Y[p] - Y[p + 2], Ly = (Y[p] + Y[p + 1] + Y[p + 2]) / 3; const w = ramp(v, 3, 6) * (1 - ramp(v, 45, 60)) * ramp(Ly, 185, 200); if (!w) continue;
    const L = (o[p] + o[p + 1] + o[p + 2]) / 3, B = Math.max(L, Ly * 0.97); for (let c = 0; c < 3; c++) o[p + c] = Math.max(0, Math.min(255, Math.round(o[p + c] + w * (B * t[c] - o[p + c])))); }
  await sharp(o, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toFile(r + '.tmp.png'); fs.renameSync(r + '.tmp.png', r);
}
(async () => {
  const [ym, work, name, ...rest] = process.argv.slice(2); if (!name) throw new Error('usage: see the top of the file');
  const red = rest.includes('--red-stone'), stones = []; rest.forEach((a, i) => { if (a === '--stone') stones.push('--stone', rest[i + 1]); });
  fs.mkdirSync(work, { recursive: true }); const o = (s) => path.join(work, `${name}-${s}.png`);
  run('gold-deepen.cjs', [ym, o('y'), '1.25', '0.94']);
  run('metal-swap.cjs', ['rose', ym, o('rs'), ...stones]); if (red) await redBack(ym, o('rs'));
  run('gold-look-match.cjs', [REF_R, o('rs'), o('rm')]); run('gold-deepen.cjs', [o('rm'), o('r'), '1.25', '0.94']); await softRose(ym, o('rs'), o('r'));
  run('metal-swap.cjs', ['white', ym, o('wg'), ...stones]); if (red) await redBack(ym, o('wg'));
  run('white-neutral.cjs', [o('wg'), ym, o('w'), ...stones]);
  console.log(JSON.stringify({ name, out: [o('y'), o('r'), o('w')] }));
})();
