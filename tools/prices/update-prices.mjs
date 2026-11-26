#!/usr/bin/env node
// Prices by weight (owner, 2026-11-26).
//
// Every variant's price = weight in grams x the euro-per-gram rate for its metal and weight band, rounded UP to the
// whole euro (owner's choice of 2026-11-18). Rates live in tools/prices/rates.csv, weights in tools/prices/weights.csv;
// the owner edits either file (Excel opens them) and runs this script.
//
//   node tools/prices/update-prices.mjs           shows every change, writes tools/prices/preview.csv, changes nothing
//   node tools/prices/update-prices.mjs --apply   writes the new prices (and any missing weights) to Shopify
//
// Weights: a weight already entered in Shopify (custom.weight_g on the variant, else on the product) is the 14K gold
// weight and is never changed (owner, 2026-11-26: "if i add the weight of the jewelry it is on gold and don't change
// that"). Missing weights come from weights.csv (old site studio-cullinan.com, item number) and, with --apply, are
// written to the variant's custom.weight_g so the product page shows them ("if it is missing add it").
// Silver variants are priced on the GOLD weight with the silver rates (owner, 2026-11-26: "i don't want for the silver
// the weight ... make the price through the weight of the gold"); no weight is written to a silver variant.
// A variant with no known weight keeps its price.
//
// Needs Shopify CLI, signed in once with:
//   shopify store auth --store 2fp38p-az.myshopify.com --scopes read_products,write_products

import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const STORE = '2fp38p-az.myshopify.com';
const HERE = dirname(fileURLToPath(import.meta.url));
const APPLY = process.argv.includes('--apply');
const TMP = mkdtempSync(join(tmpdir(), 'cj-prices-'));

// ---------- CSV (semicolon or comma separated, BOM tolerated, decimal comma or point) ----------
function readCsv(file) {
  const text = readFileSync(file, 'utf8').replace(/^﻿/, '');
  const lines = text.split(/\r?\n/).filter((l) => l.trim() && !l.trim().startsWith('#'));
  const sep = (lines[0].match(/;/g) || []).length >= (lines[0].match(/,/g) || []).length ? ';' : ',';
  const split = (l) => {
    const out = []; let cur = ''; let q = false;
    for (const ch of l) {
      if (ch === '"') q = !q;
      else if (ch === sep && !q) { out.push(cur.trim()); cur = ''; }
      else cur += ch;
    }
    out.push(cur.trim());
    return out;
  };
  const head = split(lines[0]);
  return lines.slice(1).map((l) => Object.fromEntries(split(l).map((v, i) => [head[i], v])));
}
const num = (v) => {
  if (v == null) return null;
  const n = parseFloat(String(v).replace(',', '.').replace(/[^\d.]/g, ''));
  return Number.isFinite(n) ? n : null;
};

// ---------- rates ----------
// rates.csv columns: метал;от (г);до (г);евро на грам   (both limits included; first matching row wins)
const rates = readCsv(join(HERE, 'rates.csv')).map((r) => ({
  metal: (r['метал'] || '').toLowerCase().includes('сребро') ? 'silver' : 'gold',
  from: num(r['от (г)']) ?? 0,
  to: num(r['до (г)']) ?? Infinity,
  perGram: num(r['евро на грам']),
}));
function priceFor(metal, grams) {
  const w = Math.round(grams * 100) / 100;
  const rate = rates.find((r) => r.metal === metal && w >= r.from && w <= r.to);
  if (!rate || !rate.perGram) return null;
  return Math.ceil(Math.round(w * rate.perGram * 100) / 100);
}

// ---------- weights.csv ----------
// columns: бижу;вариант;артикул;злато 14K (г);откъде   (14K gold weights only; silver is priced on them)
const table = readCsv(join(HERE, 'weights.csv'));
const norm = (s) => String(s || '').toLowerCase().replace(/[‐-―-]/g, '-').replace(/\s+/g, ' ').trim();
function tableWeight(product, variant) {
  const col = 'злато 14K (г)';
  const values = variant.selectedOptions.map((o) => o.value.toLowerCase());
  const rows = table.filter((r) => norm(r['бижу']) === norm(product.title));
  const exact = rows.find((r) => r['вариант'] && values.includes(r['вариант'].toLowerCase()));
  const general = rows.find((r) => !r['вариант']);
  return num((exact && exact[col]) || (general && general[col]));
}

// ---------- Shopify ----------
function shopify(queryFile, variables, mutate) {
  const varFile = join(TMP, 'vars.json');
  writeFileSync(varFile, JSON.stringify(variables));
  const args = ['store', 'execute', '--store', STORE, '--query-file', join(HERE, queryFile), '--variable-file', varFile, '--json', '--no-input'];
  if (mutate) args.push('--allow-mutations');
  const win = process.platform === 'win32';
  const out = execFileSync('shopify', win ? args.map((a) => (/\s/.test(a) ? `"${a}"` : a)) : args, { encoding: 'utf8', shell: process.platform === 'win32', maxBuffer: 64 * 1024 * 1024 });
  const json = JSON.parse(out.slice(out.indexOf('{')));
  return json.data ?? json;
}

function metalOf(variant) {
  const text = variant.selectedOptions.map((o) => o.value).join(' ').toLowerCase();
  if (text.includes('18к') || text.includes('18k')) return null; // 18K is not sold online (owner, 2026-11-26)
  if (text.includes('сребро') || text.includes('silver')) return 'silver';
  if (text.includes('злато') || text.includes('gold')) return 'gold';
  return null;
}

const products = [];
let cursor = null;
do {
  const d = shopify('price-data.graphql', { cursor }, false);
  products.push(...d.products.nodes);
  cursor = d.products.pageInfo.hasNextPage ? d.products.pageInfo.endCursor : null;
} while (cursor);

const rows = [['бижу', 'вариант', 'метал', 'тегло (г)', 'откъде е теглото', 'цена сега', 'нова цена', 'промяна']];
const missing = [];
const plan = [];
const single = (x) => (/^\s*\d+(?:[.,]\d+)?\s*(?:г|гр|g)?\.?\s*$/i.test(x || '') ? num(x) : null);
// The options that are not the metal (size, stone…), so a silver variant finds the gold variant of the same size.
const sizeKey = (v) => v.selectedOptions.map((o) => o.value.toLowerCase()).filter((x) => !/злато|сребро|gold|silver/.test(x)).join('|');
for (const p of products) {
  const updates = [];
  const goldBySize = new Map();
  const ordered = [...p.variants.nodes].sort((a, b) => (metalOf(a) === 'gold' ? 0 : 1) - (metalOf(b) === 'gold' ? 0 : 1));
  for (const v of ordered) {
    const metal = metalOf(v);
    if (!metal) continue;
    const label = v.selectedOptions.map((o) => o.value).join(' / ');
    let grams = null; let source = '';
    if (metal === 'gold') {
      // Only a single number counts („0,85 / 1,05“ on a product with two sizes falls through to weights.csv).
      const own = single(v.weight?.value) ?? single(p.weight?.value);
      if (own) { grams = own; source = 'Shopify'; }
      if (grams == null) { grams = tableWeight(p, v, 'gold'); source = grams ? 'weights.csv' : ''; }
      if (grams != null && !goldBySize.has(sizeKey(v))) goldBySize.set(sizeKey(v), grams);
    } else {
      grams = goldBySize.get(sizeKey(v)) ?? tableWeight(p, v, 'gold') ?? [...goldBySize.values()][0] ?? null;
      source = grams ? 'тегло на златото' : '';
    }
    if (grams == null) { missing.push(`${p.title} — ${label}`); continue; }
    const price = priceFor(metal, grams);
    if (price == null) { missing.push(`${p.title} — ${label} (no rate for ${grams} g)`); continue; }
    const now = Math.round(parseFloat(v.price));
    rows.push([p.title, label, metal === 'gold' ? '14K злато' : 'сребро', String(grams).replace('.', ','), source, now, price, now === price ? '' : 'да']);
    const u = { id: v.id };
    if (now !== price) u.price = String(price);
    if (metal === 'gold' && !v.weight?.value && source === 'weights.csv') {
      u.metafields = [{ namespace: 'custom', key: 'weight_g', type: 'single_line_text_field', value: String(grams).replace('.', ',') }];
    }
    if (u.price || u.metafields) updates.push(u);
  }
  if (updates.length) plan.push({ productId: p.id, title: p.title, variants: updates });
}

const csv = rows.map((r) => r.map((c) => (/[;"\n]/.test(String(c)) ? `"${String(c).replace(/"/g, '""')}"` : c)).join(';')).join('\r\n');
writeFileSync(join(HERE, 'preview.csv'), '﻿' + csv);
const priceChanges = plan.reduce((a, p) => a + p.variants.filter((v) => v.price).length, 0);
const weightAdds = plan.reduce((a, p) => a + p.variants.filter((v) => v.metafields).length, 0);
console.log(`${products.length} products; ${priceChanges} prices to change, ${weightAdds} missing weights to add; ${missing.length} variants with no weight (price kept).`);
console.log('Every variant with its old and new price: tools/prices/preview.csv');
if (missing.length) console.log('No weight yet:\n  ' + [...new Set(missing.map((m) => m.split(' — ')[0]))].join('\n  '));
const unused = table.filter((r) => !products.some((p) => norm(p.title) === norm(r['бижу'])));
if (unused.length) console.log('Rows in weights.csv that match no product title (check the spelling):\n  ' + unused.map((r) => r['бижу']).join('\n  '));

if (!APPLY) {
  console.log('\nNothing changed. Run again with --apply to write these prices to Shopify.');
} else {
  let errors = 0;
  for (const p of plan) {
    const d = shopify('set-prices.graphql', { productId: p.productId, variants: p.variants }, true);
    const errs = d.productVariantsBulkUpdate?.userErrors || [];
    if (errs.length) { errors++; console.log(`  ${p.title}: ${errs.map((e) => e.message).join('; ')}`); }
  }
  console.log(errors ? `Done with errors on ${errors} products (see above).` : `Done: ${plan.length} products updated.`);
}
