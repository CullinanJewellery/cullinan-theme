/*
  check-photo.cjs — measures a Higgsfield result and says pass or fail with reasons (photography/workflow.md, step 4).
  Numbers only: the stones, their direction and the rhodium are still checked by eye against staging.md and the
  piece sheet.

  Usage (needs sharp: `npm i sharp` in any folder, NODE_PATH pointing at its node_modules):
    node check-photo.cjs <metal yellow|white|rose> <photo.png> [source.png] [--framed standing|lying]

  - metal: checks the metal colour against the targets below.
  - source: for a colour edit, the photo it was made from; the piece's outline must not have moved.
  - --framed: after frame-photo.cjs, checks size and centre against ring A's frame.
  Prints one JSON line (for photography/log/) and PASS or FAIL with reasons.
*/
const sharp = require('sharp');

const TARGET = {
  yellow: { rgb: [208, 165, 114], tol: 8 },
  rose: { rgb: [218, 160, 136], tol: 14 },
};

async function load(file) {
  const { data, info } = await sharp(file).resize(512, 512, { fit: 'fill' }).raw().toBuffer({ resolveWithObject: true });
  return { data, ch: info.channels };
}

function px(img, x, y) {
  const i = (y * 512 + x) * img.ch;
  return [img.data[i], img.data[i + 1], img.data[i + 2]];
}

function metal(img, kind) {
  const s = [0, 0, 0];
  let n = 0;
  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const [r, g, b] = px(img, x, y);
      const take = kind === 'white' ? (r + g + b) / 3 < 200 && Math.max(r, g, b) - Math.min(r, g, b) < 60 : r - b > 45;
      if (take) { s[0] += r; s[1] += g; s[2] += b; n++; }
    }
  }
  return n ? s.map((v) => Math.round(v / n)) : null;
}

function outline(img) {
  let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
  for (let y = 0; y < 512; y++) {
    for (let x = 0; x < 512; x++) {
      const [r, g, b] = px(img, x, y);
      if (Math.max(r, g, b) - Math.min(r, g, b) > 30 || (r + g + b) / 3 < 170) {
        if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      }
    }
  }
  return { x0: x0 / 512, y0: y0 / 512, x1: x1 / 512, y1: y1 / 512, w: (x1 - x0) / 512, h: (y1 - y0) / 512, cx: (x0 + x1) / 1024, cy: (y0 + y1) / 1024 };
}

function background(img, o) {
  // every 12th pixel outside the piece (with a margin) and outside the shadow side (left of and below the piece)
  const m = 0.06;
  const light = [];
  const tint = [];
  const rows = [];
  for (let y = 4; y < 508; y += 12) {
    const row = [];
    for (let x = 4; x < 508; x += 12) {
      const fx = x / 512, fy = y / 512;
      const inPiece = fx > o.x0 - m && fx < o.x1 + m && fy > o.y0 - m && fy < o.y1 + m;
      const inShadow = fx < o.cx && fy > o.cy - 0.1;
      if (inPiece || inShadow) continue;
      const [r, g, b] = px(img, x, y);
      light.push((r + g + b) / 3);
      tint.push(r - b);
      row.push((r + g + b) / 3);
    }
    if (row.length >= 6) rows.push(row.reduce((a, c) => a + c, 0) / row.length);
  }
  // a seam: the average brightness jumps between two neighbouring rows (a real background changes smoothly)
  let step = 0;
  for (let i = 1; i < rows.length; i++) step = Math.max(step, Math.abs(rows[i] - rows[i - 1]));
  light.sort((p, q) => p - q);
  const q = (f) => light[Math.min(light.length - 1, Math.floor(f * light.length))];
  return {
    min: Math.round(q(0.03)),
    max: Math.round(q(0.97)),
    tint: Math.round(tint.reduce((a, c) => a + c, 0) / tint.length),
    step: Number(step.toFixed(1)),
  };
}

(async () => {
  const args = process.argv.slice(2);
  const fi = args.indexOf('--framed');
  const framed = fi >= 0 ? args.splice(fi, 2)[1] : null;
  const [kind, file, source] = args;
  if (!kind || !file) throw new Error('usage: node check-photo.cjs <yellow|white|rose> <photo> [source] [--framed standing|lying]');
  const img = await load(file);
  const fails = [];
  const out = { file, kind };

  const m = metal(img, kind);
  out.metal = m;
  if (!m) fails.push('no metal found');
  else if (kind === 'white') {
    if (m[2] - m[0] < -5) fails.push(`white has a warm cast (blue ${m[2] - m[0]} below red; aim within 5)`);
  } else {
    const t = TARGET[kind];
    const d = m.map((v, i) => v - t.rgb[i]);
    out.metalDiff = d;
    if (d.some((v) => Math.abs(v) > t.tol)) {
      const hint = kind === 'yellow' ? (d[2] > 0 || d[1] > 0 ? 'paler than ring A: deeper, more saturated' : 'too deep/copper: lighter, more yellow') : 'off the rose target';
      fails.push(`${kind} gold ${m.join(',')} vs ${t.rgb.join(',')} (${hint})`);
    }
  }

  const o = outline(img);
  out.outline = o;
  const bg = background(img, o);
  out.background = bg;
  if (bg.min < 245) fails.push(`background too dark or grey at the edges (${bg.min})`);
  if (bg.max - bg.min > 8) fails.push(`background uneven: a patch or band (${bg.min}–${bg.max})`);
  if (bg.step > 2.5) fails.push(`background has a seam or band (a jump of ${bg.step} between neighbouring rows)`);
  if (Math.abs(bg.tint) > 6) fails.push(`background tinted (red−blue ${bg.tint})`);

  if (source) {
    const s = outline(await load(source));
    const moved = Math.max(Math.abs(o.x0 - s.x0), Math.abs(o.y0 - s.y0), Math.abs(o.x1 - s.x1), Math.abs(o.y1 - s.y1));
    out.moved = Number(moved.toFixed(4));
    if (moved > 0.005) fails.push(`the piece changed shape or moved against its source (${moved.toFixed(3)})`);
  }
  if (framed === 'standing') {
    if (Math.abs(o.h - 0.807) > 0.01 || Math.abs(o.cx - 0.5) > 0.005 || Math.abs(o.cy - 0.513) > 0.008) fails.push(`not in the standing frame (h ${o.h.toFixed(3)}, centre ${o.cx.toFixed(3)},${o.cy.toFixed(3)})`);
  } else if (framed === 'lying') {
    if (Math.abs(o.w - 0.78) > 0.01 || Math.abs(o.cx - 0.5) > 0.005) fails.push(`not in the lying frame (w ${o.w.toFixed(3)}, centre ${o.cx.toFixed(3)})`);
  }

  out.verdict = fails.length ? 'fail' : 'pass';
  out.reasons = fails;
  console.log(JSON.stringify(out));
  console.log(fails.length ? 'FAIL\n- ' + fails.join('\n- ') : 'PASS (numbers). Now check by eye: counts, stone direction, rhodium, inside — staging.md and the piece sheet.');
})();
