# Changelog

Dated record of decisions, newest first. Each line says what changed and why in one or two sentences; the full
reasoning, measurements and verification notes of everything up to 2026-10-04 are in
`docs/archive/CLAUDE-original.md` (search for the component or date). **New detail goes here, not into CLAUDE.md.**

Marks: **(owner)** = the owner's explicit instruction; **(superseded)** = no longer current.

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
