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

### First choice: GPT Image 2.5 (worked on ring C at the first go, lesson 25)

Model `gpt_image_2_5`, `quality: medium`, `resolution: 4k` (returns 2880 px), **`count: 2`** (2 × 1.25 = 2.5 credits;
pick the better one). Same references and order as above. Write the decorated row out element by element and give
the total; Nano Banana 2.1 drew the wrong bead count in four tries (lessons 21, 22).

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

Ring C result (jobs 79515bc9, f367c5c3): A 3, 3, 3, 3 beads, background 251, polish 230, sharp; gold 216, 180, 127
(a little yellow). B: two stones pink. The gold is still the open point.

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
