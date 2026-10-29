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
| `frame-photo.cjs` | Puts a finished photo into ring A's frame (extends a flat off-white border if it must). |
| `gold-match.cjs` | Moves only the yellow gold to ring A's measured gold; nothing else changes (owner's OK, 2026-10-14). |
| `metal-swap.cjs` | White and rose from the finished yellow photo: only the metal's colour changes (owner's choice, 2026-10-14). |
| `bg-even.cjs` | Evens a tiled background to one tone; the piece, shadow and stones untouched (owner's OK, 2026-10-15). Run before framing. |
| `stone-clear.cjs` | Takes a colour cast out of a clear stone (e.g. back to an approved photo's); setting and background untouched (owner's OK, 2026-10-15). |
| `polish-curve.cjs` | Deepens a flat yellow gold (tone curve on gold only, then gold-match) when shine is below 212 (owner's OK, 2026-10-20; lesson 43). |
| `stone-look.cjs` | After the stones-only edit of a finished yellow photo, takes only the new stones into the approved photo; everything else stays (owner, 2026-10-29; lesson 56). |
| `wall-lines.cjs` | Fills the thin dark side-wall lines of a flat openwork piece with the gold beside them, below the bail (owner, 2026-10-26, Libra; lesson 47). |
| `rhodium-off.cjs` | For a piece the atelier makes without rhodium: the white setting round each stone takes the photo's own gold; stones untouched (owner, 2026-10-19; lesson 41). |
| `gold-match.cjs --target r,g,b` | Gold back to a given gold, e.g. the piece's first approved photo after edits drifted it. |
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

## Ring A's quality: what every main photo must copy (owner, 2026-10-20)

Ring A's main photo (`pictures for the website/01 Пръстен с топчета - номер предстои/жълто злато/01 основна снимка -
жълто злато.png`, Higgsfield `d3489c52-abd2-4c39-be89-cfc835b71a0c`) is the standard. Every main photo copies:

- **Deep polish.** Every bead or curve has a bright highlight, a dark mirror band and a mid tone. Strong contrast
  inside the metal, never flat even gold. (Checker: gold highlights at least 212; ring A has 216.)
1. **The shadow.** A soft, neutral grey shadow falling to the left, plus a thin darker contact line where the piece
   touches the floor. Never shadowless, never a gold tint on the floor.
2. **The background.** Flat off-white #FCFBFC, 250–252 at the edges, even, no patches or bands.
3. **Sharp everywhere.** Edges crisp from front to back, like a focus-stacked photo, no soft or blurred ends.
4. **The gold.** Ring A's colour, 208, 165, 114, rich and warm, not lemon, not copper.
5. **The size.** About half the picture's height when generated; the frame script enlarges it to ring A's 80.7%.

Every main-photo prompt includes the block in `prompts/00-main-quality.md`. **Before sending the owner any main
photo:** put it next to ring A's main photo in one picture and compare the polish and points 1–5 by eye. If it looks
flatter than ring A (or fails any point), do not send it as finished: tell the owner and decide together what to do.

## The steps for a new piece (approval gate, comparison sheet and checklists added 2026-10-14, owner)

1. **Raw photos** taken by `raw-photo-guide.md` (six views and a close-up). If views are missing or blurred, ask
   for them before anything else.
2. **Examine every raw photo zoomed in.** Fill the piece sheet from `pieces/_template.md`: counts, two-tone areas,
   inside, shots. Anything not certain: ask the owner, write the answer in the sheet. **If the piece has stones, ask
   the owner what they are** (owner, 2026-10-14). **No credits before this.**
3. **Tell the owner the plan and the cost** (five photos, about 11.5 credits at 4k; CLAUDE.md „Credits“).
4. **Make yellow 01 standing first** (3 credits), check it (step 6), and **send the owner a comparison sheet**
   (`compare-sheet.cjs`: raw photos left, the new photo right, the stone count in the note). **Wait for the owner's
   OK** before the other four photos, which are all built from it. A wrong ring then costs one photo, not a set.
   **Also put it next to ring A's main photo** and compare the polish and points 1–5 above (owner, 2026-10-20); if
   it is flatter than ring A, tell the owner before going on.
5. **Make the others** with the prompt files (yellow lying flat or hand). **Yellow to ring A's gold with
   `gold-match.cjs --target 208,165,113`, then white and rose with `metal-swap.cjs` from the finished, framed yellow
   photo** (free; no model, so nothing but the colour changes); **a `--stone x0,y0,x1,y1` box round every stone in
   both** (owner, 2026-10-15: the stone must not change). Worn photos (hand,
   body) too, with `--hand`: **show them to the owner, ask whether they like them and what more could be done to
   make them look better** (owner, 2026-10-14; lesson 32). Log each call.
6. **Check every result before the next step**: `node photography/check-photo.cjs <metal> <file> [source]` for the
   numbers (gold, white, background, seams, ring unchanged against its source); then by eye against `staging.md` and
   the piece sheet (counts, stone direction, rhodium, inside). Log pass/fail and why.
7. **On a fail**: yellow gold off → `gold-match.cjs` (free); anything in the piece itself (counts, sizes, blur) →
   a fresh photo from the raw photos with a corrected prompt, never edits of the failure (owner, 2026-10-14: "we are
   like in a circle"). A new kind of failure → a lesson; a prompt that caused it → improve the prompt file.
8. **Frame** each passed photo with `frame-photo.cjs` (and `check-photo.cjs --framed`), save to the piece's folder,
   and send the owner the final comparison sheet with all five photos.
9. **Hand over** `upload-checklist.md` for the Shopify upload; when the owner says it is uploaded, check the product
   page on the preview (each metal, two sizes) and update the piece sheet's status.
10. **Report**: credits used, first-time passes, failures and what was learned; update `lessons.md`.

## Measured targets (check-photo.cjs)

- Yellow gold: average of the metal close to ring A's main photo, RGB 208, 165, 114 (each within about 10).
- Rose gold: close to 214, 160, 128 / ring C rose 222, 163, 144.
- White gold: blue within 5 of red on the metal (neutral, no yellow).
- Background 249–255 at the edges and even (no patch: border brightness spread under 8 outside the shadow side).
- Gold highlights (polish) at least 212 (ring A 216).
- Focus (lying photos, `--lying`): the sharpest detail at the piece's left and right ends at least 60% of the centre's,
  at full resolution (no depth-of-field blur; ring C's blurred photo scored 38%).
- Frame (after frame-photo.cjs): standing height 0.807 ±0.01, centre 0.500/0.513 ±0.005; lying flat width 0.780.
- Ring unchanged in a colour edit: outline (bounding box) within 0.005 of the source.
