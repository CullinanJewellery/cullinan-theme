// Cullinan look for Shopify notification emails (Settings -> Notifications).
// Run in the admin template editor page (email_templates/<name>/edit): it rewrites the CodeMirror document in place,
// then press Save. Idempotent: a template that already has the marker is left alone.
// Way back: the template's "Revert to default" in Shopify admin, or remove the CJ blocks.
// kind: 'customer' | 'staff'; extras: {intro: true} for order confirmation.
window.cjBrand = function (s, kind, extras) {
  extras = extras || {};
  if (s.includes('cj-brand v1')) return { s, changes: ['already'] };
  const changes = [];
  const rep = (a, b, all) => {
    const n = s.split(a).length - 1;
    if (!n) return changes.push('MISSING: ' + a.slice(0, 50));
    s = all ? s.split(a).join(b) : s.replace(a, b);
    changes.push((all ? n : 1) + 'x ' + a.slice(0, 40));
  };
  const css = `
    /* cj-brand v1 */
    body, table, td, p, a, span, h1, h2, h3, h4, li { font-family: 'Jost', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    body, td, p { color: #2A1E1A; }
    .header__cell { padding-top: 36px; padding-bottom: 0; }
    .shop-name__cell { text-align: center; width: 100%; padding-bottom: 26px; }
    .order-po-number__container { display: none; }
    .content .container { border-top: 1px solid #D6C3A1; }
    .cj-label { margin: 34px 0 0; text-align: center; font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; color: #9A7A45; }
    .cj-title { margin: 12px 0 0; text-align: center; font-size: 26px; line-height: 1.25; font-weight: 500; color: #2A1E1A; }
    .cj-intro { margin: 14px 0 0; text-align: center; font-size: 15px; line-height: 1.6; color: #4A3C37; }
    .actions__cell { text-align: center; }
    .button, .actions-buttons { margin: 0 auto; }
    .button__cell, .actions-buttons .button__cell--primary { background: #000000; border-radius: 0; }
    .button__text { color: #FFFFFF; font-size: 13px; letter-spacing: 0.16em; text-transform: uppercase; }
    .link__cell { text-align: center; color: #7A6A64; }
    .secondary-action-cell { display: none; }
    a, a:hover, a:active, a:visited { color: #2A1E1A; }
    h3, .section__cell h3, .estimated_delivery__title { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; color: #2A1E1A; }
    h4, .customer-info__item h4 { font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 500; color: #2A1E1A; }
    .order-list__product-image { border: 1px solid #EADFD8; border-radius: 0; background: #FCFBFC; }
    .order-list__item-title { font-size: 15px; font-weight: 500; color: #2A1E1A; }
    .order-list__item-variant, .order-list__item-property { color: #7A6A64; }
    .cj-stock { display: inline-block; margin-top: 4px; font-size: 12px; letter-spacing: 0.04em; color: #9A7A45; }
    .order-list__item-price { color: #2A1E1A; }
    .subtotal-line__title { color: #7A6A64; }
    .subtotal-line__value { color: #2A1E1A; }
    .cj-note { margin: 26px 0 0; padding: 14px 16px; background: #F5F3EF; text-align: center; font-size: 14px; color: #4A3C37; }
    .footer { background: #E3CAC2; }
    .footer__cell { padding: 26px 0 30px; text-align: center; }
    .cj-foot-a { margin: 0; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: #2A1E1A; }
    .cj-foot-b { margin: 8px 0 0; font-size: 13px; color: #5A4A44; }
    .cj-foot-c { margin: 14px 0 0; font-size: 13px; color: #2A1E1A; }
    .cj-foot-d { margin: 14px 0 0; font-size: 12px; letter-spacing: 0.12em; }
    .cj-foot-d a { color: #2A1E1A; text-decoration: none; font-size: 12px; letter-spacing: 0.12em; }
    .footer .container td, .footer p { text-align: center; }
    .content .disclaimer__subtext { text-align: center; color: #7A6A64; }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap" rel="stylesheet">`;
  rep('</style>', css);
  // no Shop app button (Shopify's tracking app), the plain order button instead
  if (s.includes('shop_app_tracking_url')) s = '{% assign shop_app_tracking_url = nil %}' + s, changes.push('shop app off');
  // label + centred title + intro
  const label = kind === 'staff'
    ? '<p class="cj-label">Нова поръчка{% if order_name %} · {{ order_name }}{% endif %}</p>'
    : '{% if order_name %}<p class="cj-label">Поръчка {{ order_name }}</p>{% endif %}';
  rep('<h2>{{ email_title }}</h2>', label + '<h2 class="cj-title">{{ email_title }}</h2>');
  rep('<p>{{ email_body }}</p>', '<p class="cj-intro">{{ email_body }}</p>');
  if (s.includes('Прегледайте поръчката си')) rep('Прегледайте поръчката си', 'Вижте поръчката', true);
  // in stock / made to order under each piece (only when Shopify tracks the variant's stock)
  if (extras.stock) {
    const v = "{{ line.variant.title }}{% if buyer_email_rtl == true %}</span>&lrm;&rlm;{% endif %}</span><br/>";
    if (s.includes(v)) rep(v, v + "{% if line.variant.inventory_management == 'shopify' %}<span class=\"cj-stock\">{% if line.variant.inventory_quantity >= 0 %}Налично · 3–5 работни дни{% else %}Изработва се · 10–15 работни дни{% endif %}</span><br/>{% endif %}", true);
  }
  if (extras.intro) {
    rep('Благодарим ви за поръчката.', '{% if customer.first_name != blank %}Благодарим ви, {{ customer.first_name }}{% else %}Благодарим ви за поръчката{% endif %}');
    rep('Подготвяме поръчката ви за изпращане. Ще ви известим, когато бъде изпратена.', 'Получихме поръчката ви. Ще ви пишем отново, когато пратката тръгне към вас.', true);
  }
  // shipping emails: the main button follows the parcel when the courier gave a tracking link
  if (extras.track) rep('<a href="{{ order_status_url }}" class="button__text">Вижте поръчката</a>', '{% if fulfillment.tracking_urls.first %}<a href="{{ fulfillment.tracking_urls.first }}" class="button__text">Проследете пратката</a>{% else %}<a href="{{ order_status_url }}" class="button__text">Вижте поръчката</a>{% endif %}', true);
  if (extras.box) rep('<table class="row footer">', '<table class="row content"><tr><td class="content__cell"><center><table class="container" style="border-top:0"><tr><td><p class="cj-note">Всяко бижу пристига в кутия, с индивидуален сертификат.</p></td></tr></table></center></td></tr></table>\n<table class="row footer">');
  // footer
  const foot = kind === 'staff'
    ? '<p class="cj-foot-a">Само за екипа на Cullinan</p>'
    : '<p class="cj-foot-a">Ръчна изработка от 1991</p><p class="cj-foot-b">Ателие във Велико Търново</p><p class="cj-foot-c">Въпроси? Просто отговорете на този имейл.</p><p class="cj-foot-d"><a href="https://www.instagram.com/cullinan_jewellery.bg/">INSTAGRAM</a> &nbsp;·&nbsp; <a href="https://www.facebook.com/profile.php?id=61573474292352">FACEBOOK</a></p>';
  // only the disclaimer inside the footer row (some templates have another one under the button)
  const fi = s.lastIndexOf('<table class="row footer">');
  const tail = fi >= 0 ? s.slice(fi) : '';
  const fm = tail.match(/<p class="disclaimer__subtext">[\s\S]*?<\/p>/);
  if (fm) {
    const keep = fm[0].includes('<!-- shopify-managed-taxes-footer -->') ? '<!-- shopify-managed-taxes-footer -->' : '';
    s = s.slice(0, fi) + tail.replace(fm[0], foot + keep); changes.push('footer');
  } else changes.push('MISSING: footer');
  return { s, changes };
};
// Staff "New order" email: Shopify's merchant layout has no header; add ours, black buttons, our footer.
window.cjBrandStaff = function (s) {
  if (s.includes('cj-brand v1')) return { s, changes: ['already'] };
  const changes = [];
  const F = "font-family:'Jost','Helvetica Neue',Helvetica,Arial,sans-serif;";
  const css = `
  <style>
    /* cj-brand v1 */
    body, table, td, p, a, span, strong { font-family: 'Jost', 'Helvetica Neue', Helvetica, Arial, sans-serif; }
    .mail-button { background: #000000 !important; border-color: #000000 !important; border-radius: 0 !important; color: #FFFFFF !important; font-size: 13px; letter-spacing: 0.14em; text-transform: uppercase; }
    .order-list__product-image { border: 1px solid #EADFD8; border-radius: 0; }
    .order-list__item-title { font-weight: 500; color: #2A1E1A; }
    .order-list__item-variant { color: #7A6A64; }
    .order-list__summary-title { font-size: 12px; letter-spacing: 0.2em; text-transform: uppercase; font-weight: 500; }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap" rel="stylesheet">
</head>`;
  const hi = s.indexOf('</head>');
  if (hi < 0) changes.push('MISSING: head'); else { s = s.slice(0, hi) + css + s.slice(hi + 7); changes.push('css'); }
  const head = `<center><table role="presentation" width="100%" style="max-width:560px;border-collapse:collapse">
<tr><td style="text-align:center;padding:30px 0 22px">{% if shop.email_logo_url %}<img src="{{ shop.email_logo_url }}" alt="{{ shop.name }}" width="150">{% else %}<span style="${F}font-size:24px">{{ shop.name }}</span>{% endif %}</td></tr>
<tr><td style="border-top:1px solid #D6C3A1;padding:26px 0 18px;text-align:center;${F}">
<p style="margin:0;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#9A7A45">Нова поръчка · {{ name }}</p>
<p style="margin:10px 0 0;font-size:24px;font-weight:500;color:#2A1E1A">{% if customer.name %}{{ customer.name }}{% else %}Нов клиент{% endif %} · {{ total_price | money }}</p>
</td></tr></table></center>
`;
  const bi = s.indexOf('<table class="body');
  const ai = bi >= 0 ? s.indexOf('{% if fulfillment_aborted %}', bi) : -1;
  if (ai < 0) changes.push('MISSING: body start'); else { s = s.slice(0, ai) + head + s.slice(ai); changes.push('header'); }
  const fm = s.match(/<footer class="no-print">[\s\S]*?<\/footer>/);
  const foot = `<table role="presentation" width="100%" style="border-collapse:collapse;margin-top:24px"><tr><td style="background:#E3CAC2;padding:22px 0;text-align:center;${F}font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#2A1E1A">Само за екипа на Cullinan</td></tr></table>`;
  if (fm) { s = s.replace(fm[0], foot); changes.push('footer'); } else changes.push('MISSING: footer');
  return { s, changes };
};
window.cjApply = function (kind, extras) {
  const c = document.querySelector('.cm-content'); const v = c.cmView && c.cmView.view;
  const old = v.state.doc.toString(); const r = cjBrand(old, kind, extras);
  if (r.s !== old) v.dispatch({ changes: { from: 0, to: old.length, insert: r.s } });
  return r.changes;
};
