// Cullinan marketing emails for Shopify Messaging ("Code your own"), same look as the order emails (cj-brand v2):
// one white 560px card on #F5F3EF, logo, gold line, black square buttons, blush footer inside the card.
// Output: docs/email/newsletter/<name>.html (readable) and tools/out/newsletter.json (one line each, for typing
// into the Messaging code editor, which auto-indents new lines). Shopify Messaging needs {{ unsubscribe_link }} and
// {{ open_tracking_block }}; the visible link uses {{ unsubscribe_url }} so it can read „Отпишете се“.
// Facts only from CLAUDE.md "Facts the site may state"; no prices (most products have none yet), no delivery times.
// Run: node tools/newsletter-emails.mjs
import { writeFileSync, mkdirSync } from 'node:fs';

const F = "font-family:'Jost','Helvetica Neue',Helvetica,Arial,sans-serif;";
const INK = '#2A1E1A', MUTE = '#7A6A64', GOLD = '#9A7A45', BODY = '#4A3C37', LINE = '#EADFD8';
const IG = 'https://www.instagram.com/cullinan_jewellery.bg/';
const FB = 'https://www.facebook.com/profile.php?id=61573474292352';
const CDN = 'https://cdn.shopify.com/s/files/1/1071/8553/7364/files/';
const img = (file, w) => `${CDN}${file}?width=${w}`;
const product = (handle) => `{{ shop.url }}/products/${encodeURI(handle)}`;
const collection = (handle) => `{{ shop.url }}/collections/${encodeURI(handle)}`;

const P = {
  dantela: { t: 'Дантела', k: 'Гривна', h: 'dantela-grivna', i: '20-azhurna-grivna-zhalto-01.jpg' },
  sofia: { t: 'София', k: 'Кръст', h: 'кръст-две-лица', i: '07-dvustranen-krast-zhalto-01.jpg' },
  lunaV: { t: 'Луна', k: 'Висулка', h: 'luna-visulka', i: '14-komplekt-s-perla-visulka-zhalto-01.jpg' },
  lunaO: { t: 'Луна', k: 'Обеци', h: 'luna-obetsi', i: '14-komplekt-s-perla-obetsi-zhalto-01.jpg' },
  lunaP: { t: 'Луна', k: 'Пръстен', h: 'luna-prasten', i: '14-komplekt-s-perla-prasten-zhalto-01.jpg' },
  zvezdaV: { t: 'Коледна звезда', k: 'Висулка', h: 'koledna-zvezda-visulka', i: '25-komplekt-tsvete-visulka-byal-kamak-zhalto-01.jpg' },
  zvezdaO: { t: 'Коледна звезда', k: 'Обеци', h: 'koledna-zvezda-obetsi', i: '25-komplekt-tsvete-obetsi-byal-kamak-zhalto-01.jpg' },
  sazvezdie: { t: 'Съзвездие', k: 'Пръстен', h: 'sazvezdie-prasten', i: '11-prasten-s-kamak-v-sredata-zhalto-01.jpg' },
  bliznatsi: { t: 'Близнаци', k: 'Висулка', h: 'близнаци-ажурен', i: '12-zodii-bliznatsi-azhuren-zhalto-01.jpg' },
  orbita: { t: 'Орбита', k: 'Висулка', h: 'orbita-visulka', i: '21-komplekt-s-kragove-visulka-zhalto-byalo-01.jpg' },
};

const shell = (preheader, inner) => `<!DOCTYPE html>
<html lang="bg">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap" rel="stylesheet">
<style>
body { margin: 0; padding: 0; background: #F5F3EF; }
a { color: ${INK}; }
@media (max-width: 520px) {
  .cj-pad { padding-left: 22px !important; padding-right: 22px !important; }
  .cj-col { display: block !important; width: 100% !important; max-width: 100% !important; padding: 0 0 22px !important; }
  .cj-title { font-size: 24px !important; }
}
</style>
</head>
<body style="margin:0;padding:0;background:#F5F3EF;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${preheader}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F5F3EF;border-collapse:collapse;">
<tr><td align="center" style="padding:28px 10px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#FFFFFF;border-collapse:collapse;">
<tr><td align="center" class="cj-pad" style="padding:36px 40px 26px;"><a href="{{ shop.url }}"><img src="{{ shop.email_logo_url }}" alt="{{ shop.name }}" width="170" style="display:block;border:0;max-width:100%;height:auto;"></a></td></tr>
<tr><td class="cj-pad" style="padding:0 40px;"><div style="height:1px;line-height:1px;font-size:1px;background:#D6C3A1;">&nbsp;</div></td></tr>
${inner}
<tr><td style="height:36px;line-height:36px;font-size:1px;">&nbsp;</td></tr>
<tr><td align="center" bgcolor="#E3CAC2" class="cj-pad" style="background:#E3CAC2;padding:26px 40px 28px;${F}color:${INK};">
<p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:${INK};">Ръчна изработка от 1991</p>
<p style="margin:8px 0 0;font-size:13px;color:#5A4A44;">Ателие във Велико Търново</p>
<p style="margin:14px 0 0;font-size:12px;letter-spacing:0.12em;"><a href="${IG}" style="color:${INK};text-decoration:none;">INSTAGRAM</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="${FB}" style="color:${INK};text-decoration:none;">FACEBOOK</a></p>
<p style="margin:18px 0 0;font-size:12px;line-height:1.6;color:#5A4A44;">Получавате този имейл, защото сте се абонирали за новините на {{ shop.name }}.<br><a href="{{ unsubscribe_url }}" style="color:#5A4A44;">Отпишете се</a></p>
<div style="display:none;max-height:0;overflow:hidden;">{{ unsubscribe_link }}</div>
</td></tr>
</table>
</td></tr>
</table>
{{ open_tracking_block }}
</body>
</html>`;

const hero = ({ label, title, intro, button }) => `
<tr><td align="center" class="cj-pad" style="padding:34px 40px 8px;${F}">
${label ? `<p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${GOLD};">${label}</p>` : ''}
<h1 class="cj-title" style="margin:${label ? '12px' : '0'} 0 0;font-size:28px;line-height:1.25;font-weight:500;color:${INK};${F}">${title}</h1>
${intro ? `<p style="margin:14px auto 0;max-width:420px;font-size:15px;line-height:1.65;color:${BODY};">${intro}</p>` : ''}
${button || ''}
</td></tr>`;

const button = (url, text, top = 26) => `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:${top}px auto 6px;border-collapse:collapse;"><tr><td align="center" bgcolor="#000000" style="background:#000000;"><a href="${url}" style="display:inline-block;padding:15px 34px;${F}font-size:13px;letter-spacing:0.16em;text-transform:uppercase;color:#FFFFFF;text-decoration:none;">${text}</a></td></tr></table>`;

const bigImage = (p, top = 28) => `
<tr><td class="cj-pad" style="padding:${top}px 40px 0;"><a href="${product(p.h)}"><img src="${img(p.i, 960)}" alt="${p.k} ${p.t}" width="480" style="display:block;width:100%;max-width:480px;height:auto;border:0;margin:0 auto;background:#FCFBFC;"></a></td></tr>`;

// Product tiles, two or three to a row; stacked on phones.
const tiles = (list, per = 2, label = 'Вижте') => {
  const w = per === 3 ? 31 : 47.5;
  const cells = list.map((p, n) => `<div class="cj-col" style="display:inline-block;width:${w}%;vertical-align:top;${(n % per) !== per - 1 ? 'padding-right:2.5%;' : ''}padding-bottom:22px;">
<a href="${p.url || product(p.h)}"><img src="${img(p.i, 560)}" alt="${p.k} ${p.t}" width="230" style="display:block;width:100%;height:auto;border:1px solid ${LINE};background:#FCFBFC;"></a>
<p style="margin:12px 0 0;${F}font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${MUTE};">${p.k}</p>
<p style="margin:4px 0 0;${F}font-size:16px;font-weight:500;color:${INK};">${p.t}</p>
<p style="margin:8px 0 0;${F}font-size:12px;letter-spacing:0.14em;text-transform:uppercase;"><a href="${p.url || product(p.h)}" style="color:${INK};">${label}</a></p>
</div>`).join('');
  return `
<tr><td class="cj-pad" style="padding:30px 40px 0;font-size:0;">${cells}</td></tr>`;
};

const text = (html, top = 26, align = 'center') => `
<tr><td align="${align}" class="cj-pad" style="padding:${top}px 40px 0;${F}font-size:15px;line-height:1.7;color:${BODY};">${html}</td></tr>`;

const sectionTitle = (t, top = 34) => `
<tr><td align="center" class="cj-pad" style="padding:${top}px 40px 0;${F}"><p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:${INK};">${t}</p></td></tr>`;

// Three short facts in a grey band.
const facts = (rows) => `
<tr><td class="cj-pad" style="padding:30px 40px 0;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;background:#F5F3EF;"><tr><td style="padding:22px 24px;${F}">${rows.map((r, n) => `<p style="margin:${n ? '14px' : '0'} 0 0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:${INK};">${r[0]}</p><p style="margin:4px 0 0;font-size:14px;line-height:1.6;color:${BODY};">${r[1]}</p>`).join('')}</td></tr></table></td></tr>`;

const hi = '{% if customer.first_name != blank %}Здравейте, {{ customer.first_name }}{% else %}Здравейте{% endif %}';

const E = {};

E.welcome = {
  name: 'Добре дошли (автоматично, след абонамент)',
  subject: 'Добре дошли в {{ shop.name }}',
  preview: 'Бижута, изработени на ръка във Велико Търново от 1991 година.',
  html: shell('Бижута, изработени на ръка във Велико Търново от 1991 година.',
    hero({ label: 'Добре дошли', title: `${hi}`, intro: 'Благодарим ви, че се абонирахте. От 1991 година създаваме бижута в нашето ателие във Велико Търново: всяко започва като наш собствен 3D модел и се довършва на ръка.' })
    + sectionTitle('Разгледайте')
    + tiles([
      { ...P.sazvezdie, k: 'Колекция', t: 'Пръстени', url: collection('пръстени') },
      { ...P.lunaV, k: 'Колекция', t: 'Висулки', url: collection('висулки') },
      { ...P.zvezdaO, k: 'Колекция', t: 'Обеци', url: collection('обеци') },
    ], 3, 'Разгледайте')
    + facts([
      ['Злато и сребро', 'Злато 14 и 18 карата и сребро 925. Всяко бижу носи своята проба.'],
      ['С индивидуален сертификат', 'Всяко бижу пристига в кутия, с индивидуален сертификат.'],
      ['Направено за вас', 'По желание гравираме име, дата или послание. Избран модел може да бъде изработен с друг камък, метал или размер.'],
    ])
    + `
<tr><td align="center" class="cj-pad" style="padding:6px 40px 0;">${button('{{ shop.url }}', 'Към магазина', 30)}</td></tr>`),
};

E.new_jewellery = {
  name: 'Ново бижу: Луна',
  subject: 'Ново от ателието: Луна',
  preview: 'Висулка, обеци и пръстен, които се носят заедно или поотделно.',
  html: shell('Висулка, обеци и пръстен, които се носят заедно или поотделно.',
    hero({ label: 'Ново от ателието', title: 'Луна', intro: 'Висулка, обеци и пръстен, които се носят заедно или поотделно. Злато 14 карата, в жълто, бяло или розово.' })
    + bigImage(P.lunaV)
    + `
<tr><td align="center" class="cj-pad" style="padding:0 40px;">${button(product(P.lunaV.h), 'Вижте висулката', 28)}</td></tr>`
    + sectionTitle('От същата линия')
    + tiles([P.lunaO, P.lunaP], 2, 'Вижте бижуто')
    + text('Всяко бижу се изработва на ръка в нашето ателие и пристига в кутия, с индивидуален сертификат.', 4)),
};

E.gifts_christmas = {
  name: 'Подаръци за Коледа',
  subject: 'Идеи за коледен подарък',
  preview: 'Бижута, изработени на ръка, в кутия и със сертификат.',
  html: shell('Бижута, изработени на ръка, в кутия и със сертификат.',
    hero({ label: 'Коледа', title: 'Подарък, който остава', intro: 'Избрахме няколко бижута от нашето ателие за хората, които обичате. Всяко пристига в кутия, с индивидуален сертификат.' })
    + tiles([P.zvezdaV, P.zvezdaO, P.sofia, P.dantela, P.orbita, P.bliznatsi], 2, 'Вижте бижуто')
    + facts([
      ['С лично послание', 'По желание гравираме име, дата или послание.'],
      ['Във вашия вариант', 'Избран модел може да бъде изработен с друг камък, метал или размер. Пишете ни и ще ви помогнем.'],
    ])
    + `
<tr><td align="center" class="cj-pad" style="padding:6px 40px 0;">${button('{{ shop.url }}', 'Към магазина', 30)}</td></tr>`),
};

// Automation: abandoned checkout. Shopify Messaging fills the checkout link; see the changelog for the variable used.
E.abandoned_checkout = {
  name: 'Забравена количка (автоматично)',
  subject: 'Бижутата ви още ви чакат',
  preview: 'Запазихме избраното от вас.',
  html: null, // built in the automation's own editor (it needs the checkout's products and link)
};

E.thank_you = {
  name: 'Благодарим (автоматично, след покупка)',
  subject: 'Благодарим ви, че избрахте {{ shop.name }}',
  preview: 'Как да пазите бижуто си красиво.',
  html: shell('Как да пазите бижуто си красиво.',
    hero({ label: 'Благодарим ви', title: `${hi}`, intro: 'Радваме се, че избрахте бижу от нашето ателие. Надяваме се да ви носи радост дълги години.' })
    + facts([
      ['Почистване и ремонт', 'Ателието почиства и ремонтира бижутата, които сте купили от нас. Пишете ни, когато имате нужда.'],
      ['Въпроси', 'Просто отговорете на този имейл. Ще ви отговорим лично.'],
    ])
    + sectionTitle('Може да ви хареса')
    + tiles([P.sofia, P.dantela], 2, 'Вижте бижуто')),
};

mkdirSync('docs/email/newsletter', { recursive: true });
const out = {};
for (const [k, e] of Object.entries(E)) {
  if (!e.html) continue;
  writeFileSync(`docs/email/newsletter/${k.replace(/_/g, '-')}.html`, e.html);
  // one line: the Messaging editor auto-indents typed new lines
  out[k] = { ...e, html: e.html.replace(/\n\s*/g, '') };
  console.log(k, out[k].html.length);
}
writeFileSync('tools/out/newsletter.json', JSON.stringify(out));
