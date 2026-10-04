// Run: node tools/validate-templates.mjs   (from the repository root, before any push of a template or section group).
// Not a theme file: Shopify never reads this folder.
// A local stand-in for Shopify's template validator: every section instance in the templates and section groups is checked
// against the schema of its section file: known type, known setting ids, select values in the options, ranges on their step,
// checkbox booleans, known block types and block settings. Prints only problems.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
const REPO = fileURLToPath(new URL('../', import.meta.url));
const HEADER = /^\s*\/\*[\s\S]*?\*\/\s*/;
const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n').replace(HEADER, ''));
const schemas = {};
for (const f of fs.readdirSync(REPO + 'sections').filter((x) => x.endsWith('.liquid'))) {
  const m = fs.readFileSync(REPO + 'sections/' + f, 'utf8').match(/\{% schema %\}([\s\S]*?)\{% endschema %\}/);
  if (m) { try { schemas[f.replace('.liquid', '')] = JSON.parse(m[1]); } catch (e) { console.log('BAD SCHEMA JSON', f); } }
}
const problems = [];
function checkSettings(where, defs, values) {
  const byId = Object.fromEntries((defs || []).filter((d) => d.id).map((d) => [d.id, d]));
  for (const [k, v] of Object.entries(values || {})) {
    const d = byId[k];
    if (!d) { problems.push(where + ': unknown setting "' + k + '"'); continue; }
    if (d.type === 'select' || d.type === 'radio') {
      if (!d.options.some((o) => o.value === v)) problems.push(where + ': "' + k + '" = ' + JSON.stringify(v) + ' is not an option (' + d.options.map((o) => o.value).join(', ') + ')');
    } else if (d.type === 'range') {
      if (typeof v !== 'number' || v < d.min || v > d.max || ((v - d.min) % (d.step || 1) !== 0)) problems.push(where + ': "' + k + '" = ' + v + ' is outside ' + d.min + '..' + d.max + ' step ' + (d.step || 1));
    } else if (d.type === 'checkbox') {
      if (typeof v !== 'boolean') problems.push(where + ': "' + k + '" must be a boolean');
    }
  }
}
function checkSection(where, inst) {
  const s = schemas[inst.type];
  if (!s) { problems.push(where + ': unknown section type "' + inst.type + '"'); return; }
  checkSettings(where, s.settings, inst.settings);
  const order = inst.block_order || [];
  for (const [bk, b] of Object.entries(inst.blocks || {})) {
    const bd = (s.blocks || []).find((x) => x.type === b.type);
    if (!bd && b.type[0] !== '@') { problems.push(where + ' / block ' + bk + ': unknown block type "' + b.type + '"'); continue; }
    if (bd) checkSettings(where + ' / block ' + bk, bd.settings, b.settings);
    if (!order.includes(bk)) problems.push(where + ' / block ' + bk + ': not in block_order');
  }
  for (const k of order) if (!(inst.blocks || {})[k]) problems.push(where + ': block_order names missing block ' + k);
}
const files = [];
for (const f of fs.readdirSync(REPO + 'templates').filter((x) => x.endsWith('.json'))) files.push('templates/' + f);
for (const f of fs.readdirSync(REPO + 'sections').filter((x) => x.endsWith('-group.json'))) files.push('sections/' + f);
let n = 0;
for (const rel of files) {
  const j = readJson(REPO + rel);
  for (const [k, inst] of Object.entries(j.sections || {})) { checkSection(rel + ' / ' + k, inst); n++; }
}
console.log('checked', n, 'section instances in', files.length, 'files;', problems.length, 'problems');
for (const p of problems) console.log(' -', p);
