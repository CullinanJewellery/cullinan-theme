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

## The steps for a new piece

1. **Examine every raw photo zoomed in.** Fill the piece sheet from `pieces/_template.md`: counts, two-tone areas,
   inside, shots. Anything not certain: ask the owner, write the answer in the sheet. **No credits before this.**
2. **Tell the owner the plan and the cost** (five photos, about 11.5 credits at 4k; CLAUDE.md „Credits“).
3. **Generate** with the prompt files, pasting the piece's description. Log each call.
4. **Check every result before the next step**: `node photography/check-photo.cjs <step> <file>` for the numbers
   (gold, white, background, frame, ring unchanged against its source); then look at it against `staging.md` and the
   piece sheet (counts, stone direction, rhodium, inside). Log pass/fail and why.
5. **On a fail**: fix with the smallest edit (colour-only, background-only), and add a lesson if it is a new kind of
   failure; improve the prompt file if the prompt caused it.
6. **Frame** each passed photo with `frame-photo.cjs`, save to the piece's folder.
7. **Report to the owner**: credits used, first-time passes, failures and what was learned; update `lessons.md`.

## Measured targets (check-photo.cjs)

- Yellow gold: average of the metal close to ring A's main photo, RGB 208, 165, 114 (each within about 10).
- Rose gold: close to 214, 160, 128 / ring C rose 222, 163, 144.
- White gold: blue within 5 of red on the metal (neutral, no yellow).
- Background corners 248–255 and even (no patch: border brightness spread under 8 outside the shadow side).
- Frame (after frame-photo.cjs): standing height 0.807 ±0.01, centre 0.500/0.513 ±0.005; lying flat width 0.780.
- Ring unchanged in a colour edit: outline (bounding box) within 0.005 of the source.
