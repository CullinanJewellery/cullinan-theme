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
nothing is set. No placeholder graphics and no stock images. **AI-generated pictures are
allowed:** the owner decided on 2026-09-15 to use them (the Контакти banner’s marble is one),
replacing the earlier “no AI-generated images anywhere”. The owner chooses and uploads them.

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
    2026-09-06. The photograph itself still carries no baked-in text. (No longer the only
    such place -- one more exception follows below.)
    - **On phones the words sit below the photograph** (2026-09-14, at the owner’s request,
      as the reference does): the hero’s own "content below image on mobile" setting is on.
      The photo slot is a full-width square, then the heading, text and a full-width black
      button on a sand panel (the hero’s colour scheme is scheme-5, which only paints on
      phones; the desktop box stays transparent). Measured to the reference at 390px: 16px
      text, a 350 x 52 button with 16px capitals, 10px and 20px between the parts. The rules
      are in the phone hero block of `assets/crown.css`, one class more specific than
      Dawn’s, because Dawn’s stylesheet loads after ours.
  - **Second exception, at the owner’s instruction (2026-09-15):** the Контакти page banner
    („Как можем да помогнем?“). The owner asked for a picture behind it, as on the reference’s
    contact page, so its heading and text sit over a background picture once one is uploaded.
    The picture itself still carries no text. No other place gets words over an image -- the
    footer’s own Контакти picture, below, is a strip of its own, not a background behind words.
- **Restraint reads as expensive.** Empty space is the main luxury signal. When in doubt,
  remove rather than add.
- **Gold comes from the photographs, not the interface.** The gold accent is muted and used
  sparingly (badges, small accents). Never gold gradients, never gold text on black.
- **No pure white or pure black.** Both read cheap on screen.
  - **One exception, at the owner's instruction (2026-09-10):** the newsletter band is
    `#000000`, matching the reference. It is set in `assets/crown.css`, not by a colour
    scheme, so nothing else on the site is affected.
  - **Second exception, at the owner’s instruction (2026-09-14):** dark buttons are pure black
    `#000000` with pure white `#FFFFFF` text. Set as the button colours of schemes 1, 2 and 5 in
    `config/settings_data.json`, so every dark button matches, and the cart count bubble with
    them. The light buttons of schemes 3 and 4 and the newsletter’s sand button are unchanged.
    The homepage teaser bands have buttons in a dark shade of their own colour instead, with
    white labels, at the owner’s request the same day: taupe `#5B5548` on scheme-6, moss green
    `#3D5229` on scheme-7.
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
| scheme-6 | `#F5F4F0` light greige | `#221F1C` | The reference’s band colour. Нашето вдъхновение on the homepage. Buttons `#5B5548`. |
| scheme-7 | `#D8DFBF` milky matcha | `#221F1C` | Нашите материали on the homepage. Owner’s choice, 2026-09-14. Buttons `#3D5229`. |
| scheme-8 | `#F1E3DC` marble blush | `#221F1C` | Контакти: open-row panels and the footer’s Facebook/Instagram hover, matched to the banner picture (2026-09-15). Black buttons. |

- Type: **Jost** for everything since 2026-09-14: headings bold (700), text regular (400).
  The owner first chose EB Garamond with Inter (option D), then the same day asked for the
  font of hestiahome.bg (option E). hestiahome loads Shopify’s Jost, so its Bulgarian
  actually shows in the visitor’s system font (Arial on Windows); the owner was shown real
  Jost with Cyrillic beside that Arial look, and chose real Jost. Heading scale 100 (100 is
  Dawn’s minimum). History: Shopify’s Jost until 2026-09-08, then Playfair Display and
  Montserrat, then EB Garamond and Inter for part of a day. Before 2026-09-14 no Bulgarian
  letter ever showed in the chosen font (see the correction below).
  - **Self-hosted, not from the font library.** `snippets/theme-fonts.liquid` declares six
    woff2 files in `assets/`, `font-jost-{normal,italic}-{cyrillic,latin,latin-ext}.woff2`,
    from Google Fonts under the SIL Open Font License, with `unicode-range`. It preloads the
    upright Cyrillic and Latin files (about 37 KB together) and overrides Dawn’s `--font-*`
    variables. It is rendered after the `{% endstyle %}` in `layout/theme.liquid`,
    `layout/password.liquid` and `templates/gift_card.liquid`, none of which load library
    fonts any more. The EB Garamond and Inter files were removed when Jost went in.
  - The family name is "Jost Theme", so Shopify’s Latin-only "Jost" can never be matched
    instead.
  - The Typography font pickers in the theme editor name Jost but no longer change anything;
    a note in the editor says so. The size sliders still work.
  - The files cover weights 300–700, which is every weight the CSS uses. A heavier weight
    means new files.
  - **Changing the font later:** get the Cyrillic, Latin and extended Latin woff2 files from
    Google Fonts, replace them in `assets/`, and update the snippet. Picking a font in the
    editor will not do it.
- **Any future font must be checked for Cyrillic before it is set.** The tell-tale is a line
  like "от 1991 година" where the digits look like a different typeface from the letters.
- **Correction, 2026-09-14: no font in Shopify’s library carries Cyrillic.** Tested on the files
  Shopify actually serves, not the originals: a temporary section read each font’s real file
  through the Section Rendering API, and each file was loaded and measured against two
  different fallbacks. Playfair Display and Montserrat, the fonts set, and Cormorant, EB
  Garamond, Oranienbaum (a Cyrillic-first design), Tenor Sans, Manrope, Inter, Source Sans Pro
  and Lora all render Latin and digits and not one Bulgarian letter. Shopify serves one file
  per font with no Cyrillic part. So since 2026-09-08 every Bulgarian word has shown in the
  visitor’s system fonts (Times New Roman for headings and Arial for text on Windows), and the
  line above saying the replacements have proper Cyrillic was never true on Shopify. Choosing
  another library font cannot fix it. The originals on Google Fonts do carry Cyrillic (checked
  for all of the above plus Cormorant Garamond, Prata, Raleway and Forum, all SIL Open Font
  License), so proper Bulgarian needs the font files in the theme’s own `assets/`, declared
  with `@font-face`. Self-hosted rather than linked from Google, which would send every
  visitor’s IP address to Google.
  - Resolved the same day, on a comparison page showing each option on a miniature of the
    site (https://claude.ai/code/artifact/5976300a-b593-44d3-9036-34c2335af468): option D
    first, then option E, Jost, which is installed as above. Bulgarian was re-tested in Jost
    at 300, 400, 600 and 700.
- Page width 1400. Grid spacing 24 horizontal / 40 vertical — the generous gaps are
  intentional and should not be tightened further.
- **Never let a template depend on a section setting added in the same push.**
  Shopify validates the template against the section schemas *it currently holds*, so a
  template referencing a setting whose section file has not landed yet is rejected — every
  time, on its own, and resetting does not help. Give the new setting a `default` in the
  section schema and leave it out of the template instead. This cost several rounds on the
  newsletter, where the section and the template were changed together.
- **Two pushes is not always enough — the validator lags behind the file.** On 2026-09-12
  `main-page.liquid` gained a `show_title` checkbox in one push and `page.about.json` set it
  to `false` in the next. The section file was confirmed live first, and the template was
  still refused; it sat on the previous version for a quarter of an hour while every value
  in it was legal. The same template re-pushed later synced in under ten seconds, unchanged
  in substance. So the schema Shopify validates against catches up minutes after the file
  does. Push the section, do something else, and reference the setting later.
- **Read the padding a section renders, not the first number in it.** Dawn emits the mobile
  rule first at `value × 0.75` and the desktop value inside a `min-width: 750px` query, so a
  section set to 80 prints `padding-top: 60px` first. A sync check that greps the first match
  reads a healthy push as a failure — which is exactly what happened above and is what sent
  the diagnosis chasing a stalled pipeline that was never stalled.
- **Shopify serves CSS minified, so search it for tokens without spaces.** On 2026-09-13 a
  check for `text-wrap: balance` in the served `crown.css` came back empty for eight
  minutes, while the file had been live within seconds as `text-wrap:balance`. Class names
  and values such as `12.7vw` survive minification; anything with a space after a colon
  does not. Match `text-wrap: ?balance`, or a selector, not the source formatting.
- **Preview links expire.** On 2026-09-14 the share link
  (https://07prfzze1nr7klqc-107185537364.shopifypreview.com) started answering “This preview link
  has expired”, so pushes could not be checked. Only the owner can make a new one: Online Store →
  Themes → the draft theme → Preview → Share preview. Ask for it as soon as the old one fails.
  The owner sent a new one on 2026-09-15: https://o9kwivtmudx0bw6x-107185537364.shopifypreview.com.
  Until a new link arrives, a local mock-up from the theme’s real stylesheets (served by a
  throwaway Node server, never committed) is a usable stand-in for layout; it was exact to the
  pixel for the header once the new link allowed a comparison.
- **Wait for one push to reach the preview before sending the next.** Twice on 2026-09-14 a
  push that followed another within a minute never reached the theme, while the push before
  it synced at once: `templates/index.json` 13 seconds after a section push (still missing
  after four and a half minutes), and again 38 seconds after a stylesheet push (missing after
  two). Each time the same file, re-sent on its own with a byte change, was live within
  seconds. GitHub had every commit; Shopify never applied the second push, and a dropped file
  stays stale until it changes again. So when a change needs two pushes (see the validator
  lag above), check the first on the preview before sending the second.
  - **Seeing the first push live is not enough; leave two minutes.** A third drop on 2026-09-15:
    `templates/page.contact.json` went out 58 seconds after a `config/settings_data.json` push that
    was already live on the preview, and still never arrived; the same file re-sent on its own
    69 seconds later landed at once. Whatever Shopify is still doing with a push, the preview
    does not show it. Wait two minutes between pushes, and re-send with a byte change if a file
    has not landed after 40 seconds.
  - The first re-send also changed the button link from percent-encoded
    (`/pages/%D0%B7%D0%B0-%D0%BD%D0%B0%D1%81#vdahnovenie`) to plain Cyrillic
    (`/pages/за-нас#vdahnovenie`), on the guess that the encoding was refused. The second drop
    made the timing the likelier cause. Plain Cyrillic with a `#anchor` is proven to sync, as
    are the category tiles’ `/collections/пръстени` links, so keep writing links that way.
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
  - **One exception, at the owner’s instruction (2026-09-13):** the jump links at the top of
    the About page are rounded pills with each icon in an off-white circle, following the
    reference. Every other control keeps square corners.
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
  Shopify-hosted video, a YouTube/Vimeo URL or a still, always square (4:5 portrait until 2026-09-14). Video is
  decorative and `aria-hidden` — every fact lives in the text. Under prefers-reduced-motion a
  small inline script removes the video outright and the poster still is what remains.
  - **On the homepage it no longer tells the atelier story** (2026-09-14, at the owner’s
    request: keep the design, lead to the inspiration story). Eyebrow Нашето вдъхновение, the
    question „Знаете ли откъде идва името ни?“, two sentences saying a diamond found in 1905
    gave the business its name, without naming it, and a button „Открийте историята“ to
    `/pages/за-нас#vdahnovenie`. The wax-model heading and
    the three facts (1991, 14–18К, Велико Търново) were removed with the atelier story. The
    section is still called Atelier in the editor and keeps its atelier defaults in the schema.
  - The link has been a black button since then, styled like "view all" under the product row
    (34rem × 6.4rem, 14px capitals, the fill drops to an outline on hover, full width on
    phones). It still renders only when both its text and its link are set.
  - **A second one, directly under it, leads to Нашият дизайн** (2026-09-14, at the owner’s
    request, picture on the right): section key `design_teaser`, eyebrow Нашият дизайн,
    „Как се ражда едно бижу?“, idea → model → 3D printer → „и това е само началото“, and a
    button „Вижте как го правим“ to `/pages/за-нас#dizain`. The reference sets consecutive
    blocks like these on alternating sides.
  - **A third, for Нашите материали** (2026-09-14, at the owner’s request, picture on the left
    again): key `materials_teaser`, „Кое злато е за вас?“, gold of 14 or 18 carats, silver and
    stones, „Едни са за всеки ден, други — за бижу с особено значение.“ (the materials block
    answers it: 14 carats for every day, 18 for pieces with special meaning), and a button
    „Открийте разликата“ to `/pages/за-нас#materiali`.
  - **Coloured bands** (2026-09-14, at the owner’s request, after the reference’s “Soulful
    jewelry” band): Нашето вдъхновение sits on scheme-6, the reference’s `#F5F4F0`, and
    Нашите материали on scheme-7, milky matcha `#D8DFBF` (the owner first picked the greener
    `#C9D4A3` over it, asked for lighter, saw `#D0DAAF`, then settled on this one). Нашият
    дизайн stays on the page ground, as the owner asked. With the bands
    marking the edges, all three have the same space above and below: 88px at first, 56px
    since the owner asked for smaller boxes the same day (together with the square picture
    slot, a block went from 871px to 668px tall at 1440px). When they shared one ground they
    had 88/64, 24/64 and 24/64, which would have left Нашият дизайн 24px under a band.
  - On any scheme but scheme-1, `section-atelier.css` shades the empty picture slot from the
    band colour (the stone block is 3 levels from `#F5F4F0`) and sets the eyebrow and
    paragraph at 75% of the text colour instead of 62%: 62% is 4.1:1 on matcha, 75% is 6.0:1.
  - **Page background at the outer edges** (the owner found the bands touching the benefits row
    and the newsletter): Space above 40 on Нашето вдъхновение and Space below 40 on Нашите
    материали, 30px on phones. It was 20 (15 on phones) at first, “just a little”, until the
    owner asked for more the same day. These are the section’s own margin settings, added for
    this; padding would have coloured the gap. The bands still meet the middle block, and the
    reference leaves 20px between its own consecutive coloured blocks.
  - **Each band’s button is a dark shade of the band’s own colour** (2026-09-14, at the owner’s
    request; the middle block keeps black). Matcha band: moss green `#3D5229`, chosen over an
    olive `#4B5A2E` (read as khaki) and a forest `#2E4128` (read as black). Нашето вдъхновение:
    taupe `#5B5548`, the band’s `#F5F4F0` made dark, chosen over a khaki `#6B6447` and a deeper
    `#4A463E`. It briefly had the green as well, until the owner explained that the green was
    the example of the idea, not a colour for both bands. Set as the button colour of schemes 7
    and 6. The hover is the same as on every other button: the fill drops away and an outline
    and label in the button colour remain. White is 8.6:1 on the green and 7.4:1 on the taupe;
    the hover labels are 6.2:1 on matcha and 6.7:1 on `#F5F4F0`.
  - **Media on the right mirrors the columns** (55fr 45fr). Before, `order` alone moved the
    media into the wider track, so the right-hand version had a 680 × 850 picture against
    556 × 695 in the left-hand one.
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
  the hero. Headings are bold (700), as on the board the owner chose. Every heading rule reads
  `--font-heading-weight` instead of a number, so the weight is set once, in
  `snippets/theme-fonts.liquid`. Product card titles and benefit headings stay at 600; the
  benefit headings use the text face’s variables, as small capital labels do.
  - **The header menu categories are 700** (since 2026-09-15; the desktop inline menu only).
    They were 600 from 2026-09-14, when 700 beside the spaced-capital wordmark outweighed the
    shop name; once the name became a logo image the owner asked for them bold again. The
    phone drawer and the mega menu links keep their weight — the owner asked about the menu
    in the header bar.
- `sections/image-banner.liquid` — writing `[years]` in the hero heading or text renders the
  number of years since `founded_year` (1991), so the count never goes stale.
- **Top bar.** `sections/announcement-bar.liquid`, `snippets/header-drawer.liquid` and the
  announcement block in `assets/crown.css`. Follows the reference: from 990px up (where the
  inline menu starts) both arrows sit together on the left, the message follows left-aligned,
  and utility links sit on the right. Below 990px the message is alone, centred and rotating,
  and the links move to the bottom of the menu drawer under the categories. The links come
  from **one menu**, picked in Theme settings → Top bar; left empty, the menu with the handle
  `top-bar` is used. It is a theme setting rather than a section setting because the header
  section, which renders the drawer, cannot read the announcement bar’s settings.
  - The **Top bar** menu exists (2026-09-13) and holds За нас, which is no longer in the Main
    menu, and since 2026-09-15 Контакти after it. Message 11px, bar 33px on desktop, both
    smaller than the reference at the owner’s
    request; За нас stays 13px and underlines on hover.
  - The left-aligned layout only switches on when that menu has links; without them the bar
    keeps Dawn’s centred layout.
  - On phones the arrows hide only while the bar rotates by itself. Visitors who ask for
    reduced motion keep them, because Dawn stops the rotation for them.
  - Bar text uses the body face variables, not the heading ones — the reference sets its bar in its body face.
  - The message padding is uneven on purpose (0.9rem over 0.7rem): even padding left the capitals
    2px above the arrows’ centre. Check with measured cap height, not the line box. Re-measured
    after each font change, most recently to Jost: still level.
  - Two messages, as the owner chose on 2026-09-13: Безупречно качество до детайла · Лична
    грижа за всеки клиент. The first is the reference’s "premium quality in every piece" idea
    in our own words; the second is the owner’s "грижа за клиентите", made personal. Earlier
    lines (14К и 18К злато, engraving, Еконт и Спиди, Майсторство от 1991 г.) were removed at
    the owner’s request, not for being wrong. No free delivery, returns or
    cash-on-delivery promise until those policies exist. Each fits one line on a 360px phone at
    11px (the longest measures 287px of 300); a longer message pushes the phone bar to two lines.
  - Social icons and the country/language selectors in the bar are off. Turning either on
    means revisiting the grid, which only has slots for the message and the links.
  - **The bar and the header slide away scrolling down and come back scrolling up**
    (2026-09-15, at the owner’s request: “not in the moment I scroll but a little bit later”).
    From 2026-09-14 they stayed on screen all the time, as the reference’s do. The script at
    the end of `sections/announcement-bar.liquid` sets `html.sticky-bars-hidden` after 150px of
    scrolling down (and past the bars’ own height), and clears it after 10px up, near the top,
    or when keyboard focus comes into either bar; nothing hides while a `details` in the
    header is open (menu drawer, mega menu dropdown, search). `assets/crown.css` then moves both
    up by their combined height in 0.3s (no animation under reduced motion). Tested on the
    preview at 375 and 1440px: nothing at 120–140px, both fully off screen after 150px, back on
    a 15–40px scroll up, kept while the search was open.
    - The header stays Always sticky in `sections/header-group.json` (it was “on scroll up”
      before 2026-09-14), which keeps Dawn’s own hide-on-scroll out of the way; ours hides the
      bar with it. The bar sticks at the top and the header right under it at
      `--announcement-bar-height`. The same script measures it, and `--header-height` too, with
      ResizeObservers, because Dawn measures the header only once. `html` gets
    `scroll-padding-top` of bar plus header, so jump links (the About page buttons, the
    homepage teaser buttons) stop below them instead of under them.
- **Header height.** The header section’s padding is 12px top and bottom (Dawn’s default is
  20), set in `sections/header-group.json`, at the owner’s request for a smaller bar
  (2026-09-14). From 990px the bar is 68px (was 84): 12 + the icons’ 44px tap areas + 12.
  Dawn halves the padding below 990px, so phones get 6px; there the two-line wordmark is the
  tallest thing in the bar, which measured 63px on a 375px phone (was 71). The name, menu text
  and icons kept their sizes. The reference’s bar is 59px at 1440px.
  - **Phones are more compact since 2026-09-15** (the owner’s request, the black bar left as it
    was): 47px on a 375px phone instead of 57, against the reference’s 46. Below 750px
    `assets/crown.css` sets the logo 112px wide (it filled a 140px cell), the icons 17px instead
    of 20 (the bag 37.4px instead of 44 — it is drawn inside a 40-unit box), their tap areas
    40px instead of 44, and 3px above and below instead of 6. Tablets from 750px keep Dawn’s
    sizes.
  - **Centred on the capitals** (2026-09-14, the owner said the contents looked a little high).
    The icons were centred, but capitals have no descenders, so the name sat 1.5px above centre
    (1.9px on a phone) and the menu words 1.1px. `assets/crown.css` moves only the text: the
    name 2px and the menu words 1px, as `position: relative` offsets on the text spans. Now
    all within half a pixel of the icons. Re-measure if the font, its size or the bar changes.
  - **With the logo image** (2026-09-15: the owner uploaded `cullinan-logo-900.png`, 900 × 237,
    at a logo width of 180 in Theme settings; Shopify committed it to `config/settings_data.json`).
    Dawn pads the logo’s link by 0.75rem, which made the bar 87px; `assets/crown.css` drops the
    padding above and below when the link holds a logo (`:has()`), so the bar is 72px on desktop
    (12 + the 47px logo + 12, plus the 1px rule) and 57px on a 375px phone, where the logo is
    140px wide. The owner asked for the smaller box.
    - The logo’s tall C and ll fill its top half and the body of “ullinan” sits lower, its
      centre about 10px below the image’s middle (measured on the PNG’s own pixels). Menu words
      centred on the box read high beside it, so with a logo they sit 8px lower (the dropdown
      caret with them), chosen by eye from 1, 5, 8 and 10px. The icons stay centred on the bar.
    - Header icons are bolder at the owner’s request: a 0.9 stroke in the icon colour round
      Dawn’s filled outlines (search, account, cart, and the menu button on phones), about 1px
      more. 0.5 was too close to before; 0.9 keeps the bag’s handle and the magnifier open.
    - Measured first in a local mock-up, while the preview link was expired, then confirmed on
      the new preview the same day: a 72px bar, 12px above and below the logo, the menu words at
      700 and 6.9px below the bar’s centre on their capitals, the icons at a 0.9 stroke.
- **Wordmark on phones.** (Only without a logo image — one has been set since 2026-09-15.) Until a logo image is uploaded the header prints `shop.name` in
  spaced capitals. Below 750px its size follows the room Dawn’s header grid leaves it
  (viewport minus about 235px of icons and gutters) and tops out at 20px; without that,
  JEWELLERY split mid-word on every phone narrower than 390px. The 235 assumes search,
  account and cart — adding a header icon, or a longer name, means measuring again.
  Re-measured with Jost at 700: JEWELLERY takes 120px of the 125px available at 360px and
  81px of 85px at 320px. It fits, but a wider or heavier face, or more tracking, would not.
- **About page.** Rebuilt on 2026-09-13 on the reference’s About page, in
  `templates/page.about.json`: an intro, three story blocks, then the questions.
  - `sections/about-intro.liquid` with `assets/section-about-intro.css`: the title, one line,
    and square jump-link tiles with line icons (two across on phones). Smooth scrolling is
    switched on by that stylesheet, so only on pages that carry the section, and never under
    reduced motion.
  - `sections/split-story.liquid` with `assets/section-split-story.css`: a photograph on one
    half and text on a tinted panel on the other, full width, measured off the reference
    (8:7 photograph, text about 106px inside the panel, 50px heading). Image first on
    phones. An empty image slot is a flat sand block, so it still reads against the stone
    panel.
    - **From 990px the photograph half is at least 8:7 and as tall as the text beside it**
      (2026-09-14, with the owner’s yes). It used to be fixed at 8:7, so a longer text left a
      strip of page ground under the photograph: 137px on Нашата история at 1440px. A
      photograph fills whatever height that gives and is cropped by `object-fit: cover`, so
      it should keep its subject near the centre.
  - **Jump links target Anchor settings**, not Shopify section ids. `split-story` has one, and
    so does Dawn’s `sections/collapsible-content.liquid` (added for this). Anchors are Latin
    and visible in the editor: istoriya, dizain, materiali, vaprosi. A section added in the
    editor gets a random key, so a section id would be unreachable from a link.
  - The reference sends each of these links to a separate page; the owner wants them on one.
  - Its icons live in `snippets/icon-benefit.liquid` with the rest: brilliant (inspiration — a
    round brilliant from above, for the Cullinan diamond), ring-tools (design — a ring with a
    stone and tweezers, after a picture the owner chose, drawn fresh), crystals (materials —
    **one** crystal since 2026-09-14, at the owner’s request; the value keeps its plural name
    because the template stores it), question (questions). Scroll and gem were used before
    and stay in the snippet; a crown drawn for inspiration was removed at the owner’s request.
    Change an icon only when the owner asks for that icon. Every new icon is drawn in a
    preview and looked at beside its neighbours before it ships.
- **Page banner.** `sections/page-banner.liquid` with `assets/section-page-banner.css`: a heading
  (h1) and a few lines centred on a band, 400px tall on desktop and two thirds of that on phones,
  measured off the reference’s contact banner. Since 2026-09-15 it takes a **Background picture**
  (the owner’s instruction; see the second exception under Design direction), cropped to cover
  the band, decorative (empty alt), loaded eagerly as the first thing on the page; `image_tag`
  applies the focal point set in Shopify’s Files. A **Veil over the picture** (0–90%, default 0)
  lays the colour scheme’s background over it when the words need help; the scheme also sets
  the words’ colour, so a dark picture wants a dark scheme. With no picture the band is the
  scheme’s colour, as before. The owner chooses and uploads the picture.
  - **Left-aligned on phones** (2026-09-15, at the owner’s request: “like there but on a phone”).
    Checked moonmagic.com’s own contact banner at 375px: it centres the words from 750px up and
    sets them left below that, not centred. Ours now does the same -- a phone-only rule in
    `section-page-banner.css`, the band and picture unchanged either way.
  - **Shorter wording, and smaller on phones** (2026-09-15). The two lines under the heading
    are trimmed -- the FAQ pointer drops “Може би вече сме отговорили”, the customer-care line
    drops its closing clause -- on every screen, since it's one shared text setting. On top of
    that, the phone rule sets `.page-banner__text` to 12px against the desktop 16px: 14px at
    first, then smaller again the same day, at the owner’s request -- the size, not the words.
  - **Spacing and position matched to the reference too** (2026-09-15). Measured
    moonmagic.com’s own contact banner at 375px: its words sit 20px from the edge, not
    `page-width`’s own 15px, and 35px separates its heading from the line under it. Ours now
    does the same on phones -- the 20px also lines the heading up with the 20px the
    Имейл/Телефон rows already use below it, which the two hadn’t matched before.
- **Contact methods.** `sections/contact-methods.liquid` with
  `assets/section-contact-methods.css`, after the reference’s Contact Us page: rows of icon, title
  and plus sign in a 1160px column (86px tall on desktop, a 1px rule under each closed row, 35px
  icons, 20px titles), each opening onto a full-width tinted panel with words on the left and the
  action on the right. Blocks: `form` (Shopify’s contact form, sent to the store email; one
  only), `phone` (the number, and a call button dialled from it) and `link` (a button that stays
  hidden without a link). Rows are `<details>`, so they need no JavaScript; the form block sits
  inside the `{% form %}` so a sent or refused message comes back with its row open. The phone
  field has no pattern: Dawn’s `[0-9\-]*` refuses +359 and spaces. Field names are Bulgarian
  (Име, Телефон, Съобщение) so the store’s notification email reads in Bulgarian; only
  `contact[email]` keeps Shopify’s name. Its icons, envelope and phone (a handset), were drawn
  for it in `snippets/icon-benefit.liquid` and checked at 35px.
- **Page title switch.** `sections/main-page.liquid` has a `show_title` checkbox, on by
  default. Templates that bring their own headline turn it off; `page.about` does.

## Current state

- Design foundation applied (palette, type, spacing). Committed and live on the draft theme.
- **За нас page** (2026-09-13): intro with four jump links — Нашето вдъхновение · Нашият дизайн ·
  Нашите материали · Въпроси и отговори — then photograph-and-panel blocks for Нашата история,
  Нашето вдъхновение, Нашият дизайн and Нашите материали, then the questions. History keeps its
  block but has no button: the owner did not want it as one. Linked
  from the top bar. All copy is drafted only from facts already on the site or on the old
  site. **At the owner’s instruction, nothing on it says the business is a family one.**
  - **The inspiration block tells the Cullinan diamond’s story** (largest gem-quality diamond
    ever found, 1905, over 3,100 carats, cut into stones for the British Crown Jewels) and calls
    it the business’s inspiration. **The owner confirmed on 2026-09-13 that the name comes from
    the diamond**, so the block says so outright. The diamond facts are public and were checked.
  - **The design block tells how a piece is made** (2026-09-14, at the owner’s request): the
    atelier’s own 3D models, printed on a 3D printer and checked „с любов“, then gold or
    silver, then finished by hand by the goldsmiths. The 3D printing is the owner’s fact; the
    lead „Всяко бижу е изработено на ръка.“ stays because the finishing is by hand. No casting
    method or design software is named — neither has been confirmed.
  - **The materials block** (expanded 2026-09-14 at the owner’s request) explains what proba
    585 and 750 mean (58,5% and 75% pure gold), 14 carats as the harder gold for every day and
    18 as the purer one, silver, the four stones and their hardness (diamond first, sapphire
    and ruby next), enamel, and HRD Antwerp as one of the leading diamond institutes. Beyond the
    old site’s facts it uses only general public ones. The enamel is not described as fired:
    whether it is vitreous or cold enamel has not been confirmed.
  - The questions answer only what is known: gold, engraving, delivery carriers, the shop.
    Returns, payment methods, warranty, opening hours and delivery prices wait for the
    owner — do not answer them from assumption.
  - No photographs yet; the three image halves are flat sand blocks.
- **Контакти page** (2026-09-14, at the owner’s request, after the reference’s Contact Us):
  `templates/page.contact.json` is the page banner („Как можем да помогнем?“, a line pointing to
  Въпроси и отговори on За нас, and one on customer care: „За нас грижата за клиента е най-важна.
  Към всеки подхождаме лично и с внимание…“, the owner’s idea in polished words, 2026-09-15; it
  replaced a line with the form and the phone number, at the owner’s request) and two rows,
  Имейл with the contact form and
  Телефон with +359 88 287 4895, the owner’s number.
  - **The banner picture** was uploaded by the owner on 2026-09-15 in the theme editor:
    `ChatGPT_Image_Sep_15_2026_12_04_20_PM.png`, 2048 × 768, a pale blush marble with rosy-brown
    veins, veil 0, made with ChatGPT; the owner uses AI pictures on the site (see How we work).
  - **The open rows: moonmagic’s pattern, our own colour** (the owner’s request, 2026-09-15):
    first the panels were coloured scheme-8, `#F1E3DC` — the marble’s base colour, the median of
    the lighter 70% of pixels in the part the banner shows — then the whole open row, title line
    included. The owner didn’t like the whole row coloured and pointed to moonmagic.com’s own
    Contact Us page: there a row is never coloured, open or closed, and only the panel carries a
    tint. That structure is what changed — `contact-methods__item` carries no colour scheme, only
    `contact-methods__panel` does — but the colour itself stayed ours: the owner asked for
    scheme-8 back, not moonmagic’s own neutral grey. So the title line sits on the page ground
    whether a row is open or shut, and an open row’s panel is the marble’s blush.
  - **The footer on Контакти** (the owner’s request, 2026-09-15): above the Facebook and
    Instagram buttons it says „Ще ни намерите и там“ / „Можете да ни пишете и във Facebook или
    Instagram — ще ви отговорим възможно най-скоро.“ instead of „Вижте работата ни“ and its line
    (the first wording, „Пишете ни и тук“ / „...ще ви отговорим и там.“, read awkwardly to the
    owner, who asked for better copy the same day), and the
    buttons fill with scheme-8’s blush on hover or tap instead of black, words and outline
    black. `sections/footer.liquid` switches on `template.suffix == 'contact'`; the two
    texts are footer settings (Social buttons on the Контакти page) with those defaults, and
    the colour is read from scheme-8 into `--footer-social-hover`. Other pages are unchanged.
    - **A picture strip, at the owner’s request** (2026-09-15): the block can also carry a
      full-width picture between the text and the buttons -- not behind them, which was tried
      first and was not what the owner meant. Empty until the owner uploads one (theme editor
      → Footer → Picture between the text and the buttons on the Контакти page). A plain
      3:1 strip, `object-fit: cover`, in normal flow -- no veil, since nothing sits on it.
  At the owner’s instruction there is no live
  chat and no WhatsApp. No email address is shown and no opening hours: neither has been given.
  The page already existed: Shopify’s default “Contact” page, `/pages/contact`, on the contact
  template, so it showed the new layout as soon as the template synced (checked on the preview
  2026-09-15: every measurement as built, the link to Въпроси и отговори intact, the form posting
  to `/contact`, the call button dialling +359882874895). No test message was sent. The owner
  renamed it „Контакти“ and added it to the Top bar menu after За нас on 2026-09-15 (store data,
  done in the admin; the handle stays `contact`).
- Homepage, working top to bottom: announcement bar, header and hero are built; the product
  row is built; three atelier blocks now lead to the inspiration, design and materials
  stories on За нас (see Atelier section above); the newsletter is still Dawn's default.
- Dawn's placeholder illustration has been removed from the hero. The empty image slot is an
  empty div, and Dawn's base.css hides every empty div (`div:empty { display: none }`). On
  phones crown.css shows it again as a flat stone square. **On desktop it is still hidden**,
  so the hero there is off-white rather than the stone band this note used to promise; the
  layout holds either way, since the banner keeps its height. Not changed — the owner has
  not asked about the desktop hero.
- **No real products yet. No photography yet.** The homepage cannot be finished until the
  atelier photo session happens.
- Bulgarian needs setting as the store's default language (currently English).
- **Settled 2026-09-07: both 14K and 18K.** The benefits row the owner wrote says "Проба 585
  и 750 — 14 и 18 карата злато", so the range covers both, and so does the materials block on
  За нас. The atelier facts (14–18К) left the homepage on 2026-09-14 and the announcement bar
  no longer names gold, so nothing on the site states a narrower range.
- **The old site is the best source for real copy.** It gives: founded 1991 as КУЛИНАН 96 ООД;
  the business is *производство* not resale; stones certified by an appraiser qualified at HRD
  Antwerp; diamonds, sapphires, emeralds, rubies; colour enamel; wholesale and retail; a shop
  that also carries Italian imports; and a gold-buying service. Its categories are Дамски
  бижута · Мъжки бижута · Брачни халки · Сребро, with пръстени, обици, гривни, висулки,
  колиета, комплекти, брошки, мъжки аксесоари listed in the About text.
- **Settled 2026-09-14: silver is sold too.** The owner confirmed it. On За нас the history
  block says „от злато и сребро“, the design block „злато или сребро“, and the materials block
  names silver in its lead and gives it a paragraph (at the owner’s request, the same day).
  Still gold only, left until the owner asks: the first question („От какво злато са
  бижутата?“) and the benefits row („14 и 18 карата злато“). No silver fineness (e.g. 925) is
  stated anywhere yet — get it from the owner before writing one.

### Assigning an alternate template

The **Theme template** dropdown on a page, product or collection lists only the templates
in the **published** theme — which is Horizon, not this one. A template that exists only
here cannot be picked, however correct it is. The fix that does not publish anything: add
a file of the same name to Horizon (Online Store → Themes → Horizon → Edit code →
`templates`), filled with a copy of **Horizon’s own** default template, never ours —
Horizon has none of our sections, so Shopify refuses our file there. Then pick the
template on the resource and save. The choice is stored on the page itself, so this draft
theme renders its own version straight away.

- Done for `page.about` on 2026-09-13. Horizon now carries a `page.about.json` copied from
  its `page.json`; leave it in place. Every alternate template still to come — product and
  collection ones included — needs the same step.
- Paste once. The first attempt pasted `page.json` twice, and because the file has no
  trailing newline the join reads `}/*` — two documents in one file, "Invalid JSON".

### Waiting on the Shopify admin

These cannot be done from this repository — menus, collections and the store name are store
data, not theme files:

- **Store name** → Settings → Store details. Reads Doncheff Jewellery; it needs to go back to
  Cullinan Jewellery. The header prints `shop.name` until a logo image is uploaded.
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
