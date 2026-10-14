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
- White gold: polished, then rhodium plated as the last step, which makes it shine more; yellow and rose gold are
  polished (owner, 2026-10-12, from the atelier). Material cards may say each gold is „създадено да запазва
  блясъка си“ (owner's own wording, 2026-10-12).
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
- Preview links expire; only the owner can make one. Current (2026-10-11):
  https://jlvya0buqs9hywvd-107185537364.shopifypreview.com

## How we work

- Inspect before building; reuse working components; avoid unrelated refactoring; one focused stage at a time with a
  brief update.
- **Every element gets a short written specification before code.**
- Structure can exist before content, navigation cannot: never link to an empty collection (one flagged exception:
  `docs/tasks.md` §E).
- Build every image slot empty and make sure the layout holds; no placeholder graphics or stock images. AI images are
  allowed when the owner makes and uploads them. **Nothing is ever burned into a photograph.**

## Product photo standard (owner, 2026-10-13)

The owner's model for every product photo is **ring A, „Пръстен с топчета“** (its yellow gold main photo is "perfect").
Every piece, in every metal, must look like that set: same background, light, shadow, size, centring and gold colour.
**Workflow (owner, 2026-10-14): `photography/workflow.md`.** Before every piece read `photography/staging.md` (how real
jewellery sits and is photographed, every kind) and `photography/lessons.md`; fill a sheet in `photography/pieces/`
from **every** raw photo examined zoomed in (counts of stones, beads, prongs; where rhodium starts and stops; what the
inside shows) and **ask the owner about anything not certain before spending a credit** (ring C: three stones drawn,
it has five). Prompts in `photography/prompts/`; check every result with `photography/check-photo.cjs` and by eye;
log each call in `photography/log/`; add new lessons after each piece. **Make yellow 01 first and wait for
the owner's OK** (comparison sheet: `photography/compare-sheet.cjs`) before the other four; raw photos by
`photography/raw-photo-guide.md` (Bulgarian, for the shop); the owner uploads with `photography/upload-checklist.md`. **Physically real**: stones face outward from
the metal; from inside a band only the small holes behind the stones show; stone rings lying down are tilted back
with the stones facing the camera (moonmagic).
Full recipe with the exact Higgsfield prompts: `photography/README.md` „Product photos: the ring A standard“. In short:
- **Editing is done in Higgsfield** (nano_banana_2, then upscale_image 4K); locally only crop, measure, copy.
  Exceptions the owner approved on 2026-10-14: `photography/gold-match.cjs` moves only the yellow gold to ring A's
  measured gold (no model hit it); `frame-photo.cjs` may extend a flat off-white border by copying its edge; and
  **white and rose are made with `photography/metal-swap.cjs` from the finished yellow photo**, changing only the
  metal's colour ("i just need the color to change, nothing else": a model's colour change redraws the whole photo).
- **Background** flat seamless off-white #FCFBFC edge to edge; **shadow** soft neutral grey, falling to the left, with
  a thin darker contact shadow; no gold tint on the floor.
- **Never change the jewellery (owner, 2026-10-13: "I did not say to change the jewelry")**: an edit changes only
  what the owner asked for (a colour, the background, the shadow). The piece stays exactly as it is in the photo being
  edited: same design, every ball and granule, thickness, size, angle and position. Check every result against the
  photo it came from, not only against the colour asked for.
- **Parts that are the same stay the same (owner, 2026-10-14)**: equal beads, stones, cups or links are equal in the
  photo; perspective may make the farther ones a little smaller, never bigger. Ring C's photo with bigger beads at
  the ends than beside the middle stone was rejected: "it is just making it worse".
- **Rhodium is clearly seen (owner, 2026-10-14: "that is why it is put on the jewelry")**: wherever the atelier put
  rhodium (e.g. the frame round each stone), it shows as a clear white area in every photo, never a hairline.
- **Everything sharp (owner, 2026-10-14)**: the whole piece in focus, like a focus-stacked catalogue photo, never a
  shallow depth of field. The models blur the ends and the back on their own, so every prompt says so and
  `check-photo.cjs` compares the ends' sharpness with the centre.
- **Stones: ask the owner what they are** before the first prompt for any piece with stones (ring C: zircons), so
  the photo shows that stone, never a random one (owner, 2026-10-14).
- **Gold**: rich, warm, deeply polished 18K yellow (ring A's main photo is the colour reference). **Rose gold** matches
  ring A's rose. **White gold is a clean, neutral, bright white, no yellow, beige or champagne cast** (owner,
  2026-10-13: both rings' white looked yellowish; measured blue 13–20 below red). New metals are made from the
  finished yellow photo of the same piece.
- **Five photos per piece (owner, 2026-10-14)**: yellow gold 01 standing (three-quarter view), 02 lying flat seen
  from above at 45°, 03 worn on a hand on ivory linen; white gold and rose gold 01 standing only. Silver uses the
  white gold photo. (Rings A, B, C were made with all three photos in every metal, before this.)
  **Rings with stones (owner, 2026-10-14 „A“): four photos, no standing one.** The main photo lies flat like
  moonmagic's stone rings (seen from the front a little above, stones on the front edge facing the camera); then the
  hand; white and rose are made from the lying photo with `metal-swap.cjs` (free). **The look is Nano Banana 2.1's** (owner, 2026-10-14: ring C's
  job 1716a697 has the right gold, shadows and quality; the GPT Image 2.5 + `gold-match.cjs` photo did not). Ask for a
  raw phone photo of the piece lying flat (raw-photo guide) so the model copies the real layout
  (`photography/prompts/02-yellow-lying.md`, lesson 29). Name the stone type in prompts (ring C: clear,
  sparkling zircons, never milky). Yellow gold is never repainted with GPT Image 2.5 (it dulls the polish): a failed
  yellow is made again, and a photo the checker fails is never sent to the owner (`photography/lessons.md` 16–18).
- **The frame (owner, 2026-10-13: the same size and position for every piece)**: ring A's, applied by
  `photography/frame-photo.cjs` to every finished 4K file, never by eye. 01 standing: the piece is 80.7% of the
  height, centred at 50% across / 51.3% down. 02 lying flat: 78% of the width, centred at 50% / 50.8%. 03 on the hand:
  not cropped. Output 2048 × 2048. Let Higgsfield make the piece smaller in the picture (about half the height) and
  let the script enlarge it: a piece generated large looks heavy (owner: ring B looked "fat").
- **On the hand the ring must look fine and real-sized** (about 1.2–1.5 mm band for a slim ring), never chunky or
  rough (owner, 2026-10-13).
- **Yellow gold must be ring A's gold every time** (owner, twice): after any yellow photo, measure the gold against
  ring A's main photo (about RGB 208, 165, 114); if it is off, run `photography/gold-match.cjs` (owner's choice,
  2026-10-14; Higgsfield gold edits went pale, brass or copper and dulled the polish, lessons 13–16, 27).
- **Design**: only from the owner's real photos of the piece; the style picture is never used as the design source
  (ring A's design leaked into ring B's hand photo once).
- Folders: `Pictures/PicturesForWebFaceInstagram/pictures for the website/NN Name - номер предстои/{metal, видео, чернови}`.
- **Credits: about 11.5 per piece, at most 18, finals at 4k (owner, 2026-10-14: "spend for the 9 pictures like 18
  credits"; then: "they need to be 4k, the quality looks better")**. Higgsfield Plus plan, 1,200 credits a month
  (since 2026-10-14; Starter, 270 a month, from 2026-10-06); check the balance before starting. Prices at 4k: Nano Banana 2/2.1 **3**, GPT Image 2.5
  (`gpt_image_2_5`, quality medium) **1.25**; at 2k 2 and 1; upscale 2 (not used: finals are made at 4k).
  The way, 5 photos at 4k (owner's choice 2026-10-14):
  1. The three yellow photos (standing, lying flat, hand): Nano Banana 2.1 at 4k, the piece from the raw photos and
     ring A's photo as style and gold reference in one step, piece at about half the height: 3 × 3 = 9.
  2. White and rose standing photos: GPT Image 2.5, medium, 4k, only the yellow standing photo as input, the colour
     in words: 2 × 1.25 = 2.5. Tested 2026-10-14 on ring C (at 2k): the ring identical to 0.001 of the frame, the
     rose equal to the approved one (222, 163, 144 vs 224, 160, 145), clean background.
  3. Silver: free copy of white. Total **11.5 credits**; up to 18 with corrections. Stop and tell the owner before
     going over 18. Plus (1,200 a month, €59) gives about 90–100 pieces; Starter
     (270 a month) gave about 20–23.
  Measure every result before the next step. Tell the owner the cost before a set and the credits used after it.
  History: ring B took about 133 over four rounds, ring C about 45; both before this budget.

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
