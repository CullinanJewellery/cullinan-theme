# Shopify upload checklist (one per piece)

Owner's steps in Shopify admin after a piece's photos are approved (2026-10-14). Avoids the problems we had:
photos not switching with the metal, sizes without a picture (ring A sizes 53–60).

## Files

- [ ] File names in Latin, from the piece folder's names: `prasten-<code>-<metal>-<n>.png`
      (metal: `zhalto`, `byalo`, `rozovo`; n: 1 standing, 2 lying flat, 3 on the hand). Example:
      `prasten-3353-zhalto-1.png`. Cyrillic names break in links.
- [ ] Five photos: yellow 1, 2, 3; white 1; rose 1 (silver uses the white photo — upload it once more as
      `...-srebro-1.png` only if the product has a silver option).

## In the product (Products → the product → Media)

- [ ] Upload all photos; order: yellow 1, yellow 2, yellow 3, white 1, rose 1 (silver 1).
- [ ] **Alt text = the exact metal option value**, letter for letter, as in the variant (e.g. `14К жълто злато`,
      `14К бяло злато`, `14К розово злато`, `Сребро 925`). This is how the site shows only the chosen metal's photos
      (`snippets/cj-metal-photo.liquid`). Click the photo → "Add alt text".
- [ ] **Every variant gets its picture:** Variants → Group by → Color (the metal) → set the picture for the whole
      metal group, so every size has it. Yellow → yellow 1, white → white 1, rose → rose 1.
- [ ] Save, then open the product on the preview: choose each metal and two different sizes; the gallery must
      change to that metal's photos every time, then the material card last.

## After

- [ ] Tell Claude the product is uploaded (and its handle), so the piece sheet's status is updated.
