# Lessons (read before every piece; add after every piece)

Each line: what went wrong, the rule now, where it came from. Newest last.

1. **The style picture leaks its design.** Ring A's hand photo, given as a reference, put ring A's beads on ring B.
   → The design comes only from the piece's raw photos; for colour edits give only the photo being edited and say
   the colour in words. (Ring B, 2026-10-12/13.)
2. **A second picture can be copied whole.** A rose edit given ring C's standing photo as colour reference returned
   the standing ring instead of the lying-flat one. → Colour edits: one input picture only. (Ring C, 2026-10-13.)
3. **Gold drifts.** First tries came out pale (ring B, C) or, after a fix, too copper (ring C). → Measure the gold
   against ring A (208, 165, 114) after every yellow photo; correct with a colour-only edit naming the direction
   ("lighter and more yellow, not copper" / "deeper, more saturated"). (2026-10-13.)
4. **White gold turns champagne.** Edits keep some of the yellow, especially on beads. → Say "every bead and the
   band silver-white like platinum, no beige, champagne or yellow on any bead"; measure blue within 5 of red.
   (Rings A, B, C, 2026-10-13.)
5. **Backgrounds get patches and bands** in 4k edits (ring C lying flat). → Check the background's evenness; a
   background-only edit fixes it. (2026-10-13.)
6. **A piece generated large looks heavy.** → Generate at about half the height and let frame-photo.cjs enlarge
   it. (Ring B "fat", 2026-10-13.)
7. **On the hand the ring came out chunky.** → Ask for a fine, real-sized ring, 1.2–1.5 mm band. (Ring B, 2026-10-13.)
8. **Never change the jewellery in an edit.** → An edit changes only what was asked; compare the outline with the
   source (within 0.005). (Owner, 2026-10-13.)
9. **Counted from too few photos.** Ring C has five stones; three were drawn. → Examine every raw photo zoomed in
   and write the counts in the piece sheet; ask the owner when unsure, before any credit. (Owner, 2026-10-14.)
10. **Impossible geometry.** Ring C's lying-flat photo showed the settings turned sideways with their holes visible.
    → Stones always face outward from the metal; from inside only the small holes show; stone rings lie tilted back
    with the stones facing the camera (`staging.md`). (Owner, 2026-10-14.)
11. **Two-tone metal drawn too widely.** Ring C's whole settings were made white. → Describe exactly where the
    rhodium starts and stops (piece sheet). (Owner, 2026-10-14.)
12. **Cheap model works for colour swaps.** GPT Image 2.5 (medium) changed yellow to rose on ring C with the ring
    identical and the right rose, for 1 credit at 2k / 1.25 at 4k. → Use it for white and rose. (2026-10-14.)
13. **Gold words overshoot; a number lands.** On ring C's redo, GPT Image 2.5 told "deeper, more saturated" turned a
    pale gold (215, 174, 131) into lemon brass (211, 164, 83). The next edit, "about a third less saturated, mid-tones
    close to #D0A572" (ring A's 208, 165, 114), landed at 196, 157, 113, visually ring A's gold. → In gold edits name
    the target hex and how far to move, not only a direction. GPT Image 2.5 "4k" returns 2880 × 2880. (2026-10-14.)
14. **The checker's outline includes the contact shadow.** After a colour edit it reported the ring "moved 0.012"; the
    gold alone moved 0.004 (the shadow had lightened). → When the outline fails after a colour edit, compare the gold
    outline (red − blue > 40) before calling it a changed ring. (Ring C, 2026-10-14.)
15. **Nano Banana 2.1 ignored "about half the height"** and drew ring C at 0.78 of the height. With the thin wire and
    small beads it did not look heavy; frame-photo.cjs barely changes it. Keep the line; judge heaviness by eye.
    (Ring C, 2026-10-14.)
16. **GPT gold repaints dull the polish; "pass*" is not a pass.** Ring C's redo was repainted twice with GPT Image 2.5
    and sent with gold 200, 161, 116 (ring A 211, 167, 116), highlights 205 (ring A 216) and background 246 (ring A
    251); the checker had failed it. The owner: not the same as ring A, background, gold and polish differ. → Never
    repaint yellow gold with GPT Image 2.5; make the photo again in one Nano Banana 2.1 step with ring A's photo as
    the look reference. The checker now fails a background under 249 and gold highlights under 212 (ring A 216; `--hand` skips it). Never send the
    owner a photo the checker fails. (Owner, 2026-10-14.)
17. **"White stones" draws milky stones.** → Name the stone: ring C's are zircons, "clear, colourless, brilliant-cut
    cubic zirconia that sparkle like small diamonds, never milky". Ask the owner the stone type for every piece.
    (Owner, 2026-10-14.)
18. **Moonmagic's stone rings lie flat, not tilted**, seen from the front a little above, the stones on the front
    edge facing the camera. For stone rings that is the main photo; no standing photo (owner, 2026-10-14 „A“).
19. **A lying photo invites a horizon.** Ring C's first lying try drew a table/wall line (background 247, band 6.7).
    A BACKGROUND paragraph ("one single seamless sweep … no horizon, no table edge, no wall, no line or step …")
    brought it to 251–255 with a faint band (2.6). Keep the paragraph in every lying prompt. (2026-10-14.)
20. **Nano Banana 2.1 draws ring A's gold a little pale in a fresh photo.** Three fresh ring C photos from ring A's
    photo as the look reference: blue 126–131 against ring A's 114 (red and green close), polish fine (217–219).
    Saying "as saturated as the reference, mid-tones #D0A572" did not move it. Not solved yet. (2026-10-14.)
21. **"Three to four beads" became two in the middle.** Both lying tries put two beads between the middle stone and
    its neighbours (three elsewhere). → Give an exact count for every gap ("exactly three beads between every pair
    of neighbouring stones, also next to the middle stone"). (Ring C, 2026-10-14.)
22. **Words do not fix a count Nano Banana 2.1 will not draw.** With "exactly THREE beads … three, three, three,
    three" a third lying try drew two in every gap, and an edit asking for smaller beads so three fit changed
    nothing. Its beads stay large, and two fill the space between two cups. The raw photos show the ring standing,
    never in the lying pose, so the model has no picture of that layout to copy. → Before generating a pose the
    raw photos do not show, ask for a raw photo in that pose (for stone rings: lying flat, seen from the front a
    little above). Stop after two wrong counts; do not spend a third try on wording. (Ring C, 2026-10-14, 9 credits.)
23. **Rhodium shows when the prompt says where it is**: "the whole flat front face of each cup, the ring of metal
    round each stone, is bright white rhodium … like a white frame round every stone; the sides of the cups and the
    beads stay yellow gold" made the white clearly visible, as the owner asked. (Ring C, 2026-10-14.)
24. **No masks on Higgsfield; GPT edits fix counts only where the gap faces the camera.** Nano Banana 2.1's "mask"
    role is listed but refused on submit ("Unknown media role: mask", not charged; also 2026-10-13). GPT Image 2.5
    edits put three beads in the two middle gaps but left the two outer, foreshortened gaps at two, twice, and each
    pass moved the gold (to 221, 183, 127, lemony). → Do not chain edits to fix a count; get a raw photo in the pose.
    (Ring C, 2026-10-14, 2.5 credits.)
25. **Start over instead of circling (owner, 2026-10-14).** After two failed tries, do not edit the failures: write
    a new prompt from everything the owner said and make a fresh photo from the raw photos. Ring C's fresh GPT Image
    2.5 photo (medium, 4k, two variants for 2.5 credits) got three beads in all four gaps at the first go, where
    Nano Banana 2.1 had drawn two in four tries. What made the difference: the row written out ("stone, bead, bead,
    bead, stone, …, twelve beads in total"), beads "a little smaller than a stone's cup", and GPT's better counting.
    It was also sharper (14 against 7.5–10), with a bright background (251) and strong polish (230); the gold came a
    little yellow (216, 180, 127). One variant turned two stones pink: make two variants and pick.
26. **The owner's review of that photo (2026-10-14):** the ends were blurred, the beads at the ends were bigger than
    beside the middle stone, the white rims too thin, the gold not ring A's, the quality could be better; the
    zircons were liked. Measured: the end stones half as sharp as the middle ones (14–17 against 34): the model's own
    shallow depth of field; no file asked for blur. → Every prompt asks for everything in focus and for equal parts;
    `check-photo.cjs` now fails a photo whose ends are much softer than its centre; rhodium as a clearly visible white
    frame; GPT Image 2.5 at `quality: high` for finals; ask the stone type for every piece (CLAUDE.md, staging §1).
27. **Neither model hits ring A's gold, from opposite sides.** GPT Image 2.5 (fresh, high) gave 221–224, 182–185,
    127–133: yellower and paler, whatever the prompt says about colour; its structure was right (3, 3, 3, 3 equal
    beads, clear white frames). A Nano Banana 2.1 gold-only edit with ring A's photo as colour reference overshot to
    copper (210, 148, 97), dulled the polish (209) and halved the detail sharpness. → Do not chain gold edits; the
    owner decides how to match the gold (ring C, 2026-10-14, 11.5 credits).
28. **The gold was only lighter, so a curve fixed it exactly.** Measured, GPT's gold had ring A's colour offset (red,
    green, blue around the brightness) but was brighter (191 against 172). `gold-match.cjs` darkens the gold's
    mid-tones and keeps the offset: 224, 185, 133 → 206, 167, 116 (ring A 208, 165, 114), polish 214, nothing else
    touched, focus unchanged. Owner's choice over more Higgsfield tries (2026-10-14). Measure before choosing a fix.
29. **Matching numbers is not matching the look.** The owner rejected the gold-matched GPT photo ("the color … you
    didn't do the same and the quality is different") and chose Nano Banana 2.1's own photo (1716a697) as the look:
    its gold, shadows and quality. The look is how a model renders, not one average colour. → Keep the model whose
    look the owner chose and give it what it lacks (here: a real photo of the pose, so it copies the layout).
    Nano Banana keeps the layout of a single input photo but also its look; given two similar photos it copies the
    second whole (45008794, a7e0aefe, 2026-10-14).
30. **On the hand the ring is small, and both models draw two beads per gap.** Ring C, three tries (Nano Banana
    0d8487c9; GPT high 98b78dd5, c7ae3084), even with the row written out and with the owner's rule that not every
    stone has to show (2026-10-14: "for the hand the stones can't been seen all, it is normal"). The stones come out
    too big for three beads to fit between them. The lying photos, where the ring is large, got three. → For the
    hand, give the model a real photo of the ring on a hand, or make the ring larger in the picture.
31. **A "colour change" by GPT Image 2.5 is a new photo.** The owner, on ring C's white and rose (2026-10-14): "the
    quality of the different colors are not the same … i just need the color to change, nothing else". GPT redraws
    the whole picture in its own style and at 2880 px: stones, reflections, background (white 246, rose 244 against
    yellow 247) and sharpness all differ from the yellow photo (Nano Banana, 4096 px). Lesson 12's "ring identical"
    measured only the outline. → A metal version must change only the metal's colour. Options put to the owner: a
    pixel recolour of the gold on the computer (exact, free; needs the owner's OK as a local edit) or a Nano Banana
    colour edit (same model as the yellow, still a redraw). **Owner chose the computer: `metal-swap.cjs`.** On ring C
    it kept every pixel that is not metal; white 166, 165, 169 (neutral), rose 230, 176, 144 (lighter than ring A's
    rose because it keeps the yellow photo's brightness). First version left a gold glow on the floor under the white
    ring (only red − blue > 25 was changed); the weight now starts at 8, just above the background.
32. **On a hand, colour alone cannot find the gold.** Test (owner's request, 2026-10-14) of `metal-swap.cjs --hand`
    on ring A's and ring C's hand photos: skin is hue 12–27°, lit gold 27–36°, but gold in shadow and the gold sides
    of the cups fall in the skin's range. The lit beads turned white, the shaded ones stayed gold (patchy two-tone),
    and a few skin highlights became pale specks. Fine on the lying photos (everything else there is white or grey).
    → A hand photo needs an exact outline of the ring before its colour can be changed on the computer.
