# Outstanding tasks

Kept current: remove an item when it is done (and add a line to `docs/changelog.md`). Three kinds of work are kept
apart: theme work we can do now, decisions only the owner can make, and Shopify-admin data.

## A. Known theme bugs

None open. (Phone hero crop fixed and verified on the preview, 2026-10-04.)

## A2. Payment setup status (2026-10-04, from the owner): pending, not ready

The owner's new firm is not registered yet. **Nothing on the site may claim online payments are ready, and no
payment-provider or checkout setting is to be changed from here.**

| Method | Status in the Admin | Notes |
|---|---|---|
| Shopify Payments | "Complete setup" (not set up) | Needs the registered firm |
| PayPal | "Setup incomplete" | Footer was showing its icon automatically |
| Cash on delivery (Manual payment methods) | **Not verified** | The intended method; its checkout configuration is unverified |

- Footer payment icons hidden (`payment_enable: false` in `sections/footer-group.json`) until the methods are real.
- **Cash-on-delivery claims already on the site** (written as fact, flagged for the owner, not changed): the homepage
  trust band card „Наложен платеж“, the product trust line „Наложен платеж — плащате при получаване“ and the cart
  drawer reassurance line (the product tab „Начини на плащане“ was removed 2026-10-04 at the owner's request). They become true only once COD is configured at
  checkout. Before launch: configure COD under Manual payment methods and place a test order, or hide those lines.

## B. Theme work authorised (the owner's brief of 2026-10-04), next stage

1. ~~Variant-aware specifications~~ done 2026-10-04 (see `docs/theme-guide.md` §4, Specs). Admin setup to use it is in
   D. Never show generic text as a piece's specification.
2. ~~Ring-size guide~~ done 2026-10-04 (theme guide §4). For the owner to read: the wording is a block setting
   (Customize → product → Variant picker → Ring size guide). Guide and За нас FAQ now agree (2026-10-04): a European
   size is the inner circumference in millimetres, not the diameter.
3. ~~Buying information~~ done 2026-10-04 as far as confirmed facts allow: engraving line added; delivery tab says
   office or address and "another stone, metal or size". 5–20 days confirmed as making + delivery: every
   place reads „Изработка и доставка: 5–20 работни дни“. Still open: the cash-on-delivery lines (A2); the returns sentence (C); the
   „Качество и детайли“ prose is general (585 or 750) until per-product metafields are filled.
   Original brief: **Buying information** near the purchase controls (confirmed facts only), details in the accordions; distinguish
   production time from shipping time if the business confirms the split; consistency between product page, cart and
   footer; payment icons only for methods actually enabled. The footer draws Shopify's icons for the enabled methods automatically (`payment_enable`); on the preview (2026-10-04) it shows **PayPal only**, and cash on delivery has no icon.
4. ~~Product-specific enquiry~~ done 2026-10-04 (enquiry band + buy-box link; theme guide §4). **Test passed
   2026-10-04 (owner, real Shopify data)**: the message arrived and its emailed link opened the same metal and size
   that were selected. The Контакти form was also tested by the owner the same day and works.
   The test also showed two data issues (see D): the size value „54 55“ (**fixed by the owner 2026-10-04**: sizes now
   53–60), and, still open, the Вариант line naming the gold twice („жълто злато / 14К жълто злато“) because the ring has both a colour and a metal option.
5. **Workshop story** — built as a four-slide section, waiting for photographs (see G).
6. **Homepage review** — proposal given to the owner 2026-10-04, **awaiting approval** (see G).
7. ~~The /cart page~~ reviewed and aligned with the drawer 2026-10-04. Accelerated payment buttons hidden through the
   theme (cart footer buttons block, „Show accelerated payment buttons“, off); switch on only after the payment setup.
8. **Product-data checklist** for the owner using the fields the theme supports (see D and H).

## H. Owner how-tos (2026-10-04)

**Test the product enquiry form** (real Shopify data; **passed 2026-10-04** on the ring — keep for re-testing):
1. Open a product on the preview link, pick a size and metal, click „Попитайте за това бижу“.
2. Fill name, your own email and a question; send. Expect „Благодарим ви…“ in place of the form.
3. In the store's notification inbox (Settings → Notifications → sender/recipient email) find the message: it should
   list Тема „Въпрос за бижу“, Бижу (title), Връзка (link with `?variant=`), Вариант (the size/metal chosen).
4. Open the link: it should land on the same variant. If nothing arrives, check spam, then the store email setting.
   The Контакти form works the same way (tested 2026-10-04).

**Add specification data to one real product:**
0. **First check what already exists** (Claude has no Admin access, so it cannot list definitions): Settings →
   Custom data → **Products** and → **Variants**; note any definition already in namespace `custom` with the keys below
   and only create the missing ones, so nothing is duplicated. Keys must match exactly; a definition with another
   namespace or key will not be read.
1. Settings → Custom data → **Products**: `custom.metal`, `custom.proba`, `custom.stone`, `custom.stone_size`,
   `custom.cut`, `custom.dimensions` (single line text); `custom.weight_g`, `custom.stone_weight_ct` (decimal);
   `custom.stone_count` (integer).
2. Settings → Custom data → **Variants**: `custom.metal`, `custom.proba`, `custom.weight_g`, `custom.dimensions`;
   **plus the five stone fields** (`custom.stone`, `custom.stone_count`, `custom.stone_size`, `custom.stone_weight_ct`,
   `custom.cut`, same types) for any product whose stone differs by variant.
3. **The rules the theme applies** (variant value always first):
   - One variant: variant value, else the product value — for every field.
   - Several variants: metal, proba, weight and dimensions come **only from each variant** (product values ignored),
     so a gold fineness can never show on a silver variant. Fill them on every variant.
   - Several variants, **same stone on all**: fill the stone fields once on the product and leave them empty on every
     variant; every variant shows the product's stone.
   - Several variants, **stones differ**: fill the stone fields on **every** variant. As soon as one variant has any
     stone field, the product's stone values are ignored for that product, and a variant left empty shows no stone
     rows (never another variant's or the product's).
4. Open the product on the preview, open „Качество и детайли“, switch variants: the rows should change with them.

## C. Decisions needed from the owner

| Decision | Why it matters | Where it would go |
|---|---|---|
| **Returns policy**, especially for made-to-order pieces | The site must not promise returns it cannot honour | Trust band, product lines, FAQ, delivery tab, cart line |
| **Free delivery** (never / always / above €X) | Hestiahome-style trust card; not a design choice | Trust band, product lines, delivery tab |
| Delivery price | Delivery tab, cart | |
| Engraving price, character limit, extra time | Engraving claim exists without terms | Product page, FAQ |
| Packaging (what a piece arrives in) | Photograph and a line | Product page |
| Price range of the first ~50 pieces | Homepage hierarchy, navigation | |
| Cleaning and repair terms | Confirmed as offered; terms unknown | Care tab, footer |
| Payment setup (see A2): firm registration, then Shopify Payments / PayPal / COD at checkout | Footer icons are hidden until then; COD lines are unverified; cart express buttons show | Footer, payment tab, trust lines, cart |

### Returns wording to review (flagged, not changed)

The owner has not confirmed the returns policy for made-to-order pieces. These still state 14 days:
- `templates/page.about.json`, question „Мога ли да върна бижу?“: „Мога ли да върна бижу? —
  Да, до 14 дни от получаването. Пишете ни и ще ви насочим.“
- `templates/product.json`, tab „Доставка и връщане“: returns sentence in its content.
- Cart drawer reassurance: Theme settings → Cart, default „Връщане до 14 дни от получаването“
  (`config/settings_schema.json`).
No replacement legal text is to be written; the accountant handles legal pages.

## D. Shopify-admin data (not theme bugs)

| Issue | Where | Action |
|---|---|---|
| Test descriptions (one word, gibberish) | All four test products | Write real descriptions |
| Prices €0 | Обеци, Висулка плочка, Гривна с червен конец | Set real prices |
| Vendor "Crown Jewellery" | All products | Use the field for stone or metal (cards print it) |
| No tags, product types empty or "earings" | All products | Stone tags (Циркон, Диамант…), types (Пръстени…) |
| Spec metafields empty | All products | Product definitions (Settings → Custom data → Products): `custom.metal`, `custom.proba` (text), `custom.weight_g` (decimal), `custom.stone`, `custom.stone_count` (integer), `custom.stone_size`, `custom.stone_weight_ct` (decimal), `custom.cut`, `custom.dimensions` (text), `custom.detail`. Where a variant differs (e.g. 14K vs 18K weight/fineness), create the **same keys under Settings → Custom data → Variants** and fill them per variant; the variant's value wins |
| Photographs with logo/slogan burned in | Bracelet; the ring's second photo | Replace (the first rule) |
| Variant pictures missing | Ring, read on the preview 2026-10-04 (after the size fix: sizes 53–60, 128 variants): **size 53 has no pictures at all** (and the page now loads on 53 / 14К жълто злато, showing the product's own pictures); sizes 55–60 have a picture only for yellow gold; only size 54 has all four metals | Link each metal's picture to its paired variant in every size (all variants are buyable) |
| 112 variants on one ring (only 28 reachable); the gold named twice in variant titles („жълто злато / 14К жълто злато“, seen in the enquiry email) | Ring | Consider one material option carrying swatches; this also removes the repetition (still open 2026-10-04) |
| Bracelet material list lacks rose/white gold | Гривна | Add values or remove colours |
| Menu: „Дамкси“ typo; Дамски/Мъжки collections empty | Main menu | Fix spelling; fill or remove |
| Stone collections empty except Циркони, Диаманти, Камъни | Collections | Tag products (stones row links them — see E) |
| Availability shown correctly? | Inventory | Do not change inventory to make pages look finished |

## E. Unresolved conflicts in the documentation (flagged, not guessed)

1. "Never link to an empty collection" vs the stones row linking four empty stone collections (the owner's explicit
   choice, 2026-09-29, while the store is private). Resolve before launch.
2. Facebook/Instagram brand colours vs the palette and their contrast on the clay footer (3.1:1, 3.7:1).
3. Ruby hero button vs restraint: an owner exception, kept.
4. The old "fourteen rules" (archive) treated small prices and few sections as rules; the owner's brief says they are not
   universal. Prices are currently 18px/15px; revisit only with a reason (readability first).

## G. Workshop slides and proposals awaiting the owner

1. **Workshop slides — LIVE in a text-only layout since 2026-10-04; photographs pending.** The old story band is switched off.
   Photographs switch on only when all four slides have one. Section
   `workshop-slides` (key `workshop`, directly before the old story band `atelier`); details in
   `docs/theme-guide.md` §3. Visitors see it only when every slide has a photograph and a heading; the old story band
   stays visible meanwhile. **When the four photographs are in and the links chosen: hide the old story section**
   (Customize → Home page → the story section → eye icon). Owner to do in the editor, per slide: upload the
   photograph, pick a product or a populated collection (none is set; nothing links to the test ring automatically).
   Slide 4's button reads „Разгледайте бижутата“; slide 1 has a second link „Опишете своето бижу“ → Контакти.
   - **Photographs (4, real, square, ≥1600px, one light and background, nothing burned in), ideally one piece**:
     its 3D model on screen; its printed model; a goldsmith's hands at the bench; the finished piece worn.
2. **Homepage order**: hero → trust band → selected pieces → **workshop story** (moved up: it is the reason to pay
   more) → categories → stones → reviews (only once real ones exist) → custom request → shop visit (address, hours,
   map, a photograph of the shop front) → newsletter. Social follow folded into the footer.
3. **Shop visit band**: the shop in Veliko Tarnovo as a trust signal for a high-priced purchase (address, hours,
   „Обадете се“), from facts already confirmed.

**Photographs needed** (real, nothing burned in): the atelier bench with hands at work; the 3D model on screen; a
printed model beside its finished piece; two or three finished pieces worn; the shop front and interior; packaging
once decided. Shot list in `photography/README.md`.

## J. Homepage categories on phones — BUILT 2026-10-05 (two-column grid, names only, taglines removed everywhere)

One column of six full-width tiles, 375×230px each, the section 1552px tall at 375px; names 15px capitals with a
tagline, whole tile tappable, links all to populated collections. Recommendation: two columns (about 170×170px square
tiles, 8–12px gap), name only (14px capitals) under or on the tile, taglines dropped on phones; the section would be
about 650px. Also flagged: several taglines read as the slogan-style copy the owner now wants avoided („помни се
завинаги“, „Блясък, който не избледнява“, „Завършеният вид, за който ви питат“).

## I. Rating near the hero and homepage reviews — BUILT 2026-10-05 (Judge.me); owner steps open

- Done (owner, 2026-10-05): Judge.me Testimonials carousel added (all reviews, all ratings). Product page: this
  product's stars under the title, linking to the widget; nothing without reviews.
- **Pending a real published review (recorded 2026-10-05)**: hero line numbers; carousel look on the real store
  (the design was checked only on a local mock with test text); its count matching the hero; product stars under
  the title and the jump to the widget. Owner decision open: a peek of the next review card on phones needs either
  replacing Judge.me's carousel script or a theme-built carousel fed by Judge.me — ask before doing either.
- (earlier wording) **Untestable until the first real review is published**: the hero line's numbers, the carousel's look and its
  scope matching the hero count, the product stars under the title and the jump to the widget, and the editor-only
  outline-star line (needs the theme editor).
- Not verified with real data: the metafield values and the carousel look appear only once a review exists.

### Original proposal (2026-10-04)

- **Placement**: one line directly under the hero subtitle, before the button — ★★★★★ 4,9 · 37 отзива (numbers here only
  illustrate the format; nothing is shown until real data exists). Computer: left-aligned with the hero words, light
  text on the photo's gradient; phone: centred on the clay panel under the subtitle. Stars in rose gold (#B76E79, as the
  other stars); the line links to the reviews section. Screen-reader text: „Средна оценка 4,9 от 5 от 37 отзива“.
- **Data needed (verified, real)**: reviews collected by Judge.me from real orders (its review-request emails after
  delivery), giving a shop-wide average and count. To confirm in Judge.me / Shopify (not checked): whether the free plan
  writes a shop-level average and count the theme can read (shop metafields), or only per-product
  `reviews.rating`/`rating_count`. Imported old reviews (old site, Facebook, with permission) count only if the owner
  accepts them and Judge.me marks them as imported, not verified.
- **Rules**: no example or placeholder ratings to visitors, ever; the line prints nothing until a minimum number of
  real reviews exists (owner to choose, e.g. 5 or 10); the hand-filled homepage review cards are **not** a source for an
  average or a count.

## F. Content and photography

- Photography per `photography/README.md` (pieces on one neutral tile, a worn picture last, details, the workshop).
- Real client reviews (with permission) for the reviews section; none invented.
- Opening-hours, address and phone are confirmed; repeat them consistently.
