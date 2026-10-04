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
