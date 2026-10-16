# Yellow 03 on the hand

**New hand (owner, 2026-10-16), for every piece after ring A (rings B, C, D, E and later; ring A keeps its hand):**
a lot more feminine hand; a longer manicure that is just visible, not too long; the ring a little smaller on the hand,
small enough to look elegant, not big; zoomed out so the whole hand shows, with all five nails visible (the old
photos showed two). Ring A's hand photo is no longer the hand reference for these pieces: the model copies the hand
it is given, so the new hand is described in words (below) until the owner approves one; then that approved photo is
the hand reference for the next pieces.

```
THE RING'S SIZE: small, fine and elegant on the hand, a little smaller than a close-up makes rings look: the band
about 1.2 mm wide <and the stone about N mm across>, so the decorated part is no wider than about a quarter of the
finger. Never big, heavy or chunky.
THE HAND: a slender, graceful, feminine adult woman's hand with long, slim fingers and smooth, even, light skin.
Softly shaped almond nails of medium length, clearly visible past the fingertips but not long or dramatic, with a
neat, glossy nude-pink manicure. Relaxed elegant pose: the hand resting on soft warm ivory linen, seen from above at
a slight angle, fingers gently together and slightly curved, the thumb relaxed beside the hand so that its nail
shows too. The ring on the ring finger near its base, <the decorated part> on top of the finger facing the camera;
the plain band goes round under the finger.
FRAMING: zoomed out so the whole hand is in the picture, from the wrist to the fingertips, with all FIVE fingernails
clearly visible; the hand fills about two thirds of the square, with linen around it. Soft, even, natural daylight.
The ring pin-sharp. A natural, real photograph, not CGI. No other jewellery, no text, no logo. Square 1:1.
```

Check: five nails visible, nails medium (not long), the ring small and fine, the design exactly the piece's.

Owner on the first test (ring E, job 523acddb, 2026-10-16): the ring still looked too big (measured: the swirl
covered about two thirds of the finger's width; real size is about a third) — make only the ring smaller; nails
white or close to it (milky white); the zircon must look crystal clear like a diamond, as stones look in a premium
catalogue (Glamira was the owner's example, shown in chat, described in words, never given to the model); the hand
a beautiful hand model's hand. So the prompt above becomes:

```
THE RING'S SIZE: the decorated part about one third of the finger's width, the stone about one sixth of it, the
band about 1.2 mm: fine and delicate, elegant on the finger.
THE STONE: crystal clear, a brilliant-cut stone that looks like a well-cut diamond in a fine jewellery catalogue
photo: crisp, sharp facets with strong contrast between bright white and dark facets, bright white sparkle and a
touch of rainbow fire. Never cloudy, milky, grey, hazy or soft.
THE NAILS: almond, medium length, a soft glossy milky white.
THE HAND: a professional hand model's hand for fine jewellery: flawless, smooth, even, luminous skin with no
visible wrinkles, creases or dry texture on the knuckles and fingers; slender, graceful fingers; neat cuticles.
```

**Approved (owner, 2026-10-16): ring E's hand photo (job 4ed08d1e, grooves fixed in 5a7a2c11) — "i like it".** For
the other rings the owner asked for the ring smaller still and the white nails quieter ("not that catchy for the
eye"). **The hand reference for every next piece is the bare hand, Higgsfield job `4223debe-fb3c-4e80-9efd-127de4b2567d`**
(ring E's approved hand with the ring removed and the nails a sheer, quieter milky white). A bare hand cannot leak a
ring's design (lesson 1). Inputs: the piece's approved yellow photo(s), then the bare hand last. Prompt (rings B, C,
D, 2026-10-16, 3 credits each):

```
Photorealistic fine-jewellery photograph: the hand from the LAST reference image wearing the exact ring from the
first reference image(s).
THE RING, exactly as in the first image, nothing added or removed: <the piece sheet's description; stones crystal
clear like small well-cut diamonds: crisp facets, bright white sparkle, never cloudy or grey>. <Which part sits on
top of the finger and faces up; the plain band goes round underneath.>
THE RING IS SMALL AND DAINTY: <sizes, e.g. stones about 2 mm, the band about 1.2 mm>, so it looks delicate and
elegant on the finger, smaller than a close-up makes rings look, never big or heavy.
THE HAND exactly as in the last reference image: the same hand, skin, pose, the same sheer milky-white almond nails,
the same linen and light. The ring on the ring finger near its base (the fourth finger counting from the thumb).
Frame it a little wider than the last reference so the wrist shows: the whole hand with all five nails visible.
The ring pin-sharp, polished warm yellow gold. A natural, real photograph. No other jewellery, no text, no logo.
Square 1:1.
```

Check: the ring on the ring finger (the finger next to the little finger), the design and counts, the stone's tint
(`stone-clear.cjs` when lilac or pink). Ring C (five stones, three beads between) came out with two beads between the
stones again (lesson 30); owner: leave C for now.

## Ring A's hand (rings A, B, D, E until 2026-10-15)

Model `nano_banana_2_1`, `resolution: 4k`, `thinking_level: high` (3 credits).
References: the passed yellow 01 standing photo (the ring), one raw photo, then ring A's yellow hand photo for the
hand and framing only (Higgsfield media `37d2fabd-42ac-4708-942b-089043af420a`). Watch for design leaking from
ring A (lesson 1); if it leaks, drop ring A's photo and describe the hand in words.

```
Photorealistic close-up jewellery photograph of a woman's hand wearing the exact ring from the first two reference
images. <THE PIECE description from the piece sheet> Real scale: a fine, slim ring about 1.2 to 1.5 mm wide on an
adult woman's finger, never chunky or oversized. The decorated part with the stones sits on top of the finger, the
stones facing up and out; the plain lower band is under the finger.
EVERYTHING ELSE comes from the last reference photo (do not copy its ring): the same hand, pose, soft warm ivory
linen, skin tone, nude manicure, soft daylight, close crop and framing, the ring on the same finger near its base.
No other jewellery, no text, no logo. Square 1:1.
```

Check: counts visible on top of the finger; scale; gold; design not ring A's.
