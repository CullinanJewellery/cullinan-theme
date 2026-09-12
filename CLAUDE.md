# Cullinan Jewellery — Shopify theme

## The business

Cullinan Jewellery — handmade 14K and 18K gold jewellery, made in a family
atelier in Veliko Tarnovo, Bulgaria, trading since 1991. There is a physical shop at
бул. Васил Левски 21. Roughly 4,000 designs exist; only a curated ~50 will go online first.

- Customers: mostly Bulgarian women aged 30–55, buying for themselves or as gifts.
  Local and regional first, wider Bulgaria second.
- Instagram: @cullinan_jewellery.bg (still the old handle — unchanged by the rename)
- Facebook: https://www.facebook.com/profile.php?id=61573474292352 — a numeric profile URL,
  so it has no vanity name yet. Both links are theme settings, not code: Dawn renders each
  social icon automatically once its URL is filled in.
- **The name has changed three times and is back to Cullinan Jewellery (2026-09-12).**
  Crown Jewellery from 2026-09-06, then Doncheff Jewellery, now Cullinan again. The
  repository, its remote and the Instagram handle were never renamed, so they are correct
  once more. The visible name comes from `shop.name` — a Shopify setting, not a theme file.
  Internal code names (`assets/crown.css`, the `newsletter--crown` class) are from the Crown
  spell and were deliberately left alone: they are identifiers, not customer-facing, and
  renaming them a third time is churn with no visible gain.
- Store currency: EUR. Customer-facing language: Bulgarian.
- The old site (studio-cullinan.com, Zen Cart) is being replaced by this Shopify store.

## What this repository is

A fork of Shopify's **Dawn 16** theme, connected to the Shopify store through the GitHub
integration. **Pushing to `main` updates the theme in Shopify automatically.**

The theme is currently **unpublished (draft)** and the store is private. Do not publish
the theme or launch the store — that is the owner's decision, not an implementation step.

## How we work

Build in sections, top to bottom, one element per round. Homepage first — navigation, hero,
then each section in the order a visitor scrolls past it. Only when the homepage is finished
do we move to the templates: collection page, product page, cart, then the story pages.

The reference is moonmagic.com. Go and look at it before building each element — study the
structure, proportions, spacing, hierarchy and interaction. Take the patterns. Never take
their code, their images or their words; we are building Cullinan Jewellery, and the pieces that
make Cullinan Jewellery different (a workshop since 1991) are not on their site.

Photography comes last. Build every image slot empty and make sure the layout holds when
nothing is set. No placeholder graphics, no stock images, no AI-generated images anywhere.

Never link to an empty collection. Structure can exist before content; navigation cannot.

Each element gets a written specification before any code is written.

## Before you build

Read the files you are about to change, and the ones that depend on them, before
writing anything. Do not assume how something currently works — open it and look.

When a task references the live site or moonmagic.com, open them and compare
against what is actually there rather than working from memory or from a
description.

Before editing, state three things:
1. What you found when you looked.
2. What you intend to change, file by file.
3. Any assumption you had to make to proceed.

If the request is ambiguous, ask instead of guessing. A wrong assumption costs
more time than a question does.

After the change, say what you changed and what you deliberately did not change.

Work at the level of detail this project deserves: this is a real shop that will
take real money from real customers. Prefer reading one more file over guessing,
and prefer asking one more question over rebuilding.

## Design direction

The reference the owner chose is **moonmagic.com** — light, quiet, generous with space.
Not a copy of that site; the same qualities, applied to a Bulgarian goldsmith.

Rules that matter here:

- **Nothing is burned into a photograph.** No logo, no slogan, no badges, no "СРЕБРО 925"
  baked into the image file. Facts belong in the caption or the product description. This is
  the single most important rule on the project — the owner's previous marketing broke it
  constantly.
  - **One deliberate exception:** the homepage hero. Its heading, subtitle and button are
    live theme text laid over the photograph, centred, following moonmagic.com. Agreed
    2026-09-06. The photograph itself still carries no baked-in text, and this stays the
    only place on the site where words sit over an image.
- **Restraint reads as expensive.** Empty space is the main luxury signal. When in doubt,
  remove rather than add.
- **Gold comes from the photographs, not the interface.** The gold accent is muted and used
  sparingly (badges, small accents). Never gold gradients, never gold text on black.
- **No pure white or pure black.** Both read cheap on screen.
  - **One exception, at the owner's instruction (2026-09-10):** the newsletter band is
    `#000000`, matching the reference. It is set in `assets/crown.css`, not by a colour
    scheme, so nothing else on the site is affected.
- Product photography should be worn on real people where possible — jewellery is impossible
  to judge for scale on a white background.

## Design tokens (set in `config/settings_data.json`)

| Scheme | Background | Text | Use |
|---|---|---|---|
| scheme-1 | `#FCFCFB` warm off-white | `#221F1C` | Default. Page ground, product cards. |
| scheme-2 | `#F2F0EC` soft stone | `#221F1C` | Alternating sections. |
| scheme-3 | `#221F1C` warm near-black | `#F5F2EE` | Footer, dramatic bands. |
| scheme-4 | `#8C6A2E` deep muted gold | `#FFFFFF` | Badges and accents only. |
| scheme-5 | `#E7E1D6` warm sand | `#221F1C` | Feature blocks. |

- Type: **Playfair Display** for headings, **Montserrat** for body. Heading scale 100
  (100 is Dawn's minimum). Changed from Jost on 2026-09-08: Shopify's Jost carries no
  Cyrillic, so every Bulgarian letter fell back to the visitor's system font while the digits
  stayed in Jost — two faces inside one line. Both replacements have proper Cyrillic.
- **Any future font must be checked for Cyrillic before it is set.** The tell-tale is a line
  like "от 1991 година" where the digits look like a different typeface from the letters.
- Page width 1400. Grid spacing 24 horizontal / 40 vertical — the generous gaps are
  intentional and should not be tightened further.
- **Never let `templates/index.json` depend on a section setting added in the same push.**
  Shopify validates the template against the section schemas *it currently holds*, so a
  template referencing a setting whose section file has not landed yet is rejected — every
  time, on its own, and resetting does not help. Give the new setting a `default` in the
  section schema and leave it out of the template instead. This cost several rounds on the
  newsletter, where the section and the template were changed together.
- **Range values must sit on the step, not just inside the range — in templates too.**
  `padding_top: 70` looks harmless but Dawn's padding step is 4, so 70 is illegal and
  `templates/index.json` was refused from 2026-09-10 until 2026-09-11 because of it. The
  number came from measuring the reference without checking the step. Round to the step: 68
  or 72, never 70.
- **Theme settings have ranges, and Shopify rejects the whole file if any value is outside
  its range.** Heading scale was 95 and vertical grid spacing 48; the allowed ranges are
  100–150 and 4–40. Because of that `config/settings_data.json` was refused from the very
  first design commit until 2026-09-10, so the palette and fonts were never live — the site
  ran Dawn's stock settings the whole time. Worse, a rejected file blocks **every** file in
  that push ("0 succeeded, 1 failed"), so it also held back unrelated work. Check
  `config/settings_schema.json` for min, max and step before setting any range value.
- Square corners throughout (buttons, badges, variant pills, cards). No rounded pills.
- No borders around media. Product cards sit on the page ground, not in grey boxes.

## Working agreements

- **Save the work as we go.** Every change is made as a real edit in the repository (not
  described in chat), then committed with a clear message and pushed to `main` in the same
  pass. No need to ask for the push. This keeps VS Code, GitHub and the Shopify draft theme
  in step, so nothing is lost between sessions.
- Customer-facing copy is written in **Bulgarian**. Code, comments and commit messages
  in English.
- Product titles are descriptive, never catalogue codes. Old codes (e.g. `3353`) belong in
  the SKU field, not the title.
- Ask before publishing the theme, changing the store's currency, or touching anything that
  affects checkout or payments.
- Legal pages, tax and company details are being handled with an accountant. Do not invent
  legal text and present it as ready to use.

## Custom code

Anything of ours that is not a Dawn setting lives in these two places:

- `assets/crown.css` — our own stylesheet, loaded from `layout/theme.liquid` right after
  `base.css`. Dawn's stylesheets stay untouched so the theme can still be upgraded. Holds the
  hero button hover: solid fill that drops to transparent so the photograph shows through.
- **Atelier section.** `sections/atelier.liquid` with `assets/section-atelier.css`. Our own
  section, not a Dawn one. Two columns, 45/55, media side switchable. The media slot takes a
  Shopify-hosted video, a YouTube/Vimeo URL or a still, always at 4:5 portrait. Video is
  decorative and `aria-hidden` — every fact lives in the text. Under prefers-reduced-motion a
  small inline script removes the video outright and the poster still is what remains.
- **Category mosaic.** `sections/category-mosaic.liquid` with
  `assets/section-category-mosaic.css`. Four columns, tall tiles at each end spanning both
  rows, squares between — the block order drives it, because `grid-auto-flow: dense`
  backfills the squares around the tall ones. Captions sit **below** the image by default;
  "Over the image" is a setting, not the default, because the reference's dark scrim dulls
  gold photography and the hero is meant to be the only place words sit on a picture. Tiles
  without a destination render as tiles, not links.
- **Hero facts.** `sections/hero-facts.liquid` with `assets/section-hero-facts.css`. The
  short claims under the hero. Its own section, not Dawn's multicolumn — Dawn loads section
  stylesheets from inside the section, which puts them after `crown.css` in the document, so
  overriding multicolumn meant winning a specificity fight on every rule. Measured off the
  reference: a 1000px container rather than the full page width, items distributed across it,
  and the type shrinking on narrow screens so four claims stay on one line instead of
  wrapping or scrolling.
- **Benefits row.** `sections/icon-benefits.liquid` with `assets/section-icon-benefits.css`
  and `snippets/icon-benefit.liquid`. Four short promises under the product row. Each block
  takes either an uploaded image (contained, never cropped, no mask or border) or one of nine
  built-in line icons. The icons carry `vector-effect="non-scaling-stroke"` so the line stays
  1.25px however large they are drawn — a plain stroke-width would thicken as the 24-unit
  viewBox scales to 52px.
- **Image marquee.** `sections/image-marquee.liquid` with
  `assets/section-image-marquee.css`. Full-bleed band of square images drifting sideways,
  under the facts strip. The reference uses Swiper; this is a CSS marquee instead — no
  library, and it stops under prefers-reduced-motion. The track holds the same set twice and
  translates by -50%; each item carries its own trailing margin rather than the track using
  `gap`, which is what makes -50% land exactly on the repeat. Empty slots are flat squares.
- **Visual mega menu.** `snippets/header-visual-menu.liquid`, wired into
  `snippets/header-mega-menu.liquid` and `snippets/header-drawer.liquid`. Shopify menu items
  cannot carry images, so the items are `visual_menu_item` blocks on the header section. Each
  block names the top-level menu item it belongs to (matched on the title, case-insensitively,
  because `handleize` is unreliable for Cyrillic). A menu item with matching blocks opens the
  visual grid; one without keeps the text-column mega menu. Needs the header's desktop menu
  type set to **Mega menu**.
- **Weight.** `assets/crown.css` sets bold only where the eye needs an anchor: product card
  titles, sale prices, benefit headings, the atelier fact values, and the three claims under
  the hero. Display headings stay at regular on purpose — a high-contrast serif at 40px and up
  already carries the page, and bolding it shouts.
- `sections/image-banner.liquid` — writing `[years]` in the hero heading or text renders the
  number of years since `founded_year` (1991), so the count never goes stale.

## Current state

- Design foundation applied (palette, type, spacing). Committed and live on the draft theme.
- Homepage, working top to bottom: announcement bar, header and hero are built; the product
  row is built; the atelier block and newsletter are still Dawn's defaults.
- Dawn's placeholder illustration has been removed from the hero. An empty image slot now
  renders as a flat stone band at full height, so adding the photograph later changes
  nothing about the layout.
- **No real products yet. No photography yet.** The homepage cannot be finished until the
  atelier photo session happens.
- Bulgarian needs setting as the store's default language (currently English).
- **Settled 2026-09-07: both 14K and 18K.** The benefits row the owner wrote says "Проба 585
  и 750 — 14 и 18 карата злато", so the range covers both. The announcement bar and the atelier
  section still say 14К only, which understates it — worth widening when the copy is revised.
- **The old site is the best source for real copy.** It gives: founded 1991 as КУЛИНАН 96 ООД;
  the business is *производство* not resale; stones certified by an appraiser qualified at HRD
  Antwerp; diamonds, sapphires, emeralds, rubies; colour enamel; wholesale and retail; a shop
  that also carries Italian imports; and a gold-buying service. Its categories are Дамски
  бижута · Мъжки бижута · Брачни халки · Сребро, with пръстени, обици, гривни, висулки,
  колиета, комплекти, брошки, мъжки аксесоари listed in the About text.
- **Unresolved: is silver part of Cullinan Jewellery?** The old site sells silver (s3042, s1193com)
  but its About page says the shop does not. Affects the menu and the facts strip.

### Waiting on the Shopify admin

These cannot be done from this repository — menus, collections and the store name are store
data, not theme files:

- **Store name** → Settings → Store details. Reads Doncheff Jewellery; it needs to go back to
  Cullinan Jewellery. The header prints `shop.name` until a logo image is uploaded.
- **The "За нас" page.** `templates/page.about.json` exists and is ready. Create the page under
  Content → Pages, title "За нас", and pick the **page.about** template on it. Then add it to
  the Main menu. The prose in it is drafted from the old site's own About text and is editable
  in the theme editor.
- **Main menu** (Content → Menus → Main menu), in this order:
  циркони · диаманти · най-продавани · пръстени · обеци · висулки · гривни
- **Collections** to point those entries at — none exist yet.
- **Product Vendor field** carries the small line above the product title on the cards
  (where the reference prints the stone). Put the stone or material there — "Циркон",
  "Диамант", "14К злато" — not the brand name, or every card will read Cullinan Jewellery.
- **Product metafield `custom.detail`** (single line text) carries the italic line beneath it,
  where the reference prints a stone's meaning. Create it under Settings → Custom data →
  Products. Cards hide the line when it is empty.
- **Card swatches** come from a product option with swatches configured (Settings → Custom
  data, or the option's swatch values). Up to five are shown.
- **Photographs** are staged in `photography/` (see its README for naming and shapes). That
  folder is outside the theme directories, so Shopify never sees it, and the image files are
  gitignored — git is for the theme, not a photo library. Shopify's Files library has no
  folders, so filenames do that job: `prasten-3353-1.jpg` for catalogue, `theme-` prefix for
  anything the theme editor uses. Latin letters only; Cyrillic filenames break in URLs.
- **Product photography should be square.** The product rows are set to a square crop so the
  cards line up; anything shot to another shape will be cropped.
