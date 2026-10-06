# Cullinan Jewellery — Shopify theme

Entry point. Short on purpose: details live in `docs/` (see "What to read"). The full previous version of this file,
with every measurement and decision up to 2026-10-04, is preserved verbatim in `docs/archive/CLAUDE-original.md`;
search it when you need the reason behind something, do not load it by default.

## The business

Cullinan Jewellery: handmade 14K and 18K gold jewellery (and silver 925), made in an atelier in Veliko Tarnovo,
Bulgaria, trading since 1991. Physical shop at бул. Васил Левски 21. Roughly 4,000 designs exist (the owner's
figure; the old site, studio-cullinan.com, lists 2,038); a curated ~50 go online first.

- Customers: mostly Bulgarian women aged 30–55, buying for themselves or as gifts; local and regional first.
- **Goal (owner, 2026-10-04)**: an original, premium shop that makes the pieces desirable and lets Bulgarian customers
  buy with confidence. Cheaper pieces exist, but the good, more expensive pieces lead. No claim that design guarantees sales.
- Store currency EUR; customer-facing language Bulgarian; code, comments and commits in English.
- Instagram @cullinan_jewellery.bg; Facebook https://www.facebook.com/profile.php?id=61573474292352 (theme settings).
- The visible name comes from `shop.name`. Internal names `crown.css` / `newsletter--crown` are old identifiers; leave them.

## Facts the site may state

Only these, unless the owner confirms more. Never invent policies, prices, warranties, reviews or legal text.

- Since 1991; handmade in an atelier in Veliko Tarnovo; every piece starts as the atelier's own 3D model, finished by hand.
- Gold 14K (585) and 18K (750); silver 925, rhodium plated. Stones appraised by a specialist qualified at HRD Antwerp.
- Engraving on request (name, date or message); terms unknown.
- Made to order; making and delivery together take 5–20 working days (wording: „Изработка и доставка: 5–20 работни дни“); a piece can be made with another stone, metal or size.
- Delivery with Econt and Speedy to an office or address in Bulgaria. Cash on delivery is the **intended** method, but
  its checkout configuration is unverified and no online payment method is set up yet (`docs/tasks.md` A2): never
  claim online payments are ready.
- The atelier cleans and repairs pieces after a sale (terms unknown).
- Shop: бул. Васил Левски 21, Велико Търново; Mon–Fri 09:30–19:00, Sat 10:00–18:00, Sun closed. Phone +359 88 287 4895
  (shown as a call button, never printed as text).
- **Not confirmed, never claimed**: the returns policy for made-to-order pieces (the 14-day wording that exists is
  flagged, `docs/tasks.md`), free delivery or a delivery price, packaging, warranty, certificates with a piece,
  engraving price or limit, a named designer, a number of designs.

## What this repository is

A fork of Shopify's **Dawn 16**, connected to the store through the GitHub integration. **Pushing to `main` updates
the draft theme automatically.** The theme is **unpublished** and the store is private: never publish the theme or
launch the store.

## Working agreements

- Every change is a real edit, committed with a clear message and pushed to `main` in the same pass (no need to ask).
  End commit messages with the attribution line the session provides.
- **Ask first** before: publishing the theme, changing currency, anything affecting checkout or payments, activating
  payment methods, or legal/policy text. Legal pages are handled with an accountant.
- Before editing, read the files you will change and the ones that depend on them; state what you found, what you will
  change file by file, and any assumption. If a request is ambiguous and the answer changes the work, ask.
- After a change, say what changed and what deliberately did not.
- Keep the owner's explicit instructions; an earlier decision (the owner's included) may be reversed when it works
  against the goal, but record the reason and the way back in `docs/changelog.md` and tell the owner plainly.
- Verify on desktop and phone (Cyrillic, variants, forms, navigation, keyboard, overflow). **Report local checks
  (mocks, scripts) separately from checks on the real Shopify preview.**
- Product titles are descriptive; old catalogue codes belong in the SKU field.
- **Bulgarian copy (owner, 2026-10-04)**: natural, clear language that suits a jewellery atelier. No forced
  metaphors, no exaggerated promises, nothing that sounds translated from English.
- Keep detail in `docs/changelog.md`, not here.

## Shopify mechanics you must not skip

Full list in `docs/theme-guide.md` §1. The ones that have cost the most time:
- `git fetch` first; the theme editor commits back to `main` when the owner saves.
- A template that names a new setting, block type or select value must be pushed **after** its section, with a gap.
  Run `node tools/validate-templates.mjs` before pushing templates or section groups.
- Two to three minutes between pushes; re-send a dropped file with a byte changed.
- Pushed assets can be read at `https://2fp38p-az.myshopify.com/cdn/shop/t/2/assets/<file>?v=<anything>`; Liquid, JSON
  and locales can only be seen on a preview.
- Preview links expire; only the owner can make one. Current (2026-10-06):
  https://yq5ytqnq054fcn3l-107185537364.shopifypreview.com

## How we work

- Inspect before building; reuse working components; avoid unrelated refactoring; one focused stage at a time with a
  brief update.
- **Every element gets a short written specification before code.**
- Structure can exist before content, navigation cannot: never link to an empty collection (one flagged exception:
  `docs/tasks.md` §E).
- Build every image slot empty and make sure the layout holds; no placeholder graphics or stock images. AI images are
  allowed when the owner makes and uploads them. **Nothing is ever burned into a photograph.**

## References (choose per question)

Sources of ideas, never templates. Do not copy any brand's wording, imagery, code, signature identity or exact
homepage order. Observations such as "luxury sites use small prices" or "few sections" are not universal rules:
readability, accessibility, our customers and our actual products come first.

| Question | Useful references |
|---|---|
| Premium presentation, product pages, service | Tiffany & Co., Van Cleef & Arpels, Ole Lynggaard Copenhagen, Pomellato, Jessica McCormack |
| Shop mechanics (buy box, cart, gallery, carousels) | moonmagic.com |
| Customer guidance, trust, buying information (delivery, payment, replacement), buttons and motion | hestiahome.bg |
| What Bulgarian customers compare with, prices in euros | Kirkorian Diamonds, Aristo Jewellery, ASTO Gold, Pomellato's Bulgarian store |

Measurements from the 2026-10-04 research are in the archive ("Reference sites, looked at live").

## Design in one paragraph

Direction C, "Мрамор", with the palette of 2026-10-06: white page, warm greige and soft blush bands, a muted blush
footer, espresso ink, black buttons with white labels, **Prata** headings in
sentence case and **Jost** text (self-hosted with Cyrillic), square corners and square buttons, whole-number prices,
generous space. Deliberate exceptions (words over the hero photo, the ruby hero button, pure-black text in named places, brand-coloured
social buttons) are listed with reasons in `docs/design-system.md` §8. Things the owner likes
and wants kept: the colour circles on product cards, the material choice on the product page, the stones section,
the reviews section.

## What to read

| Task | Read |
|---|---|
| Any visual change (colour, type, buttons, spacing, imagery) | `docs/design-system.md` |
| Changing or adding a section, block, snippet or script | `docs/theme-guide.md` (and §1 before any push) |
| Why something is as it is; previous attempts | `docs/changelog.md`, then search `docs/archive/CLAUDE-original.md` |
| What to do next; owner decisions; admin data | `docs/tasks.md` |
| Photography | `photography/README.md` |
| Seeing swatches and buttons | Design System artifact https://claude.ai/artifact/FdjiCyjant7YY3qKoVoo9s (update it with `docs/design-system.md`) |

Do not read the whole archive into a session; open the part you need.

## Waiting on the owner (summary)

Returns policy for made-to-order pieces; free delivery and its terms; delivery price; engraving terms; packaging;
price range of the first fifty; which payment methods are enabled; product data and photographs. Details and the
Shopify-admin checklist: `docs/tasks.md`.
