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
