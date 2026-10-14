# Photo workflow: how each piece is made, checked and learned from

Built 2026-10-14 at the owner's request (a friend's idea): a Higgsfield workflow that documents its own work so it
gets better with every piece. Most credits so far were lost to repeated mistakes (pale or copper gold, champagne
white, background patches, a model copying the wrong photo, three stones instead of five). This makes each mistake
happen once.

## The files

| File | What it holds |
|---|---|
| `staging.md` | How real jewellery sits and how each kind is photographed. Read before every prompt. |
| `pieces/NN-name.md` | One sheet per piece: counts, two-tone areas, inside, shots, the description pasted into prompts, status. |
| `prompts/*.md` | The proven prompt for each step, with what each line is for. Improved when a result fails. |
| `lessons.md` | Short rules learned from failures. Read before every piece; add to it after every piece. |
| `log/NN-name.jsonl` | One line per Higgsfield call: date, step, model, settings, inputs, prompt file, job id, credits, measurements, verdict, reason. |
| `check-photo.cjs` | Measures a result and says pass or fail with reasons. |
| `frame-photo.cjs` | Puts a finished photo into ring A's frame. |
| `compare-sheet.cjs` | One image for the owner: raw photo(s) left, new photo(s) right, with a note (e.g. the stone count). |
| `raw-photo-guide.md` | In Bulgarian, for whoever photographs the pieces in the shop: six views, a close-up, plain background. |
| `upload-checklist.md` | The owner's Shopify steps per piece: Latin file names, alt text = the metal value, a picture for every variant. |

## Where to run it (2026-10-14)

The raw photos and the piece folders are on the owner's computer
(`C:\Users\Nitro V\Pictures\PicturesForWebFaceInstagram\pictures for the website\`). Run photo work in a session on
that computer (Claude Desktop app, or `claude remote-control` in the repository folder). A cloud session cannot open
those folders, and its network policy blocks downloads from Higgsfield's CDN; it can only view and measure images
inside Higgsfield's own sandbox (`sandbox_exec`). Look at raw photos at full size, cropped to the piece, never the
whole photo shrunk (owner, 2026-10-14).

## The steps for a new piece (approval gate, comparison sheet and checklists added 2026-10-14, owner)

1. **Raw photos** taken by `raw-photo-guide.md` (six views and a close-up). If views are missing or blurred, ask
   for them before anything else.
2. **Examine every raw photo zoomed in.** Fill the piece sheet from `pieces/_template.md`: counts, two-tone areas,
   inside, shots. Anything not certain: ask the owner, write the answer in the sheet. **No credits before this.**
3. **Tell the owner the plan and the cost** (five photos, about 11.5 credits at 4k; CLAUDE.md „Credits“).
4. **Make yellow 01 standing first** (3 credits), check it (step 6), and **send the owner a comparison sheet**
   (`compare-sheet.cjs`: raw photos left, the new photo right, the stone count in the note). **Wait for the owner's
   OK** before the other four photos, which are all built from it. A wrong ring then costs one photo, not a set.
5. **Make the other four** with the prompt files (yellow lying flat, yellow hand, white and rose standing).
   Log each call.
6. **Check every result before the next step**: `node photography/check-photo.cjs <metal> <file> [source]` for the
   numbers (gold, white, background, seams, ring unchanged against its source); then by eye against `staging.md` and
   the piece sheet (counts, stone direction, rhodium, inside). Log pass/fail and why.
7. **On a fail**: the smallest fix (colour-only, background-only); a new kind of failure → a lesson; a prompt that
   caused it → improve the prompt file.
8. **Frame** each passed photo with `frame-photo.cjs` (and `check-photo.cjs --framed`), save to the piece's folder,
   and send the owner the final comparison sheet with all five photos.
9. **Hand over** `upload-checklist.md` for the Shopify upload; when the owner says it is uploaded, check the product
   page on the preview (each metal, two sizes) and update the piece sheet's status.
10. **Report**: credits used, first-time passes, failures and what was learned; update `lessons.md`.

## Measured targets (check-photo.cjs)

- Yellow gold: average of the metal close to ring A's main photo, RGB 208, 165, 114 (each within about 10).
- Rose gold: close to 214, 160, 128 / ring C rose 222, 163, 144.
- White gold: blue within 5 of red on the metal (neutral, no yellow).
- Background corners 248–255 and even (no patch: border brightness spread under 8 outside the shadow side).
- Frame (after frame-photo.cjs): standing height 0.807 ±0.01, centre 0.500/0.513 ±0.005; lying flat width 0.780.
- Ring unchanged in a colour edit: outline (bounding box) within 0.005 of the source.
