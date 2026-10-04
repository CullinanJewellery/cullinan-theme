# Outstanding tasks

Kept current: remove an item when it is done (and add a line to `docs/changelog.md`). Three kinds of work are kept
apart: theme work we can do now, decisions only the owner can make, and Shopify-admin data.

## A. Known theme bugs

1. **Hero picture on phones does not fill its square** (found on the live preview, 2026-10-04). At 375px the image
   renders 422×913 inside a 375×375 slot, top-aligned, so the pendant is cut off and `object-position: 50% 70%` has
   no effect. Needs `width/height: 100%; object-fit: cover` on the phone hero image. The local mock hid it because
   the mock image was inserted with its own styles. *Next stage.*

## B. Theme work authorised (the owner's brief of 2026-10-04), next stage

1. **Product information**: make metal, fineness, weight, stone details and dimensions clear when supplied (reuse the
   `product_specs` metafields); make specs follow the selected variant where they differ (needs variant metafields;
   document the setup); never show generic text as a piece's specification.
2. **Ring-size guide** in Bulgarian, linked beside the size selector: the European system (size = inner circumference
   in mm), how to measure with a ring sizer, stated limitations; no promise of free resizing.
3. **Buying information** near the purchase controls (confirmed facts only), details in the accordions; distinguish
   production time from shipping time if the business confirms the split; consistency between product page, cart and
   footer; payment icons only for methods actually enabled. The footer draws Shopify's icons for the enabled methods automatically (`payment_enable`); on the preview (2026-10-04) it shows **PayPal only**, and cash on delivery has no icon.
4. **Product-specific enquiry**: an "ask about this piece" route that carries the product name and link (the
   custom-request section already adds `contact[Бижу]` on product pages; place it or link to it).
5. **Workshop story** with confirmed facts and suitable existing images (no text in photographs).
6. **Homepage review** around: what we sell, why trust us, how to choose, how to order; occasions only where real
   products and collections exist.
7. **The /cart page** in the site's own design (now checkable on the preview).
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
| Which payment methods are enabled (preview footer shows PayPal only) | Icons follow Shopify automatically; confirm PayPal is intended and whether cards are | Footer, payment tab |
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
| Spec metafields empty | All products | `custom.metal`, `custom.proba`, `custom.weight_g`, `custom.stone`, `custom.stone_count`, `custom.stone_size`, `custom.stone_weight_ct`, `custom.cut`, `custom.detail` |
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

## F. Content and photography

- Photography per `photography/README.md` (pieces on one neutral tile, a worn picture last, details, the workshop).
- Real client reviews (with permission) for the reviews section; none invented.
- Opening-hours, address and phone are confirmed; repeat them consistently.
