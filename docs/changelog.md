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
