# Spot cleaning, second pass (2026-11-20)

Local and free. Python with numpy, OpenCV and Pillow; the jewellery outline comes from rembg (BiRefNet-general, CPU).
Run with `python -I` from a work folder that holds `inv.json` (the studio photos and their pre-gold-F copies).

| Script | What it does |
|---|---|
| `batch2.py` | Every studio photo: spots on the paper neutralised, the shadow smoothed away from the metal. Pixels inside the jewellery outline (BiRefNet matte = 1) keep their exact bytes. Writes `out3/` and the matte `out3/NNN_A.npy`. |
| `openwork-frames.py` (+ `wsfix.py`, `unitfit.py`) | **Tried, not used.** Opening the 12 openwork zodiac frames: one clean key unit (`unit_med.npz`, the median of Телец's 8) placed on each of the frame's 8 units in polar coordinates. Clean at 1×, but at 2× slivers of the gold-painted floor stayed with ragged edges (the AI's floor fades into the walls, so there is no edge to follow). Kept for reference. |
| `bee-edges.py` | Пчела: the wing openings' edges rebuilt from the yellow photo's own colour (gold vs neutral paper), paper next to the metal continued from the paper a few px away (removed grey smudges); the rhodium body untouched. |

Not used on the red-cord bracelets (19): the pass made the cord's soft pink shadow a hard grey edge, so those photos
stay as they were. Backups of every replaced file: `<piece>/чернови/преди петната 2 2026-11-20/<metal>/`.

## 2026-11-21: openwork zodiacs remade instead

The zodiacs were redone from the AI originals with `gold-standard.cjs --keep-sat` (pixels much less saturated than the
metal at the same brightness, such as the channel floors, keep their own colour, so they are not painted gold), then
`bg-soft.cjs` and framed to the approved photo (scale and offset from the outline, refined by correlation).
