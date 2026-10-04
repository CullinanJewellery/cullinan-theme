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
  trust band card „Наложен платеж“, the product trust line „Наложен платеж — плащате при получаване“, the product tab
  „Начини на плащане“, and the cart drawer reassurance line. They become true only once COD is configured at
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
4. ~~Product-specific enquiry~~ done 2026-10-04 (enquiry band + buy-box link; theme guide §4). **No test message has
   been sent** from it (or from Контакти): send one from the preview and check the store inbox before launch.
5. **Workshop story** — proposal given to the owner 2026-10-04, **awaiting approval** (see G).
6. **Homepage review** — proposal given to the owner 2026-10-04, **awaiting approval** (see G).
7. ~~The /cart page~~ reviewed and aligned with the drawer 2026-10-04. Accelerated payment buttons hidden through the
   theme (cart footer buttons block, „Show accelerated payment buttons“, off); switch on only after the payment setup.
8. **Product-data checklist** for the owner using the fields the theme supports (see D and H).

## H. Owner how-tos (2026-10-04)

**Test the product enquiry form** (real Shopify data; never done yet):
1. Open a product on the preview link, pick a size and metal, click „Попитайте за това бижу“.
2. Fill name, your own email and a question; send. Expect „Благодарим ви…“ in place of the form.
3. In the store's notification inbox (Settings → Notifications → sender/recipient email) find the message: it should
   list Тема „Въпрос за бижу“, Бижу (title), Връзка (link with `?variant=`), Вариант (the size/metal chosen).
4. Open the link: it should land on the same variant. If nothing arrives, check spam, then the store email setting.
   Do the same once from Контакти.

**Add specification data to one real product:**
1. Settings → Custom data → **Products** → Add definition, namespace and key exactly: `custom.metal`, `custom.proba`
   (single line text), `custom.weight_g` (decimal), `custom.stone`, `custom.stone_count` (integer),
   `custom.stone_size`, `custom.stone_weight_ct` (decimal), `custom.cut`, `custom.dimensions` (single line text).
2. Settings → Custom data → **Variants** → the same keys for the per-variant fields: **`custom.metal`, `custom.proba`,
   `custom.weight_g`, `custom.dimensions`** (and stone fields only if the stone differs by variant).
3. On a product with **more than one variant**: fill metal, proba, weight and dimensions on **each variant** (Products →
   the product → a variant → Metafields). The product-level values of those four are ignored there by design, so a
   gold fineness can never show on a silver variant. Stone fields can be filled once on the product.
4. On a product with **one variant**: fill everything on the product.
5. Open the product on the preview, open „Качество и детайли“, switch variants: the rows should change with them.

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
| Size value „54 55“ | Ring variants | Correct to a single size |
| Prices €0 | Обеци, Висулка плочка, Гривна с червен конец | Set real prices |
| Vendor "Crown Jewellery" | All products | Use the field for stone or metal (cards print it) |
| No tags, product types empty or "earings" | All products | Stone tags (Циркон, Диамант…), types (Пръстени…) |
| Spec metafields empty | All products | Product definitions (Settings → Custom data → Products): `custom.metal`, `custom.proba` (text), `custom.weight_g` (decimal), `custom.stone`, `custom.stone_count` (integer), `custom.stone_size`, `custom.stone_weight_ct` (decimal), `custom.cut`, `custom.dimensions` (text), `custom.detail`. Where a variant differs (e.g. 14K vs 18K weight/fineness), create the **same keys under Settings → Custom data → Variants** and fill them per variant; the variant's value wins |
| Photographs with logo/slogan burned in | Bracelet; the ring's second photo | Replace (the first rule) |
| Variant pictures missing | Ring rose/white sizes 56-60, silver variants | Link pictures to every paired variant |
| 112 variants on one ring (only 28 reachable) | Ring | Consider one material option carrying swatches |
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

## G. Proposals awaiting the owner (2026-10-04, not built)

1. **Workshop story — one section, four slides (owner's brief 2026-10-04; proposal, not built).** Keep the current
   story band until the replacement is ready.
   - **Layout**: one band (scheme-6). Computer: square photograph left (~55%), text right — step label „Стъпка 1 от 4“,
     heading (Prata), one or two sentences, primary button, optional secondary link; under the text a step indicator
     (four short labelled bars, the current one filled) with ‹ › arrows. Phone: square photograph full width, text
     under it, indicator and arrows between photo and text; swipe left/right. Manual only (no autoplay); 0.4s
     cross-fade, instant under reduced motion. Region labelled „Как се ражда едно бижу“, slides „1 от 4“, polite
     live region, arrows and indicator are real buttons, ←/→ keys when focus is inside, Tab never enters hidden slides.
   - **Copy** (section heading „Как се ражда едно бижу“):
     1. **Наш собствен дизайн** — „Всяко бижу започва като наш 3D модел, създаден в ателието във Велико Търново.
        Затова можем да го изработим и с друг камък, метал или размер — специално за вас.“ → „Вижте пръстена“
        (`/products/пръстен-с-верижка`); secondary „Опишете своето бижу“ (custom-request band).
     2. **От модела към формата** — „Моделът се отпечатва на 3D принтер и се оглежда от всеки ъгъл, преди да стане
        злато или сребро. Така пропорциите са точни още преди метала.“ → „Вижте пръстените“ (`/collections/пръстени`).
     3. **Завършено на ръка** — „Златарите ни довършват всяко бижу на ръка, както работим от 1991 година. Това е
        гладкостта и блясъкът, които усещате, когато го носите.“ → „Вижте пръстена“ (`/products/пръстен-с-верижка`).
     4. **Готово за носене** — „Злато 585 или 750, сребро 925 с родиево покритие и камъни, оценени от специалист с
        квалификация от HRD Antwerp. Изработка и доставка: 5–20 работни дни.“ → „Разгледайте бижутата“
        (`/collections/all`).
   - Links checked 2026-10-04: only the ring is priced; Пръстени holds the ring; Дамски and Мъжки are empty (never
     linked). If the photographs follow a different piece, slides 1 and 3 link to that product instead.
   - **Photographs (4, real, square, ≥1600px, one light and background, nothing burned in), ideally all of one piece**:
     the piece's 3D model on the screen; its printed model (alone or beside the finished piece); a goldsmith's hands
     at the bench working on it; the finished piece worn on a hand/neck.
2. **Homepage order**: hero → trust band → selected pieces → **workshop story** (moved up: it is the reason to pay
   more) → categories → stones → reviews (only once real ones exist) → custom request → shop visit (address, hours,
   map, a photograph of the shop front) → newsletter. Social follow folded into the footer.
3. **Shop visit band**: the shop in Veliko Tarnovo as a trust signal for a high-priced purchase (address, hours,
   „Обадете се“), from facts already confirmed.

**Photographs needed** (real, nothing burned in): the atelier bench with hands at work; the 3D model on screen; a
printed model beside its finished piece; two or three finished pieces worn; the shop front and interior; packaging
once decided. Shot list in `photography/README.md`.

## F. Content and photography

- Photography per `photography/README.md` (pieces on one neutral tile, a worn picture last, details, the workshop).
- Real client reviews (with permission) for the reviews section; none invented.
- Opening-hours, address and phone are confirmed; repeat them consistently.
