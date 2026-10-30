# Yellow lying: 02 for plain bands, 01 (main) for stone rings

Model `nano_banana_2_1`, `resolution: 4k`, `thinking_level: high` (3 credits).

## Plain bands (ring A, B): 02 lying flat

References: the passed yellow 01 standing photo (the ring and its gold), then one raw photo showing the decorated
part clearly. **No ring A photo** (lesson 1). The ring lies flat, seen from above at about 45°, the whole circle an
oval.

## Stone rings (ring C, solitaires): 01 lying, the main photo (owner, 2026-10-14 „A“)

There is no standing photo to copy the gold from, so this is made like 01 standing, in **one step**: references, in
this order, the piece's raw photos (1–3 clearest, cropped to the ring), then ring A's yellow main photo
(`d3489c52-abd2-4c39-be89-cfc835b71a0c`) for gold, polish, light, background and shadow only. Pose: moonmagic's
stone rings (`staging.md`).

### The look the owner chose is Nano Banana 2.1's (2026-10-14, lesson 29)

Ring C's job 1716a697 (made with the Nano Banana prompt below the GPT one, with the BACKGROUND paragraph) has the
gold, shadows and quality the owner wants; its only fault was the bead count, because no raw photo showed the ring
lying. **Next stone ring: get a raw phone photo of it lying flat first (raw-photo guide), give it as the first
design reference, write the row out element by element and the equal sizes, ring A last for the look.** The GPT
route below gets counts right but the owner rejected its look, even after `gold-match.cjs`.

### GPT Image 2.5, then gold-match.cjs (passed the checker on ring C; the owner rejected the look, lessons 25–29)

1. `gpt_image_2_5`, **`quality: high`**, `resolution: 4k` (returns 2880 px), **`count: 2`** (2 × 4.25 = 8.5 credits;
   pick the better one). Same references and order as above. Write the decorated row out element by element, give
   the total, say which parts are equal, ask for everything in focus (lessons 21, 22, 26). Nano Banana 2.1 drew the
   wrong bead count in four tries.
2. `node gold-match.cjs <photo> <out>`: moves only the gold to ring A's (owner's OK, 2026-10-14). GPT draws the gold
   lighter and yellower and no prompt fixed it; a Nano Banana gold edit went copper and soft (lesson 27). Free.
3. `node check-photo.cjs yellow <out> --lying`, then `frame-photo.cjs 2`, then the check again with `--framed lying`.

The prompt that passed (ring C, jobs 5e2cbfb3 / a66b969d). Since the medium-quality version below it adds: all
stones and beads "EXACTLY THE SAME SIZE … never bigger", the white frame "clearly wider than a thin line", the FOCUS
paragraph, icy white stones "never … yellow or champagne", the gold described as "warm honey-amber … soft peachy
warmth" and "ultra-detailed, crisp, high-end macro product photography".

```
Create a premium e-commerce jewellery product photo, square 1:1, of the real gold ring shown in the first three
reference photos (phone photos of the same ring standing in a paper cup: ignore the cup, the slot and the fingers).
The last reference photo shows only the photographic look to copy (background, light, shadow, gold colour and
polish): do not copy its ring or its pose.

THE RING, copied exactly, nothing added or removed:
- A thin, delicate, handmade 18K yellow gold ring.
- FIVE small round stones, all exactly the same size: clear, colourless, brilliant-cut cubic zirconia that sparkle
  like small diamonds, icy white with crisp facets (never milky, grey, yellow or champagne).
- Between every two neighbouring stones there are exactly THREE small round polished gold beads, never two, never
  four. The row reads: stone, bead, bead, bead, stone, bead, bead, bead, stone, bead, bead, bead, stone, bead, bead,
  bead, stone. Twelve beads in total. ALL TWELVE BEADS ARE EXACTLY THE SAME SIZE: the beads in the two outer gaps
  are the same size as the beads beside the middle stone, never bigger. Each bead is a little smaller than a
  stone's cup.
- Each stone sits in a small round cup, all five cups the same size. The whole flat front face of each cup is bright
  white rhodium and must be clearly seen: a distinct, bright white frame round every stone, clearly wider than a
  thin line. The sides of the cups and all the beads are yellow gold.
- The other half of the ring is a thin, plain, smooth, polished gold band.

POSITION, like a luxury jeweller's catalogue photo of a stone ring: the ring lies FLAT on the surface (not tilted,
not standing), seen from the front and a little above, about 25-30 degrees. The half with the stones and beads is at
the front, nearest the camera. The middle stone faces the camera straight on; the stones either side turn gradually
with the curve of the band; the two end stones, at the far left and far right of the ring, are seen more from the
side. The three beads in each outer gap are seen at an angle, all three clearly visible and the same size as the
others. The plain half of the band is at the back, higher in the picture; its inside is visible and is plain, smooth
gold with no holes. Physically real: every stone faces outward from the band, nothing floats, a soft contact shadow
where the band touches the surface.

FOCUS: everything in sharp focus from the far left end to the far right end and the back of the band, like a
focus-stacked high-end catalogue photo. The end stones and their beads are exactly as sharp and detailed as the
middle stone. No depth-of-field blur, no soft focus anywhere on the ring.

LOOK, from the last reference photo: one seamless sweep of bright off-white #FCFBFC from edge to edge and corner to
corner, as bright at the corners as in the centre, no horizon, no table edge, no vignette, no reflections on the
surface; soft diffused studio light; a soft natural neutral grey shadow with a thin darker contact shadow. The gold
exactly like the last reference photo: a warm honey-amber 18K yellow gold with a soft peachy warmth (mid-tones about
RGB 212, 172, 104), deeply polished with bright mirror highlights; not lemon-yellow, not greenish, not pale, not
orange, not rose, not copper.

The ring fills about 65% of the picture's width, centred. Ultra-detailed, crisp, high-end macro product photography.
No props, no text, no logo, no other jewellery.
```

Ring C: both variants 3, 3, 3, 3 equal beads; B chosen (clearer white frames); gold 224, 185, 133 → gold-match.cjs →
206, 167, 116; framed, it passes every check. Still lighter than ring A: the shadow under the ring.

Earlier medium-quality version (jobs 79515bc9, f367c5c3; the owner found the ends blurred, the end beads bigger, one
variant with pink stones):

```
Create a premium e-commerce jewellery product photo, square 1:1, of the real gold ring shown in the first three
reference photos (phone photos of the same ring standing in a paper cup: ignore the cup, the slot and the fingers).
The last reference photo shows only the photographic look to copy (background, light, shadow, gold colour and
polish): do not copy its ring or its pose.

THE RING, copied exactly, nothing added or removed:
- A thin, delicate, handmade 18K yellow gold ring.
- FIVE small round stones: clear, colourless, brilliant-cut cubic zirconia that sparkle like small diamonds (never
  milky, white-opaque or grey), evenly spaced along one half of the ring.
- Between every two neighbouring stones there are exactly THREE small round polished gold beads, never two, never
  four. The row reads: stone, bead, bead, bead, stone, bead, bead, bead, stone, bead, bead, bead, stone, bead, bead,
  bead, stone. Twelve beads in total, all the same small size (each bead a little smaller than a stone's cup),
  slightly irregular like handmade work.
- Each stone sits in a small round cup. The whole flat front face of each cup, the ring of metal round the stone, is
  bright white rhodium, clearly visible, like a white frame round every stone. The sides of the cups and all the
  beads are yellow gold.
- The other half of the ring is a thin, plain, smooth, polished gold band.

POSITION, like a luxury jeweller's catalogue photo of a stone ring: the ring lies FLAT on the surface (not tilted,
not standing), seen from the front and a little above, about 25-30 degrees. The half with the stones and beads is at
the front, nearest the camera. The middle stone faces the camera straight on; the stones either side turn gradually
with the curve of the band; the two end stones, at the far left and far right of the ring, are seen more from the
side. The three beads in each of the two outer gaps are seen at an angle and a little closer together, but all
three are clearly visible. The plain half of the band is at the back, higher in the picture; its inside is visible
and is plain, smooth gold with no holes. Physically real: every stone faces outward from the band, nothing floats,
a soft contact shadow where the band touches the surface.

LOOK, from the last reference photo: one seamless sweep of bright off-white #FCFBFC from edge to edge and corner to
corner, as bright at the corners as in the centre, no horizon, no table edge, no vignette, no reflections on the
surface; soft diffused studio light; a soft natural neutral grey shadow with a thin darker contact shadow; rich,
warm, deeply polished 18K yellow gold exactly like the last reference photo (not pale, not lemon, not orange, not
copper) with bright mirror highlights.

The ring fills about 65% of the picture's width, centred. Pin-sharp, crisp and in focus across the whole ring, no
blur. No props, no text, no logo, no other jewellery.
```

Result: A 3, 3, 3, 3 beads but the end beads bigger and the ends blurred (38%), gold 216, 180, 127; B two stones pink.

### Earlier: Nano Banana 2.1 (bead count wrong in four tries on ring C)

```
Premium e-commerce jewellery product photo, square 1:1.
<THE PIECE description from the piece sheet, with the stone type (e.g. clear sparkling cubic zirconia)>
Ignore the stand, cup, fingers and everything else in the first reference photos.
FROM THE LAST REFERENCE PHOTO take only the look, never its ring or its pose: the same soft diffused studio light;
the same soft natural neutral grey shadow with a thin darker contact shadow; exactly the same rich, warm, deeply
polished 18K yellow gold with bright mirror reflections and strong highlights (not pale, not dull, not orange, not
copper).
BACKGROUND: one single seamless sweep of bright off-white #FCFBFC, the same even tone from the top edge to the bottom
edge and from left to right, as bright and clean as the last reference photo. There is no horizon, no table edge, no
wall, no line or step between the surface and the background, no lighter or darker panels or bands anywhere.
POSITION: the ring lies FLAT on the surface (not tilted, not standing), seen from the front and a little above, about
25-30 degrees. The half of the band with the stones <and the beads> is at the front, nearest the camera; its stones
sit on the outer front edge of the band and face outward, toward the camera: the middle stone faces the camera
straight on, round, clear and sparkling in its cup; the stones either side turn gradually with the curve of the
band, and the two end stones, at the far left and far right of the ring, are seen more from the side. The plain half
of the band is at the back, higher in the picture; its inside is visible and is plain, smooth, polished gold. The
small holes behind the stones are on the inside of the front half, facing away from the camera, so they do not show.
Physically real: every stone stays set in the band facing outward from it, none turned upward or inward; nothing
floats; a soft contact shadow where the band touches the surface.
SIZE: the ring about 60% of the picture's width, centred, with empty background around it.
<QUALITY block from 00-main-quality.md, unchanged>
No gold reflection on the floor, no props, no text, no logo, no other jewellery.
```

Rhodium on stone cups, when the owner wants it clearly visible (lesson 23): "the whole flat front face of each cup,
the ring of metal round each stone, is bright white rhodium, like a white frame round every stone; the sides of the
cups and the beads stay yellow gold."

Counts the model gets wrong (lesson 22): if the raw photos do not show the piece in this pose, ask for a raw photo
lying flat from the front first; wording alone did not get ring C's three beads per gap in four tries.

Why the POSITION reads as it does (2026-10-14, ring C): the holes are behind the stones, on the inside of the front
half, so from the front they are hidden; the inside that shows is the back, plain half, smooth gold. Stones spread
over half the ring (9 to 3 o'clock) cannot all face the camera: the middle one does, the end ones are seen from the
side. (The first version said the back half's inside shows "only the holes": impossible.)

Check: counts; stones face outward and look like real zircons; the back half's inside is plain gold; gold, shine and
background with check-photo.cjs. **A fail is never sent to the owner and never patched with a GPT gold repaint
(lesson 16): fix the prompt and make it again.**

## Rings with a centre stone: 01 diagonal, the main photo (owner, 2026-10-19, rings F and G)

The owner's pose for rings with a centre stone, from Glamira's "Sosiego" main photo (pose only, described in words,
never given to the model): the ring tipped on its side, diagonal, seen from high above, stones at the upper left.
What made it work: the owner's own hand photo of the piece as the FIRST reference (true thickness and curve), a raw
photo second, an approved design picture if there is one, ring A last for the look.

```
Premium e-commerce jewellery product photo, square 1:1.
THE RING: the real ring in the FIRST two reference photos (on a finger, and in a paper cup; ignore the finger, the
cup and the background). <THE PIECE description from the piece sheet: bands, curves, thickness in mm, stones>.
POSITION, like a classic online-jeweller main photo: the ring tipped over and resting leaning on the side of its band,
placed diagonally, the camera looking down from high above (about 60 degrees); the top of the ring with the centre
stone at the upper left, stones facing up toward the camera, the band sweeping down to the lower right, the ring
opening seen as a tilted oval with the inside visible. Nothing floats; a soft contact shadow.
THE LOOK from the LAST reference image only (never its ring).
<QUALITY block from 00-main-quality.md, unchanged>
Stones clear and colourless, icy white, crisp facets. No props, no text, no logo, no other jewellery.
```

Then `gold-match.cjs --target 212,172,104`, `bg-even.cjs`, `frame-photo.cjs 1` (by height; the lying frame crops
this pose too tight), metals with `metal-swap.cjs --stone` boxes. Ring F: 76610487, ring G: 809307c9.
