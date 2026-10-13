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
| White gold | bright rhodium white: cool, clean silver-white with crisp dark mirror reflections, no gold tint. **Every ring's white gold must match ring A's white gold photos** (owner, 2026-10-13: ring B's lying-flat white came out lighter and colder, which the owner noticed) |
| Rose gold | warm soft pink-copper, rich but elegant; match ring A's rose photos |
| Silver | uses the white gold photos (same look) |
| Size, place | the piece **exactly centred**, as large as on moonmagic.com: a slim upright ring fills about 78% of the height |
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
   White gold tends to come out too cold: ring A's white has a very faint warm champagne undertone; if the result
   is colder, one more edit asking for exactly that.
5. **Upscale** every keeper to 4K (2 credits each), then crop locally to a centred square so the piece is exactly in
   the middle at the standard size, and save 2048 × 2048 into the metal folder with the names above. Nothing else is
   done locally: colour, shadow and background changes are always Higgsfield edits (owner, 2026-10-12).
6. Check before handing over: corners 250–253, gold average close to ring A's, the piece centred to within a few
   pixels, the design matching the raw photo (count the balls).
