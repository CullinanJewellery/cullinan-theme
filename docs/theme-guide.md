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
| Menu hover | `crown.css` (end) | No lift: a 1px underline (offset 0.5rem) on hover, keyboard focus and the current category, for the menu words and the dropdown links; weight 700 unchanged |
| Mega menu | `snippets/header-mega-menu.liquid`, `header-mega-promo.liquid` | Text columns from the menu; a square picture in the corner from a `mega_menu_promo` block whose title matches the menu word (case-insensitive) |
| Phone drawer | `snippets/header-drawer.liquid` | Category words in Prata 24px; picture row from the same promo blocks |
| Accordion arrow | `snippets/icon-accordion-caret.liquid` | Chevron → minus; used by product tabs, FAQ, footer phone accordions, Контакти rows, metal menu |
| Footer | `sections/footer.liquid`, `footer-group.json` | Scheme-5; exposes `--footer-padding-top` (its own padding) so the Контакти social picture can start at the footer's top edge (`.footer__social--contact.footer__social--picture`, no gap);  newsletter column + `link_column` blocks (up to six label/link pairs, optional contact email, optional **note**: plain lines such as address and hours); all text pure black; social block printed by the footer on all pages except the homepage, product pages and За нас, reading „Още от нашите бижута“ + „Разгледайте снимки и видеа във Facebook и Instagram.“ (since 2026-10-04; „Вижте работата ни“ is the homepage's own section only); on Контакти it has its own heading („Ще ни намерите и там“) and picture |
| Icons | `snippets/icon-benefit.liquid` | Line icons, 24-unit viewBox, non-scaling 1.25px stroke: gold-bar, gem, ring, hammer, map-pin, engraving-pen, delivery-van, box, return-arrow, certificate, clock, question, scroll, ring-tools, brilliant, crystals, envelope, phone, cash |

## 3. Homepage (`templates/index.json`)

Order (2026-10-05): hero → trust band → selected pieces → categories (+ „Вижте всички бижута“) → zodiac slideshow → stones → workshop slides → reviews → custom
request → social → newsletter. Hidden (`"disabled": true`, kept): `hero_facts`, `image_marquee`, `silver_teaser`,
`new_arrivals`, `atelier` („Занаят с история“, off since 2026-10-04; owner), `newsletter` („Първи научавайте“, off since 2026-10-05; the footer signup stays).

| Section | Files | Behaviour |
|---|---|---|
| Hero (`hero_image`) | Dawn `image-banner.liquid` + `crown.css` | **Rating line** (setting „Show review rating“, on for the homepage hero): stars + „4,9 · 37 отзива“ above the heading from `shop.metafields.judgeme.all_reviews_rating` / `all_reviews_count` (all published Judge.me reviews; updated by Judge.me when a review is published); hidden from shoppers at 0; the editor shows outline stars and „— · Все още няма отзиви“. Owner's photo; ≥750px words at the left, marble white over a gradient; phone: words below the picture on a clay panel; ruby button; `[years]` token renders years since 1991. On phones Dawn's zoom-in makes the image `position: fixed; 100vh`; a phone-only rule in `crown.css` (keyed to `__hero_image`) puts it back to `absolute; inset: 0; object-fit: cover` so the 375px square shows the pendant |
| Trust band (`benefits`) | `sections/icon-benefits.liquid`, `assets/section-icon-benefits.css` | Bordered cards: ringed icon, small-capitals title, sentence. As many equal columns as cards (3 now) on a computer; 2 columns (odd last card spans) on tablets. **Phones (<750px): a scroll-snap row; cards are 82% of the row with a 16px gap, so ~60px of the next card shows at the right** (after hestiahome.bg's mobile trust row), with a dot indicator and keyboard scrolling from `<benefits-slider>` (`assets/benefits-slider.js`): dots are buttons „Карта 2 от 3“, the row is a focusable region (Left/Right step a card), no autoplay, smooth only without reduced motion; without JS the row still swipes. Blocks: icon or uploaded image, heading, subline |
| Selected pieces („Нашите бижута“) | Dawn `featured-collection.liquid` | Heading „Нашите бижута“ since 2026-10-05 (the row lists the whole catalogue, not sales). Carousel of `all`, 3 whole cards from 990px; skips the current product when used on a product page |
| Categories | `sections/category-mosaic.liquid` + CSS + `assets/category-slider.js` | Phone controls: two circular 44×44 arrows, centred (line indicators removed 2026-10-06). **Phones: a slider** (`<category-slider>`): slides 82% wide, 4:5 photo (tile image or the warm empty block), name (Prata 22px) and one square rosewood button (`phone_button`, default „Разгледайте“) at the foot of the slide, so buttons line up (the sentence field `phone_text` was removed 2026-10-06); arrows disabled at the ends; „Вижте всички бижута“ (`all_label`) is an underlined text link; no counter, no autoplay; each slide is `position: relative` so Dawn's visually hidden text cannot widen the page. Only tiles with a link appear. Taglines removed at every size. Computer: tall/standard tiles via block order; caption over the picture; empty tiles show the hero gradient with ink words; tiles without a link are not links |
| Stones | `sections/stone-meanings.liquid` + CSS + inline script | Six stones (diamond first, zircon last), each a picture, one-word meaning, name, link; phone: centred looping carousel with arrows; pointer-hover grows a stone; button „Открийте своя камък“ |
| Zodiac slideshow (`zodiac`) | `sections/zodiac-slides.liquid`, `assets/section-zodiac-slides.css`, `assets/zodiac-slides.js` | Up to 12 `sign` blocks (template: Овен … Риби): photograph + optional phone photograph, heading, optional text, product **or** collection (product wins; a collection with no products is never linked; no target = no button), button text (default „Разгледайте“). **Shoppers see only slides with a photograph; with none the section prints nothing** (empty wrapper, 0px, checked). Editor: all slides, labelled placeholders, a note with the count. Frame ratios are section settings (defaults computer 16:7, phone 4:5; this template: **computer 16:9, phone 2:3**, owner 2026-10-05 „taller“); each photo is placed by its Shopify focal point (CSS vars `--fp-m` / `--fp-d`). Words on the picture, centred near the bottom, over an espresso gradient; Prata heading in page colour; theme `.button` lettered like the workshop button. No arrows or counter (owner, 2026-10-05): inside the picture, along the bottom: 12 line indicators centred (buttons, 44px tall tap areas, 20px wide below 360px, 24px above; active `#E6BAB9`, inactive page colour 60% with a faint dark edge); no pause/play button (owner); previous/next arrows inside the picture from 750px only (44px circles, vertically centred, 16px from the edges); title over the pictures (`overlay_title`, default „Вашата зодия“), centred at the top over a soft top shade; the words sit above them (bottom 6.4rem phone, 8.8rem computer). Swipe and ←/→ (focus inside) move. **Preview without photos** (`preview_placeholders`, default off; on in this draft's template): all slides with labelled placeholders and a non-link sample button, only when the theme is not the live one (`theme.role` ≠ main) and the page is the editor, a shopifypreview.com link or an unpublished theme. Autoplay 3 s (owner, was 6), 0.6 s fade; pauses on hover over the pictures, visible keyboard focus (not on the play button), off screen and hidden tab; a tap on the picture (not on its link), a swipe, an arrow, an indicator or ←/→ stops it; hover and keyboard focus pause it; it stops off screen and starts again each time the section comes back into view; reduced motion never starts it, no fade. Arrows wrap. Inactive slides `inert`; live region speaks only after manual moves. Without JS the slides are listed |
| Workshop slides (`workshop`) | `sections/workshop-slides.liquid`, `assets/section-workshop-slides.css`, `assets/workshop-slides.js` | Up to four `slide` blocks: photograph, heading, text, product **or** collection picker (product wins; a collection with no products is never linked; no target = no button), button text (default „Вижте бижуто“ / „Разгледайте бижутата“), optional second link. **Shows once every slide has a heading (≥2 slides). Photos per slide** (2026-10-05): a slide with a photo (or, in the editor, a labelled placeholder) is `.workshop__slide--photo` (computer: photo 55% left, text right); one without is text-only on the storefront. **Phones**: title, then one shared „Стъпка N от 4“ line (`data-workshop-current`, set in `render()`), photo (4:5, the photo only), then heading, text, button and second link 16px below on the section background (no card), then one joined control of two 56×44px halves; step marks hidden. Section title 26–40px like other homepage titles. Editor notes say what is missing. Manual only: arrows (disabled at the ends, focus handed to the other arrow), step buttons with `aria-current="step"`, touch/pen swipe (≥40px, mostly sideways) on the slides and the control, with the following click cancelled for 500ms, ←/→/Home/End inside; inactive slides `inert`; polite live region; 0.4s fade, none under reduced motion. Without JS the slides are listed |
| Story (`atelier`) | `sections/atelier.liquid` + CSS | **Switched off on the homepage** (2026-10-04, owner: remove „Занаят с история“; not replaced by a family-atelier line). Way back: remove `"disabled": true` in `templates/index.json` |
| Reviews („Отзиви от наши клиенти“) | `sections/review-cards.liquid`, `assets/section-review-cards.css` | Since 2026-10-05: **real Judge.me reviews only**, drawn by a Judge.me app block (Cards or Testimonials carousel, free plan) that the owner adds in the theme editor; our eyebrow and heading above it. Prints nothing to shoppers until `shop.metafields.judgeme.all_reviews_count` > 0 **and** a Judge.me block is present; the editor shows notes. Hand-filled cards, samples and `assets/review-cards.js` are no longer used. Anchor `#otzivi`. **Block in place (owner, 2026-10-05): Judge.me Testimonials carousel**, all reviews, all star ratings, sample reviews off, header text blank, colours #F3EBE6 card / #B76E79 stars / #2A1E1A text and arrows |
| Custom request | `sections/custom-request.liquid` + CSS | Shopify contact form; standard keys; hidden `contact[Тема]`; **on a product page adds `contact[Бижу]` with the piece's title and URL** |
| Social follow | `sections/social-follow.liquid` | Reuses the footer social markup; brand-coloured buttons; „Вижте работата ни“ + its line — **homepage only** |
| Newsletter | Dawn `newsletter.liquid` (extended) | Espresso band; optional background picture, video or video URL with poster |

## 4. Product page (`templates/product.json`, `sections/main-product.liquid`)

Block order: rating → title → description → price → variant picker → delivery note → buy buttons → **order by phone**
→ **trust lines** → Доставка и връщане → Качество и детайли → Грижа за бижуто → За камъка → Подхождат си
(„Начини на плащане“ removed 2026-10-04, owner; couriers are named inside „Доставка и връщане“). Then: recently
viewed, Judge.me reviews, questions, **enquiry band** („Имате въпрос за това бижу?“), Може да ви хареса (featured
collection), **social band** („Още от нашите бижута“ / „Разгледайте снимки и видеа във Facebook и Instagram.“, `sections/social-band.liquid`, Facebook and Instagram links).

| Part | Where | Behaviour |
|---|---|---|
| Breadcrumb | `main-product.liquid` (section settings) | „Начало / name“, ≥990px only, grey link turning black |
| Rating | `rating` block, **under the title** (since 2026-10-05) | This product's own Judge.me rating (`reviews.rating`, `reviews.rating_count`): stars, average and count as one link to `#judgeme_product_reviews` (the full widget lower on the page). **Nothing at all without reviews**; the widget still offers „Напишете отзив“. No Judge.me preview badge is added, so there is no duplicate |
| Specs | `product_specs` block, `assets/product-info.js` | Rows (in this order): `custom.metal`, `custom.proba`, `custom.weight_g` (г), `custom.stone`, `custom.stone_count`, `custom.stone_size`, `custom.stone_weight_ct` (ct), `custom.cut`, `custom.dimensions`; then shared richtext or page. **Each row reads the selected variant's metafield first, then the product's** (same namespace and key; variant definitions under Settings → Custom data → Variants). **Exception: on a product with more than one variant, `metal`, `proba`, `weight_g` and `dimensions` never fall back** to the product value (a product-level 750 must not appear beside a silver variant); they show only when the selected variant has them. **Stone fields** (`stone`, `stone_count`, `stone_size`, `stone_weight_ct`, `cut`) fall back to the product only while no variant has stone data; once any variant has a stone field, stone rows come only from the selected variant (an empty variant shows none). A variant's value is never shown for another variant. Configuration for the owner: `docs/tasks.md` H. The list sits in `#ProductSpecs-<section>`, which `product-info.js` refreshes on variant change like the price. A row prints only when filled; the accordion only when the product or any variant has a value, or the block has text |
| Ring-size guide | variant picker block settings (`size_guide_*`), `snippets/product-variant-picker.liquid`, dialog in `main-product.liquid`, styles at the end of `crown.css` | „Таблица с размери“ link for any option whose name contains „размер“/"size": on the label's line from 750px (the label leaves 15rem for it), under the boxes on a phone. Opens a native `<dialog>`: the guide text (a richtext setting with a Bulgarian default) and a table of European sizes 48–64 (circumference = size; diameter = size ÷ π, computed). Closes with Затвори, Escape or the backdrop. The dialog is printed outside `<variant-selects>` because Dawn re-renders that on variant change. No dialog on products without a size option |
| Collapsible tabs | `collapsible_tab` | Render nothing when they have no text and no page |
| Delivery note | `delivery_note` block | Bold label + text, truck icon; „Изработка и доставка: 5–20 работни дни“ |
| Order by phone / ask | `phone_order` block | Link dialling the block's number (not printed), and „Попитайте за това бижу“ (`ask_label`) jumping to `#zapitvane`; the ask link is hidden by CSS when the page has no enquiry band |
| Enquiry band | `custom-request` section, key `enquiry`, after the questions | On a product page the section carries `id="zapitvane"`, subject „Въпрос за бижу“, and hidden lines `contact[Бижу]` (title), `contact[Връзка]` (URL with `?variant=`) and `contact[Вариант]` (variant title), the last two kept current through Dawn's `variantChange` pubsub event; the message field reads „Вашият въпрос“; „Имате снимка?“ line off. On the homepage it behaves as before |
| Trust lines | `trust_lines` block | Up to three icon + sentence lines; an empty line prints nothing. Now: cash on delivery (flagged, A2) and engraving on request; the third line (couriers) is empty since 2026-10-04 |
| Variant picker | `snippets/product-variant-picker.liquid`, `product-variant-options.liquid`, `product-twin-*.liquid`, `assets/variant-twin-sync.js` | Metal options drawn first; pills for size; metal as a custom drop-down with colour dots; **a colour option is hidden when a material option names a colour in every value**, and both ids travel together so the right variant is chosen; sold-out computed from variants |
| Product rows (featured collection) | Dawn `featured-collection.liquid` + `crown.css` | The numeric counter („1 / от 4“) between the arrows is hidden visually (kept for screen readers) since 2026-10-04; arrows unchanged |
| Gallery | `snippets/product-media-gallery.liquid`, `assets/gallery-dots.js`, `crown.css` | Computer: two-column mosaic (`gallery_layout: columns` in product.json, restored 2026-10-06; "thumbnail" 10-05 to 10-06), square tiles, no gaps; lone picture fitted; phone: full-bleed slides with dots |
| Zoom viewer | `snippets/product-media-modal.liquid`, `assets/product-modal.js`, `assets/component-product-viewer.css` | Thumbnail strip ≥990px, progress bar on phones, keyboard and swipe |
| Recently viewed | `sections/recently-viewed.liquid`, `assets/recently-viewed.js` | localStorage list (per browser); hidden until another product is stored |
| Questions | Dawn `disclosures` section (prints only what Shopify's product disclosures supply; nothing today) | The product page **no longer carries a copy of the За нас FAQ** (removed 2026-10-03, `1c60b42`); the FAQ lives only in `templates/page.about.json` |
| Judge.me | app block | Restyled in `crown.css` (`jm-*`, `jdgm-*` selectors; fail soft) |

## 5. Collection and search

- Dawn's grids with `crown.css` sizing. Filter and sort bar as connected boxes (2026-10-06): one ruled strip with a
  line between parts, panels hanging from it; on phones one edge-to-edge bar „Филтри | Сортиране“ (`cj-bar-sort` hands
  its value to the drawer's sort, `assets/collection-filters.js`). Filtering itself is Dawn's `facets.js`.
- Search results grid is inside `.template-search__results`; the collection grid carries `#product-grid` itself.

## 6. Product cards (`snippets/card-product.liquid`, `assets/card-swatches.js`)

- Title, colour swatch circles (from the colour option), vendor line, `custom.detail` line, price.
- A swatch is a button that swaps the card's picture and price to the variant whose material names that colour.
- Hover: over the picture shows the second photo; over the text nothing; no lift, no zoom.
- Collection pages: a second photo (first image tied to no variant). The `.media` becomes `[data-card-track]`, a
  scroll-snap scroller with two `.card__slide` links (tabindex -1); circles bottom-left (raised above a badge). `assets/card-photos.js` only
  syncs the circles, handles circle taps and swatches, and cancels a click that ends a drag. `.card__inner` is a
  stacking context: on two-photo cards it is lifted above the stretched title link (z 2, cart icon z 3) and Dawn's
  inner `.card__content` has `pointer-events: none`.
- Frame shape: the template's `image_ratio` (square on collection pages) sets `--ratio-percent`. The snippet also
  writes `--ratio-percent-wide` (the first photo's own ratio); in `#product-grid` from 750px crown.css uses it
  (`!important`, the other is inline) with `object-fit: cover`, so computers get the earlier photo-shaped cards and
  phones keep square frames with `contain` (2026-10-06).
- Product rows (Най-продавани, Може да ви хареса; sections with `show_secondary_image`): preview mode, no bag
  (`quick_add: none`). A relevant second photo fades in on CSS `:hover` of `.card__photo-link`
  (both photos in one product link over the card; as moonmagic's rows; no script). Наскоро разгледани does the same
  via `data-image2`.
- Bag icon (top-right of the photo, 30px rose-clay circle) = Dawn's quick add, `quick_add: standard` per section; markup in the
  `quick-add--icon` branch, styles „Card cart icon“ in crown.css. Options → Dawn's panel (`quick-add.js` loads the
  product page's `product-info`; blocks with `quick-add-hidden` or listed in crown.css are hidden there). No options →
  `product-form.js` adds and opens the drawer. Hidden when `card_product.available` is false.

## 7. Cart drawer (`snippets/cart-drawer.liquid`, `assets/cullinan-cart.css`, `snippets/cart-item-options.liquid`)

- 46rem sheet (full screen on phones), square; options as values only (material first, colour hidden where the page
  hides it); three reassurance lines from Theme settings → Cart (**one is the 14-day return line, flagged**);
  checkout button square, black (the scheme's button) → near-black `#2B2B2B` hover, `#3A3A3A` pressed (2026-10-06; rosewood → pink before).
- **The `/cart` page** keeps Dawn's table layout but reads like the drawer (end of `assets/cullinan-cart.css`, scoped to
  `#main-cart-items` / `#main-cart-footer`): the same options line (`cart-item-options`), „Премахни“ in words, the same
  checkout button (48px, 15px bold capitals). Shopify's accelerated buttons (Shop Pay, PayPal) are drawn only when the
  buttons block's **Show accelerated payment buttons** setting is on (`sections/main-cart-footer.liquid`, default off
  while the payment setup is unfinished); no Shopify payment or checkout setting is involved. An empty
  `<dl>` stays in each line (Dawn's properties list; zero height).

## 8. Story pages

- **За нас** (`templates/page.about.json`): `about-intro` (jump-link pills) → four `split-story` panels (anchors
  istoriya, vdahnovenie, dizain, materiali) → questions (anchor vaprosi).
- **Контакти** (`templates/page.contact.json`): `page-banner` (picture, veil) → `contact-methods` rows: e-mail form,
  phone (button only), shop (address, hours, map link).
- `main-page.liquid` has `show_title` (off where the template brings its own heading).

## 9. Tools

- `tools/validate-templates.mjs`: checks templates and section groups against section schemas; app blocks
  (`shopify://apps/...`) are skipped. One known non-problem: Dawn's 404 has no schema.
- Design System artifact republish: re-read it first (Artifact `list` with scope files, compare the size of
  `project/Main.dc.html`), edit the local copy with exact once-only replacements (rows are single-quoted JS strings;
  use curly apostrophes), publish with `root` = folder holding `project/` and `file_path` = the full long path.
- Local mocks: saved pages under the session scratchpad, rewritten to load `assets/` from the repo, served by a
  throwaway Node server with a temporary `.claude/launch.json` (never commit it).
