# Changelog

Dated record of decisions, newest first. Each line says what changed and why in one or two sentences; the full
reasoning, measurements and verification notes of everything up to 2026-10-04 are in
`docs/archive/CLAUDE-original.md` (search for the component or date). **New detail goes here, not into CLAUDE.md.**

Marks: **(owner)** = the owner's explicit instruction; **(superseded)** = no longer current.

---

## 2026-10-04 — next stage **(owner: "start the next stage")**
- Phone hero: the picture fills its 375px square and shows the pendant (Dawn's zoom-in had made it fixed and 100vh
  tall). Desktop unchanged. Verified on the preview.
- Footer payment icons hidden: payment setup is pending (firm not registered; status in `docs/tasks.md` A2) **(owner)**.
- Specifications follow the selected variant: each row reads the variant's metafield first, then the product's; new
  row `custom.dimensions` („Размери на бижуто“); refreshed on variant change by `product-info.js`.
- Ring-size guide: „Таблица с размери“ beside the size option opens a dialog with how to measure (ring sizer or an
  existing ring), its limits, and sizes 48–64 with computed diameters. No resizing or exchange promise. Verified on
  the preview at 1440, 990 and 375.
- Product enquiry: a custom-request band after the questions; its form names the piece, its link and the chosen
  variant (kept current on variant change); „Попитайте за това бижу“ beside the phone link jumps to it.
- Buying information: engraving trust line; the delivery tab says office or address and "another stone, metal or
  size". Returns and cash-on-delivery wording unchanged, flagged.
- Cart page aligned with the drawer: options line, „Премахни“, the same checkout button. Express buttons flagged.
- Focused checks **(owner)**: specs on multi-variant products no longer fall back to product-level metal, proba,
  weight or dimensions (stone fields still may); cart page accelerated buttons hidden by a theme setting (no payment
  or checkout setting touched); „Изработка и доставка: 5–20 работни дни“ everywhere (5–20 confirmed as making +
  delivery); За нас ring-size answer says inner circumference in mm, not diameter, matching the guide. Fallback
  tested with substituted data (liquidjs mocks); hiding, wording and FAQ checked on the real preview.
- **2026-10-05, third round (owner)**, checked on the real preview at 375 (and 320) and 1440:
  - Workshop on phones: button on its own row, „Опишете своето бижу“ under it, arrows and step marks one centred row;
    all four slides fit at 320. Slide 1 (longest) sets the section height, so shorter slides leave space above the
    arrows — kept to avoid the page jumping between slides. The owner's reference screenshot did not arrive.
  - Categories on phones: a slider with name, one short sentence (drafted from site facts only) and a button; all six
    links return 200 with products. A first version widened the page to 1558px (Dawn's absolutely positioned
    visually hidden text escaped the scroll track); fixed with `position: relative` on each slide.
  - Judge.me check: free plan includes the review widget, star badge, cards/testimonial/video carousels, reviews
    grid, trust badge, medals and a basic reviews carousel; not the pop-up/sidebar, AI summary, review snippets or the
    „Happy Customers“ all-reviews page. Shop-wide average and count exist as `shop.metafields.judgeme.all_reviews_rating`
    / `all_reviews_count` (our store's own Judge.me settings already use them for its all-reviews badge).
  - Hero rating line built (setting, hero only); homepage reviews rebuilt around a Judge.me app block; both read the
    same count. Verified hidden at 0 reviews on the preview; populated states tested with liquidjs mocks only.
- **2026-10-05, second round (owner)**, each checked on the real preview at 375 and 1440:
  - Categories: two-column square grid on phones (167px tiles; section 1552 → 655px), names only; taglines removed at
    every size (cleared from the six blocks; the setting stays). Computer tiles unchanged.
  - Product row heading „Бестселъри“ → „Нашите бижута“ (it shows the catalogue, not sales). Products and square frames
    unchanged.
  - Header menu: the 0.25rem lift on hover, focus and open dropdown removed (it was what moved the words; the weight
    never changed); a 1px underline marks hover, keyboard focus and the current category, menu words and dropdown
    links alike. Checked with a real hover and real Tab presses: underline on, position unchanged (468, 68.6).
  - Product-row arrows (featured-collection rows and Наскоро разгледани): caret 0.6 → 0.8rem, full ink; disabled 25%;
    44×44 targets. Gallery and reviews arrows unchanged. Counter still hidden.
  - Workshop slides linked: Пръстени, Висулки, Обеци, all — „Вижте пръстените“, „Вижте висулките“, „Вижте обеците“,
    „Разгледайте бижутата“; each link returns 200 with products (1, 1, 1, 4).
  - Three template pushes dropped again and were re-sent with a byte change.
- **2026-10-05 (owner)**, checked on the real preview:
  - Homepage product row renamed „Избрани бижута“ → „Бестселъри“; same products (collection all) and layout. **Flag: not
    based on sales** — the store has no orders; the row shows the whole catalogue. The name was „Избрани бижута“ for that
    reason (2026-10-04); revert or switch to a curated/sales-based collection once orders exist.
  - Workshop slides on phones: title 22px, step 11px, heading 20px, text 15px, a 44px compact button, tighter gaps;
    section 547 → 477px tall at 375. Photo layout (previewed with stand-ins in the browser only): photo 345px first,
    controls, text, button. Computer and tablet unchanged.
  - Categories on phones: reviewed, not changed (see docs/tasks.md J).
- **Evening round (owner)**, each verified on the real preview at 375 and 1440:
  - Social band wording: „Още от нашите бижута“ / „Разгледайте снимки и видеа във Facebook и Instagram.“ (product pages
    and the footer's social block on other pages); links kept. CLAUDE.md gains one line on how Bulgarian copy should read.
  - A Shopify theme-editor save (b403e0c) had written back an older `main-product.liquid` without the per-variant stone
    rule (that push had been dropped); restored from 24f556f.
  - Workshop slides show without photographs in a text-only layout (photos all or nothing); „Занаят с история“ switched
    off on the homepage; section title 26–40px.
  - Контакти: the picture behind the Facebook/Instagram buttons now starts at the footer's top edge (the strip was 16px
    on a computer, 7px on a phone); words unmoved.
  - Product rows: the „1 / от 4“ counter hidden visually; arrows checked (next asks the right scroll, previous enables).
  - За нас: no promotional social block in its footer; other pages unchanged.
  - Trust slider on phones: cards 82% wide, 16px gap, ~62px of the next card visible; computer unchanged.
  - Rating near the hero: proposal only (`docs/tasks.md` I).
- **Trust row slides on phones (owner)**: after hestiahome.bg's mobile trust row (checked live: a CSS scroll-snap row,
  cards 266px with the next peeking, no dots, no autoplay). Ours: one card per screen, a small dot indicator,
  keyboard scrolling, no autoplay. Computer and tablet unchanged. Verified on the real preview at 375 and 1440 (dot
  and key navigation checked by recording the requested scroll targets: the pane runs no animation frames).
- **Social wording (owner)**: product pages read „Вижте бижутата в действие“ / „Разгледайте още снимки и видеа на
  нашите бижута във Facebook и Instagram.“. To keep „Вижте работата ни“ on the homepage only, the footer's social
  block on other pages (collections, За нас, search) now uses the same new words — a reading of "homepage only"; way
  back: `social_heading` / `social_text` in `sections/footer-group.json`. Контакти unchanged.
- **Product buying information (owner)**: „Начини на плащане“ accordion and the courier trust line removed; couriers
  stay in „Доставка и връщане“. Spacing even (18–25px) at 375 and 1440 on the preview. Payment and returns unchanged.
- **Product enquiry test passed (owner, real Shopify data)**: the email arrived and its link opened the selected
  metal and size. Контакти form also tested and working (owner). Open: the gold named twice in variant titles (Admin data). Size „54 55“ fixed by the owner: sizes 53–60, 128
  variants, all buyable; size 53 has no variant pictures yet (checked on the preview).
- **Workshop slides built (owner approved the layout)**: one section, up to four slides, owner's shorter copy, links
  chosen in the editor only, hidden from visitors until every slide has a photograph and a heading; the old story band
  stays until then. Checked locally (real Liquid via liquidjs, real CSS/JS in a mock with generated pictures, 1440 and
  375); **not visible on the real preview until photographs are uploaded**.
- Specs, third pass **(owner)**: stone fields stop falling back to the product once any variant has stone data;
  single-variant products read the variant first. Substituted-data tests only (15 checks).
- Docs correction: the product page has had no copy of the FAQ since 2026-10-03; the theme guide said otherwise.
- Workshop story proposal (one section, four slides) recorded in `docs/tasks.md` G; not built.
- Two template pushes dropped again (sent within a minute of another push); re-sent with a byte change.

## 2026-10-04 — documentation reorganised
- CLAUDE.md archived verbatim as `docs/archive/CLAUDE-original.md` and rewritten as a short entry point; current
  design system, theme guide, this changelog and the task list split into `docs/`.
- The "fourteen luxury rules" of the old file are reframed as observations from the reference research, not
  universal rules (owner's brief). moonmagic is no longer the default reference; references are chosen per question.
- The unqualified „Връщане до 14 дни“ card and product line removed until the returns policy for made-to-order
  pieces is confirmed **(owner)**; trust band now fits any number of cards. Existing returns wording flagged
  (`docs/tasks.md`).
- Verified on the new preview link (desktop and phone): trust band, hero, square buttons, whole-number prices,
  product phone link and trust lines, footer note, Контакти shop row. Found: the phone hero picture does not fill its
  square (logged, not fixed in this documentation stage).

## 2026-10-04 — wave 2: trust and consistency **(owner: "everything", Hestiahome's trust method)**
- Capitals strip under the hero hidden; the benefits row redesigned as a **trust band** of icon cards and moved under
  the hero (cash on delivery, Econt/Speedy delivery, engraving and care). Free delivery left out: terms unknown.
- **Square buttons** (`buttons_radius` 40 → 0) and one size from 750px (5.6rem, 14px capitals); hero button 34rem.
- Filter/sort bar restyled; empty category tiles in the hero gradient; footer link column gains a **note** (shop address
  and hours); Контакти shop row gains hours; product page gains **trust lines** under the button.
- Homepage order: hero, trust, pieces, categories, stones, story, reviews, custom request, social, newsletter.
- Fonts kept (Prata + Jost) on evidence.
- Mistake fixed: an icon value (`ring-tools`) not in the section's option list; `tools/validate-templates.mjs` added.

## 2026-10-04 — wave 1: the luxury goal **(owner: luxury jewellery at a high price; change any page)**
- Reference research (Tiffany, Van Cleef & Arpels, Ole Lynggaard, Pomellato, Jessica McCormack, Mejuri, Catbird,
  Kirkorian Diamonds, Aristo, ASTO Gold; Cartier and Bulgari unreadable).
- Whole-number prices (`money_without_trailing_zeros`); buy-box price 22 → 18px, cards 18 → 15px.
- Hero heading 40px max; hero with the owner's first photograph (pendant positioned at 50% 70%, light words at the left
  over a gradient on computers).
- „Най-продавани“ → „Избрани бижута“ (nothing has sold); silver banner and „Ново при нас“ hidden; stones lead with
  diamond; top bar „Ръчна изработка от 1991“; first-screen claims as specifics (later replaced by the trust band).
- Контакти shop row and footer link; **order by phone** product block.
- Engraving confirmed as offered **(owner)**.

## 2026-10-04 — direction C rounds
- Round 2: rope line removed **(owner)**; footer on scheme-5 with `#CDB5A8` hairlines; product social band to scheme-6;
  hero button red → ruby `#D62246`; headings +21% ink (0.012em stroke) **(owner asked ~20% bolder)**; phone product
  pictures larger (rows 240px, grids 186px); menu dropdown/drawer on scheme-6; phone menu words in Prata;
  `image_marquee` hidden.
- Direction C applied **(owner chose "Мрамор")**: marble and rose-gold schemes, rosewood buttons, Prata headings in
  sentence case (self-hosted), espresso newsletter, warm empty slots. (Rope line: superseded the same day.)
- Custom-request band and the Identity directions board built after the owner said the site felt too close to
  moonmagic (all homepage sections had a twin on theirs).

## 2026-10-03
- Story bands merged into one "facts as a list" band; За нас texts shortened **(owner)**.
- Reviews section (hand-filled, draft-only samples), cart drawer redesign, header menu redesign (no underline, black on
  hover, lift, corner picture), breadcrumb, buy box tightened, colour row hidden wherever a material names the colour,
  card circles pick the variant whose material names the colour, zoom viewer, titles at 550 (superseded by Prata).

## 2026-10-02
- Product gallery as square tiles; product cards three across; accordion arrow chevron → minus; Начини на плащане tab.

## 2026-10-01
- Judge.me installed by the owner (free plan) and restyled; recently viewed row; buy-box text black, metal before size;
  stars above the title; footer text black; product-page social band; narrow-phone fixes.

## 2026-09-28 to 09-30
- Options as words on the product page, circles on cards; colour option hidden when covered by material; Add to cart
  matched to moonmagic (later smaller) with pink hover; made-to-order line; express checkout button removed
  **(owner)**; stones row built and reworked (phone looping carousel); new-arrivals banner; FAQ rebuilt; ring-size
  answer researched; quantity selector removed **(owner)**; stock not counted (continue selling) **(owner, in Admin)**.

## 2026-09-20 to 09-27
- Silver banner (words over a full-bleed picture); hero button bright red **(owner)** and rectangular; buttons a pill
  site-wide **(owner; superseded 2026-10-04)**; hover lift; button sizes matched to moonmagic (superseded on computers);
  product page built on Dawn with a specs block from metafields; card swatches swapping picture and price; product row
  sized to moonmagic.

## 2026-09-13 to 09-19
- Self-hosted Jost with Cyrillic after finding Shopify's fonts have none (superseded for headings by Prata); За нас and
  Контакти pages; top bar layout and hide-on-scroll; footer link columns and newsletter; phone hero with words below the
  picture; pink panels (superseded); image marquee; social follow section.

## 2026-09-06 to 09-12
- Fork of Dawn 16 connected to Shopify; first palette and fonts (settings file was being rejected until values were put
  inside their ranges); hero words over the photograph agreed as the first exception; name back to Cullinan Jewellery.
