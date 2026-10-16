# Ring E — swirl ring with one stone (Bulgarian name and catalogue number to come)

Folder: `pictures for the website/05 Пръстен спирала - номер предстои` (working name until the owner names the piece).
Raw photos: `raw pictures for use`, numbers 50–62 of 12 October 2026 (20261012_160100 … 160328), all 13 examined
zoomed in on 2026-10-15. Clearest: 60–62 (front: the swirl round the stone), 56–59 (from above: the grooved side),
54–55 (side: the overlap at the head), 50–53 (three-quarter).

## The piece

- Kind: ring with one stone, set in a swirl of the band (no claws) — `../staging.md` §2.
- **Stone:** one small round brilliant-cut **zircon** (owner, 2026-10-15: all stones in rings E, F, G are zircons),
  clear and colourless, about the band's width and a half.
- **Head:** the band's two ends wrap round the stone from opposite sides, like a swirl: one end comes from the upper
  left and curls down round the stone's left side, the other from the lower right and curls up round its right side.
  The curled gold holds the stone; there are no claws and no separate cup.
- **Band:** thin, polished yellow gold. One side plain and smooth; **the other side with fine grooves along it (two
  or three thin ridges) — grooves in one band, not separate strands** (owner, 2026-10-15) — photos 56–59, 62.
  Which arm: the arm that curls **under the front** of the stone is grooved; the arm that curls **over the top** of it
  is plain (photos 62 and 56; seen from the back, 52, the grooved arm is on the left). The first try grooved both.
- Inside: plain polished gold with a hallmark stamp; in photos plain, no text.
- Metal: yellow gold only; no rhodium seen.
- Counts: 1 stone, 0 claws.

## Shots (stone ring with one stone)

| Shot | Position |
|---|---|
| Yellow 01 (main) | The owner's pose for one-stone rings (`../staging.md` §2): tipped back in a three-quarter view, the stone at the upper left facing up and toward the camera, the band sweeping down and to the right, its inside at the lower right. (owner, 2026-10-15: like ring D) |
| Yellow hand | From a hand photo (AI or the owner's phone photo); yellow only. |
| White, rose, silver | `metal-swap.cjs` from the finished yellow 01, ring A's colours, a `--stone` box round the stone. |

## Description to paste into prompts

> THE RING (only from the raw photos, do not add or remove anything): a thin, delicate 18K yellow gold ring. Its two
> ends wrap round one small round brilliant-cut cubic zirconia stone from opposite sides, like a swirl: one end curls
> round the stone's left side, the other round its right side, and the curled gold holds the stone (no claws, no
> separate cup). The stone is clear and colourless, sparkling like a small diamond, about one and a half times the
> band's width. The band is thin and polished; one side is plain and smooth, the other has two or three fine
> grooves running along it (one band, not separate strands). Plain inside, no text. Slim and fine, not chunky.

## Status

- 2026-10-15: all raw photos examined; sheet written; questions to the owner. No credits spent.
- Plan and cost: yellow 01 (Nano Banana 2.1, 3 credits a try), hand (about 3), white, rose, silver free; about 6.
- Yellow 01 (job dfc14200, 3 credits) from raw 60, 52, 58 + ring A for the look: swirl right, no claws, clear zircon,
  pose right; but grooves on **both** arms. One-input edit (c70eafd0, 3 credits): the over-the-top arm plain, the rest
  unchanged (moved 0.002). On the computer: stone cast back to the first try's (stone-clear), gold to ring A's
  (gold-match --target 208,165,113 --stone 0.395,0.215,0.525,0.315), background evened (254), framed as standing (h
  0.809, centre 0.500/0.514). Checker: all pass except the lying-photo focus number (0.50; the stone's facets sit in
  the centre window; ring A's own main photo scores 0.46; both ends crisp at full size). Sent for the owner's OK:
  `чернови/01 основна снимка - жълто злато - за одобрение.png` with the comparison sheet. Ring E at 6 credits.
- Owner: the model is perfect, but the gold is not polished the same everywhere (the lower half of each arm and the
  bottom of the band look satin; ring A is polished all over). Two polish edits (2a2591d2, 0d627bf4; 6 credits) did
  not change the finish; a computer polish test (de-grain + local contrast) was rejected by the owner (lesson 38).
  **Owner: keep the current finish** (the same as ring D's). Yellow 01 approved as sent.
- White, rose, silver (= white) with `metal-swap.cjs --stone 0.37,0.141,0.533,0.267` (the box moved with the frame):
  white 187,183,183, rose 213,160,128 (ring A's), the stone unchanged. Saved to the metal folders.
- Hand (f60fcf66, 3 credits; recipe of ring D's approved hand photo): right except grooves on both arms. Edit
  (996b951a, 3 credits): the upper-left arm plain; the swirl looks the same turned halfway round, so either arm may
  carry the grooves, only one does. The edit turned the whole photo pinker; colours put back to the photo before the
  edit on the computer (one gain and offset per channel, measured outside the ring; nothing moves), stone cleared
  (`stone-clear.cjs`). Ring gold 215,166,116 (ring D's approved hand 216,162,107). Sent for the owner's review:
  `чернови/03 на ръка - жълто злато - за одобрение.png`. **Ring E at 18 credits (the limit).**
- 2026-10-16, owner: a new hand for rings B–E (more feminine, a visible manicure, the ring smaller, zoomed out, five
  nails; `../prompts/03-yellow-hand.md`). Ring E was the test: a first new hand (523acddb), the owner's corrections
  (ring smaller, white nails, diamond-like zircon, a hand model's hand; an edit e2b530a9 changed only the nails), a
  fresh photo with every point (4ed08d1e) — **owner: "i like it"** — grooves fixed to one arm (5a7a2c11), colours put
  back to 4ed08d1e. Saved as `жълто злато/03 на ръка - жълто злато.png`. Ring E at 30 credits (12 over the limit, for
  the owner's new request).
- 2026-10-16, owner: white and rose on the hand by the free colour change: `metal-swap.cjs --hand --hue 0.52,0.45,0.73,0.62 / 20,24` (rose with `--relative`), lesson 39. Saved as `03 на ръка` in the white, rose and silver folders. Free.
