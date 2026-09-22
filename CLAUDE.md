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
    such place -- three more exceptions follow below.)
    - **On phones the words sit below the photograph** (2026-09-14, at the owner’s request,
      as the reference does): the hero’s own "content below image on mobile" setting is on.
      The photo slot is a full-width square, then the heading, text and a full-width black
      button on a sand panel (the hero’s colour scheme is scheme-5, which only paints on
      phones; the desktop box stays transparent). Measured to the reference at 390px: 16px
      text, a 350 x 52 button with 16px capitals, 10px and 20px between the parts. The rules
      are in the phone hero block of `assets/crown.css`, one class more specific than
      Dawn’s, because Dawn’s stylesheet loads after ours.
    - **Heading smaller and reworded, 2026-09-16, at the owner’s request:** it was Dawn’s `h0`,
      one step below the largest of its five preset sizes (52px desktop / 40px phone at this
      theme’s heading scale); now `h1`, one step down again (40px desktop / 30px phone) --
      Dawn’s own preset dropdown, not a custom size. The words changed too: „ЗА ДА БЛЕСТИТЕ,
      БЕЗ ДА СЕ СТАРАЕТЕ“ read as an awkward, translated-sounding two-clause construction (the
      owner’s words: “doesn’t sound right”, the idea itself was fine) -- now „БЛЯСЪК БЕЗ
      УСИЛИЕ“, the same promise in one punchier phrase, which suits the smaller size better too.
    - **A background video too, 2026-09-16, at the owner’s request** (“why can’t I put video,
      I can upload just photo” -- about this section, though first fixed on the newsletter by
      mistake, since that one had just gained the same feature). Dawn’s own `image-banner` had
      never taken video, only `image` and a second `image_2` for a split-screen banner. Added
      **Video** and **Or an external video URL** (YouTube/Vimeo) -- no separate poster field,
      unlike the atelier blocks and the newsletter: this section already has an `image`, which
      just doubles as the poster when a video is set. A video takes over the whole banner
      rather than combining with `image_2`; `.banner__media` is already Dawn’s own `.media`
      (`base.css`), which already gives every direct child `position: absolute` and full
      width/height, so only `object-fit` (Dawn’s own rule covers `img`, not `video` or
      `iframe`) needed adding, in `assets/crown.css`. Same reduced-motion handling as the
      atelier blocks: a script removes `.banner__media-motion` under
      `prefers-reduced-motion`, backed by a CSS rule that hides it even before the script
      runs.
    - **The phone panel is pink, not sand, since 2026-09-18** (the owner’s instruction, after
      looking at moonmagic’s own phone homepage): `#F3E1DB`, measured directly off
      moonmagic.com as `rgb(243, 225, 219)`. Scheme-5’s own sand (`#E7E1D6`) is unchanged in
      `config/settings_data.json` -- the override sits in `assets/crown.css`, phone only, on
      `.banner__box` itself, since scheme-5 is a shared token and the desktop box stays
      transparent regardless. The same pink was reused, at the owner’s request the same day,
      for the image marquee directly below it and the footer’s link-column band further down
      the page (see Image marquee and Footer: link columns... under Custom code) -- the owner
      pointed to moonmagic’s own equivalents of both and asked for one continuous colour
      moving down the page on a phone.
    - **The computer version is a gradient, not a flat colour, since 2026-09-19** (the owner’s
      instruction: “do it for computer now”, continuing the phone pass above). Checked
      moonmagic.com at 1440px rather than assuming their desktop hero just scales up the phone
      one -- it does not: two ring photographs sit as decoration over a full-width band, not
      one full-bleed photo, and that band is `linear-gradient(180deg, #FFE8E0 0%, #F3E1DB
      100%)`, measured directly (`rgb(255, 232, 224)` to `rgb(243, 225, 219)`), not the flat
      pink their phone uses. Our own desktop hero keeps its own structure -- one photograph,
      text over it, `.banner__box` transparent by Dawn’s own rule so a photo shows through
      (`banner--desktop-transparent`, from `show_text_box: false`) -- so the gradient goes on
      `.banner` itself instead of `.banner__box`: `.banner__media` is Dawn’s own `position:
      absolute; inset: 0` (`assets/section-image-banner.css`), so it will cover this
      completely on its own once a real desktop photograph is uploaded, the same way it
      already hides the plain off-white ground today. Nothing to revisit then. The same
      gradient was reused on the marquee and the footer link-column band at the same
      breakpoint, matching the phone pass reusing the same flat pink on both.
    - **The button itself changed shape and colour, 2026-09-20, at the owner's instruction**
      ("like in hestiahome.bg" for the shape; "very dark" shade of the background for the
      colour). See Square corners (now a full pill, site-wide, not just this button) and the
      second dark-buttons exception under Design direction above for the full detail --
      `#391D13`, a very dark shade of this same pink, replacing pure black as scheme-5's own
      button colour.
  - **Second exception, at the owner’s instruction (2026-09-15):** the Контакти page banner
    („Как можем да помогнем?“). The owner asked for a picture behind it, as on the reference’s
    contact page, so its heading and text sit over a background picture once one is uploaded.
    The picture itself still carries no text.
  - **Third exception, at the owner’s instruction (2026-09-15):** the footer’s social block on
    Контакти -- the heading, the line and the Facebook/Instagram buttons (see Контакти under
    Current state below) sit over a background picture once one is uploaded, full-bleed to the
    page’s own edges like the banner above it. Two tries got this wrong first: a background
    only as wide as the column, then a strip between the words and the buttons.
  - **Fourth exception, at the owner’s instruction (2026-09-15):** the homepage newsletter band
    (see Newsletter under Custom code below) -- its heading, text and form sit over a
    background picture once one is uploaded, the same way.
  - **Fifth exception, at the owner’s instruction (2026-09-21):** a second homepage banner,
    „Нашето сребро. Нашият блясък.“, right after the benefits row. First built as a small
    two-column atelier-style card with the picture kept apart from the words, specifically to
    avoid a fifth exception here (see Atelier section under Custom code for that reasoning,
    superseded by this one) -- then rebuilt this way once the owner compared it against
    moonmagic's own equivalent section directly and asked for the picture placement to match:
    on moonmagic, the photograph is the entire section, edge to edge, with the heading, text
    and button laid straight over it, not a separate box beside the words. See Silver banner
    under Custom code for the implementation.
- **Restraint reads as expensive.** Empty space is the main luxury signal. When in doubt,
  remove rather than add.
- **The words should feel the way the layout already does: feminine and strong, at ease
  rather than trying hard** (the owner’s direction, 2026-09-16, after looking at what women
  post on TikTok under things like #feminineenergy: quiet confidence, self-possession, never
  performing for approval). Not new copy for parts of the site that don’t have any yet --
  applied to our own existing text as we touch it, and to whatever we write from here on.
  „Блясък без усилие“ (the homepage heading) is the model: short, sure of itself, no
  exclamation marks, nothing sold hard. First applied 2026-09-16 to the hero’s own subtitle,
  „Не се сваля. Ръчна изработка.“, replacing „Бижута, които не се свалят. Ръчна изработка.“ --
  same two facts (doesn’t come off, handmade), tightened to match the heading’s rhythm.
- **Gold comes from the photographs, not the interface.** The gold accent is muted and used
  sparingly (badges, small accents). Never gold gradients, never gold text on black.
- **No pure white or pure black.** Both read cheap on screen.
  - **One exception, at the owner's instruction (2026-09-10):** the newsletter band is
    `#000000`, matching the reference. It is set in `assets/crown.css`, not by a colour
    scheme, so nothing else on the site is affected.
    - **Smaller throughout** (2026-09-15, at the owner’s request: “everything, even the
      text”). The band’s own padding, the heading and paragraph, and the field/button
      themselves all came down together, roughly a fifth off each -- not just the outer
      padding. All in the same `.newsletter--crown` rules in `assets/crown.css`.
    - **A background picture, at the owner’s request, same day** (“make the black box a
      picture placer”): `sections/newsletter.liquid` gained a **Background picture** and a
      **Veil over the picture** (0–90%, default **30%**, not the 0% the Контакти banner and
      its footer start at -- this band’s text is fixed to off-white, not a colour scheme the
      owner can match to their photo, so a bare picture risks illegible text until they tune
      the veil down for a darker photo of their own). Empty until the owner uploads one, so
      the band looks and behaves exactly as before either way. `.newsletter__wrapper` is
      already `position: relative` (Dawn’s own `.content-container` rule) and, `full_width`
      leaving it outside any `page-width`, needs no breakout trick to reach the true edges --
      unlike the footer’s picture, which does.
    - **A background video too, at the owner’s request** (2026-09-16: “why can’t I put video,
      I can upload just photo”). Added **Background video** and **Or an external video URL**
      (YouTube/Vimeo) settings plus a **Poster image for the video**, the same three fields
      and the same priority -- video, then video URL, then the still picture -- as the
      homepage atelier blocks (`sections/atelier.liquid`), including that section’s own
      reduced-motion handling: a small script removes `.newsletter__media-motion` under
      `prefers-reduced-motion`, backed by a CSS rule that hides it even before the script
      runs. The owner’s own uploaded picture keeps working exactly as before -- its setting
      is still `background_image`, only relabelled “Or a background picture”, and now used
      only when no video is set.
    - **The field and button bigger again, computer only, 2026-09-21, at the owner's
      request.** Both had been `4.6rem` tall since the smaller-throughout pass above, and
      matched each other only because they happened to share that one number -- the row's
      own `align-items: stretch` never actually enforced it (stretch only governs a child
      whose own cross-axis size is `auto`, and both already set an explicit height) -- so
      raising just one without the other would have left them uneven again. Both now
      `5.6rem`, the button's own `min-width` `15rem` to `18rem` and padding `0 2rem` to
      `0 2.4rem`, and its label `1.2rem` to `1.3rem` so the text doesn't look small inside
      the bigger box. Phone is untouched: it already stacks the field and button full-width
      in a column, not the side-by-side row this change reaches.
  - **Second exception, at the owner’s instruction (2026-09-14):** dark buttons are pure black
    `#000000` with pure white `#FFFFFF` text. Set as the button colours of schemes 1, 2 and 5 in
    `config/settings_data.json`, so every dark button matches, and the cart count bubble with
    them (the bubble reads `--color-button` from the header’s own scheme, 3/1, not scheme-5 --
    unaffected by anything scheme-5 does). The light buttons of schemes 3 and 4 and the
    newsletter’s sand button are unchanged.
    The homepage teaser bands have buttons in a dark shade of their own colour instead, with
    white labels, at the owner’s request the same day: taupe `#5B5548` on scheme-6, moss green
    `#3D5229` on scheme-7.
    - **Scheme-5 left this group, 2026-09-20, at the owner’s instruction.** Its button is now
      `#391D13`, a very dark shade of the hero’s own pink (`#F3E1DB`, hue 15° dropped from 91%
      to 15% lightness) -- the same “dark shade of the band’s own colour” pattern as the
      taupe/moss-green buttons above, just darker, since the owner asked for “very dark”
      specifically here. Schemes 1 and 2 keep pure black; scheme-5 is otherwise only the
      Контакти page banner, which has no button, so nothing else changed. White label text
      keeps excellent contrast, 15.4:1.
  - **Third exception, at the owner’s instruction (2026-09-18):** the homepage’s Social follow
    heading and text, „Вижте работата ни“ and the line under it, are pure black `#000000`
    instead of the theme’s own near-black `#221F1C` -- the owner’s own complaint, “the color
    is not black... the blackest color.” Scoped to the homepage’s own block; see Social follow
    section under Custom code.
- **The muted, restrained palette has one deliberate exception: the homepage hero's own
  button, since 2026-09-21.** At the owner's explicit instruction ("change the color to
  something bright that is going to make the eye look first at this button... i don't care
  if in the md file is written that we are not doing that we are doing it") -- acknowledged
  as overriding this whole section, not just one line of it, so logged as an exception here
  rather than quietly changed. `#E63946`, a vivid imperial red, replacing scheme-5's own
  dark `#391D13` for this one button only -- the silver banner, sharing the same markup and
  scheme, keeps the dark colour. Implemented as a scoped `--color-button`/`--color-button-text`
  override in the "Hero buttons" section of `assets/crown.css`, on `.banner__box` specifically
  (that's where `.color-scheme-5` actually redeclares those variables, checked live rather
  than assumed -- an override on the outer section wrapper would have sat further from the
  button than that redeclaration and lost silently, with no visible effect at all).
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
  The owner sent a new one on 2026-09-15: https://o9kwivtmudx0bw6x-107185537364.shopifypreview.com
  (since expired), then on 2026-09-17: https://ge05t2atx6nu8sn2-107185537364.shopifypreview.com
  (since expired), then on 2026-09-18: https://n2mxxuoi0yunt4ur-107185537364.shopifypreview.com
  (since expired as of 2026-09-20 -- confirmed by fetching it directly: it now serves Shopify's
  own generic "store-preview-expired" page, not the theme), then the same day:
  https://f1vudq0of3d7tk3j-107185537364.shopifypreview.com. Until a new link arrives, a local
  mock-up from the theme’s real stylesheets (served by a
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
- **Square corners on badges, variant pills and cards. Buttons are a full pill, site-wide,
  since 2026-09-20.** Started as one button: the homepage hero's own „Разгледайте колекцията“,
  at the owner's instruction ("like in hestiahome.bg"), checked directly (41px radius on their
  own 62px-tall button, comfortably a stadium shape at any height) and shipped as a hardcoded
  `border-radius: 999px` scoped to just `.banner__buttons .button`. Widened the same day, at
  the owner's own follow-up ("all the buttons in every section... this is for every page"),
  to every button on the site except Първи научавайте's own -- the theme's own `buttons_radius`
  setting moved from `0` to `40` (`config/settings_data.json`), the maximum
  `config/settings_schema.json` allows; 40px fully rounds any button up to 80px tall, which
  covers every button on this site, so it reads as a true pill everywhere rather than a
  softened rectangle. The hero's own hardcoded 999px came back out of `assets/crown.css` once
  the shared setting covered it too.
  - **Two custom buttons the shared setting couldn't reach, caught the same day.** Dawn's
    `buttons_radius` only ever touches its own `.button` class; two of this project's own
    button styles are built without it and needed their own `border-radius: var(--buttons-
    radius)` line added by hand: `.contact-methods__button` (Контакти: Изпратете, Обадете се,
    and the link block -- was explicitly `border-radius: 0`, a deliberate square choice at the
    time) and `.footer__list-social .list-social__link` (the Facebook/Instagram buttons, used
    by the footer on Контакти and by the homepage's Social follow section -- had no
    border-radius at all before, defaulting to square). Both now follow the same shared
    setting as every other button.
  - **Пъpви научавайте's own button was never going to move, and needed no exclusion rule.**
    It's built from Dawn's `.field__button` (an input-group button), never the `.button` class
    `buttons_radius` governs -- confirmed live, still square after the site-wide change.
  - **One exception before any of this, at the owner’s instruction (2026-09-13):** the jump
    links at the top of the About page are rounded pills with each icon in an off-white
    circle, following the reference -- already pills before the button-wide change, unaffected
    by it either way.
- **Button sizes matched to moonmagic, site-wide, computer/tablet/phone, since 2026-09-21.**
  The owner asked for every button on the site to match moonmagic's own sizes, at the owner's
  explicit choice of the broadest reading over just the marketing/banner buttons. What this
  covers, in practice:
  - **The marketing CTAs (hero, silver banner) already matched moonmagic exactly** before
    this request -- see Silver banner under Custom code for that research (moonmagic's
    "THEIR STONE. THEIR STORY." button: 72px/22px from 768px up, one size for tablet and
    desktop both, 52px/16px below that). Nothing to change there.
  - **Every other plain button (Add to Cart, Buy Now, quick add, and any button with no
    more specific size of its own) is now matched too**, in `assets/crown.css` under
    "Default buttons" at the very top of the file: `.button`/`.shopify-challenge__button`/
    `.customer button` get `min-height: 5rem; font-size: 1.8rem` by default, rising to
    `5.5rem`/`2.2rem` from `min-width: 990px`. Measured moonmagic's own product page "Add to
    Bag" button directly (a moonstone ring): about 55px/22px from 990px up -- their own
    desktop-only tier here, unlike the marketing buttons, since 768px already showed the
    smaller size -- then about 50px/18px below that, tablet and phone sharing one size. The
    990px split reuses a breakpoint this theme already treats as a tablet/desktop line (the
    header's inline menu also switches there), rather than inventing a new one. Scoped to
    the base classes only, so it never overrides the marketing buttons or the family below,
    which each have a more specific selector of their own.
    - **Unverified live in its real context**: the store has no products yet (see Current
      state), so there is no live Add to Cart button to check this against. Confirmed
      correct in the served CSS; a real visual check waits for real products.
  - **The atelier/view-all/contact-methods family (6.4rem/1.4rem/34rem -- `.atelier
    .atelier__button`, `.collection .collection__view-all .button`,
    `.contact-methods__button`) was deliberately left as it is.** These three were built to
    match *each other*, not moonmagic, and moonmagic has no clean equivalent to this
    specific role: not a hero-style full-bleed CTA, not a product Add to Cart -- checked
    their homepage for a comparable "view all" style button under a product row or
    carousel and found only plain navigation links (Shop All, in their mega menu and
    footer), never styled as a button. Rather than inventing a match against something
    moonmagic doesn't actually have, this family keeps its own established, internally
    consistent size.
  - **All sized down a little further on phones only, minutes later, at the owner's
    request** ("make it a little bit smaller the buttons in every section except for Ще ни
    намерите и там and Първи научавайте и Вижте работата ни for a phone"). Excluded because
    neither is a `.button` at all: the two social-icon blocks are `.list-social__link`, and
    Първи научавайте is Dawn's own `.field__button` -- both already outside every rule
    below, so no exclusion selector was actually needed, just leaving them alone.
    - **Default buttons** (Add to Cart etc., under Default buttons at the top of
      `assets/crown.css`): `4.6rem`/`1.6rem` on phones only, tablet's `5rem`/`1.8rem` and
      desktop's `5.5rem`/`2.2rem` untouched.
    - **Hero and silver banner** (`.banner.banner--mobile-bottom .banner__buttons .button`):
      `5.2rem`/`1.6rem` to `4.8rem`/`1.4rem`. This one was an exact moonmagic measurement
      (350×52px, 16px capitals, from the hero's own build) -- this request moves it
      slightly off that figure on purpose, since the owner asked for every phone button
      smaller without naming an exception for it.
    - **The atelier teaser buttons, "view all" under the product row, and the Контакти
      contact-methods buttons** (`.atelier .atelier__button`, `.collection
      .collection__view-all .button`, `.contact-methods__button`) -- previously the only
      family with *no* phone-specific size at all, just their shared desktop `6.4rem`/
      `1.4rem` inherited unchanged onto a full-width phone button. Given one new phone-only
      override apiece, all three the same: `5.8rem`/`1.3rem`. Desktop and tablet keep
      `6.4rem`/`1.4rem` for all three, unchanged.
  - **Sized down once more a few minutes later, with the hero named as an exception this
    time** ("make them a little bit smaller but now also don't touch the section button of
    БЛЯСЪК БЕЗ УСИЛИЕ"). Since the previous round had moved the hero's own button off its
    exact moonmagic measurement (above), the owner drew the line there rather than shrinking
    it further:
    - **Default buttons**: `4.6rem`/`1.6rem` to `4.2rem`/`1.4rem` (tablet/desktop untouched).
    - **The hero's own phone button is pinned at its previous round's size, `4.8rem`/
      `1.4rem`, and does not move again.** The shared rule it used to come from
      (`.banner.banner--mobile-bottom .banner__buttons .button`) is left exactly as it was
      for the hero's sake; the silver banner, which shared that same rule, gets a new, more
      specific override instead so it can keep shrinking without moving the hero --
      `4.4rem`/`1.2rem`, scoped to the silver banner's own section id like its other
      overrides.
    - **The atelier teaser buttons, view-all, and contact-methods buttons**: `5.8rem`/
      `1.3rem` to `5.4rem`/`1.2rem`, all three together, same as the round before.
- **Buttons lift up on hover, site-wide, since 2026-09-21** ("lets make them move up like in
  hestiahome.bg... except for Първи научавайте"). Checked hestiahome.bg directly rather than
  guessing at the mechanism: its own custom stylesheet gates the effect behind an
  `.animate--hover-vertical-lift` class, and that class and its rules
  (`transform: translateY(-.25rem)` on hover, back to `translateY(0)` on active) already
  exist in **our own Dawn `base.css`, unused** -- this is a stock Dawn feature, not something
  hestiahome built, just switched on there and off here. Turned on the same way: the theme
  setting `animations_hover_elements` moved from `none` to `vertical-lift` in
  `config/settings_data.json` (Dawn's own options are `default`, `vertical-lift`, `3d-lift`;
  `layout/theme.liquid` adds the class to `<body>` from this setting). No custom CSS needed.
  - **Първи научавайте needed no exclusion rule, the same way the two social-icon blocks
    didn't for the sizing round above.** Checked its markup directly
    (`sections/newsletter.liquid`, `sections/email-signup-banner.liquid`,
    `sections/footer.liquid`): its button's class is `newsletter-form__button field__button`
    -- never `.button` -- and Dawn's lift rule only ever targets `.button` (plus
    `.shopify-challenge__button`, `.customer button`, `.shopify-payment-button__button`), so
    it was already outside the rule's reach before this setting existed.
  - **One bundled side effect worth knowing about**: Dawn's own `.animate--hover-vertical-lift`
    also lifts product cards on hover (`.card-wrapper:hover .card--card { transform:
    translateY(-.75rem) }`), the same single setting covering both -- stock Dawn has no
    separate toggle for "buttons only." Not asked for specifically, but a standard,
    complementary e-commerce pattern, and hestiahome.bg's own site gets the same pairing
    from this same unmodified Dawn mechanism. Worth flagging if the owner ever wants button
    lift without card lift, since that would need overriding Dawn's own rule rather than
    just the setting.
  - **A real regression surfaced checking this live, and is now fixed.** Dawn's own lift
    rule (`.animate--hover-vertical-lift .button:not(.button--tertiary) { transition:
    transform ... }`, `base.css`) sits at specificity (0,3,0). Two of this project's own
    button transitions -- the hero/silver banner's (`.banner__buttons .button`) and the
    atelier teasers' (`.atelier .atelier__button`) -- were only (0,2,0), so Dawn's rule
    silently *replaced* their `transition` property instead of adding to it, and their
    colour fade on hover stopped animating (confirmed live: `getComputedStyle` showed only
    `transform` in the transition list, `background-color`/`color`/`box-shadow` gone).
    Fixed by adding the same `:not(.button--tertiary)` Dawn's own rule uses -- not because a
    tertiary button ever appears here, purely to match its specificity -- and folding
    `transform` into each rule's own transition list so the lift animates smoothly too,
    rather than snapping. "View all" under the product row (`.collection .collection__view-
    all .button`) was already three classes deep and had already won this fight via source
    order (crown.css loads after base.css), but still needed `transform` added to its own
    list for the same smooth-lift reason. Checked live after the fix: all three fade color
    over 0.35s and lift over 0.2s together, matching hestiahome.bg's own combined feel.
  - **Вижте работата ни and Ще ни намерите и там added by hand, minutes later, at the
    owner's own follow-up request.** Neither is `.button` either (`.list-social__link`,
    confirmed above), so they needed the bespoke transform/transition pair the note below
    once called out of scope -- built after all, once actually asked for. Same values as the
    `.button` lift (`translateY(-0.25rem)` on hover, back to `0` on active), scoped to
    `.footer__social .footer__list-social .list-social__link` rather than the bare class:
    `render 'social-icons'` (`snippets/social-icons.liquid`) also backs Dawn's own stock
    footer "brand" block and, in principle, the announcement bar and menu drawer (both kept
    off, see Top bar) -- none of those sit inside `.footer__social`, so this reaches only
    the two named sections. `.footer__social` alone covers both, since Контакти's own
    `.footer__social--contact` is still a `.footer__social` element. Added to
    `:focus-visible` too, unlike Dawn's own hover-only rule, since these two already pair
    hover with focus-visible for their colour change.
  - **The Контакти contact-methods buttons still get no lift at all, left that way.** They
    never carry Dawn's `.button` class either (built by hand, see Contact methods under
    Custom code), but the owner named the two social blocks specifically here, not this one
    -- so it stays as the one remaining gap unless asked for.
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
  - **A fourth instance, for the shop's own silver, tried and superseded the same day
    (2026-09-20–21).** Briefly lived here as `silver_teaser`, right after the benefits row,
    styled to match the hero (scheme-5, its gradient background, its dark button) but with
    the picture still kept in its own box beside the words, deliberately short of a fifth
    "words over a photo" exception (see Design direction). The owner then compared it
    against moonmagic's own equivalent section directly and asked for the picture placement
    to match, which this component's two-column structure cannot do -- moonmagic lays its
    words straight over a full-bleed photograph, not beside it. Rebuilt as a second
    `image-banner` instance instead; see Silver banner under Custom code.
- **Silver banner.** A second `image-banner` instance, key `silver_teaser`, right after the
  benefits row (`templates/index.json`). No new template or stylesheet: `sections/image-
  banner.liquid` is Dawn's own, unchanged, and every hero rule in `assets/crown.css` is
  already scoped to shared classes (`.banner`, `.banner--mobile-bottom`, `color-scheme-5`)
  rather than to the hero's own section id -- so a second instance on the same colour scheme
  picks up the pink phone panel, the desktop gradient and the dark `#391D13` button for free,
  exactly like the owner asked for on the atelier attempt this one replaced, now doubly true
  since it is genuinely the same mechanic rather than a lookalike.
  - **Built this way at the owner's explicit instruction (2026-09-21),** after comparing our
    first attempt (see the reverted atelier note under Atelier section) against moonmagic's
    own "THEIR STONE. THEIR STORY." section directly: its photograph is the entire section,
    measured edge to edge with the section's own bounding box, with the heading, text and
    button laid straight over the left half of it -- not a separate picture box beside the
    words. Offered the choice between keeping our picture and text apart (the standing "no
    other place gets words over an image" rule) or matching moonmagic's own placement as a
    fifth named exception; the owner chose to match it.
  - **Settings copy the hero's where the mechanic is the same, and moonmagic's own layout
    where this section actually differs from our hero.** `color_scheme: scheme-5`,
    `show_text_below: true`, `image_overlay_opacity: 0` -- all as the hero has them. But
    `desktop_content_position: middle-left`, `desktop_content_alignment: left` and
    `mobile_content_alignment: left`, not the hero's own centred settings: moonmagic's own
    text for this specific section sits left-aligned at both sizes (confirmed on their phone
    layout too, not assumed from the desktop reading alone), where our hero is centred
    because it was tuned to moonmagic's own *hero*, a different section with its own
    alignment. `image_height: medium` and `image_behavior: none`, calmer and shorter than the
    hero's `large`/`zoom-in`, so the two full-bleed banners on one homepage read as related
    rather than identical.
  - **Copy, kept from the first attempt.** Heading „НАШЕТО СРЕБРО. НАШИЯТ БЛЯСЪК.“, two
    parallel short phrases echoing moonmagic's own "THEIR STONE. THEIR STORY." rhythm without
    its words; subtitle „Родиево покритие за траен блясък. Без излишни грижи.“, naming the
    shop's rhodium plating (the owner's own new fact, given when this section was first
    requested) in the same two-clause cadence as the hero's own „Не се сваля. Ръчна
    изработка.“ Button „Разгледайте среброто“, to `/collections/all` -- no silver-specific
    collection exists yet (see Waiting on the Shopify admin), so it points where the hero's
    own button already does rather than to something narrower that doesn't exist.
  - **The empty image slot behaves exactly as the hero's does:** Dawn's `div:empty` rule
    hides it until a photograph is set, shown again on phones as the flat stone square from
    `.banner__media--empty`, square via the same `aspect-ratio: 1/1` rule `crown.css` already
    gives any `banner--mobile-bottom` instance. Nothing new to build for this; it came free
    with the section type.
  - **Space above it, added 2026-09-21 at the owner's request** ("space between the two
    sections because they look connected"): it sat flush against the benefits row, scheme-2's
    stone touching this section's own pink/gradient with no gap. `image-banner` has no
    margin setting the way `atelier` does, so `assets/crown.css` adds it instead. 40px
    desktop, 30px on phones.
    - **First attempt matched two elements instead of one, and the margin landed on the
      wrong one.** Scoped to `[id*="__silver_teaser"]` on the reasoning that Shopify wraps
      every section in `#shopify-section-{id}` regardless of type -- true, but Dawn *also*
      puts `#Banner-{id}` on the `.banner` div itself, and both ids contain
      `__silver_teaser`. The margin landed on the inner `#Banner-` div, leaving a 40px strip
      *inside* the outer wrapper's own box, above the visible pink, showing the page's own
      off-white background -- invisible on the plain preview since that colour sits close to
      the page ground, but it meant the section's true boundary (what the theme editor
      highlights) sat 40px above where the pink actually starts. Caught from the owner's own
      report of background colour showing at the corners on desktop, confirmed by comparing
      `getBoundingClientRect()` on the wrapper against the inner `.banner`. Fixed with
      `[id^="shopify-section-"][id$="__silver_teaser"]`, anchored so only the wrapper's id
      (which starts with "shopify-section-") matches, not the banner's own.
  - **The picture cut on the left and right, at the owner's request (2026-09-21), tried
    two ways the same day.** First a diagonal at all four corners ("just straight lines
    that cut the corners and then the pink background appears" -- offered a choice between
    small clips, larger clips and an inset picture; the owner wanted the straight diagonal
    cut, size otherwise left to us): `clip-path: polygon(...)` on `.banner__media` cutting a
    straight 4rem diagonal off each corner. **Corrected minutes later** -- not the corners
    at all, a plain straight vertical line on the left and a mirrored one on the right, top
    and bottom left uncut, brought in toward the centre but stopping well short of it.
    `clip-path: inset(0 18% 0 18%)` does this instead: zero inset on the top/bottom sides
    crops only the left and right, leaving a plain rectangle, narrower and centred, no
    diagonal anywhere -- 18% leaves the middle 64% of the width showing (**brought down to
    10% a side minutes later**, at the owner's request to make the cut smaller -- the middle
    80% shows now). Either way,
    `.banner__media` is Dawn's own `position: absolute; inset: 0` sitting over `.banner`'s
    own gradient, so clipping it is enough; nothing else needed changing. Desktop only
    (`min-width: 750px`): on a phone the image is stacked above the text panel on
    `.banner`'s plain scheme-5 colour, not the pink, which belongs to `.banner__box`
    specifically (see the phone hero note under Design direction) -- cutting it there would
    reveal the wrong tone. Dormant until a photograph is set: `.banner__media` is still
    Dawn's own empty div, hidden entirely on desktop the same way the hero's own is (see
    Current state), so there is nothing to clip yet -- checked both times by temporarily
    forcing a background on the live element in the browser rather than waiting for a real
    photo.
  - **Heading sized down, at the owner's request (2026-09-21):** "the big text smaller and
    the button smaller too." `heading_size` moved from `h1` to `h2` -- Dawn's own preset
    dropdown, its smallest, the same mechanism the hero's own heading uses.
  - **The button, sized down, then up, then matched to moonmagic exactly and the override
    removed altogether.** It has no `heading_size`-style setting of its own: it always reads
    `.banner__buttons .button` from crown.css, shared with the hero. First shrunk with the
    heading, from the hero's own 7.2rem/2.2rem/48.6rem-cap to 5.6rem/1.6rem/36rem. Read as
    too small a moment later, so sized back up to a midpoint between those two attempts --
    6.6rem/1.9rem/42rem -- and checked against `.atelier .atelier__button` in Нашето
    вдъхновение just below it (6.4rem/1.4rem/34rem, `section-atelier.css`), since the owner
    asked for "bigger, but not that much bigger than the one in the section under it." The
    plain midpoint tied that button's height exactly (6.4 = 6.4), so the height came up
    slightly further, to read as clearly, if modestly, bigger in all three dimensions rather
    than equal in one.
    - **Superseded by matching moonmagic directly, computer, tablet and phone.** Measured
      moonmagic's own "THEIR STONE. THEIR STORY." button (the same section this banner is
      modelled on) at 1440, 768 and 375px: 72px tall, 22px type, ~485px wide from 768px up
      -- one size for both tablet and desktop, no separate tablet size at all -- then 52px
      tall, 16px type, full width below that, the breakpoint sitting somewhere between 700
      and 768px. That is exactly `.banner__buttons .button`'s own existing default
      (`min-height: 7.2rem; font-size: 2.2rem; min-width: min(48.6rem, 100%)`) and the
      `banner--mobile-bottom` phone override (`min-height: 5.2rem; font-size: 1.6rem`) --
      the phone rule's own comment already records it as measured against moonmagic's
      *hero* when first written, and this confirms moonmagic uses the same size in both
      places. Both shared rules were already an exact match, so every scoped override this
      section had for width/height/font-size came back out entirely -- the fix was to stop
      overriding, not to add a third size. `border-radius: 0` (the square-corner override)
      is untouched; shape was never part of this sizing question.
  - **Square corners on this one button, at the owner's request** ("the button form to be
    rectangular like in section Първи научавайте, but just the form" -- the shape, not its
    colour or size). That button was never a pill to begin with: it's Dawn's own
    `.field__button` (an input-group button, `base.css`), which carries no `border-radius`
    at all, never the `.button` class the site-wide pill setting governs (see Square corners
    under Design tokens) -- so matching its shape here means overriding `--buttons-radius`
    back to `0` for this one button specifically. No breakpoint restriction, unlike the
    other overrides on this section: shape isn't tied to the desktop-only layout the way the
    cut and the repositioned text are, so it applies at every width.
  - **The heading, smaller again, then partway back up, minutes apart** (the owner quoted
    the heading text directly, asked for it smaller, then for it bigger again with the
    caution "don't make it too big"). `h2` was already Dawn's smallest preset, so there was
    nowhere lower to move the dropdown -- this goes below the preset floor instead, scoped
    to the section id as usual. Needed both classes, `.banner__heading.h2` -- a plain
    `.banner__heading` selector already exists under the Hero exception above (its own
    `clamp()` rule, written before per-block heading sizes existed), and matching only that
    would have tied it rather than won, since the h1/h2 presets are what the hero's sizing
    history was actually measured and built against, not the older clamp(). First `2rem`
    (what `.h2` itself already renders on a phone), then capped at `2.6rem` on the way back
    up -- the same upper bound `.atelier__heading`'s own `clamp(1.8rem, 2.4vw, 2.6rem)`
    already uses for Нашето вдъхновение and the other teaser blocks right below it
    (`section-atelier.css`), so this heading tops out no bigger than theirs rather than
    picking an arbitrary number.
  - **Bigger again minutes later, past that ceiling this time:** "big... just not like it
    was at the start" -- the start being `h1`'s own `4rem` (40px), what this heading had
    before any of the sizing this section describes. `3.2rem`: past the atelier heading's
    own ceiling (asked for and given deliberately this time, not tied to it by coincidence
    the way the button sizing was), but a clear step short of the original. **Eased back to
    `3rem`** minutes later still ("I think it is a little bit bigger [than it should be]")
    -- still past the atelier ceiling, just not by as much.
  - **Content re-centred onto the picture, same round.** `desktop_content_position` moved
    from `middle-left` to `middle-center` and `desktop_content_alignment` from `left` to
    `center` (`templates/index.json`, plain Dawn settings, no CSS needed). Left-aligned made
    sense while the picture was full-bleed behind it, matching moonmagic's own layout for
    this section -- but once the picture became the centred, inset rectangle above, the
    text stayed pinned to the banner's left edge, landing over the picture's own left
    portion instead of following it. The owner asked for the text and button to sit "where
    is the picture" -- centring both settings puts the whole content block over the middle
    of that inset picture instead, matching where it now actually is rather than
    moonmagic's original layout for a full-bleed image this section no longer has.
  - **Back to the left minutes later, but aligned to the picture's own edge, not the
    banner's.** The owner asked for the text and button "in the left of the picture" --
    `desktop_content_position`/`desktop_content_alignment` moved back to `middle-left`/
    `left`, but Dawn's own left position by itself would land the content flush against
    `.banner__content`'s fixed `padding: 5rem` gutter (`assets/section-image-banner.css`),
    well to the left of where the (now 10%-inset) picture actually starts. A scoped
    `padding-left: 10%` on `.banner__content` overrides just that one side to match the
    clip-path's own inset exactly -- both percentages resolve against the same box,
    `.banner`'s full width (`.banner__content` is `width: 100%` there too), so the two stay
    in sync if the cut size ever changes again without needing two numbers kept in step by
    hand.
  - **Moved further left again, no longer tied to the cut.** The owner asked for the text
    and button moved further left still -- `padding-left` came down from the picture-matched
    `10%` to `4%`, so the text now starts inside the pink margin, to the left of the picture
    itself, rather than flush with its edge. The clip-path's own `10%` is untouched; the two
    values were only ever meant to stay equal while that made the text line up with the
    picture, not permanently coupled. **Nudged again** ("a little bit more") to `2%`, then
    once more ("a little bit closer") to `1%`.
  - **The empty slot shown on desktop too, at the owner's request** ("make the picture
    different colour... so I can see it" -- to judge the cut and its position live, without
    waiting for a real photograph). Not a new placeholder graphic: `.banner__media--empty`
    already carries its own flat colour (`rgb(242 240 236)`, the same one every empty media
    slot on the site uses) -- Dawn's own `div:empty { display: none }` (`base.css`) is only
    ever what hides it, the same rule that keeps the hero's own desktop slot invisible (see
    Current state). Overridden here, scoped to this section only, so the hero and every
    other banner stay exactly as they were. Self-removing once a real photo is set: Dawn
    only adds the `--empty` class when there is no image, so nothing here needs undoing by
    hand then.
- **Category mosaic.** `sections/category-mosaic.liquid` with
  `assets/section-category-mosaic.css`. Four columns, tall tiles at each end spanning both
  rows, squares between — the block order drives it, because `grid-auto-flow: dense`
  backfills the squares around the tall ones. Captions sit **below** the image by default;
  "Over the image" is a setting, not the default, because the reference's dark scrim dulls
  gold photography and the hero is meant to be the only place words sit on a picture. Tiles
  without a destination render as tiles, not links.
  - **A wrong guess, tried and reverted, 2026-09-17.** The owner asked for something like
    moonmagic.com's end-of-homepage "collections, everything about moonstone, let us help
    you" -- read as its mid-page "FIND YOUR STONE" marketing row, so a second instance of
    this section shipped on the homepage (`stones_mosaic`, eight stone tiles). Wrong: the
    owner meant the reference's **footer**, specifically what sits under its newsletter
    signup ("look under their join the inner circle"), and had sent a picture of it that
    this pass never saw. Reverted the same day -- `templates/index.json` is back to exactly
    the state above, no `stones_mosaic` key, no entry in `order`. See Footer: link columns,
    newsletter box, contact email under Custom code for what was built once the request was
    clear.
- **Hero facts.** `sections/hero-facts.liquid` with `assets/section-hero-facts.css`. The
  short claims under the hero. Its own section, not Dawn's multicolumn — Dawn loads section
  stylesheets from inside the section, which puts them after `crown.css` in the document, so
  overriding multicolumn meant winning a specificity fight on every rule. Measured off the
  reference: a 1000px container rather than the full page width, items distributed across it.
  Three claims shipped at first (Собствено производство, Първокласни метали, Сертифицирани
  продукти) though the section was always built for four -- `max_blocks: 6`, a four-block
  preset, and the block's own info text ("Four claims is the most that fits one line on a
  phone") all said so from the start.
  - **A fourth claim, Наложен платеж, added 2026-09-20 at the owner's request** -- settling,
    for this claim at least, the "no cash-on-delivery promise until that policy exists"
    caution logged under Top bar. Adding it exposed that the phone sizing had never actually
    had four claims tested against it: the three-claim row already used its full 375px width
    exactly (`scrollWidth == clientWidth`, confirmed live, zero spare room), so a fourth claim
    of any length was always going to overflow.
  - **Two rounds of retuning the existing shrink-to-fit formula still wasn't enough.** The
    original approach sized type with `clamp(0.5rem, 1.75vw, 1.4rem)` and `white-space:
    nowrap`, forcing every claim onto one line at any width by shrinking the type against the
    viewport. Retuned once (1.6vw, smaller gap) and still measured only 3px of margin at
    375px once checked against the real rendered row -- the same margin-free edge that caused
    the overflow in the first place. Retuned again (1.55vw) for 16px of real margin, but by
    then it was clear the whole approach had no comfortable floor: even an unreadable 5.8px
    still didn't clear 375px by much.
  - **Rebuilt to wrap instead of shrink, same day, at the owner's request to go look at how
    moonmagic actually does it.** Checked moonmagic.com on a phone directly rather than
    continuing to retune: their own equivalent (GIA Certified Gems / Premium Metals / Global
    Community / Established 2016) does not shrink text to force one line at all. It holds a
    fixed 9px and lets any claim wrap onto a second line within its own column -- the row
    stays one row of columns throughout; only an individual column's own words wrap. Replaced
    the `clamp()` formula below 989px with a fixed `font-size: 0.9rem` (matching moonmagic's
    9px exactly) and `white-space: normal` in place of `nowrap`. Checked live afterward: every
    claim wraps to two lines at 375px with 16px of margin to spare, and sits back on one line
    by 768px, where there is already enough room without wrapping. Desktop (990px+) was never
    touched by any of this -- it already fit at the flat `1.4rem` size throughout.
  - **A pink/gradient background, tried and reverted the same day.** Added briefly
    (2026-09-21) after finding that moonmagic's own facts strip and picture row aren't
    separate coloured bands at all -- both sit inside the *same* section as their hero,
    on one continuous gradient that covers the whole thing, their hero's own photo just
    covering it further up. Reverted the next day at the owner's own instruction ("why did
    you put a background on the text above the moving pictures, remove it") -- this section
    goes back to plain `color_scheme` with no background override, no `hero-facts-band`
    class. The finding about moonmagic's own structure stays true; the owner just didn't
    want it applied here.
- **Benefits row.** `sections/icon-benefits.liquid` with `assets/section-icon-benefits.css`
  and `snippets/icon-benefit.liquid`. Four short promises under the product row. Each block
  takes either an uploaded image (contained, never cropped, no mask or border) or one of nine
  built-in line icons. The icons carry `vector-effect="non-scaling-stroke"` so the line stays
  1.25px however large they are drawn — a plain stroke-width would thicken as the 24-unit
  viewBox scales to 52px.
  - **Silver added to the gold-bar claim, 2026-09-20, at the owner's request** ("add the text
    however you like it because I don't know how to add the right words for this"). The
    subline gets „, а също и сребро“ appended rather than folded into the same clause: carats
    are a gold-specific unit, and tacking "и сребро" straight onto "14 и 18 карата злато"
    would read as if silver shared that measurement too. The subline has no `nowrap`/width
    ceiling the way hero-facts did (`max-width: 40ch`, built to wrap across a couple of lines
    already), so the longer text needed no layout changes -- checked live regardless.
    - **Silver's own fineness, 925, added to the heading minutes later, at the owner's
      explicit instruction** ("we can change the text to проба 585,750 и 925"). „Проба 585 и
      750“ to „Проба 585, 750 и 925“ -- this is what settles the fineness CLAUDE.md had
      flagged as unconfirmed for the site itself (Instagram calls it 925, but that was never
      treated as stated on the site until this). The subline is untouched -- it already names
      сребро as the material the new number belongs to. Checked live at 1440 and 375px: one
      line, no wrap, no overflow at either width.
- **Image marquee.** `sections/image-marquee.liquid` with
  `assets/section-image-marquee.css`. Full-bleed band of square images drifting sideways,
  under the facts strip. The reference uses Swiper; this is a CSS marquee instead — no
  library, and it stops under prefers-reduced-motion. The track holds the same set twice and
  translates by -50%; each item carries its own trailing margin rather than the track using
  `gap`, which is what makes -50% land exactly on the repeat. Empty slots are flat squares.
  - **Pink background on phones, 2026-09-18, at the owner’s instruction:** the same `#F3E1DB`
    as the hero panel above it (see the phone hero note under Design direction), so the two
    bands read as one colour on the way down the page. `.marquee` in its own CSS file, phone
    only; scheme-1 (`#FCFCFB`), the site’s own default ground, is untouched.
    - **The same on a computer, 2026-09-19:** the hero's own desktop gradient
      (`linear-gradient(180deg, #FFE8E0 0%, #F3E1DB 100%)`), not the flat phone colour, so this
      band still reads as "the exact same colour" as the hero at each size it was asked to
      match, the same rule the hero note explains in full.
    - **Padding evened out the same day, at the owner's request ("centre the pictures by the
      box").** `padding_top: 8` and `padding_bottom: 18` (the schema's own defaults, carried
      through unchanged since the section was built) were invisible while the band had no
      background of its own -- once it did, the 10px gap between them made the row read as
      pushed toward the top rather than centred. Both now `12`, in `templates/index.json`.
      This section sets its padding as a plain inline style with no mobile/desktop split
      (unlike a Dawn section's own `{% style %}` block, which halves the value under
      `max-width: 749px`), so 12px is the true, same gap above and below the pictures at
      every screen width, not a value that scales.
  - **A caption line added below each picture, 2026-09-21, at the owner's request**
    ("make the pictures smaller so we can put text like moonmagic did"). Checked moonmagic's
    own equivalent directly first, per "Before you build": it isn't a marquee at all but a
    Swiper carousel sitting just above its own facts strip (confirmed live --
    `.hero-banner__carousel`, `swiper-slide hero-banner__slide`), and its "text" (things
    like "10 YEARS OF MOON MAGIC") turned out to be baked directly into the photograph file
    itself, not live theme text -- exactly what "nothing is burned into a photograph"
    (Design direction, the single most important rule on the project) rules out here. So
    the outcome is copied -- a picture with a caption -- not the mechanism: a new
    `.marquee__caption` line renders under every picture, in the block's own new `caption`
    text setting (`sections/image-marquee.liquid`).
    - **Renders even when blank, on purpose, with its own reserved `min-height`.** No
      caption text exists yet -- "we are not putting any text right now because we don't
      have pictures" -- so every block's `caption` setting stays empty in
      `templates/index.json` for now, same as every other empty image slot on the site.
      Reserving the line's height regardless means nothing in the band will shift or resize
      once the owner has photographs and captions to give them; structure before content,
      the same rule the collections and the About page's own empty photo halves already
      follow.
    - **The picture itself was shrunk to 84% width to make room, then put back to 100% the
      next day.** First try brought `.marquee__image` down from `width: 100%` to `84%`,
      centred -- checked against moonmagic's own smaller "Designed to Mean More" gem-icon
      row for proportion (about 57% picture to 43% caption+spacing there), landing on 84%
      since shrinking this project's own jewellery photography that far would have read as
      icon chips. But shrinking the *width* left the item's own background showing as a
      margin around every picture, reading as a coloured box around each one -- not what
      moonmagic does, and not what was asked. The owner caught this directly ("every
      picture now have a background, they are like boxes around them... not like
      [moonmagic's]"). Checked moonmagic's real carousel slides again to be sure rather than
      guessing a third time: `imgRect.width` equals `slideRect.width` exactly, edge to edge,
      and the slide itself has no background colour at all -- the coloured look on some of
      their own slides is baked into that specific photograph file, not a CSS background
      behind it. Put back to `width: 100%`; the caption below still reserves its own space
      without needing to shrink the picture to make room for it.
  - **Rebuilt as separate boxed cards, minutes later, at the owner's own explicit
    correction.** The previous round had it backwards: the owner wanted each picture
    *smaller* still, but sitting in *its own* background box with room for the caption
    inside it, and real space between one box and the next -- "the background boxes are
    not connected to others... they have space between [them] like in moonmagic." Rather
    than the whole band sharing one continuous background with plain photographs on top
    (the fix two rounds above), `.marquee__item` itself now carries the box: off-white
    `#FCFCFB` (scheme-1's own token, never pure white), `padding: 1.4rem` (`1rem` on a
    phone) so the picture and caption both sit inset from the box's own edges, and
    `box-sizing: border-box` so that padding stays inside the width this item already
    calculates rather than growing it, which would have thrown off the seamless -50% loop
    (both track halves have to stay exactly equal width for that to land cleanly).
    `images_visible` moved from `7` to `8` (Dawn's own schema maximum) for the "smaller"
    part of the request, and `gap` from `12` to `24` (`templates/index.json`) so the space
    between boxes reads clearly rather than as a thin seam. The band's own pink/gradient
    background (above) still does real work here: it's what shows through in the gaps
    between the now-separate white boxes, rather than being redundant with them.
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
    cash-on-delivery promise until those policies exist -- cash on delivery is now confirmed,
    2026-09-20, but as a hero-facts claim (Наложен платеж) rather than a top-bar message; see
    Hero facts under Custom code. Each fits one line on a 360px phone at
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
  only), `phone` (a call button dialled from the number, which is not shown as text -- see
  Контакти under Current state) and `link` (a button that stays hidden without a link). Rows
  are `<details>`, so they need no JavaScript; the form block sits
  inside the `{% form %}` so a sent or refused message comes back with its row open. The phone
  field has no pattern: Dawn’s `[0-9\-]*` refuses +359 and spaces. Field names are Bulgarian
  (Име, Телефон, Съобщение) so the store’s notification email reads in Bulgarian; only
  `contact[email]` keeps Shopify’s name. Its icons, envelope and phone (a handset), were drawn
  for it in `snippets/icon-benefit.liquid` and checked at 35px.
- **Page title switch.** `sections/main-page.liquid` has a `show_title` checkbox, on by
  default. Templates that bring their own headline turn it off; `page.about` does.
- **Footer: link columns, newsletter box, contact email** (2026-09-17, at the owner’s request,
  after the reference’s footer). Two wrong reads came first (see the reverted homepage stones
  section above, then a round that built only the newsletter and email and left the columns
  out, reading “the other thing under this i don’t want” as the columns -- it meant the
  reference’s country picker). What stands now:
  - **Three link columns**, a new `link_column` block in `sections/footer.liquid`: a heading,
    a menu or up to six label/link pairs (a pair missing either half prints nothing), and
    “Show the contact email at the end”. Set in `sections/footer-group.json`:
    **Нека ви помогнем** (Контакти, Въпроси и отговори, then the email), **Всичко за нас** (the
    four За нас stories by anchor: istoriya, vdahnovenie, dizain, materiali), **Колекции**
    (Пръстени, Обеци, Висулки, Комплекти, Гривни, Камъни -- the Main menu’s six, in its order).
    The reference’s Shipping, Returns, Ring Size Guide and Terms have no pages here yet, so
    they are not listed; add them as pairs once the pages exist.
  - **Laid out as the reference does, measured at 1440 and 375px.** From 750px: columns about
    24rem wide, centred as a group, 8rem apart from 990px (4rem below that), small spaced
    capitals for headings and links (13px, 600 / 400, 0.1em / 0.08em), links in the full text
    colour. Below 750px each column is a closed `<details>` row with a caret and a hairline
    between rows. The links print twice in the markup, once per layout, and CSS hides one --
    no script. The address keeps lower case. All in `assets/crown.css`, scoped under `.footer`
    to beat `section-footer.css`, which loads inline inside the section, after crown.css.
  - **Колекции lists its links by hand, not from the Main menu.** Pointed at `main-menu` it
    printed the menu’s parent items as links, and two of them carry tag filters:
    Пръстени → `/collections/пръстени/Пръстени` and Камъни → `/collections/камъни/Диамнати`
    (a misspelt tag). Dawn’s header never showed those two URLs -- a parent item only opens
    its dropdown -- but once products exist each would list only pieces with that tag, and
    none for the misspelt one. See Main menu under Waiting on the Shopify admin; once fixed,
    the column can pick the menu again and follow it.
  - **The newsletter box is the first column in the row**, beside Нека ви помогнем
    (2026-09-18, at the owner’s request -- it first shipped stacked below the row instead).
    Captured as `footer_subscribe` in `footer.liquid` and printed as the row’s first grid
    item, so it shares the row’s width, gap and centring; its heading is restyled to the
    columns’ own small spaced capitals instead of Dawn’s larger heading-face default.
    `newsletter_enable: true` (it had never been on), heading „Абонирайте се за бюлетина“,
    distinct from the homepage band’s „Първи научавайте“ -- the reference also has both.
  - **The contact email** is the footer setting `contact_email`,
    `cullinanjewellery.bg@gmail.com`, shown only in a column that ticks the option -- or, since
    2026-09-19, under the newsletter box instead (see below).
  - **Moved under the newsletter box, with a label, smaller, 2026-09-19, at the owner's
    request.** It no longer sits in Нека ви помогнем's own list (`show_email: false` there
    now, in `sections/footer-group.json`); it prints under Абонирайте се за бюлетина's form
    instead, introduced by a label -- „Свържете се с нас:“, the section's own new
    `newsletter_email_label` setting -- and set smaller than the footer's usual 13px link text
    (1.1rem, `.footer-subscribe__email` in `assets/crown.css`). A second new setting,
    `newsletter_show_email`, gates whether it shows there at all; both default in the schema
    (`sections/footer.liquid`) rather than being written into `footer-group.json`, so nothing
    depends on a setting landing in the same push as its schema. Site-wide, same as the
    columns themselves -- checked live on Контакти too, which shows the same email in the
    same place.
    - **Kept to one line and shrunk to fit, at the owner's request** ("put it on the same
      row... make the text match the length of the box above it, even if smaller"; also "make
      the whole text with capital letters" for the label). `white-space: nowrap` stops the
      label and the email folding onto two rows; the label is capitalised
      (`text-transform: uppercase` on `.footer-subscribe__email`) while the email itself stays
      lower case (`text-transform: none` on `.footer-subscribe__email-link`), the same "an
      address in capitals reads wrong" rule the link-column copy already followed. Sized by
      measuring the real text live rather than guessing: at 260px, this theme's own newsletter
      form width on a computer, 1.1rem needed 274px (over) and 0.9rem needs 244px (comfortable
      margin, and even more of one on a phone, where the form is 295px wide). Caught a real bug
      doing this: the email link had its own fixed 14px from elsewhere in the theme that never
      inherited the paragraph's font-size at all -- fixed with `font-size: inherit` on
      `.footer-subscribe__email-link`.
  - **The Facebook/Instagram block, homepage: three moves in one day (2026-09-18).** First it
    drifted below the newsletter box and the columns; moved back to first in the footer. Then
    the owner said it should not be on every page, only home and Контакти -- printed only
    `if template.name == 'index' or template.suffix == 'contact'`. Then the owner asked for
    the homepage's own copy to sit **before** Първи научавайте rather than after it, between
    it and Кое злато е за вас -- a position the footer itself can never reach, since the
    footer only ever renders after every homepage section. So it is no longer part of the
    footer on the homepage at all: see **Social follow section** below. `template.name ==
    'index'` came back out of the condition above it, leaving `if template.suffix ==
    'contact'` -- Контакти’s copy is unaffected, still first in the footer, still under
    Телефон, still with its own heading, text and picture, exactly as tuned on 2026-09-15.
  - **On phones, the homepage's own block sits side by side like the reference's**
    (2026-09-18, at the owner’s request: “you can see that on moonmagic on phone in their
    homepage” -- checked at 375px: left-aligned heading and text, two labelled buttons side
    by side, not centred and stacked full-width as this block had been since 2026-09-14).
    Кontакти keeps that stacked, centred treatment; the new rules are scoped to
    `.footer__social:not(.footer__social--contact)`, phones only, with no `.footer` ancestor
    required -- which is exactly why they still apply unchanged now that this markup also
    renders from the Social follow section rather than only from the footer.
    - **Two labelled buttons need smaller type to share the row.** Measured live at 375px:
      the block has 295px to work with, an 8px gap leaves 143.5px per button, and our longer
      label, ПОСЛЕДВАЙТЕ НИ, needs 146px at the stacked size (14px) -- more than the whole
      budget for one button, let alone two. At 11px with tighter letter-spacing (0.06em vs
      0.1em) it needs 138px, and the icon and gaps came down with it (2rem icon, 0.8rem
      gaps) to stay in proportion. The label is still words, not shrunk to icons only, which
      the owner turned down here in 2026-09-14.
    - **`flex: 1 1 0` did not share the row -- both buttons rendered full width.** An `<li>`
      keeps `display: list-item` even as a flex child, and this rendering path does not
      grow it correctly from a zero flex-basis. Dawn’s own desktop version never hits this,
      because it sizes `.list-social__link` with an explicit `width: 26rem` rather than
      flex-grow; the phone fix does the same -- `width: calc(50% - 0.4rem)` and
      `display: block` on the `<li>`, `width: 100%` on the link inside it.
    - **Stretched to a forced half-width read as "too long", so it is natural width now**
      (2026-09-18, the same day, at the owner’s follow-up: "cut some of the boxes... make
      the illusion that there is space"). `calc(50% - 0.4rem)` gave each button about 169px
      at 375px, well past the 138px its own content needs -- the stretch itself was the
      complaint. `width: auto` on both the `<li>` and the link, a real `1.6rem` gap between
      them (up from `0.8rem`), left-aligned like the text above instead of filling the row:
      Харесайте ни and Последвайте ни now measure their own two different widths (138px and
      159px, since the words differ), with visible air on the right rather than edge to edge.
      **Superseded a few hours later** by the fuller measurement-matching pass below (still
      natural width and left-aligned, but 13px not 11px, `nowrap` added, the gap changed
      again) -- see "Rebuilt to match the reference's own real measurements" under Social
      follow section, further down.
  - **The country and language selectors, in `footer__content-bottom`, a separate part of the
    footer entirely: untouched by any of the moves above, at first.** **The language one is
    off since 2026-09-18** (the owner's own instruction, asked in passing while the pink below
    was being built: "you can also remove the language thing which appears at the end").
    `enable_language_selector: false` in `sections/footer-group.json` -- Dawn's own toggle, so
    nothing was removed from the liquid or the CSS. It wasn't doing much work anyway: it only
    ever showed "Language / English", never a second language to switch to, since Bulgarian is
    still not the store's default (see Current state). The country selector is untouched --
    the owner named only the language one -- and it still shows nothing on its own, since only
    one market is set up; `enable_country_selector` stays `true` for whenever that changes.
  - **Pushed in three rounds.** The block type first, its content minutes later (a same-push
    validator lag, as the lessons above describe, hit this footer once already that day when
    `contact_email` and its value went out together); the newsletter-into-the-row move and the
    social-block-first move landed together the next day, once the owner had seen the columns
    and asked for both.
  - **A pink background behind the whole group, and a fixed separator line, 2026-09-18 (the
    owner's instruction, after looking at moonmagic's own footer accordion on a phone).**
    `#F3E1DB` -- the same pink as the hero panel and the image marquee above it on the page
    (see the phone hero note under Design direction) -- on `.footer__blocks-wrapper` in
    `assets/crown.css`, phone only. The wrapper sits inside `page-width`, so this first shipped
    at the same left/right inset moonmagic's own accordion keeps rather than a full-bleed band
    (made full-bleed the next day -- see below); moonmagic's own equivalent is in fact plain
    white on a phone, measured directly (`rgb(255, 255, 255)`) -- the owner's own instruction
    was to reuse our pink regardless, not to match that colour, so that is what shipped.
    - **A hairline was missing above Нека ви помогнем, and the fix uncovered why.** moonmagic
      draws a line between every one of its own accordion rows, including before its own
      newsletter box; ours only ever drew one after each link column. The rule meant to put a
      line above the first column read `.footer-block--links:first-child`, written when the
      link columns really were the first blocks in the row -- but the newsletter box became
      the row's actual first grid item on 2026-09-17 (see above), so `:first-child` has matched
      nothing since then and that line has been silently missing for a day. Fixed by giving the
      newsletter box itself a trailing hairline instead (`.footer-block--subscribe`), which
      reaches the same line and does not care which block order comes first.
    - **The same background on a computer, 2026-09-19, no separator lines to add there.**
      Checked moonmagic's own desktop footer at 1440px: the four columns lie flat, side by
      side, no accordion and no line between them, because nothing is collapsed at that width
      to need separating -- the hairlines only ever meant "this row is closed, here's the next
      one." `.footer__blocks-wrapper` gets the hero's own desktop gradient
      (`linear-gradient(180deg, #FFE8E0 0%, #F3E1DB 100%)`) at the same `min-width: 750px`
      breakpoint, matching the flat pink reused on a phone -- but the separator-line half of
      the original request has nothing to do here, since moonmagic itself has nothing there
      either.
    - **Made full-bleed the next day, at the owner's request** ("touch the corners of the
      website like the section above it" -- the newsletter band, which reaches the true edges
      because `full_width` takes it outside `page-width` entirely, a Dawn section setting this
      footer block has no equivalent of). Same breakout this theme already uses for the
      Контакти footer picture (`.footer__social-media`): the colour moved off the wrapper
      itself onto a `::before`, `left: 50%` plus a `100vw` width and a translate to centre a
      full-viewport box regardless of the parent's own padding, at both breakpoints (the phone
      colour and the computer gradient both now paint that same pseudo-element, not the
      wrapper). `.footer`'s own `overflow-x: hidden` (set for that exact picture, see Контакти
      under Current state) already contains the few pixels the `100vw` box overshoots for the
      scrollbar, so nothing new was needed there. The columns and the newsletter form
      themselves are lifted to `position: relative; z-index: 1` so they keep reading above the
      colour rather than under it. Checked live afterwards at 375, 1440 and on Контакти: no
      horizontal scroll anywhere, the sticky header unaffected. **Removed the same day** -- see
      below.
    - **Fill colour dropped entirely, replaced with two hairlines, same day, at the owner's
      request.** The `::before`, its full-bleed breakout and the `position: relative`/
      `z-index` rules it needed are all gone -- nothing left to paint a colour onto, so no
      reason to keep the structure. In its place, a plain `border-top` and `border-bottom` on
      `.footer__blocks-wrapper` itself, explicitly no side lines ("don't put corner lines"),
      short of the viewport's true edges once again since the wrapper sits inside `page-width`
      the same way it did before the fill colour ever existed ("lines that are not touching
      the corners"). `3.2rem` of padding top and bottom keeps each line clear of the heading
      above it and the last link below it -- the owner's explicit worry that a line sitting
      flush against the text "will look bad". Checked live on the homepage, on a phone, and on
      Контакти: both lines inset from the edges, generous space either side of them, no
      horizontal scroll.
    - **Pink, at the owner's request** ("the same pink we used for the section with the moving
      pictures"): the image marquee's own flat colour, `#F3E1DB`
      (`assets/section-image-marquee.css`), on the existing full-width `border-top`/
      `border-bottom` -- still no side lines, still short of the viewport's true edges, only
      the colour changed here.
    - **"Small small" was a misreading, corrected the same day.** Read at first as "make the
      lines small", so they briefly became a pair of short, centred `4rem` lines (a `::before`/
      `::after` pair, since a `border` can only run the full length of its own element) --
      the owner meant the column *text*, not the lines. Reverted the lines back to the
      full-width border above; the newsletter heading, the link column headings and the links
      themselves came down from `1.3rem` to `1rem` instead (`.footer-subscribe__heading`,
      `.footer-links__heading`, `.footer-links__list .list-menu__item--link`,
      `.footer-links__summary` -- all four share the size so the whole group reads consistently
      smaller together). Checked live afterwards on the homepage, on a phone, and on Контакти.
    - **Thicker, and every other line in the section repainted the same pink, one more round
      later, at the owner's request** ("bigger and longer"; "for a phone make all lines that
      are in this section the same pink"). The outer top/bottom border: `0.1rem` to `0.2rem`,
      still full-width and inside `page-width`. The phone accordion's own row dividers
      (`.footer-links__toggle`'s `border-bottom`, previously
      `rgba(var(--color-foreground), 0.15)`) are `#F3E1DB` now too -- the only other lines
      this section has, since desktop's flat columns have none (see the "no separator lines to
      add there" note above).
    - **The hairline under the newsletter box removed, same round, at the owner's request**
      ("remove the line under the email" -- the email prints inside that same block now, see
      above). `.footer-block--subscribe`'s own `border-bottom` (added originally to replace
      the dead `:first-child` selector) is gone; its `padding-bottom` stays, so there is still
      air before Нека ви помогнем, just no drawn line there any more.
- **Social follow section.** `sections/social-follow.liquid` with
  `assets/section-social-follow.css` (2026-09-18, at the owner’s request, so the homepage’s
  Facebook/Instagram block could sit between Кое злато е за вас and Първи научавайте --
  before the newsletter section, a position the footer itself can never reach, since the
  footer always renders after every homepage section, not between two of them). Own its own
  heading, text, colour scheme and padding settings, but reuses the footer’s own markup and
  classes wholesale for everything else -- `.footer__social`, `.footer__social-intro`,
  `.footer__social-heading`, `.footer__social-text`, `render 'social-icons'` -- so every rule
  already tuned for this block (desktop button sizing, the side-by-side phone layout, hover
  colours) applies unchanged; the section’s own CSS file holds exactly one override,
  zeroing `.footer__social`’s own `margin-top` (written for clearing the newsletter band from
  inside the footer’s padding), since the section’s own padding does that job here instead.
  Started matching what was live in the footer: heading „Вижте работата ни“, text
  „Последвайте @cullinan_jewellery.bg…“, scheme-1, 48px padding top and bottom -- padding
  bottom came down to 16px the same day (`templates/index.json`, not the schema default, so
  it is explicit there now along with the other settings), closing the gap to the newsletter
  band to exactly match the gap above this section; see the padding-matching note further
  down under this heading.
  - **Homepage only.** `sections/footer.liquid` no longer prints its own copy of this block
    when `template.name == 'index'` -- only `template.suffix == 'contact'` still does, so
    Контакти is completely unaffected: same position (first in the footer, under Телефон),
    same heading, text and background picture as before.
  - **Pushed in two steps**, the section itself first and `templates/index.json`’s reference
    to it a couple of minutes later, per the same-push validator lag noted above.
  - **Bigger, and pure black, at the owner’s request the same day.** „Вижте работата ни“ and
    the line under it are now `rgb(0 0 0)` -- a deliberate exception to “no pure white or
    pure black” (Design direction), the same as the newsletter band and the dark buttons --
    and a size up (14px → 18px heading, 14px → 15px text). The Facebook/Instagram buttons
    grew with their icons and labels on desktop (26rem/6.4rem/2.4rem/1.4rem →
    28rem/7rem/2.6rem/1.5rem). All scoped to
    `.footer__social:not(.footer__social--contact)` -- since Контакти’s own “Ще ни намерите
    и там” block shares every one of these classes, and the owner did not mention it, it
    keeps its original size and colour. Phone sizing, already tuned so the two buttons share
    one row, was left alone too -- this request did not mention phones.
  - **Rebuilt to match the reference's own real measurements, still the same day**, at the
    owner’s explicit request after three smaller nudges (14→18→20px) still weren’t what they
    meant: “I want them to look the same on phone and on computer as moonmagic.” Measured
    moonmagic.com properly this time, at both 375 and 1440px, rather than the phone-only
    screenshot read the first phone pass was based on:
    - **Their heading is 35px on a phone, 55px on a computer — both centred there, except
      the phone, which is left**, exactly matching what our own phone treatment already had.
      Ours: 3.4rem phone, 5rem desktop, tracking eased from 0.1em to 0.06em since Cyrillic
      capitals need more room per letter than their own words at the same size.
    - **Their text is 14px / 16px** — ours now matches exactly.
    - **Their buttons are natural width from padding around the label, not a fixed box** --
      155px each at 375px (6px/13.8px padding, 16px label, 25px gap), 300×81px at 1440px
      (22px/20px padding, 22px label, 20px gap). Desktop now matches almost exactly (`width`
      and `height` changed from a fixed 28rem/7rem to `auto`, `padding: 2.2rem 2rem`, label
      2.2rem) since desktop has room to spare. Phone needed a real compromise: at their exact
      16px, ПОСЛЕДВАЙТЕ НИ (longer than either of their words) needs 385px against the 345px
      this block has at 375px -- 13px, tighter padding (0.4rem) and a 1.6rem gap is the
      closest fit that still leaves margin (313px used).
    - **Two bugs surfaced fixing this, both since corrected:**
      1. The first phone pass was tuned against a JS clone of the button, not the real
         rendered element, and estimated 338px of 345px available -- a 7px margin real font
         rendering erased. Dawn’s own `.list-social` carries `flex-wrap: wrap`
         (`component-list-social.css`), never overridden here, so going over silently
         dropped the second button onto its own row instead of overflowing visibly -- which
         is what the owner then saw and reported (“they are cut” / stacked again). Fixed by
         testing against the live elements directly and adding `flex-wrap: nowrap`, so a
         sizing mistake now shows up as visible overflow instead of a silent wrap.
      2. `.footer__social-intro`’s own `max-width: 52ch` (unscoped, pre-existing) resolves
         against the surrounding body-text size regardless of the heading inside it, about
         499px -- it never grew when the heading became 5rem, so “ВИЖТЕ РАБОТАТА НИ” (582px
         needed) wrapped to two lines on a computer too, which the reference’s own heading
         does not (only its phone version wraps). Widened to `64rem` for this block on
         desktop only.
  - **Turned back down a round later, at the owner’s request: the reference-matched size
    read as too big, and the two buttons should match each other rather than the reference’s
    own natural-width difference.** Three changes:
    - **Heading smaller**: 3.4rem → 2.4rem phone, 5rem → 3.2rem desktop.
    - **Both buttons the same fixed size**, not natural width per label: Харесайте ни
      (Facebook, the shorter word) sized up to Последвайте ни (Instagram)’s own size, since
      Instagram needs the most room -- `16rem` on phone (was 137px vs 160px natural), `30rem`
      on desktop (was 253px vs 295px natural). The phone label also came down from 13px to
      12px: fixing the box at exactly Instagram’s own natural width left zero slack for its
      own text, the same kind of margin the wrap bug above came from.
    - **On phones only, the pair moved from left-aligned-together to opposite ends of the
      row** (`justify-content: space-between`), at the owner’s own description -- one button
      “in the left corner” with the normal page gutter to the edge, the other its mirror on
      the right, and the space between them clearly bigger than that gutter (about 25px
      against ~15px). Desktop keeps its existing centred-as-a-pair layout; this was
      phone-only, matching what the owner described.
    All still scoped to `.footer__social:not(.footer__social--contact)` -- Кontакти
    unaffected throughout, checked again after this round.
  - **The boxes a little bigger again, one round later** -- box size only, icon and label
    left exactly as they were. Desktop had no constraint to work around: `30rem → 32rem`,
    padding `2.2rem 2rem → 2.4rem 2.2rem`. Phone did: the owner’s own previous request set
    the middle gap to stay clearly bigger than the page’s 15px gutter, and that gap is
    `345px available − both boxes` under `justify-content: space-between` -- so width had
    almost no room to give without eating back into it. `16rem → 16.2rem` (160px → 162px)
    keeps the gap at 21px, still clearly over 15px; the visible size increase instead came
    from height, padding `1.4rem → 1.8rem` top/bottom (50px → 58px tall).
    - **“Center them by the icons”, checked rather than assumed**: the icon and label were
      already on the same vertical centre line before this round (both 24.8px within the
      50px box) and stayed so after it (28.8px within 58px on a phone, 43.8px within 88px on
      a computer) -- `align-items: center` and `justify-content: center` on the link already
      do this and re-centre automatically as the box resizes, so nothing needed changing for
      that part of the request specifically.
  - **Back down again, computer only, 2026-09-19, at the owner's request** ("make the buttons
    smaller just for computer... for a phone stay how they are"). Undoes the bump above
    exactly -- `32rem → 30rem`, padding `2.4rem 2.2rem → 2.2rem 2rem` -- back to what this
    block measured as before it. Icon and label untouched, same distinction both sizing
    rounds have kept throughout. The phone rule is a separate `max-width: 749px` block
    entirely and nothing in it changed; checked live afterwards, still 162px/58px tall.
  - **Smaller again a moment later, and this time the box alone had nothing left to give.**
    Measured live against the real button before touching anything (Последвайте ни, the
    longer label, set to `width: max-content` temporarily): 30rem left it only 295px of
    natural content in a 300px box, 5px of slack. Shrinking the box further with icon, label
    and padding held fixed would have clipped or wrapped it -- the exact bug the phone version
    hit earlier in this same section (see the two-bugs note above) -- so this round shrank
    all four together instead, each candidate checked live the same way before picking one:
    label `2.2rem → 1.8rem`, icon `2.6rem → 2.2rem`, gap `1.2rem → 1rem`, padding
    `2.2rem 2rem → 1.8rem 1.6rem`, box `30rem → 26rem`. That combination measures 244px
    natural against a 260px box -- 16px of slack, more headroom than any round before it, so
    there's real room left if "smaller" comes up again. Phone untouched, still 162px/58px,
    checked live again after this round too.
  - **The gap to the newsletter band matched to the gap above this section, twice.** First
    try (the owner’s request, "the exact same space we have with the section above"):
    materials_teaser’s own `margin_bottom` (40) plus this section’s `padding_top` (48) makes
    88px above; to match it below, `padding_bottom` came down from its 48px default to 16, so
    16 + newsletter’s own `padding_top` (72) also makes 88 -- equal on paper, at both
    breakpoints (× 0.75 throughout). Still read as “too close” to the owner, because the two
    88s are not equal in what actually shows: above, all 88px sits on the light page ground
    before Вижте работата ни starts; below, only 16px was light ground before hitting the
    newsletter’s own black band -- the other 72px is the newsletter’s own padding, inside the
    black band, which never reads as space *between* sections at all. Fixed by matching the
    light-ground gap directly instead of the padding sum: `padding_bottom` raised to 88,
    matching the 88px light gap above exactly (66 on phones, same scaling both share).
    Newsletter’s own `padding_top` (72, black) is untouched -- now genuinely extra room
    inside its own band, not doing double duty as the visible gap. Only this section’s own
    setting changed either time -- materials_teaser and newsletter are untouched.
  - **Facebook and Instagram in their own brand colours, 2026-09-20, at the owner's
    request** ("the button of Facebook to blue... when you put the cursor on it to be blue";
    "maybe other colour" for Instagram, left to our judgement to "look good"). New
    `list-social__link--facebook` / `--instagram` modifier classes on the two links in
    `snippets/social-icons.liquid` (harmless everywhere; a Dawn snippet, touched only to add
    a class name, not to restructure it) -- coloured only within
    `.footer__social:not(.footer__social--contact)`, the same scope every other homepage-only
    rule for this markup already uses, so Контакти's own blush treatment is untouched. Both
    icons are drawn with `fill="currentColor"` (`assets/icon-facebook.svg`,
    `assets/icon-instagram.svg`), so setting `color` recolours the glyph along with the label.
    - **Facebook**: `#1877F2`, their own blue, as the outline/icon/label at rest; fills the
      same blue with white text on hover -- literally what was asked, nothing invented.
    - **Instagram has no single official colour** -- its mark is a gradient -- so resting
      state takes a colour from partway through that real gradient (`#C13584`, a
      magenta-pink) and hover fills with the gradient itself
      (`linear-gradient(45deg, #833AB4 0%, #E1306C 50%, #FD1D1D 100%)`), the most
      recognisable "Instagram" cue there is. Checked contrast against white at each stop
      before picking them -- purple 6.5:1, pink 4.3:1, red 3.9:1 -- and dropped the
      gradient's own bright orange/yellow tail, which only reads 2.75:1, for a deeper red at
      that end instead. Checked live on the homepage (both colours, both hover states) and on
      Контакти (unaffected, still black) at 375 and 1440px.

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
  Телефон, calling +359 88 287 4895 -- the owner’s number, still the block’s `phone` setting
  and still what the „Обадете се“ button dials, just not printed as text any more.
  - **The number no longer shown, at the owner’s request** (2026-09-15): only the call button
    remains under Телефон; `sections/contact-methods.liquid` no longer prints
    `block.settings.phone` above it. The line above the button also changed, since it used to
    say „Обадете ни се“ (call us) right next to the number itself: now „Предпочитате да
    поговорим? Ще се радваме да чуем от вас.“, which doesn’t depend on the number being on
    the page.
    - **That left the text looking stranded, so its position changed too** (same request,
      the owner left the exact fix to us): tried `align-items: start`, lining Имейл’s text up
      with the top of its 379px form instead of floating centred in the middle of it -- the
      owner then asked for it lower again, back toward centre, so `align-items: center` on
      `.contact-methods__columns` is unchanged from before this round after all.
      `.contact-methods__text` did keep `text-align: center` from the same round, so the lines
      centre over each other rather than ragged-right; the 4rem gap between the two columns
      moved from the text’s own one-sided `padding-right` to the grid’s own `gap`, so the
      centred text isn’t pushed off centre by padding on only one side.
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
    - **A background picture, at the owner’s request** (2026-09-15): the block can also carry
      one behind the heading, the line and the buttons, full-bleed to the page’s own edges --
      like the page banner above it, not just as wide as the column (the first try) and not a
      strip between the words and the buttons (the second). Empty until the owner uploads one
      (theme editor → Footer → Background picture behind the social block on the Контакти
      page). A **Veil over that picture** (0–90%, default 0) works the same way as the page
      banner’s own veil. `.footer__social-media` breaks out of `footer__content-top`’s
      `page-width` with `left: 50%` and a translate, since `inset: 0` alone -- correct for the
      page banner, which isn’t nested in a `page-width` -- only reached the column here.
      `100vw` also counts the scrollbar `100%` of the page doesn’t, so the box overshot the
      true right edge by the scrollbar’s width and scrolled the whole page sideways by that
      much. Fixed on `html` and `body` at first (`overflow-x: hidden` on both, since body
      scrolled on its own regardless of html’s overflow) -- **and that broke the sticky
      header and top bar site-wide**, found from the owner’s report that scrolling up no
      longer brought the bar back. Setting `overflow-x` to anything but `visible` forces the
      *used* value of `overflow-y` to `auto` too (the CSS overflow spec’s rule for a mismatched
      pair), quietly turning `body` into a scroll container of its own; `.section-header`’s
      `position: sticky` (`sections/header.liquid`) sticks to the nearest such ancestor, not
      necessarily the true viewport, so it stuck to a box that never itself scrolls and never
      moved. Fixed properly by scoping `overflow-x: hidden` to `.footer` instead -- the only
      element that actually overflows -- so `html` and `body` keep their default `overflow-y`
      and the header’s stickiness is unaffected. **Lesson: never set `overflow-x` on `html` or
      `body` on this site; scope it to whatever specific element is overflowing.**
    - **Closer to Имейл/Телефон, and Dawn’s own seams removed** (the owner’s request,
      2026-09-15): the row under Телефон left a second line right after its own, which was
      Dawn’s default hairline across the top of every footer -- gone on Контакти only, and
      the one above the footer’s bottom row (language, currency, payment icons) with it, the
      same kind of seam. The accordion rows’ own underlines are untouched everywhere. Contact
      methods’ **Padding bottom** also came down from 72 to 32, so the social block starts
      sooner after Телефон.
    - **Still too much space, so the block itself moved up** (the owner’s request, same day):
      most of the remaining 76px gap was Dawn’s own footer `padding_top` (36px) plus its own
      block spacing above the social markup, which contact-methods’ own padding could never
      reach. `.footer__social--contact` took a negative `margin-top` instead, scoped to
      Контакти rather than lowering the footer’s `padding_top` setting, which is site-wide.
      `-4rem` (a 36px gap) turned out too tight -- the owner asked for it back a little, so
      `-2rem` is what shipped, a 56px gap. Measured live with a temporary inline override
      before either push, once the first guess (a stale 116px reading) turned out off.
  At the owner’s instruction there is no live
  chat and no WhatsApp. No opening hours have been given. **No email row on this page
  specifically** -- Имейл links to the contact form, not an address -- though the site does
  now show one, site-wide, in the footer (`cullinanjewellery.bg@gmail.com`, added
  2026-09-17; see Footer: link columns, newsletter box, contact email under Custom code).
  The page already existed: Shopify’s default “Contact” page, `/pages/contact`, on the contact
  template, so it showed the new layout as soon as the template synced (checked on the preview
  2026-09-15: every measurement as built, the link to Въпроси и отговори intact, the form posting
  to `/contact`, the call button dialling +359882874895). No test message was sent. The owner
  renamed it „Контакти“ and added it to the Top bar menu after За нас on 2026-09-15 (store data,
  done in the admin; the handle stays `contact`).
- Homepage, working top to bottom: announcement bar, header and hero are built; the product
  row is built; a second hero-style banner for the shop's own silver sits right after the
  benefits row (see Silver banner above), then three atelier blocks lead to the inspiration,
  design and materials stories on За нас (see Atelier section above); the newsletter is
  still Dawn's default.
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
- **Which stones the business actually uses** (checked 2026-09-17, at the owner’s request: all
  2,038 products on the old site, read title and description, plus the public Instagram and
  Facebook). Counted without the sentence nearly every product repeats („Бижу, което сме показали
  тук с циркон, можем да изработим с диамант, сапфир, изумруд, топаз, рубин и др.“): циркони about
  535 (almost all gold; white, and pink, red, yellow, green, violet) · диаманти about 85 (gold only,
  and the old site says pieces with diamonds are made in 18K) · перли 55 · сапфири 17 · оникс 13
  (mostly men’s rings) · рубини 12 · изумруди 8 · опал 5 (one set) · цитрин 1 · топаз 1 · емайл 4 ·
  камея 1 (the recount below; the first pass said about 90 diamonds and 530 zirconia). About 1,200
  products have no stone at all. Silver rarely has one
  (15 of 817: pearls, zirconia, pink stones). Sapphires, rubies and emeralds nearly always sit with
  diamonds, mostly in white gold. Instagram, June–August 2026, shows rubies in rose gold and a
  diamond engagement ring. So the About text’s „диаманти, сапфири, изумруди и рубини“ leaves out
  the two stones used most, zirconia and pearls. Which stones reach the menu depends on the first
  ~50 products online: never a stone with no products behind it. The owner’s own Instagram calls
  the silver 925 (posts of 2026-06-26 and 2026-07-08); still confirm before the site says so.
  - **By collection** (recounted the same day at the owner’s request, with each doubtful match
    checked by eye: zirconia “в цвят сапфир” or “наподобяващ изумруд”, “циркон или диамант”
    options, „без украса от камъни или перли“ and Latin look-alike letters inside Bulgarian words
    all accounted for). Old-site categories folded into the store’s collections:
    - **Пръстени**, 736 pieces: Циркон 250 · Диамант 40 · Перла 13 · Оникс 11 · Сапфир 9 · Рубин
      3 · Изумруд 2 · Опал, Топаз, Цитрин 1 each. Годежни: Циркон 26 · Диамант 25 · Сапфир 4 ·
      Изумруд 1. Мъжки: Циркон 22 · Оникс 9 · Топаз 1. Брачни халки: none.
    - **Обеци**, 421: Циркон 115 · Диамант 19 · Перла 18 · Сапфир 3 · Рубин 3 · Изумруд 2 · Опал 1.
    - **Висулки**, 598 with медальони, кръстчета and кръстове: Циркон 125 · Диамант 20 · Перла 15 ·
      Сапфир 4 · Рубин 3 · Изумруд 3 · Оникс 2 · Опал 1.
    - **Комплекти**, 183: Циркон 38 · Перла 8 · Диамант 5 · Рубин 3 · Опал 2 · Сапфир 1 · Изумруд 1.
    - **Гривни**, 77: Циркон 4, nothing else.
    - Silver of every kind, 817: Циркон 8 · Перла 7. About 170 pieces say only „камъче“.
- **Settled 2026-09-14: silver is sold too.** The owner confirmed it. On За нас the history
  block says „от злато и сребро“, the design block „злато или сребро“, and the materials block
  names silver in its lead and gives it a paragraph (at the owner’s request, the same day).
  The benefits row mentioned only gold until 2026-09-20, when the owner asked for silver to be
  added there too ("add the text however you like it") -- „14 и 18 карата злато, а също и
  сребро.“ (see Benefits row under Custom code).
- **Settled 2026-09-20: silver's own fineness is 925.** The owner gave it directly ("we can
  change the text to проба 585,750 и 925"), settling what this file had flagged as
  unconfirmed since 2026-09-14 (Instagram calls it 925, but that had never been treated as
  stated on the site itself). The benefits row heading now reads „Проба 585, 750 и 925“. The
  first question on За нас („От какво злато са бижутата?“) still names only gold -- the owner
  has not asked about that one specifically.

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
- **Main menu** (Content → Menus → Main menu). As of 2026-09-16 it holds six flat items:
  Пръстени · Обеци · Висулки · Комплекти · Гривни · Диаманти.
  - **Stones go a level down** (the owner’s decision, 2026-09-16, asked for as “like a
    collection but under the main one”). Диаманти should stop sitting beside Пръстени and
    Обеци as a seventh product type; instead a parent item carries every stone as its
    children. **Named Камъни and holding all the stones, confirmed 2026-09-17** (the owner:
    visitors reach a stone either that way or through the filters). Nested menus need no
    theme work: Dawn renders the dropdown, and the visual mega menu falls back to the
    text-column one for any item without `visual_menu_item` blocks (none are set; see Visual
    mega menu under Custom code).
    - **A parent item is not itself a link.** On desktop (`snippets/header-mega-menu.liquid`)
      and in the phone drawer (`snippets/header-drawer.liquid`) an item with children renders
      as a `<summary>` that only opens its list. So the Камъни collection (every piece with a
      stone) is reachable from the menu only through a first child, „Всички камъни“.
    - **Two parent items link to tag-filtered addresses** (found 2026-09-17 through the
      footer’s Колекции column): Пръстени → `/collections/пръстени/Пръстени` (the collection
      filtered to the tag „Пръстени“) and Камъни → `/collections/камъни/Диамнати` (filtered to
      „Диамнати“, a misspelling of Диаманти). Harmless in the header, where a parent never
      shows its link, but wrong anywhere the menu prints as links. Fix in Content → Menus →
      Main menu: point each at its plain collection with no tag. The footer column lists its
      links by hand until then.
- **Collections.** Six exist as of 2026-09-16: Висулки, Гривни, Диаманти, Комплекти, Обеци,
  Пръстени. **Циркони does not** (`/collections/циркони` 404s) and has to be created before
  anything links to it -- see the no-empty-collection rule under How we work.
  - **The stone collections to create** (sent to the owner 2026-09-17, from the old-site count
    under Current state): Камъни, matching any stone tag, then one per stone in order of how
    many pieces the old site has -- Циркони, Диаманти (exists), Перли, Сапфири, Оникс, Рубини,
    Изумруди, Опал, and Топаз and Цитрин with one piece each. Each fills itself from a product
    **tag** in the singular (Циркон, Диамант, Перла, Сапфир, Рубин, Оникс, Изумруд, Опал, Топаз,
    Цитрин): condition Tag includes the word. Tags rather than a metafield because a piece often
    has two stones (the rubies, sapphires and emeralds nearly all sit with diamonds), and
    Shopify’s collection conditions take only single-value metafields, not lists; the same tag
    feeds the filter below, so each stone is entered once per product. Enamel and the cameo are
    not stones and stay out. Creating the collections early is harmless; a stone goes into the
    menu only once a tagged product is online.
  - Shopify is replacing manual and smart collections with one model that takes conditions and
    hand-picked products together. If the owner’s admin still has the old model and Диаманти
    was made manual, it cannot take a condition: make it again as a smart collection under the
    same name, so `/collections/диаманти` (the homepage tile’s link) keeps working.
  - **Type-by-stone collections** („Пръстени с циркони“ and so on; the owner asked for the full
    list 2026-09-17): 33 combinations, the ones the by-collection count under Current state
    finds -- 10 for Пръстени, 8 for Висулки, 7 each for Обеци and Комплекти, 1 for Гривни.
    Names use the plural for циркони, диаманти, перли, сапфири (със), рубини, изумруди and the
    singular for оникс, опал, топаз, цитрин. Each fills itself with Match all conditions:
    Product type is equal to the type, and Tag includes the stone, so every product needs its
    Product type set (Пръстени, Обеци, Висулки, Гривни, Комплекти). A main menu item that gains
    these as children stops being a link (see Main menu above), so each such list needs a
    „Всички …“ first child.
- **Stone filters inside the product-type collections** (the owner’s decision, 2026-09-16,
  wanted alongside the submenu above: narrow by stone within Пръстени, Обеци and so on).
  The theme is already done here -- `templates/collection.json` has `enable_filtering: true`
  with the horizontal filter bar, and the bar renders. What is missing is store data: every
  product needs its stone tags (the same tags that fill the stone collections above), and a
  **Tags** filter has to be added in the free **Search & Discovery** app under Filters,
  renamed „Камък“; the app can rename a filter and hide values, so a tag that is not a stone
  stays out of it. Filters are store-wide, but a collection lists only the values its own
  products carry (Shopify’s Search & Discovery help: “Only filter values that apply to
  products of a collection or search result display”), so nothing is set per collection:
  Гривни will simply offer Циркон alone. Until then the bar only offers Shopify’s own Availability and Price, which is
  what a collection page shows today. Those two also still read in English, because that is
  still the store’s default language (see the Bulgarian note above).
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
