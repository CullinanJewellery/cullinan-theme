# Cullinan Jewellery — theme and component guide

What each custom part of the theme is, where it lives, how it behaves and what to watch out for. For colours, type
and buttons see `docs/design-system.md`. For why something is the way it is, see `docs/changelog.md` and, in detail,
`docs/archive/CLAUDE-original.md` (search it for the component name).

The theme is **Dawn 16**. Dawn's stylesheets (`base.css`, `component-*.css`, `section-*.css` that Dawn ships) stay
untouched so the theme can be upgraded; our overrides live in `assets/crown.css` (loaded after `base.css`) and in our
own section stylesheets. Internal names from the "Crown" period (`crown.css`, `newsletter--crown`) are identifiers,
deliberately not renamed.

---

## 1. Working with Shopify (essential mechanics)

- Pushing to `main` updates the **unpublished draft theme** (id 2) through the GitHub integration. Never publish it.
- **The theme editor commits back.** When the owner saves in the editor, Shopify commits to `main`. Always
  `git fetch` and pull if behind before editing templates or `config/settings_data.json`.
- **Templates are validated against the section schemas Shopify currently holds.** A template naming a new setting,
  block type or select value must be pushed **after** the section that defines it, with a gap (the validator has
  lagged up to ~15 minutes). Run `node tools/validate-templates.mjs` before any template or section-group push.
- Range values must sit on their step; select values must be in the option list; a rejected file fails the whole push.
- Leave **two to three minutes between pushes**; a quick second push has been dropped by Shopify seven times. If a file
  has not landed after ~40s of polling, re-send it with a byte changed.
- `config/settings_data.json` and `*.json` templates carry a `/* … */` header; strip it before `JSON.parse`. Shopify
  writes `page.contact.json` without a final newline.
- **Checking a push without a preview link**: assets are public at
  `https://2fp38p-az.myshopify.com/cdn/shop/t/2/assets/<file>?v=<anything>` (the `?v=` bypasses a year-long cache).
  The minifier strips spaces after colons and quotes in attribute selectors, rewrites `rgba()` to hex and `inset` to
  four properties, and escapes Cyrillic in `content` strings: search for what it writes. Liquid, JSON and locales
  cannot be checked this way.
- **Preview links expire.** Only the owner can make one (Online Store → Themes → draft → Preview → Share preview).
  Current: `https://nk3y2mxf2uxdl497-107185537364.shopifypreview.com` (2026-10-04).
- **Local checks are not live checks.** A local mock (saved page + repo CSS, served over http) catches layout errors
  but not Liquid output, settings or theme-editor data. Report the two separately.
- Testing quirks: the browser pane may produce no animation frames (finish animations with
  `document.getAnimations().forEach(a => a.finish())` before reading transitioned values); an emulated viewport wider
  than the pane scales the screenshot; the Shopify preview bar covers the bottom 40px.
- Never set `overflow-x` on `html` or `body` (breaks sticky header); scope it to the overflowing element.
- An author `display` on an element cancels the `hidden` attribute; add an explicit `[hidden] { display: none }`.
- When a component is a box with parts, measure the parts (a missing arrow once measured fine as a box).

## 2. Global

| Part | Files | Notes |
|---|---|---|
| Fonts | `snippets/theme-fonts.liquid`, `assets/font-*.woff2` | Rendered after `{% endstyle %}` in `layout/theme.liquid`, `layout/password.liquid`, `templates/gift_card.liquid` |
| Overrides | `assets/crown.css` | Large; organised in titled blocks with dated comments. New rules go in a titled block at the end |
| Top bar | `sections/announcement-bar.liquid` | Two messages („Ръчна изработка от 1991“, „Лична грижа за всеки клиент“); utility links from the `top-bar` menu (Theme settings → Top bar); the script at its end hides bar + header on scroll down, shows on scroll up |
| Header | `sections/header.liquid`, `header-group.json` | Logo image; menu `main-menu`; sticky; dropdown and phone drawer on scheme-6 |
| Mega menu | `snippets/header-mega-menu.liquid`, `header-mega-promo.liquid` | Text columns from the menu; a square picture in the corner from a `mega_menu_promo` block whose title matches the menu word (case-insensitive) |
| Phone drawer | `snippets/header-drawer.liquid` | Category words in Prata 24px; picture row from the same promo blocks |
| Accordion arrow | `snippets/icon-accordion-caret.liquid` | Chevron → minus; used by product tabs, FAQ, footer phone accordions, Контакти rows, metal menu |
| Footer | `sections/footer.liquid`, `footer-group.json` | Scheme-5; newsletter column + `link_column` blocks (up to six label/link pairs, optional contact email, optional **note**: plain lines such as address and hours); all text pure black; social block printed by the footer on all pages except homepage and product pages; on Контакти it has its own heading and picture |
| Icons | `snippets/icon-benefit.liquid` | Line icons, 24-unit viewBox, non-scaling 1.25px stroke: gold-bar, gem, ring, hammer, map-pin, engraving-pen, delivery-van, box, return-arrow, certificate, clock, question, scroll, ring-tools, brilliant, crystals, envelope, phone, cash |

## 3. Homepage (`templates/index.json`)

Order (2026-10-04): hero → trust band → selected pieces → categories → stones → story → reviews → custom request →
social → newsletter. Hidden (`"disabled": true`, kept): `hero_facts`, `image_marquee`, `silver_teaser`, `new_arrivals`.

| Section | Files | Behaviour |
|---|---|---|
| Hero (`hero_image`) | Dawn `image-banner.liquid` + `crown.css` | Owner's photo; ≥750px words at the left, marble white over a gradient; phone: words below the picture on a clay panel; ruby button; `[years]` token renders years since 1991. On phones Dawn's zoom-in makes the image `position: fixed; 100vh`; a phone-only rule in `crown.css` (keyed to `__hero_image`) puts it back to `absolute; inset: 0; object-fit: cover` so the 375px square shows the pendant |
| Trust band (`benefits`) | `sections/icon-benefits.liquid`, `assets/section-icon-benefits.css` | Bordered cards: ringed icon, small-capitals title, sentence. As many equal columns as cards (3 now); 2 columns on phones, odd last card spans. Blocks: icon or uploaded image, heading, subline |
| Selected pieces | Dawn `featured-collection.liquid` | Carousel of `all`, 3 whole cards from 990px; skips the current product when used on a product page |
| Categories | `sections/category-mosaic.liquid` + CSS | Tall/standard tiles via block order; caption over the picture; empty tiles show the hero gradient with ink words; tiles without a link are not links |
| Stones | `sections/stone-meanings.liquid` + CSS + inline script | Six stones (diamond first, zircon last), each a picture, one-word meaning, name, link; phone: centred looping carousel with arrows; pointer-hover grows a stone; button „Открийте своя камък“ |
| Story (`atelier`) | `sections/atelier.liquid` + CSS | "Facts as a list" layout: heading, three facts, button to За нас; media video/URL/still |
| Reviews | `sections/review-cards.liquid`, `assets/review-cards.js`, `snippets/review-stars.liquid` | Hand-filled review blocks; **a block without text prints nothing on the published theme; the section prints nothing until one has text**; in the editor and on an unpublished theme, empty blocks show labelled samples („Пример“) |
| Custom request | `sections/custom-request.liquid` + CSS | Shopify contact form; standard keys; hidden `contact[Тема]`; **on a product page adds `contact[Бижу]` with the piece's title and URL** |
| Social follow | `sections/social-follow.liquid` | Reuses the footer social markup; brand-coloured buttons |
| Newsletter | Dawn `newsletter.liquid` (extended) | Espresso band; optional background picture, video or video URL with poster |

## 4. Product page (`templates/product.json`, `sections/main-product.liquid`)

Block order: rating → title → description → price → variant picker → delivery note → buy buttons → **order by phone**
→ **trust lines** → Доставка и връщане → Начини на плащане → Качество и детайли → Грижа за бижуто → За камъка →
Подхождат си. Then: recently viewed, Judge.me reviews, Може да ви хареса (featured collection), questions, social band.

| Part | Where | Behaviour |
|---|---|---|
| Breadcrumb | `main-product.liquid` (section settings) | „Начало / name“, ≥990px only, grey link turning black |
| Rating | `rating` block | Five outline stars until Judge.me writes `reviews.rating` |
| Specs | `product_specs` block, `assets/product-info.js` | Rows (in this order): `custom.metal`, `custom.proba`, `custom.weight_g` (г), `custom.stone`, `custom.stone_count`, `custom.stone_size`, `custom.stone_weight_ct` (ct), `custom.cut`, `custom.dimensions`; then shared richtext or page. **Each row reads the selected variant's metafield first, then the product's** (same namespace and key; variant definitions under Settings → Custom data → Variants). The list sits in `#ProductSpecs-<section>`, which `product-info.js` refreshes on variant change like the price. A row prints only when filled; the accordion only when the product or any variant has a value, or the block has text |
| Collapsible tabs | `collapsible_tab` | Render nothing when they have no text and no page |
| Delivery note | `delivery_note` block | Bold label + text, truck icon; „Изработка по поръчка: Доставка 5-20 работни дни“ |
| Order by phone | `phone_order` block | Link dialling the block's number (not printed); nothing without a number |
| Trust lines | `trust_lines` block | Up to three icon + sentence lines; an empty line prints nothing |
| Variant picker | `snippets/product-variant-picker.liquid`, `product-variant-options.liquid`, `product-twin-*.liquid`, `assets/variant-twin-sync.js` | Metal options drawn first; pills for size; metal as a custom drop-down with colour dots; **a colour option is hidden when a material option names a colour in every value**, and both ids travel together so the right variant is chosen; sold-out computed from variants |
| Gallery | `snippets/product-media-gallery.liquid`, `assets/gallery-dots.js`, `crown.css` | Square tiles, no gaps; lone picture fitted; phone: full-bleed slides with dots |
| Zoom viewer | `snippets/product-media-modal.liquid`, `assets/product-modal.js`, `assets/component-product-viewer.css` | Thumbnail strip ≥990px, progress bar on phones, keyboard and swipe |
| Recently viewed | `sections/recently-viewed.liquid`, `assets/recently-viewed.js` | localStorage list (per browser); hidden until another product is stored |
| Questions | Dawn `collapsible-content.liquid` (extended) | Rows can be limited by product type or collection (`only_for`); **a separate copy of the За нас questions: change both** |
| Judge.me | app block | Restyled in `crown.css` (`jm-*`, `jdgm-*` selectors; fail soft) |

## 5. Collection and search

- Dawn's grids with `crown.css` sizing; filter and sort bar restyled (small capitals, hairlines, paper panels).
- Search results grid is inside `.template-search__results`; the collection grid carries `#product-grid` itself.

## 6. Product cards (`snippets/card-product.liquid`, `assets/card-swatches.js`)

- Title, colour swatch circles (from the colour option), vendor line, `custom.detail` line, price.
- A swatch is a button that swaps the card's picture and price to the variant whose material names that colour.
- Hover: over the picture shows the second photo; over the text nothing; no lift, no zoom.

## 7. Cart drawer (`snippets/cart-drawer.liquid`, `assets/cullinan-cart.css`, `snippets/cart-item-options.liquid`)

- 46rem sheet (full screen on phones), square; options as values only (material first, colour hidden where the page
  hides it); three reassurance lines from Theme settings → Cart (**one is the 14-day return line, flagged**);
  checkout button square, black → pink hover. The `/cart` page is still Dawn's layout.

## 8. Story pages

- **За нас** (`templates/page.about.json`): `about-intro` (jump-link pills) → four `split-story` panels (anchors
  istoriya, vdahnovenie, dizain, materiali) → questions (anchor vaprosi).
- **Контакти** (`templates/page.contact.json`): `page-banner` (picture, veil) → `contact-methods` rows: e-mail form,
  phone (button only), shop (address, hours, map link).
- `main-page.liquid` has `show_title` (off where the template brings its own heading).

## 9. Tools

- `tools/validate-templates.mjs`: checks templates and section groups against section schemas. Two known
  non-problems: Dawn's 404 has no schema; the Judge.me app block.
- Design System artifact republish: re-read it first (Artifact `list` with scope files, compare the size of
  `project/Main.dc.html`), edit the local copy with exact once-only replacements (rows are single-quoted JS strings;
  use curly apostrophes), publish with `root` = folder holding `project/` and `file_path` = the full long path.
- Local mocks: saved pages under the session scratchpad, rewritten to load `assets/` from the repo, served by a
  throwaway Node server with a temporary `.claude/launch.json` (never commit it).
