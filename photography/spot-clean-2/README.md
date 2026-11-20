# Spot cleaning, second pass (2026-11-20)

Local and free. Python with numpy, OpenCV and Pillow; the jewellery outline comes from rembg (BiRefNet-general, CPU).
Run with `python -I` from a work folder that holds `inv.json` (the studio photos and their pre-gold-F copies).

| Script | What it does |
|---|---|
| `batch2.py` | Every studio photo: spots on the paper neutralised, the shadow smoothed away from the metal. Pixels inside the jewellery outline (BiRefNet matte = 1) keep their exact bytes. Writes `out3/` and the matte `out3/NNN_A.npy`. |
| `openwork-frames.py` (+ `wsfix.py`, `unitfit.py`) | The 12 openwork zodiacs: the gold F step had painted the paper inside the Greek-key frame gold. The frame is 8 identical key units round the circle; one clean unit (`unit_med.npz`, the median of Телец's 8) is placed on every unit of every pendant by matching the photo's edges in polar coordinates, and the paper inside is rebuilt neutral with the approved photo's own light. The figure keeps its exact bytes; the walls and bevels the photo shows stay gold. |
| `bee-edges.py` | Пчела: the wing openings' edges rebuilt from the yellow photo's own colour (gold vs neutral paper), paper next to the metal continued from the paper a few px away (removed grey smudges); the rhodium body untouched. |

Not used on the red-cord bracelets (19): the pass made the cord's soft pink shadow a hard grey edge, so those photos
stay as they were. Backups of every replaced file: `<piece>/чернови/преди петната 2 2026-11-20/<metal>/`.
