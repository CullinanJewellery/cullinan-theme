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
