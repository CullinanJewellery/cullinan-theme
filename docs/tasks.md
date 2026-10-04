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
   (Customize → product → Variant picker → Ring size guide). It says sizes are the inner circumference in mm, as the
   brief asked; the FAQ's own ring-size answer deliberately never mentions mm (an earlier owner remark), so the two
   are worded differently — say if they should match.
3. ~~Buying information~~ done 2026-10-04 as far as confirmed facts allow: engraving line added; delivery tab says
   office or address and "another stone, metal or size". Still open, needing the owner: whether „5–20 работни дни“
   is production + shipping or shipping only; the cash-on-delivery lines (A2); the returns sentence (C); the
   „Качество и детайли“ prose is general (585 or 750) until per-product metafields are filled.
   Original brief: **Buying information** near the purchase controls (confirmed facts only), details in the accordions; distinguish
   production time from shipping time if the business confirms the split; consistency between product page, cart and
   footer; payment icons only for methods actually enabled. The footer draws Shopify's icons for the enabled methods automatically (`payment_enable`); on the preview (2026-10-04) it shows **PayPal only**, and cash on delivery has no icon.
4. ~~Product-specific enquiry~~ done 2026-10-04 (enquiry band + buy-box link; theme guide §4). **No test message has
   been sent** from it (or from Контакти): send one from the preview and check the store inbox before launch.
5. **Workshop story** — proposal given to the owner 2026-10-04, **awaiting approval** (see G).
6. **Homepage review** — proposal given to the owner 2026-10-04, **awaiting approval** (see G).
7. ~~The /cart page~~ reviewed and aligned with the drawer 2026-10-04. Flagged, not changed: Shopify's express
   buttons (Shop Pay, PayPal) under the checkout button, shown because those methods are partly enabled (A2).
8. **Product-data checklist** for the owner using the fields the theme supports (see D).

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
| Production vs shipping time split | "5-20 working days" is stated as one figure | Delivery note, tabs |

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

1. **Workshop story ("Как се ражда едно бижу")**: a homepage band replacing the current three-facts story band,
   in four steps with a real photograph each — the 3D model on screen, the printed model, the goldsmith's hands at the
   bench, the finished piece — each with one confirmed sentence; button to За нас. Same four photographs reused on За
   нас's design panel.
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
