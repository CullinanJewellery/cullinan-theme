// Makes the Shopify upload copies of every finished product photo (2026-11-22).
// Source: pictures for the website/<NN piece>[/<sub piece>]/<metal>/<NN …>.png|jpg (drafts, raw photos and
// comparison sheets skipped). Output: pictures for the website/_за качване/<same path>/<latin>.jpg,
// at most 2048 px, JPEG quality 92 (4:4:4), colour unchanged. Latin names: Cyrillic links break (upload-checklist).
// Usage: node tools/upload-copies.cjs [folder prefix, e.g. 01]
const fs = require('fs'), path = require('path');
const sharp = require('sharp'); // set NODE_PATH to a node_modules with sharp (photography/README.md)
const ROOT = 'C:/Users/Nitro V/Pictures/PicturesForWebFaceInstagram/pictures for the website';
const OUT = path.join(ROOT, '_за качване');
const METALS = { 'жълто и бяло злато': 'zhalto-byalo', 'розово и бяло злато': 'rozovo-byalo', 'жълто злато': 'zhalto', 'бяло злато': 'byalo', 'розово злато': 'rozovo', 'сребро': 'srebro' };
const map = { а:'a',б:'b',в:'v',г:'g',д:'d',е:'e',ж:'zh',з:'z',и:'i',й:'y',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',т:'t',у:'u',ф:'f',х:'h',ц:'ts',ч:'ch',ш:'sh',щ:'sht',ъ:'a',ь:'y',ю:'yu',я:'ya' };
const lat = (s) => s.toLowerCase().replace(/ - номер предстои/g, '').split('').map((c) => map[c] ?? c).join('')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const only = process.argv[2];
const jobs = [];
(function walk(dir, rel) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory() || /чернови|сурови|видео|^_/.test(e.name)) continue;
    const p = path.join(dir, e.name), r = [...rel, e.name];
    if (METALS[e.name]) {
      const files = fs.readdirSync(p).filter((f) => /^\d\d.*\.(png|jpe?g)$/i.test(f));
      for (const f of files) {
        if (/\.1\.jpe?g$/i.test(f) && files.includes(f.replace(/\.1\.jpe?g$/i, '.png'))) continue; // owner's small copy
        const n = f.slice(0, 2);
        const kind = /ръка|шията|китката|носен|ухото/.test(f) ? 'worn' : 'photo';
        const name = `${lat(rel.join(' '))}-${METALS[e.name]}-${n}${kind === 'worn' ? '-noseno' : ''}.jpg`;
        jobs.push({ src: path.join(p, f), out: path.join(OUT, ...rel, e.name, name) });
      }
    } else walk(p, r);
  }
})(ROOT, []);
const todo = jobs.filter((j) => !only || path.relative(OUT, j.out).startsWith(only));
(async () => {
  let done = 0;
  for (const j of todo) {
    if (fs.existsSync(j.out) && fs.statSync(j.out).mtimeMs > fs.statSync(j.src).mtimeMs) { done++; continue; }
    fs.mkdirSync(path.dirname(j.out), { recursive: true });
    await sharp(j.src).rotate().resize(2048, 2048, { fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#fbfbfd' }).jpeg({ quality: 92, chromaSubsampling: '4:4:4', mozjpeg: true }).withMetadata({ icc: 'srgb' }).toFile(j.out);
    done++;
  }
  console.log(`${done} of ${todo.length} copies in ${OUT}`);
})();
