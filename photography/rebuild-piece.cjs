/*
  rebuild-piece.cjs — rebuilds one finished photo of a piece in all metals from its AI original, with the shop's one
  gold standard (owner, 2026-11-17: "use the photos that the ai made", the same gold, polish and background on every
  picture, sizes as chosen, nothing coloured outside the jewellery). Ring A was done by hand first; this is that recipe.

  1. Find the source and crop:  node find-source.cjs <finished yellow.png> <candidates…>  (score under ~0.15).
  2. node rebuild-piece.cjs <piece dir> "<photo name>" <source.png> <left,top,side> <studio|worn> <work dir> [options]
     photo name = the finished file's name without " - жълто злато.png", e.g. "01 основна снимка".
     studio: gold-standard.cjs yellow/rose/white on the source → bg-soft.cjs → the same crop as the current photo.
     worn:   the metal's outline comes from the current yellow and white photos (they line up; only the metal differs),
             or --mask-white <AI white version of the same source>; yellow is turned in hue (--turn, default measured
             so the gold sits at ring A's approved hand angle), rose and white keep the scene's light (--keep-light).
     Options: --keep-red (red stones, red cord)  --stone x0,y0,x1,y1 (fractions of the SOURCE, repeatable; coloured stones, pearls, enamel, red cord)
              --grow px (worn: grow the outline into the metal's hue, default 24 at 4K; 0 off)  --hue-lo deg
              --turn deg (worn yellow; overrides the measured turn)   --erode px (worn mask, default 3 at 4K)
              --metals yellow,rose,white (default all three)
              --outline shapes.json (worn; the owner's point 2, 2026-11-18: the metal drawn by hand, free): shapes in the
                finished photo's 2048 × 2048 frame, {"keep":[…], "zone":[…], "cut":[…]}; a shape is
                {"circle":[cx,cy,r]}, {"box":[x0,y0,x1,y1]}, {"poly":[[x,y],…]} (filled) or {"line":[[x,y],…],"w":px}
                (a chain or band, drawn with that width). keep = always metal; zone = metal only inside (the automatic
                outline and its growth are clipped to it); cut = never metal (skin, pearl, fabric). Without a white
                photo of the shot the outline is keep only.
  3. Writes <work>/<photo> - <metal>.png (2048²) and <work>/<photo> - сравнение.jpg (old above, new below, with a zoom).
     Nothing in the piece folder is changed. Check by eye and with check-photo.cjs, then:
  4. node rebuild-piece.cjs --save <piece dir> "<photo name>" <work dir>
     keeps the old files in чернови/преди злато F 2026-11-17/<metal>/ and writes the new ones (silver = white).
*/
const path = require('path'); const fs = require('fs'); const { execFileSync } = require('child_process'); const sharp = require('sharp');
const HERE = __dirname;
const METAL_DIR = { yellow: 'жълто злато', rose: 'розово злато', white: 'бяло злато', silver: 'сребро' };
const NAME = { yellow: 'жълто злато', rose: 'розово злато', white: 'бяло злато', silver: 'сребро' };
const run = (script, a) => execFileSync(process.execPath, [path.join(HERE, script), ...a], { stdio: 'pipe' }).toString();
const file = (dir, photo, m) => path.join(dir, METAL_DIR[m], `${photo} - ${NAME[m]}.png`);
const BACKUP = 'преди злато F 2026-11-17';

async function save(dir, photo, work) {
  for (const m of ['yellow', 'rose', 'white', 'silver']) {
    const src = path.join(work, `${photo} - ${m === 'silver' ? 'white' : m}.png`);
    if (!fs.existsSync(src)) continue;
    const dst = file(dir, photo, m);
    if (fs.existsSync(dst)) {
      const b = path.join(dir, 'чернови', BACKUP, METAL_DIR[m]);
      fs.mkdirSync(b, { recursive: true });
      const bf = path.join(b, path.basename(dst));
      if (!fs.existsSync(bf)) fs.copyFileSync(dst, bf);
    } else fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    console.log('saved', dst);
  }
}

// a crop past the source's edge: studio photos are padded with the paper colour (copying the edge made streaks and a
// faint rectangle on the zodiac coins, 2026-11-17); worn photos copy the edge as before
async function crop(src, out, [l, t, side], studio) {
  const m = await sharp(src).metadata();
  let img = sharp(src), L = l, T = t;
  const pad = { left: Math.max(0, -l), top: Math.max(0, -t), right: Math.max(0, l + side - m.width), bottom: Math.max(0, t + side - m.height) };
  if (pad.left || pad.top || pad.right || pad.bottom) { img = sharp(await sharp(src).removeAlpha().extend({ ...pad, ...(studio ? { background: { r: 251, g: 251, b: 253 } } : { extendWith: 'copy' }) }).png().toBuffer()); L += pad.left; T += pad.top; }
  await img.extract({ left: L, top: T, width: side, height: side }).resize(2048, 2048, { kernel: 'lanczos3' }).png().toFile(out);
}

// a mask in the finished photo's frame (w × h, 0/1) placed into the source's frame (W × H), 0–255
async function toSource(m, w, h, [l, t, side], W, H) {
  const placed = await sharp(Buffer.from(m.map((v) => v * 255)), { raw: { width: w, height: h, channels: 1 } }).resize(side, side).png().toBuffer();
  const cl = Math.max(0, -l), ct = Math.max(0, -t);
  const piece = await sharp(placed).extract({ left: cl, top: ct, width: Math.min(side - cl, W - Math.max(0, l)), height: Math.min(side - ct, H - Math.max(0, t)) }).png().toBuffer();
  return sharp({ create: { width: W, height: H, channels: 3, background: '#000' } }).composite([{ input: piece, left: Math.max(0, l), top: Math.max(0, t) }]).extractChannel(0).raw().toBuffer();
}

// hand-drawn shapes (2048 frame) → 0/1 mask of w × h
async function drawShapes(list, w, h) {
  const k = w / 2048, P = (pts) => pts.map(([x, y]) => `${x * k},${y * k}`).join(' ');
  const el = list.map((s) => s.circle ? `<circle cx="${s.circle[0] * k}" cy="${s.circle[1] * k}" r="${s.circle[2] * k}"/>`
    : s.box ? `<rect x="${s.box[0] * k}" y="${s.box[1] * k}" width="${(s.box[2] - s.box[0]) * k}" height="${(s.box[3] - s.box[1]) * k}"/>`
    : s.poly ? `<polygon points="${P(s.poly)}"/>`
    : s.line ? `<polyline points="${P(s.line)}" fill="none" stroke="#fff" stroke-width="${(s.w || 6) * k}" stroke-linecap="round" stroke-linejoin="round"/>` : '').join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#000"/><g fill="#fff">${el}</g></svg>`;
  const r = await sharp(Buffer.from(svg)).extractChannel(0).raw().toBuffer();
  const o = new Uint8Array(w * h); for (let i = 0; i < w * h; i++) o[i] = r[i] > 127 ? 1 : 0; return o;
}

// worn: metal outline in the finished photo's frame (saturation drop yellow → white), placed into the source's frame
async function wornMask(dir, photo, src, [l, t, side], out, erode, maskWhite, grow, hueLo, outline) {
  const meta = await sharp(src).metadata(), W = meta.width, H = meta.height;
  let A, B, w, h;
  if (maskWhite) {
    A = await sharp(src).removeAlpha().raw().toBuffer(); B = await sharp(maskWhite).resize(W, H).removeAlpha().raw().toBuffer(); w = W; h = H;
  } else {
    const yf = file(dir, photo, 'yellow'), wf = file(dir, photo, 'white');
    if (!fs.existsSync(wf) && !outline) throw new Error('no white photo to take the outline from: ' + wf + ' (use --mask-white or --outline)');
    A = await sharp(yf).resize(2048, 2048).removeAlpha().raw().toBuffer(); B = fs.existsSync(wf) ? await sharp(wf).resize(2048, 2048).removeAlpha().raw().toBuffer() : A; w = 2048; h = 2048;
  }
  const N = w * h, sat = (p, i) => Math.max(p[i], p[i + 1], p[i + 2]) - Math.min(p[i], p[i + 1], p[i + 2]);
  let m = new Uint8Array(N);
  for (let i = 0; i < N; i++) m[i] = sat(A, 3 * i) - sat(B, 3 * i) > 22 ? 1 : 0;
  const morph = (a, r, dil) => { let o = a; for (let k = 0; k < r; k++) { const n = new Uint8Array(N); for (let y = 1; y < h - 1; y++) for (let x = 1; x < w - 1; x++) { const i = y * w + x; const v = o[i] + o[i - 1] + o[i + 1] + o[i - w] + o[i + w]; n[i] = dil ? (v > 0 ? 1 : 0) : (v === 5 ? 1 : 0); } o = n; } return o; };
  m = morph(morph(m, 2, 0), 2, 1);
  // keep pieces of at least 120 px at 4K scale
  const minPx = Math.round(120 * (w / 4096) ** 2) + 10;
  const comp = new Int32Array(N).fill(-1), size = [];
  for (let i = 0; i < N; i++) { if (!m[i] || comp[i] >= 0) continue; const id = size.length; let c = 0; const st = [i]; comp[i] = id; while (st.length) { const j = st.pop(); c++; const x = j % w; for (const k of [x > 0 ? j - 1 : -1, x < w - 1 ? j + 1 : -1, j - w, j + w]) { if (k < 0 || k >= N || !m[k] || comp[k] >= 0) continue; comp[k] = id; st.push(k); } } size.push(c); }
  for (let i = 0; i < N; i++) m[i] = comp[i] >= 0 && size[comp[i]] >= minPx ? 1 : 0;
  const r4 = Math.max(1, Math.round(4 * w / 4096));
  m = morph(morph(m, r4, 1), r4, 0);
  const ext = new Uint8Array(N), st = []; for (let x = 0; x < w; x++) st.push(x, (h - 1) * w + x); for (let y = 0; y < h; y++) st.push(y * w, y * w + w - 1);
  while (st.length) { const i = st.pop(); if (ext[i] || m[i]) continue; ext[i] = 1; const x = i % w; if (x > 0) st.push(i - 1); if (x < w - 1) st.push(i + 1); if (i >= w) st.push(i - w); if (i < N - w) st.push(i + w); }
  for (let i = 0; i < N; i++) if (!ext[i]) m[i] = 1;
  m = morph(m, Math.max(1, Math.round(erode * w / 4096)), 0);
  let zoneF = null;
  if (outline) {
    const sh = JSON.parse(fs.readFileSync(outline, 'utf8'));
    const ras = async (list) => list && list.length ? drawShapes(list, w, h) : null;
    const keep = await ras(sh.keep), zone = await ras(sh.zone), cut = await ras(sh.cut);
    for (let i = 0; i < N; i++) { if (zone && !zone[i]) m[i] = 0; if (keep && keep[i]) m[i] = 1; if (cut && cut[i]) m[i] = 0; }
    zoneF = zone || keep; // growth stays inside what was drawn
    if (cut) for (let i = 0; i < N; i++) if (cut[i]) zoneF[i] = 0;
  }
  const buf = Buffer.from(m.map((v) => v * 255));
  let mask = sharp(buf, { raw: { width: w, height: h, channels: 1 } });
  if (maskWhite) { await mask.blur(1.5).png().toFile(out); return; }
  // from the finished frame back into the source's frame
  const full = await toSource(m, w, h, [l, t, side], W, H);
  const sm = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) sm[i] = full[i] > 127 ? 1 : 0;
  let zs = null;
  if (zoneF) { const z = await toSource(zoneF, w, h, [l, t, side], W, H); zs = new Uint8Array(W * H); for (let i = 0; i < W * H; i++) zs[i] = z[i] > 127 ? 1 : 0; }
  if (grow > 0) await growMask(src, sm, W, H, Math.round(grow * W / 4096), hueLo, zs);
  await sharp(Buffer.from(sm.map((v) => v * 255)), { raw: { width: W, height: H, channels: 1 } }).blur(1.5).png().toFile(out);
}

// the old white photos missed parts of the metal (the back of a band), so the outline taken from them is grown into
// neighbouring pixels with the metal's own hue (the sure pixels' median minus 8°, never under 20°) and clear colour;
// skin must be clearly redder than the gold (ring B's hand: skin 10–15°, gold 30–38°). --grow 0 turns it off.
async function growMask(src, m, W, H, steps, hueLoArg, zone) {
  const d = await sharp(src).removeAlpha().raw().toBuffer();
  const hue = (i) => { const r = d[3 * i], g = d[3 * i + 1], b = d[3 * i + 2], mx = Math.max(r, g, b), mn = Math.min(r, g, b), q = mx - mn; if (!q) return 0; let h = mx === r ? ((g - b) / q) % 6 : mx === g ? (b - r) / q + 2 : (r - g) / q + 4; return (h * 60 + 360) % 360; };
  const hs = []; for (let i = 0; i < W * H; i++) if (m[i]) { const r = d[3 * i], g = d[3 * i + 1], b = d[3 * i + 2]; if (Math.max(r, g, b) - Math.min(r, g, b) > 40) hs.push(hue(i)); }
  hs.sort((a, b) => a - b);
  const lo = hueLoArg !== undefined ? hueLoArg : Math.max(20, (hs[Math.floor(0.5 * hs.length)] || 30) - 8); // the sure pixels' edge holds some skin, so the median, never under 20°
  console.log(`grow: metal hue median ${(hs[Math.floor(0.5 * hs.length)] || 0).toFixed(1)}°, growing into hue ≥ ${lo.toFixed(1)}° for ${steps} px`);
  const ok = (i) => { if (zone && !zone[i]) return false; const r = d[3 * i], g = d[3 * i + 1], b = d[3 * i + 2]; if (Math.max(r, g, b) - Math.min(r, g, b) < 25) return false; const h = hue(i); return h >= lo && h < 75; };
  let front = []; for (let i = 0; i < W * H; i++) if (m[i]) front.push(i);
  for (let k = 0; k < steps && front.length; k++) {
    const next = [];
    for (const i of front) { const x = i % W; for (const j of [x > 0 ? i - 1 : -1, x < W - 1 ? i + 1 : -1, i - W, i + W]) { if (j < 0 || j >= W * H || m[j] || !ok(j)) continue; m[j] = 1; next.push(j); } }
    front = next;
  }
}

async function hueAngle(src, mask) {
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const M = await sharp(mask).resize(info.width, info.height).extractChannel(0).raw().toBuffer();
  let sx = 0, sy = 0;
  for (let i = 0; i < info.width * info.height; i++) { if (M[i] < 250) continue; const r = data[3 * i], g = data[3 * i + 1], b = data[3 * i + 2]; sy += -0.168736 * r - 0.331264 * g + 0.5 * b; sx += 0.5 * r - 0.418688 * g - 0.081312 * b; }
  return (Math.atan2(sy, sx) * 180) / Math.PI;
}

async function sheet(dir, photo, work, metals) {
  const rows = [];
  for (const m of metals) {
    const old = file(dir, photo, m), nu = path.join(work, `${photo} - ${m}.png`);
    const a = fs.existsSync(old) ? await sharp(old).resize(700, 700).toBuffer() : await sharp({ create: { width: 700, height: 700, channels: 3, background: '#ddd' } }).png().toBuffer();
    const b = await sharp(nu).resize(700, 700).toBuffer();
    const za = fs.existsSync(old) ? await sharp(old).resize(2048, 2048).extract({ left: 674, top: 674, width: 700, height: 700 }).toBuffer() : a;
    const zb = await sharp(nu).extract({ left: 674, top: 674, width: 700, height: 700 }).toBuffer();
    rows.push([a, za, b, zb]);
  }
  const W = 4 * 710, H = rows.length * 710;
  const comp = [];
  rows.forEach((r, j) => r.forEach((b, i) => comp.push({ input: b, left: i * 710, top: j * 710 })));
  await sharp({ create: { width: W, height: H, channels: 3, background: '#fff' } }).composite(comp).jpeg({ quality: 88 }).toFile(path.join(work, `${photo} - сравнение.jpg`));
}

(async () => {
  const a = process.argv.slice(2);
  if (a[0] === '--save') return save(a[1], a[2], a[3]);
  const take = (n, many) => { const o = []; for (let i = a.indexOf(n); i >= 0; i = a.indexOf(n)) o.push(a.splice(i, 2)[1]); return many ? o : o[0]; };
  const keepRed = a.includes('--keep-red'); if (keepRed) a.splice(a.indexOf('--keep-red'), 1);
  const stones = take('--stone', true), turnArg = take('--turn'), erode = +(take('--erode') || 3), maskWhite = take('--mask-white'), outline = take('--outline');
  const grow = +(take('--grow') ?? 24), hueLoS = take('--hue-lo'), hueLo = hueLoS === undefined ? undefined : +hueLoS;
  const metals = (take('--metals') || 'yellow,rose,white').split(',');
  const [dir, photo, src, cropS, kind, work] = a;
  if (!work) throw new Error('usage: see the top of the file');
  fs.mkdirSync(work, { recursive: true });
  const cr = cropS.split(',').map(Number);
  const st = [...stones.flatMap((s) => ['--stone', s]), ...(keepRed ? ['--keep-red'] : [])];
  const tmp = (n) => path.join(work, `_${photo}-${n}.png`);
  if (kind === 'studio') {
    for (const m of metals) {
      run('gold-standard.cjs', [src, tmp(m + 'f'), '--metal', m, ...st]);
      run('bg-soft.cjs', [tmp(m + 'f'), tmp(m + 's')]);
      await crop(tmp(m + 's'), path.join(work, `${photo} - ${m}.png`), cr, true);
      fs.unlinkSync(tmp(m + 'f')); fs.unlinkSync(tmp(m + 's'));
    }
  } else {
    const mask = tmp('mask');
    await wornMask(dir, photo, src, cr, mask, erode, maskWhite, grow, hueLo, outline);
    let turn = turnArg;
    if (turn === undefined) { const ang = await hueAngle(src, mask); turn = String(Math.max(-15, Math.min(15, -50.5 - ang)).toFixed(1)); console.log(`metal hue angle ${ang.toFixed(1)}°, yellow turn ${turn}°`); }
    for (const m of metals) {
      const opts = m === 'yellow' ? ['--turn', turn] : ['--keep-light', '--metal', m];
      run('gold-standard.cjs', [src, tmp(m + 'f'), '--only', mask, ...opts, ...st]);
      await crop(tmp(m + 'f'), path.join(work, `${photo} - ${m}.png`), cr);
      fs.unlinkSync(tmp(m + 'f'));
    }
  }
  await sheet(dir, photo, work, metals);
  console.log('done:', work);
})().catch((e) => { console.error(e.message); process.exit(1); });
