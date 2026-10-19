/*
  rhodium-off.cjs — turns white rhodium round the stones into the photo's own yellow gold, for a piece the atelier
  makes without rhodium (owner, 2026-10-19, ring C: "there is no rhodium so use the free edit and remove it").
  Colour only, like metal-swap.cjs: no pixel moves; the stones, the gold, the background and the shadow stay exactly
  as they are.

  For each stone, two ellipses measured by eye on a gridded close-up and drawn back on it to check (finding them
  automatically took the smooth rim as part of the stone, and the colour leaked onto the floor shadow, which is as
  colourless as rhodium): the stone itself, and the outer edge of its white setting (on the end stones of a row this
  includes the visible white side of the cup).
  1. Nothing more than 2.5 px inside the stone's ellipse (fitted to the dark line where the stone meets the setting)
     changes; from there to 5 px outside it, only light pixels (the setting's inner lip), never dark facet lines.
  2. The rhodium is every colourless pixel (red − blue under 12, fading out by 22; gold is 30 and more) inside the
     outer ellipse, reached from the stone's edge without crossing gold. Bright highlights on the rim are included.
     Up to 8 px past the outer ellipse (a drawn ellipse is never exact) only strictly colourless pixels follow (red −
     blue under 6, gone by 10, and not background-bright): the floor next to the ring carries the gold's warm glow
     (red − blue 15–20) and stays as it is.
  2b. The setting's outer bevel, a thin darker grey line a little warm from the gold beside it, changes too.
  3. Each such pixel takes the colour that this photo's own gold has at that brightness (the median gold pixel per
     luminance level, measured on the whole piece), after rhodium's extra brightness is taken off (ring A: white is
     about 13 levels brighter than yellow; highlights stay highlights). Edges blend over about 2 px.

  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node rhodium-off.cjs <in.png> <out.png> --stone cx,cy,a,b,angle --outer cx,cy,a,b,angle [--stone … --outer …]
                         [--hand x0,y0,x1,y1 [--gold-hue 16]] [--debug marked.png]
  --stone, --outer: an ellipse's centre (cx, cy), its semi-axes a (along `angle`, degrees from the x axis, y pointing
           down) and b, all four as fractions of the photo's WIDTH. The n-th --outer belongs to the n-th --stone.
  --hand:  a worn photo; the gold is measured only inside this box (fractions; round the ring), because skin is warm
           like gold: only pixels of gold's hue (--gold-hue, default 24°) and saturation 0.3 and up. The setting reflects the skin, so there everything inside the outer ellipse but the stone changes
           (no colour test, no reaching past the ellipse): measure the outer ellipses tightly.
  --debug: the result with the kept stones (blue) and the changed pixels (red) marked, to check by eye.

  Ring C main photo (2048 px, framed, 2026-10-19): see `pieces/03-ring-c.md`.
*/
const sharp = require('sharp');

const lum = (r, g, b) => 0.3 * r + 0.59 * g + 0.11 * b;
const ramp = (v, a, b) => Math.min(1, Math.max(0, (v - a) / (b - a)));
// ring A's yellow and white, measured on the ring (as in metal-swap.cjs)
const YELLOW_L = lum(208, 165, 113), WHITE_L = lum(188, 184, 184);
// rhodium's brightness back to gold's: the inverse of metal-swap.cjs's lift for white
const f = (255 - WHITE_L) / (255 - YELLOW_L);
const toGoldL = (L) => Math.max(0, 255 - (255 - L) / f);

(async () => {
  const args = process.argv.slice(2);
  const take = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args.splice(i, 2)[1] : null; };
  const stones = [], outers = [];
  for (let s = take('--stone'); s; s = take('--stone')) stones.push(s.split(',').map(Number));
  for (let s = take('--outer'); s; s = take('--outer')) outers.push(s.split(',').map(Number));
  const handS = take('--hand'), debugF = take('--debug'), hueS = take('--gold-hue');
  const GOLD_HUE = hueS ? Number(hueS) : 24;
  const hand = handS ? handS.split(',').map(Number) : null;
  const [src, dst] = args;
  if (!src || !dst || !stones.length || stones.length !== outers.length || [...stones, ...outers].some((s) => s.length !== 5)) {
    throw new Error('usage: node rhodium-off.cjs <in.png> <out.png> --stone cx,cy,a,b,angle --outer cx,cy,a,b,angle [...] [--hand box] [--debug marked.png]');
  }
  const { data, info } = await sharp(src).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const W = info.width, H = info.height, ch = info.channels;

  // the photo's own gold, per luminance level: median r, g, b of clearly gold pixels (red − blue over 45)
  const bins = Array.from({ length: 256 }, () => [[], [], []]);
  const gx0 = hand ? Math.round(hand[0] * W) : 0, gx1 = hand ? Math.round(hand[2] * W) : W;
  const gy0 = hand ? Math.round(hand[1] * H) : 0, gy1 = hand ? Math.round(hand[3] * H) : H;
  for (let y = gy0; y < gy1; y += hand ? 1 : 2) for (let x = gx0; x < gx1; x += hand ? 1 : 2) {
    const p = (y * W + x) * ch, r = data[p], g = data[p + 1], b = data[p + 2];
    if (r - b <= 45) continue;
    // on a hand, gold's hue only, not skin's (measure both first; ring C's warm hand photo: skin 4–12°, beads 16–24°)
    if (hand && (60 * ((g - b) / (r - b)) < GOLD_HUE || (r - b) / r < 0.3)) continue;
    const L = Math.round(lum(r, g, b));
    bins[L][0].push(r); bins[L][1].push(g); bins[L][2].push(b);
  }
  const med = (a) => { a.sort((u, v) => u - v); return a[a.length >> 1]; };
  const lut = new Array(256).fill(null);
  for (let L = 0; L < 256; L++) if (bins[L][0].length >= 8) lut[L] = bins[L].map(med).map((v) => v - L);
  // gaps: the nearest level with enough pixels; above the brightest gold, its colour fades to white at 255
  const known = lut.map((v, L) => (v ? L : -1)).filter((L) => L >= 0);
  if (!known.length) throw new Error('no gold found');
  const top = known[known.length - 1];
  for (let L = 0; L < 256; L++) if (!lut[L]) {
    const n = known.reduce((a, k) => (Math.abs(k - L) < Math.abs(a - L) ? k : a), known[0]);
    const k = L > top ? (255 - L) / Math.max(1, 255 - top) : 1;
    lut[L] = lut[n].map((v) => v * k);
  }

  const weight = new Float32Array(W * H);
  const stoneMark = new Uint8Array(W * H);
  const fits = [];
  // an ellipse (fractions of the width) as a test: is (x, y) inside it, both semi-axes grown by d px (d < 0: shrunk)
  const ellipse = ([ecx, ecy, ea, eb, eang]) => {
    const cx = ecx * W, cy = ecy * W, a = ea * W, b = eb * W, ang = eang * Math.PI / 180;
    const ca = Math.cos(ang), sa = Math.sin(ang);
    const inside = (x, y, d = 0) => { const dx = x - cx, dy = y - cy; const u = dx * ca + dy * sa, v = -dx * sa + dy * ca; return (u / (a + d)) ** 2 + (v / (b + d)) ** 2 <= 1; };
    return { inside, cx, cy, a, b, max: Math.max(a, b) };
  };
  for (let si = 0; si < stones.length; si++) {
    const st = ellipse(stones[si]), ou = ellipse(outers[si]);
    // work area: a square round the outer ellipse
    const rr = Math.ceil(ou.max) + 4;
    const ax0 = Math.max(0, Math.floor(ou.cx - rr)), ax1 = Math.min(W, Math.ceil(ou.cx + rr));
    const ay0 = Math.max(0, Math.floor(ou.cy - rr)), ay1 = Math.min(H, Math.ceil(ou.cy + rr));
    const bw = ax1 - ax0, bh = ay1 - ay0;
    // per pixel: which zone it is in (distances are true pixels along both axes, also on the narrow end stones)
    const C = new Float32Array(bw * bh), Lm = new Float32Array(bw * bh);
    const stone = new Uint8Array(bw * bh), seedZone = new Uint8Array(bw * bh), band = new Uint8Array(bw * bh);
    const inOuter = new Uint8Array(bw * bh), inOuterIn = new Uint8Array(bw * bh), ext = new Float32Array(bw * bh), bevelZone = new Uint8Array(bw * bh);
    for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
      const p = ((y + ay0) * W + x + ax0) * ch, i = y * bw + x, X = x + ax0, Y = y + ay0;
      C[i] = data[p] - data[p + 2]; Lm[i] = lum(data[p], data[p + 1], data[p + 2]);
      stone[i] = st.inside(X, Y, hand ? 1 : -2.5) ? 1 : 0;
      seedZone[i] = !stone[i] && st.inside(X, Y, hand ? 3 : 0.5) ? 1 : 0;
      band[i] = !hand && st.inside(X, Y, 5) ? 1 : 0;
      inOuter[i] = ou.inside(X, Y) ? 1 : 0;
      inOuterIn[i] = ou.inside(X, Y, -1) ? 1 : 0;
      ext[i] = inOuter[i] ? 1 : ou.inside(X, Y, 7) ? 1 : ou.inside(X, Y, 8) ? 0.5 : 0;
      bevelZone[i] = !band[i] && !ou.inside(X, Y, -1) && ext[i] > 0 ? 1 : 0;
    }
    const g = (i) => ((((i / bw) | 0) + ay0) * W + (i % bw) + ax0);
    // the stone, kept: everything 2.5 px inside its ellipse (fitted to the dark line where the stone meets the
    // setting). From there to 5 px outside it, the stone's edge and the setting's inner lip meet and the ellipse is
    // only as exact as the drawing: there, only light pixels change (the lip, white like the rim), never the dark
    // lines of the facets or the girdle (a dark facet turned gold showed as a brown dot, 2026-10-19)
    const bandW = (i) => (band[i] ? ramp(Lm[i], 160, 180) : 1);
    // inside the outer ellipse: colourless (red − blue under 12, gone by 22); up to 8 px past it, strictly colourless
    // and not background-bright only (the floor beside the ring is warm from the gold, red − blue 15–20)
    const outerW = (i) => (inOuter[i] ? 1 : (1 - ramp(C[i], 6, 10)) * (1 - ramp(Lm[i], 238, 243)) * ext[i]);
    // on a hand the white setting reflects the skin (pink, saturation up to about 0.3, like the lit skin beside it),
    // and gold in shadow takes the skin's hue too, so colour cannot tell setting from skin: the measured outer ellipse
    // decides alone. Everything inside it but the stone changes; its edge blends over 1 px; nothing past it.
    // (The setting's shaded wall is as saturated as skin in shadow, so no colour test helps; the stone is kept whole,
    // its ellipse grown by 1 px, because on a small hand photo a band of "light pixels only" turned stone facets orange.)
    const handW = (i) => (inOuterIn[i] ? 1 : inOuter[i] ? 0.6 : 0);
    fits.push({ stone: stones[si], outer: outers[si] });
    // rhodium: colourless, inside the outer ellipse, reached from the stone's edge
    const nw = new Float32Array(bw * bh);
    for (let i = 0; i < bw * bh; i++) {
      if (stone[i]) { stoneMark[g(i)] = 1; continue; }
      if (!ext[i]) continue;
      nw[i] = hand ? handW(i) * bandW(i) : (1 - ramp(C[i], 12, 22)) * outerW(i) * bandW(i);
    }
    const reach = new Uint8Array(bw * bh);
    const q = [];
    for (let i = 0; i < bw * bh; i++) if (seedZone[i] && nw[i] > 0.5) { reach[i] = 1; q.push(i); }
    while (q.length) {
      const j = q.pop(); const x = j % bw, y = (j / bw) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= bw || yy >= bh) continue;
        const k = yy * bw + xx; if (!reach[k] && nw[k] > 0.5) { reach[k] = 1; q.push(k); }
      }
    }
    // soft edge: reached pixels at their own weight; pixels within 2 px of them at a share, if not clearly gold
    const near = new Float32Array(bw * bh);
    for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
      if (!reach[y * bw + x]) continue;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) {
        const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= bw || yy >= bh) continue;
        const k = yy * bw + xx, v = 1 - Math.hypot(dx, dy) / 3; if (v > near[k]) near[k] = v;
      }
    }
    for (let i = 0; i < bw * bh; i++) {
      if (stone[i] || !ext[i]) continue;
      const w = reach[i] ? nw[i] : hand ? 0 : near[i] * (1 - ramp(C[i], 22, 40)) * outerW(i) * bandW(i);
      if (w > weight[g(i)]) weight[g(i)] = w;
    }
    // the setting's outer bevel: a thin grey line on the outer edge, a little warm from the gold beside it (red − blue
    // 15–30), next to the changed rim, up to 8 px past the outer ellipse. Only its darker pixels (luminance under 205) change, fully under
    // 190; the floor next to it is lighter and stays as it is (ring C, 2026-10-19: a silver line was left round
    // each rim)
    const near3 = new Uint8Array(bw * bh);
    for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
      if (!reach[y * bw + x]) continue;
      for (let dy = -3; dy <= 3; dy++) for (let dx = -3; dx <= 3; dx++) {
        const xx = x + dx, yy = y + dy; if (xx >= 0 && yy >= 0 && xx < bw && yy < bh) near3[yy * bw + xx] = 1;
      }
    }
    for (let i = 0; i < bw * bh; i++) {
      if (hand || !near3[i] || !bevelZone[i]) continue;
      const w = (1 - ramp(Lm[i], 190, 205)) * (1 - ramp(C[i], 30, 42));
      if (w > weight[g(i)]) weight[g(i)] = w;
    }
  }

  // gaps of 1–2 px (a light pixel between the rim and its bevel, or between the rim and the gold of the cup, stayed as a
  // silver hairline): a light pixel (not gold, not stone, not a dark facet line) with a changed pixel on one side
  // along a row, column or diagonal, and a changed or gold pixel on the other, changes
  const gapW = new Float32Array(W * H);
  const dirs = [[1, 0], [0, 1], [1, 1], [1, -1]];
  const goldAt = (j) => data[j * ch] - data[j * ch + 2] >= 30;
  for (let y = 2; y < H - 2; y++) for (let x = 2; x < W - 2; x++) {
    const i = y * W + x;
    if (weight[i] >= 0.5 || stoneMark[i]) continue;
    const p = i * ch;
    if (data[p] - data[p + 2] >= 30 || lum(data[p], data[p + 1], data[p + 2]) < 170) continue; // gold, or a dark facet line
    let best = 0;
    for (const [dx, dy] of dirs) {
      const d1 = dx + dy * W;
      const wa = Math.max(weight[i - d1], weight[i - 2 * d1]), wb = Math.max(weight[i + d1], weight[i + 2 * d1]);
      const ga = goldAt(i - d1) || goldAt(i - 2 * d1), gb = goldAt(i + d1) || goldAt(i + 2 * d1);
      if (wa > 0.5 && (wb > 0.5 || gb)) best = Math.max(best, wb > 0.5 ? Math.min(wa, wb) : wa);
      if (wb > 0.5 && ga) best = Math.max(best, wb);
    }
    gapW[i] = best;
  }
  if (!hand) for (let i = 0; i < W * H; i++) if (gapW[i] > weight[i]) weight[i] = gapW[i];

  const out = Buffer.from(data);
  let changed = 0;
  for (let i = 0; i < W * H; i++) {
    const w = weight[i]; if (!w) continue;
    const p = i * ch, r = data[p], gg = data[p + 1], b = data[p + 2];
    // on a hand the brightest gold is almost white, so a large highlight on the setting stayed white: there the colour
    // comes from the gold at luminance 232 at most (a warm cream highlight, like the beads' edges)
    const Lg = toGoldL(lum(r, gg, b)), o = lut[Math.max(0, Math.min(hand ? 232 : 255, Math.round(Lg)))];
    const nr = Lg + o[0], ng = Lg + o[1], nb = Lg + o[2];
    out[p] = Math.max(0, Math.min(255, Math.round(r + w * (nr - r))));
    out[p + 1] = Math.max(0, Math.min(255, Math.round(gg + w * (ng - gg))));
    out[p + 2] = Math.max(0, Math.min(255, Math.round(b + w * (nb - b))));
    if (w > 0.05) changed++;
  }
  await sharp(out, { raw: { width: W, height: H, channels: ch } }).png().toFile(dst);
  if (debugF) {
    const d = Buffer.from(out);
    for (let i = 0; i < W * H; i++) {
      const p = i * ch;
      if (stoneMark[i]) { d[p] = d[p] * 0.6; d[p + 1] = d[p + 1] * 0.6; d[p + 2] = Math.min(255, d[p + 2] * 0.6 + 100); }
      else if (weight[i] > 0.05) { d[p] = Math.min(255, d[p] * 0.5 + 128 * weight[i]); d[p + 1] = d[p + 1] * 0.5; d[p + 2] = d[p + 2] * 0.5; }
    }
    await sharp(d, { raw: { width: W, height: H, channels: ch } }).png().toFile(debugF);
  }
  console.log(JSON.stringify({ src, dst, stones: fits, changedPixels: changed, gold: [100, 150, 200, 230, 245].map((L) => [L, lut[L].map((v) => Math.round(L + v))]) }));
})();
