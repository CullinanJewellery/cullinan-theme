// Fluid sizes (branch fluid-sizes, 2026-11-03, owner: sizes that suit every device instead of fixed px).
// Rewrites fixed px sizes in CSS declarations to rem (px / 10). The root font size is 10px at the reference widths
// (phones about 375px, screens 750-1440px; layout/theme.liquid), so nothing changes there; elsewhere every size follows
// the fluid root. Left alone: 1px and 2px (hairlines and borders), media-query and selector text (breakpoints stay
// px), comments.
// Usage: node tools/px-to-rem.mjs <file.css> [...]   (prints how many values changed per file)
import fs from 'node:fs';

const toRem = (decl) =>
  decl.replace(/(^|[^\w.])(\d*\.?\d+)px\b/g, (m, pre, num) => {
    const v = parseFloat(num);
    if (v < 3) return m;
    const rem = +(v / 10).toFixed(4);
    return `${pre}${rem}rem`;
  });

function convert(src) {
  // comments become placeholders, so a comment inside a selector or media query never splits it
  const comments = [];
  const css = src.replace(/\/\*[\s\S]*?\*\//g, (c) => `\u0000${comments.push(c) - 1}\u0000`);
  const restore = (s) => s.replace(/\u0000(\d+)\u0000/g, (m, n) => comments[n]);
  const r = convertBare(css);
  return { out: restore(r.out), count: r.count };
}

function convertBare(css) {
  let out = '';
  let buf = '';
  let i = 0;
  let count = 0;
  const flushDecl = () => {
    const c = toRem(buf);
    if (c !== buf) count += (buf.match(/\d*\.?\d+px\b/g) || []).length - (c.match(/\d*\.?\d+px\b/g) || []).length;
    out += c;
    buf = '';
  };
  while (i < css.length) {
    const ch = css[i];
    if (ch === '"' || ch === "'") {
      const end = css.indexOf(ch, i + 1);
      const stop = end === -1 ? css.length : end + 1;
      buf += css.slice(i, stop);
      i = stop;
      continue;
    }
    if (ch === '{') {
      out += buf + ch; // selector or at-rule prelude: unchanged
      buf = '';
    } else if (ch === ';' || ch === '}') {
      flushDecl();
      out += ch;
    } else {
      buf += ch;
    }
    i++;
  }
  out += buf;
  return { out, count };
}

for (const f of process.argv.slice(2)) {
  const src = fs.readFileSync(f, 'utf8');
  const { out, count } = convert(src);
  if (out !== src) fs.writeFileSync(f, out);
  console.log(`${count}\t${f}`);
}
