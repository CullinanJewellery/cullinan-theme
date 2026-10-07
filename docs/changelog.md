# Changelog

Dated record of decisions, newest first. Each line says what changed and why in one or two sentences; the full
reasoning, measurements and verification notes of everything up to 2026-10-04 are in
`docs/archive/CLAUDE-original.md` (search for the component or date). **New detail goes here, not into CLAUDE.md.**

Marks: **(owner)** = the owner's explicit instruction; **(superseded)** = no longer current.

---

## 2026-10-07 — smaller phone menu names; compact desktop filters; collection heading picture **(owner)**
1. **Phone menu**: the collection names 24 → 20.4px (−15%), still Prata 400; rows 53 → 49px (tap areas above
   44px). „Вход / Регистрация“, submenus and desktop unchanged.
2. **Desktop filters, more compact**:
   - bar 72 → 56px, „Скрий филтрите“ / „Сортиране“ 15 → 13px;
   - filter rows 79 → 56px (44px while open), headings 15 → 13px;
   - sort panel rows 30 → 26px, 12px text;
   - option rows 40 → 34px;
   - price line 24px, slider track 22px, fields 13px;
   - chips 32 → 28px, 12px; count and „Изчисти всички“ 12px.
   The sidebar width and grid padding are unchanged. Checked at 1440: cards 308.4px with 308.4 × 308.4 frames,
   open and closed, gliding 377 → 199; price filter and sorting work. Phones unchanged.
3. **Collection heading picture**:
   - Source, per collection: the `custom.heading_image` metafield if the shop defines it, else the collection's own
     image (admin → collection → Image). With neither, the plain area stays, with no broken image.
   - Fit: cover, around the focal point, with a soft espresso veil and white breadcrumb and name. The product
     section's top gap (24px, 18px on phones) moves inside the picture, so nothing moves.
   - Title: the collection's name alone, „Пръстени“ (the screen-reader-only „Колекция:“ prefix removed).
   - **Real preview: no collection has an image yet**, so the live pages show the plain state (checked: unchanged
     at 106–226, filters at 250).
   - **Picture state checked by simulation in the browser** on the real page, with a product photo in the same
     markup: the area covers up to the filters (144px at 1440; to 197px at 375 and 320), and the breadcrumb, name and
     filters stay in place (1440: 134/174/250; phones: 100/140/197). No sideways scroll.
   - To see it for real: add an image to a collection in Shopify admin.

---

## 2026-10-07 — phones: sign-in in the menu drawer, not in the header **(owner)**
- moonmagic.com (phone menu, read from the page): „sign in / register“ comes right after the categories, the first
  of the quieter links (before Loyalty, Discover, Help), 16px regular text.
- Account system checked, settings untouched: the header uses Shopify's `<shopify-account>`, and /account/login opens
  Shopify's new customer accounts page („Влезте в акаунта си или си създайте такъв“), where one page both signs in
  and creates an account.
- Phones (<750px): the account icon is hidden. In the drawer, „Вход / Регистрация“ (`routes.account_login_url`) is
  the first of „За нас“/„Контакти“, the same Jost 15px quiet link under the same hairline; a signed-in customer
  sees „Моят профил“ (`routes.account_url`). Tablets keep the header icon (the drawer item is phone-only).
  Search, „Любими“ and the bag stay. With two right-hand icons the header is back to its pre-heart layout, so the
  narrow-phone squeeze added earlier today (15px padding, 100px logo under 375px) was removed. 320 fits (320px).
- Checked on the preview: 375 and 320 header, the drawer item and its style. The link opens Shopify's sign-in via
  the store's own domain (`/customer_authentication/redirect`); **while the store is password-protected that
  address shows the password page instead** (the preview session doesn't apply there). /account/login opened from
  the preview did reach the Shopify sign-in page. Desktop unchanged (account icon, menu).

---

## 2026-10-07 — header heart matched to the other header icons **(owner)**
- Measured on the preview: search, account and cart draw about 19 × 19.5px of ink with ~1.1px lines at 1440
  (16.5px, ~0.95px on phones); the heart drew 14.4 × 12.8px. It is now 25px (21px on phones) with its stroke at
  1.05 units: 19.1 × 17.1px ink, 1.09px line, centre 69.3 against 69.0–69.4 (phone: 16.0 × 14.4px, 0.92px, 56.5
  against 56.2–56.6). Same 44px (phone 40px) tap boxes and spacing. Header only: the card hearts are unchanged (18px).

---

## 2026-10-07 — „Любими“ wishlist; dropdown label inside the picture **(owner)**
- **Dropdown picture** (moonmagic.com inspected: caption `position: absolute; bottom: 0`, 15/25/30px padding,
  white 16px/600 with a 5px shadow): ours reaches the panel's bottom edge, 292 × 301 at 1440 (390:401, centred
  cover), the panel 300px. „Всички пръстени“ lies inside it near the bottom, in the agreed black Jost 400 with a
  soft light glow, a new named exception in design-system.md §8. Links, text, hover and layering unchanged.
- **„Любими“** (theme only; no app, no account, no admin page):
  - catalogue cards: a heart in the bag's place (top-right, 44 × 44 tap area, 30px circle, 18px outline heart,
    filled when saved). It saves or removes without opening the piece or touching the cart (checked: the URL
    stayed, cart 0 items). Every piece can be saved, even one that cannot be bought now. Homepage rows still have
    no icons (0 found);
  - header: a heart before the bag on phones and computers, filled while anything is saved;
  - page: `/collections/all?view=wishlist`, titled „Любими – Cullinan Jewellery“, with the shop's own cards
    (links, prices, colour circles, filled heart) and „Премахни“ under each. Empty: „Все още нямате любими
    бижута.“ and „Разгледайте бижутата“ (to the catalogue). A line on the page says the list is kept in this
    browser on this device;
  - storage: localStorage („cullinan-wishlist“), so the list survives refreshes and later visits in the same
    browser on the same device; another browser or device, a private window or cleared site data starts empty.
    Nothing is sent to Shopify.
- **Checked on the real preview**:
  - desktop 1440: two hearts saved by real clicks, filled after a refresh, „Любими“ opened from the header heart
    with both cards (390px square frames);
  - phone 375: „Премахни“ and the heart each removed a card at once, then the empty state, still empty after a
    refresh; two pieces saved by real taps showed in the catalogue's grid (172px frames) with swatches and
    prices;
  - preserved: swiping and dots on phones, photo hover, the swatch changing photo 1, filters.
- **Phones under 375px**: three header icons made the bar 345px wide at 320 (sideways scroll). Up to 374px the bar's
  side padding is now 15px (30 before) and the logo 100px (112) without its 7.5px padding, which fits at 320. From
  375px the header is unchanged except for the added heart (the account icon moves 40px left).
- Not done: a clean `/pages/lyubimi` address would need a page created in Shopify admin; the owner can create
  one later and we would add a page template for it.

---

## 2026-10-07 — dropdown picture after MoonMagic's picture area **(owner)**
- **Reference, inspected** (moonmagic.com „Rings“ dropdown, 1440): the picture is 390 × 401, flush to the panel's
  top, the page's right edge and the bottom; centred cover crop; the panel is the picture's height (401); the link
  headings are 55px below the top; the caption is white capitals on the photo.
- **Ours, measured on the preview**:
  - the picture flush top-right (x 1176–1425, from the panel's top), the same 390:401 frame and centred cover
    crop, at 249 × 256 so the panel stays compact at 302px (it was 278 with the inset 180px square, 406 before
    today);
  - the label „Всички пръстени“ in a 44px strip under the picture, as agreed (black Jost 400), not white on the
    photo, because words over photographs need a named exception (design-system.md §8);
  - links 55px from the top.
  Dropdown above the filter bar (checked). Hover, click and the text styling are unchanged. Still the flat empty
  slot until a picture is uploaded (header → „Mega menu image panel“).
- Way back: git before this entry (crown.css).

---

## 2026-10-07 — fixed-size cards that glide; shorter dropdown with black text **(owner)**
Checked on the real draft preview at 1440; phones at 375 unchanged.
- **MoonMagic, inspected again** (sampled every 40ms while hiding their filters): their column runs 356 → 0px
  in about 0.3s and their cards grow 308 → 415px; they do not keep their size. The owner asked for fixed cards that
  slide, so ours deliberately differ.
- **Ours**:
  - the card width comes from the section's width less the open sidebar (a size container, `cqw`): three
    columns of 30% with 5% gaps, the same open or closed;
  - the grid is centred in its room, so as the sidebar's width animates (0.3s) it glides left.
  Measured, open and closed: every card 308.4 × 430.4, frame and photo 308.4 × 308.4. The grid moves x 377 → 199
  (294, 218, 200 in between) and the count row moves with it; page width 1425, no sideways scroll.
  Replaces this morning's resizing grid.
- **Dropdown text**:
  - all black;
  - first-level headings (Дамски, Мъжки, Гривни с циркони) Jost 400 with a 0.012em stroke (≈10% more ink),
    never underlined, also on hover;
  - links under them regular, black, 14px (were 16px; none exist in the menu yet, so this is not visible);
  - the picture label black;
  - the names in the bar unchanged.
- **Shorter dropdown**: from 406 to 278px. The picture is back to its look before 2026-10-03 (5cd0782): a square
  inside the page width, its label under it rather than in a strip, now 180px (360px flush in the corner before),
  level with the links, 32px from the top. The square is kept, so nothing is stretched or cropped. It is still the
  flat empty slot, because no picture has been uploaded.
- Kept: hover opens, click opens the collection (Гривни → /collections/гривни checked), the header stays above
  the filter bar.
- Way back: git before this entry (crown.css only).

---

## 2026-10-07 — desktop menu weight and layering; filters push the grid; MoonMagic's grid **(owner)**
Checked on the real draft preview at 1440; phones at 375 unchanged.
- **Dropdown text**: the phone menu's entries inside a category („Дамски“, „Мъжки“, „Гривни с циркони“) are Jost
  400, so the desktop dropdown links and the picture label „Всички пръстени“ are now Jost 400 without the added
  stroke (were 700 + 0.03em, the label 600). Size, capitals and spacing unchanged.
- **Collection names**: solid black at rest (75% before). Under the cursor, on keyboard focus and while open, the
  stroke goes 0.012em → 0.044em (0.15px → 0.55px measured), about a fifth more ink. Nothing moves: the hover lift
  has been off since 2026-10-05, and the underline stays.
- **Overlap bug**: the collection filter bar (z-index 4) was above the sticky header (3), so it cut across an open
  dropdown. The header is now 5 from 990px. Checked with the dropdown open over the bar, and after scrolling with
  the sticky header over the grid: every sampled point of the panel is the dropdown.
- **Filters open/close, after moonmagic.com** (inspected: their filter column is sticky and animates `width` 0.3s,
  the grid beside it resizes): the sidebar's width now runs to 0 and back in 0.3s, clipped, out of the tab order
  when closed. The grid is pushed and resized, never covered (measured mid-way: 356 → 151 → 27 → 0).
- **Grid, as theirs at 1440**:
  - square frames;
  - three columns in both states, 5% between columns, 20px between rows;
  - 30px above, 20px at the sides, the dark line kept at the left edge when closed.
  Measured on our preview:
  - filters open: cards at x 377 / 737 / 1097, 308px with 308×308 frames (theirs 377 / 737 / 1097, 308);
  - closed: 21 / 505 / 990, 415px (theirs the same);
  - first row 60px under the bar (theirs 60).
  The count line takes 16px when no filter is chosen, and the chips' 52px when there are chips. Photos are fitted
  (contain) so no piece is cropped; theirs fill the frame, but their photos are square. This replaces the
  photo-shaped desktop frames of 2026-10-06. Tablets: 2 columns.
- Preserved and re-checked: photo hover (opacity 0 → 1 with a real pointer), swatch changes photo 1, bag on top,
  sort and price filter (3 of 4 under €150), „Изчисти всички“.
- Way back: git before this entry (crown.css only).

---

## 2026-10-07 — desktop collection filters rebuilt after MoonMagic **(owner)**
- **Reference, inspected live** (moonmagic.com/en-eu/collections/rings, 1440):
  - Bar: full width, 72px, 1px dark lines; „HIDE FILTERS (n) −“ / „SORT BY +“ in 15px/600 capitals with
    1.5px tracking and 30px inner padding.
  - Sidebar: 356px against the edge, 79px rows (24/50px padding) between faint lines, 1px dark line to the grid,
    cards 21px from it.
  - Open group: grey „Clear“, 40px option rows (13px/500 capitals) with 12px round boxes; selected = 8px dot.
  - Price: range line (12px), slider (pink between 13px dark handles), two 20px fields with 9px capital labels.
  - Above the grid: count (13px grey), chips (32px, 1px dark border, 16px radius, 13px/600 capitals, ×),
    „Clear All“ (13px grey, underlined) at the right.
  - Sort: a 250px panel under the bar (1px #E2E2E2, 15/13/5px padding), 30px rows with round boxes, the current
    one underlined and filled.
- **Ours now** (replaces the 2026-10-06 sidebar styling): the same arrangement and measurements in Jost and our
  ink. Measured on the preview: bar 0–1425 × 72, sidebar 356, first row 79, cards from x 378.
  - Bar: „Скрий филтрите (n) −“ and „Сортиране +“.
  - Sort: a panel of Shopify's sort options, wider than 250px only as far as the Bulgarian names need to stay on
    one line.
  - Price: „Нулиране“, the range line, a two-handle slider writing into Shopify's own price fields, then
    „От“ / „Към“.
  - Above the grid: count, chips, „Изчисти всички“.
  - Only the store's existing filter (price) shows; Bulgarian labels, counts and Shopify's filtering and sorting
    are kept. List filters would get round boxes, but none exist, so that styling is untested.
- **Deliberate difference from our square rule**: the chips are round-ended and the option boxes round, as on the
  reference (owner asked for "as closely as possible"); design-system.md §8.
- **Checked on the real preview (1440)**:
  - open/close of the price group;
  - slider to €150 → 3 of 4, chip „€0 – €150“, bar „(1)“, „Нулиране“ shown;
  - typing 100 → 1 of 4;
  - chip removal; „Изчисти всички“ (keeps the sort);
  - sort panel: open, Escape and outside click close it, „Цена, от висока към ниска“ applied with the filter
    kept;
  - hide/show widens the grid 1069 → 1425.
  **Phones unchanged** (375 and 320: two 50% halves, 48px, count and grid in the same place, the drawer opens,
  no slider there).
- Way back: git before this entry (styles, section, facets snippet, new script).

---

## 2026-10-07 — desktop menu font, category indicators on phones, footer line **(owner)**
Checked on the real draft preview at 1440, 375 and 320; no sideways overflow.
1. **Desktop menu**: the words take the phone menu's collection-name face and weight: Prata at the headings' weight
   (400) with the same 0.012em stroke. The desktop size (12.5px), tracking (0.12em) and capitals are kept, and so
   is the colour. The dropdown arrows are hidden, and the summaries lose the arrow's 27px, so every word has 12px
   either side. Checked with a real pointer: hover opens „Пръстени“, a click opened the rings collection, Space
   opens the dropdown. The phone drawer is untouched (still Prata 2.4rem, sentence case).
2. **„Разгледайте по категория“ on phones**: the previous/next arrows are gone. The line indicators, which had been
   removed on 2026-10-06, are back in their place, one per category (6 now), centred under the slides (group centre
   188 = block centre 188 at 375). Each is a 44px-tall button; the current one is pink `#E6BAB9`. A tap on line 3 went
   to „Висулки“ and marked it. Swiping and the next-card peek are unchanged, and so are the cards, photos, names and
   buttons. `category-slider.js` works without the arrows. The desktop mosaic is unchanged (the slider is hidden there).
3. **Footer line above the address and hours**: 2px in the footer line colour `#C9ABA1`, 12px above and 12px to the
   text. This matches the line above the social icons by „Свържете се с нас“, measured on the page (both 2px, 12 / 12).
   It shows on the desktop column and in the phone accordion „Нека ви помогнем“. The address and hours are unchanged.

---

## 2026-10-06 (evening) — button hovers back, ruby hero and trust row, card hover, sidebar filters, menu **(owner)**
Done one at a time, each checked on the real draft preview (desktop 1440; phones 375 and 320 where they could change).
1. **Button hover and pressed as before the colour update**: the near-black hover/pressed block was removed and Add
   to cart, the cart checkout (drawer and page) and the phone category button hover pink `#E6BAB9` again; the others
   empty to an outline. Black fills, sizes and shapes kept. Checked in the loaded stylesheet rules (no `#2b2b2b` or
   `#3a3a3a` left).
2. **„Разгледайте колекцията“ ruby again** (`#D62246`, white label, its old outline hover): the exception to the black
   buttons. The first push was dropped and re-sent.
3. **Trust row in the same ruby**: headings, sentences, icons with their rings and card outlines
   (`section-icon-benefits.css`, end). Card grounds, layout, phone swipe and dots unchanged (checked at 375: 3 cards
   scrolling, 3 dots).
4. **Collection cards, computers with a mouse**: the second photo fades in over the first while the pointer is on the
   photo, and the circles are hidden. Checked with a real pointer on the ring: opacity 0 → 1 → 0. The bag is still
   on top and the swatch still changes photo 1. At 375 the track still scrolls and the circles show. The ring is the
   only product with two photos today.
5. **Filters, tablets and computers**: MoonMagic's desktop filters were looked at live: a ruled bar with „Hide filters −“
   and „Sort by +“, a 356px sidebar of accordion rows 79px tall between hairlines, 15px/600 capitals, and a sort box of
   13px capitals. Ours now: `filter_type: vertical` (Dawn's sidebar, Shopify's own filtering and sorting), with a
   connected bar ruled above and below holding „Скрий филтрите −“ / „Покажи филтрите +“ (new button, toggles the
   sidebar), the count and „Сортиране по“. The sidebar is 26rem with hairline rows and the site's plus/minus, and a
   hairline to the grid. Only the price filter exists in the store's filter settings, so only price shows; nothing
   was added. Checked: price ≥100 → 1 of 4 with a removable box; clearing works; sorting by price, high to low, puts
   the ring first; hiding widens the grid to 1300px.
   **Phones**: switching the layout first lost the sort half of the phone bar (its markup was tied to `horizontal`).
   Fixed in `facets.liquid`, and the phone bar is the same as before at 375 and 320 (two 50% halves, 48px).
   Way back: `filter_type` "horizontal" (the connected-strip rules are still in crown.css).
6. **Desktop menu**: the words are regular weight (400, no stroke). With a mouse, hovering a word opens its existing
   dropdown and a 250ms grace period keeps it open across the 16px gap into the panel; one open at a time. A click
   on the word opens the menu link's own URL; Enter does the same and Space still opens the dropdown. Touch screens
   keep tap-to-open; the phone drawer is not touched. Links, layout, colours and spacing unchanged. Checked with a
   real pointer: open on hover, still open in the panel, closed on leaving, Гривни replaces Пръстени, and a click on
   Пръстени opened the rings collection.
   Note for the owner: the menu link for „Пръстени“ is `/collections/пръстени/Пръстени` (the rings collection
   filtered by the tag „Пръстени“). Today it shows the same ring as the plain collection; a ring without that tag
   would not appear there.

---

## 2026-10-06 — desktop photos restored, palette applied, blush footer, black buttons **(owner)**
Done one at a time, each checked on the real draft preview at 1440, 375 and 320 (no sideways overflow). Before/after
page: https://claude.ai/artifact/VCk9LEMzx8ffSsnoHfqeQX.
1. **Desktop photos as before** (owner: closer to MoonMagic; not the phone layout). From git history:
   - product page `gallery_layout` back to `columns` (the two-column mosaic of 10-02; 2826eba had made it `thumbnail`);
   - collection cards: 8795aad had made frames square with `contain`. Restored for ≥750px only, via the new
     `--ratio-percent-wide` (first photo's ratio) and `cover` in `#product-grid`. Measured at 1440: 390×520 portrait
     cards, the bracelet 390×293. Phones unchanged: 172×172 at 375, 144×144 at 320, `contain`, swipe, dots and bag
     as before; the phone product slider unchanged (320×320). Way back: delete the ≥750 block in crown.css and set
     `gallery_layout` to `thumbnail`.
2. **Palette applied** (owner answered "Apply proposal"): scheme-1 `#FFFFFF`, scheme-6 `#F5F3EF` (and the phone
   category band literal), scheme-2 `#F2E4DE` (and the new-arrivals literal). Other backgrounds untouched.
3. **Footer**: a muted warm blush `#E3CAC2` (not the proposed taupe), lines `#C9ABA1`, as its own `.footer.gradient`
   rule, because scheme-5 stays `#E9D9D0` for the hero. Espresso 10.4:1, 75% text 5.5:1. The first push was dropped
   (two pushes under a minute apart) and was re-sent.
4. **Black buttons**: schemes 1, 2, 5, 6 and 8 have button `#000000` with label `#FFFFFF`, and the hero override is black too
   (ruby `#D62246` ends). Hover and focus `#2B2B2B`, pressed `#3A3A3A`, white label, on Add to cart, the cart
   checkout (drawer and page), the category slider, hero, view-all, atelier, stones, workshop, custom request and
   Judge.me (its button colours too; stars stay rose gold). Checked live: Add to cart, /cart checkout (test cart
   cleared), hero, zodiac, stones, workshop and category buttons all compute black with a white label.
   **Kept as they are**: the zodiac's pink indicators, stars, colour swatches, arrows, text links, outline buttons, the
   newsletter's light button on its dark band (a black one would vanish there) and the Facebook/Instagram buttons.
   Way back: the pre-381b60d values (rosewood `#6E3B30`/`#FBF8F6`, pink `#E6BAB9` hovers).
5. **Row photo preview untouched**: the CSS hover the owner confirmed on the iPhone was not edited, and no script
   was added.
- Not checked: the hover colours by a real pointer. The browser tool cannot hold a hover, so the colours were
  confirmed in the loaded stylesheet rules instead.

---

## 2026-10-06 — colour proposal (applied later the same day, see above) **(owner)**
- MoonMagic's colours sampled live. A coordinated palette was shown on the real homepage at 1440 and 375 by CSS
  injected in the browser (nothing committed to the theme): white page, warm greige bands `#F5F3EF`, blush
  `#F2E4DE`, warm taupe footer `#CBBBAD`. Buttons and „Добави в количката“ unchanged. Contrast measured on the page:
  every footer text at or above 4.9:1. Table and how to apply: design-system.md §2 „Proposal 2026-10-06“. Waiting for
  the owner's decision.
- Comparison for the owner's decision: a private review page (https://claude.ai/artifact/Bs1LXg3jxF4aRqJvzmJ3BH).
  It shows current vs proposed on the real draft homepage, footer and custom-request band at 1440 and 375, plus
  „Добави в количката“ at rest (rosewood `#6E3B30`) and on hover (pink `#E6BAB9`, black label), phone and desktop.
  Not applied.

---

## 2026-10-06 — row photo preview: CSS hover, as moonmagic.com **(owner)**
- **Reference** (moonmagic.com, their own stylesheet, phone width): in slider rows (`.swiper-slide`) the second photo
  lies over the first (absolute, opacity 0) and fades in on plain `:hover` of the photo (`opacity 0.2s
  ease-in-out`). There's no script and no dots in rows; dots and swipe are only in their grids. On a phone the browser
  applies `:hover` to what is touched. **Their actual finger behaviour was not observed on a physical phone.**
- **Ours now uses the same mechanism:**
  - Row cards wrap both photos in one product link (`.card__photo-link`) laid over the card's stretched title link
    (`.card__inner` lifted, Dawn's inner layer click-through).
  - The second photo fades in on `:hover` of that link, 0.2 s ease-in-out.
  - First photo `contain`, second `cover`; the second is loaded with the card (no `loading="lazy"`).
  - Наскоро разгледани: the same on `:hover` of its photo; the preview loads eagerly.
  - `assets/card-photo-preview.js` and its script tags removed.
- **Browser checks on the real preview, 375:**
  - A finger point on the photo lands on the photo link.
  - Hover shows the cover photo (no side strips); moving away restores the first photo.
  - A click on the photo opens the product.
  - No bag or dots in rows; Наскоро разгледани shows the new on-hand photo.
  **Physical iPhone: confirmed working by the owner (2026-10-06)**; keep as is. Row swiping and page scrolling are the
  browser's own (no touch handlers).

---

## 2026-10-06 — row photo preview: immediate on touch **(owner, after an iPhone test)**
- **Cause, investigated on the real preview:**
  - The newest script was loaded, and the ring had a valid second photo (the owner's new on-hand photo, tied to no
    variant).
  - The card link covers the photo, but the listeners sit on the document, so it never blocked the touch.
  - The failure came from the design of the first pass: it waited 280 ms of stillness, cancelled on any page scroll
    event (an iPhone fires those when a touch stops momentum scrolling or the address bar resizes) and on 8px of drift.
- **Now** (`assets/card-photo-preview.js`):
  - The second photo shows on touch-down over the photo, with a 0.2 s crossfade.
  - It restores on release or pointercancel (the browser cancels when it starts a page scroll or row swipe), or after
    12px of drift.
  - No scroll listener.
  - A quick tap opens the product. The click after a long look (over 500 ms), a moved finger or a cancel is not
    followed.
  - It swaps only once the second photo has loaded.
  - Second photo `cover`, first `contain` (Наскоро разгледани: first `contain` at every width). No iOS tap highlight.
- **Browser checks on the real preview, 375, simulated touch events** (Най-продавани, Може да ви хареса, Наскоро
  разгледани):
  - Preview on at the touch, off on release.
  - Quick tap opens the product.
  - A long look, a vertical move plus cancel, or a horizontal move plus cancel restores the photo and opens nothing.
  - Small jitter (5px) keeps the preview.
  - White grounds and the 6px recently-viewed padding kept.
  **Finger behaviour to be confirmed by the owner on an iPhone.**
- Наскоро разгледани shows the second photo stored when a product was last viewed; the ring's entry updates the next
  time the ring page is opened.

---

## 2026-10-06 — row photos on white, recently-viewed spacing; first real-preview sweep **(owner)**
- White behind the photos in Наскоро разгледани (was a grey tint, giving bands) and in Най-продавани / Може да ви хареса
  (was the page's marble). The photos are shot on white. Exception to "no pure white ground", design-system §8.
- Наскоро разгледани `padding_top` 72 → 8 (product.json). It follows Може да ви хареса on the same ground, so the
  paddings stacked into a 128px (96px on phones) blank band. On the preview it's now 68px from the related cards to
  the title at 375. The title-to-photo gaps already match (30 / 32px). Card sizes unchanged.
- **Real preview (new link 2026-10-06), checked at 375 unless noted:**
  - Collection grid:
    - Bag on the ring only. Shopify's own data shows the pendant, bracelet and earrings unavailable (0 variants in
      stock), so their bag is hidden by design.
    - The template re-send worked.
    - Photos 172px; dots bottom-left; a dot tap slides to photo 2 without opening the product.
  - Quick selection (ring):
    - Opens with metal menu, sizes, size-guide link and delivery line; trail, phone and trust lines hidden.
    - Real variant changes: size 57, then 14К бяло злато; the ids match Shopify's data and the photo follows.
    - Size guide: two centred columns; Escape closes only the guide.
    - „Добави в количката“ on one line.
    - **Adding to the cart works:** 57 / 14К бяло злато added, the drawer opened, then the test cart was emptied (no
      checkout opened).
  - Direct add on a one-variant piece: **blocked by product data**. The only one-variant pieces (pendant, earrings)
    are unavailable.
  - Filters:
    - Price „От 100“ gives 1 result, badge 1, „Покажи резултатите (1)“ and the square tag „€100 - €200“.
    - Removing the tag returns 4 and keeps the sort.
    - Sorting (price, high first) from the bar works.
    - The connected bar at 375; the desktop strip at 1440 with its panel hanging from it (0px, no shadow).
    - Only a price filter exists on this store (no metal or stone filters set up in Search & Discovery).
  - Rows:
    - Най-продавани (375 / 320): 270 / 230px, peek 78 / 63px, no bag, photos on white, preview only on the ring.
    - Desktop: a real mouse hover shows the ring's second photo.
    - Наскоро разгледани: on white, whole photos, the ring card with preview. Simulated hold shows it, release
      restores and doesn't open the product.
  - Categories: no sentences or lines; six rosewood buttons at one height; link underlined; 320 fits.
  - Size guide on the product page: two columns, centred.
  **Still unverified on a real phone:** finger swipe, hold timing, long-press menu.
  **Data flags seen:**
  - The ring's second photo has a burned-in logo.
  - The drawer shows the yellow-gold photo for a white-gold variant (variant photos missing).

---

## 2026-10-06 — product rows: second-photo preview, no bag **(owner)**
- **Bag removed** from Най-продавани and Може да ви хареса (`quick_add: none` in index.json / product.json); the
  collection grid keeps it. Наскоро разгледани never had one.
- **Preview:** a card with a relevant second photo (the first image tied to no variant, never another metal) shows it
  while the mouse is over the photo or a finger rests on it (about 0.3 s), and the first returns on leaving or
  release (`assets/card-photo-preview.js`, `data-photo-preview` / `data-previewing`).
  - Any movement, a row or page scroll, or the browser's pointercancel ends the preview.
  - A quick tap opens the product; the release after a hold doesn't.
  - No long-press menu on the photo.
  - Dawn's any-second-photo hover is no longer used in these rows (it could show another metal); cards without a
    relevant second photo don't change.
  - Наскоро разгледани stores the same photo (`data-image2`, `j` in the browser list; older entries get it when the
    product is viewed again).
- No dots or swipe in rows (they never had them; the snippet now separates swipe mode on collection pages from preview
  mode in rows). Card sizes (72vw / 1.27 columns) and collection-grid swiping and dots unchanged.
- **Local checks only:**
  - liquidjs with the saved live JSON of the four products: ring → collection swipe and dots, row preview with the
    non-variant photo; the bracelet, earrings and pendant (one photo each) unchanged.
  - Mock, 1440: hover over the photo shows the preview; the text below and leaving the card restore the first photo.
  - Mock, 375 (simulated touch events):
    - Hold shows the preview; release restores and doesn't open the product; a quick tap opens it.
    - Moving 14px, a row scroll or a page scroll cancels the preview.
    - Наскоро разгледани: same hold behaviour; one-photo cards have no preview.
  - Mock, 320 / 375: sizes kept, no sideways scroll.
  **Unverified until tested on a real phone:** every finger interaction (hold timing, swipe and scroll hand-off,
  long-press menu suppression on iOS and Android). Pending on the real store.

---

## 2026-10-06 — „Разгледайте по категория“ simplified **(owner)**
- Phone slides: photo, name and one clear button per category („Вижте пръстените“ etc.; square rosewood, pink hover,
  200×44, at the foot of each slide so all buttons line up). The six sentences are gone (template b77a38d, then the
  `phone_text` field from the schema, 6cd7110); nothing replaced them.
- Line indicators removed; the two circular arrows stay, centred; swiping and the peek unchanged.
- „Вижте всички бижута“: an underlined 14px text link with a 44px tap height (was a solid full-width button), phones and
  computers.
- Desktop mosaic unchanged: it never showed the sentences (names over the photo, the whole tile is the link, no
  button). Colours and photo shapes unchanged.
- **Local checks only** (the current section rendered with liquidjs from the template's settings into a saved
  homepage; repo CSS/JS):
  - 375: slides 283px, 65px peek; buttons at one height; arrows step and disable at the ends.
  - 320: slides 238px, 55px peek; button labels fit.
  - 1440: same 4-column mosaic (315px tiles), the link 32px under it.
  - No sideways scroll at any width.
  **Pending on the real store.**

---

## 2026-10-06 — larger photos in phone rows **(owner)**
- Най-продавани and Може да ви хареса (featured-collection rows): 64vw → 72vw on phones, 270px square photos at 375
  (were 240) and 230px at 320 (were 205); 78px / 63px of the next card stays visible. Title and arrows stay on one row.
- Наскоро разгледани: 1.42 → 1.27 columns on phones (269px at 375, 226px at 320); on phones the photo now shows
  whole (`contain`; it was `cover` and could crop).
- Collection grids, tablets (750–989) and desktop unchanged. Way back: `width: 64vw` in crown.css „Product pictures on
  a phone“, and drop the phone block in section-recently-viewed.css.
- **Local checks only** (saved homepage and product page with the current CSS; recently viewed seeded in the mock's
  browser storage), 320 and 375:
  - Sizes and peeks as above; no sideways scroll.
  - Title and arrows on one row, with the words 57–61px clear of the arrows at 320.
  - The bag sits top-right in a row card, 44×44, and receives the tap.
  - Desktop spot check: 390px cards, recently viewed still 3 columns.
  **Pending on the real store.**

---

## 2026-10-06 — card refinements **(owner)**
- Bag back to the **top-right**: glyph 17 → 13px inside a 30px circle of pale rose-clay (`#EBDFD8` at 88%; the cards'
  marble white would vanish on white photos). Tap area 44×44; direct add and quick selection unchanged.
- Photo circles 6px apart (were 21px): each circle sits at the inner edge of its own 24×44 tap area; still bottom-left
  (raised above a badge); swiping unchanged.
- Phones: grid margins 15 → 12px, gap 12 → 8px, so square photos grow 167 → 171.5px at 375 and 139 → 144px at 320.
  Two columns and `object-fit: contain` kept; desktop unchanged (390px at 1440). Way back: the „Third pass“ rule in
  crown.css (`--grid-mobile-horizontal-spacing: 1.2rem; margin-inline: 0`).
- **Local checks only** (mock with the current CSS/JS, 320 / 375, desktop spot check):
  - Sizes, margins and gap as above, no sideways scroll.
  - The bag, both circles and the photo each receive their own taps.
  - The swipe still snaps to the nearest photo.
  - Ring bag opens quick selection; the one-variant bag (pendant made buyable in the mock only) adds once and opens
    the drawer.
  **Pending on the real preview:** all of it, including whether the bag shows after the template re-send.

---

## 2026-10-06 — card corrections **(owner)**
- Photo circles moved to the **bottom-left** inside the photo (the owner meant that corner); swiping unchanged. A card
  badge also sits bottom-left (theme setting `badge_position`), so the circles move up above a badge when one shows.
- Bag (quick add) moved to the **top-left** corner; no background, border or circle; 44×44 tap area.
- **Why the bag was missing, most likely:** the template push that switches quick add on (9350ad8) went 55 s after the
  snippet push and was probably dropped (pushes less than a minute apart get lost; theme guide §1), leaving
  `quick_add` off on the store, so no card showed a bag. Re-sent (c8bf708, 3 min after the code push).
  Availability also hides it by design: the snippet shows the bag only when `card_product.available` is true (a
  variant in stock, or selling continues at zero). The pendant, bracelet and earrings showed „Изчерпано“ in the
  saved pages, so they get no bag; the ring was recorded buyable on 10-05, so it should show one. Not confirmed on
  the store (no working preview). Prices and availability were not changed.
- **Local checks** (mock: saved pages with the current CSS/JS and card markup; a fake `/cart/add` reply) at 320 / 375 /
  1440:
  - Bag top-left and circles bottom-left at all widths; each receives its own taps; no sideways scroll.
  - Circles clear a simulated badge; the snap is unchanged.
  - One-variant card (pendant, made buyable **in the mock only**): the bag sends one add request with the card's variant
    and opens the drawer; the page stays.
  - Ring: the bag opens quick selection (material, sizes) and adds nothing first.
  - Sold-out cards show no bag.
  **Pending on the real preview:** bag visible after the template re-send; direct add and the drawer with a real
  buyable one-variant piece (none known: the one-variant pieces are sold out, so this stays blocked by product data);
  real variant updates in the panel; a finger swipe on a phone.

---

## 2026-10-06 — size guide and card photo slide **(owner, two focused changes)**
1. Ring-size guide (product page and quick selection, same markup): two columns, „Размер (EU)“ and „Вътрешен
   диаметър (мм)“. The circumference column is gone, because it only repeated the size; the line above the table
   still says the European size is the inner circumference in mm. Headings are centred over equal 50% columns with
   even padding (rows 42px). The close control is a 12px cross in a 44×44 tap box („Затвори“ kept for screen
   readers); the title stays clear of it (≥48px at 375). The jump link to the instructions is kept. In quick
   selection at ≤419px, „Добави в количката“ fits on one line (narrower padding and letter-spacing in the panel only).
2. Card photos: the fade became a sideways scroller with scroll snap (moonmagic.com's phone cards use the same
   method). The photos follow the finger side by side and settle on one; each slide is the product link, out of the
   tab order. The circles sit bottom-right (the cart icon is top-right); the current one is filled, the other an
   outline. Shown only when a second relevant photo exists (unchanged rule).
   **Bug found and fixed:** `.card__inner` is its own stacking context, so the card's stretched title link covered
   the photo area, **including the earlier dots**: on a real phone they were probably never tappable (the earlier
   test called them directly). Way back for the slide: the previous `card-photos.js` and the „Two photos per card“
   CSS in git (commit 4ed52b1 and before).
- **Local checks only** (preview expired; mocks from saved pages with the current CSS/JS and markup) at 320 / 375 /
  1440:
  - Guide: two centred columns on the product page and from the panel; the jump link opens and scrolls to the
    instructions; the cross closes the guide; no sideways scroll.
  - Panel button: on one line at 320.
  - Photos: both photos visible side by side mid-drag; snapping back from 45% and on to photo 2 from 66%; circles
    follow; tapping a circle slides to its photo; a plain tap opens the product; a click that ends a drag is cancelled;
    a swatch returns to photo 1.
  - Hit tests: the photo, the two circles, the cart icon and the swatches each receive their own taps.
  - The cart icon opens the panel and doesn't follow the product link.
  **Pending:** a real finger swipe and vertical scrolling on a phone (the tool can't drive native touch); everything
  on the real preview; variant updates in the panel, filtering, sorting, and adding to the cart (needs a working
  preview and buyable product data; prices and availability are not changed for testing).

---

## 2026-10-06 — seven-step batch **(owner)**
1. Product enquiry: the open form became „Попитайте за това бижу“, which opens a popup shaped like the size guide
   (custom-request `layout`: open / popup / collapsible). Both buttons open it; piece, link and variant are still sent;
   Escape and the backdrop close it and focus goes back; it reopens after sending to show the thank-you or the error.
   Band on phones 762 → 409px. The thank-you message has not been seen yet, because no enquiry was sent.
2. Card prices 17 → 16px (`.collection .price`); the product page price is unchanged (22px).
3. Collection cards: a second photo, the first image not tied to any variant, with two dots (2.8×4.4rem tap areas).
   Swipe or tap a dot (assets/card-photos.js); a click that ends a swipe does not open the product; `pan-y` keeps
   vertical scrolling; a swatch returns to photo 1, which shows the chosen metal. Only the ring has such a photo
   so far, and that photo has a logo burned in (`docs/tasks.md`).
4. „Изчерпано“ label removed from product cards everywhere; the product page keeps its message and disabled button.
5. Homepage custom request collapsed: heading and intro, then „Изпратете запитване“ with a chevron, which opens the form
   and the reference-photo links (382px collapsed, 922px open at 375).
6. Filters as connected boxes (arrangement from moonmagic.com, our colours and Jost): on computers one strip with
   lines above and below and between the label, each filter (plus, minus when open), sorting and the count. Panels
   hang straight from the strip, square, with no shadow. On tablets (750–989) the words „Филтриране:“ / „Сортиране:“
   are for screen readers only and sorting shortens. Phones: „Филтри“ and „Сортиране“ are one bar running to the
   screen edges, with a line between them (replaces the 8px buttons); drawer rows sit on lines in small capitals;
   „Покажи резултатите (N)“ is full width with „Изчисти“ under it (it wrapped to three lines). Chosen-filter chips
   are square. Filtering, sorting, count, removal and the drawer behaviour are Dawn’s, unchanged. Way back: the
   „Computers, connected boxes“ and phone „Third pass“ blocks in crown.css.
7. Cart icon on cards: Dawn’s quick add (`quick_add: standard` in collection, homepage featured collection, product
   page featured collection), shown as the header’s cart icon in the photo’s top-right corner. 44×44 tap area, no
   background, a faint light halo. Pieces with options open Dawn’s selection panel, which hides the trail, rating,
   phone and trust lines. Pieces without options add directly and the cart drawer opens. Unavailable pieces show no
   icon. Search results and related products have no quick-add setting in Dawn 16, so they show no icon. Way back:
   set `quick_add` to `none`.
- Steps 6–7 were built while the preview link had expired: checked in a local mock (a saved collection page with the
  repo CSS) at 320, 375, 768 and 1440, and on the CDN. **Not yet checked on the real preview.**
- **Local checks, 2026-10-06** (preview still expired; owner asked for local checks, real-preview checks pending).
  Mock = saved collection page (10-03) and ring page (10-03, with the current size-guide markup added) with the
  repo’s current CSS and JS, current card markup injected. Passed locally at 320 / 375 / 1440:
  - Panel: the icon opens it, focus moves in, and Escape closes it with focus back on the icon. Material menu (four
    metals) and size choices shown. The trail, rating, phone and trust lines are hidden; no sideways scroll.
  - Size guide from the panel: opens above it (ids rewritten consistently), „Затвори“ returns to the panel, 284px wide
    at 320.
  - Photos: a swipe switches the photo and does not open the product; a vertical move doesn’t switch; a tap opens
    the product; dots (28×44) toggle; a swatch returns to photo 1; `touch-action: pan-y`.
  - Cart icon: flush with the photo corner, 44×44, a tap reaches the icon (not the card link) and opens the panel; a
    swipe ending on the icon opens nothing.
  - Filters: phone bar 160+160 at 320 and 188+188 at 375, drawer rows 56px, results button on one line, „Изчисти“ 44px;
    desktop panel hangs from the strip (0px gap, no shadow).
  **Fixed from these checks**: the panel still showed the trail and rating (specificity), and one Escape in the size
  guide closed the whole panel too.
  **Pending on the real preview**: everything above on real data; variant switching inside the panel (needs
  Shopify’s section rendering); filtering, sorting, counts, chip removal and „Изчисти“ against Search & Discovery;
  the current (square) card frames and labels. **Blocked by product data**: direct add and the cart drawer opening, if
  no piece can be bought (prices and availability are not changed for testing).

## 2026-10-04 — next stage **(owner: "start the next stage")**
- Phone hero: the picture fills its 375px square and shows the pendant (Dawn's zoom-in had made it fixed and 100vh
  tall). Desktop unchanged. Verified on the preview.
- Footer payment icons hidden: payment setup is pending (firm not registered; status in `docs/tasks.md` A2) **(owner)**.
- Specifications follow the selected variant: each row reads the variant's metafield first, then the product's; new
  row `custom.dimensions` („Размери на бижуто“); refreshed on variant change by `product-info.js`.
- Ring-size guide: „Таблица с размери“ beside the size option opens a dialog with how to measure (ring sizer or an
  existing ring), its limits, and sizes 48–64 with computed diameters. No resizing or exchange promise. Verified on
  the preview at 1440, 990 and 375.
- Product enquiry: a custom-request band after the questions; its form names the piece, its link and the chosen
  variant (kept current on variant change); „Попитайте за това бижу“ beside the phone link jumps to it.
- Buying information: engraving trust line; the delivery tab says office or address and "another stone, metal or
  size". Returns and cash-on-delivery wording unchanged, flagged.
- Cart page aligned with the drawer: options line, „Премахни“, the same checkout button. Express buttons flagged.
- Focused checks **(owner)**: specs on multi-variant products no longer fall back to product-level metal, proba,
  weight or dimensions (stone fields still may); cart page accelerated buttons hidden by a theme setting (no payment
  or checkout setting touched); „Изработка и доставка: 5–20 работни дни“ everywhere (5–20 confirmed as making +
  delivery); За нас ring-size answer says inner circumference in mm, not diameter, matching the guide. Fallback
  tested with substituted data (liquidjs mocks); hiding, wording and FAQ checked on the real preview.
- **2026-10-05, reviews decision (owner)**: keep Judge.me's Testimonials carousel as supported (one card at a time on
  phones); the peek requirement is dropped; no override or custom carousel. No theme changes this round.
- **2026-10-05, workshop slides on phones (owner)**: the title stays above the slideshow with one „Стъпка N от 4“ line
  under it (updated by the script; each slide's own step line hidden on phones). Each slide: photo when there is one,
  then one box in the page colour #FBF8F6 on the pale band holding heading, text, button and second link; boxes are as
  tall as the tallest slide so the control sits 16px under every one (text-only boxes keep their height while only
  some photos exist). One joined control, two 56×44px halves with a divider, ends disabled; the step marks are not
  shown on phones. Swipe also works on the control; a click within 500ms of a swipe is cancelled; vertical scrolling
  untouched (`pan-y`). Keyboard, labels, live region and reduced motion unchanged. Tablet and computer unchanged.
  Real preview: all four steps at 320 and 375, desktop at 1440, no sideways scroll; photo order checked with an
  in-browser stand-in (no photos uploaded); swipe and click suppression with synthetic touch events.
- **2026-10-05, workshop slides on phones, correction (owner)**: no card. The photo box holds only the photo; heading,
  text, button and second link sit 16px below it directly on the section background (the #FBF8F6 box and the
  equal-height rule are gone). Title, step line and joined control unchanged; the control keeps one position under
  the tallest slide. Real preview at 320 and 375, all four steps, with a temporary browser-only photo; storefront
  without photos and desktop at 1440 rechecked.
- **2026-10-05, size guide link (owner)**: „Таблица с размери“ sits at the right of the size label's row on phones too
  (it used to drop under the size boxes below 750px). Smaller and secondary: Jost 11px, sentence case, ink at 72%,
  thin underline (full ink on hover). A 44px-tall invisible tap area fills the space between the option above and
  the boxes without covering either. The label keeps 12rem free and wraps; the link stays on its last line. Guide
  dialog unchanged. Real preview, Пръстен с верижка: 375 (one line, 47px clear), 320 (label on two lines, 72px
  clear), 1440 (127px clear); dialog opens; no sideways scroll.
- **2026-10-05, size guide text (owner)**: removed the paragraph „По пръстен, който вече носите: измерете вътрешния му
  диаметър…“ from the guide (default of `size_guide_content`; no template overrides it). The table is unchanged. Real
  preview: the guide now reads intro, ring sizer, tips, the thread warning.
- **2026-10-05, footer social block (owner)**: the large Facebook/Instagram block above the footer is no longer printed
  on collection pages („Най-продавани“ is /collections/all) or the collections list; the small icons under the
  newsletter stay. Still shown on Контакти (own picture and words), search, cart and other pages; homepage
  („Вижте работата ни“) and product pages keep their own sections. Real preview: gone on /collections/all and
  /collections; the footer menus start 47px (phone) / 56px (1440) from its top edge, the same as on product and
  За нас pages, so no gap; homepage, product and Контакти unchanged.
- **2026-10-05, size guide table first (owner)**: the dialog now shows the title, one line („Европейският размер е
  вътрешната обиколка на пръстена в милиметри.“), the table (48–64, same three columns, diameter still computed), the
  diameter note, a visible note („За най-точен размер използвайте пръстеномер.“), then a closed <details> „Как да
  определите размера си“ with the ring-sizer text, tips and the thread warning. New text settings
  size_guide_intro / size_guide_tip / size_guide_details_label; size_guide_content is the collapsed part (its
  first paragraph, which repeated the explanation, removed). Phone headers tighter so „Диаметър,“ fits at 320.
  Real preview: 375, 320 and 1440, no sideways scroll, no clipped cells; the section opens by click and keyboard.
- **2026-10-05, size guide jump link (owner)**: „Как да определите размера си ↓“ between the explanation and the table
  (a link to #SizeGuideHow-…, arrow aria-hidden, 44px tall). The guide's click handler opens the <details>, scrolls
  the dialog to it (smooth; instant under prefers-reduced-motion) and focuses its summary; the URL is unchanged.
  Real preview at 375 and 320: opens, scrolls to the end of the guide with all instructions visible, no sideways scroll.
- **2026-10-05, collection filters (owner)**: kept Dawn's horizontal filters and Search & Discovery (no new app).
  Phones: „Филтри“ button with a count badge (price counts once) opens the drawer; sorting sits on the bar beside it
  (hands its value to the drawer's sort, so filters and order travel together; the drawer no longer repeats it);
  drawer panels end with „Изчисти“ and „Покажи резултатите (N)“. Clearing keeps the chosen sort (Liquid + JS, since
  Dawn does not re-render the drawer footer). Chips „Изчисти всички“; desktop label „Филтри:“; zero results read
  „Няма бижута с избраните филтри.“ with a clear link that keeps the sort. Hidden: „Наличност“ (made to order), empty
  filters, an all-zero price filter, size outside ring collections. Real preview (/collections/all), 375, 320, 1440:
  filters combine (availability + price → 1, then 0 results), each chip removes only its filter, sorting keeps
  filters, „Изчисти“ keeps the sort, badge and result count follow every change, no sideways scroll. Size and
  empty-filter rules checked locally with liquidjs mocks (11 cases) because Shopify returns no such filters yet.
  Admin and data steps: docs/tasks.md §K.
- **2026-10-05, filters finished (owner)**: phones — „Филтри“ (filter icon, count badge) and „Сортиране“ (down
  arrow; the native select laid over the button, invisible) are matching outlined buttons, equal width, 48px tall,
  8px corners (shape from hestiahome.bg), ink border at 35%, Jost 13px; the bar's ruled lines dropped on phones;
  desktop unchanged. Filter order fixed in the theme: Цена, Метал, Камък, Размер, others (five passes over the
  filters, each drawn once). Product page prompts separated from option names („Изберете вашия метал / размер“), so
  the options can be renamed „Метал“ / „Размер“. Real preview: 320 (141px each), 375 (169/168px), 1440 unchanged;
  sort from the button keeps the price filter; drawer opens; ring variant 56 + бяло злато selects „56 / бяло злато /
  14К бяло злато“; bracelet shows „Изберете вашия метал“. Ordering checked with liquidjs mocks. Checklist and pending
  checks: docs/tasks.md §K.
- **2026-10-05, navigation trail (owner)**: „Начало › Пръстени“ above collection titles and „Начало › Пръстени ›
  name“ at the top of the product buy box, at every width (snippets/breadcrumbs.liquid; shape from hestiahome.bg,
  Jost 12px, links 65% ink, current page full ink, › separators hidden from screen readers, wraps when long).
  **Replaces** the desktop-only „Начало / name“ in moonmagic's grey capitals (2026-10-03); way back: git history of
  the „Navigation trail“ block in crown.css and the product-breadcrumb markup in main-product.liquid. Category on a
  product: the collection it was opened from (collection cards now link via /collections/…/products/…, canonical
  stays /products/…; not on „Всички“, which Shopify redirects); opened directly, the one top-level main-menu
  collection the piece is in, none if it is in none or several (Висулка плочка is in Висулки and Комплекти, so it
  shows Начало › Висулка плочка when opened directly). After a variant change Dawn rewrites the address to
  /products/…?variant=; the trail on screen stays, a reload uses the direct-product rule. Real preview: 320, 375,
  1440; all links followed (category link opens the collection); filter buttons unchanged (169×48, 8px).
- **2026-10-05, collection page top (owner)**: trail lower and larger, title closer to the filters. Header → trail
  0 → 20px (phone) / 28px (computer); trail 12 → 13px, still 65% ink beside the 30/40px title; trail → title 25 →
  12px; title → filters 68 → 26px (phone) and 61 → 24px (computer): title bottom margin removed, product-grid
  padding_top 36 → 24 in templates/collection.json, space above the phone buttons 16 → 8px. Real preview 320, 375,
  1440: trail on one line (a longer test name too), links and filters unchanged, no sideways scroll.
- **2026-10-05, zodiac slideshow (owner; replaces the earlier zodiac-row and single-banner instructions)**: new
  section after the categories, before the stones; 12 slides Овен … Риби, each with photo (+ phone photo), heading,
  optional text, button to a product or a non-empty collection. Words on the picture, bottom-centred; autoplay 6 s
  with a gentle fade, arrows, swipe, visible pause/play; pauses on hover/focus, stops on manual moves; reduced motion
  starts paused. No photos yet, so shoppers see nothing: **real preview** at 320, 375 and 1440 — the section wrapper is
  0px, categories run straight into the stones, no sideways scroll. **Local preview only** (liquidjs render of the
  real section with the live theme's CSS, stand-in photo from the store's files, never pushed): editor view with 12
  placeholders; text 20px from the sides / 24px from the bottom (phone), 40px (computer); autoplay 6 s, hover and
  keyboard-focus pause, arrows wrap, swipe, ←/→, manual stop, play restart, reduced motion paused, live region.
- **2026-10-05, zodiac slideshow, second pass (owner)**: arrows and the „N / 12“ counter removed; one small
  pause/play button in the picture's top-right corner; autoplay 6 s, swipe and ←/→ kept. New setting „Preview without
  photos“ (off by default) shows the 12 slides on the draft with placeholders („Място за снимка: Овен (предстои)“), the
  sign headings and a sample button that is not a link („Примерен бутон — без връзка“), plus a note that it is a
  temporary draft-only preview; switched on in templates/index.json for this unpublished draft. Guard: never when
  theme.role is main; only in the editor, on a shopifypreview.com link or an unpublished theme (7 cases checked with
  liquidjs). Real preview 320, 375, 1440: 12 slides, no links, no arrows/counter, button 44px clear of the text,
  autoplay, pause/play labels, swipe both ways, ←/→ with live announcement, wrap Овен ← Риби, reduced motion starts
  paused, no sideways scroll. **Turn the setting off when the photos are in** (tasks §L).
- **2026-10-05, zodiac slideshow, third pass (owner)**: autoplay every 3 s (was 6), fade 0.6 s. Twelve line
  indicators inside the picture, centred at the bottom under the words (active the category pink #E6BAB9, inactive
  page colour with a faint dark edge), each a button with an invisible 44px-tall tap area (14px wide at 320, 18px at
  375, 24px on computers — the widest that keeps the corner button clear at 320). Pause/play moved to the lower-right
  corner on the indicators' row. Tapping the picture, swiping, an indicator or ←/→ stop autoplay until play; a real
  link on the slide opens normally (checked with a temporary browser-only link). Draft-preview placeholders kept.
  Real preview 320 / 375 / 1440: indicators 11 / 15px from the button and 14 / 14 / 28px under the words, no
  arrows or counter, no sideways scroll; autoplay 3 s, tap stop, indicator select with aria-current and
  announcement, swipe, ←/→, reduced motion paused.
- **2026-10-05, zodiac slideshow: pause/play button removed (owner)**. Tapping the picture, swiping, an indicator
  or ←/→ now stop autoplay for the rest of the visit (nothing restarts it); hover and keyboard focus still pause it
  while they last, and reduced motion never starts it, so visitors keep a way to stop the motion. Indicator tap areas
  widened to 20px (below 360) / 24px. Real preview 320 / 1440: no button, 12 lines inside the frame and centred,
  autoplay 3 s once on screen, tap stops, indicator 6 selects Дева, swipe, ←/→, no sideways scroll.
- **2026-10-05, zodiac slideshow: title over the pictures (owner)**: „Вашата зодия“ (setting overlay_title, the
  owner's pick of four), Prata in page colour, 24px phone / 32px computer, centred at the top over a soft espresso
  shade; also the slideshow's accessible name. Placeholder labels moved below it.
- **2026-10-05, zodiac slideshow: taller, arrows on computers, autoplay returns (owner)**: frames phone 4:5 → 2:3
  (new option) and computer 16:7 → 16:9 in templates/index.json (focal points keep the jewellery placed). Previous/next
  arrows inside the picture from 750px, vertically centred; none on phones (swipe + lines). Autoplay 3 s while on
  screen and untouched; tap, swipe, arrow, line or ←/→ stop it; hover/focus pause it; it stops off screen and starts
  again when the section comes back into view (no pause button exists to override that); reduced motion never
  starts it, also after returning. Placeholder label placed under the title (it had come within 12px of the sign
  name in the taller frame). Real preview: 320 (290×435), 375 (345×518), 1440 (1300×731); title 20/20/32px from the
  top, words 14/14/28px above the lines, arrows 16px from the edges and 116px above the words, no sideways scroll;
  autoplay, swipe stop, off-screen hold, restart on return, line and tap stop, hover pause, arrow wrap, reduced
  motion checked.
- **2026-10-05, zodiac pause/play: restored, then removed again (owner)**: a small top-right pause/play with an
  explicit Pause that held through scrolling was built and pushed, then the owner asked for it to be removed; it is
  gone (markup, script, styles; the title is back to its 2rem side margins and 24px). Kept: layout, arrows on
  computers, lines, 3 s, and restart on return after any stop by tap, swipe, arrow, line or key; reduced motion never
  starts it. Real preview 320 / 1440: no button, arrows on computers only, autoplay, swipe stop, off-screen hold and
  restart on return (the test pane delivers visibility only while it renders; checked with screenshots forcing frames).
- **2026-10-05, homepage review follow-up (owner, five changes)**:
  1. One heading scale, the opening line largest: opening 32 / 44 / 52px, every section title 26 / 32 / 40px
     (phone / tablet / computer), one block at the end of crown.css (homepage `main` only). Before: opening 23px vs
     „Най-продавани“ 30px on phones, 40 vs 46px on computers. Real preview: all single lines except „Всеки камък има
     значение“ (phone) and the two-sentence custom-order title; the phone pendant stays fully visible above the text.
  2. „Вижте всички бижута“ under the categories → /collections/all (setting all_label), the same button as
     „Вижте всички“ under the bestsellers (phone 345×54px 12px capitals; computer 360×56px 14px).
  3. Newsletter section „Първи научавайте“ switched off (`disabled`, restorable); the footer signup stays.
  4. Custom-order introduction shortened to „Показваме само част от моделите на ателието. Опишете бижуто, което
     търсите, и ще ви отговорим.“ (no repeat of the workshop's „друг камък, метал или размер“); email, Instagram and
     Facebook links kept.
  5. Vendor hidden on the homepage bestsellers cards (the only cards that showed it). The vendor field still says
     „Crown Jewellery“ in admin; it appears only in Shopify's hidden tracking data.
  Phone page 6,201 → 5,887px; page ending (custom order + social + footer) about 2,190 → 1,770px. „Вижте работата
  ни“ and the footer social icons kept. Zodiac behaviour unchanged.
- **2026-10-05, product page (owner, three changes)**:
  1. Computer gallery: Shopify's thumbnail layout (product.json gallery_layout columns → thumbnail): one 835px photo,
     131px thumbnails below that switch it; zoom (lightbox) kept; phones unchanged (swipe, no thumbnails). The info
     column stays sticky beside it (add-to-cart at about 630px on a 900px screen).
  2. Purchase area (crown.css block „Product purchase area“): title 30px phone (26px below 360px, so long names stay
     at about three lines) / 36px computer, price 22px, add-to-cart 54px tall, metal menu full width (was 28rem).
     Button colour, variants (size 58 → variant updates), size guide and Judge.me stars unchanged.
  3. Lower order in product.json: purchase → enquiry form → Judge.me reviews → „Може да ви хареса“ → „Наскоро
     разгледани“ → social. „Попитайте за това бижу“ still jumps to #zapitvane; recently viewed collapses to 0px for a
     first visit (no gaps).
  Real preview 320 / 375 / 1440. Product descriptions, photos, prices and availability left for the data cleanup.
- **2026-10-05, product cards (owner, three changes)**:
  1. Square frames: collection.json image_ratio adapt → square (the homepage row was already square); card photos
     fitted inside (object-fit contain) on a white frame, never cropped. Rows now align (names at one height).
  2. Phones: the grid keeps the page's 15px margins with a 12px gap (**reverses** the 2026-10-04 edge-to-edge 4px
     grid; way back: delete the „Product cards, second pass“ block in crown.css); words aligned with the picture.
     Names 17px on phones (16px below 360px; 18px gave four lines to a long name at 375) / 20px from 750px; prices
     17px. Swatches fit at 320.
  3. „Изчерпано“ 11px with tighter padding (96×25 → 78×20px at 375).
  Real preview 320 / 375 / 1440; filters, sorting, trails, swatches and links unchanged; product data and admin sorting
  untouched.
- **2026-10-05, cart drawer and /cart (owner, four changes; cullinan-cart.css, main-cart-items.liquid)**:
  1. /cart matches the drawer: the quiet square quantity box and the „Общо“ row (small-capitals label left, amount in
     Prata 22px right, delivery note under it).
  2. −, number and + are 44px squares (box 132×44px) in both; „Премахни“ a small underlined word with a 44px tap
     area, 2rem from the box (below it on /cart phones).
  3. „Към плащане“ 54px (was 48), colour and hover unchanged. Drawer list takes its own height (flex 0 1 auto,
     min-height 0): short carts have the totals right under the pieces; long lists scroll above a visible footer.
  4. /cart prints the unit price only from two pieces up („€200 за бр.“, the drawer's existing string); at one piece
     the line total says it once.
  Not copied to /cart: the drawer's „Връщане до 14 дни …“ and „Наложен платеж …“ (still flagged, tasks A2 / returns).
  Real preview 375 / 1440: empty, one item, quantity 1→2, six lines (scroll), four removals, minus, empty again,
  in the drawer and on /cart, through the real controls; cart API only to fill test carts, emptied afterwards; no
  checkout opened. Data quirk seen: two lines read „14К жълто злато · Размер 53“ (variants differing only in the
  hidden colour option).
- **2026-10-05, fifth round (owner)**, real preview at 320, 375 and 1440 (no sideways scroll):
  - „Най-продавани“ confirmed live.
  - Category slider (phones): circular 44×44 arrows (disabled faded) and line indicators between them; active line
    #E6BAB9 (the Add to cart pink), others faint; each line a 44px button; updates on swipe, arrows and taps. Links
    still aligned (467 / 411px). Desktop grid unchanged.
  - Product rows on phones/tablets: arrows on the title row at the right (lifted out of the slider, title keeps
    10.4rem free); „Може да ви хареса“ wraps to two lines clear of them; Наскоро разгледани already did this.
  - Workshop slides: photos per slide, independently; phones show the photo (4:5) above the text; editor-only
    labelled placeholders for missing photos; storefront text-only for those. Checked with a stand-in in the browser
    only (no real photo exists).
  - Reviews: design unchanged (local mock only); peek on phones still not built — needs a workaround beyond
    Judge.me's Testimonials carousel; awaiting the owner's go-ahead.
- **2026-10-05, fourth round (owner)**:
  - Product row heading „Най-продавани“ (owner's wording; the owner's editor save had not reached the draft theme,
    so it was set in the template). Flag stands: the row lists the catalogue, not sales.
  - Phone category slider after Cartier's mobile service cards (stacked cards there: a 3:5 photo, centred small-caps
    title, short text, underlined link): 4:5 photo, centred name and sentence, underlined link with a 44px tap
    height pushed to the bottom so every link aligns (467px at 375, 411px at 320, all six slides), a pale-marble band
    (#F3EBE6), outlined 44×44 arrows with a faded disabled state. Real preview at 375 and 320: no sideways scroll.
    Desktop grid unchanged.
  - Reviews: Judge.me Testimonials carousel styled (square, Jost 18/16px, rose gold, outlined arrows, centred
    heading). Checked on a LOCAL mock built from Judge.me's real markup and stylesheet (version 771) with labelled
    test text only; the storefront section stays hidden. Limit: the Testimonials carousel shows one card and fades —
    no peek of the next card without overriding Judge.me's script; the free Cards carousel shows one whole card on
    phones too.
- **2026-10-05, reviews wiring (owner)**: owner added Judge.me's Testimonials carousel; its sample reviews switched off,
  English header blanked, colours set to ours. Product rating moved under the title, linked to the Judge.me widget,
  hidden without reviews (the empty-stars fallback removed). Real preview at 375 and 1440: reviews section and hero
  line hidden, no product stars, one widget with „Напишете отзив“, no duplicate badge. Populated states only tested
  offline (liquidjs).
- **2026-10-05, third round (owner)**, checked on the real preview at 375 (and 320) and 1440:
  - Workshop on phones: button on its own row, „Опишете своето бижу“ under it, arrows and step marks one centred row;
    all four slides fit at 320. Slide 1 (longest) sets the section height, so shorter slides leave space above the
    arrows — kept to avoid the page jumping between slides. The owner's reference screenshot did not arrive.
  - Categories on phones: a slider with name, one short sentence (drafted from site facts only) and a button; all six
    links return 200 with products. A first version widened the page to 1558px (Dawn's absolutely positioned
    visually hidden text escaped the scroll track); fixed with `position: relative` on each slide.
  - Judge.me check: free plan includes the review widget, star badge, cards/testimonial/video carousels, reviews
    grid, trust badge, medals and a basic reviews carousel; not the pop-up/sidebar, AI summary, review snippets or the
    „Happy Customers“ all-reviews page. Shop-wide average and count exist as `shop.metafields.judgeme.all_reviews_rating`
    / `all_reviews_count` (our store's own Judge.me settings already use them for its all-reviews badge).
  - Hero rating line built (setting, hero only); homepage reviews rebuilt around a Judge.me app block; both read the
    same count. Verified hidden at 0 reviews on the preview; populated states tested with liquidjs mocks only.
- **2026-10-05, second round (owner)**, each checked on the real preview at 375 and 1440:
  - Categories: two-column square grid on phones (167px tiles; section 1552 → 655px), names only; taglines removed at
    every size (cleared from the six blocks; the setting stays). Computer tiles unchanged.
  - Product row heading „Бестселъри“ → „Нашите бижута“ (it shows the catalogue, not sales). Products and square frames
    unchanged.
  - Header menu: the 0.25rem lift on hover, focus and open dropdown removed (it was what moved the words; the weight
    never changed); a 1px underline marks hover, keyboard focus and the current category, menu words and dropdown
    links alike. Checked with a real hover and real Tab presses: underline on, position unchanged (468, 68.6).
  - Product-row arrows (featured-collection rows and Наскоро разгледани): caret 0.6 → 0.8rem, full ink; disabled 25%;
    44×44 targets. Gallery and reviews arrows unchanged. Counter still hidden.
  - Workshop slides linked: Пръстени, Висулки, Обеци, all — „Вижте пръстените“, „Вижте висулките“, „Вижте обеците“,
    „Разгледайте бижутата“; each link returns 200 with products (1, 1, 1, 4).
  - Three template pushes dropped again and were re-sent with a byte change.
- **2026-10-05 (owner)**, checked on the real preview:
  - Homepage product row renamed „Избрани бижута“ → „Бестселъри“; same products (collection all) and layout. **Flag: not
    based on sales** — the store has no orders; the row shows the whole catalogue. The name was „Избрани бижута“ for that
    reason (2026-10-04); revert or switch to a curated/sales-based collection once orders exist.
  - Workshop slides on phones: title 22px, step 11px, heading 20px, text 15px, a 44px compact button, tighter gaps;
    section 547 → 477px tall at 375. Photo layout (previewed with stand-ins in the browser only): photo 345px first,
    controls, text, button. Computer and tablet unchanged.
  - Categories on phones: reviewed, not changed (see docs/tasks.md J).
- **Evening round (owner)**, each verified on the real preview at 375 and 1440:
  - Social band wording: „Още от нашите бижута“ / „Разгледайте снимки и видеа във Facebook и Instagram.“ (product pages
    and the footer's social block on other pages); links kept. CLAUDE.md gains one line on how Bulgarian copy should read.
  - A Shopify theme-editor save (b403e0c) had written back an older `main-product.liquid` without the per-variant stone
    rule (that push had been dropped); restored from 24f556f.
  - Workshop slides show without photographs in a text-only layout (photos all or nothing); „Занаят с история“ switched
    off on the homepage; section title 26–40px.
  - Контакти: the picture behind the Facebook/Instagram buttons now starts at the footer's top edge (the strip was 16px
    on a computer, 7px on a phone); words unmoved.
  - Product rows: the „1 / от 4“ counter hidden visually; arrows checked (next asks the right scroll, previous enables).
  - За нас: no promotional social block in its footer; other pages unchanged.
  - Trust slider on phones: cards 82% wide, 16px gap, ~62px of the next card visible; computer unchanged.
  - Rating near the hero: proposal only (`docs/tasks.md` I).
- **Trust row slides on phones (owner)**: after hestiahome.bg's mobile trust row (checked live: a CSS scroll-snap row,
  cards 266px with the next peeking, no dots, no autoplay). Ours: one card per screen, a small dot indicator,
  keyboard scrolling, no autoplay. Computer and tablet unchanged. Verified on the real preview at 375 and 1440 (dot
  and key navigation checked by recording the requested scroll targets: the pane runs no animation frames).
- **Social wording (owner)**: product pages read „Вижте бижутата в действие“ / „Разгледайте още снимки и видеа на
  нашите бижута във Facebook и Instagram.“. To keep „Вижте работата ни“ on the homepage only, the footer's social
  block on other pages (collections, За нас, search) now uses the same new words — a reading of "homepage only"; way
  back: `social_heading` / `social_text` in `sections/footer-group.json`. Контакти unchanged.
- **Product buying information (owner)**: „Начини на плащане“ accordion and the courier trust line removed; couriers
  stay in „Доставка и връщане“. Spacing even (18–25px) at 375 and 1440 on the preview. Payment and returns unchanged.
- **Product enquiry test passed (owner, real Shopify data)**: the email arrived and its link opened the selected
  metal and size. Контакти form also tested and working (owner). Open: the gold named twice in variant titles (Admin data). Size „54 55“ fixed by the owner: sizes 53–60, 128
  variants, all buyable; size 53 has no variant pictures yet (checked on the preview).
- **Workshop slides built (owner approved the layout)**: one section, up to four slides, owner's shorter copy, links
  chosen in the editor only, hidden from visitors until every slide has a photograph and a heading; the old story band
  stays until then. Checked locally (real Liquid via liquidjs, real CSS/JS in a mock with generated pictures, 1440 and
  375); **not visible on the real preview until photographs are uploaded**.
- Specs, third pass **(owner)**: stone fields stop falling back to the product once any variant has stone data;
  single-variant products read the variant first. Substituted-data tests only (15 checks).
- Docs correction: the product page has had no copy of the FAQ since 2026-10-03; the theme guide said otherwise.
- Workshop story proposal (one section, four slides) recorded in `docs/tasks.md` G; not built.
- Two template pushes dropped again (sent within a minute of another push); re-sent with a byte change.

## 2026-10-04 — documentation reorganised
- CLAUDE.md archived verbatim as `docs/archive/CLAUDE-original.md` and rewritten as a short entry point; current
  design system, theme guide, this changelog and the task list split into `docs/`.
- The "fourteen luxury rules" of the old file are reframed as observations from the reference research, not
  universal rules (owner's brief). moonmagic is no longer the default reference; references are chosen per question.
- The unqualified „Връщане до 14 дни“ card and product line removed until the returns policy for made-to-order
  pieces is confirmed **(owner)**; trust band now fits any number of cards. Existing returns wording flagged
  (`docs/tasks.md`).
- Verified on the new preview link (desktop and phone): trust band, hero, square buttons, whole-number prices,
  product phone link and trust lines, footer note, Контакти shop row. Found: the phone hero picture does not fill its
  square (logged, not fixed in this documentation stage).

## 2026-10-04 — wave 2: trust and consistency **(owner: "everything", Hestiahome's trust method)**
- Capitals strip under the hero hidden; the benefits row redesigned as a **trust band** of icon cards and moved under
  the hero (cash on delivery, Econt/Speedy delivery, engraving and care). Free delivery left out: terms unknown.
- **Square buttons** (`buttons_radius` 40 → 0) and one size from 750px (5.6rem, 14px capitals); hero button 34rem.
- Filter/sort bar restyled; empty category tiles in the hero gradient; footer link column gains a **note** (shop address
  and hours); Контакти shop row gains hours; product page gains **trust lines** under the button.
- Homepage order: hero, trust, pieces, categories, stones, story, reviews, custom request, social, newsletter.
- Fonts kept (Prata + Jost) on evidence.
- Mistake fixed: an icon value (`ring-tools`) not in the section's option list; `tools/validate-templates.mjs` added.

## 2026-10-04 — wave 1: the luxury goal **(owner: luxury jewellery at a high price; change any page)**
- Reference research (Tiffany, Van Cleef & Arpels, Ole Lynggaard, Pomellato, Jessica McCormack, Mejuri, Catbird,
  Kirkorian Diamonds, Aristo, ASTO Gold; Cartier and Bulgari unreadable).
- Whole-number prices (`money_without_trailing_zeros`); buy-box price 22 → 18px, cards 18 → 15px.
- Hero heading 40px max; hero with the owner's first photograph (pendant positioned at 50% 70%, light words at the left
  over a gradient on computers).
- „Най-продавани“ → „Избрани бижута“ (nothing has sold); silver banner and „Ново при нас“ hidden; stones lead with
  diamond; top bar „Ръчна изработка от 1991“; first-screen claims as specifics (later replaced by the trust band).
- Контакти shop row and footer link; **order by phone** product block.
- Engraving confirmed as offered **(owner)**.

## 2026-10-04 — direction C rounds
- Round 2: rope line removed **(owner)**; footer on scheme-5 with `#CDB5A8` hairlines; product social band to scheme-6;
  hero button red → ruby `#D62246`; headings +21% ink (0.012em stroke) **(owner asked ~20% bolder)**; phone product
  pictures larger (rows 240px, grids 186px); menu dropdown/drawer on scheme-6; phone menu words in Prata;
  `image_marquee` hidden.
- Direction C applied **(owner chose "Мрамор")**: marble and rose-gold schemes, rosewood buttons, Prata headings in
  sentence case (self-hosted), espresso newsletter, warm empty slots. (Rope line: superseded the same day.)
- Custom-request band and the Identity directions board built after the owner said the site felt too close to
  moonmagic (all homepage sections had a twin on theirs).

## 2026-10-03
- Story bands merged into one "facts as a list" band; За нас texts shortened **(owner)**.
- Reviews section (hand-filled, draft-only samples), cart drawer redesign, header menu redesign (no underline, black on
  hover, lift, corner picture), breadcrumb, buy box tightened, colour row hidden wherever a material names the colour,
  card circles pick the variant whose material names the colour, zoom viewer, titles at 550 (superseded by Prata).

## 2026-10-02
- Product gallery as square tiles; product cards three across; accordion arrow chevron → minus; Начини на плащане tab.

## 2026-10-01
- Judge.me installed by the owner (free plan) and restyled; recently viewed row; buy-box text black, metal before size;
  stars above the title; footer text black; product-page social band; narrow-phone fixes.

## 2026-09-28 to 09-30
- Options as words on the product page, circles on cards; colour option hidden when covered by material; Add to cart
  matched to moonmagic (later smaller) with pink hover; made-to-order line; express checkout button removed
  **(owner)**; stones row built and reworked (phone looping carousel); new-arrivals banner; FAQ rebuilt; ring-size
  answer researched; quantity selector removed **(owner)**; stock not counted (continue selling) **(owner, in Admin)**.

## 2026-09-20 to 09-27
- Silver banner (words over a full-bleed picture); hero button bright red **(owner)** and rectangular; buttons a pill
  site-wide **(owner; superseded 2026-10-04)**; hover lift; button sizes matched to moonmagic (superseded on computers);
  product page built on Dawn with a specs block from metafields; card swatches swapping picture and price; product row
  sized to moonmagic.

## 2026-09-13 to 09-19
- Self-hosted Jost with Cyrillic after finding Shopify's fonts have none (superseded for headings by Prata); За нас and
  Контакти pages; top bar layout and hide-on-scroll; footer link columns and newsletter; phone hero with words below the
  picture; pink panels (superseded); image marquee; social follow section.

## 2026-09-06 to 09-12
- Fork of Dawn 16 connected to Shopify; first palette and fonts (settings file was being rejected until values were put
  inside their ranges); hero words over the photograph agreed as the first exception; name back to Cullinan Jewellery.
