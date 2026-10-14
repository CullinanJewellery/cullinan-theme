# Photography

A staging folder. Photographs land here off the camera or phone, get renamed, and
are then uploaded to Shopify. **Nothing here is ever published** — Shopify's GitHub
integration only reads the theme directories (`assets`, `config`, `layout`,
`locales`, `sections`, `snippets`, `templates`), so this folder is invisible to it.

The image files themselves are not committed either — see `.gitignore`. Git is for
the theme, not for a photo library. Keep the originals wherever you keep backups.

## Shopify has no folders

Settings → Files is one flat list. The only thing that makes it navigable is the
filename, so the names below do the work folders would.

Use Latin letters only. Cyrillic filenames break in URLs.

## Where each picture actually goes

| Picture | Where it is uploaded | Notes |
|---|---|---|
| Product photograph | The product itself — Products → the product → Media | Not Settings → Files |
| Hero photograph | Theme editor → Hero section → Image | |
| Atelier video + poster | Theme editor → Atelier section | Poster is required with a video |
| Mega menu images | Theme editor → Header → the block | 40px circles, so crop tight |
| Stone pictures | Theme editor → Stones section → each block → Picture of the stone | Six of them, square, transparent PNG |

## Naming

**Products** — `<category>-<code>-<n>.jpg`, the code being the old catalogue
number that now lives in the SKU field:

```
prasten-3353-1.jpg      first image, the one the card shows
prasten-3353-2.jpg      second image, shown on hover
prasten-3353-worn.jpg   on a hand, on a person
obeci-2841-1.jpg
visulka-1907-1.jpg
grivna-4120-1.jpg
```

Categories: `prasten`, `obeci`, `visulka`, `grivna`.

**Theme pictures** — prefixed `theme-` so they never mix with the catalogue:

```
theme-hero.jpg
theme-atelier-poster.jpg
theme-atelier.mp4
theme-menu-diamanti.jpg
```

## Shape

- **Product photographs: square.** The product rows crop to a square; anything
  else gets cut. Shoot square or crop to square before uploading.
- **Atelier footage: vertical, 4:5.** The section is built for a phone held
  upright.
- **Hero: wide.** It runs the full width of the page.
- **Mega menu: square**, and tight on the subject — they render at 40px.

Every image slot in the theme already holds its shape while empty, so photographs
can arrive one at a time without the layout moving.

## The six stone pictures

The homepage Stones section („Всеки камък има значение") has six square slots.
They are flat grey until pictures are set. Made with AI, like the Контакти
marble — the owner generates and uploads them.

**What the theme needs:** square, **transparent PNG**, at least 600 × 600 (the
slot renders at 200px on a computer and 164px on a phone, so 1024 × 1024 is
comfortable). Transparent, not white: the section sits on `#FCFCFB`, so a white
background would show as a visible square against the off-white page.

**Filenames** — Latin only, `theme-` prefix as everything else in the theme:

```
theme-stone-tsirkon.png
theme-stone-diamant.png
theme-stone-perla.png
theme-stone-safir.png
theme-stone-rubin.png
theme-stone-izumrud.png
```

### The prompt

The hard part is not one good stone, it is six that look like **one set** — same
angle, same light, same size in frame. Keep this paragraph identical every time
and change only the sentence in brackets:

> A single loose [STONE], photographed from directly above, centred on a fully
> transparent background. Studio product photography, soft diffused light from the
> upper left, one gentle shadow under the stone. The stone fills about 70% of a
> square frame. Photorealistic, sharp, high detail. No text, no watermark, no logo,
> no hands, no setting or metal, no props, no background. Square, 1024 × 1024,
> transparent PNG.

The six substitutions:

| File | [STONE] |
|---|---|
| tsirkon | a colourless cubic zirconia, oval cut, bright sparkle |
| diamant | a colourless diamond, round brilliant cut, seen from the table so the facet star shows |
| perla | a single round white pearl, soft cream lustre, smooth and unfaceted |
| safir | a deep blue sapphire, oval cut |
| rubin | a rich red ruby, cushion cut |
| izumrud | a green emerald, rectangular emerald (step) cut |

**Zircon and diamond are the trap.** Both are colourless and a camera cannot
really tell them apart, which is why they are given different cuts above — round
for the diamond, oval for the zircon — so the two tiles read as different stones
rather than the same picture twice. Check those two side by side before
uploading.

**Nothing is burned into these pictures**: no stone name, no carat, no logo. The
names are live theme text under each tile. See CLAUDE.md, Design direction.

## The shot list for a high-price shop (2026-10-04)

The goal is luxury jewellery at a high price (CLAUDE.md, "The goal"), and at that
price the pictures carry the page. What the houses we looked at do, and so what to
shoot, in order of importance:

1. **The campaign picture, the hero.** One low-key, warm picture with a single
   piece in it, the model cropped at the face. The owner's first one (a gold bell
   on a chain, uploaded 2026-10-04) is exactly this. Portrait or wide both work:
   the hero crops to the middle and sits the picture at 70% of its height, so the
   pendant stays in frame; a focal point set on the file in Settings → Files
   overrides that. Keep the left third calm, the words sit there on a computer.
2. **Each piece, alone, on one soft neutral tile.** The same warm light grey or
   ivory for all fifty, square, lit the same way every time, the whole piece in
   frame. This is the picture a card shows. Without it the site reads as a
   catalogue.
3. **One worn picture per piece, last in the row**: a hand, an ear, a neck. It
   gives scale and life; Ole Lynggaard's last thumbnail is always a worn one.
4. **A close detail**: the setting, the claws, the engraving, the hallmark. This is
   where "made by hand" is proved rather than said.
5. **The hands at work**: the bench, the 3D model, a stone being set. For За нас and
   the atelier band (video welcome, vertical 4:5).
6. **The shop and the box**: the street door at бул. Васил Левски 21, the interior,
   and the box a piece arrives in, once there is one.

Rules that do not change: nothing burned into a picture (no logo, slogan, "925",
price or badge), the same light and background across a set, and AI pictures are
allowed and made by the owner, so long as they look like pieces the atelier can
really make.

## Product photos: the ring A standard (owner, 2026-10-13)

The owner's model for every product photo is ring A, „Пръстен с топчета“ (folder `01 Пръстен с топчета - номер
предстои`). Its yellow gold standing photo is the colour and look every other photo is held to. Short version in
CLAUDE.md, „Product photo standard“. This is how that set was made, so the next piece comes out the same.

### What stays the same on every photo

| | |
|---|---|
| Background | flat seamless off-white **#FCFBFC** (RGB 252, 251, 252) edge to edge: no gradient, grey floor, vignette, horizon or texture. Measured on the finished files: 250–253 in every corner |
| Shadow | soft, wide, **neutral grey** shadow on the floor, slightly to the **left**, plus a thin darker contact shadow where the band touches; **no gold colour or reflection on the floor** |
| Light | soft diffused studio light, a bright highlight on each bead, mirror polish, no blown-out glare |
| Yellow gold | rich, warm, deep **18K-looking yellow**, deep amber in the darker areas, warm-white highlights; not pale, not orange, not brown. Measured average of ring A's gold: about RGB 208, 165, 114 |
| White gold | a clean, **neutral**, bright rhodium white, like platinum: silver-white with crisp neutral grey and dark reflections, **no yellow, beige or champagne cast** (owner, 2026-10-13: the first white photos of both rings looked yellowish; they measured blue 13–20 below red on the metal; aim for blue within about 5 of red) |
| Rose gold | warm soft pink-copper, rich but elegant; match ring A's rose photos |
| Silver | uses the white gold photos (same look) |
| Size, place | **the frame**: 01 standing, the piece 80.7% of the height, centre 50% / 51.3%; 02 lying flat, 78% of the width, centre 50% / 50.8%; 03 hand not cropped. Applied by `photography/frame-photo.cjs`, never by eye (owner, 2026-10-13) |
| File | square, 2048 × 2048 PNG for the website, cropped from the 4K upscale; 4K originals and raw crops kept in `чернови` |

### The three photos, in every metal

1. **01 основна снимка** — the ring stands upright on its edge, rotated about 35° toward the camera (classic
   three-quarter catalogue view), camera about 20° above; the band reads as an elegant oval, the plain sizing
   section at the bottom front.
2. **02 друг ъгъл** — the ring lies flat, seen from above at about 45°, the whole circle visible as an oval, the
   plain section at the front; about 78% of the frame width.
3. **03 на ръка** — a relaxed, elegant woman's hand on soft warm ivory linen, fingers together, back of the hand
   toward the camera at a soft three-quarter angle, natural skin texture, short nude manicure, soft daylight, close
   crop; the ring on the ring finger near its base at real scale (about 1.5–2 mm wide), the sharp hero near the
   centre.

### The frame and why the piece is generated small (owner, 2026-10-13)

The owner wants every piece to sit the same way on the site, like the structured product grids on other shops.
The frame is measured from ring A and lives in `photography/frame-photo.cjs`:

```
npm i sharp            (once, in any scratch folder; set NODE_PATH to its node_modules)
node photography/frame-photo.cjs 1 "<4K standing>.png"   "<metal>/01 основна снимка - <metal>.png"
node photography/frame-photo.cjs 2 "<4K lying flat>.png" "<metal>/02 друг ъгъл - <metal>.png"
node photography/frame-photo.cjs 3 "<4K on hand>.png"    "<metal>/03 на ръка - <metal>.png"
```

It finds the piece, crops a square so the piece lands at the frame's size and centre, and saves 2048 × 2048; it
prints the measured size and centre so the result can be checked. **Ask Higgsfield for the piece at about half the
picture's height** and let the script enlarge it: ring B generated big in the frame looked heavy ("fat"); generated
at half the height and enlarged by the crop it kept its fine look (owner's choice of ring B's first, uncropped
pictures). On the hand, ask for a fine, real-sized ring (about 1.2–1.5 mm band for a slim ring), never chunky.

### Never change the jewellery (owner, 2026-10-13)

An edit changes only what was asked: a colour, the background, the shadow. The piece stays exactly as it is in the
photo being edited (design, every ball and granule, thickness, size, angle, position). Compare every result with the
photo it came from before keeping it. Give an edit only the photo being edited as its reference when possible; a
second ring in the references can leak into the result.

### The steps (Higgsfield: nano_banana_2 for every edit, upscale_image 4K at the end)

1. Upload the owner's raw photos of the piece (they are the **only** source of the design) and ring A's finished
   photos (the **only** source of the style). Never use another ring's photo as the design source: ring B's first
   hand photo came out with ring A's beads.
2. **Yellow main photo**: references = raw photo(s) + ring A's yellow `01 основна снимка`. Prompt pattern:
   > Premium e-commerce jewellery product photo, square 1:1, 2048 x 2048. THE RING comes ONLY from the first two
   > reference photos (keep it identical, do not redesign, do not add anything): [exact description of the piece:
   > band, number and kind of balls, beads, granules, plain section, stones]. EVERYTHING ELSE comes from the third
   > reference photo, copy it exactly (do not copy its ring): the same pose (upright, same three-quarter view, same
   > tilt and camera height), the same size in the frame and the same centred position, the same flat seamless
   > off-white #FCFBFC background, the same soft diffused studio light, the same soft natural neutral grey shadow
   > falling on the floor to the left with a thin darker contact shadow, and exactly the same rich, warm, highly
   > polished 18K yellow gold colour with mirror reflections. No gold reflection on the floor, no props, no text,
   > no logo, no other jewellery.

   Make two, keep the one closest to ring A, then measure its gold against ring A's; if it is paler, one more edit
   with ring A as the colour reference: „Change only the gold colour: make it exactly the same gold as the ring in
   the second image …“.
3. **Photos 02 and 03 in yellow**: references = the finished yellow main + ring A's photo 02 or 03 (pose and style
   only) + the raw photo. Same wording: ring from the main photo, everything else from ring A's photo.
4. **The other metals**, for each of the three photos: reference = the finished yellow photo + ring A's photo of the
   same shot in the target metal. Prompt: „Edit the first image: change only the metal colour of the ring to [white
   gold / rose gold], exactly the same metal colour as the ring in the second image. Keep everything else exactly the
   same: the ring's shape, details, size, angle and position, the soft neutral grey shadow and the flat off-white
   #FCFBFC background.“ (Before 2026-10-13 the metals were made without ring A as a colour reference, and ring B's
   flat white drifted lighter and colder.)
   **The on-hand photo is the exception**: there ring A's photo leaks its own ring into the edit (ring B's white
   on-hand came out with ring A's continuous beads, 2026-10-13). For 03, use the piece's own finished photo of the target
   metal (its 01) as the colour reference instead. Check every result for the design, not only the colour.
   White gold tends to pick up a warm, yellowish cast from the yellow photo it is made from: measure it (blue should
   be within about 5 of red on the metal) and, if warm, one more edit: „change only the colour of the metal … clean,
   neutral, bright white, no yellow, beige or champagne cast“, with no other picture as a reference.
5. **Upscale** every keeper to 4K (2 credits each), then crop locally to a centred square so the piece is exactly in
   the middle at the standard size, and save 2048 × 2048 into the metal folder with the names above. Nothing else is
   done locally: colour, shadow and background changes are always Higgsfield edits (owner, 2026-10-12).
6. Check before handing over: corners 250–253, gold average close to ring A's, the piece centred to within a few
   pixels, the design matching the raw photo (count the balls).

### Model tests (2026-10-13, ring C „Пръстен с камъчета“, 3 credits)

- **Nano Banana 2.1** (`nano_banana_2_1`, 1.5 credits, `thinking_level: high`): new photo from the raw photos + ring
  A as style. The design came out very faithful (three bezel-set white stones between the beads, plain lower band,
  slim) and at the asked half size. Its gold was paler than ring A's (about 214, 185, 138) and the background greyish
  (about 240): one more gold/background edit needed, as with Nano Banana 2.
- In a white gold edit 2.1 kept the ring the same to 0.002 of the frame (better than 2 at keeping the piece), but
  followed colour instructions less: the white stayed slightly warm (blue 14 below red) and the grey background was
  not cleaned. Use 2.1 for creating the piece and for edits where the shape must not move; check colours after.
- **Mask editing is not available** through the connection: `mask` is listed for both models but every call answers
  "Unknown media role: mask" (no charge). It may work on the Higgsfield website's own inpaint tool.
- Cost per final photo: generate the approved final directly at `resolution: 4k` (3 credits) instead of 1k + upscale
  (3.5 credits); drafts at 1k (1.5). 2k is too small for the frame crop.

### The 18-credit set (owner, 2026-10-14; finals at 4k, 16.5 credits)

The owner set a budget of about 18 credits for a piece's 9 photos. GPT Image 2.5 (`gpt_image_2_5`, quality
`medium`, resolution `2k`) costs 1 credit and was tested on ring C's lying-flat photo (yellow to rose): the ring
stayed identical (outline to 0.001), the stones' white settings stayed white, the rose matched the approved one and
the background stayed clean. So: yellow photos with Nano Banana 2.1 at 2k (2 each, piece and ring A's gold in one
step), white and rose with GPT Image 2.5 medium 2k (1 each), silver copied. About 12 credits, 6 spare for
corrections. Everything at 2k; frame-photo.cjs makes the 2048 square. CLAUDE.md „Credits“ has the steps.

**Five photos per piece since 2026-10-14 (owner):** yellow gold standing, lying flat and on the hand; white and rose
gold standing only; silver = the white photo. About 11.5 credits at 4k (3 × 3 + 2 × 1.25). Rings A, B and C keep
their full sets.

## The workflow (2026-10-14)

Since 2026-10-14 every piece follows `workflow.md`: `staging.md` (how real jewellery sits), a sheet per piece in
`pieces/`, prompts in `prompts/`, `check-photo.cjs` for every result, a log in `log/`, and `lessons.md`. Ring C's
sheet (`pieces/03-ring-c.md`) is the first, with the owner's corrections (five stones, rhodium only on the stone cups,
stones facing the camera when lying down).
