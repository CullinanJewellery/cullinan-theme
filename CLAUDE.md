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

**The standing formula, put plainly by the owner (2026-09-25): moonmagic's own design
principles + Cullinan's own requirements + the specific things borrowed from hestiahome.bg =
Cullinan's own design system.** In practice, that means building any new section checks all
three, not moonmagic alone:
- **moonmagic.com** — the default lens for structure, spacing, proportions and layout
  behaviour, per the paragraph above.
- **hestiahome.bg** — a second, narrower reference, already the source for specific things
  (the pill button shape, the hover-lift animation, the Jost typeface). Worth checking
  whenever a new element touches buttons, motion or type specifically, even though it isn't
  the default reference for layout the way moonmagic is.
- **Cullinan's own requirements** — the constraints neither reference has to deal with:
  Bulgarian copy and Cyrillic type, the no-burned-in-photograph rule, EUR pricing, and
  whatever the owner states as a fact about the business. These aren't a source to check
  once; they're a filter every borrowed pattern has to survive.

The Design System artifact (a claude.ai canvas link, ask the owner or check recent memory
for the URL) records the result of this formula per decision — colour, type, button and
layout choices each tagged moonmagic / hestiahome.bg / our own call — and gets a new entry
in the same pass as this file whenever a new section adds a token-level decision worth
tracking, not saved up for later.

**The formula has been lopsided, and the owner has said so (2026-10-04: "i like most of the things
that we made but i feel like it is not mine because it looks on some parts to close to moonmagic").**
Checked against their homepage that day: **all thirteen of our homepage sections had a twin on theirs,
in the same order** (hero, facts and marquee, bestsellers, stones, categories, promises, the two
banners, the story block, reviews, Instagram, newsletter). Theirs adds two more picture-and-text
blocks, a second category row and a tree-planting block; ours had nothing theirs lacked until the
Custom request band. The blush gradient, the greige band and the pink stars were measured off their
site, Jost is hestiahome's face, and several headlines take their rhythm („Нашето сребро. Нашият
блясък.“ is "Their stone. Their story."). The formula's third term, Cullinan's own requirements, has
been the thin one. **Proposed, none of it decided**: the Custom request band (built, see Custom request
section under Custom code) and the Identity directions board (a comparison page, same place), then an
occasions row, a ring-size page and product data. **Nothing about colour or type changes until the
owner chooses a direction.**

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
      - **Correction, 2026-09-27: it was never actually rendering at 40px.** `.banner__heading`
        in `assets/crown.css` carries its own unscoped `clamp()`, which ties Dawn's `.h1`/`.h2`
        presets on specificity (one class each) and loads after `base.css`, so it wins by
        source order regardless of which preset the section picks -- the same silent-override
        pattern later found on the collection title and the category-mosaic heading. Measured
        live: the heading had been rendering at 65px the whole time, not 40px, from this clamp
        (`clamp(2.4rem, 7vw, 6.5rem)`), completely undisturbed by the h0 → h1 change above.
        Cut smaller at the owner's request the same day -- see Hero heading under Custom code
        for the current values.
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
  - **Fourth, fifth and sixth, 2026-09-29 and 2026-10-01**: the stones row's two lines (see
    Stones row); at the owner's instruction ("the footer needs the text to be all in black")
    every piece of the footer's text plus the Social band's heading and line (see Footer:
    link columns and Social band under Custom code); and, the same day ("make the text
    black"), all the text in the product page's buy box (see Product page under Custom code).
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
- **The hero's own button is a rectangle, not a pill, since 2026-09-22** ("make the button
  in section БЛЯСЪК БЕЗ УСИЛИЕ with a rectangle form and don't change the size"). A second
  deliberate, scoped exception to the site-wide pill (see Square corners under Design
  tokens) -- `border-radius: 0` on `.banner__buttons .button`, scoped to the hero's own
  section id in `assets/crown.css`, the same technique the silver banner's own button used
  for its own square shape (see Silver banner under Custom code). Nothing else about the
  button changed: no width, height, padding or font-size touched, only the corner. The
  silver banner shares this exact markup and colour scheme but a different section id, so
  its own button stays a pill, untouched.
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
| scheme-6 | `#F5F4F0` light greige | `#221F1C` | The reference’s band colour, and measured off their own band again for the stones row on 2026-09-29. Нашето вдъхновение and Всеки камък има значение on the homepage. Buttons `#5B5548`. |
| scheme-7 | `#D8DFBF` milky matcha | `#221F1C` | Нашите материали on the homepage. Owner’s choice, 2026-09-14. Buttons `#3D5229`. |
| scheme-8 | `#F1E3DC` marble blush | `#221F1C` | Контакти: open-row panels and the footer’s Facebook/Instagram hover, matched to the banner picture (2026-09-15). Black buttons. |

- Type: **Jost** for everything since 2026-09-14: headings at 550 since 2026-10-03 (halfway
  between regular and bold; 700 before that, and 400 for part of that day -- see Weight under
  Custom code), text regular (400).
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
  pixel for the header once the new link allowed a comparison. Later replaced (exact date not
  recorded) by https://otepvnbsv6hilfde-107185537364.shopifypreview.com, used throughout the
  image-marquee and hero-facts work on 2026-09-22, then that one replaced the same day by
  https://a83q69mv3t9zni67-107185537364.shopifypreview.com -- the owner asked for every check
  from here on to use this link specifically ("everytime you are done check the preview
  link"), so use this one until told otherwise, not just whichever one happens to still work.
  That one expired by 2026-09-25 (confirmed by fetching it directly: HTTP 410, Shopify's own
  generic "sell online" landing page in place of the theme) and was replaced the same day by
  https://h6stv2mlmbvp65ou-107185537364.shopifypreview.com, then replaced again on 2026-09-26 by
  https://tto3ltyatcwhjqvp-107185537364.shopifypreview.com, then replaced again on 2026-09-27 by
  https://33dxf8xm5v7ugt12-107185537364.shopifypreview.com, which expired mid-session on
  2026-09-29 (Shopify served its own "This preview link has expired" page in place of the
  theme), and was replaced the same day by
  https://8vn93bqbu3rdym1e-107185537364.shopifypreview.com, which expired on 2026-10-01
  (HTTP 410, Shopify's own "This preview link has expired" page; found when a check of the
  product page came back as the generic sell-online landing page). No replacement had
  arrived when the product page work below was pushed, so **that push is unverified live**:
  ask the owner for a new link first thing, then look.
  - **Expired again on 2026-10-03**, in the middle of a session: the link in use
    (`54jigitxu7tro3gx`) began answering HTTP 410 with Shopify's generic "sell online" page, in the
    browser pane and from `curl` alike. Everything pushed before that was checked live; the homepage
    story and reviews work and the shorter За нас, pushed after, are **unverified on a page** until the
    owner sends a new link. **The custom-request band (2026-10-04) is unverified on a page too, and its form has
    never sent a message.**
  - **A pushed asset can be checked without any preview link.** The draft theme (id 2) serves its
    files publicly, with no password, at `https://2fp38p-az.myshopify.com/cdn/shop/t/2/assets/<file>`:
    a new file answers 200 within seconds of a push and 404 before, and **a changed file must be read
    with a `?v=<anything>` query**. The edge caches the plain path -- and any other query, such as
    `?x=` -- for up to a year (`cache-control: max-age=31557600`; `Age: 280` on a file changed four
    minutes earlier) and only `v` bypasses it, which is the one page links carry. A plain check of
    a changed file therefore reads as a dropped push when it is only cached: on 2026-10-03
    `section-atelier.css` looked unchanged for over a minute and came back new with `?v=`. The theme id
    is in any page's asset URLs (`/cdn/shop/t/2/assets/`). Liquid sections, JSON templates and locale
    files are not served this way, so a section or template push can only be inferred from an asset
    pushed in the same commit, or seen on a page.
  - **A local mock needs http, not file://.** The pane opens a `file://` page as a static
    snapshot and refuses its page tools ("This tab shows a local file"). Serve the mock
    over http with `preview_start` and a temporary `.claude/launch.json` pointing at a
    throwaway Node server (untracked; delete it afterwards, and never `git add` it).
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
    - **Waiting is not a cure, either.** A fourth drop on 2026-09-28: `crown.css` went out
      about four minutes after a push that had been live within a second, GitHub had the
      commit, and the served file stayed on its old `?v=` for over five minutes. The same file
      re-sent with one word changed in a comment landed in seven seconds. So poll for 40
      seconds, then re-send -- do not keep waiting. Poll in chunks of about 30 seconds: a
      single browser-tool call is cut off at 45.
  - **Test a CSS override at the start of `<head>`, not the end of the page.** Dawn's section
    stylesheets load from inside the section, after `crown.css`, so a rule that only ties a
    Dawn rule on specificity loses on order. A test that injects the rule at the end of the
    body always comes last and always wins, which is how the heading inset (see Най-продавани)
    passed its check and then failed live. Put the test `<style>` first in `<head>`, the
    worst position a real rule can have, so that only specificity can make it win.
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
    - **Wrong about the view-all one, corrected 2026-09-27.** moonmagic does have exactly
      this button: **SHOP BESTSELLERS**, directly under their own bestseller row -- the same
      role and the same position as our Вижте всички under Най-продавани. The check above
      looked for "plain navigation links" and missed it. Measured at 1440px: **486 x 72,
      22px, weight 500, 2.2px tracking**. `.collection .collection__view-all .button` now
      matches exactly (48.6rem / 7.2rem / 2.2rem, `letter-spacing: 0.1em` reproducing their
      2.2px at that size), confirmed live on every value. The phone rule keeps its own
      smaller size, and the atelier and contact-methods buttons are untouched -- they still
      have no moonmagic equivalent, so the family is no longer internally consistent by
      design: the one with a real reference now follows it.
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
    - **That is exactly what happened, 2026-09-26** ("when you put the cursor on them they go
      up and they zoom... i don't want that", about the homepage product row). The setting
      stays on, so buttons still lift; only the card half of Dawn's own rule is switched off
      in `assets/crown.css`, reusing base.css's own selectors since crown.css loads after it.
      The **zoom** was a second, unrelated effect from `component-card.css` -- a
      `scale(1.03)` on the card image above 990px. That file loads from inside each section,
      so it lands *after* crown.css; the override adds `.product-card-wrapper` purely to win
      on specificity, not to narrow what it reaches. Checked live at 1440px with a real
      hover: the card's own transform and the image's are both `none`, while Вижте всички
      still lifts `-2.5px`.
    - **Hover on a card is then split into three zones, same day, at the owner's request**
      ("i want when you put the cursor on the picture ... the picture to change to the other
      picture and when you put the cursor on the colors that are in circle below the text to
      change to the picture color"): the **picture** swaps to the product's second photo
      (Dawn's own `show_secondary_image`), a **swatch** swaps to that colour's own photo, and
      the **text** between them does nothing. Dawn fires its second-photo swap from
      `.card-wrapper:hover`, which covers the whole card including the title -- that whole-card
      firing was what the owner was reacting to.
      - **The obvious fix doesn't work, and the reason is worth keeping.** Rescoping the swap
        to `.card__media:hover` never matches at all: Dawn's card carries a **stretched link
        overlay** (`.card__heading a::after`, `inset: 0`, so the whole card is clickable) that
        lies over the picture and swallows its hover. Confirmed live -- hovering the photo
        reports the `<a>` as the deepest hovered element, not the media div. That is very
        likely why Dawn keys off the wrapper in the first place. So `card-swatches.js`
        measures the pointer against the picture's own bounding box on `mousemove` and
        toggles `.card--over-media` on the card, which `crown.css` keys off instead. Clicks
        are untouched -- the overlay still takes them, so the whole card still opens the
        product.
      - **Swatch hover came back here, after being removed two commits earlier.** What the
        owner disliked then was the whole-card swap firing at the same time, not the swatch
        behaviour itself. It now *picks* the colour outright rather than previewing it, so
        moving the cursor away leaves the picture on the colour landed on -- answering the
        earlier "i cant see the color that i pick". Click still does the same thing.
      - Checked live at 1440px with real hovers, all three zones: picture → second photo
        (opacities 0/1), text → nothing (card hovered, photo unchanged), swatch → that
        colour's photo and its own pressed ring, with the second photo staying hidden.
      - **Re-checked 2026-09-28 after a QA pass wrongly called the picture hover broken.**
        It was not: the swap works. Two things made it look dead. Only one of the four test
        products (Пръстен с верижка) has a second photo, so hovering the other three shows
        nothing by design. And the test pane produced **no animation frames** (a
        `requestAnimationFrame` counter read 0 over 600ms), so the 0.4s opacity transition sat
        at 0% progress and `getComputedStyle` kept returning its start value however long the
        wait -- which also made every "the rule is not taking effect" experiment inconclusive.
        Finishing the transitions by hand (`getAnimations().forEach(a => a.finish())`) then
        gave first photo 0, second photo 1; a real hover on the picture set `card--over-media`
        and a real hover on the title cleared it. **Where a value is behind a transition,
        finish the animations before reading it, or check that frames are running first.**
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
  - **Three bands became one, with a list layout, 2026-10-03** (the owner: "the three section with
    the history and the gold and does think i think we need to make it in section or something
    like that to look better and to be the same as moonmagic"). **A reading, not a certainty**:
    "in section" was taken as *one section*, because the owner said it in the same message that
    asked for less text and fewer detours, and because moonmagic's own equivalent is exactly that.
    Its homepage has **three "image with text" sections** (Soulful jewelry, Fine diamonds jewelry,
    Made for you), and the first is **one block carrying three facts**: a 65px capital heading, then
    three short facts -- each a small capital label with one line under it ("ESTABLISHED 2016 / Over a
    decade of craftsmanship and trust", "ARTISAN CRAFTSMANSHIP", "GENUINE GEMSTONES") -- then one
    486 x 72 button, beside a 673 x 602 picture, on `rgb(245, 244, 240)` (scheme-6). Measured at 1440.
    Ours is that block, with the history, design and materials as the three facts.
    - **`design_teaser` and `materials_teaser` are gone from the homepage; `atelier` keeps its key and
      takes the whole story.** Eyebrow „От 1991 година“, heading „Занаят с история“, facts
      **НАШЕТО ВДЪХНОВЕНИЕ** — „Името ни идва от Кулинан — най-големия диамант с ювелирно качество,
      откриван някога.“ (the За нас lead, word for word), **НАШИЯТ ДИЗАЙН** — „Всяко бижу започва като
      наш собствен 3D модел и се изпипва на ръка.“, **НАШИТЕ МАТЕРИАЛИ** — „Злато 14 и 18 карата, сребро
      925 и камъни, оценени от специалист.“, one button „Открийте историята“ to `/pages/за-нас`, the
      picture on the **right**, on scheme-6 with its taupe button, with 40px of page ground above and
      below. Every fact is one the site already states (За нас, the benefits row, Качество и детайли).
      The old per-story anchors (`#vdahnovenie`, `#dizain`, `#materiali`) are no longer linked from the
      homepage and still work from the jump links on За нас.
    - **The section gained a "Text layout" setting**, default **Facts side by side** -- the old look,
      so nothing that already used the section changes. **Facts as a list** sets the heading in
      capitals at the size of every other homepage heading (the collection-title clamp, 26 to 40px),
      not their 65px, which the owner has brought down on each of them; each fact is a small capital
      label (its `value`) with one 16px line (its `label`) under it, a hairline between facts. The same
      two settings serve both layouts, which is why the setting's help text says which is which.
    - **Pushed in two steps**, the section and stylesheet first, `templates/index.json` after -- a
      template cannot use a setting its section does not hold yet. The page is **about 1,300px shorter** (one
      668px band at 1440 where three stood).
    - **Alternatives, if "section" meant something else**: keep three bands and restyle them as full-bleed
      picture banners like the silver banner and new arrivals (five banners in a row would repeat); or one
      section with three cards side by side. Each is a template change plus a stylesheet, not a rebuild.
    - **The notes below this one describe the three bands it replaced**: how they were built, their
      colours (scheme-6, the page ground, scheme-7), buttons and margins. They stay as the record;
      the one band now on the page is the first of them, on scheme-6 with the taupe button.
    - **A cosmetic gap, only until photography**: the text column is about 680px wide and the facts
      take about 420px of it, so there is air between the words and the picture -- moonmagic's has the
      same (their text is 500px beside a 673px picture with about 210px between).
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
- **New arrivals banner.** A third `image-banner` instance, key `new_arrivals`, directly under
  the silver banner (`templates/index.json`), added 2026-09-30 at the owner's request ("lets
  make a section under НАШЕТО СРЕБРО. НАШИЯТ БЛЯСЪК. but like moonmagic NEW ARRIVELS").
  - **Their NEW ARRIVALS is not a product row, which is what checking first settled.** It and
    THEIR STONE. THEIR STORY. are the **same component** -- both `homepage_multi_hero`, both
    1425 x 570, a full-bleed photograph with white text laid over it. Since the silver banner
    was already built from THEIR STONE, this needed **no new section, stylesheet or setting**:
    a third instance of `image-banner` and nothing else.
  - **Content on the right, then back to the left, and the colour the thing that carries the
    difference** (2026-09-30). It first shipped mirroring moonmagic, whose NEW ARRIVALS sits
    right where THEIR STONE sits left, with no subtitle -- measured at 1440, content at left
    895.5 against the silver banner's 26.8. The owner then asked for the whole section to be
    built like the silver banner instead: "i want the color to be different and the section to
    be design to the same just the buttons and text up to be in the left how you made it".
    - **So it is the silver banner's design in a different colour**, which is still the move
      moonmagic makes between its own two stacked banners -- their grounds differ (blush
      `#f2d9d1`, neutral `#faf8f4`) while the layout does not. `desktop_content_position` back
      to `middle-left`, and the **same picture cut** (`clip-path: inset(0 10% 0 10%)`), the
      **same visible empty slot**, and the **same 1% text inset** as the silver banner. Each
      one joins that banner's own existing rule rather than getting a duplicate, so the two
      cannot drift apart.
    - **The cut needed one thing the silver banner does not.** The shared empty-slot colour is
      `rgb(242 240 236)` -- which is `#F2F0EC`, **exactly scheme-2's own background** -- so on
      this band the placeholder and the ground would have matched to the pixel and the cut
      would have been invisible. It takes scheme-5's sand `#E7E1D6` instead, scoped to this
      section. Temporary by nature: Dawn only adds `--empty` when there is no image, so it
      goes by itself once a photograph is set.
    - **Settled: the content sits on the opposite side from the banner above it**
      (2026-09-30, the owner, after two rounds of it moving). That is what moonmagic does --
      THEIR STONE. THEIR STORY. left, NEW ARRIVALS right -- and it is the point of the pair:
      the mirror is what stops two full-bleed bands reading as one repeated thing.
      `desktop_content_position: middle-right`, with the silver banner's own 1% inset
      **mirrored to `padding-right`** so it sits the same distance from its own edge.
      Confirmed live at 1440: silver heading 27px from the left, new arrivals 27px from the
      right, `flex-start` against `flex-end`.
      - **The cost of getting this wrong was three rounds on one setting.** The first build
        had it right, off moonmagic; it moved left on a request that read as "build it like
        the silver banner", and came back. **When a section is explicitly modelled on a
        reference pair, check the pair before moving one of them.**
    - **Checked live at 1440**: silver keeps the pink gradient, new arrivals paints
      `rgb(242,240,236)`; both carry `inset(0px 10%)`; both have `justify-content: flex-start`
      with heading and button at left 26.8; and the slot reads `rgb(231,225,214)` against the
      band rather than matching it. Confirmed by eye as well.
    - **A script wrote itself into `crown.css`, and the reason is worth keeping.** The edit
      script read its input with `process.argv[1]` -- correct under `node -e`, where the first
      argument really is `argv[1]`, but **wrong for a script file, where `argv[1]` is the
      script's own path and the first argument is `argv[2]`**. So the stylesheet got a block of
      JavaScript spliced into it. Caught by the brace count run straight after, then
      `git checkout --` on both files and redone from the last commit. **Count braces after
      every scripted CSS edit**, and prefer checking the count outside comments -- the plain
      count had been passing on comment text alone.
  - **The button links to `/collections/all?sort_by=created-descending`**, checked on the
    preview before it was used: HTTP 200, the sort dropdown comes back with
    `created-descending` selected, and the order genuinely differs from the default
    (title-ascending). A destination that means what "new" says and **can never be empty**,
    which no collection this store could make today would manage. Theirs points at a curated
    `/pages/featured/new-arrivals`; that is worth swapping to once such a page exists.
  - **Copy**: „НОВО ПРИ НАС“ rather than a literal rendering of New Arrivals, and „Вижте
    новото“ on the button so it does not echo „Разгледайте среброто“ directly above it.
  - **Square corners, the fourth scoped exception to the site-wide pill** after the hero, the
    silver banner and Add to cart. Both of moonmagic's stacked banners measure
    `border-radius: 0`, and ours sit one directly above the other, so a pill on the lower one
    read as an accident. It joins the silver banner's existing rule rather than getting one
    of its own.
  - **It matches the silver banner exactly, and it has the gap** -- both corrected within the
    hour, at the owner's own prompt ("make the heading and button the same size as the silver
    banner also what did i tell you about the space between the sections").
    - **Heading and button read what the silver banner reads, at every width**: 3rem heading
      from 750px up, a 36rem x 6.8rem button at 1.5rem, 4.4rem at 1.2rem on phones. Each one
      **joins the silver banner's own existing rule** rather than getting a duplicate set, so
      the two cannot drift apart when either is next tuned. Confirmed live at 1440 and 375:
      identical heading size and identical button box on both.
    - **The gap was the real mistake, and it was a mistake of process rather than of taste.**
      This shipped flush against the silver banner, matching moonmagic's own stack, with the
      difference merely flagged for the owner to notice. But space where two sections meet
      had already been asked for three separate times -- the benefits row against the silver
      banner, the atelier bands against their neighbours, and the stones band against both of
      its own -- always answered with the same 40px, 30px on phones. **That makes it a
      standing value on this site, not a decision to retake per section.** Flagging a known
      answer instead of applying it is what the owner was pointing at.
    - Measured after the fix, on what actually paints rather than on the section wrappers:
      benefits to silver **40**, silver to new arrivals **40**, new arrivals to atelier
      **40**; 30 / 30 / 30 on a phone. The whole run down that part of the page is even.
      - **Wrapper-to-wrapper would have reported the last gap as 0 and it is not.** The
        atelier carries its margin on the inner element that paints the band, not on the
        `#shopify-section-` wrapper, so the wrapper starts flush while the colour starts 40px
        later. **Measure the painted element, which is the thing the eye sees.**
    - **Its own background, 2026-09-30** ("make the background different like moonmagic").
      Theirs do not share a ground: THEIR STONE. THEIR STORY. is a blush `#f2d9d1` and NEW
      ARRIVALS a neutral `#faf8f4`, so the move is **from colour to neutral**. Ours makes the
      same one -- scheme-5's pink gradient to **scheme-2**, soft stone `#F2F0EC`.
      - **scheme-2 rather than the nearer-looking scheme-6.** `#F5F4F0` is almost exactly
        their `#faf8f4`, five points a channel -- but Нашето вдъхновение directly below is
        already scheme-6, so matching their hex would only have moved the sameness one
        section down. scheme-2 is also the token this theme already designates for
        alternating sections, so nothing new is invented. The run reads stone, pink, stone,
        greige.
      - It brings a **black button** where the silver banner keeps its dark brown, which is
        what moonmagic does too: their two banner buttons differ in colour as well, black on
        the blush and white on the neutral.
    - **Changing the colour scheme did not change the background, and the reason matters.**
      Both pink rules in `crown.css` are keyed to **`.banner.banner--mobile-bottom`, not to
      scheme-5** -- so every banner whose words sit below the picture on a phone was taking
      the pink whatever its scheme said. Switching this section to scheme-2 moved its button
      to black and left the ground exactly as it was. **The colour scheme was never what
      decided it**, which the comment above those rules did not say.
      - The **phone** override hands the box back to its own scheme
        (`background-color: rgb(var(--color-background))`), which works because Dawn puts the
        `color-scheme-*` class on `.banner__box` -- the pink there is an override of a
        background the box already had.
      - The **desktop** one cannot do the same. The scheme class is on the box, not on
        `.banner`, so `--color-background` read at `.banner` is the page's own value, not the
        section's -- confirmed live, `252,252,251` on the banner against `242,240,236` on the
        box. It carries scheme-2's colour **literally**, exactly as the rule above it carries
        the pink literally. **Change that hex if this section's scheme ever changes.**
    - **Checked live at 1440 and 375.** Desktop: silver keeps the gradient and its `#391D13`
      button, new arrivals paints `rgb(242,240,236)` with a black one, headings both 30px and
      buttons both 360 x 68. Phone: panels genuinely differ, pink `rgb(243,225,219)` against
      stone `rgb(242,240,236)`, buttons both 335 x 44, headings both 23.25px, no overflow.
    - **One cosmetic thing, and only until photography**: on a phone the empty picture slot
      is the same stone as this section's own panel now, so the slot is invisible there --
      where on the silver banner it still reads as a square against the pink. A real
      photograph ends it.
  - **The served stylesheet strips quotes out of attribute selectors.** A check for
    `[id$="__new_arrivals"]` in the live CSS came back empty while the rule was already there
    as `[id$=__new_arrivals]`, and it read as a dropped push. The existing lesson about
    searching minified CSS without spaces extends to **quotes**: match the bare token.
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
- **Stones row.** `sections/stone-meanings.liquid` with `assets/section-stone-meanings.css`
  (2026-09-29, at the owner's request: a homepage section "like moonmagic: DESIGNED TO MEAN
  MORE but for our store"). Measured theirs at 1440 first: a Swiper carousel of items 240 x
  330, 20px apart, each a picture of the **loose stone** above a meaning in capitals
  (28px/500) and the stone's name under it (26px/400), each linking to that stone's own
  collection, under a 65px centred heading.
  - **Six stones, and the count is the whole argument.** The owner asked the right question
    -- all of them, or only some? -- and answered it from the old-site audit under Current
    state: Циркон ~535, Диамант ~85, Перла 55, Сапфир 17, Оникс 13, Рубин 12, Изумруд 8,
    Опал 5, Цитрин 1, Топаз 1. Shipped: **Циркон, Диамант, Перла, Сапфир, Рубин, Изумруд**.
    Оникс is left out as almost all men's rings, a different customer from the site's own;
    Опал, Цитрин and Топаз because a shopper who clicks a stone and finds one ring learns
    the shop is smaller than it looks, which is the opposite of what the section is for.
  - **Each stone gets one word**, not moonmagic's spiritual meanings (Intuition, Strength):
    Блясък/Циркон, Завинаги/Диамант, Класика/Перла, Дълбочина/Сапфир, Страст/Рубин,
    Рядкост/Изумруд. Plain character rather than crystal mysticism, which would read as
    borrowed on a classical goldsmith -- and Блясък echoes the hero's own „Блясък без усилие“.
  - **Two departures from theirs.** A plain wrapping row, not a carousel: theirs moves
    because they carry eighteen stones, six fit on one line here, and a row that holds still
    reads calmer (Restraint reads as expensive). And smaller type -- their 28/26 sits under a
    65px heading, while this site's own headings came down hard on 2026-09-27, so the meaning
    takes the small spaced capitals used for every other label here and the name a card
    title's size.
  - **No links, on purpose.** The stone collections do not exist yet (only Диаманти, see
    Waiting on the Shopify admin), so every block's `link` is empty and a tile without a
    destination renders as a tile rather than a link -- the same guard the category mosaic
    uses. **Never link to an empty collection.** Worth knowing when they are created: the
    old-site counts are for 2,038 products, and only ~50 go online first, so what sits behind
    each stone at launch will be a fraction of the numbers above.
  - **Placed where moonmagic places theirs**, checked on their homepage rather than guessed:
    hero → bestsellers → DESIGNED TO MEAN MORE → shop by category. Here that is between
    Най-продавани and Разгледайте по категория.
  - Pushed in two steps, section then template, per the validator lag -- and **the template
    push was dropped**, the fifth time that has happened: the homepage kept serving twelve
    sections with no `stones` key while GitHub had the commit and the tree was clean. Re-sent
    with the section object's keys reordered (same content, different bytes) and it landed in
    four seconds.
  - **Checked live on the new preview link**: 6 columns at 1440 with 200px square slots and a
    40px heading, 3 columns between, 2 columns and 164px squares at 375px, no overflow at
    either width, and no tile is a link. Sits between Най-продавани and Разгледайте по
    категория as intended.
  - **The six pictures exist, made with ChatGPT by the owner and uploaded 2026-09-29**
    (`ChatGPT_Image_Sep_29_2026_07_4*.png`, transparent PNGs, which is what
    `photography/README.md` asked for). They reached the repository as Shopify's own
    commit `ac8598a`, not through this session.
    - **So pull before editing `templates/index.json`.** The local copy was one commit
      behind when the rework below started; editing and pushing without pulling would have
      wiped all six `image` settings. Anything the owner sets in the theme editor arrives
      this way. `git fetch` first, every time, before touching a template.
  - **Reworked 2026-09-29, at the owner's request** ("we need a background like moonmagic
    and we need to make the pictures smaller also the text should not be that down of the
    picture look at theirs and we need a space between the stones and also why can't i
    click on them"). moonmagic's own row was re-measured at 1440 rather than reusing the
    numbers taken when this section was built.
    - **The band colour is theirs exactly, and was already a token here.**
      `rgb(245, 244, 240)` is `#F5F4F0` -- **scheme-6**, taken off their own band when the
      atelier teasers were built on 2026-09-14. So matching them cost one setting,
      `color_scheme` scheme-1 to scheme-6 in `templates/index.json`, and no new colour.
    - **The pictures were rendering 200 x 600, and that single bug caused two of the four
      complaints.** `image_tag` writes `width="600" height="600"` on the img; that height
      attribute is a presentational hint, and `.stones__image` set `width: 100%` but never
      `height`, so **both dimensions were definite and `aspect-ratio` was ignored
      outright**. The stone was drawn `object-fit: contain` inside a 200 x 600 box, so it
      floated small in the middle with the words at the bottom -- "smaller pictures" and
      "the text should not be that down" were one fault, not two. `height: auto` is the
      whole fix. **An `aspect-ratio` on an `<img>` does nothing unless one dimension is
      `auto`**, and Shopify always writes both attributes.
    - **Picture size is theirs in absolute terms, not in proportion.** Theirs renders
      120 x 120 inside a 240px item -- half its width. Ours is a fixed `12rem`, so a wider
      screen gives more air round the stone rather than a bigger stone; `10rem` on a phone.
    - **The gap is bigger than theirs on purpose.** moonmagic leaves only 20px between
      items, but their picture is half an item wide, so about 140px of air actually shows
      between one stone and the next -- the gap value alone was never what reads. Column
      gap `2rem` to `4rem` (phone `1.6rem` to `2.4rem`), which puts 103px between pictures
      at 1440 where they had nearly touched.
    - **All six tiles link now.** Every stone collection exists -- checked live rather than
      assumed, since this file still said Циркони 404s: циркони, диаманти, перли, сапфири,
      рубини, изумруди all answer 200. **Циркони and Диаманти have products; the other four
      are empty** until the stone tags are set in the Admin. That stretches "never link to
      an empty collection", deliberately and at the owner's direct request -- nothing
      404s, and the store is still a private draft, so no customer can meet a dead end
      before the tags land.
    - **Checked live at 1440 and 375**: band `rgb(245,244,240)`, picture 120 x 120 (100 on
      a phone), 20px from picture to text, 103px between pictures, no overflow at either
      width, and a real click on Циркон lands on `/collections/циркони` with its products.
  - **Four more changes the same day, at the owner’s request** ("i want the text under
    the picture to be black and also when i put my mouse cursor on some of the stones no
    matter who i want the picture and the text to become a little bit bigger, also for a
    phone wets make it like moonmagic and i want the button that we missed to put").
    - **Both lines are pure black**, the fourth named exception to "no pure white or pure
      black" after the newsletter band, the dark buttons and the Social follow heading. The
      meaning had been sitting at 70% of the theme’s own near-black `#221F1C` on top of
      that, so it was the furthest thing from black on the page.
    - **Hover grows the stone and its words together, `scale(1.15)`.** moonmagic has **no
      hover rule on these tiles at all** -- theirs grow because the carousel scales
      whichever slide is centred (`.swiper-slide-active > a { transform: scale(1.25) }`,
      `1.15` on a phone, `transition: all .1s`). So the outcome is copied and the trigger
      is ours; 1.15 is the gentler of their own two numbers, which is what "a little bit
      bigger" asked for. A transform does not move its neighbours, so no stone shifts when
      another one grows. Off entirely under `prefers-reduced-motion`.
    - **The phone is their scroller now, not our two-column grid.** Below their tablet
      breakpoint theirs is a swiped row: items 110px, picture 80px, both lines 16px,
      section padding 35/30, about three visible. Ours matches all of that but the item
      width, with the browser scrolling rather than Swiper -- the same "copy the outcome,
      not the library" call the marquee already makes. Six stones no longer fit one screen;
      the stone sitting half off the right edge is what says the row moves.
      - **Their 110px item cannot hold a Bulgarian word.** ДЪЛБОЧИНА measures 119px at
        their own 16px, and it is one word, so `width: 100%` cannot wrap it and
        `overflow-wrap` would only break it mid-word. Their own meanings are two words that
        do wrap ("Rainbow Moonstone"), which is why 110px works there. So the choice was
        their type size or their item width: **12.5rem**, keeping the type size, which is
        the part that shows. Three of theirs fit 375px against two and most of a third here.
      - The two lines also take `width: 100%` now. The tile is a centred flex column, so
        each line had been sizing to its own content and hanging outside the item instead
        of filling it -- invisible at 11px, obvious at 16.
    - **The button we had missed.** moonmagic closes this row with **FIND YOUR STONE**,
      380 x 72 at 22px/500 with 2.2px of tracking, square, black, centred, 20px under the
      stones, pointing at their whole catalogue. Ours is sized to **Вижте всички under
      Най-продавани** instead -- same page, same job of closing a row, and the owner has
      already tuned that one, so the homepage’s two row-closing buttons match each other
      rather than one following moonmagic and one not. Confirmed live: both 360 x 68 at
      15px/500, both square.
      - It is **taupe `#5B5548`, not black**, and that is this project’s own rule rather
        than a decision taken here: the section sits on scheme-6 and the button reads
        `var(--color-button)`, which scheme-6 sets to the dark shade of its own band colour
        (see the coloured bands under Atelier section). Нашето вдъхновение’s button is the
        same taupe for the same reason.
      - Label „Открийте своя камък", their rhythm in our own words; link
        `/collections/камъни`, every piece with a stone -- the nearest thing this store has
        to the whole-catalogue link theirs points at, and one of the only three stone
        collections that actually holds products.
      - **Two pushes, and the second was dropped** -- the sixth time. The section carrying
        the new settings went first, with a label default and no link, so the button stayed
        hidden; the template setting the link followed several minutes later, was still
        missing after 48 seconds, and landed in under four once re-sent with the settings
        keys reordered.
    - **Checked live at 1440 and 375**: both lines `rgb(0,0,0)`; a real hover on Сапфир
      gives `matrix(1.15, ...)` on that tile alone, with every neighbour’s left edge
      unmoved; the phone row scrolls 880 of 375 with no word spilling its item and no page
      overflow; the button 360 x 68 on a computer and full-width 345 x 54 on a phone, both
      pointing at Камъни.
  - **Space around the band, and arrows on the phone row, 2026-09-30** ("add more space
    betwen the section that is above the one we edit and the one that is down on this
    section we edit they are to close to each other"; "on a phone for this section the
    stones are either with a finger or with arrows they have one in the left and one in
    right"). The same message confirmed the button stays a rectangle -- it already was,
    `border-radius: 0`, measured live; nothing changed for that.
    - **The sections were touching at exactly 0px, and this section's own 72px padding
      could never have fixed it.** Padding here sits *inside* the greige, so it only makes
      the band taller -- the same trap the Social follow gap fell into against the black
      newsletter band. What reads as space between sections is the page's own ground, and
      only a margin shows that. So the margin goes on the outer div that paints the band
      and the padding stays on the inner one, which is exactly the split the atelier bands
      already use (`.section-{id}-margin` beside `.section-{id}-padding`).
      **40px, 30px on phones** -- the atelier's own proven pair for this same problem, not
      a new number. Both are range settings with `default: 40`, so the template needed no
      second push. Confirmed live: 40px of page ground above and below at 1440.
    - **The arrows are moonmagic's own structure**: a prev and a next flanking the track,
      phone only, hidden above 750px. The track is still a plain CSS scroll container, so a
      finger already worked with no script at all -- the script only adds the tapping, steps
      by one item plus its gap measured off the live elements rather than a hardcoded
      number, disables an arrow at each end, and honours `prefers-reduced-motion`.
      - **They stay `hidden` until the script finds a track that really overflows**, so a
        keyboard never reaches a control that does nothing and a computer never shows them.
      - **The `hidden` attribute did not actually hide them at first, and the reason is
        worth keeping.** The phone rule sets `display: flex` on `.stones__arrow`, and an
        author rule beats the UA stylesheet's own `[hidden] { display: none }` -- so the
        attribute silently stopped hiding anything, and without JavaScript the arrows would
        have shown on a phone and done nothing when tapped. Fixed with an explicit
        `.stones__arrow[hidden] { display: none }` inside the same query. **An author
        `display` anywhere on an element cancels `hidden`.**
      - **The track no longer bleeds to the page edges on a phone**, since the arrows take
        that room: the track is 277px of 345 and shows **two whole stones**, where the
        bleeding version showed two and most of a third. A direct, accepted cost of the
        arrows rather than something to work around.
      - The arrow sits **exactly on the picture's centre line**, not the card's: the
        picture is 8rem at the top of each stone, so a 4.4rem button needs `margin-top:
        1.8rem` to line up. Measured live, 1661.3 against 1661.3. moonmagic puts its own at
        the item's middle, which on theirs lands beside the words -- a deliberate
        departure, since ours reads as aimed at the stones.
    - **Checked live at 1440 and 375.** Desktop: 40px of light ground both sides, arrows
      `display: none`, the grid still six across with nothing scrolling. Phone: arrows
      32 x 44, prev correctly disabled at the start, two whole stones, no page overflow,
      and a real click on next asked for **exactly 145px** -- the 125px item plus its 20px
      gap.
    - **The arrows could not be seen working in the preview pane, and that is the pane, not
      the code.** It produced **zero animation frames** over 500ms (the artifact already
      recorded under Buttons lift up on hover). Smooth scrolling is frame-driven, so
      `scrollBy({behavior: "smooth"})` never advanced, while an instant scroll moved the
      track 145px at once. **Scroll events are frame-driven too**, so the `scroll` listener
      that re-enables the opposite arrow never fired either, which is why prev stayed
      disabled after a step. Proven by wrapping `scrollBy` to record its argument and run
      it instantly: the handler fires and asks for the right number. On a real phone, where
      frames run, both work. **When a check depends on scrolling or a transition, confirm
      frames are running first -- otherwise a working feature reads as broken.**
  - **Rebuilt as a centred carousel, 2026-09-30, from the owner's own report of using it on
    a real phone** ("when i scroll with my finger i am catching all of them and they are
    moving up and donw ... i want them to not move like that just to the left and the right";
    "the one int the middle that apear to get big like we said with the text down on the
    picture"; "i don't want the arrows to stop ... when i go to the last of the stones i cant
    go to the like in moonmagic"). moonmagic's own carousel was read from its live Swiper
    instance this time rather than from its CSS alone: **`loop: true`, `centeredSlides: true`,
    `slidesPerView: "auto"`, `spaceBetween: 20`** -- which is all three complaints at once,
    and confirms the owner was comparing against the real thing.
    - **The finger dragged the row diagonally**, because a scroll container leaves the
      browser free to read a swipe as a page scroll. `touch-action: pan-x` on the track pins
      it to one axis. One line, and the whole of that complaint.
    - **The middle stone grows now, words and all.** Their CSS scales whichever slide carries
      `swiper-slide-active` -- `scale(1.15)` on a phone, `1.25` on a computer. Ours toggles
      `.stones__item--centred` from one measurement, *which stone's centre is nearest the
      track's centre*, so a finger and the arrows can never disagree about which one is the
      middle. The row snaps to centre rather than to the left edge to match.
      - The first and last stone need a lead-in to be able to reach the middle at all:
        `margin-inline: calc((100% - 12.5rem) / 2)` on each. The percentage resolves against
        the **track's own content width**, so it stays right whatever room the arrows leave
        -- 76px at 375px, measured live.
      - **The scaled stone would have been clipped, and the reason is a spec rule worth
        keeping.** `overflow-x: auto` forces the *used* value of `overflow-y` to `auto` too
        (the same rule that broke the sticky header on Контакти), so the track is a scrollport
        that clips top and bottom as well as the sides -- and a `transform: scale` grows past
        its own box without making the box any bigger. `padding-block: 1.8rem` inside the
        track is the room it grows into. Checked: the grown stone sits **7.8px inside** the
        track on both sides, with no vertical overflow at all.
    - **The arrows never stop.** Theirs loop, so ours wraps: `(index + direction + n) % n`,
      and the whole `disabled` treatment is gone, style and all. Walked live through all six
      and past the end -- Циркон, Диамант, Перла, Сапфир, Рубин, Изумруд, **Циркон** -- and
      backwards off the first lands on Изумруд.
    - **More room, which the growing stone needs**: the band's own padding 72 to 88 (53px on
      a phone), on top of the track's own 1.8rem. This is the "make the background colour
      bigger" half of the request; the track padding is the "more space for the picture" half.
    - **Checked live at 375**: `touch-action: pan-x`, `scroll-snap-type: x mandatory`,
      `scroll-snap-align: center`, the centred tile at `matrix(1.15, ...)` with every other
      one at `none`, the centred stone **exactly** centred (0px off), neither arrow disabled,
      and no page overflow. The arrow steps had to be run instantly to be seen at all --
      the pane still produces no animation frames, per the lesson above.
  - **The neighbours were being cut in half, and the cause was a ratio, not a size**
    (2026-09-30, the owner: "the pictures that are next to the middle stones are getting cut
    i don't like it that way make it like moonmagic and and make the arrows a little bit
    bigger and black"). Measured theirs at 375px rather than guessing: container **335 of
    375**, item **110**, so **3.05 stones across**, and the neighbours either side show about
    84%. Ours was a 277px track against a 125px stone -- **2.22** -- and at that ratio a
    neighbour has nowhere to be except half off the edge. It showed **45%**.
    - **Two things had taken the width, and both were ours.** The arrows were sized out of
      the track, where **moonmagic's sit outside it, in a gutter of their own**; and the
      stone was 12.5rem, held there only so ДЪЛБОЧИНА could stay at their 16px.
    - **The fix is their structure.** `.stones__viewport` leaves `page-width`
      (`margin-inline: -1.5rem`) and comes back in by the arrow's own width
      (`padding-inline: 2.6rem`), so the row runs the full screen, the arrows have a gutter
      and the track is what is inset -- 323px. The stone is **10.6rem**, which puts the ratio
      at **3.05, exactly theirs**. Checked live: neighbours **83%** against their 84%, and
      neither arrow overlaps the track by a single pixel.
    - **A wrong first attempt, caught from a screenshot rather than from the numbers.**
      Making the arrows `position: absolute` over a full-width track fixed the ratio (3.14,
      neighbours 89%) and every measurement passed -- but it put a black chevron **on top of
      a stone**, which is not what moonmagic does and looked it. The geometry was right and
      the picture was wrong. **Take the screenshot even when the measurements agree.**
    - **Their type gave way, not their geometry.** The phone meaning and name go 16px to
      **14px**, with the meaning's tracking halved to `0.04em`. ДЪЛБОЧИНА is one unbreakable
      word -- 119px at their 16px -- so it cannot live in a 110px stone, and their own
      meanings are two words that wrap, so they never had to choose. Two points of type
      against a ratio that was visibly wrong is the right way round. Confirmed live: no
      meaning spills its stone.
    - **The arrows are bigger and pure black**: a 26px chevron against their own 30px mark,
      up from 20px, in `#000000` measured as `rgb(0, 0, 0)` off theirs -- the same black the
      two lines under each stone already use. The button is 26 x 48, narrow because that is
      the gutter's width and tall because that is where the tap area comes from; moonmagic's
      own is 20 x 30.
    - **Checked live at 375**: ratio 3.05, track 323 against a 106px stone, Диамант 83% /
      Перла 100% / Сапфир 83%, arrow overlap 0 on both sides, arrows `rgb(0, 0, 0)` and still
      exactly on the picture's centre line, nothing spilling, no page overflow. Confirmed by
      eye as well as by measurement.
  - **A real circle, not a jump back to the start** (2026-09-30, the owner: "if you look at
    their section and go to their last stone they don't hava an end it just apears the first
    one it is like a circle that isn't ending"). The arrows already wrapped, but **wrapping
    is a jump**: the row scrolled the whole way back to the beginning and you watched it go.
    moonmagic has no last stone at all -- their Swiper runs `loop: true`, which duplicates
    slides, so the first simply follows the last, for a finger as much as for the arrows.
    - **So this duplicates them too**: one whole set of six before the real stones and one
      after, cloned in JavaScript rather than in Liquid so the six-column grid on a computer
      never sees them. Built only when the row is actually a scroller, and torn down again if
      it stops being one.
      - **The copies are scenery**: `aria-hidden`, and their links given `tabindex="-1"`, so
        every stone is still announced and reachable exactly once. The real ones keep no
        tabindex at all.
    - **The position is folded back to within half a set of home whenever it drifts**, which
      is invisible because what sits either side is the same six stones. Done in one
      assignment (`((d % setW) + setW) % setW`, then take the shorter way round) rather than
      by stepping in a loop, so even a long fling needs a single correction.
    - **Two things keep it from juddering.** The fold waits until the row is at rest --
      debounced 140ms after the last scroll event, never mid-gesture or mid-animation. And
      `scroll-snap-type` is switched off for the one frame the position moves, so the snap
      engine cannot fight the step; confirmed live that it is put back to `x mandatory`
      afterwards rather than left off.
    - **A bug found by walking it fourteen times, not by reading it.** A tap is discrete and
      at rest, so leaving it to that debounce was wrong: tapping faster than 140ms outran the
      fold and walked straight off the end of the clones, where the row **stopped dead on the
      last stone** -- exactly the fault being fixed. `go()` now folds first, then steps.
      **Walk a looped carousel further than one lap before believing it.**
    - **Checked live at 375**: 6 real stones and 12 clones; twenty fast taps forward run
      Циркон · Диамант · Перла · Сапфир · Рубин · Изумруд · Циркон … three times round with
      **zero stalls**, and twenty back the same. Parked hard against the very end of the
      clones, one tap folds to home **still showing the same stone**, so the fold cannot be
      seen, and it keeps going from there.
    - **Checked live at 1440**: a fresh desktop load builds no clones at all -- six stones,
      six columns, arrows `display: none` -- and resizing a real window from narrow to wide
      tears them down, 18 items back to 6 with the centred class cleared.
      - The preview pane showed clones left over on a computer, which is **the pane, not the
        code**: `ResizeObserver` callbacks and `resize` events are frame-driven like
        everything else, and it produces no frames. Dispatching one `resize` by hand tore
        them down immediately. Worth knowing before reading that as a bug again.
  - **A tap grew a stone on a phone, and that was a bug rather than the thing that was
    asked for** (2026-09-30, the owner: "i don't like it when when i catch for example one of
    the stones(this is just for a phone) to get bigger"). The hover rule had been written
    **unscoped**, so it applied at every width -- and a touch screen fires `:hover` on a tap,
    which on iOS then stays fired until something else is tapped. So catching any stone made
    it grow and stay grown, which is a different thing entirely from the middle one growing.
    - **Gated behind `@media (hover: hover)`**, the capability rather than a width, so a
      touch laptop behaves correctly too and a narrow desktop window keeps its hover.
      `:focus-visible` stays at every width -- it never matches a tap, only keyboard focus.
    - **The centred growth is untouched**, since that is what the owner asked for a round
      earlier: it lives in the phone block and is driven by which stone is nearest the centre
      of the track, never by touching one.
    - **Checked on a real touch profile**, not just a narrow window: the preview pane's mobile
      preset reports `maxTouchPoints: 5` with `(hover: hover)` and `(pointer: fine)` both
      false, and on it the `:hover` scale rule is **not in the active stylesheet at all** --
      nothing can grow a stone on tap -- while Циркон, the centred one, still reads
      `matrix(1.15, ...)` and every other stone `none`. At 1440 with `maxTouchPoints: 0` a
      real hover on Рубин gives `matrix(1.15, ...)` and every other stone `none`, so the
      pointer behaviour is unchanged.
    - **`a.stones__tile:hover .stones__name` still underlines on tap**, since it has the same
      defect and was deliberately left alone -- the owner named the growing, not the
      underline. One line to gate it the same way if it ever bothers them.
  - **The size change on an arrow tap was not smooth, and there were two causes**
    (2026-09-30, the owner: "i can double click for some reason on the arrows and there is a
    big with them i click on them the pictures size doesn't change smoothly").
    - **The tap and the scroll handler were fighting over the same class.** `go()` marked the
      new centre up front, and the scroll handler marks it too as the row moves. For the
      first half of the animation the **old** stone is still the one nearest the centre, so
      the handler flipped the class straight back -- the stone scaled up, down, and up again.
      The tap marks nothing now; the scroll handler alone drives it, so a stone grows on its
      way into the middle, which is what a finger already did. **The two paths feel the same
      because they are now literally the same path.**
      - The pre-marking had been added so the arrows could be *tested* in a preview pane that
        produces no frames. **A workaround for the test environment had become a defect in
        the real one** -- worth remembering before doing that again.
    - **A fold swapped the centred stone for an identical copy with transitions live**, so
      both ends animated -- the old shrinking out of 1.15 while the new grew into it -- and
      the stone dipped out of size and back for a fifth of a second. `shift()` now holds a
      `stones__grid--stepping` class across the swap, which sets `transition: none` on the
      tiles for that one frame.
    - **The double-tap is the browser's own zoom gesture**, with a selection and a grey
      highlight box on top. `touch-action: manipulation` on the arrows keeps the tap and
      drops the gesture -- and removes the old 300ms wait before a click lands -- with
      `-webkit-tap-highlight-color: transparent` and `user-select: none` for the rest.
    - **Checked live at 375, using the frameless pane as the instrument rather than fighting
      it.** A transition that never advances keeps reporting its *start* value, so a dip
      shows up as `scale(1)` that never recovers. Parked hard at the end of the clones, one
      tap folds 2142 to 756 and the newly centred stone reads **`matrix(1.15, ...)`
      immediately** -- which is only possible with the transition suppressed. The stepping
      class is cleaned up afterwards, snap is back to `x mandatory`, exactly one stone
      carries the centred class, and the arrows report `touch-action: manipulation` with
      `user-select: none`.
    - **What the pane still cannot show**: the actual smoothness of the crossfade during an
      arrow's own scroll, since nothing animates there. The cause was read off the code and
      the fix reasoned from it -- worth a look on a real phone.

  - **A pill inside the rectangle on hover and tap, 2026-10-01** (the owner's screenshot:
    "when i put my finger on it is getting white but it stays a rectangle button and one with
    corners that are curve ... the same for a phone and computer"). The button is square
    (`border-radius: 0`, since 2026-09-30) but Dawn draws a button's border with `::before`
    and `::after`, and the site-wide pill setting rounds both (41px and 40px). The fill hides
    them at rest; once it drops away on hover or under a finger, the curved ring shows inside
    the square outline. Вижте всички and Add to cart switch both pseudo-elements off for
    exactly this reason (`content: none`), and the stones button was copied from the first
    without that rule. Added to `section-stone-meanings.css`.
    - **The other square buttons were read first and are fine**: the hero, silver banner and
      new arrivals buttons are all `.banner__buttons .button--primary`, which already drops
      both pseudo-elements, so this was the only one.
    - **Live, with a real hover**: a transparent square with a 1px taupe outline, lifted
      `-2.5px`, and both pseudo-elements compute `content: none`.
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
    between boxes reads clearly rather than as a thin seam. At this point the band's own
    pink/gradient background (above) still did real work: it showed through in the gaps
    between the now-separate white boxes.
    - **The pink swapped from the band onto the boxes themselves, minutes later** ("remove
      the pink box behind them and put the same on the background boxes for the
      pictures"). `.marquee` itself lost its own background rules entirely (both the phone
      flat colour and the desktop gradient, added 2026-09-18/19); `.marquee__item` picked
      up the exact same two values instead of its own off-white -- `#F3E1DB` flat below
      750px, `linear-gradient(180deg, #FFE8E0 0%, #F3E1DB 100%)` above it. The band is
      plain now, so scheme-1's own off-white ground shows in the gaps between boxes
      instead of the pink; the pink itself moved with the boxes rather than being removed
      from the page.
    - **Six per row, bigger boxes, minutes later, at the owner's own count.** "when they
      move one by one they are 6, and they are touching the corners... make 6 pictures
      with backgrounds to fit there... fix the size of the pictures and make the
      background boxes bigger, look how moonmagic did it." Checked moonmagic's own
      carousel again, precisely this time: at 1440px it shows exactly 6 slides, the first
      starting flush at the viewport's left edge and the last ending flush at the right --
      edge to edge to both corners, the same full-bleed the marquee already has, just at a
      different count than the `images_visible: 8` this section had just been turned up
      to. Moved back to `6` (`templates/index.json`) -- since each item's own width
      formula (`100vw / images_visible - gap`) already cancels the gap out of the row's
      total footprint, this alone both makes each box bigger (a bigger slice of the same
      100vw, split six ways instead of eight) and lands exactly six of them corner to
      corner, without needing to touch the gap value itself. `gap` stays `24`, untouched
      by this round.
    - **The picture itself shrunk again and centred in its box, minutes later, at the
      owner's request** ("make the pictures smaller and center them by the background
      boxes they are in"). First tried as `.marquee__image` alone, `width: 100%` to
      `width: 84%; margin: 0 auto` -- the same 84% this project tried once before and
      reverted, but this time the reason for that revert no longer applied: back then the
      pink lived on the shared band, so shrinking the picture revealed the band's own
      colour as an unwanted margin around a plain photograph, where now the pink lives on
      each item's own box (the round just above this one), so the same shrink instead
      reveals that box's own background as a deliberate frame.
      - **Corrected minutes later, on two counts at once** ("why did you change the
        background boxes i said just the picture ones... i want it to be in the middle").
        The first attempt shrank `.marquee__image` directly, and since nothing else in the
        item was holding the old size, the item's own rendered height shrank right along
        with the picture -- the boxes visibly changed even though `.marquee__item`'s own
        CSS never did, because it has no fixed height of its own; it simply hugs whatever
        its content measures. `margin: 0 auto` also only ever centred the picture side to
        side, leaving it flush near the top with all the freed space pooling underneath,
        next to the caption, rather than centred on both axes. Fixed both at once with a
        new wrapper, `.marquee__frame` (`sections/image-marquee.liquid`,
        `assets/section-image-marquee.css`): a fixed square at the item's own full width,
        `display: flex; align-items: center; justify-content: center`, holding the exact
        footprint the picture used to hold alone. `.marquee__image` (or the empty
        placeholder, which shares its class) sits inside at `width: 84%`, centred on both
        axes by the frame's own flex rules -- so the box's height never moves regardless of
        how small the picture gets, and the pink shows as an even margin on all four sides
        instead of pooling at the bottom.
      - **Sized up from 84% to 90%, minutes later, at the owner's request** ("stretch up
        the size of the pictures a little bit"). The frame is what holds the box's
        footprint (the fix just above), so this only narrows the pink margin evenly on all
        four sides -- the boxes themselves stay exactly the size they already were.
      - **Widened left and right only, minutes later, at the owner's own follow-up**
        ("lets strech in the left and the right side a little bit"). Width and height
        split apart for the first time here -- width to 96%, height staying at the 90%
        the square version already had -- so the picture reads as a little wider than
        tall inside its still-square frame, with the side margins narrowing to 2% each
        while top and bottom stay at 5%. `aspect-ratio: 1 / 1` came back out of
        `.marquee__image`, since fixing both width and height already determines the box
        completely and a square ratio no longer describes it.
      - **Corrected minutes later -- the opposite of what had just shipped** ("i wanted a
        smaller left and right sorry for what i write"). Width comes down past the 90%
        square baseline to 84%, height stays at 90%, so the picture now reads a little
        taller than it is wide -- the side margins widen to 8% each instead of narrowing,
        top and bottom still 5%.
      - **Pushed down to balance the top and bottom gap against the box's own edges,
        minutes later, at the owner's request** ("the pictures... are too close to the
        line of the background box... I want pictures to have the same space up and down
        from the background lines"). The frame centres the picture within its own square,
        top-to-bottom insets equal to each other -- but the caption sitting below the
        frame (0.8rem margin-top plus a 1.7rem reserved line, fixed at every breakpoint)
        meant the box's true bottom edge sat further from the picture than its top edge
        did. `margin-top: 2.5rem` on `.marquee__frame` closes that gap exactly: 2.5rem is
        the caption's own footprint (0.8 + 1.7), so it cancels out regardless of viewport
        width or how many images share a row, since the frame's own equal top/bottom
        insets never needed touching -- only the fixed part outside the frame was
        unbalanced. The item's own box grows taller by the same 2.5rem as a result, which
        is the direct, necessary effect of moving the picture down rather than a side
        effect to work around.
      - **The box shortened again minutes later, at the owner's request** ("the box is
        long... cut a little bit of the box down and up so it can look... not too long
        and not too short"). `.marquee__item`'s own padding comes down from 1.4rem to
        1rem (0.75rem on phones, was 1rem) -- padding is one shared value for every side,
        so trimming it shortens the box's top and bottom by the same amount rather than
        just one side, keeping the picture's equal top/bottom spacing from the round above
        intact while genuinely reducing how tall the box reads. `.marquee__frame`'s own
        margin-top (2.5rem, the fix that balanced the picture against the caption) was
        deliberately left alone -- touching it instead would have reopened the very
        top/bottom imbalance just closed.
      - **Cut further still, minutes later** ("cut more"). Padding down again, 1rem to
        0.6rem (0.75rem to 0.4rem on phones) -- the same lever as the round above, for the
        same reason: it is the one value that shortens the box's top and bottom equally
        without disturbing the picture's own balanced spacing.
      - **Cut again, and the picture sized down too, in the same request** ("cut more and
        make the picture smaller"). Padding: 0.6rem to 0.3rem (0.4rem to 0.2rem on
        phones), same lever, same reasoning. The picture itself: width and height both
        down the same 6 points that already separated them (84% to 78%, 90% to 84%), so
        the shape settled on two rounds ago -- a little taller than wide -- stays exactly
        the same, just smaller. `.marquee__frame`'s own margin-top (2.5rem) needed no
        recalculating: it only depends on the frame being a flex-centred square and the
        caption's own fixed footprint, neither of which this change touches, so the
        picture's equal top/bottom spacing is untouched by resizing it.
      - **Cut once more, after the gap-setting detour above got sorted out.** Vertical
        padding 0.3rem to 0.15rem (0.2rem to 0.1rem on phones); left and right (1.2rem,
        0.8rem) untouched, since this "cut more" was always about the box's own height,
        never its width.
      - **Cut again, minutes later** ("cut more now"). Vertical padding 0.15rem to 0.08rem
        (0.1rem to 0.05rem on phones); left and right still untouched.
      - **Cut all the way to zero, minutes later** ("cut more more"). Vertical padding
        0.08rem to 0 (0.05rem to 0 on phones) -- left and right (1.2rem, 0.8rem) still
        untouched. Zero here is safe rather than cramped: `.marquee__frame`'s own
        margin-top (2.5rem) is a separate rule and still holds real pink space above the
        picture regardless of this padding, so the frame doesn't actually sit flush
        against the box's top edge even at 0.
      - **Both the picture and the box squared off, minutes later, at the owner's
        request** ("make the picture and the background color more like a square").
        Measured live first (1440px, 6 per row): the box read 230×256px (ratio 1.11,
        taller than wide), the picture 161×173px (ratio 1.08) -- both a little
        elongated, not dramatically so, since the earlier padding cuts had already done
        most of that work.
        - **The picture**: `width: 78%; height: 84%` averages to `81%` each, with
          `aspect-ratio: 1 / 1` back in place of the separate height now that the two
          match -- a true square again, at roughly the same overall size as before
          (the midpoint of the two, not a new arbitrary number).
        - **The box**: its remaining height above the square frame is exactly two fixed
          quantities that are kept equal to each other on purpose (`.marquee__frame`'s
          own margin-top, sized to match `.marquee__caption`'s margin-top + min-height,
          so the picture's top/bottom balance never breaks -- see both notes). Shrinking
          the box without breaking that balance meant shrinking both sides of that
          equality together: caption `margin-top` 0.8rem to 0.2rem (its `min-height`
          stays at 1.7rem, since that is the room the caption's own future text needs to
          stay legible, not spacing to cut), and frame `margin-top` 2.5rem to 1.9rem to
          match the caption's new, smaller total footprint (0.2 + 1.7). This is the same
          padding-not-margin-top principle the earlier "cut more" rounds already
          established, applied to the one place margin-top *could* move without
          reopening the imbalance it was built to close.
      - **Left and right split apart from top and bottom for the first time, minutes
        later, at the owner's own follow-up** ("make the left and right sides of the
        background boxes bigger"). `padding: 0.3rem` (0.2rem on phones) becomes
        `padding: 0.3rem 1.2rem` (`0.2rem 0.8rem` on phones) -- the CSS two-value
        shorthand, top/bottom then left/right -- so the vertical trimming from the last
        few rounds stays exactly as tuned while the sides alone grow. `.marquee__frame`
        is 100% of whatever width the padding leaves it, so widening the sides narrows
        the frame (and the picture inside it) a little in exchange for more visible pink
        -- the item's own outer width, set separately by the images-per-row formula, does
        not move.
      - **The gap between boxes cut, minutes later, at the owner's own follow-up** ("go in
        the preview and see how it is also make it more bigger so the gap between the
        background color gets closer"). Checked the live preview first, at 1440px, per
        the owner's own instruction -- confirmed the padding change above had landed
        (0.3rem 1.2rem, a 33px pink side margin around a 192px frame) before touching
        anything else. `gap`, the setting that becomes `--marquee-gap` (both the item's
        own trailing margin and the subtracted term in its width formula), came down from
        24 to 10 in `templates/index.json` -- one change that does both things the owner
        asked for at once, since the item's own width formula (`100vw / images_visible -
        gap`) means a smaller gap directly shrinks the visible space between boxes *and*
        grows each box, without needing a separate change to either. Widening the item's
        own internal padding instead, the other reading of "make it bigger," would have
        left the boxes' own outer edges -- and the gap between them -- exactly where they
        already were, so it would not have produced the effect the owner described.
      - **A "cut more" misread minutes later, corrected the same round.** Read at first as
        the same gap setting, taking it from 10 to 4 -- then corrected ("what i meant is
        not to cut more of the space between the background color boxes... I was talking
        about the background up and down line like we did before"): the owner meant the
        vertical padding thread from a few rounds up (Trimmed from 1.4rem... down to
        0.3rem), not this gap setting at all. `gap` went back to `10`, its last
        explicitly-requested value, and the actual cut landed on `.marquee__item`'s own
        vertical padding instead -- see the note there.
      - **The phone-only width divisor matched to moonmagic directly, at the owner's
        request, tried two ways the same round.** ("match the size of the moving
        pictures section on a phone with moonmagic"). Measured moonmagic's own phone
        carousel at 375px rather than assuming it scales down from the desktop version
        already measured for the six-per-row fix above: a bare, full-bleed
        `swiper-slide`, `width: 144px; margin-right: 10px` inline, holding nothing but a
        plain `<img>` -- no box, no caption, the picture IS the slide. This item's own
        10px gap already matched theirs exactly, by coincidence of an earlier, unrelated
        round.
        - **First tried by matching the photograph's own size** (117px against
          moonmagic's 144px): worked backward through this item's own math (image = 81%
          of the frame; frame = item width minus 2 x 0.8rem padding) to the item width
          that puts the picture itself at 144px, then to the divisor that produces it at
          375px with the existing 10px gap -- 2.2 to 1.84. This shipped, but was wrong:
          checked live with a screenshot at the owner's report that it still didn't
          match, and the picture, boxed and captioned, cost this design more width per
          card than moonmagic's bare slide -- the resulting item measured 194px, so
          barely 1.8 cards fit on screen against moonmagic's own ~2.4. Matching the inner
          photograph pixel-for-pixel was the wrong target: it isn't the number a viewer
          actually compares between the two rows.
        - **Corrected to match the card itself, the whole visual unit, to moonmagic's
          144px slide.** Divisor 2.2 to 2.435, which puts the item at 144px directly
          (`375 / 2.435 - 10 = 144`) -- the same width moonmagic's own slide measures,
          rather than a width derived from what the photograph inside it should be. The
          picture inside stays at its own established 81%, unrelated to this fix; it
          just comes out smaller than moonmagic's bare photograph as a direct, accepted
          consequence of this project's own box-and-caption design.
      - The tablet divisor (`100vw / 3`) and every desktop measurement (6 per row,
        already matched to moonmagic's own desktop carousel) were untouched throughout --
        this was a phone-only request both times.
      - **The box squared off properly, computer and phone both, at the owner's
        request** ("maybe for a phone and for a computer we need to make the background
        boxes square"). With vertical padding at 0 (the "cut more more" round), the
        box's own height above the frame is fixed chrome only -- `.marquee__frame`'s
        margin-top plus `.marquee__caption`'s margin-top and min-height, 38px total,
        unchanged at any breakpoint. Squaring the box means solving `item width - 2 x
        padding + 38 = item width`, which cancels the item's own width out of the
        equation entirely: `padding: 19px` (1.9rem) makes the box a perfect square
        whatever its own width happens to be, so the same one value fixes desktop
        (1.2rem to 1.9rem) and phone (0.8rem to 1.9rem) both -- checked live at each,
        230x230px and 144x144px. Tablet, sharing the base rule with no override of its
        own, becomes square too as a direct consequence, not a separate fix. On phone
        this also happens to match the item's own width (144px) already tuned to
        moonmagic's card size in the round just above, so the two requests landed on
        the same number without needing to be reconciled by hand. The picture inside
        (81% of a now-smaller frame) shrinks a little as a result, the same trade the
        left/right widening made on desktop earlier in this section.
      - **The picture sized up again, minutes later, refined twice in the same round**
        ("we need to make the pictures bigger for a phone if that is possible", then "a
        little bit bigger" and "and maybe for a computer too"). 81% to 87%, one
        universal value again rather than a phone-specific one, since the follow-up
        asked for computer too. With the box now square (fixed to the item's own width
        regardless of padding, see the note just above), the picture's own percentage of
        the frame is the only remaining lever for a bigger picture at any breakpoint --
        the box itself does not move either way.
      - **Stretched taller, minutes later** ("make now the pictures a little bit
        longer" -- "longer" read the same way as earlier in this session, meaning taller
        rather than wider), confirmed the same round ("don't change the background boxes
        they stay the same"). Width stays 87%; height alone rises to 93%, the same kind
        of split the picture's very first width/height divergence used. The frame is
        untouched -- its own size is tied to the item's width and padding, neither of
        which this edit touches -- so the box stays exactly the square it already was;
        only the margin inside the frame gets uneven again, tighter top-to-bottom than
        side-to-side.
      - **Sized up once more, minutes later** ("now we can maybe make the pictures a
        little bit bigger"). Both dimensions up 4 points, 87 to 91 and 93 to 97,
        keeping roughly the same gap between them as the previous round. Checked live
        rather than assumed, since 97% height leaves only a couple of pixels of margin
        on a phone specifically -- confirmed still a visible pink line all round, not
        touching the frame's own edge.
      - **Corrected the same round -- phone only, not computer too** ("i wanted just the
        pictures to get bigger and just on phone bring it back for computer"). The base
        rule (computer and tablet) goes back to 87%/93%; the 91%/97% size moves into its
        own override inside the phone's own `max-width: 749px` query, alongside that
        query's item-width and padding rules. The live check done for 91%/97% a moment
        earlier still holds -- it was measured on a phone in the first place.
  `snippets/header-mega-menu.liquid` and `snippets/header-drawer.liquid`. Shopify menu items
  cannot carry images, so the items are `visual_menu_item` blocks on the header section. Each
  block names the top-level menu item it belongs to (matched on the title, case-insensitively,
  because `handleize` is unreliable for Cyrillic). A menu item with matching blocks opens the
  visual grid; one without keeps the text-column mega menu. Needs the header's desktop menu
  type set to **Mega menu**.
- **Weight.** `assets/crown.css` sets bold only where the eye needs an anchor: product card
  titles, sale prices, benefit headings, the atelier fact values, and the three claims under
  the hero. Headings were bold (700), as on the board the owner chose, until 2026-10-03 (see
  below). Every heading rule reads
  `--font-heading-weight` instead of a number, so the weight is set once, in
  `snippets/theme-fonts.liquid`. Product card titles and benefit headings were 600 until
  2026-10-03; the
  benefit headings use the text face’s variables, as small capital labels do.
  - **The header menu categories are 700** (since 2026-09-15; the desktop inline menu only).
    They were 600 from 2026-09-14, when 700 beside the spaced-capital wordmark outweighed the
    shop name; once the name became a logo image the owner asked for them bold again. The
    phone drawer and the mega menu links keep their weight — the owner asked about the menu
    in the header bar. **A fifth bolder since 2026-10-03**: the words and the dropdown's headings carry
    a 0.03em stroke in their own colour on top of the 700, because the Jost files stop there (half
    again was tried first and the owner asked for less; see Header menu, second round).
  - **Titles are 550 since 2026-10-03: regular first, then halfway back** (the owner: "for all
    the titles lets make them not bold", then the same evening the halfway note below).
    `--font-heading-weight` went from 700 to 400 and then to 550 in
    `snippets/theme-fonts.liquid`, which flips every `h1` to `h6`, every `.h0` to `.h5` and
    everything Dawn builds on them. **Fourteen rules that carried a number of their own now read
    the token too** (eleven were 600, two 500, one 700), so they follow it from here on: product
    card titles, benefit headings, the category mosaic's labels (both variants), the Контакти
    row titles, the title under a card in Наскоро разгледани, the social band's heading, the
    homepage social heading, the footer's newsletter and column headings, the phone footer
    accordion titles and the reviews title. **A new title rule should read the token, not a
    number.**
    - **Left bold on purpose, because they are not titles**: the header menu (700, asked for on
      2026-09-15) and the mega menu, every button label, prices and sale prices, the spec
      list's labels, the option legends, pills and values on the product page, the delivery
      line's label, the facts under the hero, the lead sentence in the About panels, the stones'
      one-word meanings (the small spaced capitals above each stone's name), the atelier fact
      values and the Judge.me button. **Worth asking, not assumed**: the stones' meanings and the
      About leads are the two a reader might also call titles; each is one rule to switch.
    - **Checked live** on the homepage, a product, the collection, За нас and Контакти at 1440
      and 375: the token reads 400; every heading, card title, accordion title and footer
      heading reads 400; the only things at 500 or more on the homepage are the header menu,
      the stones' meanings and the Facebook button's label; no page overflows sideways.
      (That was at 400; the numbers that follow are at 550.)
    - **Halfway back, the same evening** ("i want it back but can we make it not that bold i
      like 50% of it"). **A reading, not a certainty**: "the title" was taken as every title
      (it is one setting, so nothing narrower could be asked of it), and "50%" as the midpoint
      between regular 400 and bold 700, **550**. The font files are variable (`font-weight: 300
      700` in `snippets/theme-fonts.liquid`), so 550 is drawn as 550 and not snapped to 500 or
      600: the same Cyrillic and Latin strings set at seven weights get steadily wider (the
      Cyrillic one at 48px is 748px at 400, 785 at 500, 798 at 550, 811 at 600, 839 at 700) and
      550 sits strictly between its neighbours. The fourteen rules that already read the token
      needed nothing; they followed. **To move it, one number**: 500 is a third of the way, 600
      two thirds.
    - **Checked live at 1440 and 375**: the token reads 550; the product title, accordion
      titles, card titles, footer headings and the social band's heading all read 550, and Add
      to cart and the header menu are still 700; the home, collection, За нас and Контакти pages
      measure exactly 375 wide with no sideways overflow.
- `sections/image-banner.liquid` — writing `[years]` in the hero heading or text renders the
  number of years since `founded_year` (1991), so the count never goes stale.
- **Hero heading.** `.banner__heading` in `assets/crown.css` carries its own unscoped
  `clamp()`, not the section's Heading size preset -- see the 2026-09-27 correction under
  Design direction for how that was found. Current values, cut a little smaller at the
  owner's request the same day: `clamp(2.1rem, 6.2vw, 5.7rem)`, down from `clamp(2.4rem,
  7vw, 6.5rem)`. Read live at 1440px as 57px (was 65px). The silver banner's own heading is
  unaffected regardless of what this clamp says -- its own scoped override
  (`.banner__heading.h2`, `min-width: 750px`) sets an explicit `3rem` that wins over it.
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
    - **Superseded 2026-10-03: the stroke is gone, and it never reached the menu button (see Header
      menu, second round).** Header icons were bolder at the owner’s request: a 0.9 stroke in the icon colour round
      Dawn’s filled outlines (search, account, cart, and the menu button on phones), about 1px
      more. 0.5 was too close to before; 0.9 keeps the bag’s handle and the magnifier open.
    - Measured first in a local mock-up, while the preview link was expired, then confirmed on
      the new preview the same day: a 72px bar, 12px above and below the logo, the menu words at
      700 and 6.9px below the bar’s centre on their capitals, the icons at a 0.9 stroke.
- **A bold pink line under the header's search, profile and bag icons on hover, 2026-10-01**
  ("i want it to underline in bold pink line"). A 3px `::after` in **`#E6BAB9`**, moonmagic's
  own pink and this site's existing hover pink, that grows out from the middle with
  `scaleX`, so nothing in the bar moves. **Not `#F3E1DB`**: the footer's paler pink would be
  nearly invisible as a line that thin on the off-white bar.
  - Each icon is a 44px box with the glyph centred, so the line sits 3px up from the bottom of
    the box, clear of all three -- the bag is drawn larger than the other two and ends lower.
  - **The profile icon is `position: static` by default**, so it had to be made relative or
    the line would have attached to the page instead of the icon.
  - Gated behind `@media (hover: hover)` so a tap on a phone does not leave a line stuck
    under an icon, the same defect found on the stones row. The menu button is excluded: the
    owner named three icons and it only exists on phones.
  - Checked live with a real hover: the bag reads `scaleX(1)`, 3px, `rgb(230,186,185)`, and
    the other two `scaleX(0)`.
  - **The stylesheet push was dropped once more** -- the seventh time. Still the old `?v=`
    after over a minute; one word changed in a comment and it landed at once. **My check for
    it also misfired first**: I searched the served CSS for `e6bab9` and found it, but that
    colour was already there twice from the add-to-cart hover, so a match proved nothing.
    Search for something only the new rule contains.
- **Wordmark on phones.** (Only without a logo image — one has been set since 2026-09-15.) Until a logo image is uploaded the header prints `shop.name` in
  spaced capitals. Below 750px its size follows the room Dawn’s header grid leaves it
  (viewport minus about 235px of icons and gutters) and tops out at 20px; without that,
  JEWELLERY split mid-word on every phone narrower than 390px. The 235 assumes search,
  account and cart — adding a header icon, or a longer name, means measuring again.
  Re-measured with Jost at 700: JEWELLERY takes 120px of the 125px available at 360px and
  81px of 85px at 320px. It fits, but a wider or heavier face, or more tracking, would not.
- **About page.** Rebuilt on 2026-09-13 on the reference’s About page, in
  `templates/page.about.json`: an intro, three story blocks, then the questions.
  - **Cut to a fraction of the text, 2026-10-03** (the owner: "make the text in За нас shorter for every
    section there because it is too much text they just need to get into the things to buy not just
    for our history and materials and the other thing"). The four story panels went from **767, 466,
    767 and 919 characters to 222, 171, 184 and 204**: each keeps its lead sentence and gets two short
    sentences, in `templates/page.about.json` (four `body` values, nothing else). Only facts the site
    already states are in them:
    - **История**: 1991, a garage in Veliko Tarnovo as the first workshop; pieces of gold and silver
      made with the same care today. The shop's address is no longer here (it is in the FAQ).
    - **Вдъхновение**: 1905, over 3100 carats, the British crown jewels; „такава красота търсим във
      всяко наше бижу“. The ring-as-a-circle passage is out.
    - **Дизайн**: an idea, a 3D model printed and examined from every angle, then gold or silver in
      the goldsmiths' hands. **The engraving sentence is dropped on purpose**: the owner removed the
      engraving question from the FAQ on 2026-09-30, so the short version does not repeat the claim.
    - **Материали**: 14 carats (585) for every day, 18 (750) for pieces with particular meaning, silver
      925, stones appraised by a specialist qualified at HRD Antwerp. The percentages, the stones'
      hardness, the enamel and the long explanation of what a proba is are out; Качество и детайли on the
      product page carries the short version of the gold and silver facts.
    - **The FAQ was left alone**: its rows are closed until opened, so they add no text a visitor has to
      read, and the owner asked earlier for help that really serves the products (the ring size answer
      is the longest at 598 characters). "Every section" was read as the four panels. The panels'
      height now follows the photograph, 623px at 1440 (its 8:7 floor), instead of 627 to 841px, so the
      four are about 500px shorter together. **The paragraphs under Current state that describe the
      longer text are out of date as to the words**, not the structure.
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
- **Product page** (2026-09-22, at the owner's request: sizes, grams, stone, quality and
  details, shipping and returns, shop the look, reviews, Instagram, you may also like --
  "go in moon magic and see what they have when open their product"). Built on Dawn's own
  `main-product`, reordered to the reference's own order, with one block of our own.
  - **What the reference actually does**, measured directly at 1440 and 375px rather than
    from memory. Its buy box runs: title and price (was-price struck, a discount
    percentage, a badge) → a two-line description with a read-more → the option groups,
    each a "Choose your …" label above the chosen value in capitals and a row of pills,
    with a SIZE GUIDE link on the size row → a delivery line ("MADE-TO-ORDER: ARRIVES IN
    8-18 WORKING DAYS") → a stock line ("ONLY A FEW PIECES LEFT") → ADD TO BAG → three
    accordions → a row of five trust icons. Below the product: Shop The Look, Customer
    Reviews (Judge.me), See It Styled On Instagram (the paid Foursixty app), You May Also
    Like. The phone keeps the same order, stacked, and adds a sticky purchase bar at the
    bottom; its gallery is a full-bleed 375px square slider at 375px (the 335 x 435 recorded here
    until 2026-10-02 was its image block, dots row and gutters included -- see Product gallery).
  - **Its "Quality & Details" panel is the model for ours**, and holds exactly what the
    owner asked for: a short spec list (material, stone, stone size, cut, stone weight in
    carats, **metal weight in grams**, certification) above prose about quality and
    warranty that is identical on every product.
  - **`product_specs`, our own block on `sections/main-product.liquid`.** Prints that spec
    list from **product metafields** rather than from anything typed into the description,
    so every product renders the same rows in the same order and the same words: Метал,
    Проба, Тегло (г), Камък, Брой камъни, Размер на камъка, Тегло на камъка (ct),
    Шлифовка. Each row renders only when its metafield is filled, the list only when at
    least one is, and the whole accordion only when either the list or its own text has
    something in it -- so a product with nothing set shows nothing at all rather than an
    empty drawer. Shared prose sits under the list, as richtext or from a page, so one
    page can serve every product. Styled in `assets/crown.css` as a definition list, label
    in the site's usual small spaced capitals, value in normal case, a hairline between
    rows but not after the last.
  - **Dawn's own `collapsible_tab` is now guarded the same way** -- it renders nothing
    when it has neither text nor a page, where Dawn's own version always draws the
    heading. That is what lets Доставка и връщане exist in the template before the shop's
    delivery and returns policy does (the owner's own choice when asked: "build the
    accordion empty"), without showing a visitor a heading that opens onto nothing.
    "Structure can exist before content" (How we work) -- but a control that does nothing
    is the one thing that rule rules out.
  - **Block order** in `templates/product.json`, following the reference: rating → vendor
    → title → price → description → size picker → quantity → stock message → Add to cart →
    Качество и детайли → За камъка → Доставка и връщане → Подхождат си → share. Then
    Може да ви хареса и (Dawn's own `related-products`) below. **Since 2026-10-01 the
    description comes before the price**, and the metal option is drawn before the size --
    see Buy box reordered, below.
    - **Share is kept even though the reference has neither it nor a quantity box.** It was
      already in the template and the owner did not ask for it to go; removing it would be
      changing something next to what was asked. Worth offering, not assuming.
      - **The quantity selector went on 2026-09-28**, at the owner's own request ("i don't
        want my products to have quantity"), which is what this note meant by worth
        offering. The `quantity_selector` block and its `block_order` entry are both out of
        `templates/product.json`. With no quantity input in the form, Shopify takes one --
        the right default for pieces made to order. The cart still lets a customer change
        the number there; untouched, and not asked about.
      - **The request was ambiguous and was asked about rather than guessed.** "Quantity"
        could have meant this box or Shopify's own stock counting, which is what was making
        every variant read SOLD OUT -- two different fixes in two different places. The
        owner wanted both.
  - **Options are words on the product page and circles on the cards, 2026-09-28**, at the
    owner's request ("when i open ... the ring i want the colors to not show i want to show
    the materials ... 14k yellow gold, 14k rose gold, 14k white gold"). The variant picker
    block in `templates/product.json` moved from `swatch_shape: circle` to `none` -- Dawn's
    own setting -- so the Color option is drawn as text pills exactly like Ring size (36px
    tall, 14px, square corners) instead of colour circles. Checked live: no `.swatch`
    element left in the picker, and picking a pill still sets `?variant=`, the picker state
    and the variant's own photo.
    - **The cards were not touched.** `snippets/card-product.liquid` draws its own circles
      from the same Color entries and never reads `swatch_shape`, which is what the owner
      wants: circles before a product is opened, words after. One option feeds both -- the
      entries' colours make the circles, their names make the words.
    - **The words are Shopify data, not theme text.** The pills print the option's values,
      so they read Gold / White / Rose gold until the Color entries are renamed in the Admin
      (see Waiting on the Shopify admin). Deliberately not forced from the theme: a Liquid
      mapping would show „14К жълто злато“ on the page and "Gold" in the cart, the checkout
      and every order email.
    - **The row's heading still reads "Color"**, the option's own name. Not asked about, so
      left alone. An option linked to a category attribute may not be renameable in the
      Admin; if it should read Материал, that is a small theme relabel, or a Translate &
      Adapt entry once Bulgarian is a store language. (Overtaken the same day: the owner
      renamed the options in Bulgarian themselves, and then asked for the colour row to go --
      see the next entry.)
  - **The colour option is hidden on the product page when a material option covers it,
    2026-09-28**, at the owner's request ("when you open a product i don't want the color ...
    section to be seen"). The ring showed Цветове на златото and Материал на бижуто side by
    side, the same gold twice. `snippets/product-variant-picker.liquid` now skips the option
    with swatches when another option covers it exactly, and `snippets/product-variant-
    options.liquid` does the rest.
    - **Why not just hide the row.** A hidden option is still part of every variant, and
      Shopify fills an option it is not sent with that option's **first** value. Tested live:
      asking for size 56 and 14К розово злато alone returned "56 / жълто злато / 14К розово
      злато" -- an order line reading yellow beside rose. Hiding the row and nothing else
      would have shipped that.
    - **The rule, as first written -- superseded 2026-10-03, see the next entry.** The option with
      swatches (the first, if several) is skipped only if
      another option **without** swatches covers it exactly: every value of that option
      contains exactly one colour name (case-insensitive containment -- "жълто злато" inside
      "14К жълто злато"), and every colour name sits inside at least one value. Anything less
      draws every row as Dawn does: a colour with no material, a name contained twice, a
      product with a colour option alone. So a choice can never become unreachable. 14К and
      18К pieces sharing one colour circle pair correctly too (both contain "жълто злато").
    - **Both ids travel together.** Each visible value renders `data-option-value-id=
      "materialId,colourId"`. Dawn's `selectedOptionValues` (`global.js`) maps that attribute
      per checked input and `product-info.js` joins the results with commas into
      `option_values=`, so the request carries all three ids and Shopify resolves the exact
      matching variant. No script of ours -- one attribute. The order of the ids does not
      matter (three orders tried live).
    - **Sold-out state is worked out from the variants, not from Shopify's flag.** Shopify
      documents `product_option_value.available` as: given the selected values of the
      *earlier* options, does this value have a purchasable combination among the later ones.
      The hidden colour comes before the material, so with one colour selected every other
      material would read as sold out even with its matching variant in stock (the offline
      test shows exactly that: `SOLD OUT | SOLD OUT | avail`). The options snippet looks for
      an available variant carrying the value together with its own colour and the selected
      values of the visible earlier options instead. A variant stocked with the wrong colour
      never makes a material look available.
    - **Tested two ways.** Offline, with liquidjs and mock products built to Shopify's
      documented drop semantics (kept in the scratchpad, not committed): 28 checks -- the ring
      with nothing in stock, matching pairs in stock, one material only, a mismatched variant
      only, material listed before colour, the bracelet with an incomplete and a complete
      material list, sizes plus colour alone, ambiguous names, 14К with 18К, the dropdown and
      the circle pickers. And live, with real clicks: a material → "54 55 / розово злато /
      14К розово злато", a size → "58 / бяло злато / 14К бяло злато", yellow again → "58 /
      жълто злато / 14К жълто злато", the order form's variant id equal to the selected
      variant each time. At 375px: two rows, no horizontal overflow.
    - **What has to stay true in the Admin.** The colour names appear inside the material
      names. Stock, price and photos sit on the variants where colour and material name the
      **same gold**, since those are the only ones a shopper can land on; the other six in
      nine are never chosen from the page. Three options make 63 variants a ring where 21
      would do. **Worth offering**: one material option that carries the swatches (entries
      named 14К жълто злато and so on, the option named Материал на бижуто) gives the same
      page and the same card circles with no hidden option, no matching rule and a third of
      the variants.
    - **The cart, checkout and emails still list every option**, so a line reads "58 / жълто
      злато / 14К жълто злато". Not touched, not asked about. (Since 2026-10-03 the cart
      drawer leaves the colour out of a line -- see Cart drawer; the cart page, checkout and
      the order emails still list every option.)
  - **The colour row is hidden on every product with a material option, 2026-10-03** (the owner:
    "for every product we open i don't want the color choice to be shown"). The exact-cover rule
    above kept it on both products the owner has: the ring because `925 сребро` named none of the
    three golds (it does name the fourth colour, `Сребро`, which the owner has since added: 112
    variants now), and the bracelet because its material list has no rose or white gold.
    - **The rule now**, in `snippets/product-twin-option.liquid`: the colour option (the first with
      swatches) is hidden when another option without swatches has **a name for a colour in every
      one of its values**. A colour that no value names (the bracelet's rose and white gold) is
      allowed to be unreachable from the page -- that is what "every product" costs, and the
      Admin is where it is filled in. A product whose only way to pick a colour is the colour (a
      colour and a size, or a material that names no colour) keeps its row: hiding it would make
      the other colours unbuyable, which no instruction can have meant.
    - **A first version guessed, and a live check caught it.** It hid the row whenever one value
      named a colour and gave a value that named none the first colour that had a variant with it.
      Checked live on the bracelet, picking Silver resolved to "Silver / розово злато": the
      material says the English "Silver" and the colour entry is the Bulgarian "Сребро", so
      nothing matched and the first colour won. The colour is **order data the atelier reads when
      it makes the piece**, so a guess is not acceptable: the fallback was deleted rather than made
      cleverer. It was live for a few minutes (`4f54743`); the correction is `2f57b8a`.
    - **One place decides which colour a value names**, `snippets/product-twin-match.liquid`: the
      colour's name inside the value's name, lower-cased; the longest name wins ("жълто злато"
      beats "злато"); and **English silver is read as сребро on both sides**, so "Silver" meets
      "Сребро" and "Sterling Silver" meets "Silver". Gold is not translated: both sides of every
      gold pair are Bulgarian today. The picker, the options snippet, the metal box's dot and the
      cart line (see Cart drawer) all go through it.
    - **The page's first paint can carry the wrong colour.** Shopify loads the first available
      variant, and the bracelet's first is "14К жълто злато / розово злато". With the colour
      hidden, a shopper who changed nothing would have put that in the bag. The picker prints the
      loaded colour (`data-hidden-selected-value-id`) and `assets/variant-twin-sync.js` -- loaded
      only where there is a picker -- asks for the right variant once, with a `change` event on
      `<variant-selects>` itself, the way a click would. **The event goes to the picker, not to the
      radio**: `<option-menu>` treats a change on a radio as a keyboard step and would have opened
      the metal list. It runs once per page load, so a pair Shopify has no variant for cannot loop.
    - **Tested offline** (liquidjs, mock products, 34 checks, kept in the scratchpad): the ring and
      the bracelet as live (the bracelet including the condition that fires the sync), a colour with
      only a size, a material that names no colour, no colour option, a platinum value that names
      none, silver sold out in its own colour only, sold out following the selected size, English on
      both sides, ambiguous names, 14К and 18К sharing a colour. The older harness files' expectations
      for the exact-cover rule (S5, S7, M3, "ORDER bracelet") fail now **on purpose**; three failures
      that were there before this change are stale checks from before the metal menu.
    - **Checked live**: the ring draws the metal and the size and no colour, loads on its paired
      variant with the URL untouched, and each of the four materials resolves to its own variant
      ("54 55 / жълто злато / 14К жълто злато" ... "54 55 / Сребро / 925 сребро"), all available. The
      bracelet draws one row, "Jewelry material"; it loaded on the mismatched variant and corrected
      itself to "14К жълто злато / жълто злато" (the URL gains `?variant=`) without opening the list;
      Silver resolves to "Silver / Сребро".
    - **What this leaves for the Admin**: the bracelet's page offers yellow gold and silver only,
      until `14К розово злато` and `14К бяло злато` are added to Jewelry material; rose and white
      gold are otherwise unreachable from it (they still show as circles on its card).
  - **Размери and Материал на бижуто redesigned, 2026-09-28, at the owner's request** ("i
      don't like it and i want it to look luxury and professional"). Dawn's own pill picker
      (`component-product-variant-picker.css`) is plain e-commerce default: a hairline
      10%-opacity border at rest, inverting to a solid black block on selection. Checked
      moonmagic.com's own size/metal picker live rather than guessing (their Harlow moonstone
      ring): idle boxes carry a transparent border the same width as selected, so nothing
      shifts on interaction; a faint neutral fill (`rgb(248,248,248)` there) tells a box from
      the page without drawing the eye; selecting one draws a crisp dark outline rather than
      inverting to a filled block, a quieter confirmation; and "Choose your size" sits above
      the row with a separate "SIZE: 7" readout beside it, confirming the pick even once the
      chosen box has wrapped onto a second row out of the eye's first pass.
    - **Corners untouched.** Variant pills stay square site-wide (Square corners under Design
      tokens); only Dawn's fill and border treatment changed here, never the shape -- moonmagic
      itself was not a reason to depart from that rule, and nothing else asked to.
    - **The eyebrow-plus-value legend is this page's own existing convention, not a new one.**
      Styled to match `.product-specs__label`/`.product-specs__value` directly above this in
      the same file: small spaced capitals (1.2rem/600/uppercase/0.08em/70% opacity) for the
      label, plain case at full strength for the value -- a label that shouts and a value that
      does not read as the same panel rather than a different one a few pixels below it. The
      value itself is Dawn's own mechanism (`data-selected-value`, already used by the swatch
      picker's own legend); `product-variant-picker.liquid`'s button-type legend gained the
      same span, so Размери and Материал на бижуто now confirm the current pick exactly as a
      swatch-type option already would.
    - **Scoped to `.product`**, the product page's own outer wrapper -- `.product-form__input
      --pill` renders nowhere else live (featured-product carries the same picker but sits on
      no template). The `.product` ancestor also wins a real fight, not just scopes one:
      Dawn's own rules here load from inside the section, after crown.css, so the extra class
      is what wins on specificity rather than leaving it to load order.
    - **Tested against the one state this test data actually has -- everything sold out --
      and against a simulated in-stock state.** Every variant on this product is disabled
      (see Waiting on the Shopify admin), so the selected pill is always also disabled;
      checked live: a soft ring (`rgba(fg,0.35)` border) marks it as the pick without the
      confidence of a real, buyable one, strikethrough intact. To see the crisp, in-stock
      look -- the one real customers will mostly meet -- every radio's `disabled` was cleared
      in the browser only (not persisted, the same trick already used once for the empty hero
      slot): idle boxes read as a quiet grey field, the selected one a crisp outline with
      bolded text, at 1440 and 375px, no overflow either width.
  - **Add to cart matched to moonmagic's own ADD TO BAG, 2026-09-28**, at the owner's
      request ("lets make now the button add to bag like in moonmagic"). Measured their
      button live at three widths on the Harlow ring: **1440 → 432 x 54.6, 22px/700, 2.2px
      tracking; 768 → 713 x 48.6, 18px/700, 1.8px; 375 → 335 x 55, 18px/700, 1.8px** --
      uppercase throughout, black fill, white label, `border-radius: 1px` (a square corner in
      all but name). Their hover swaps the fill to their own blush pink; their disabled state
      goes flat grey.
    - **Two of the three sizes already matched, and that is not a coincidence.** The Default
      buttons block at the top of `assets/crown.css` was measured off this very button back
      on 2026-09-21, when the store had no products to check it against -- its own note said
      so. Confirmed live now: 55px/22px above 990 and 50px/18px between are right. That stale
      "unverified" note has been corrected in place.
    - **The phone tier is the one that moved**, 4.2rem/1.4rem to 5.5rem/1.8rem, and only for
      this button. It had been shrunk in the owner's own site-wide "smaller phone buttons"
      pass; this request named moonmagic for this button specifically, so it follows
      moonmagic instead. Every other phone button keeps the smaller size.
    - **What actually changed**: the shape (41px pill → square), the weight (400 → 700), the
      tracking (1px → 0.1em), the caps, and the fill.
    - **The fill, and why no hex is typed in.** Dawn hands this button `button--secondary`
      whenever the dynamic checkout button is shown (`snippets/buy-buttons.liquid`), and
      `.button--secondary` repoints `--color-button`/`--color-button-text` at the pale
      secondary pair -- which is the whole reason it rendered as a washed-out outline pill.
      Setting those two back to **`inherit`** hands them to whatever the section's own colour
      scheme says, and scheme-1's own button pair is already `#000` on `#FFF` (the named
      pure-black exception under Design direction). So the black is the scheme's, not a
      literal, and it still resolves correctly if the express-checkout button is ever turned
      off and Dawn switches the class to `button--primary`.
    - **Square corners here are the third deliberate exception to the site-wide pill**, after
      the hero's and the silver banner's.
    - **Hover fills with moonmagic's own pink, at the owner's request the same day** ("make
      the hover pink like moonmagic"). It first shipped with this site's own convention --
      the fill dropping away to an outline, as the hero, silver banner, atelier and view-all
      buttons all do -- and the pink was offered alongside it; the owner took the pink. So
      **this is the one button on the site that answers a hover by filling with colour
      instead of emptying out.** `#E6BAB9`, read straight off their own
      `.button--add-to-cart:hover` rule, not guessed at.
      - **Their pink exactly; the label ours.** moonmagic keeps a white label on that pink,
        which measures **1.74:1** -- below the 2.75:1 this project already turned down once,
        when the Instagram gradient's bright orange tail was dropped for a deeper red (see
        Social follow). So the label is the site's own near-black instead, **9.44:1**, which
        also keeps the no-pure-black rule. White is one line away if the owner wants the
        literal match.
      - Timing stays this site's own 0.35s rather than moonmagic's languid 0.8s -- only the
        colour was asked for. `transform` stays in the transition list so the site-wide
        hover-lift animates instead of snapping (the lesson under Buttons lift up on hover).
        Checked live with a real hover: `rgb(230,186,185)`, near-black label,
        `translateY(-2.5px)`.
    - **Disabled is left to Dawn's own `opacity: 0.5`**, which renders the black fill as a
      mid grey with a pale label -- close to moonmagic's own flat grey disabled state with no
      rule of its own. Worth knowing while every test variant is sold out: **grey is the
      state this page actually shows today**, and the solid black only appears once something
      is in stock.
  - **The buy box matched to moonmagic's own type scale, 2026-09-28** ("their section is
    with smaller text and everything is smaller but with good proportions, make that way").
    Measured both at 1440, line by line:

    | | moonmagic | ours before | ours now |
    |---|---|---|---|
    | title | 24 / 700 | **40 / 700** | 24 / 700 |
    | price | 22 / 400 | **18 / 400** | 22 / 400 |
    | description | 14 / 400 | 16 / 400 | 14 / 400 |
    | button | 22 / 700 | 22 / 700 | 22 / 700 |

    - **Size was not the whole story -- the order was.** On moonmagic the title and the price
      sit within 2px of each other, so the price carries real weight beside the name. Ours
      had a 40px title against an 18px price, so the title shouted and the price disappeared,
      which is what made everything under it look like an afterthought. **The title came down
      16 points and the price went up 4**: not a uniform shrink, which is what "good
      proportions" was actually pointing at.
    - **The option labels were left alone**: already smaller than moonmagic's (12 against 14)
      and carrying this site's own small-capitals treatment, matched to the specs list below
      them. The button was already 22/700 and is untouched -- worth saying plainly, since the
      same message asked for the button to shrink too and it is already their size.
  - **Three corrections the next day, 2026-09-29, after the owner had to ask twice.** Worth
    recording as a lesson, not just a change: each had been answered with an explanation
    instead of an edit.
    - **The button is smaller and no longer matches moonmagic**, deliberately: 48px/16px on
      desktop, 44px/14px below, down from their 55px/22px. It had been left at their size
      twice on the reasoning that it already matched the reference. It did -- but the owner
      asked for smaller, and **the owner's instruction outranks the reference** (How we work).
      The label shrinks with the box so its proportion inside holds, and so the Bulgarian
      label, twice the length of "ADD TO BAG", fits.
    - **The button label is Bulgarian now without waiting for the store language.** The right
      fix is still Settings → Languages, which only the owner can do, and `bg.json` has been
      ready all along -- but pointing at that three times while the most important button on
      the site read "Add to cart" was not a fix. The three button strings in
      **`locales/en.default.json`** now carry Bulgarian: `add_to_cart`, `sold_out`,
      `unavailable`. A stopgap on the words a customer actually reads; `bg.json` takes over
      untouched the moment Bulgarian is published.
    - **The delivery line holds one row, and the reason it did not is worth keeping.** It
      broke onto a second row by **four pixels** -- 429px of content against a 425px column
      -- because Bulgarian capitals run far longer than moonmagic's English: our two halves
      measure 191px and 202px on their own against their whole short line. Not a wrapping
      bug, just a language that does not fit the same box. 1.1rem with a 0.6rem gap brings
      it to 394 of 425; phones go to 0.9rem with a 1.6rem icon, 318 of 345. Checked at both.
    - **The truck is stroked, and both halves of the text are bold**, at the owner's request
      ("make the truck bold it looks bad like that, also make the text like that"). Dawn
      draws `icon-truck.svg` as filled shapes with **no stroke at all**, which is why it read
      as frail beside bold capitals -- it now carries `stroke-width: 0.8` in its own colour,
      the same fix the header icons already use. moonmagic bolds only its label and leaves
      the delivery time regular, so bolding both is deliberately not their treatment.
    - **The delivery line has its truck and is no longer half empty.** A `show_icon` setting
      renders `icon-truck.svg` (Dawn's own) before the words, and the text defaults to
      „Доставка с Еконт и Спиди“ -- the carriers the old site names, true without inventing
      the delivery window that is still unsettled. Both remain settings.
  - **The made-to-order line above the button, 2026-09-28** ("we need to add Made-to-order:
    Arrives in 12-22 working days that they have"). A new `delivery_note` block on
    `sections/main-product.liquid`: a bold label and plain text after it, 12px uppercase at
    0.1em tracking, 43px above the button -- all measured off theirs, including the gap.
    - **The delivery time itself ships empty, on purpose.** moonmagic's "12-22 working days"
      is *their* promise; a Veliko Tarnovo workshop shipping inside Bulgaria is a different
      business, and Working agreements rules out inventing a delivery window. The label
      defaults to „Изработка по поръчка:“, which is simply true, and the text beside it is a
      setting for the owner to fill with the shop's real figure.
      - **Filled 2026-09-29, by the owner**: „Изработка по поръчка: Доставка 5-20 работни
        дни“. Written without „до“ before the range -- a range already carries its own
        bounds, and the shorter string is what keeps the line on one row, which the longer
        wording misses by a pixel or two at 11px in a 425px column. **Since measured on the
        new link and the calculation held**: 399.5px of 425.4 at 1440 and 322 of 345 at
        375px, one row at both.
    - Guarded like the collapsible tabs: with both fields empty it renders nothing at all.
    - Pushed in two steps, section then template, per the validator lag -- and the gap fix
      after it was **dropped by Shopify** and needed a byte-change re-send, the fourth time
      that has happened.
    - **The buy column widened toward moonmagic's, 2026-09-28** ("lets make the button the
      same size as moonmagic"). The button is full-width in both layouts, so its width is
      its column's width. Measured at 1440 -- **theirs: gallery 835.5, gap 45, button 432,
      total 1312.5; ours was: gallery 845, gap 40, button 415, total 1300.** Their content
      box is 12px wider than ours and 1400 is a site-wide page-width token, so all three
      numbers cannot match at once.
      - **Correction, 2026-10-02: "gallery 835.5" was the gallery's right edge, not its width.**
        Re-measured on the gallery's own boxes: at 1440 their pictures run from x=112.5 to
        835.5, **723px of gallery**, in a 1200px container (112.5 either side of a 1425px
        layout); the buy box is 432px after a 45px gutter. So the 432 and the 45 stand, and
        what they were compared against was 723, not 835. Ours is wider than theirs because
        our content box is (1300 against 1200), which is also why our tiles are bigger.
      - **Everything except width already matched exactly** -- 55px tall, 22px/700, 0.1em
        tracking, square -- so width was the whole of what the owner was looking at.
      - **The obvious lever was the wrong one.** Cutting Dawn's 4rem gutter to 2.3rem hits
        432 exactly, but drops the gap to 23px against moonmagic's own 45 and leaves the
        gallery 10px wider than theirs: matching the button by moving away from them on two
        other numbers. Dawn's 35% column going to **36.6%** takes the width from the gallery
        instead -- button 425.4, gallery 834.6 against their 835.5, gutter untouched. Two of
        three matched and the third within 7px. Live and checked.
      - **The first version of the rule did nothing at all**, and the reason is the one this
        file keeps relearning: it was written at Dawn's own specificity
        (`.product--large:not(.product--no-media) .product__info-wrapper`, three classes) and
        `section-main-product.css` loads from inside the section, after crown.css, so it lost
        on source order. Doubling `.product` fixed it. **Measure after pushing, not before.**
    - **Shopify's own Bulgarian for Add to cart does not fit this button**, found before the
      store language was switched rather than after. `locales/bg.json` ships
      „Добавяне към количката“, which needs 378px of label against 355px of room at 22px, and
      310 against 285 on a phone -- it would have wrapped to two lines the moment Bulgarian
      went live. Shortened to **„Добави в количката“** in the theme's own `bg.json`, one
      string changed and the rest of the file byte-identical (a re-serialised copy reordered
      keys and was thrown away). 306px at 22px now, comfortable at both sizes. **The wording
      is the owner's to confirm** -- they are the native speaker; „В количката“ is shorter
      still if the button ever needs it.
    - **The express-checkout button was removed the same day, at the owner's own
      instruction** ("remove the buy with shop button"), after they were shown that
      moonmagic's buy box holds ADD TO BAG and nothing else. `show_dynamic_checkout` is
      `false` on the buy-buttons block in `templates/product.json`, which drops Shopify's
      purple "Buy with shop" pill and the "More payment options" link under it. Asked first
      rather than assumed, per Working agreements -- but **nothing about checkout itself
      changed**: the cart's own checkout button is untouched and no payment method is
      affected, only the product page's express shortcut. One setting to put back.
      - **Dawn swaps the Add to cart class from `button--secondary` to `button--primary`
        when this is off**, which is exactly the case the `inherit` trick above was written
        for: the button stays black, because its colours come from the colour scheme rather
        than from the secondary pair. Confirmed live -- `button--primary`, still 55px,
        18px/700, square, black.
  - **The two accordions show, 2026-09-29** ("make the quality and shipping dropdowns
    show"). They had been in the template since 2026-09-22 and rendered nothing the whole
    time, because this section's own guard hides a tab with no text behind it -- working as
    designed, but the owner could not see them.
    - **Качество и детайли** now carries: handmade in the Veliko Tarnovo workshop since
      1991, gold 585 and 750 and silver 925 with rhodium plating, stones appraised by an HRD
      Antwerp qualified specialist. **Every one of those is a fact already recorded in this
      file** -- nothing written from assumption.
    - **Доставка и връщане** carries the carriers, and since 2026-09-29 the shop's own
      **delivery window and return period**, both given by the owner: доставка 5-20 работни
      дни, връщане до 14 дни. **The delivery price and the warranty are still missing** and
      are deliberately not invented (Legal pages, under Working agreements).
    - **За камъка stays invisible**, correctly: it has no text yet either, and nobody asked
      for it.
    - **Качество и детайли expanded the same day** ("talk about more for the gold and you can
      keep it clean or something like that"). The gold now gets its own paragraph -- 585 is
      14 carats and 58,5% pure, the harder alloy for every day; 750 is 18 carats and 75%
      pure, deeper in colour and softer, for a piece with particular meaning -- which is the
      same explanation the materials block on За нас already gives, so the two pages agree.
      Then silver 925 with rhodium plating, the HRD Antwerp appraisal, and a four-line care
      list: store apart, take it off for swimming and housework, keep it from perfume and
      cleaning products, wipe with a soft cloth. **Care is general jewellery advice, not a
      policy claim**, so none of it waits on the accountant the way the returns half does.
    - **Доставка и връщане lost its truck icon** the same day, at the owner's request. The
      truck above the button is a different thing and stays -- that one was asked for by
      name.
  - **Share is gone from the buy box, 2026-09-29**, at the owner's request. It had been kept
    on 2026-09-22 only because it was already in the template and nobody had asked -- the
    note there said it was "worth offering, not assuming", and this is the answer. moonmagic
    has none either. Quantity went the day before for the same reason, so the buy box now
    holds exactly what the reference's does.
  - **„Може да ви хареса и" never appeared, and it was not a theme fault, 2026-09-29.**
    Shopify's own recommendations return **zero** for this product -- checked directly on
    both the `related` and `complementary` intents. The reason: the ring is the **only**
    product in its collection, and the store has no orders, so the algorithm has nothing to
    work from. Dawn's `related-products` section can only ever show what that API returns, so
    it rendered an empty wrapper.
    - **Swapped for a `featured-collection` row over `all`**, same heading, same card style,
      which shows real products today. It can go back to `related-products` in one line once
      the catalogue is real and orders exist -- worth doing then, since recommendations beat
      a fixed row for 4,000 designs.
    - **`sections/featured-collection.liquid` gained a guard** so the row never lists the
      product the visitor is already on: the page's own `product.id` is captured **before**
      the loop, which reuses the name `product` for each card and would otherwise shadow it.
      Nil on every other template, so the homepage row is untouched.
    - **Retitled and given room, 2026-09-29** ("chage the title and make space betwen the
      sections"). The two sections were **touching** -- a measured gap of 0, with only the
      product section's 12px and this row's 36px of padding between the last accordion and
      the heading. Top padding to 80 and bottom to 56, both on Dawn's step of 4, giving 100px
      of real separation, in line with the section breaks used on the homepage.
    - **The title is „Може да ви хареса“**, without the trailing „и“ it had. The owner then
      said "keep the title how it is" -- read as a revert and started to undo, then corrected
      ("no don't sorry"): it meant keep the new one. Nothing had been pushed, so the live
      site never moved; the working file was simply discarded back to the committed state.
  - **What is deliberately not built yet, and why.**
    - **Size guide**: Dawn's `popup` block draws its link whether or not a page is behind
      it, so adding it before a Таблица с размери page exists would put a button on the
      page that opens onto nothing. It goes in the moment the page does -- one line in the
      template. The size picker itself already works: the ring product's own variants are
      54-60, European ring numbers (the owner's own words: "we are working with the europe
      sizes for example 50 51 52 53"), not millimetres -- an earlier version of this note said
      millimetres and was wrong.
    - **Reviews**: the owner chose Judge.me's free plan (2026-09-22). The theme side is
      already done -- Dawn's `rating` block reads `product.metafields.reviews.rating`,
      which Judge.me writes, and prints nothing until there are reviews, and the card
      rating on Може да ви хареса и is switched on for the same reason. The review list
      itself is the app's own **section**, installed and placed on 2026-10-01 -- see
      Customer reviews (Judge.me) under Custom code.
    - **Instagram**: deferred by the owner's own choice the same day -- there are no
      product photographs yet and no customer pictures of pieces being worn, and a thin
      feed reads worse than none.
    - **Shop the look** uses Dawn's `complementary` block, which is curated per product
      through the free Search & Discovery app (the same app the stone filters already
      need). It sits in the buy box column rather than full width under the product as the
      reference's does; the data is the same either way, and moving it to its own
      full-width row is a small follow-up if the owner wants the reference's placement.
  - **Buy box reordered, metal before size, black text, 2026-10-01** ("i want the size for
    the rings to exchange with choosing you materials and the description i want it to be
    over the price and and to not have that much space betwen the price and the tittle this
    for the products and make the text balck"). The block order above is no longer current:
    the description sits before the price.
    - **Metal before size.** `snippets/product-variant-picker.liquid` draws its options in
      two passes -- the ones whose name contains метал, материал, metal or material first,
      then the rest, each pass in the product's own order. That order lives in the Admin
      (size, colour, metal on the ring), so the theme reorders what it draws rather than
      asking the owner to drag options there. Only the page changes: the radios keep their
      own ids, the request to Shopify is built from the ids, and the cart, checkout and
      emails still list the options in the Admin's order. A product with no such option
      draws as before, and the bracelet (material, then colour) is unchanged. The dropdown
      picker's ids use `option.position` now, since the loop index restarts on the second
      pass.
      - **Tested offline first**, with the earlier liquidjs harness and mock products
        (scratchpad, not committed): the old checks with their order assertions swapped,
        plus six new ones -- ring with and without the colour option, the bracelet, a size
        alone, three options, unique dropdown ids -- 36 of 36.
      - **And live**: the legends read the metal, then the size; choosing rose gold and then
        size 56 gave "54 55 / розово злато / 14К розово злато" and "56 / розово злато /
        14К розово злато", with the URL and the form's variant id following each choice.
    - **Description above the price, and a tight top.** `description` moved ahead of `price`
      in `templates/product.json`, so the box reads title, a line or two about the piece,
      the price, then the options. Dawn's 1.5rem above and below every block (2.5rem on the
      description) became 0.8rem from title to description and 1.4rem from description to
      price (0.4rem and 0.8rem since 2026-10-03, see the entry below). The tax line still tucks
      under the price: Dawn's -1.4rem needs the price
      block's own 1.5rem below it, so only that block's top margin was zeroed. Live at
      1440: title ends 183, description 191-216, price 230, tax 269-290, options 310.
      - **The sentence was ambiguous, and this is a reading, not a certainty.** "Description
        over the price" and "not that much space between the price and the title" cannot
        both hold with the description between them. Taken as: description directly under
        the title, price under it, every gap in that top group tight. If the owner meant the
        description above the title, or the old order with only the title-to-price gap
        closed, each is a one-line change to `block_order`.
    - **The whole buy box is black.** Measured first, with the animations finished: the
      title, price, option values, delivery line and accordion headings were `#221F1C`, and
      the vendor line, tax line, description, option legends, accordion text and spec labels
      were 70-75% of it. `--color-foreground` is set to black on `.product__info-container`
      and `color` with it (a custom property does not change text that has already
      computed its colour); the alpha-based ones are listed by name. 39 visible text nodes
      in the column, every one `rgb(0, 0, 0)` except the white Add to cart label.
      **Scope is the buy box, the right-hand column.** The related row and the questions
      were not asked about and are unchanged; the footer went black the round before.
      - **The frameless pane bit again**: the first reading after injecting the rule still
        showed the idle option pills near-black, because their 0.2s colour transition never
        advances there. Finishing the animations by hand
        (`document.getAnimations().forEach(a => a.finish())`) read them black. The lesson
        is already under Buttons lift up on hover.
  - **Stars above the title in place of the vendor line, care in its own accordion, shorter
    quality text, 2026-10-01** (the owner: "remove cullinan jewellery that is appearing above
    the title, i don't want that on my products, put the stars there, if there is no review
    they will just stay not full with color like we did for the section Отзиви от клиенти";
    "i don't want this text Всяко бижу се изработва на ръка ..."; "make this one another drop
    down text like the others" about the care list; "make this shorter" about the gold,
    silver and stones text). **The order now is** rating, title, description, price, the
    options (metal, then size), the delivery line, Add to cart, Качество и детайли, Грижа за
    бижуто, За камъка (still empty, so hidden), Доставка и връщане, Подхождат си.
    - **The line above the title was the `vendor` block**, a `text` block printing
      `{{ product.vendor }}` -- the Vendor field, which reads the shop's own name on every
      product. Out of `templates/product.json` with its `block_order` entry. **"On my
      products" was read as the product page.** The homepage product row prints the vendor
      too (`show_vendor` is true there alone), but **below** the title and the swatches, not
      above it (`snippets/card-product.liquid`), so it was left alone: one setting if that
      was meant as well.
    - **The stars take its place, and exist from the first day.** The rating block was
      already first in the box, but Dawn's version prints nothing until `reviews.rating`
      exists (Judge.me writes it with the first review), so today it drew nothing. It now
      draws five **empty** stars when there is no rating (`sections/main-product.liquid`, an
      `else` branch; `role="img"`, label „Все още няма отзиви“), and a rated product renders
      exactly as before, stars and count.
      - **"Not full with colour" is Judge.me's own empty star**: the pink drawn as an
        outline, which is what the review form shows before a star is picked and what
        moonmagic's do (their `jdgm--off` glyph, put beside the filled ones on their page
        to look at it). So the unfilled part of the row is an outline in the star colour
        instead of Dawn's 15% grey track, and the filled part is the same pink, solid: one
        glyph for both, `-webkit-text-stroke: 0.08em` (1.2px at 15px) on the glyphs Dawn
        already clips its gradient to, the track side of that gradient transparent. A
        half-filled star is one star, not two shapes.
      - **Scoped to the buy box's own rating** through `.rating-wrapper`, which exists on
        that block alone, so the cards in the Подхождат си row (inside `.product` too) keep
        Dawn's grey remainder. Cards show nothing until rated, so there is nothing to
        compare today; matching them once reviews exist is one selector.
      - **moonmagic puts its stars above the title too**: Judge.me's badge, 16px stars on a
        20px pitch, pink, "1217 reviews" beside them, its box and the title's within 2px of
        each other. Ours are 15px, the size the owner asked for earlier the same day, with
        the count beside them once there is one.
      - **Space.** Dawn's 1.5rem above every block after the first left the stars floating
        clear of the title. The wrapper is a flex row as tall as the stars and the title
        takes 0.4rem: 4px between the stars' box and the title's (5px with a count, whose
        caption is taller), about 12px from the stars to the capitals.
    - **Качество и детайли**: the "handmade since 1991" sentence is out ("i don't want this
      text"). The rest is cut to about half: gold is 585 (14 carats) or 750 (18), 585 the
      harder and for every day, 750 a richer colour for a piece with particular meaning;
      silver is 925 with rhodium plating that keeps its shine; stones are appraised by a
      specialist qualified at HRD Antwerp. **Dropped**: the 58,5% and 75% (the number is
      already the purity in parts per thousand), 750 being the softer, rhodium "protecting
      from tarnishing", and the stones being "selected". Every fact left is one that
      За нас already states.
    - **Грижа за бижуто is its own accordion**, a `collapsible_tab` straight after Качество
      и детайли, holding the four care lines exactly as they were live (the template script
      refused to run unless the list matched byte for byte). Placed there because that is
      where the text came from; the owner named no position. General jewellery advice, so it
      waits on nobody.
    - **Checked without the preview.** The rating block's Liquid rendered by liquidjs for no
      metafield, an empty one, no reviews object and a rated product (7 checks, harness in
      the scratchpad, not committed). The stylesheets in a local mock at 1440 and 375px, with
      the real `base.css`, `component-rating.css`, `section-main-product.css` and
      `crown.css` and the markup produced by the real Liquid: four states (none, 3, 4.5 and
      5 of 5), 15px stars, pink, a 1.2px outline, a half star drawn as one star, no sideways
      scroll at 375. **Not seen on the live page**, and the form's new intro line was not
      seen either: it is one string in the same stylesheet.
  - **Доставка и връщане moved first, and a Начини на плащане accordion added,
    2026-10-02** (the owner: "move доставка и връщане to be first ... i need there a
    payment info for a second ... the other ones can be how they are"). The order is
    now: Доставка и връщане, Начини на плащане, Качество и детайли, Грижа за бижуто,
    За камъка (still empty, so still hidden) -- the last three keep the relative order
    they already had.
    - **Начини на плащане states the one payment fact already public on the site**:
      „Приемаме наложен платеж — плащате в брой при получаване на пратката.“ Наложен
      платеж is already a hero-facts claim (see Hero facts under Custom code), so this
      restates a fact already live, not a new one. **Card or bank-transfer details are
      not confirmed** -- whether Shopify Payments or any other provider is even turned
      on for this store has not come up -- so none are claimed here, the same
      structure-before-content pattern Доставка и връщане's own missing price and
      warranty already follow. A plain `collapsible_tab`, so it hides itself if its own
      text is ever cleared.
    - **Not touched**: anything in Settings > Payments, and anything about checkout --
      this is static accordion text, the same as every other collapsible_tab on the
      page, not a change to what the store can actually accept.
  - **More room between the options, the made-to-order line and the button, 2026-10-03** (the
    owner, about "the section Home / Moonstone Pearl Ring - Heirloom": "make more space between
    the stones and button and the text above"). **A reading, not a certainty**: nothing on this
    page is "the stones" -- moonmagic's buy box has a "Choose your gemstone" row, ours has none --
    so the size boxes were taken for them, "the button" for Add to cart and "the text above" for
    the made-to-order line.
    - **Measured at 1440 before touching it**: the last row of size boxes 23px above the line,
      the line 34px above the button, the button 25px above the first accordion. Went to **40px
      and 40px** (**superseded the same day: 24px and 25px, see the next entry**), the button's
      25px untouched, at every width. moonmagic's own gaps there are tighter
      than ours were (about 10px each), so this is the owner's taste, not a match.
    - **Where** (the values are now 1.8rem and 2.4rem, see the next entry): `variant-selects`
      takes `margin-bottom: 3.2rem` (the 8px inside the last row of
      boxes brings it to 40) and `.product-delivery-note` `margin-bottom: 4rem`, both in
      `assets/crown.css`. The first sits on the options rather than on the line, so it holds
      with or without a delivery line.
    - **If another gap was meant**, these are the candidates, all left as they were: the size boxes
      themselves (13px between boxes, 15px between rows), the legend above them (17px), and the top
      of the box (16px from the breadcrumb to the stars, 4px from the stars to the title).
    - **Checked live at 1440 and 375, at 40px and 40px (since superseded)**: the made-to-order
      line still one row, the
      page exactly as wide as the screen.
  - **The buy box tightened, the metal box narrowed and the sizes made smaller, 2026-10-03** (the
    owner, the next message: "there is to much space between Изработка по поръчка: Доставка
    5-20 работни дни and the section with the sizes and the button below it, also i think
    material box is to long, and maybe we can make a little bit smaller the sizes and the
    materials also make the price and the descirpion and the title closer and make it a little
    bit color to the material choosing"). **Several readings, none certain**, each one a value
    in `assets/crown.css`:
    - **"Too much space" around the made-to-order line undoes the 40px / 40px above.** The
      owner had asked for more room there that same morning and now found it too much, so both
      gaps are **24px above and 25px below** (they were 23px and 34px before any of this): the
      options carry `margin-bottom: 1.8rem` (plus the 6px inside the last row of boxes), the
      line `2.4rem`. The 24px above is 1px looser than the original 23px, and **the gap below
      is 9px tighter than it ever was**, which the wording does not ask for either way ("the
      section with the sizes *and* the button" names both sides). Both are one number each if
      the owner wants either back.
    - **"Material box is too long" was read as too wide.** The metal drop-down ran the whole
      column, 425px at 1440; it is `max-width: 28rem` (**280px**) and 4.2rem tall now (was
      4.8rem). The open list shares its element's edges, so it is 280px wide as well, with its
      rows 4rem tall (were 4.4rem). **Too tall** is the other reading and would be the
      height alone.
    - **The size boxes and the metal box are both a little smaller.** Size pills: 13px type
      (was 14), padding 1.1rem x 1.8rem (was 1.3rem x 2.4rem), 0.6rem above and below (was
      0.7rem and 0.8rem), so a box is **37px tall (was 42)** and a "56" box about 55px wide
      (was 68). The metal box: 13px type and 0.08rem tracking (were 14px and 0.1rem), the
      colour dot 1.4rem (was 1.6), the padding and gaps down with it. The legends over both
      sit 0.8rem above their boxes (were 1rem).
    - **Title, description and price closer**: title to description **4px** (was 8),
      description to price **8px** (was 14). The order is the owner's own from 2026-10-01
      (the description above the price) and is unchanged.
    - **"A little bit color to the material choosing" was read as "closer"**, because that is
      what the rest of the sentence is about and "color" does not fit it -- a reading, not a
      certainty. The price block to the metal choice is **15px** (was 20), and 15 is the
      floor rather than a pick: the Shop Pay instalments wrapper (`<div><form
      class="installment caption-large">`) sits between the tax line and the options with no
      height and 1.5rem margins, and those margins collapse through, so anything under 15px is
      swallowed. A 12px target measured 15 on the first try. Going lower would mean hiding
      that empty wrapper, which is not worth a rule for 3px.
    - **The whole box is 73px shorter at 1440** (756.2px tall, was 829.2px). Phones use the
      same rules, since the pills and the metal box are the same elements: at 375px the stars
      are at the top of the box as before, title to description 4, description to price 8,
      price block to options 15, options to the line 24, the line to the button 25, the line
      still on one row, and the page exactly 375 wide.
    - **Checked live**: the ring at 1440 and 375 and the bracelet
      at 1440 (the metal box 280 x 42 and the pills 37px tall on both products, 24px and 25px
      around the line). The open list and the pills' rows were measured on a local copy of the
      live page: four 40px rows, nothing overflowing. **Not seen by eye**, beyond what the
      numbers say.
- **Най-продавани sized to moonmagic's own bestseller carousel, 2026-09-26/27**, at the
  owner's request ("make in this section bigger the pictures of the products their text and
  the circles with colors to match moonmagic", then "the pictures should be with the size
  that moonmagic has and the spacing between them should be the same"). Measured their row at
  1440px: **380 x 380 pictures, 30px between them, full-bleed with a 20px side gutter**, card
  title 16px/600, stone line 14px, price 18px, swatches 34 x 34 with a 10px gap, and a
  **SHOP BESTSELLERS button of 486 x 72, 22px, weight 500, 2.2px tracking**.
  - **Title and price already matched.** The vendor line went 12px → 14px (size only, the
    tracking stays ours) and the swatches 16px → 34px with the gap 6px → 10px, both in
    `assets/crown.css` and both card-level, so they apply wherever product cards render.
    Phones keep a smaller 24px swatch -- their cards are half the width, where 34px would eat
    a fifth of the card; moonmagic's own phone swatch has not been measured, so that tier is
    our judgement, not a match.
  - **Two failed attempts at the picture size before the real cause was found.** Moving the
    row from 4 columns to 3 got it from 307px to 351px and no further, and made the whole row
    longer -- which is what the owner objected to ("i said to make the picture boxes bigger
    you make the length bigger"). The column count can never land on a specific width here,
    for two reasons: the row was confined to `page-width`, and Dawn sizes a desktop slider
    item by a peek formula (`(100% - first-item margin) / 3 - spacing * 4`,
    `component-slider.css`), so the width falls out of that formula rather than being
    settable. Fixed by taking the section `full_width` and setting the item width and gap
    directly -- `38rem` wide, `3rem` gap, scoped to this section's own id at 990px up, two
    attribute selectors deep because `component-slider.css` loads from inside the section and
    so lands after `crown.css`. The card carries no horizontal padding, so the card width *is*
    the picture width. Confirmed live: 380 x 380 and 30px, exact on both.
  - **One small difference left on purpose**: the outer gutter is 28px against moonmagic's
    20px (Dawn's own full-width container contributes 13px and its first-item rule 15px).
    Forcing it to 20 means a hardcoded number that would drift with the scrollbar and
    viewport; the spacing the owner actually asked about -- between the cards -- is exact.
  - **Then scaled back down, 2026-09-27, once the exact match was live and read as too
    big.** Pictures 38rem → 34rem, vendor line 1.4rem → 1.3rem, heading 65px → 40px, and
    the swatches cut hard rather than nudged ("not a little bit smaller, make them
    smaller"): 3.4rem → 2rem on a computer, 2.4rem → 1.8rem on a phone, gap 1rem → 0.8rem,
    so they now sit well under moonmagic's own 34px rather than near it. The section's
    measurements are therefore **no longer a moonmagic match** -- they are the owner's own
    sizes, arrived at by stepping back from one.
  - **Вижте всички matched to Разгледайте среброто instead of to moonmagic**, at the
    owner's request ("i want it to be the same size"). Both were already 72px tall at 22px;
    only the width differed, and for a reason worth keeping: the silver banner's button
    declares `min-width: min(48.6rem, 100%)`, and its container clamps that to **375px**,
    while the same formula here would not clamp at all now that this section is full-width.
    So the view-all's own `min-width` is set to that rendered `37.5rem` directly. Confirmed
    live: both 375 x 72.
    - **Out of date as written, found 2026-09-29.** `assets/crown.css` actually carries
      `min-width: 36rem; min-height: 6.8rem; font-size: 1.5rem` and `border-radius: 0` for
      this button -- **360 x 68 at 15px, and square, not a pill**, measured live. Whoever
      changed it did not record it here. **Read the file for this button’s real size, not
      this note**; the stones button was matched to the live values, which is the only
      reason the two agree.
  - **The fourth card was cut, and the cause was structural, not a size to tune** ("the
    forth picture it is cut a little bit, make the whole picture show"). Dawn sizes a
    desktop slider item as a **proportion of its container** (`(100% - first-item margin) /
    N - spacing * …`, `component-slider.css`), so it shows N whole cards and a sliver at
    **every** screen width, however wide -- no amount of resizing could ever stop it
    cutting. moonmagic's own slides are a **fixed width**, so a wider screen simply shows
    more of theirs whole. The owner is the one who spotted the difference ("theirs do not
    cut the forth picture") after a first attempt had assumed their carousel cut its fourth
    card the same way ours did; at 1440 it does, which is why the measurement taken there
    was misleading.
    - **Tried and reverted first**: turning the desktop slider off for a plain four-column
      grid. That did stop the cutting, but threw the carousel away with it, and the owner
      asked for it back ("make the slider like moonmagic").
    - **What stands**: the slider stays on, and `crown.css` pins the item width to an exact
      quarter of the row minus the gaps and the row's own inset -- `calc((100% - 12rem) / 4)`,
      the three 3rem gaps plus 1.5rem either side (see the correction just below). Four whole
      cards at any desktop width, no sliver, arrows still there for when there are more than
      four products.
    - **Superseded 2026-10-02: three whole cards, 392px at 1440** (28% of the row, the gap
      taking what is left, 97px) -- first 436.7px, then a little smaller the same day; see
      Every product picture bigger under Product gallery.
    - **Wrong as first written, corrected 2026-09-28.** It was `calc((100% - 9rem) / 4)` and
      the note here said "checked live at 1440 and 1920: nothing clipped". That check compared
      the fourth card with the viewport, not with the row. The row's first card sits 1.5rem in
      (`component-slider.css`), which `9rem` ignores, so the fourth card ended at 1427.5px
      against a row ending at 1412.5px (`scrollWidth` 1430 against `clientWidth` 1400) and the
      row's overflow clipped 15px of it -- the very thing the owner had asked twice to fix.
      Cards are 320px at 1440 now, not 327.5, with 1.5rem left on both sides. **When checking
      for clipping, compare against the scroll container's own right edge, and compare
      `scrollWidth` with `clientWidth`.**
  - **The section's Heading size setting does nothing, and never did.** Moving it h0 → h1
    changed the markup but not the rendered size, because `crown.css` carries
    `.collection .collection__title .title` with its own `clamp()` -- three classes deep and
    loaded after `base.css`, so it beats Dawn's h0/h1/h2 presets outright for every
    collection section. Found by listing every matched `font-size` rule on the live element
    rather than trusting that the setting had landed. The clamp is what to edit: capped at
    `4rem` now (floor `2.6rem`), down from `6.5rem`/`3.2rem`. It is shared with the
    collection pages, so their titles came down with it.
  - **Heading and Вижте всички moved onto the first picture's left edge, 2026-09-28**, at the
    owner's request ("the title and the buttons have to be in the left of the first picture
    ... they are not position okay"). They sat 35px further in than the picture from 750px up.
    Measured live before touching anything: 62.5px against 27.5px at 1440, 50 against 15 at
    1024, and at 768 the button alone (the heading was already on 15 through Dawn's own tablet
    padding). Under 750px all three were already on 15.
    - **Cause: same box, different inset.** The "Product row: one content column" rule in
      `crown.css` pinned the heading, the slider and the button to one box and gave all three
      `padding-inline: 5rem`. But Dawn's `template-collection.css` zeroes the slider's own
      padding (`.collection slider-component:not(.page-width-desktop)`, one class more
      specific, so it wins), and a full-width row's first card is inset only `1.5rem`
      (`component-slider.css`, `.slider-component-full-width .slider--desktop
      .slider__slide:first-child`). So the picture was on 1.5rem and the words on 5rem.
    - **Fix**: `padding-inline: 1.5rem` on `.collection.collection--full-width >
      .collection__title` and `> .collection__view-all`, from 750px up, right under the rule
      it corrects. Keyed to `.collection--full-width`, which the section adds from the same
      setting that adds `slider-component-full-width`, so the two cannot come apart. Live at
      1440: heading, picture and button all on 27.5px (12.5px page margin + 15px inset);
      267.5 at 1920; 15 at 1200, 1005, 768 and 375.
    - **`.collection` is repeated in the selector on purpose, and the first push lost
      without it.** Dawn's `.collection__title.title-wrapper--self-padded-tablet-down {
      padding: 0 5rem }` (`template-collection.css`, from 990px up) ties on specificity with
      `.collection--full-width > .collection__title` and loads from inside the section, after
      `crown.css`, so it won on order: the button and cards moved and the heading stayed on
      59.6px. The test before that push had injected the rule at the end of the page, which
      hid the loss. Three classes beat it whichever way the files load.
    - **Optical alignment on the heading.** A capital does not fill its box: Jost 700's Н, Р,
      К, Ц and В leave 0.063em before the stem (3px at 46px), so with the box flush the
      *visible* letter still sat 3px in from the picture. `margin-left: -0.063em` on this
      section's heading only puts the letter itself flush (27.6px against 27.5px, measured
      with canvas `actualBoundingBoxLeft`). Б and П leave 0.078em and Д 0.031em, so a title
      starting with another letter is at most a pixel off. A text nudge, not a layout change.
    - **Side effect worth knowing about: the arrows are inactive with four products.** The
      fourth-card fix above means all four fit, so both arrows are disabled -- Dawn's own
      `isSlideVisible` check working as it should. Before, they nudged the row by the clipped
      15px and looked alive. The counter still reads "1 / 2", Dawn counting pages from a
      floored `slidesPerPage`; both settle once there are more than four products.
    - **Not touched**: the arrows' own position (`right: 0` of the row, 15px outside the last
      picture's edge -- not asked about), the tablet and phone card sizes, and anything else
      on the page.
- **Card swatches: picking a colour swaps the card's own photo and price, 2026-09-26, at the
  owner's request** ("go in moonmagic and see how it is done" — their own Best Sellers row, where
  picking a swatch under the card swaps that card's own photograph and price instantly). Checked
  moonmagic live rather than guessing at the mechanism: clicking their own swatch does swap the
  photo and price with no page reload, confirmed by clicking one directly (a gold ring's photo
  and price both changed to the silver variant's). Our own card swatches (added earlier for the
  card, see Waiting on the Shopify admin) were static — real circles, but purely decorative,
  confirmed by reading `snippets/card-product.liquid` before touching it, per "Before you build."
  - **Each swatch is now a real `<button>`** carrying its own variant's price, compare-at price
    and image (a full responsive srcset, not one fixed size) as data attributes — all read
    straight from Shopify's own `option_value.variant`, nothing duplicated by hand. A new
    `<card-swatches>` custom element (`assets/card-swatches.js`, following this theme's existing
    plain-JS component pattern, e.g. `price-per-item.js`) wraps the card's `.card` div (`display:
    contents`, so it adds no layout box of its own) and, on click, swaps the image and re-writes
    the text inside Dawn's own already-rendered `.price__regular`/`.price__sale` markup, toggling
    `price--on-sale`/`price--sold-out` — reusing Dawn's existing sale-badge CSS exactly rather
    than reimplementing it.
  - **A colour with no photo of its own yet leaves the current picture alone**, rather than
    showing a blank slot — checked live: every colour on both Пръстен с верижка and Гривна с
    червен конец currently shares the same one placeholder photo (`hasImage: false` on every
    swatch, read via `dataset`), so nothing visibly swaps yet on either product. The swap
    mechanism itself was confirmed working regardless, by temporarily forcing distinct fake
    image/price data onto a button in the live page and clicking it: the photo, the price text
    and the pressed ring all updated correctly. A real difference will show once photography
    gives each colour its own image.
  - **The card already carries a full-card link overlay** (`.card__heading a::after`, Dawn's own
    "click anywhere on the card" pattern) — a swatch button sitting under it would have its
    clicks silently swallowed by that overlay and navigate to the product page instead. Fixed
    with `position: relative; z-index: 1` on the button, the exact technique Dawn's own
    `.quick-add` (`assets/quick-add.css`) already uses to escape the same overlay — found by
    reading that file rather than guessing at a z-index value.
  - **Loaded once per section, not once per card.** `card-swatches.js` sits next to
    `component-card.css` (the file every section that renders `card-product.liquid` already
    loads once), the same way `quick-add.js` already does — in `featured-collection.liquid`,
    `main-collection-product-grid.liquid`, `related-products.liquid`, `main-search.liquid`,
    `collage.liquid` and the complementary block in `main-product.liquid`. This reaches every
    product listing on the site (collections, the homepage's own product row, search, "you may
    also like"), not just `/collections/all`, matching the owner's own instruction that this
    should apply "for all the products not just for this one."
  - **Found in passing while verifying this live**: Гривна с червен конец now has its own Color
    option live too (Rose gold, Gold, Silver, White) — it did not the last time this file was
    checked; the owner must have finished saving it since. Обеци and Висулка плочка still have
    none; see Gold-colour swatches under Waiting on the Shopify admin.
  - **Moved to sit right under the card's title, 2026-09-26, at the owner's request** ("under
    the title... before you open them"), instead of after the vendor line and the
    `custom.detail` line.
  - **A hover/keyboard-focus preview was added, then removed the same day.** First added at
    the owner's own explicit instruction ("when you put your cursor on them the color should
    change again"). Once live, the owner reported it reverting before a shopper could actually
    look at the new photo -- the revert was bound to leaving the tiny swatch itself, so moving
    the cursor up to the picture triggered it. Fixed once (bound the revert to leaving the
    whole card instead, so the preview held while the cursor moved onto the picture) -- but the
    owner then asked for hover to do nothing at all, matching moonmagic exactly: checked
    moonmagic's own rings collection page directly with a **real** click and a real hover
    (a synthetic `dispatchEvent` can't trigger genuine `:hover` matching, which is why an
    earlier check of this looked inconclusive) -- their swatches never respond to hover, only
    to a click, which then swaps the photo and price and stays that way. `card-swatches.js` is
    back to a plain click handler; nothing happens on hover or focus any more.
  - **A real, pre-existing bug surfaced once swatches moved somewhere this visible: they were
    never actually rendering at their intended size anywhere except `/collections/all`.**
    Found live on the homepage's own product row (Най-продавани): the swatch buttons and their
    data were all correct, but every swatch measured 0×0 in the DOM. `component-swatch.css` --
    the stylesheet that gives `.swatch` its `display: block` sizing -- is only ever loaded by
    `main-product.liquid`, `featured-product.liquid` and `facets.liquid` (the collection
    filter sidebar). `/collections/all` only ever looked right by accident, because its own
    template has `enable_filtering: true`, so `facets.liquid` happens to pull that stylesheet
    in as a side effect, unrelated to the card swatches themselves. The homepage row,
    related-products, search results and collage never had a reason to load it, so their
    swatches have never actually been visible since the card-swatch feature was first built --
    not something this session broke, just never caught until swatches sat somewhere this
    visible. Fixed by loading `component-swatch.css` directly in every section that can render
    `card-product.liquid`'s swatches (next to `card-swatches.js`), so the feature no longer
    depends on an unrelated section loading it first.
  - **Which variant a circle stands for, 2026-10-03** (the owner: "the colors that are on the
    products under the title the rose gold color and the silver don't change to the color i put
    fix that so they can work like the others"). Read off the live page, the ring's circles were
    wired like this: yellow gold to the yellow photograph, white gold to the white one, **rose
    gold to the yellow photograph** and **silver to nothing**. Clicking rose "changed" the picture
    to the one already showing, silver did nothing, and both yellow and rose looked selected at
    load.
    - **Cause.** `value.variant`, the variant Shopify hands a swatch, is the first variant that
      carries the colour **with the first value of every other option**. The ring has three
      options -- size, colour, metal -- so rose got "54 55 / розово злато / 14К жълто злато",
      which carries the yellow-gold photograph, and silver got "54 55 / Сребро / 14К жълто
      злато", which carries none. The photographs sit on the variants where **the metal names
      the same gold** (the ones a shopper lands on by choosing a metal), not on these.
    - **Fix, `snippets/card-product.liquid`.** A circle takes the variant where **another
      option's value contains the colour's name** (`розово злато` inside `14К розово злато`,
      `Сребро` inside `925 сребро`, case-insensitive) -- the pairing
      `snippets/product-variant-picker.liquid` already uses to hide the colour row. Its photograph
      comes, in order, from: that variant; the first such variant of another size that has one;
      failing both, the photograph **every** variant of that metal shares, when they all agree on
      one. Price, availability and the variant id follow the paired variant. A product with no such
      second option (a colour alone, or a colour and a size) gets `value.variant` exactly as before.
      Only one circle can start pressed.
    - **Silver shows the white-metal photograph, and that is a fallback, not data.** No variant
      that says "Сребро" has a picture. The two that say "925 сребро" (with the yellow and the
      white colour, first size) both carry the white-metal render, so that is what silver shows.
      The first rule wins the moment a picture is linked to "54 55 / Сребро / 925 сребро".
    - **Tested offline first, on the owner's own data**: the live product JSON of the ring and
      the bracelet fed to the real snippet through liquidjs (the harness is in the scratchpad,
      not committed). The old snippet reproduced the live cards -- the four variant ids identical
      to the live page, rose on the yellow photograph, silver on none, yellow and rose both pressed
      -- so the mock models Shopify's choice. The new one gives yellow, white and rose their own
      photographs and silver the white-metal one; 13 checks, including a colour alone, a colour and
      a size, donors that disagree, and a pair that has its photograph only on another size. Then
      live: the homepage, the collection page and a product's related row print the same four
      circles, and a real click on each, on the homepage, swaps the card's photograph to the right
      one and presses only that circle.
    - **The product page has the same gap, and it is data, not theme.** A shopper who picks rose
      gold, white gold or silver there lands on the exact paired variant, and **only the first size
      (54 55) has a photograph on its rose and white pairs, and no silver variant has one**. Real
      clicks confirmed it: "56 / розово злато / 14К розово злато", "56 / бяло злато / 14К бяло
      злато" and "56 / Сребро / 925 сребро" carry no photograph, so choosing them at sizes 56-60
      leaves the gallery on whatever it showed. The owner put the photographs on the variants
      with the first metal (`14К жълто злато`), from when colour alone drove them. The fix is in
      the Admin (link each photograph to its paired variants, all seven sizes), or a theme
      fallback if the owner would rather not: **not built, not asked.**
    - **The bracelet's circles do nothing, and should not**: eight variants, one photograph, none
      of them assigned.
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
    - **The two full-width lines above and below the columns are gone, 2026-09-30**, at
      the owner's request -- `border-top` and `border-bottom` off
      `.footer__blocks-wrapper`; its 3.2rem padding stays, so the air is there without a
      drawn line. The column headings and links went 1rem to 1.2rem the same round, and
      the Facebook/Instagram icons under the newsletter box moved to the **left** of their
      own line (`justify-content: flex-start`, reversing the right-alignment set earlier).
      „Свържете се с нас“ and the address keep their 0.9rem, named as unchanged.
    - **The hairline under the newsletter box removed, same round, at the owner's request**
      ("remove the line under the email" -- the email prints inside that same block now, see
      above). `.footer-block--subscribe`'s own `border-bottom` (added originally to replace
      the dead `:first-child` selector) is gone; its `padding-bottom` stays, so there is still
      air before Нека ви помогнем, just no drawn line there any more.
  - **All footer text is pure black, and the phone icons are centred, 2026-10-01** ("the
    footer needs the text to be all in black also for a phone i want the instagram and the
    facebook icons to be centered not aligned in the left"). Measured first rather than
    assumed: the headings and links were the scheme's near-black `#221F1C`, and four groups
    were 75% of it, which reads as grey -- the label above the email, the Email field label,
    the phone accordion titles, and the whole bottom row (copyright, Powered by Shopify,
    Privacy policy, Cookie preferences). One rule in `assets/crown.css`, right after the
    link-column rules, sets them all to `rgb(0 0 0)`: the fifth named exception to "no pure
    black", after the newsletter band, the dark buttons, the homepage social heading and the
    stones row.
    - **Three classes deep, with `:hover` variants.** Dawn's own colours for these sit in
      `section-footer.css`, which loads from inside the section and so after `crown.css`;
      its `.footer-block__details-content .list-menu__item--link:hover` ties a plain
      three-class rule on specificity and would have turned a hovered link back to
      near-black.
    - **Left alone on purpose**: the blue and magenta Facebook/Instagram button labels (asked
      for on 2026-09-20; they still print in the footer on collection, About and every page
      but the homepage and products), the icons, every hairline, and the black newsletter
      band above the footer, which is a separate section. The Контакти social heading and
      line are in the rule: they had been the scheme's near-black and 68% of it.
    - **The icons under the newsletter box are centred on a phone**
      (`justify-content: center` inside `max-width: 749px`); a computer keeps them at the
      left of their line. Measured at 375: 98px either side of the pair. The comment above
      that rule still said right-aligned, true until 2026-09-30, and now says what holds.
    - **Checked live**: 28 visible text nodes in the footer at 1440 and again at 375 (the
      phone accordions opened first so their links were measured too), every one
      `rgb(0, 0, 0)` except the two brand-coloured button labels; 28 of 28 on Контакти.
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
  - **Homepage only.** `sections/footer.liquid` does not print its own copy of this block
    on the homepage (`template.name == 'index'`), which carries this section instead.
    **Out of date as first written here**: this note said only `template.suffix == 'contact'`
    still printed the footer's copy. Since 2026-09-25 the footer prints it on every page but
    the homepage, and since 2026-10-01 product pages are skipped too (see Social band below).
    Контакти keeps its own heading, text and background picture, first in the footer under
    Телефон.
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

- **Social band.** `sections/social-band.liquid` with `assets/section-social-band.css`
  (2026-10-01, at the owner's request: "when we open a product Вижте работата ни section is
  there but i don't want it like that, it can stay like this just for the homepage ... for
  the products i want it like section See It Styled On Instagram but just the buttons and
  the text i don't want the pictures down").
  - **What printed it on product pages was the footer, not the product template.**
    `sections/footer.liquid` has printed its copy of the block on every page except the
    homepage since 2026-09-25, so a product page ended with the same blue and magenta pill
    buttons on the plain ground that every collection and About page ends with. (The
    "Homepage only" note under Social follow section said otherwise for a week; corrected
    in place.)
  - **Their section, measured on a Harlow ring page at 1440 and 375.** A full-width ground
    `rgb(243, 243, 243)` with 80px of padding (30px on a phone); a heading 55px, regular,
    centred (35px and left-aligned on a phone); a 22px line under it (14px on a phone);
    then two **solid black square buttons with the icon beside the label**, LIKE US and
    FOLLOW US, about 23px apart, side by side on a phone too (158px each, 20px apart, where
    their labels wrap to two lines -- ours deliberately do not). Under that comes the picture
    row, which is what the owner does not want. **Their hover drops the fill to a
    transparent button with a black label and a black 1px outline** -- confirmed with a real
    hover -- which is exactly what every button on this site already does, so nothing was
    invented for it.
  - **Its own section, not a variant of the homepage one.** The footer's markup and classes
    carry the pill shape and the brand colours the owner asked for on the homepage block, and
    this band wants neither, so reusing them meant overriding most of what they say. The
    homepage keeps `social-follow` untouched ("it can stay like this just for the
    homepage"). The new section takes its own settings (colour scheme, heading, line,
    padding) and renders the `social-icons` snippet under its own class, so the two links
    still come from the one pair of theme settings.
  - **Sizes are the homepage block's, not moonmagic's.** Their button read 300 x 81 with a
    22px label in one measurement and 300 x 52 with a 16px label in another, minutes apart in
    the same pane, so no size was copied from it. The owner tuned the homepage block over
    several rounds and asked for it smaller than moonmagic's more than once, so the heading
    is 3.2rem (2.4rem on a phone), the line 1.6rem / 1.4rem, the buttons 30rem x 6.8rem on a
    computer and up to 17rem x 6.2rem side by side on a phone (26rem and 16.2rem x 5.8rem
    until the owner asked for them stretched, 2026-10-01). What changes is the ground, the
    colour and the shape:
    - **Ground scheme-2, soft stone `#F2F0EC`** -- their grey is 243 against its 242, and it
      is the token this theme already uses for alternating bands. 72px of padding, 54px on a
      phone.
    - **Black from the scheme, not a typed hex** (`--color-button` / `--color-button-text`),
      the same approach as Add to cart, so it follows the scheme if that is ever changed.
    - **Square corners are the fifth scoped exception to the site-wide pill**, after the
      hero, the silver banner, new arrivals and Add to cart.
    - **Hover, tap and focus** are the fill dropping to an outline plus the site's usual
      `translateY(-0.25rem)` lift. **It first waited for a real pointer** (`@media (hover:
      hover)`) so a tap would not leave a button stuck outlined when the visitor comes back
      from Instagram, and the owner found the effect dead on a phone ("black thing becomes
      white like our others button is not working", 2026-10-01). The other buttons on the
      site do not wait, so this one stopped waiting: `:hover`, `:active` and
      `:focus-visible` are listed together, and a tap reports :hover. The stuck-outlined
      risk that made it wait is the same one every other button here already carries.
    - **Heading and line are pure black**, the same named exception the homepage block has.
  - **The words, 2026-10-01.** They were the homepage block's own („Вижте работата ни“ and the
    Instagram line) until the owner asked for text "like something similar or the same" as
    moonmagic's and left the choice to us ("you can write something like over 2000 people in
    social media"). Now **„Вижте го в Instagram“**, after their "See It Styled On Instagram"
    -- "see it on Instagram", not "see it worn", since the feed has no customer pictures of
    worn pieces and the heading should not promise them -- and **„Над 2000 души ни следват в
    социалните мрежи.“**, after their "Over 1.9 million followers on social media can't be
    wrong", calmer on purpose: no "can't be wrong", nothing sold hard. **The 2000 is the
    owner's own figure, not one we counted**, so the line is a setting to keep honest as the
    number grows. Both are settings on the section, and its schema defaults. **The heading
    changed again the same day**, to „Присъединете се към нас“ -- see More space above the buttons, below.
  - **It sits last on the product page, where the footer's copy used to print**, in
    `templates/product.json` after the questions. moonmagic puts theirs between the product
    and its recommendations (see Product page under Custom code); not moved, because the
    owner asked for a different look, not a different position. It is an ordinary section,
    so it can be dragged in the theme editor.
  - **The footer skips it on product pages**: `unless template.name == 'index' or
    template.name == 'product'`, so a product page never shows both.
  - **Pushed in two steps** per the validator lag -- the section, its stylesheet and the
    footer text change first, then the template and the footer condition two and a half
    minutes later. Both landed within ten seconds: no lag and no dropped push this time.
  - **Narrow phones, 2026-10-01.** Two fixed 16.2rem buttons need about 336px and the page
    leaves `100vw - 3rem`, so a 360px phone left them 6px apart and a 320px phone would
    have overflowed. Each button was `min(16.2rem, 50vw - 2.3rem)` then (162px at 375px,
    157px at 360px); today's numbers are under the stretch below. Under 360px the pair stacks
    at full width (290px at 320px) instead of overflowing. Checked live at 375, 360 and 320
    with no horizontal overflow and every label inside its button. **The homepage block has
    the same two-fixed-buttons layout, and by the same arithmetic it overflowed at 320px --
    confirmed by the sweep below, and fixed the same day once the owner had said to go ahead
    with whatever else was worth doing (see Narrow phones, sweep).**
  - **Narrow phones, sweep, 2026-10-01** (the owner, after reviews were done: "okay do the
    things you want to do"). Nothing else was waiting on the owner, so the work went into a
    regression sweep of everything shipped that day: the homepage, a product, the
    collection, За нас and Контакти, at 320, 360, 375, 768 and 1440px, looking for sideways
    scroll, plus the console on the product page.
    - **Only one thing failed: the homepage at 320px**, where the layout stretched to 354px.
      Two causes, both the arithmetic of fixed widths against a 288-290px column: the **hero
      facts strip** (four claims at a fixed 9px need about 290px even fully wrapped) and the
      **homepage Facebook/Instagram block** (two fixed 16.2rem buttons need 324px).
    - **Fixed for widths under 360px only.** The facts strip may take a second line, two
      claims a line, centred (`section-hero-facts.css`). The social block's buttons are
      `min(16.2rem, 50vw - 2.3rem)` and stack at full width under 360px (`crown.css`, beside
      the block's own phone rules). Measured after: 320px is exactly 320 wide, the facts in
      two rows and the buttons 290 x 58 stacked; 360px is unchanged except the buttons are
      157px with 16px between; 375px is untouched (162px buttons at 15 and 198, the facts in
      one row).
    - **A trap in the measuring, worth keeping.** The pane's mobile profile does not clip
      an overflowing page: it widens the layout viewport to fit, so `innerWidth` read 354
      and a check of "anything past `innerWidth`" found nothing wrong. Compare
      `scrollWidth` with the width that was **requested**, not with `innerWidth`.
    - **Clean everywhere else**: 360px on all five pages, 768px on all five, 1440px on the
      homepage, product and collection. The console shows only Shopify's own noise on a
      private preview (the privacy banner and account menu scripts failing to reach their
      server, and the 400s and 404s that go with them); a search of it for Judge.me, our
      stylesheet and scripts, and for uncaught errors came back empty.
  - **Stretched, reworded, and the tap effect, 2026-10-01** ("i want the text to be like
    something similar or the same ... also the buttons they you can strech them a little bit
    and the efect on a phone where black thing becomes white like our others button is not
    working").
    - **Buttons stretched**: 26rem to **30rem** on a computer, which is moonmagic's own 300px
      for these two buttons, height unchanged at 6.8rem. On a phone two buttons side by side
      leave only a few pixels to give, so it is `min(17rem, 50vw - 2.1rem)` wide and 6.2rem
      tall -- **167 x 62 at 375px with 12px between** (was 162 x 58 and 21px), most of the
      stretch going into the height. 159px wide at 360px; under 360px they stack as before.
    - **The tap effect** is under Hover, tap and focus above. Checked on the pane's touch
      profile (`maxTouchPoints: 5`, `(hover: hover)` false): a real hover on Харесайте ни
      gives a transparent fill, a black label, the 1px outline and `translateY(-2.5px)`,
      and the neighbouring button stays solid.
    - **Checked live**: at 1440 the band is 316 tall, the heading and the line each on one
      line, the buttons 300 x 68 and 20px apart; at 375 the buttons are 167 x 62, 12px apart,
      both labels inside their boxes, no horizontal overflow.
  - **More space above the buttons, and a heading that names no platform, 2026-10-01** ("make
    a little bit more space between the text and the button and also i don't want to say to
    see it in instagra and facebook something different even if you have to change the text
    just the first one the second is good").
    - **The gap** between the words and the buttons is 4.8rem on a computer and 3.6rem on a
      phone (was 3.2rem / 2.4rem). moonmagic leaves about 60px and 50px there, so this is a
      step toward theirs rather than all the way, which is what "a little bit" asked for.
      **"The text and the button" was read as this band**, the section the rest of the
      sentence is about; the delivery line above Add to cart is the other candidate.
    - **The heading is „Присъединете се към нас“**, replacing „Вижте го в Instagram“: the band
      carries a Facebook button as well, so a heading about one platform was wrong for it.
      It names neither; it is an invitation that the line under it, unchanged, answers
      with the follower count. **A no-break space joins „Присъединете“ and „се“**, so a phone
      that wraps the heading keeps the reflexive particle with its verb instead of
      starting the second line with it; the schema default writes it as `\u00a0` so it
      stays visible in the source.
    - **Checked live**: at 1440 the heading is one line (518px), 48px from the line to the
      buttons, the band 332 tall. At 375 the heading breaks „Присъединете се“ / „към нас“,
      36px from the line to the buttons, the band 295 tall, no horizontal overflow.
  - **Checked live.** All four test products show the band once and the footer's copy not at
    all; the homepage, collection, About and Контакти pages are unchanged (the footer's copy
    once each, the homepage its own section once). At 1440 the band is 1425 x 340 on
    `rgb(242, 240, 236)`, heading 32px on one line, the line on two, buttons 260 x 68 black
    with a 0px radius, the pair centred and 20px apart. At 375 it is 270 tall, heading 24px,
    buttons 162 x 58 at the two ends of the row (left edges 15px and 198px), both labels
    fitting with room to spare (93px and 115px of text in 162px boxes), and no
    horizontal overflow. A real hover on Харесайте ни gives a transparent fill, a black
    label, the 1px outline and `translateY(-2.5px)` with the icon unscaled.

- **Reviews section.** `sections/review-cards.liquid` with `assets/section-review-cards.css`,
  `assets/review-cards.js` and `snippets/review-stars.liquid` (2026-10-03, the owner: "add reveiew
  on the home page something like moonmagic and hestai home do ours better and different maybe i
  don't make it look ours and good"). On the homepage between the story section and „Вижте
  работата ни“, a page-ground band with greige cards.
  - **moonmagic's, measured at 1440** ("Trusted by 600K+ customers", `.homepage-reviews`, 810px):
    a 65px capital heading at the left gutter with prev and next arrows (27px) on its row, then a
    Swiper of cards 350px wide and 18px apart, each a **350px customer photo** over a greige panel
    (`rgb(245, 244, 240)`, the same #F5F4F0 as scheme-6; padding 28px 23px) holding five stars
    (14px, `rgb(230, 186, 185)` -- our #E6BAB9), the quote at 18px on a 30.6px line, and the name
    with "Verified Buyer" and a tick.
  - **hestiahome.bg's, measured**: a cream band (`rgb(250, 246, 239)`, 60px padding) with an
    eyebrow „Отзиви“, a 37px heading „949+ доволни клиенти“, a rating line (amber stars, „4,8 · 949
    отзива“), a link to every review and a row of four trust items, then white cards 427 x 308 with
    a 12px radius and 35px of padding: stars, a 19.8px quote, an initial in a pink circle, the name
    and „проверена покупка“ with a green tick; arrows under the rail.
  - **What is ours.** moonmagic's row and greige card, in this site's own measures: the heading is
    the one every homepage row has (26 to 40px, capitals) with an eyebrow in the small spaced
    capitals the atelier uses; square corners; pink stars drawn as one inline SVG (the character
    does not exist in Jost, so a fallback font would size it differently on every device), the ones
    not earned left as an outline; the quote at 18px (16px on a phone) in „ “; the name in small
    capitals with a line under it; **and, what neither of them has, the piece the review is about**,
    as its own picture and name under the hairline, linked -- so a visitor reading what others
    say can walk straight to the thing to buy, which is what the owner said the whole site is for
    in the same message ("they just need to get into the things to buy"). 3 whole cards across from 990px (417px at 1440, 24px apart, against their 350 and
    427), 2 from 750px, one with a peek of the next on a phone; the row scrolls by one card
    (441px at 1440) and the arrows -- Dawn's own `.slider-button`, like every other row -- exist
    only when the cards do not all fit. A photo of the customer is optional: square above the
    card when given, absent otherwise, since most reviews have none. No "verified" mark: this
    shop cannot say a manually entered review is verified, so it does not.
  - **NO REVIEW IS INVENTED, and the section cannot show a made-up one.** Every card is a block
    the owner fills with a customer's own words (stars, review, name, an optional line, an
    optional piece, an optional photo); the shop has none yet, and the project's rule since the
    Judge.me install stands: none to fill the space. A block with **no review text** prints
    nothing on a published theme, and **the whole section prints nothing until at least one block
    has text**, so it can sit in the template, finished, before there is anything to put in it. In
    the theme editor (`request.design_mode`) and on an unpublished theme (`theme.role` is `main`
    only for the published one -- the draft preview is `unpublished`) a block with no text shows as
    a **labelled sample card** instead (muted placeholder words and a „Пример“ tag), so the design
    can be seen and judged; publishing the theme removes every sample by itself. The template
    ships three empty blocks. The rating line under the heading is a setting, empty by default,
    because a figure like „5,0 · над 100 отзива“ must be one the owner can stand behind: it is not
    counted from the cards.
  - **To fill it**: Customize → Home page → Reviews → each Review block: the stars, the customer's
    words as she wrote them, her name, optionally her town or when she bought, the piece (a product
    picker) and a photo she sent. Real reviews have to come from somewhere real -- the old shop's
    customers, messages, Facebook or Instagram with her permission, or Judge.me once the shop sells.
    **Judge.me** (installed 2026-10-01) draws the product page's reviews and writes nothing the
    theme can read for a homepage row; it has carousel widgets of its own, and **whether the free
    plan includes them was not checked** (the owner has declined the paid one). If the owner ever
    wants reviews to flow in on their own, that is the route, and it would replace the hand-filled
    blocks.
  - **Tested offline**, 19 render checks (liquidjs, mock blocks, kept in the scratchpad): three blank
    blocks on a published theme print nothing and no note; two real and one blank print two cards;
    on a draft theme and in the editor blank blocks are labelled samples and the editor with no
    blocks shows only a note; the quote is escaped and keeps its line breaks; a four-star review
    has four filled stars; the piece is a link with its picture and name, and a piece with no
    picture gets the flat square; her photo comes above the body; a card with no name, line or
    piece has no foot; no rating line without text; the arrows exist in the markup, hidden. Schema
    validated (ranges on their step, defaults inside them). In a local copy of the homepage with the
    real stylesheets, at 1440 and 375: three 417px cards 24px apart with the pink fill on the stars,
    heading 40px / 26px, equal card heights with the names on one line, the arrows hidden for
    three cards and shown for four, **a step of exactly 441px** (a card and its gap), the previous
    button disabled at the start and the next at the end, a disabled button doing nothing, a phone
    card 298px with the next one peeking, no sideways scroll. The screenshot caught what the numbers
    did not: **Dawn styles every `blockquote`** with italics, a muted colour and a rule down the
    left (`base.css`), so a first version of the card carried a stray vertical line beside every
    quote -- reset in the card's own rule.
  - **Not seen on a live page**: the preview link expired mid-session (see Preview links expire),
    so the template that adds the section was pushed without a page to look at -- at 19:51, fourteen
    minutes after the section files, to give Shopify's validator time. The section's files were
    confirmed live by their assets (`review-cards.js` and `section-review-cards.css` answered 200
    within seconds of the push, `section-atelier.css?v=` carried the list layout). **A template
    cannot be checked that way**: if the homepage still shows three story bands and no reviews row on
    a new preview link, the template was refused or dropped, and re-sending it with one byte changed
    is the first thing to try (see Wait for one push to reach the preview before sending the next).
- **Custom request section.** `sections/custom-request.liquid` with `assets/section-custom-request.css`
  (2026-10-04, the owner's "go" on the honest-opinion round). On the homepage between the story band and
  the reviews row: „Не виждате своето? Ще го направим.“, two sentences and a short form.
  - **Why it exists.** About fifty pieces will be online and the atelier has made far more since 1991, so the
    one thing a catalogue-only brand cannot offer is "tell us what you are looking for". **It has no twin on
    moonmagic's homepage**: their nearest block, "Made for you", is an image-with-text section (read off their
    section list on 2026-10-04). So it is built only from the site's own parts -- the atelier's eyebrow, the
    heading size of every other homepage band (26 to 40px, capitals), Dawn's field styles and the Контакти
    form's button measures -- and it is the first step away from the twin homepage (see How we work).
  - **The words**, defaults in the schema: eyebrow „Изработка по поръчка“, heading „Не виждате своето? Ще го
    направим.“, text „Тук показваме само малка част от моделите на ателието. Кажете ни какво търсите — друг
    камък, друг метал, друг размер или бижу, което сте виждали — и ще ви отговорим.“, button „Изпратете
    запитване“, thank-you „Благодарим ви. Ще ви отговорим възможно най-скоро.“. **Every claim is one the site
    already makes**: the atelier has worked since 1991, and "a piece shown here can be made with another stone"
    is the old site's own sentence on nearly every product. **No number of designs is printed**: "about 4,000"
    is the owner's figure in the brief at the top of this file, but the old site lists 2,038 products, so the
    text is a setting for the owner to add a figure once it is one to stand behind. **The heading promises "we
    will make it"**, the wording the owner agreed to when saying go; the text under it promises only an answer.
    If some requests cannot be made, „Ще опитаме“ or „Ще ви кажем дали можем“ is the softer heading.
  - **The form is Shopify's own contact form**, so a message reaches the store's email exactly as the
    Контакти form's does and there is no new backend. **Shopify's contact form cannot carry an attachment**,
    so a picture goes by email, Instagram or Facebook: a line under the words with up to three links, each
    printed only when it is set (the email is a section setting defaulting to the footer's address; the two
    social links come from Theme settings > Social media). Fields: name, email (required), phone (optional) and
    „Какво търсите?“ (required), with Shopify's **standard keys** (`contact[name]`, `contact[email]`,
    `contact[phone]`, `contact[body]`) so a refused form keeps what was typed. The Контакти form uses Bulgarian
    custom keys instead (chosen so the notification email reads in Bulgarian) and keeps only the email on a
    refusal. Two hidden custom fields tell the owner which form it was: `contact[Тема]` = „Изработка по
    поръчка“ and, on a product page only, `contact[Бижу]` = the piece's title and address. A refused form
    shows the Контакти form's own sentence („Моля, въведете валиден имейл адрес.“); a sent one replaces the
    fields with the thank-you, in a `role="status"` paragraph that takes focus.
  - **The privacy link** (`shop.privacy_policy`) prints only when the shop has a privacy policy page, so it
    can never point nowhere, and it says nothing about the data: no legal text was written (Working
    agreements). **Budget, deadline and an upload field were left out on purpose**: each is friction on a
    first message, and the upload cannot work (above).
  - **Where and what colour**: key `custom_request`, directly after `atelier` and before `review_cards`;
    scheme-2 (soft stone), 64px of padding and no margin. The story band's own 40px bottom margin is the gap
    above it, which matters: stone and greige are three levels apart, so without that strip the two would
    read as one band. **It is reusable**: dragged onto a product page it adds the piece's name to the message,
    which is the "Въпрос за това бижу?" idea; onto a collection page or Контакти it just asks. **Not tried: a
    page holding two contact forms** (Контакти's own and this one), where Shopify may show one form's
    thank-you in both.
  - **Layout.** From 990px the words (5fr) and the form (6fr) sit side by side, 8rem apart, vertically centred;
    below that, one column with the form capped at 64rem; the two top fields side by side from 750px. The
    button takes the scheme's own button colour (black on scheme-2), a pill from the shared setting, 6.4rem and
    14px capitals on a computer, 5.4rem and 12px at full width on a phone, dropping to an outline on hover, tap
    and focus with the site's lift. It is not Dawn's `.button`, whose own size (5.5rem / 2.2rem) is far too big
    for a form.
  - **Tested without a preview link.** The real Liquid rendered by liquidjs in every state that matters
    (default, thanked, refused, on a product page, each optional piece off, a heading with markup in it; 27
    checks, including the schema's steps and that every setting the markup reads exists), and a local copy of
    the homepage at 1440, 1100 and 375px. At 1440 the band is 1425 x 499, the words start at x 63 (the logo's
    own left edge), the heading is 40px / 550, the fields 325 x 47 and 665 x 47 (the message 665 x 102) and the
    button 300 x 64. At 375 the page is exactly 375 wide, the button 345 x 54 and the form 345 wide. The
    stylesheet answered 200 on the store's CDN path eight seconds after its push.
  - **Pushed in two steps**: the section and its stylesheet at 01:16 (`8426698`), `templates/index.json` and
    these notes at about 01:29, 13 minutes later (the validator lag, see Design tokens).
    **Not seen on a real page, and the form has never sent a message**: the preview link had expired. On the
    next link, look at the homepage (the band between the story and the reviews) and **send one test message
    from it and check the store's inbox** -- the Контакти form has never had one either. If the band is
    missing, `templates/index.json` was refused or dropped: re-send it with one byte changed.
- **Identity directions board.** An Artifact, not a theme file: https://claude.ai/artifact/8AYRdcfQui3Er5yRcVZpBD
  (2026-10-04, private). It exists so the owner can choose by looking rather than imagining: today's homepage
  and three directions, each a colour system plus a heading face, drawn on a miniature of the real homepage
  (eight of the thirteen sections, the Custom request band included) with the owner's own test pieces, their
  logo and the site's real Bulgarian words. Switches: look, heading font (the look's own or Jost), case (the
  look's own, capitals or sentence case), the rope line, computer or phone. A "your pick" line states the
  choice in words to paste into chat. **The source** is `board-src.html` and `build.mjs` in the session
  scratchpad, not in the repository; the published page is the record.
  - **The three directions.** All keep the logo, the structure and Jost 400 for body text. **A · Диамант**:
    cold and clear, from the colourless Cullinan; page `#F8F9FA`, band `#EDF0F3`, ink `#1B2129`, buttons navy
    `#1B2A3B`, stars champagne `#B08D57`; Forum 400 in capitals. **B · Изумруд**: a jeweller's-box green; page
    `#F7F8F4`, band `#E7EDE4`, ink `#17231D`, buttons emerald `#1F4D3A`, a deep emerald banner (`#1F4D3A` to
    `#173B2C`), stars antique gold `#B0914F`; Cormorant Garamond 600 in sentence case at 1.2 times the size (its
    x-height is small). **C · Мрамор**: marble and rose gold; page `#FBF8F6`, band `#F3EBE6`, ink `#2A1E1A`,
    buttons rosewood `#6E3B30`, stars the owner's own rose-gold swatch `#B76E79`; Prata 400 in sentence case.
    **Every pairing in all three is 8.5:1 or better** (computed from the tokens whenever the board is built).
    Today's hero button, white on `#E63946`, is **4.2:1**, which passes only as large text.
  - **What the board found, worth keeping whichever look is chosen.** **The logo** (`cullinan-logo-900.png`,
    900 x 237, transparent) is a heavy black retro brush script, and it is the most ownable thing on the site.
    It cannot be recoloured, so the header stays on a light ground in every look; on a coloured box it goes
    white with `filter: invert(1)`. **A rope motif** runs through the owner's own pieces -- the ring's twisted
    band and the pendant's rope frame -- and the board draws it as a thin line between bands (a two-strand wave
    as a CSS mask in the accent colour). It is a proposal, not built. **The earrings carry a green stone**,
    which is part of why B is not arbitrary. **The product pictures**: the yellow-gold ring render
    (`2_4_3375.png`) looks like it comes from the owner's own 3D model; the rose and white variants are
    ChatGPT's (their file names say so); the ring's second picture (`40B9DBF8...jpg`) has the logo and a slogan
    burned in, which the first rule here forbids. **All of them are opaque with white backgrounds**, so a tinted
    band shows their edges; real photographs will not.
  - **The recommendation on the board is B, Cormorant, sentence case, rope on**: the furthest from moonmagic,
    grown from colours the owner chose (the matcha and the moss green) and from the stone in the earrings, and
    gold glows against deep green. A suits white gold and silver; C is the smallest step and still reads close
    to pink. **The hero button** is red today at the owner's explicit instruction; each look gives it its own
    colour on the board, and the red can stay.
  - **Applying a look** is one pass: the eight colour schemes in `config/settings_data.json`, the colour
    literals in `assets/crown.css` (the blush gradient, the greige, the pink stars, the taupe and brown
    buttons), the heading face in `snippets/theme-fonts.liquid` with its Cyrillic woff2 files self-hosted in
    `assets/` (see Type under Design tokens), and the Design System. **Nothing has been applied; the owner has
    not chosen.**
- **Customer reviews (Judge.me).** The owner installed Judge.me on its free plan and added its
  Review Widget on 2026-10-01 ("i did what you said"), by the steps given under Judge.me in
  Waiting on the Shopify admin. Shopify wrote three commits back; pulled before touching
  anything.
  - **What Shopify wrote**: in `config/settings_data.json` two app embeds, both on -- Judge.me
    Reviews and **Reviews in Cart Drawer** (the second was never asked for; harmless while
    there are no reviews, and the owner was told they could switch it off). In
    `templates/product.json` a new `apps` section with the `review_widget` block, **placed
    right after `main`**, so the reviews sit directly under the product and above Може да ви
    хареса -- moonmagic's order is product, Shop The Look, Customer Reviews, Instagram, You
    May Also Like. Shopify also normalised a lot of the template: every setting the
    sections carry but the file had left to defaults is written out now (`page: ""`,
    `only_for: ""`, `anchor: ""` and so on). Harmless, and it is why that diff is long. **The
    block's own `review_data: sample_data` is editor-only**: Judge.me's help says sample
    reviews appear in the theme editor and never on the live store, and the preview page
    showed the real empty state, not sample reviews.
  - **What a visitor sees today**: nothing but an invitation -- Judge.me's own Bulgarian,
    "Отзиви от клиенти", "Бъдете първият, който ще напише отзив", a button. There are no
    reviews, and none are to be invented. The review form works end to end and is in
    Bulgarian too (checked live by opening it, picking a star, and closing it unsent).
  - **Styled in `assets/crown.css`, at the end, in the theme alone** -- so none of it needs
    Judge.me's paid plan (its corner and layout options are paid; its five colour settings
    are free but are one more Admin job): the title centred, 24px bold, in the questions'
    own voice; the button black, square, small capitals, 4.8rem, emptying to an outline on
    hover and tap like every other button; the stars our pink `#E6BAB9` (muted gold `#8C6A2E`,
    scheme-4's, until 2026-10-01 -- see Pink stars, below); black words; square corners; and the
    "no items found" line hidden while the invitation is showing, since it says the same
    thing worse. Checked at 1440 and 375: no overflow, title and button on the page centre.
    - **How it reaches the widget, measured rather than assumed.** The new widget
      (`.jm-review-widget`) takes its colours from custom properties written as an inline
      style on its own root, which no ordinary rule beats -- `!important` on the property
      in a stylesheet does. The older parts (stars, histogram bars, the verified badge, the
      write-a-review form) take a hard-coded `#108474` from style blocks Judge.me injects
      after crown.css, so those are overridden by selector with `body` in front, which
      out-specifies them without another `!important`. The title needed `.jm-text.` as well:
      Judge.me's own `.jm-text[data-v-...]` ties a two-class selector and loads later.
    - **Fragile on purpose, and it fails soft.** Everything is scoped to Judge.me's own class
      names (`jm-*`, `jdgm-*`), which are Judge.me's to rename. If one changes, that rule
      stops matching and the piece falls back to the colours set in Judge.me's admin: the
      page degrades, it does not break. **Judge.me's admin colour settings are overridden**
      here, so changing them there will do nothing; change them in this file.
    - **Not styled, because there was nothing to look at**: the review cards, the star
      summary, the photo strip and the filters exist only once a real review does. They
      read the variables above and are **to be looked at when the first review arrives**.
      The header is centred only while the invitation shows (`:has(.jm-no-reviews-state)`);
      with reviews it becomes Judge.me's own row of title, button and filters, left as it
      draws itself.
    - **The frameless pane showed the form half-faded** (the modal's fade never advanced),
      which looked like a styling fault. Finishing the animations by hand showed it fine;
      the same lesson as under Buttons lift up on hover.
    - **Escape did not close the form** in the pane (it stayed open), so the page was
      reloaded instead, which discards it. Nothing was submitted at any point.
  - **Pink stars, smaller, and the form's own wording, 2026-10-01** (the owner: "make the stars
    pink but the pink we use, also make them a little bit smaller like moonmagic, and the text a
    little bit smaller, and change the text something like theirs but without the Already loved
    by 600,000+ women worldwide"). **A reading, not a certainty**: that phrase is on neither
    moonmagic's product page nor their widget but in their **write-a-review form** -- title
    "Love it? Tell us why", intro "Already loved by 600,000+ women worldwide - now we'd love to
    know how your piece makes you feel." So "the text" was taken to mean the form's words, and
    "the stars" every star Judge.me and Dawn draw.
    - **The pink is `#E6BAB9`**, the pink the site already uses on the Add to cart hover and the
      header icons (moonmagic's own, `rgb(230, 186, 185)` on their stars), replacing gold. Changed
      at its source -- the two star variables, the form's star rule, the histogram bar -- not
      with a new rule, which would have tied the old one on specificity and lost on order.
    - **"Smaller like moonmagic" came out as smaller than moonmagic.** Measured on both at 1440
      and 375: the two forms are the same size -- title 24px, intro 16px, product name 18px, stars
      48px -- because it is the same Judge.me form. Ours read bigger for two reasons that were
      ours: the site's 0.6px letter-spacing, which the form inherits from `<body>` and theirs
      does not (reset with `letter-spacing: normal`), and a long Bulgarian title that wrapped to
      two lines on a phone. So the sizes went down a step rather than to a match: stars 48px to
      40px (their box and gap with them, so the row and its "Слаб" / "Отличен" labels stay lined
      up), title 22px, intro 15px, product name 16px.
    - **The widget is sized in em from its own root, so one value does the lot**: text 1em,
      .875em and .75em, headings 1.25em and 1.5em, the stars 1.5em on a card and .8em in the
      summary. `font-size: 1.5rem` on `.jm-review-widget`, down from 16px. Read live: the root
      is 15px and the sizes resolve to 15, 13.1, 11.3, 18.8 and 22.5px. The title "Отзиви от
      клиенти" keeps its own 24px.
    - **The words are swapped, not set.** Judge.me draws the form's title and intro as plain
      text with no setting for them in the theme, so they change the way its own injected
      styles change its other strings: the original is hidden (`visibility: hidden` with
      `font-size: 0`, so it takes no room and a screen reader does not read both) and the new
      line is a `::before`. Scoped to the first page of the form only
      (`__page--review-form-intro`), because the later pages use the same `__title` class for
      their own headings. „Харесва ли ви? Кажете ни защо“ and, first, „Ще се радваме да научим
      какво ви кара да се чувствате с вашето бижу.“ -- the invitation kept, the 600,000+ claim
      dropped, since no such number exists here. **The intro line was replaced the same day**,
      at the owner's request ("change the text to something else"), with „Вашето мнение помага
      на други да изберат с увереност.“ -- a reason to write one rather than a request for a
      feeling, short and calm like the rest; the wording is ours and one string in
      `crown.css` if another is wanted. Fails soft like the rest: if Judge.me renames those
      classes, the rule stops matching and its own Bulgarian comes back.
    - **Dawn's own stars as well** -- the rating under the product title and on the cards,
      which Dawn draws itself from the `reviews.rating` metafield Judge.me writes: pink, and
      17px to 15px on the product, 14px to 12px on a card. They print only once a product has a
      rating, so this was written ahead of the first review.
    - **Checked live.** Desktop form, page 1: title 22px with the new words, intro 15px on one
      line, stars 43 x 40 in `rgb(230, 186, 185)`. Page 2, reached by picking five stars: none of
      the new wording on it, the same pink stars at 40px, product name 16px, field label 14px.
      375px: the form fills the screen, the title is one line and the intro two, the stars are
      centred (62px either side), and the page is exactly 375 wide. A mock Dawn rating dropped
      into the live DOM (never committed): product 15px, card 12px, both pink in the gradient.
    - **Not looked at, and cannot be yet**: the review cards and the summary stars, which exist
      only once a real review does. The em sizes above say what they will measure, not what
      they look like -- still **to be looked at when the first review arrives**.
    - **Left alone, not asked about**: the form's own body text is Judge.me's `#333`, not the
      black the widget's words were set to.
    - **Lessons from the checking.** Shopify's minifier writes non-ASCII `content` strings as
      hex escapes, so a search of the served stylesheet for „Харесва“ came back empty while the
      rule was live (`\425\430\440...`) -- the same family as the spaces and quotes noted
      under Shopify serves CSS minified; read the computed `::before` content instead.
      Judge.me's stars are `<button class="jdgm-star">`, so `.click()` on the fifth moves the
      form to page 2, which a coordinate click could not do while screenshots timed out. And
      in a standard product card the rating lives in `.card-information` (hyphen);
      `.card__information` (underscore) is a zero-width box, so a mock placed there measured a
      star 0px wide and read like a bug that was not one.
  - **The text field's label, „Съдържание на отзива (Препоръчително)“, 2026-10-01** (the owner:
    "in the section Отзиви от клиенти make Съдържание на отзива (Препоръчително)"). Judge.me
    labels it „(Задължително)“ and makes it required. **That is not moonmagic's doing either**:
    their own form reads "Review content (Required)" with `required` on the textarea, so this
    is the owner's wording, not a match.
    - **The theme cannot make the field optional.** Judge.me does, through its own setting --
      Settings > Widgets > Write a Review > Flow > Review content > **Enable quick star
      ratings**, available on the free plan (its help centre: "the Review content field
      remains visible in the review form but becomes optional", customers "not required to
      write a comment"). That one is the owner's to switch, in Judge.me's admin.
    - **So the label is swapped only while the field really is optional**: a rule keyed to
      `.jdgm-write-review-modal__field-group--review-body:has(textarea:not([required]))`,
      hiding the original and drawing the owner's words as a `::before` at the label's own
      14px / 1.5, the same swap as the form's title and intro. A label saying "recommended"
      over a field the form then refuses to send empty would be worse than the wording it
      replaces. Required, the rule does not match and Judge.me's own label shows.
    - **Tested on moonmagic's form, which is the same Judge.me markup**, by injecting the rule
      and toggling `required` on the textarea: required leaves the label alone, optional
      swaps it with the label's box the same 40px, required again restores it.
    - **Not known, and not seen on this store**: whether Judge.me drops `required` itself when
      quick star ratings is on (its docs say the field becomes optional, not how), and what
      its own label says then. If the owner switches it on and the label still reads
      „Задължително“, the textarea is still `required` and the setting did not do what the
      docs say -- look at the form's textarea before touching the CSS.
- **Accordion arrow.** `snippets/icon-accordion-caret.liquid` with the wing geometry in
  `assets/crown.css` (2026-10-02, the owner: "for every drop down menu i want the arrows
  to be arrows that look like moon magic and i want it when you click on it to become a
  minus but the arrow lines to go in the line where is the minus, like they disappear in
  the line ... you can check hestiahome.bg and see how theirs are moving when you open
  them, but theirs is first with plus and then minus -- ours are going to be like i said,
  like moonmagic arrows, the [motion] like theirs['] minus"). Replaces Dawn's own
  `icon-caret.svg` wherever a real content accordion opens on the site.
  - **The first pass checked the wrong page, and the owner caught it mid-build**: "i said
    that i want moonmagic arrow like on their drop down menu for the products". moonmagic's
    own PRODUCT-PAGE accordions (Quality & Details, Shipping & Returns) are an off-canvas
    drawer, not a disclosure at all, so the first pass took the shape from their FAQ page
    instead -- a plain chevron, but a borrowed Font Awesome glyph, not theirs. The real
    one is on "Choose your metal" (the same row the metal menu above is modelled on):
    `.variant__optiongroup--menu__arrow.icon-mm-arrow` -- "mm" for Moon Magic, their own
    drawn icon, confirmed by its own distinct codepoint in the same icon font the FAQ
    glyph also happens to live in. It points sideways, since it opens their own side
    panel, not down -- only the shape carries over, not the orientation.
  - **Measured by rendering the glyph itself, not by eye.** Drew the actual character
    (font `moonmagic-icons`, codepoint e967) to a canvas at a large size and read the dark
    pixels directly: a vertex and two arms of equal length (194px and 191px) meeting it at
    a shared **43.75deg** off the horizontal -- a plain two-stroke chevron, nothing
    stylised. Rounded to 44deg.
  - **hestiahome.bg's own accordion icon** (`.hh-accordion__icon`, their product page's
    Размери / Описание / Доставка и плащане rows), read from its computed style: two 1.5px
    bars, one fixed horizontal, the other at `rotate(90deg)` closed and `rotate(0deg)`
    open -- a plus that becomes a minus by the moving bar rotating flat onto the fixed
    one. That rotating, not vanishing, is the "lines disappear into the line" motion the
    owner pointed at.
  - **Our own shape is a chevron, not a plus, so neither bar starts horizontal at rest --
    both have to rotate home.** Each bar pivots at its own outer corner through ±44deg,
    matching moonmagic's own glyph almost exactly; closed, the two meet at the box's
    centre, which at this angle needs each bar at 69.5% of the box's own width
    (50 / cos(44deg)) rather than a plain half. Open, both rotate to 0deg -- flat,
    overlapping across the full width, landing on one continuous line. **A first, naive
    attempt (50%-wide bars at 45deg) falls 15% short of the centre and reads as two
    separated ticks, not a chevron** -- caught in an isolated local test (candidate
    angle/width pairs, zoomed 5x and at real size) before any of this reached a real
    template; that same test also carried Dawn's own icon-caret.svg angle (its path data
    is a precise two-segment 45deg chevron) for comparison, close enough to moonmagic's
    own 43.75deg that either would have read fine at this size, but the measured value is
    what shipped.
  - **Every real accordion on the site, and what was deliberately left out.** Touched:
    the product page's own `collapsible_tab` and `product_specs` blocks (Доставка и
    връщане, Начини на плащане, Качество и детайли, Грижа за бижуто, За камъка), За
    нас's own FAQ (`sections/collapsible-content.liquid`, which shares Dawn's
    `.accordion` wrapper with the product blocks), the footer's phone link-column
    accordion, Контакти's `contact-methods` rows, and the metal picker's own drop-down
    menu (`option-menu`, built the previous round) -- the phrase "every drop down menu"
    was read to include that one too, not just FAQ-style content accordions, since the
    whole message opened by discussing it. **Left alone, as functional controls rather
    than content disclosures**: native `<select>` dropdown arrows (including the
    variant picker's own `dropdown` mode, unused on this site today), the phone
    drawer's rows (the header's desktop menu took the arrow on 2026-10-03, see Header menu),
    pagination, every slider/carousel's prev-next arrows
    (including this section's own, and the Recently viewed row's), and the cart drawer's
    own disclosures (a checkout-adjacent area, left untouched out of caution rather than
    checked and excluded). Worth asking about if the owner wants it wider.
  - **The snippet carries no position or size of its own.** Every site already had both
    for the icon that used to sit there, so the default call keeps the class
    `icon-caret` precisely so each site's own existing rule (Dawn's generic `summary
    .icon-caret`, the footer's own, the metal menu's own) keeps placing and sizing the
    box unchanged -- only the SVG inside it changed, plus a cancellation of each site's
    own old `transform: rotate(180deg)` on open (which would otherwise spin the two
    wings as a rigid unit instead of letting them flatten), each one matching or beating
    the specificity of the rule it replaces rather than trusting load order, the same
    approach used everywhere else in this file.
    - **Контакти is the one call that passes `bare: true`.** Its own
      `.contact-methods__toggle` has never carried class `icon-caret`, and must not
      start now: Dawn's generic `summary .icon-caret` rule would otherwise reach in and
      reposition it (confirmed by specificity: `summary .icon-caret` at (0,1,1) beats a
      bare `.contact-methods__toggle` at (0,1,0) regardless of load order). So this one
      call carries only `cj-caret`, kept its own existing 1.6rem square box exactly as
      it was, and lost its old hand-drawn plus/minus (`::before`/`::after`) entirely.
    - **The footer needed one real fix, not just a markup swap.** Its own `.icon-caret`
      was `position: static`, which would have stopped the wings (`position: absolute`)
      from positioning against it at all -- changed to `position: relative`, the one
      edit in this round that was a genuine bug fix rather than a swap.
  - **Checked in a local mock** (the real `base.css`, `component-accordion.css`,
    `section-contact-methods.css` and `crown.css`, the real snippet output, built markup
    matching each site's own structure exactly) at 1440 and 375px, every one of the five
    sites, both states: the wings' own computed transform reads
    `matrix(0.7193, ±0.6947, ∓0.6947, 0.7193, 0, 0)` closed (cos/sin of exactly 44°) and
    `matrix(1, 0, 0, 1, 0, 0)` open on both bars, while each site's own icon wrapper
    reads `transform: none` in both states -- the wings animate, the box does not. A
    screenshot confirms a clean chevron and a clean solid minus with no visible gap or
    seam, including in Контакти's own square (not 1.667-ratio) box. **Not seen on the
    live preview.**
  - **Smoother, 2026-10-02** (the owner: "make the change of the arrows to the minus
    smoother"). The wings moved for 0.2s on the plain `ease` curve, which reads as a swap
    rather than a movement. The timing was read off hestiahome's own icon this time
    (`.hh-accordion__icon::after`, computed style): `transform 0.4s cubic-bezier(0.22, 1,
    0.36, 1)` -- an ease-out-quint, twice as long, that covers 40% of the turn in the first
    tenth of the time and then settles for the rest. Their panel does not animate either (a
    plain `<details>`), so the arrow is the only thing moving there, as here. The
    reduced-motion rule (no transition) is untouched.
    - **Checked**: on a local copy of the live page with the real stylesheet, opening a
      `<details>` starts a running 400ms `transform` animation on the wing with exactly that
      curve, and the wing ends on `matrix(1, 0, 0, 1, 0, 0)`.
    - **Not seen moving**: the preview pane produces no animation frames, so the smoothness
      itself is judged from the numbers, not by eye. If it still reads abrupt, the start is
      the part to soften -- a curve with a gentler first half, such as `cubic-bezier(0.4, 0,
      0.2, 1)` -- not the length.
- **Recently viewed.** `sections/recently-viewed.liquid` with `assets/section-recently-viewed.css`
  and `assets/recently-viewed.js` (2026-10-01, at the owner's request: "add like moonmagic
  section You Recently Viewed above Отзиви от клиенти"). It sits on the product page right
  after the product and before the reviews (`templates/product.json`).
  - **moonmagic's, measured on their site at 1440px after opening five products.** The
    section is `#product-section-recently-viewed`, directly above Customer Reviews -- the
    owner's requested position is theirs. A 65px / 400 heading at the 20px gutter with 45px
    under it, then a Swiper of 400px slides, each a 380px square picture (10px of slide
    either side), the stone name in 14px and the title in 16px / 600 under it, **no price**.
    The product you are on is left out. Arrows (27 x 40) sit at the top right on the
    heading's row and lock when there is nothing to scroll; the section has 60px above and
    80px below. Their fourth card is cut at the edge at 1440, as their carousel does. They
    keep the list in localStorage (`recently_viewed_bg`: id, title, stones, featured image)
    and draw it in the browser, with nothing fetched.
  - **Ours does the same, with this site's own sizes.** On a product page the section puts the
    current product's handle, title, address and picture on a `<recently-viewed>` element;
    the script keeps the most recent twelve in localStorage (`cullinan_recently_viewed`),
    current first and never twice, and draws every product on the list except the current
    one, up to the section's **Most products to show** (8, range 2-12). Nothing is sent
    anywhere and nothing is fetched. On a template with no product it records nothing and
    only shows the list.
    - **Hidden until there is something to show.** The element starts `hidden`, padding and
      all, and the script reveals it only when at least one other product is on the list, so
      a first visit and a visit without JavaScript both show the page exactly as before.
      `recently-viewed[hidden]` and `.recently-viewed__buttons[hidden]` carry explicit
      `display: none`, because the element and the buttons both have a `display` of their own
      and an author `display` cancels `hidden` (the stones arrows had the same fault).
      **In the theme editor it is invisible until the preview has been browsed**, for the
      same reason; the section's own help text says so.
    - **A picture and a title, like theirs, not this theme's product card.** The card carries
      swatches, a price and hover behaviour that four stored strings cannot rebuild, and
      moonmagic shows none of them here. No price, as theirs. The heading is the collection-
      title clamp from `crown.css` (26px to 40px, capitals) so it reads as the sibling of
      „Може да ви хареса“ below the reviews, and the row is three across from 990px (four until
      2026-10-02, see Every product picture bigger under Product gallery) and two
      below on the same 24px grid (12px on a phone), so the two rows share their edges. Whole
      cards only, never cut; it scrolls by one card and its arrows -- Dawn's own
      `.slider-button`, so they match the other rows -- exist only when the cards do not all
      fit. Picture slots are square and a product with no photograph is a flat tint.
    - **The wording is ours**: „Наскоро разгледани“ for their "You Recently Viewed", a section
      setting. The owner named no wording.
    - **On a phone moonmagic shows one large card and a peek of the next; ours shows two whole
      cards.** Measured on theirs at 375px: 284px slides (a 269px picture), 51px of the next
      one showing, a 35px heading wrapping to two lines at the 20px gutter with 30px under it,
      arrows 27 x 30 at the right of the heading's row, 60px above the section. Ours keeps
      the two-across every other product row on this site uses on a phone, and the owner has
      twice preferred whole cards to cut ones, so the choice was made rather than copied.
      **One value switches it**: `--recently-viewed-columns: 1.25` on `.recently-viewed__track`
      in its base rule (which is the phone's) gives one card and a quarter of the next, the width being
      `(100% - (columns - 1) * gap) / columns`.
    - **Everything read back from storage is treated as untrusted**, since it lives in the
      visitor's browser: titles go in as text; an entry whose address is not a path on this
      shop (`//host` or any scheme) is dropped, and on a product page the stored list is
      rewritten without it; a picture must be https (or the page's own protocol) and come
      from this shop's own host, any `shopify.com` host, or a `/cdn/shop/` path, or the card
      is drawn without it. **Which host Shopify uses for this shop's pictures was not
      checked** (the preview link was expired), which is why all three pass; the path
      allowance is the loose one, accepted because only a script already running on this
      shop could have written the list.
    - **Privacy**: what is stored (handle, title, address, picture URL) stays in the visitor's
      browser and goes nowhere. Whether the cookie and privacy text should mention it is a
      question for the accountant, like every other legal wording here; none was written.
    - **Pushed in two steps**, the section and its two files first, the template that names
      it later: a template can only reference a section Shopify already holds. There is no
      sync status anywhere -- the repository is public and carries no statuses or checks
      from Shopify -- so the only way to know the template landed is the preview.
    - **Tested in a local mock** (the real `base.css`, `component-slider.css`,
      `section-recently-viewed.css`, `crown.css` and the real script, the section rendered by
      liquidjs, test pictures generated by the throwaway server) at 1440 and 375px: four
      whole 307px cards on a 24px grid with a 1300px row; arrows stepping 331px a card, the
      previous one disabled at the start and the next at the end, with clicks past the end
      doing nothing; two products and no arrows; a first visit hidden with the current
      product stored; tampered storage (a `javascript:` address, a `//evil` address and
      junk entries dropped and the stored list rewritten without them, a foreign picture
      dropped but its card kept); an HTML-looking title rendered as literal text with no
      script run; a page with no product showing the list and recording nothing; two 166px
      cards, a 12px gap and no sideways scroll at 375. **Not seen on the live page.**
      The pane runs no animation frames, so the arrows were driven with
      `prefers-reduced-motion` faked on `matchMedia` (instant scroll) and a hand-fired
      `scroll` event, the lesson already under Stones row.
  - **Visible in the theme editor even with nothing browsed, 2026-10-01** (undocumented
    until now). `request.design_mode` draws four empty picture slots and a one-line note
    in Bulgarian instead of returning early, so the section can be seen and selected
    there; no visitor and no preview link ever sees this, only the editor itself.
  - **"Appears just for a phone", 2026-10-02 (the owner, on the live preview) -- checked,
    and it is not a code restriction.** Opened the ring, then Обеци, directly on the
    preview at 1440px: the row showed with a real photo, same as at 375px, `hidden`
    false, nothing in the CSS gates it to any width. The list lives in
    `localStorage`, which is **per browser, per device** -- if the owner browsed on a
    phone, that phone's own storage has the list; a desktop browser (or a different
    phone) has an empty one of its own until two products are opened there too. Not a
    bug to fix in the theme; told to the owner rather than guessed at either way.
- **Product gallery.** The block at the end of `assets/crown.css` ("The product gallery:
  moonmagic's seamless square mosaic"), `assets/gallery-dots.js`,
  `snippets/product-media-gallery.liquid`, one line in `sections/main-product.liquid` and two
  settings in `templates/product.json` (2026-10-02, the owner: "when we open a product i want
  the section with the pictures of the product to be like moonmagic" -- and, in the same
  message, "make every picture product bigger", which turned out to be about something else,
  see Every product picture bigger below).
  - **moonmagic's gallery, measured on the Harlow ring page at 1440, 1024, 768 and 375px**
    rather than from memory. From 1024px up it is a two-column mosaic of **square tiles with
    no gap at all**: 361.5px each at 1440, 723px of picture in a 1200px container, the buy box
    432px (36%) after a 45px gutter. The buy box (`.product__shop`) is `position: sticky; top:
    90px`, so it stays in view while the mosaic scrolls past. Their pictures are `object-fit:
    fill` on square sources: every photograph they upload is already square. At 768px it is a
    slider at the page's width; at 375px a **full-bleed 375px square, one slide per screen and
    no peek**, a cross-fade between slides, and under it a row of **6px dots** (black for the
    current one, `#C1C1C6` for the rest, 29px apart) with a thin arrow at each end (the first
    one dimmed at the start) and a small expand icon at the bottom-left of the picture. A click
    opens a full-screen white lightbox: a vertical strip of 100px thumbnails on the left, the
    picture 720px square (the window height less 180) and CLOSE at the top right. **Every
    product they have is `first-slide-standard` with 14 to 50 pictures** (read off ten ring
    pages), so a plain mosaic always fills their column.
  - **What it is now.** Dawn's own "2 columns" layout, and the stylesheet makes every tile a
    square and removes the gaps. At 1440, a product with two pictures (the ring) is one row of
    two 417.3px squares beside the buy box, which is unchanged (425.4px, sticky); at 1024 the
    tiles are 291.8px (theirs 282.9); at 768 one column of 326.5px squares in the half of the
    page the gallery sits in; on a phone every picture is a full-bleed 375px square. **A product
    with a single picture on a computer is drawn exactly as it was before any of this**: fitted
    to the window height and uncropped -- the pendant 547.5 x 730, the bracelet 834.6 x 625.9,
    read live. Every photograph in a mosaic is cropped to its tile whatever shape it was shot
    in (a 3:4 one loses 12.5% off the top and bottom, a 4:3 one 12.5% off each side), and the
    focal point set in Shopify's Files decides which part stays.
  - **The first pass was too big, and was undone the same evening.** It made the first picture
    run the full width of the column (835px at 1440, Dawn's "Stacked" layout) on the reasoning
    that ours have one to a handful of photographs where theirs have 14 to 50, so a plain
    mosaic of two would be one short row beside a buy box twice as tall. The owner: "i was
    talking about just the products picture when you see them at the some section or in
    rings not when you open them and their picture to be bigger". The "bigger" had been about
    the cards, not the product page, and the pictures on a product page had become much
    bigger than they were (547 x 730 to 835 x 835) without being asked for. **The cost of the
    short row is real and accepted**: with two pictures the left column is 417px tall beside a
    765px buy box, which fills as photographs are added. "Stacked" is still one setting away
    (Gallery layout) and the stylesheet still covers it, if a large first picture is ever
    wanted.
  - **The two settings.** `gallery_layout` is `columns` (it was `stacked`) and
    `constrain_to_viewport` is `true` (it was `false` for the first pass and `true` before
    that, so net unchanged from before the gallery work). Fitting a picture to the window
    height is what a lone picture needs and the opposite of a tile, so the tiles switch it off
    for themselves: full width, square.
    - **Dawn's `--ratio-percent` is the lever**, not the images: `.media` is a padding-top box
      sized from it, and `.product .product__media-item:not(:only-child)
      .product-media-container.media-type-image` sets it to 100% from 750px up. The `:not(
      :only-child)` is the whole difference between a mosaic and a lone picture. Video and 3D
      keep Dawn's own shape and still take a full row. On a phone the rule has no `:not`, so a
      lone picture is a full-bleed square there too; `.global-media-settings` is in that
      selector only to out-specify Dawn's width rule, which ties the plain version.
    - **Phones: one full-bleed square per screen.** Dawn gives each slide 100% less 3rem and a
      1.5rem lead-in so the next one peeks; that and the 5px of focus padding top and bottom are
      cancelled, so a slide is exactly the screen wide (375px at 375, a 375px scroll step). The
      expand icon moves from the top-left to the bottom-left, as theirs. Below 750px only.
    - **The dots are `<gallery-dots>`** (`assets/gallery-dots.js`). It scrolls nothing: Dawn's
      `<slider-component>` already scrolls, snaps and knows the current slide (`currentPage`,
      and a `slideChanged` event), so this only draws it. Liquid prints one dot per slide so the
      row exists before any script; the script keeps the count right when a variant change adds
      or removes a slide (a MutationObserver on the list) and lights the right one. Dawn's
      "1 / 4" counter stays in the markup, visually hidden, for its own script and for a screen
      reader. The arrows are Dawn's, pushed to the two ends of the row and sized 9 x 15px like
      moonmagic's (Dawn's is a speck); the dots are 6px, 29px apart, the text colour and a
      quarter of it, not their cool grey -- ours stay in the warm family of the page.
    - **A slide, not a cross-fade.** Dawn's slider is a native scroll-snap row, which is what a
      finger is best at; a fade would mean replacing it. The owner sees dots, arrows and a
      full-bleed square, which is the part of theirs that reads.
    - **Keyboard focus is drawn inside the tile.** Dawn draws it 5px outside, which a tile with
      no gap, a full-bleed slide and a scrolling list would all clip.
    - **Left as Dawn's, on purpose**: the lightbox (it shows every picture at its own shape,
      uncropped, which is right for looking closely -- theirs adds a thumbnail strip; **since
      2026-10-03 it is moonmagic's too, see Zoom viewer below**), the
      phone slider's scrolling, and **the sticky purchase bar on a phone** (theirs has a size
      picker and ADD TO BAG fixed to the bottom of the screen; not asked about, not built).
      The tablet layout from 750 to 989px stacks the pictures in the half column, as it did
      (theirs puts the gallery above the buy box as a slider there).
  - **Checked, in two ways, both rounds.** First on an offline copy of the live page: `curl`
    with a cookie jar fetches the preview's real HTML (the pane could not post to a local
    server, curl needed nothing), a small Node script points its stylesheets and scripts at
    the repo's own working copies, and a throwaway server serves them -- the unchanged copy
    matched the live page to the pixel (547.5 x 730 and 405.3 x 573.7) before anything was
    changed. A second script patches the markup to what a template change will print (the
    layout class, the fit-to-height class), so a setting can be tried before it is pushed.
    On it, round two: the ring as two 417.3px tiles and the pendant at 547.5 x 730 at 1440;
    291.8px tiles at 1024; one 326.5px column at 768; full-bleed 375px squares on a phone for
    both. **The phone check caught a real miss**: with fit-to-height back on, Dawn narrows a
    contained tile to its own ratio (a 309px square in a 375px slide), and the first version
    of the phone rule tied that rule on specificity and lost on load order -- the fix is the
    extra class above, not a re-test of the same thing. Then live, after the push: the same
    numbers at 1440 and 375, `scrollWidth` equal to the width asked for. **The pane produces
    no animation frames and no scroll events**, so the slider was moved with `scrollLeft` plus
    a dispatched `scroll`, the lesson already under Stones row.
  - **Every product picture bigger, 2026-10-02** ("make every picture product bigger", sent
    with the gallery request). **Read as the cards, which turned out to be right and then
    needed a smaller number**: the owner, later the same day, "okay maybe make the products
    pictures a little bit smaller and i was talking about just the products picture when you
    see them at the some section or in rings". Sections are the homepage row and the related
    and recently viewed rows; "in rings" is a collection page. Real photographs had just gone
    into the cards and the pieces read small in them.
    - **Three across from 990px, but not as wide as the first try.** Four across (307px in
      collections, 320 on the homepage) was too small; three across edge to edge (417px, and
      437 on the homepage) was a little too big. Whole cards leave no size between those two
      counts -- three cards fill the row, and a fourth that shows even partly is the cut card
      the owner has objected to twice -- so the difference goes into the gaps: **each card is
      30% of the row and the other 10% is two equal gaps** (collections, search, the related
      row and Наскоро разгледани), so the first card stays on the left edge and the last on the
      right at any width. 390px cards and 65px gaps at 1440 (row 1300), 272.7px and 45px at
      1024. The homepage carousel keeps its own edges (first card 27.5px from the left, the
      heading and button on the same line, the arrows where they were): **a card is 28% of the
      row, 392px, and the gap is 8% less 1.5rem, 97px**, which makes three cards plus the two
      1.5rem insets fill the 1400px row exactly. The gap goes in Dawn's spacing variable rather
      than straight into `column-gap` because Dawn's end-of-row spacer subtracts the same
      variable from its own margin; measured with the row scrolled to its end, the last card
      sits 15px from the right edge, as the first does from the left.
    - **Where**: `assets/crown.css` ("Collections, search and the related row", before
      `card-swatches`, and the homepage row rule beside "Най-продавани is a carousel"),
      `assets/section-recently-viewed.css` (`--recently-viewed-gap: 5%`, so its own width
      formula lands on 30%), and `columns_desktop: 3` in `templates/collection.json`,
      `search.json` and `product.json` (the related row). Measured live on all five.
    - **Phones and tablets are untouched**: phones stay two across at 168px (moonmagic's own
      collection grid is two across at 174px), tablets were already three.
    - **The sizes the owner has now seen**: 307 and 320 (four across), 417 and 437 (three
      across, edge to edge), 390 and 392 (now). moonmagic's own: 308 in a collection (beside a
      sidebar) and 380 in a row. **To change it, one number**: 30% and 5% for the grids, 28%
      and 8% for the homepage; both come out as whole-card rows at any width.
  - **Worth knowing, not changed.** **Two of the test photographs carry the Cullinan logo and
    a slogan burned into the picture** (the bracelet, and the ring's second photograph), which
    is the project's own first rule; flagged to the owner, not touched -- the pictures are
    theirs to choose. The square crop of that second photograph cuts the top of its logo, which
    is the 12.5% above. Sources are 1086px wide, enough for a 417px tile even at twice the
    pixel density.
- **Zoom viewer.** `snippets/product-media-modal.liquid`, `assets/product-modal.js` and
  `assets/component-product-viewer.css`, plus one stylesheet line each in
  `sections/main-product.liquid` and `sections/featured-product.liquid` (2026-10-03, the owner:
  "when you open them and click on their pictures to zoom or whatever it is lets make it like
  moonmagic it looks way better"). It is what opens when a picture in the product gallery is
  clicked.
  - **What it was.** Dawn's own: every picture of the product in one scrolling column at full
    width, under a layer that closes on any click anywhere (the `media-modal` class makes
    `ModalDialog` do that). Nothing said which picture you were on and nothing let you jump.
  - **moonmagic's, measured on a product page at 1440, 1024, 768 and 375px** (it is micromodal
    and Swiper). A full-screen white layer that fades in over 0.3s on `cubic-bezier(0, 0, 0.2,
    1)` while the content slides up 15% into place, and fades out while it slides 10% further
    up. **From 1200px a vertical strip of 100px square thumbnails**, 20px apart and 30px from
    the left, with a 100 x 28 grey arrow bar above and below that dims at each end; **no marker
    on the current thumbnail**. The picture fills the rest, `contain`, in a box the window's
    height less 180px (less 100px under 1200), and cross-fades over 0.3s. **Under 992px there is
    no strip**: the picture runs the full width and a **4px progress bar**, 90% wide, a black
    segment 1/N of the track on a 10% black track, sits under it, and a swipe changes picture.
    **CLOSE at the top right**, 40px in and 20px down: the word at 16px in capitals and a cross
    of two 2px lines. At 1024 they show neither strip nor bar, and there is no keyboard
    navigation at all.
  - **Ours is the same, with these differences, all deliberate.**
    - **The strip starts at 990px, not 1200**, this theme's own line between tablet and
      computer; between 990 and 1200 theirs has no way at all to change picture with a mouse.
    - **The word is Bulgarian, „Затвори“, written into the snippet.** The button's accessible
      name is still Dawn's `accessibility.close`. One string, not a locale entry.
    - **The ground is the page's own off-white** (the colour scheme's background, `#FCFCFB`),
      not pure white, under the project's no-pure-white rule. A photograph shot on pure white
      therefore shows a faint lighter rectangle on it, where moonmagic's pure white would let it
      vanish. One line to change if the owner wants theirs: `background-color` on
      `product-modal.product-media-modal` in `component-product-viewer.css`.
    - **Arrow keys, Home and End step through the pictures, Escape closes, Tab stays inside**,
      and focus goes back to the picture that was clicked. A screen reader hears „Снимка 2 от
      4“ from a polite live region, and each thumbnail carries the same words and `aria-current`.
    - **A click on empty space closes it with a mouse, not with a finger**: on a phone only
      Затвори closes it, so a stray touch while pinching cannot dismiss it.
  - **How it is built, and the traps in it.**
    - **Everything but the pictures is built when the viewer opens.** The strip and the bar are
      made by `ProductModal.show()` from the pictures in the content at that moment, because
      `assets/product-info.js` overwrites `.product-media-modal__content` when a variant is
      chosen -- a strip printed by Liquid would go stale on the first colour change. The
      element keeps its id, `ProductModal-{{ section.id }}`, which that script looks for.
    - **The `media-modal` class is gone.** With it `ModalDialog` closes the viewer on any mouse
      click, thumbnails and picture included. Without it the viewer closes itself only from the
      layer, the dialog, the stage or the picture's own box -- the empty space.
    - **Dawn's focus trap counts hidden controls.** It takes the first and last focusable
      element in the markup whether or not it is shown, and the strip is `display: none` on a
      phone, so Tab would have escaped. `show()` drops the trap straight after `super.show()`
      and the viewer wraps Tab itself over what is actually on screen.
    - **Only the current picture and its two neighbours are drawn** (`is-near`); the rest stay
      `display: none`, so their lazy images are not fetched until the visitor gets near them.
      Variant pictures the gallery hides stay hidden here too, except the chosen variant's own:
      the ring holds four pictures, two of them variant ones, and the viewer steps through two.
    - **Every rule is `product-modal.product-media-modal ...`, two classes deep**, because
      Dawn's modal rules in `section-main-product.css` are single-class and the new stylesheet
      loads right after it -- a plain class would only tie on load order.
    - **`assets/product-modal.js` is Dawn's file with its class replaced whole**, so a Dawn
      upgrade will conflict there. The stock one showed every picture in a column.
    - **Videos and 3D models are handled** (the poster is `contain`, a model's inline padding
      is cancelled) **but none exist in the catalogue, so that path is untested.**
  - **Checked live on the preview after the push**, with real events:
    - **1440 x 900**: layer 1440 x 900 on `rgb(252, 252, 251)`; strip at x 30, thumbnails
      100 x 100 and 20px apart; picture box 1260 x 720 at (150, 90), the window less 180,
      theirs 720; CLOSE 115 x 40 at 40px from the right and 20px down, word 16px. **1024 x 768**:
      strip shown, picture box 844 x 668 (the window less 100, theirs 668), no bar. **768 x
      1024**: no strip, bar 691.2 x 4 at x 38.4 (5% in, 90% wide). **375 x 812**: no strip, bar
      337.5 x 4 at x 18.8 with its segment 168.8px wide (one of two) and a 10px radius, theirs
      to the pixel; picture 375 x 692. No horizontal overflow at any of the four.
    - **Behaviour**: it opens on the picture that was clicked, from either of the ring's two
      gallery buttons; a thumbnail click, the Arrow keys, Home and End all land on the right
      picture and stop at the ends; Tab wraps both ways; Escape, a click on empty space and
      Затвори each close it, release the page's scroll lock and hand focus back to the button
      that opened it; a mouse click on the picture or a thumbnail does not close it. On a phone
      a leftward swipe goes on, a rightward one goes back, one under 40px or mostly vertical or
      made with a mouse does nothing, and a tap does not close.
    - **The pendant, with one picture, shows no strip and no bar, and only Затвори takes
      focus** -- either would be a control that does nothing.
  - **Lessons from the checking.**
    - **Dawn closes on `event.code`, not `event.key`.** A synthetic `keyup` with only
      `key: 'Escape'` closes nothing and reads as a broken Escape. Send both.
    - **A synthetic mouse `pointerup` on the stage element counts as a click on empty space**
      and closes the viewer, as it should. On a real page the active picture's own box covers
      the whole stage (`contain` letterboxes inside it), so a real click there lands on the
      picture. A test that "drags" with a mouse on the stage closes the thing under test.
    - **The Shopify preview bar covers the bottom of the screen on a preview link**, which is
      where the phone's progress bar sits; it is not there on the published store. A screenshot
      of a phone on a preview link never shows the bar, so measure it.
    - **Not seen**: the 0.3s fade and slide, since the pane produces no animation frames.
      Animations were finished by hand (`document.getAnimations().forEach(a => a.finish())`).

- **Product breadcrumb.** `sections/main-product.liquid` (the markup, printed before the block
  loop, and two settings) and `assets/crown.css` ("Breadcrumb at the top of the buy box"),
  2026-10-03, the owner: "when you open a product they have this Home / Moonstone Pearl Ring -
  Heirloom above the reviews start, the right is for the title of product and the left is to go
  back in the home page can we do that for ours".
  - **moonmagic's, measured on that very product at 1440 and 1024px and read from its own
    stylesheet.** "Above the reviews start" is above the review **stars**: the breadcrumb is the
    first thing in the buy box column, inside their sticky `.product__shop`, so it travels with
    the box. A `nav` with a link ("Home", to the home page), a `/` and the product's name as
    plain text: 12px in capitals, 1.2px of tracking, a 16px line, 9.6px of padding above it
    (their `0.6rem` on a 16px root), `white-space: nowrap` with an ellipsis, so a long name is
    cut rather than wrapped. The link and the slash are `#929292` (the link goes black on
    hover), the name black. **It is `display: none` below 992px**: a tablet and a phone have no
    breadcrumb at all.
  - **Ours is the same shape**: "Начало / Пръстен с верижка", at the top of the buy box above
    the stars, 12px capitals (10px since the same day, see below), 0.1em tracking, 16px line,
    9.6px above (written `0.96rem`, since
    this theme's root is 10px, where their `0.6rem` would be 6px), one line with an ellipsis
    (checked with an 89-character name at 990px: still one line, the box and the page not
    widened). The link goes to `routes.root_url`, the name carries `aria-current="page"`, the
    slash is `aria-hidden`, and the nav is labelled „Навигационна пътека“. **Shown from 990px**,
    this theme's own tablet/computer line, not their 992.
  - **Colour: black first, moonmagic's grey since the same day.** It shipped black, because the
    owner had asked for every word of the buy box in black (see Buy box reordered, metal before
    size, black text, 2026-10-01), with an underline on hover. The owner then asked for "Начало"
    to be "like moonmagic ... and when i put my cursor on it to become black", so the link and
    the slash are moonmagic's own `#929292` (`rgb(146, 146, 146)`), the name after them stays
    black, and the underline is gone: the link turns black over 0.2s on hover and on keyboard
    focus, as theirs does. **`#929292` is 3.0:1 on this page's ground**, under the 4.5:1 for
    text this small; it is moonmagic's own value and the owner's request, flagged to them as
    it shipped, and 60% black (5.7:1) is the one colour to change if it ever has to pass. The
    slash is grey as well and is `aria-hidden`, so it takes no part in that.
  - **10px, not 12, 2026-10-03** ("make it smaller as well ... and the title of the product that
    is on the right side of the slash"). The whole line, both sides of the slash, in one
    `font-size`. 12px is moonmagic's, in Latin capitals; Cyrillic capitals run about 9% wider
    per letter, so the same 12px read bigger here than it does there. The tracking stays 0.1em
    (so 1px), and the 16px line and the 9.6px above it are unchanged, which keeps the line
    exactly as tall as before and everything under it where it was.
  - **No template change, and no block.** The nav is printed by the section itself, first
    inside `.product__info-container`, behind `show_breadcrumb` (default on), with the word for
    home as `breadcrumb_home_label` (default „Начало“). Both defaults live in the schema, so
    `templates/product.json` never mentions them and the push needed no second step -- the
    validator lag under Design tokens is about a template naming something the section does
    not hold yet. The owner can switch it off in the theme editor (the product page's section
    settings) but cannot move it: it is always first, which is where theirs is. It is a
    separate piece from the Stars-above-the-title note above: the rating block is still the
    first *block*.
  - **A phone must start where it always did.** Dawn gives every block after the first 1.5rem
    above it (`.product__info-container > * + *`), so with a hidden breadcrumb ahead of it the
    stars would have taken 15px of margin on a phone and the whole box would have sat 15px
    lower. The block after the breadcrumb has its top margin zeroed at every width, and the gap
    lives on the breadcrumb itself (1.6rem, so the stars still sit close to the title as the
    owner asked on 2026-10-01), which exists only where it shows. Measured on the live page:
    the stars sit at offset 0 from the top of the buy box at 375 and 989px, and 16px under the
    breadcrumb from 990px. **That check was incomplete: see the correction at the end of this
    entry.**
  - **Checked on a local copy first, then live**, the same method as under Product gallery. At
    1440: the nav at x 937.1, the buy box's own left edge, 425.4 wide and 25.6 tall (9.6 + 16),
    12px / 1.2px / uppercase / black / nowrap (the first version), the stars 16px under it, so
    the buy box's top is
    41.6px taller than before; at 990 a 273px column; at 375 hidden with no overflow. A real
    hover on „Начало“ gave a 1px underline 3px under the text (the first version; see Colour above).
  - **A trap in the hover check, and the method that works.** With a viewport emulated larger
    than the pane, the screenshot frame shows the page scaled down and anchored top-left (408 x
    253 of the 800 x 500 frame at 1440 x 900), and a `computer` hover goes to **frame
    coordinates, not CSS pixels**: a hover by `ref` or at the element's CSS position misses, and
    the page reports `:hover` false. The first version of this note said to read the
    coordinates off a screenshot, which is fiddly, and its "about 0.28" is only the 1440
    figure: **the factor depends on the emulated width** (about 3.53 CSS pixels per frame pixel
    at 1440, about 2.05 at 1100). What works at any width: install a capture-phase `mousemove`
    listener on `window` that records `clientX` and `clientY`, hover at a known frame point,
    read the recorded CSS position back, divide to get the factor, then hover at the target's
    CSS centre divided by it. **Take a screenshot first after every navigation**, since the tool
    refuses `coordinate` without one. A viewport of about 1000 x 640 fills the frame well
    enough to read a screenshot by eye.
  - **Grey and 10px, checked live 2026-10-03.** At 1440 on the ring: "Начало" and the slash
    `rgb(146, 146, 146)`, the name `rgb(0, 0, 0)`, the line 10px with 1px of tracking, no
    underline; the three pieces are 47, 6.2 and 118.4px wide (were 56.4, 7.4 and 142.1 at
    12px); a real hover on "Начало" turned it `rgb(0, 0, 0)` with no underline. At 375 the nav
    is `display: none`, the stars sit at the top of the box as before and the page is exactly
    375 wide.

  - **Correction, 2026-10-03: the breadcrumb had silently widened the stars-to-title gap from 4px
    to 15px**, on a computer and on a phone. The rating block used to be the box's first child,
    which Dawn gives no margins; with the breadcrumb ahead of it, Dawn's `.product__info-container
    > * + *` gave it 1.5rem below as well, and that margin collapsed over the title's 0.4rem. The
    first version of the "a phone must start where it always did" rule zeroed only the block's
    **top** margin, and the check that went with it measured only the top (the stars at offset 0),
    so the claim above that the stars "still sit close to the title" was wrong by 11px. Found
    measuring the next request; `.product-breadcrumb + .rating-wrapper` now zeroes the bottom
    margin too, and the live page measures 4px again at 1440 and 375. **Lesson: when a block stops
    being the first child, check both of its margins, and measure the gap on both sides.**

- **Cart drawer.** `assets/cullinan-cart.css`, `snippets/cart-drawer.liquid`,
  `snippets/cart-item-options.liquid`, three theme settings, the cart's strings in
  `locales/en.default.json` and one stylesheet line in `layout/theme.liquid` (2026-10-03, the
  owner: "we need to make a design for the добави количката because when i click it it opens
  your cart ... what will show there i think we can make it something mix like choosing from
  hestiahome and moonmagic or the best idea you can make our own but using examples from theirs
  carts"). It is what opens when „Добави в количката“ is clicked and from the bag icon in the
  header (`cart_type` is `drawer`).
  - **What it was.** Stock Dawn: "Your cart", "Product / Total" column headings, a 400px panel,
    the options as "Name: value" rows with the gold colour said twice ("изберете вашия размер:
    54 55, Цветове на златото: жълто злато, Изберете вашия метал: 14К жълто злато"), a boxed
    quantity field and a trash icon, "Estimated total €200,00 EUR", an English tax note, a
    pill button. All in English, because the store language is still English.
  - **moonmagic's bag, measured live** (a ring in the bag, at 1440 and 375). A 720px sheet from
    the right at 1440 (half the screen), **full-screen on a phone**; white, square, `transform
    0.3s`, a 0.6 black veil. A 40px strip of trust items on top (14px/500: taxes included,
    premium metals, 600K+ women, authentic gemstones, hassle-free returns, 2-year warranty), then
    "YOUR BAG" 24px/600 capitals at 2.4px tracking over a 1px black hairline. Lines: 10px padding,
    a 1px black rule under each, a **110px square picture**, the name 16px/600, the options in
    12px capitals at half black, a borderless "- 1 +" (30px cells), a small cross to remove, the
    price at the right (18px, the sale in crimson). A greige band (`#F5F4F0`, the same token as
    our scheme-6) between black rules offering a gift bag; a "You may also like" carousel; a
    pinned footer with a followers-and-Trustpilot row, "Total" at 22px and a **black square
    CHECKOUT, 60px, 18px/700, 0.1em, radius 1px**, then thirteen payment logos. On a phone: 45px
    header, 22px title, an 85px picture, 14px name, 345 x 48 button at 16px. Their empty bag is a
    12px capitals line over the same shell, the carousel and a live CHECKOUT button. **Not
    copied**: on Add to Bag a "Make it a set" modal appears first, selling a set.
  - **hestiahome.bg's cart, measured live** (a pillow in the bag). A **440px floating card**:
    13px of margin all round, a 12px radius, `blur(24px) saturate(1.3)` over a cream at 0.72, a
    0.5 veil; Jost throughout. The title 26px/500 in sentence case, column headings in 13px
    capitals, a rounded 110px thumbnail, the name 15px/500, the unit price and "Размер: ..."
    underneath, the line's total at the right, a rounded quantity box and a round trash button.
    Above the total **a row of three reassurances with icons** -- „Безплатна доставка за 2+
    комплекта“, „Наложен платеж при получаване“, „Лесна замяна“ -- on their scheme-2; then
    „Очаквана обща сума“ (26px) and a full-width **dark pill**, „Преминаване към плащане“. Their
    empty state: „Количката Ви е празна.“, a button, and a prompt to log in.
  - **What was taken, and what is our own.** From moonmagic: the structure and the squareness --
    the tracked-capitals title with a hairline, hairline-separated lines, a square picture, the
    options in small capitals, a pinned footer, a full-screen sheet on a phone, and the black
    square button, **the same one as Add to cart** (pink on hover, a near-black label, since
    white on that pink is 1.74:1) so the two steps of buying read as one. From hestiahome.bg: the
    idea that reassurances belong next to the money, as one list. Our own: the list is three
    ticked lines on **scheme-6's greige**, from facts the owner has already given for the product
    page; the options say values only, with the colour left out where the product page leaves it
    out; **„Премахни“** in words where both references use an icon (an icon beside a stepper is a
    stray tap); the item count in the title; a calm empty bag; Bulgarian throughout.
  - **The panel.** 46rem wide, `max-width: 100vw`, full-screen below 750px; the cart colour scheme
    (scheme-1) with a hairline on its left edge; 0.4s on hestiahome's easing
    (`cubic-bezier(0.22, 1, 0.36, 1)`, the accordion arrow's too), none under reduced motion. The
    header is 60px: „ВАШАТА КОЛИЧКА (1)“ in Jost at 16px/550, 0.12em, capitals, a 44px close.
  - **A line.** A 10rem square picture (9rem on a phone), cropped around the focal point set in
    Shopify's Files; a line with no picture is the flat square every empty media slot here is. To
    its right the title (15px/550) and the price (15px/500, right-aligned on the title's
    baseline); under them the options as one line of values (11.5px capitals, 70% of the text
    colour): "14К жълто злато · Размер 54 55"; then a "- 1 +" in the faint 4% fill the size boxes
    on the product page have (104 x 36, square, no ring) and the underlined „Премахни“. The unit
    price („€200,00 за бр.“) shows only when the quantity is more than one or a discount applies.
  - **The options line** is `snippets/cart-item-options.liquid`: values only, **material first and
    the rest after it** (the order the product page draws), joined by a middle dot, the size
    with its word („Размер 54 55“, because a bare "54 55" says nothing), and the colour option
    **left out exactly where the product page leaves it out** (it asks `product-twin-option`). The
    names are never printed: on this store they are instructions written for the product page
    ("изберете вашия размер"). Only the cart looks different -- the variant, checkout, the order
    emails and the Admin list every option, which is what the atelier reads (hence the colour
    is never guessed).
  - **The footer.** The three reassurance lines on a full-width band (scheme-6, tick icons drawn
    with a non-scaling 1.2px stroke like the header icons), then „ОБЩО“ in small capitals with the
    amount at 22px/550, the tax note (Shopify's own sentence, in Bulgarian: „С включени данъци.
    Отстъпките и доставката се изчисляват при плащане.“) and the **checkout button**: black,
    square, 48px, 15px/700 capitals, 0.1em, label „Към плащане“, pink on hover and focus. The total
    is printed without the currency code, as every price here is.
  - **The three lines are settings** (Theme settings > Cart): „Наложен платеж — плащате при
    получаване“, „Изработка по поръчка · доставка 5–20 работни дни“, „Връщане до 14 дни от
    получаването“, each hidden when emptied. Every one is a fact already on the product page
    (the payment accordion, the delivery line, Доставка и връщане). Defaults live in the
    schema, so nothing is written into `settings_data.json`. Wording of the first differs from
    hestiahome's on purpose.
  - **The empty bag.** The login prompt is not drawn (the shop has no customers yet, and it is
    the one thing in an empty bag that is not about the bag). „КОЛИЧКАТА ВИ Е ПРАЗНА.“ centred, one
    black square button, „ПРОДЪЛЖЕТЕ ДА ПАЗАРУВАТЕ“, to the whole catalogue.
  - **The words are Bulgarian now without waiting for the store language**, the same stopgap as
    the three button strings of 2026-09-29: **41 values in `locales/en.default.json` were copied
    from `bg.json`** (everything under `sections.cart`, plus continue shopping, close, loading,
    the discount label, the quantity labels and the regular and sale price labels) and the file
    was edited line by line, so the diff is those lines and not a reformat. Three are our own and
    in **both** files, shorter than Shopify's („Към плащане“ for „Преминаване към плащане“,
    „Общо“ for „Очаквана обща сума“, „Бележка към поръчката“), so nothing changes when Bulgarian
    becomes the default. A small `cullinan.cart` block holds „Премахни“, „Размер {{ value }}“ and
    „{{ price }} за бр.“ in both. The cart page's strings change with them.
  - **How it is built, and the traps in it.**
    - **Scoped to `#CartDrawer`.** Dawn's drawer rules are two classes deep (`.cart-drawer
      .cart-item`) and `component-cart-items.css` loads asynchronously (`media="print"` then
      `onload`), after this sheet or before it. An id beats both either way. The sheet is linked
      after Dawn's drawer sheets in `layout/theme.liquid`.
    - **The table stays**, for the JS (`.cart-item`, `#CartDrawer-Item-N`, `quantity-input`,
      `cart-remove-button`, `.cart-item__error`, `.loading__spinner` all matter to `cart.js`).
      The `<tr>` is a grid, as Dawn makes it, and the four `<td>`s are placed with `grid-area`;
      the column headings stay for a screen reader only. The options live in the quantity cell so
      they run under the price: **beside it they wrapped on a phone**, a lone size number on its
      own line, which a first look at 375px showed.
    - **`'key' | t: price: x | money` applies `money` to the translation**, not to the price --
      the money string is made first. Caught before it was pushed.
    - **Parse-checked before the push**, because the drawer renders on every page: a Liquid error
      would have shown on all of them. (`liquidjs` does not know `{% style %}`, so
      `theme.liquid` and `main-product.liquid` report that one tag; every snippet parses.)
    - **A colour is never guessed here either**, and the options snippet reuses the same twin
      rule as the page.
  - **Checked live** (1000 and 1100 wide, 375): the panel is 460 x 700 at 1000; header 60px;
    picture 100 x 100; title 15px/550; options 11.5px capitals at 0.7; price 15px/500; stepper
    104 x 36 at 4% fill; „Премахни“ 12px underlined; the band `rgb(245, 244, 240)` across the whole
    panel with three one-line items at 12.5px; „ОБЩО“ 12px/600, the amount 22px/550; the checkout
    411 x 48, black, square, 15px/700. **Real clicks through the page's own buttons**: plus gives
    quantity 2, "(2)", „€200,00 за бр.“, a line of €400,00 and a total of €400,00 with the header
    bubble at 2; minus goes back; „Премахни“ gives the empty bag; adding the ring again opens the
    drawer on the new line. The checkout button is still `name="checkout"` in a form posting to
    `/cart`. At 375: a full-width sheet, a 90px picture, one-line options, the band's second
    line breaking in the middle, the checkout 327 x 48 with 24px below it, no sideways scroll;
    four lines (five pieces) scroll under the pinned footer and the total reads „€1.000,00“.
  - **Not seen, and why**: the hover colours (the pane's synthetic hover), the 0.4s slide (the
    pane produces no animation frames), a line with a discount, the order note, and Judge.me's
    "Reviews in Cart Drawer" embed (no reviews exist, so it draws nothing). **Shopify's preview
    bar** (an iframe, `#PBarNextFrame`) covers the bottom 40px of a preview page -- exactly where
    the checkout button is -- and its Hide bar button did not take a click in the pane; setting
    that iframe's `display` to `none` in the page (local to the tab) is how the footer was seen.
  - **Deliberately not built, because no policy or data stands behind it**: payment-method logos
    (which methods the store takes is not settled), a free-shipping bar (no policy), an upsell
    row (Shopify's recommendations are empty for this catalogue), a gift offer. **The order note
    stays off**: one switch in Theme settings > Cart, and the sheet already styles it.
  - **Left alone, worth knowing**: the **cart page** (`/cart`) is still stock Dawn in layout (its
    strings are Bulgarian now); it lists every option, the colour included. **The quantity
    stepper is kept** although the owner removed quantity from the product page: in the bag it
    lets a shopper buy two of a piece; removing it is one block. Checkout, the order emails and
    the Admin are Shopify's own and are not touched.

- **Header menu: no underline, black on hover, the site's arrow, a picture in the dropdown.**
  `assets/crown.css` ("The menu words never underline", "A picture at the right of the dropdown",
  "The same pictures on a phone"), `snippets/header-mega-menu.liquid`,
  `snippets/header-mega-promo.liquid`, `snippets/header-drawer.liquid` and two blocks in
  `sections/header-group.json` (2026-10-03, the owner: "i don't like that they underline i am
  talking about the collections fix that i just want them to become black and also change the drop
  down arrow to something else or make it look better ... we need the pictures that are showing
  when you for example click on rings and there is the collections Дамски and мъжки you have to
  [put a] picture in the right corner down like in moon magic i want the same ... if they put
  [pictures on the phone] we need that too or we can make it a little bit different").
  - **What it was.** Dawn's: the menu words and the dropdown's links underlined under the cursor,
    while open and on the current page; a solid caret that turned over; and a dropdown that was a
    145px off-white strip holding two small words, "ДАМКСИ" and "МЪЖКИ", at the left. The picture
    panel the owner asked for had been built in an earlier session (`mega_menu_promo`, "Mega menu
    image panel") but **never rendered**, for two reasons: the header had no such block
    (`header-group.json` had no `blocks` at all), and the panel was a list item inside the links'
    grid, which only reaches the right edge when the menu has two levels -- Пръстени has one, so
    Dawn draws its list as a plain block and the panel would have fallen under the links.
  - **moonmagic, measured live.** Their menu words are 15px/500 at 1px tracking and **underline
    under the cursor too** (their stylesheet says so; the owner's instruction outranks the
    reference here); there is **no arrow at all** beside a word with a dropdown; the dropdown
    **opens on hover**; their desktop menu only shows from about 1340px, below which they use the
    phone menu. The Rings dropdown is a white full-width panel 403px tall with a 1px hairline,
    three text columns (CATEGORIES, COLLECTIONS, MATERIAL: 16px/600 capitals, the links under
    them) and a **picture panel flush to the right edge, 390 x 401, from the top of the panel to
    its bottom**, its caption on the photograph in white capitals ("SHOP ALL RINGS", 16px/600)
    and a prev/next pair of 32px circles. On a **phone** the submenus are links only; the
    pictures are **a row of square tiles at the foot of the whole menu**, 302 x 302 at 375, a
    caption on each, swiped sideways with an arrow pair above.
  - **The words.** At rest 75% of the text colour, **pure black** under the cursor, on keyboard
    focus, while their dropdown is open and on the current page, over 0.2s; no underline in any
    of those states. The dropdown's own links do the same. Scoped to `.header__inline-menu`
    (three classes with `:hover`) so it beats Dawn's `.header__menu-item:hover span` and its two
    `details[open]` rules whatever the load order. **The top bar's links and the phone drawer's
    secondary links keep their underline**: the owner asked for those on 2026-09-13, and named
    only the collections now.
  - **The arrow** is the site's own (`icon-accordion-caret`): a thin chevron that flattens into a
    line while the dropdown is open, 10 x 6px with a 1.2px stroke (1.8px since the second round; the
    accordions' is 1.5), in
    place of Dawn's solid caret. **A trap**: it is a `<span>`, and the older rules that lift the
    label's own `<span>` onto the logo's lettering (`position: relative; top: 0.8rem`) caught it
    too and set it 8px up and 8px left, over the last letter. Both rules now say
    `span:not(.cj-caret)` (**not enough**: the two wing spans inside the arrow still matched, and no
    arrow was drawn at all until the second round made it `> span:not(.cj-caret)`), and the arrow's
    `top` is `calc(50% - 0.45rem)` because the wings hang
    below the box's middle: the chevron itself sits 0.9px below the label's centre, the same as
    Dawn's did. It reads the summary's colour, so it goes black with the word.
  - **The dropdown (first round -- replaced by the second round below).** A body of its own (`mega-menu__body`): the links and, when the header has a
    block for that menu item, the picture, in one grid -- `minmax(0, 1fr)` and **22-32rem for the
    picture** (24vw between), 6rem apart, inside the page width, so the picture ends on the page's
    right edge (the header icons') and the links start on its left (the logo's). A one-level
    dropdown's links are the content, not column headers over a list, so they are set as links
    (15px/500 capitals at 0.1em, 0.9rem of air). The panel's height is the picture's, **about
    420px** against moonmagic's 403, whatever the number of links. Without a block the body is a
    single column, as before. The picture is drawn from 990px, where the inline menu starts; it
    was hidden below 1200px.
  - **The picture** is square (like every picture here; its place, the corner, is the second
    round's), an empty flat panel (`rgb(242, 240, 236)`)
    until one is uploaded -- no placeholder graphic -- with **the label beneath it in live text**,
    not on it: words lie over a picture on this site only where this file names the exception, and
    moonmagic's caption on the photograph is not one. Black on hover and focus, no underline. If
    the owner wants theirs, it is one change: move the label into the panel.
  - **Two blocks were added to `header-group.json`**, "Mega menu image panel" for Пръстени and for
    Гривни, with no picture, labelled „Всички пръстени“ and „Всички гривни“ and linking to
    `/collections/пръстени` and `/collections/гривни` (both hold a product). **To put a picture in**:
    theme editor → Header → the block → Image. A block matches its menu word by title,
    case-insensitively; a third dropdown needs a third block.
  - **On a phone** the same blocks are a row under the menu and the top bar's links
    (`menu-drawer__featured`): square tiles nearly the drawer's width, so the next shows its edge,
    swiped with scroll-snap, the label beneath, no arrows. Drawn only when the header has such
    blocks; each is a flat square until a picture exists, so the phone menu shows two empty
    squares now.
  - **Tested offline** against a mock header (13 checks, scratchpad): the arrow, the body, the
    promo as a `div` after the list, an empty block and one with a picture, a block matched
    case-insensitively, a menu word without a block, no blocks at all, the phone row's place in the
    drawer and its absence.
  - **Checked live at 1440 and 375 (first round).** A real hover on Обеци: `rgb(0, 0, 0)`, no underline, the
    others still at 0.75; on a collection page the current word is black and not underlined;
    Пръстени open: summary black, the wings flat (a 10px line), the panel 1425 x 420, the body grid
    `920px 320px`, the picture 320 x 320 with its label beneath, the links at x 62.5 (the logo's
    left edge) and the picture ending at 1362.5; a real hover on a dropdown link: black, no
    underline. The arrow sits 9px after the label, absolutely placed, in Пръстени and in Гривни. At
    375 the drawer shows the row: tiles 271 x 271 on a 12px gap with 30px of padding, snapping, and
    the page does not scroll sideways.
  - **Two slips on the way, each live for minutes**: the links sat 40px too far in, because the
    list lost the `page-width` class whose padding had been overriding the browser's 40px indent on
    a `<ul>` (`.mega-menu__body .mega-menu__list { margin: 0; padding: 0 }`); and the arrow slip above.
  - **Not changed, worth knowing.** The dropdown still **opens on a click**, as Dawn's does;
    moonmagic's opens on hover -- one more rule would do it, not asked for. The two collections
    behind Дамски and Мъжки hold no product, and the entry is typed „Дамкси“ in the Admin: see Main
    menu under Waiting on the Shopify admin.
  - **Second round, the same day** (the owner: "i want the pictures boxes we put for a computer for
    the colections to be align in the right corner, position better the collection text it look
    alwful for compouter also make them go a little bitt up when you click on them and they become
    black as they are now and for the colection i want them to go for a computer like in moonmagic
    not in a colum but next to each other you can see that in their website, and the cart the icon
    for you profile and the search icon i don't want them bold we can bold the black navigation
    arrows and the text by 50%"; and a message later "in the navigation the collections i want them
    bold by 20% don't make them more bold they will look bad"). `assets/crown.css` ("Text-column
    mega menu", "The picture at the right of the dropdown", the menu-word rules),
    `snippets/header-mega-menu.liquid`, `snippets/header-mega-promo.liquid`. **It supersedes The
    dropdown and the picture's place above.**
    - **What it was, measured live before touching it.** A 1425 x 420 panel holding two 15px
      links, "ДАМКСИ" and "МЪЖКИ", stacked at the far left (x 63, y 136 and 174), and the picture
      floating 62px inside the right edge and 32px under the bar with its label beneath, so the
      left three quarters of the panel were empty. That is what "awful" was.
    - **moonmagic's Rings dropdown, measured again at 1440**: the text starts at their page
      gutter (20px) in **columns side by side, 200px apart** (x 20, 220, 420), each a heading of
      16px / 600 capitals (1.3px of tracking, a 20px line, 3px of padding and 15px of air under
      it) over its links (16px / 400, the first 700, a 22.4px line, 6px apart); **the first
      heading is 55px below the panel's top**; the picture is 390 x 401, **flush to the panel's top
      and to the page's right edge**.
    - **Columns in a row.** The links are `flex` columns at least 20rem apart (a column grows to its
      own heading, up to 30rem: „Гривни с циркони“ broke onto two lines in a fixed 20rem one, found
      on the live page), from the page's own left edge -- **62.5px at 1440, exactly the logo's** --
      with 16px / 700 capitals at 0.08em on a 20px line, 55px below the panel's top. The same for a
      one-level menu (Пръстени: Дамски, Мъжки, each link a heading with nothing under it yet) as for
      a two-level one, which is why a menu that later gets children under Дамски needs no change:
      they print under the heading in the same column, as moonmagic's do. The panel's padding is on
      the body (55px above, 40px below), not on the panel, because the picture sits flush in its
      corner. The visual menu (`visual_menu_item` blocks) keeps Dawn's own padding and spacing: the
      text-column panel is marked `mega-menu__content--links`, printed only for it.
    - **The picture is in the corner**: a square, flush to the panel's top and to the page's true
      right edge (no longer inside the page width), `clamp(24rem, 25vw, 36rem)` wide -- **360px at
      1440, 247.5px at 990, theirs 390** -- with its live label in a 44px strip beneath it that
      belongs to the panel, so the panel is the picture and its strip tall: **404px at 1440,
      theirs 403.** It is a child of the panel, not of the page-width body, because the body stops
      at the page's width and the corner is the page's edge; `mega-menu__content--with-promo` is
      printed only when the menu word has a block. The links keep clear of it: a right padding of
      the picture's width plus 4rem, less the page-width margin already between the body and the
      edge, so the gap is 40px at 990, 1440 and 1920.
      - **The label is still beneath the picture, not on it**, so the picture is flush to the top
        and the right but not to the bottom, as moonmagic's is. Words lie over a picture on this
        site only where this file names the exception; the owner asked for "the corner", not for a
        caption on the photograph. If they want theirs, the label goes onto the picture and the
        strip goes -- one change.
      - **A first version overflowed by 1px and grew a scrollbar**, caught in a local copy before
        the push: the panel's own 1px border sits inside its `min-height` (border-box) and the
        picture is placed in the padding box, so the 404px picture overflowed a 403px box and
        `overflow-y: auto` drew a 15px scrollbar that also pushed the picture 15px off the edge.
        `min-height` includes `2 * var(--popup-border-width)` now.
    - **The lift.** The menu words, their arrow, the dropdown's headings and links and the picture's
      label rise 0.25rem (2.5px, the buttons' own lift) under a real pointer and on keyboard focus,
      the words and their arrow also **while their dropdown is open**, which is what "when you click
      on them" became (a click opens it), and they go black as before. **A box that moves out from
      under a still cursor flickers**, so the menu words lift their inner text and arrow and never
      the summary, and the dropdown's links carry an invisible 0.4rem strip under them
      (`::after`) that moves up with them and still covers the ground they left. `translate`, not
      `transform`, because the arrow's wings and Dawn's old turn-over rule already use that. The
      lift alone waits for `hover: hover` and for motion to be wanted; the colour does not.
    - **Bolder: a fifth, after half again was tried and was too much.** The first ask, "bold the
      black navigation arrows and the text by 50%", was read as the header's menu words, their
      dropdown arrows and the dropdown's headings (navigation text too), and shipped as a 0.075em
      stroke -- half again. It was live for a short while, and the owner wrote "in the navigation the
      collections i want them bold by 20% don't make them more bold they will look bad". That also
      settled the reading: "the collections" are the menu words, as in their earlier message about
      the underline. The Jost files stop at 700 and the words were 700 already, so the extra is a
      stroke in the word's own colour, `-webkit-text-stroke: 0.03em currentcolor`: **0.375px on the
      12.5px words and 0.48px on the 16px headings**. Measured on the canvas at 12.5px, a stroke adds
      to the ink of a 700 capital 16% at 0.3px, 22% at 0.4px, 27% at 0.5px, 43% at 0.8px and 54% at
      1px, so 0.03em is about a fifth. **The dial is that one number** (two rules): 0.05em would be
      about a third, the 0.075em of the first try half again. **The arrow's stroke stays at the 1.8px
      asked for in the first message** (it was 1.2px, and not drawn at all until the bug below was
      found); the second message did not name the arrows, so they were left. **The other reading of
      the first message** -- the black bar at the very top, its ‹ › arrows and its text -- is not
      what the second one describes, and was not touched.
      - **A new font weight was not an option**: the Jost files carry 300 to 700, and a heavier
        file is a download, which was not asked for.
    - **Thin icons.** The 0.9 stroke on search, profile and bag is removed; they are Dawn's own
      outlines again. **It never reached the menu button**: the rule needs a `.svg-wrapper` and the
      hamburger and close icons are inlined without one (read live: `stroke: none` on both), so the
      notes that said the menu button was bolded were wrong and nothing was left to change there.
    - **A bug found on the way: the arrow had never been drawn.** The rules that lift the label onto
      the logo's lettering matched `span:not(.cj-caret)` as a **descendant** selector, and the arrow
      is a `<span>` holding two more `<span>` wings that do not carry that class. They were set
      `position: relative`, which made them inline and collapsed both to 0 x 0, so **no arrow was
      painted** beside Пръстени or Гривни -- on the live site from the day the arrow was introduced.
      The first round measured the arrow's box (9px after the label, absolutely placed) and never
      its strokes, and its note "the wings flat (a 10px line)" was read off that box. It is
      `> span:not(.cj-caret)` now, the label only. Found by measuring the wings in the local copy
      (`position: relative`, a 0 x 0 box) and confirmed on the live page by eye: **a screenshot was
      the check that was missing**, the same lesson as the stones row's arrows. **When a component
      is a box with parts inside it, measure the parts.**
    - **Checked.** Offline: 21 render checks of the snippet (a dropdown with and without a block, a
      block matched case-insensitively, a three-level menu, a visual menu word keeping Dawn's panel,
      an empty menu) and a parse check of every header snippet. In a local copy of the live page with
      the real stylesheet, at 990, 1440, 1920 and 375px: the panel never has a scrollbar or a
      sideways scroll, the headings sit at the logo's left edge 55px down with the second column
      200px along, the picture is square with a 0px gap to the right edge and to the panel's top, the
      list is 40px from it at every width, the three icons and the burger read `stroke: none`.
      **Live, at 1440, after the pushes**: the panel 1425 x 406, no scrollbar, no sideways scroll, the
      picture 360 x 360 at x 1065, its label 44px high, the headings at x 62.5 and 55px down, the
      second column at 262.5, Гривни's one heading on one line (193px) in a 213px column; the
      strokes read 0.375px on the words and 0.48px on the headings, the arrow's wings 1.8px and
      absolutely placed, flat while open. **Real hovers**: on Обеци black, no underline,
      `translate: 0 -2.5px`, neighbours at three quarters and still; on „Дамкси“ and on the
      picture's label each lifts and goes black alone; Пръстени open has its word and arrow lifted.
      At 375 live: the header is 47px, nothing scrolls sideways, the drawer still has its row of two
      tiles, and the three icons read `stroke: none`.
    - **The language was switched to Bulgarian by the owner in between**, so the cart drawer was
      re-read in it on the live page, with a ring in the bag: every word Bulgarian, aria labels
      included, no Latin word left, the empty bag too; „Добави в количката“ is 222px of label in
      its button. Checkout is still unseen. The test cart was emptied afterwards.
    - **Not changed.** The dropdown still opens on a click; the phone drawer and its picture row;
      the black bar at the top; the visual menu; the menu button; every colour.

## Current state

- Design foundation applied (palette, type, spacing). Committed and live on the draft theme.
- **За нас page** (2026-09-13): intro with four jump links — Нашето вдъхновение · Нашият дизайн ·
  Нашите материали · Въпроси и отговори — then photograph-and-panel blocks for Нашата история,
  Нашето вдъхновение, Нашият дизайн and Нашите материали, then the questions. History keeps its
  block but has no button: the owner did not want it as one. Linked
  from the top bar. All copy is drafted only from facts already on the site or on the old
  site. **At the owner’s instruction, nothing on it says the business is a family one.**
  - **The words of the four story panels were cut on 2026-10-03** to a lead and two short
    sentences each (see About page under Custom code). The paragraphs that follow describe the
    longer text they replaced: the structure and the facts still hold, the wording does not.
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
  - **The questions were rebuilt 2026-09-30, at the owner's request**: "remove От какво
    злато са бижутата and Може ли да правите гравюри keep the other ones and add something
    that will really help someone with the products i sell". Those two went; Как доставяте
    поръчките and Мога ли да видя бижутата на живо stayed untouched.
    - **Six added, in the order a buyer needs them** -- choosing, then making and sending,
      then seeing it in person: Как да разбера своя размер на пръстена (European ring numbers, tried on in the shop with numbered sample rings; no
      at-home method is given, because the owner has not supplied one), Истински ли са камъните (HRD Antwerp, and which stones
      the shop works with), Ще потъмнее ли среброто (925 with rhodium plating), Как да се
      грижа за бижуто си (the same four care lines the product page carries), Колко време
      отнема изработката (made to order, 5-20 working days), Мога ли да върна бижу (14
      days). Eight rows in all.
    - **Every answer is a fact already in this file.** Nothing is said about the delivery
      price, the warranty, or whether rhodium can be re-plated -- none of those is settled,
      and the last one in particular reads like a service promise if stated loosely.
      The gold question went, so 585 against 750 is no longer answered here; it is still
      explained in Нашите материали directly above on the same page, and in Качество и
      детайли on the product page.
    - **The same section now ends the product page too** ("add this when we open some
      product to see it"), after Може да ви хареса. Confirmed live on Пръстен с верижка:
      eight rows, the heading, and the first one opens on the right answer.
      - **It is a second, independent copy.** Shopify block content lives in the template,
        so `templates/page.about.json` and `templates/product.json` each hold their own
        set -- **a change to one has to be made to the other**, or the two drift. Pointing
        both at one Shopify page is not an option: a `collapsible_row` takes a page per
        row, not per section, which would mean eight pages.
      - It overlaps the buy box on purpose in two places -- care is also in Качество и
        детайли, and delivery and returns in Доставка и връщане. The owner asked for the
        whole section rather than a trimmed one.
    - **The ring size answer was corrected twice the same day, and the second time it was
      researched.** First version: invented -- millimetres, and a diameter times 3.14
      method, neither of which the owner had ever said. The owner corrected it ("we are
      not working in millimeters ... we are working with the europe sizes ... 51 52 53"),
      then again ("i tell you to look for information then write also don't tell them to
      come in our shop they can do it in every shop for jewellery write it more
      professional, i found the name it is a ring sizer").
      - **Current answer**: European numbers like 52, 53, 54; a **ring sizer** -- a set of
        numbered sample rings any jeweller uses -- tried on the finger the piece will be
        worn on; the right size passes the knuckle with light resistance and sits
        comfortably, neither falling off nor pinching; a wider band fits tighter, so size up
        when between two; measure late in the day, when fingers are not cold. No shop
        invitation and no at-home method, since the owner gave neither. Heading is now
        "Как да определя", not "Как да разбера".
      - **Sources**: Brilliant Earth, David Yurman and Dean Davidson for the knuckle, light
        resistance and width advice; Capino.bg for the European scale.
      - **One fact worth knowing that the owner may not expect**: European ring numbers
        **are** the finger's inner circumference in millimetres -- Capino.bg's sizing
        table labels its first column "Обиколка на пръста (мм)" -- so size 54 is 54 mm. The
        owner's "not millimetres" is about how the shop works (numbered sample rings, not a
        ruler), which is right, and the copy therefore never mentions millimetres at all.
      - **Lesson**: the first version was written from assumption when the instruction was
        to look for information. Research before writing customer-facing copy.
    - **Истински ли са камъните removed** from both copies at the owner's request, same
      day. Seven rows remain.
    - **More space above Може да ви хареса on every product page**, same day: the row's own
      top padding is capped at 100 by the schema and was 80, so it goes to 100 and the
      product section's bottom padding goes 12 to 32. Measured from the last line of
      content to the heading that is about 112px before and 152px after; 120 when measured
      from the product section's own bottom edge, which includes its padding. Confirmed on
      two products, the ring and the bracelet. It lives in `templates/product.json`, so it
      applies to every product.
    - **The ring size question shows only on rings, 2026-10-01** ("make it appear just for
      rings and in За нас"). A FAQ row cannot be conditional by itself, so
      `sections/collapsible-content.liquid` gained an optional **Show only for this product
      type or collection** setting on each row. Empty, the row always shows -- which is every
      row on the About page, where `product` is nil. Filled, on a product page it shows only
      when the product's type, or the title or handle of a collection it belongs to, matches
      (compared lower-cased, so Cyrillic case does not matter).
      - **Both are checked because product types are empty on this store** -- all four test
        products read `type: ""` except one misspelt "earings" -- while collections are real:
        the ring is in Пръстени and the bracelet in Гривни. A product type will work as soon
        as the owner sets one, and is what the type-by-stone collections need anyway.
      - Set to `Пръстени` on the product page's ring size row only. **Live on all four test
        products**: the ring shows seven rows and the bracelet, earrings and pendant six,
        and the About page keeps all seven.
      - **Real rings must be in the Пръстени collection, or have Product type Пръстени**, or
        the row will silently not show on them. Worth knowing when real products are loaded.
      - Pushed in two steps, section then template, per the validator lag.
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
  benefits row (see Silver banner above), then one story band (the history, design and materials as three short facts;
  see Atelier section above), the custom-request band (see Custom request section) and a row of
  customer reviews (see Reviews section) follow; the newsletter is still Dawn's default.
- Dawn's placeholder illustration has been removed from the hero. The empty image slot is an
  empty div, and Dawn's base.css hides every empty div (`div:empty { display: none }`). On
  phones crown.css shows it again as a flat stone square. **On desktop it is still hidden**,
  so the hero there is off-white rather than the stone band this note used to promise; the
  layout holds either way, since the banner keeps its height. Not changed — the owner has
  not asked about the desktop hero.
- **No real products yet. No photography yet.** The homepage cannot be finished until the
  atelier photo session happens. Four test products appeared by 2026-09-22 (Пръстен с
  верижка, Обеци, Висулка плочка, Гривна с червен конец) — enough to build and check the
  product page against, but all priced at €0,00, all with the vendor still reading Crown
  Jewellery, none tagged and none really described. See the last entry under Waiting on the
  Shopify admin for what each one needs.
  - **Test photographs exist since about 2026-10-01**, uploaded by the owner (AI renders and
    one lifestyle picture): the ring has four, two of them shown once variant pictures are
    hidden, and the pendant, earrings and bracelet one each. All 3:4 portrait (1086 x 1448)
    except the bracelet, 4:3. The ring is priced at €200,00 now; the other three are still
    €0,00. "No photography yet" above is out of date; the layout holds either way. See
    Product gallery under Custom code for what this did to the product page.
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
  - **Read live 2026-10-03**: five items -- Пръстени (Дамкси, Мъжки), Обеци, Висулки, Комплекти,
    Гривни (Гривни с циркони). The first child is typed **„Дамкси“**; it is meant to read „Дамски“,
    which is a rename in the Admin. **Both of Пръстени's children point at collections that hold no
    product** (`/collections/дамски`, `/collections/мъжки-пръстени`): a dropdown link to an empty
    page, which "Never link to an empty collection" rules out. The owner built these two, so they
    either get products or come out of the menu.
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
- **Collections.** Six existed as of 2026-09-16: Висулки, Гривни, Диаманти, Комплекти,
  Обеци, Пръстени.
  - **Largely done by 2026-09-29**, checked live on the preview rather than assumed. Every
    stone collection answers 200 now -- Камъни, Циркони, Диаманти, Перли, Сапфири, Рубини,
    Изумруди, Оникс, Опал -- and many type-by-stone ones exist too (Висулки с циркони,
    Комплекти с перли, Обеци с диаманти and so on), plus Дамски, Мъжки and Аксесоари.
    **What is missing is products**: only Циркони, Диаманти and Камъни hold any, because
    the stone tags are still not set on the four test products. So the collections are real
    but mostly empty, and the no-empty-collection rule under How we work is now a question
    of **tagging**, not of creating anything.
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
- **The product page's own metafields** (2026-09-22, for the `product_specs` block -- see
  Product page under Custom code). All under Settings → Custom data → Products, namespace
  and key exactly as written, or the row will not print. Every one is optional on any given
  product; a row appears only when it is filled, so the page never shows an empty label.

  | Key | Type | Example | Prints as |
  |---|---|---|---|
  | `custom.metal` | Single line text | 14К жълто злато | Метал |
  | `custom.proba` | Single line text | 585 | Проба |
  | `custom.weight_g` | Decimal | 2.4 | Тегло — 2.4 г |
  | `custom.stone` | Single line text | Циркон | Камък |
  | `custom.stone_count` | Integer | 3 | Брой камъни |
  | `custom.stone_size` | Single line text | 4 мм | Размер на камъка |
  | `custom.stone_weight_ct` | Decimal | 0.25 | Тегло на камъка — 0.25 ct |
  | `custom.cut` | Single line text | Брилянтна | Шлифовка |

  The first four are the ones the owner asked for by name and matter most; the rest only
  apply to pieces with a real stone. Adding a row later means one more `if` in
  `sections/main-product.liquid`, not a rebuild.
- **Pages the product page waits on.** Each is a plain Shopify page whose content is then
  pointed at from the theme editor, so one page serves every product:
  - **Качество и детайли** — the shared prose under the spec list (what the quality means,
    that pieces are made in the workshop, any guarantee). Set on the Specification list
    block, under "Or a page".
  - **За камъка** — what the stones are. The accordion stays invisible until this exists.
  - **Доставка и връщане** — delivery time, delivery price, carriers, the return window and
    the warranty. **Blocked on the owner and the accountant; not to be written from
    assumption** (see Legal pages under Working agreements). The accordion stays invisible
    until it exists, by design.
  - **Таблица с размери** — the ring size guide. Once it exists, a `popup` block goes on the
    template beside the size picker; until then there is deliberately no link (Dawn draws
    the link whether or not a page is behind it).
- **Judge.me** (free plan, the owner's choice 2026-09-22) for reviews. Installing it is all
  that is needed on the theme's side for the stars: Dawn's `rating` block and the product
  cards both read `product.metafields.reviews.rating`, which the app writes. The review list
  itself is the app's own section, added in the theme editor.
  - **Installed 2026-10-01** after the owner asked "can we add customers reviews" and, first,
    hesitated over paying ("i need to pay for this i think it is not a good idea to do that
    now"). Judge.me's Forever Free plan is $0 with no end date; its 15-day trial is of the
    paid Awesome plan ($15/month) and was declined. **Installing an app is the owner's to
    do** -- it happens in the Admin and grants the app access to the store. See Customer
    reviews (Judge.me) under Custom code for what was written back and how it is styled.
  - **The steps the owner followed, checked against Judge.me's own help rather than from
    memory**: install
    Judge.me Product Reviews from the Shopify App Store on the free plan; then, in the
    theme editor of **this draft theme** (cullinan theme/main, not the published Horizon),
    turn on the **Judge.me** app embed (the third icon in the left bar, App embeds); then
    open Products > Default product, **Add section > Apps > Review Widget**, and save. The
    widget is a section, not a block inside the product information, and carries its own
    stars and "Write a review" button. Judge.me also writes Shopify's standard
    `reviews.rating` and `reviews.rating_count` metafields, which is what our `rating` block
    and the cards read.
  - **Shopify commits the template and `config/settings_data.json` back to GitHub when the
    owner saves.** Pull before touching either -- done here, and the three commits arrived
    as a fast-forward.
  - **No app block went into the template by hand**, and none should: its type carries the
    app's own extension id (`shopify://apps/judge-me-reviews/blocks/review_widget/...`),
    which only the theme editor writes, and a template naming a block Shopify cannot
    resolve risks being refused whole.
  - **Nothing will show until real customers write reviews**, or the owner imports real ones.
    None are to be invented to fill it.
- **Stock is not counted: the pieces are made to order** (the owner's decision, 2026-09-28,
  "i don't want my products to have quantity"). Every variant of Пръстен с верижка had
  **Track quantity on and a quantity of 0**, which was the only reason the page read SOLD
  OUT -- Shopify refuses to sell a tracked variant at zero. Nothing in the theme caused it
  and nothing in the theme could fix it.
  - **Settled the same day in the Admin, and all 112 variants are buyable now.** The owner
    took the second route rather than the first: tracking is still on
    (`inventory_management: shopify`) with **Continue selling when out of stock** ticked,
    so nothing is ever blocked. Turning Track quantity off entirely is the other way, and
    is what moonmagic's own made-to-order model amounts to. Either is fine; this one keeps
    a count if a count is ever wanted.
  - **The stock status line was removed from the theme too**, at the owner's request ("i
    want to remove the in stock") -- Dawn's `inventory` block, out of `templates/product
    .json`. It would have printed nothing for an untracked variant anyway, but removing the
    block means the page never talks about stock levels in either direction, whatever the
    Admin setting is. The button still says Sold out when a variant genuinely cannot be
    bought; that is the buy-buttons block, untouched.
  - **112 variants on one ring, and 84 of them unreachable.** 7 sizes × 4 colours × 4 metals,
    where the colour option exists only to feed the card swatches and is hidden on the
    product page. Only the combinations whose colour and metal name the same gold can be
    chosen, so **28 would do the same job**. Every inventory decision above is four times
    the work because of it. Worth collapsing into one metal option carrying the swatches
    before real products are loaded -- offered to the owner 2026-09-28, not yet answered.
- **The four products that exist are test data, not real listings** (checked 2026-09-22):
  Пръстен с верижка, Обеци, Висулка плочка, Гривна с червен конец. Every one needs work
  before the page can be judged on anything but layout:
  - **Price is €0,00 on all four**, so every one shows as Sold out.
  - **Vendor reads "Crown Jewellery" on all four** — the old shop name, and the wrong field
    entirely: Vendor prints above the product title, where the stone or metal belongs (see
    Product Vendor field above). Right now every card and every product page says
    Crown Jewellery.
  - **No tags at all**, so the stone collections and the Камък filter have nothing to work
    from (see Stone filters above).
  - **Product type** is empty on three and "earings" on the fourth — misspelt, and in
    English. The type-by-stone collections need it set to Пръстени, Обеци, Висулки, Гривни
    or Комплекти.
  - **Descriptions are one word** ("Пръстен", "Обеци") or empty.
  - Ring sizes are already right: 54-60, European ring numbers. One variant reads
    "54 55", which looks like a typo for 54.
- **Gold-colour swatches: fixed on Пръстен с верижка, confirmed live 2026-09-25.** The gap
  was store data, not the theme — `templates/product.json` already had the variant picker's
  `swatch_shape` set to `circle`, and `snippets/card-product.liquid` already looped up to
  five swatches from `option.values.first.swatch` onto the card; both stock Dawn mechanics,
  reading straight from Shopify's own per-value swatch data. The owner added a real **Color**
  option in the Shopify Admin (Products → the product → Options), using Shopify's own
  Color-metaobject swatch type, with three entries — Gold `#D49A06`, Rose gold `#B76E79`,
  White `#FFFFFF` — each with a real colour assigned. Confirmed live: three coloured circles
  render both on the product page's own variant picker and on its collection card. (Since
  2026-09-28 only the card keeps its circles; the product page draws the same option as
  text pills -- see Options are words on the product page under Product page.)
  - **Still to do, the same way, on the remaining products.** Гривна с червен конец has since
    gained its own Color option too (Rose gold, Gold, Silver, White — confirmed live
    2026-09-26), so it and Пръстен с верижка are both done now. Обеци and Висулка плочка still
    have no Color option at all.
  - **The two open questions that stood here were settled by the owner in the Admin on
    2026-09-28, their own way** (the English `Jewelry material` option, and the English Color
    entry names). Where it stands, read live that day:
    - **Пръстен с верижка has three options and 112 variants** (7 sizes × 4 × 4), renamed and
      extended by the owner in the Admin on 2026-09-28 and after: **изберете вашия размер**
      (54 55, 56, 55, 57, 58, 59, 60); **Цветове на златото**, the option with swatches,
      values жълто злато / бяло злато / розово злато / **Сребро**, which feeds the card circles;
      and **Изберете вашия метал**, values 14К жълто злато / 14К бяло злато / 14К розово злато /
      **925 сребро**. (Read live 2026-10-03: the owner has added the `Сребро` colour entry since
      the note that stood here said silver was what kept the colour row visible.)
      - **The colour row is hidden on this page** since 2026-10-03: every material value names a
        colour (`925 сребро` names `Сребро`), so the rule is met. See The colour row is hidden on
        every product with a material option under Product page.
    - **Гривна с червен конец has 8 variants and English option names still**: `Jewelry
      material` (14К жълто злато | Silver) and `Color` (розово злато | жълто злато | Сребро |
      бяло злато -- the third read `Silver` until the owner translated it). Its colour row is
      hidden since 2026-10-03 (English "Silver" is read as „сребро“, so it meets `Сребро`) and its
      page offers **yellow gold and silver only**: no material value names rose or white gold.
      Adding `14К розово злато` and `14К бяло злато` to Jewelry material makes them reachable,
      with no code change.
    - **Обеци and Висулка плочка still have no options at all.**
    - **The entries are shared by every product that uses them.** A piece in 18K needs its
      own entries („18К жълто злато“), not a rename of these. **Translate & Adapt** is the
      way to Bulgarian option names once Bulgarian is a store language; until then the names
      are whatever is typed in the Admin.
- **Checkout** (2026-10-03, the owner: "when we click on the buttons към плащане there is a page
  which with the payment i want to make our own but use for example hestaihome and moonmagic and
  add something ours"). **Nothing about it lives in this repository.** The checkout is Shopify's
  own page, branded from Settings → Checkout → Customize (the checkout editor) and by what the
  store's payment, shipping and policy settings say; the theme cannot restyle it. **Not started**:
  it affects checkout and payments, which are the owner's to decide, and the owner has not said
  which Shopify plan the store is on.
  - **Our own cannot be seen from here.** `/checkout` on the preview link redirects to the shop's
    primary address and lands on the storefront password page, "Opening soon"
    (`https://2fp38p-az.myshopify.com/en/password`) -- and the path carries `/en`: **Bulgarian is
    not a published language, so the checkout would read in English** whatever the theme says. The
    password was not entered. To look at it, the owner has to open the store with the password.
  - **hestiahome.bg's, measured live** (a pillow in the cart, cleared afterwards). Shopify's
    standard multi-step page in Bulgarian (`/bg-bg/`): the crumbs „Количка › Информация ›
    Доставка › Плащане“, express buttons, Контакт, Адрес за доставка, a grey order-summary
    column with the discount field, the button „Продължете към изпращането“. Their brand: their
    own black wordmark at the left, **one red** (`#E34F4F`) for the primary button, the links and
    the active crumb, **12px radius** on buttons and fields, and the **default system font**, not
    their theme's Jost.
  - **moonmagic's, measured live.** A one-page checkout (contact, delivery, shipping method and
    payment on one page) with express buttons (Shop Pay, PayPal, Google Pay); their wordmark at
    the left (200 x 21) over a 1px hairline; **square corners everywhere** (0 radius on the fields
    and on the pay button); the pay button `#2F2F2F`, 50px, 14px/500; their own typefaces in
    light weights (custom fonts); and under the order summary a block of their own, **„MORE THAN
    JEWELRY“ with three icon-and-text lines** (600K+ customers, real gems, warranty), plus a
    loyalty line. As far as is known, the custom fonts and that block are what only Shopify Plus
    allows.
  - **What the checkout editor lets any plan do** (to be confirmed in the Admin, whose labels vary
    a little): the logo, the colours, the corner radius of buttons and fields, a font from
    Shopify's own list, the summary column's background, which contact and address fields are
    asked for.
  - **Proposed for Cullinan, from the design system (nothing applied)**: the same logo file as the
    header, at the left; page `#FCFCFB`, text `#221F1C`; **square corners** on buttons and fields,
    like Add to cart, the cart's button and moonmagic's; the primary button **black `#000000` with a
    white label**, the site's own button exception; links and focus in `#221F1C` -- not the gold and
    not the pink, neither reads on white; the order-summary column on the greige **`#F5F4F0`**
    (scheme-6, the same band as the cart's reassurances); the **default system font**, because no
    font in Shopify's list carries Cyrillic (found 2026-09-14), so a library font would draw the
    digits in one typeface and the Bulgarian letters in another -- uploading the self-hosted Jost
    files is the Plus way out.
  - **Ours, on any plan**: the words in the places the checkout does print. The cash-on-delivery
    method's name and its "additional details" (Settings → Payments: „Наложен платеж“, „Плащате в
    брой на куриера при получаване“), the names of the shipping rates, the policy links at the foot
    (Refund, Shipping, Privacy, Terms: the accountant's, not drafted here), and a required phone
    number (couriers need one; company name and address line 2 can be off). **Nothing is drafted
    into the Admin**: the delivery price is still unsettled, and so is whether card payments are on
    at all.
  - **First, and not about design**: publish **Bulgarian** (Settings → Languages), or none of the
    above will read Bulgarian; `locales/bg.json` is already complete. The order-confirmation emails
    (Settings → Notifications) are plain editable templates on every plan and would carry the logo
    and the same words.
- **Photographs** are staged in `photography/` (see its README for naming and shapes). That
  folder is outside the theme directories, so Shopify never sees it, and the image files are
  gitignored — git is for the theme, not a photo library. Shopify's Files library has no
  folders, so filenames do that job: `prasten-3353-1.jpg` for catalogue, `theme-` prefix for
  anything the theme editor uses. Latin letters only; Cyrillic filenames break in URLs.
- **Product photography should be square.** The product rows are set to a square crop so the
  cards line up; anything shot to another shape will be cropped. Since 2026-10-02 the
  product page's own gallery crops to squares too (see Product gallery under Custom code),
  so the owner's 3:4 uploads lose 12.5% top and bottom there.
