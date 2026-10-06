# Cullinan Jewellery — current design system

The **current** state of the theme's look, read from the implementation on 2026-10-04 (`config/settings_data.json`,
`snippets/theme-fonts.liquid`, `assets/crown.css` and the section stylesheets). When this file and the code disagree,
the code is the truth and this file is out of date: fix this file.

- **Visual companion**: the Design System artifact, https://claude.ai/artifact/FdjiCyjant7YY3qKoVoo9s (version 38,
  2026-10-04). It shows swatches, buttons and the reasoning per decision. It is a snapshot; this file is the written
  source. Update both in the same pass when a token changes (how to republish: see `docs/theme-guide.md`, "Tools").
- **History** of how each value was reached is in `docs/changelog.md`, and in full detail in
  `docs/archive/CLAUDE-original.md`. This file records only what is true now, plus the reason for each exception.

---

## 1. Direction

**"Мрамор" (direction C, chosen by the owner 2026-10-04)**: marble and rose gold. Warm, light grounds; espresso ink;
rosewood as the one action colour; Prata headings in sentence case; Jost for everything else. Restrained, generous
space, nothing burned into photographs.

Identity comes from Cullinan's own facts (workshop in Veliko Tarnovo, handmade since 1991, own 3D designs, personal
service), not from any reference brand. References are used per question (see `CLAUDE.md`, "References").

## 2. Colour

### Colour schemes (`config/settings_data.json`, `current.color_schemes`)

| Scheme | Background | Text | Button / label | Used for |
|---|---|---|---|---|
| scheme-1 | `#FBF8F6` marble white | `#2A1E1A` espresso | `#6E3B30` / `#FBF8F6` | Page ground, product cards, trust band, product page |
| scheme-2 | `#EBDFD8` pale rose-clay | `#2A1E1A` | `#6E3B30` / `#FBF8F6` | Alternating bands: story band, custom-request band |
| scheme-3 | `#2A1E1A` espresso | `#F3EAE5` | `#F3EAE5` / `#2A1E1A` | Dark bands (the newsletter section's scheme) |
| scheme-4 | `#8C6A2E` muted gold | `#FFFFFF` | `#FFFFFF` / `#8C6A2E` | Badges and accents only |
| scheme-5 | `#E9D9D0` rose-clay | `#2A1E1A` | `#6E3B30` / `#FBF8F6` | Hero, Контакти banner, **footer** |
| scheme-6 | `#F3EBE6` pale marble | `#2A1E1A` | `#6E3B30` / `#FBF8F6` | Stones band, review cards, cart reassurances, **menu dropdown and phone drawer**, product-page social band |
| scheme-7 | `#D8DFBF` milky matcha | `#221F1C` | `#3D5229` / `#FFFFFF` | Not on the homepage any more (kept) |
| scheme-8 | `#F1E3DC` marble blush | `#2A1E1A` | `#6E3B30` / `#FBF8F6` | Контакти open-row panels, footer social hover on Контакти |

Rosewood label on rosewood button: 8.5:1. Espresso on marble white: well above 4.5:1.

### Literal colours (not in a scheme; in `assets/crown.css` or section CSS)

| Value | Where | Why it is a literal |
|---|---|---|
| `#F1E6DF → #E1CDC2` (180°) | Hero ground on a computer; hero empty slot on a phone; empty category tiles | The hero's own gradient, reused so empty slots look designed |
| `#E1CDC2` | Hero text panel on a phone; marquee boxes | Phone panel colour |
| `#EADBD2 → #D9C4B8` | Silver banner (hidden) | A deeper relative of the hero |
| `#2A1E1A`, field `#382B26`, text `#F3EAE5`, outline `#85736B` | Newsletter band | Dark band with its own form colours |
| `#CDB5A8` (`--footer-line`) | Hairlines inside the footer | The footer is scheme-5; the old pink vanished on it |
| `rgba(24,14,9,.66 → 0)` gradient | Over the hero photograph, from the left, ≥750px | Keeps the light hero words legible |
| `#D62246` ruby, white label (5.0:1) | Hero button only | **Exception**, see §8 |
| `#E6BAB9` | Add to cart hover fill; header icon hover line | Kept pink hover; espresso label 9.3:1 |
| `#B76E79` rose gold | Review stars (theme, review cards, Judge.me) | Graphic, 3.6:1 (graphics need 3:1) |
| `rgb(0 0 0)` | Buy-box text, footer text, stones row lines, homepage social heading | **Exception**, see §8 |
| `#1877F2`, `#C13584` | Homepage "Вижте работата ни" Facebook / Instagram buttons | **Exception**, see §8 |
| `rgb(240 232 226)` / `rgb(233 217 208)` | Empty picture slots / menu picture slots | Warm flat placeholders, never a graphic |
| `rgba(235,223,216,.88)` (pale rose-clay) | 30px circle behind the card bag icon (hover `#E9D9D0`) | The cards' marble white would vanish on white product photos |

**Rule**: no pure white or pure black as a *ground*. Pure black text is used only where listed above.

## 3. Typography

| Role | Face | Weight | Case / tracking | Source |
|---|---|---|---|---|
| Headings (`h1`–`h6`, `.h0`–`.h5`) | **Prata** ("Prata Theme"), Georgia fallback | 400 (its only weight) + `-webkit-text-stroke: 0.012em` (≈ +21% ink) | Sentence case, `letter-spacing: 0` | `snippets/theme-fonts.liquid`, end of `crown.css` |
| Text | **Jost** ("Jost Theme"), variable 300–700 | 400 | Normal | `snippets/theme-fonts.liquid` |
| Small labels, buttons, eyebrows, legends | Jost | 500–700 | Capitals, 0.08–0.14em | Component rules |
| Header menu words | Jost | 700 + 0.03em stroke | Capitals | `crown.css` |

- Fonts are **self-hosted** woff2 in `assets/` (Cyrillic and Latin; Jost also latin-ext and italic), declared with
  `unicode-range`, preloaded. Shopify's font library has **no Cyrillic** (tested 2026-09-14): never pick fonts in the
  theme editor; the pickers do nothing.
- Headings are `font-synthesis: none`: asking Prata for bold gives the regular face, not a fake bold.
- The heading stroke is excepted on Jost labels that use heading tags: `.announcement-bar__message`,
  `.benefit__heading`, `.footer-block__heading`, `.cart__empty-text`, `.drawer__heading`, `.totals__total`,
  `.text-body`, `.caption-with-letter-spacing`.
- Heading scale and body scale: 100 (Dawn's minimum).
- Hero heading: 40px maximum on a computer (hero-only rule); generic banner headings use a `clamp()` in `crown.css`.
- **Changing a font** = new woff2 files (with Cyrillic) + `theme-fonts.liquid`. Check Cyrillic first: digits and
  Bulgarian letters must render in the same face.

## 4. Layout and spacing

- Page width 1400px; Dawn's page gutter (1.5rem phone, 5rem from 750px).
- Grid spacing: 24px horizontal, 40px vertical (`config/settings_data.json`).
- Section padding is per section (Dawn ranges, step 4). Mobile padding renders at 0.75× the setting.
- Between two coloured bands: 40px of page ground (30px on phones), done with margins, not padding.
- Breakpoints in use: 750px (phone / tablet), 990px (tablet / computer; inline menu, 3-column grids).
- Product grids: 3 across from 990px (cards 30% of the row, gaps share the rest), 2 across on phones with 12px side
  margins and an 8px gap (171.5px square pictures at 375px, 144px at 320; 2026-10-06); product rows: one card plus a peek on phones (72vw ≈ 270px at 375, 2026-10-06; Наскоро
  разгледани 1.27 columns ≈ 269px).

## 5. Corners, borders, shadows

- **All corners square**: buttons, inputs, cards, media, badges, variant pills, popups (`*_radius: 0`).
  Exceptions: the round ring around trust-band icons, colour swatch circles, the About page jump-link pills.
- Hairlines: `rgba(var(--color-button), 0.16–0.22)` (rosewood at low opacity) for dividers and card borders.
- Shadows: none, except the filter dropdown panel (`0 1.6rem 4rem rgba(42,30,26,.1)`).

## 6. Buttons

- **One shape: square.** `buttons_radius: 0` (since 2026-10-04; it was a 40px pill).
- **Computer (≥750px)**: every call-to-action button 5.6rem tall, 14px capitals, 0.14em tracking, weight 500
  (hero, view-all, story, stones, Контакти, custom request; `crown.css` "Buttons, one language", `html body` prefix
  for specificity). Hero button 34rem wide.
- **Phones**: the sizes the owner tuned per component remain (e.g. hero 4.8rem/1.4rem, others 5.4rem/1.2rem).
- Primary: scheme button colour fill (rosewood on light schemes), label in the scheme's label colour.
- Hover/focus: fill drops to transparent with a 1px inset outline in the button colour, label takes the button
  colour; 0.35s colour transition; lifts 0.25rem (`animations_hover_elements: vertical-lift`), no lift under
  reduced motion. **Exception**: Add to cart fills with `#E6BAB9` on hover.
- Product cards do not lift or zoom on hover (switched off in `crown.css`).
- Not `.button` and untouched: the newsletter field button (`.field__button`), social links (`.list-social__link`).

## 7. Imagery

- **Nothing burned into a photograph** (no logo, slogan, price, "925", badge). The most important rule.
- Product photographs: square, one soft neutral background across a set, last picture worn.
- Hero: any shape; positioned at `50% 70%` (a focal point set in Shopify Files overrides it).
- Empty slots are flat warm colour; **no placeholder graphics, no stock images**. AI images are allowed when the owner
  makes and uploads them.
- Shot list: `photography/README.md`.

## 8. Intentional exceptions (and why)

| Exception | Where | Reason | Status |
|---|---|---|---|
| Words over a photograph | Hero; Контакти banner and footer social block; newsletter; silver banner (hidden) | Owner's explicit choices (2026-09-06 to 09-21) | Current |
| Bright ruby button `#D62246` | Hero only | Owner wants the main button to stand out (2026-09-21, 10-04) | Current |
| Pure black text | Buy box, footer, stones lines, homepage social heading | Owner asked for "the blackest" text by name | Current |
| Facebook blue / Instagram magenta buttons | Homepage "Вижте работата ни" | Owner's request (2026-09-20); 3.1:1 and 3.7:1 on the clay footer copy | Current, **flagged** (contrast, palette) |
| Pink hover `#E6BAB9` | Add to cart, header icons | Kept from earlier design | Current |
| Pills | About page jump links | Owner's choice 2026-09-13; navigation chips, not buttons | Current |
| White (`#fff`) behind product photos | Наскоро разгледани, Най-продавани, Може да ви хареса | Owner's request 2026-10-06: the photos are shot on white, so whole photos in square frames show no bands | Current |
| Round shapes on cards | Bag icon circle (top-right), photo circles (bottom-left), colour swatches | Owner's request 2026-10-06 (circle behind the bag); indicators and swatches are round by nature | Current |

## 9. Motion

- Hover lift 0.25rem on buttons; reveal-on-scroll (Dawn) on.
- Accordion arrow: two bars forming a chevron that flatten into a minus, 0.4s `cubic-bezier(0.22,1,0.36,1)`.
- Everything decorative stops under `prefers-reduced-motion`.

## 10. Words

- Customer-facing copy in Bulgarian; calm, sure, never sold hard; no exclamation marks.
- Only confirmed facts (the facts list in `CLAUDE.md`). Never invent policies, prices, warranties or reviews.
- Prices print as whole numbers when whole (`money_without_trailing_zeros`); checkout and emails are Shopify's.

## 11. Superseded decisions (do not reapply)

| Was | Replaced by | When |
|---|---|---|
| moonmagic as the default reference for everything | References chosen per question (`CLAUDE.md`) | 2026-10-04 |
| "Fourteen luxury rules" in the old CLAUDE.md | Treated as **observations**, not universal rules | 2026-10-04 |
| Pill buttons (40px) | Square | 2026-10-04 |
| Rope line under the hero claims and above the footer | Removed | 2026-10-04 |
| Capitals strip under the hero (`hero_facts`) | Hidden; trust band replaces it | 2026-10-04 |
| Jost headings (700 / 550 / 400) | Prata 400 | 2026-10-04 |
| Pink `#F3E1DB` / moonmagic gradient, black newsletter, black buttons | Direction C palette | 2026-10-04 |
| Red hero button `#E63946` | Ruby `#D62246` | 2026-10-04 |
| Buy-box price 22px, card price 18px | 18px / 15px | 2026-10-04 |
| Hero heading 57px | 40px max | 2026-10-04 |
