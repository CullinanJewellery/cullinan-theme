# Lighten the gold to join luxury

Luxury houses show yellow gold as a **light, clean, moderately saturated yellow**. Measured with Cullinan's own method (mean of R−B>45 pixels), Tiffany, Cartier, Bulgari and Mejuri sit in a tight band of about **212–229 red, 173–195 green, 124–144 blue**, and the average of 18 of their packshots is **219, 187, 133**. Their shine (95th percentile) is **221–241**, and their darkest metal stays amber-brown, never black. Cullinan's current target, 209, 167, 111, is darker, more orange and more saturated than every luxury brand measured. Option C, the one the owner chose, keeps the right hue, but its saturation (0.52) matches moonmagic's gold-plated silver rather than any solid-gold house. **Option F (218, 185, 128; shine 227; darkest 5% at 119) sits almost exactly on the luxury average**: a colour difference of about 1.8, which the eye can barely see. It also keeps more depth than option E, so **F is the recommendation**. The background (251, 251, 253), the shadow falling left, the centred frame and the plan of making white and rose from the finished yellow already match how the D2C leaders work and should stay. What is missing is a fuller measured standard. It should define a band of hue and saturation, a band for shine (not just a floor), a polish-contrast figure, and a rose and white that move in step with the new yellow. One written QA pass should check each of them on every photo.

## What this means for the shop, in plain words

The finest jewellery houses do not make gold look deep, orange or "golden". On their sites it looks **light, bright and buttery**, with soft, wide reflections, like a polished piece seen under a big, soft window. Darkness shows only where the metal turns away from the light: the inside of a ring, the grooves, the edges. It is never in black stripes. Every photo in their catalogue has the same background, the same shadow, the same size and the same gold. Within one brand, the gold colour varies by only about ±10 levels per colour channel from photo to photo.

Cullinan's photos already do most of this. The background, the shadow, the framing and the "one yellow for 14K and 18K" rule all match what the leading brands do. The one clear gap is the **colour of the yellow gold itself**. Today it reads a little darker and more orange than at Tiffany, Cartier or Bulgari. That pushes it toward the look of gold-plated fashion jewellery, and retouching guides warn that over-warm 14K "looks like costume jewellery" ([ColorClipping](https://www.colorclipping.com/blog/why-jewelry-photos-fail-to-convert)).

Of the three new versions of ring A, **C** keeps that richer, more orange look. **E** is the palest and softest, like Tiffany or Jessica McCormack. **F** lands in the middle of the luxury houses and keeps enough contrast that the ring still looks polished and solid. **Our recommendation is F.** C was the owner's choice, so this reverses a decision. Under the house rules, that reversal goes in the changelog with the reason, and C stays one script run away if the owner prefers it after seeing F next to the brands.

## The luxury yellow is a narrow band, and C sits outside it

The brand measurements were taken on 2026-11-17 from each house's own CDN images, using the same R−B>45 method as `check-photo.cjs`. The houses agree closely. **Tiffany** yellow rings measure 198–229, 164–195, 113–144, with hue 33–40° and shine 228–239 ([Tiffany rings](https://www.tiffany.com/jewelry/rings/)). **Cartier**'s LOVE ring measures 221, 195, 142 and 215, 188, 133, with shine 233–241 ([Cartier rings](https://www.cartier.com/en-us/jewelry/rings/)). **Bulgari**'s Serpenti Viper and B.zero1 measure 218–224, 183–191, 123–130 ([Bulgari rings](https://www.bulgari.com/en-us/jewelry/rings)). **Mejuri**'s 14k pieces measure 201–233, 169–203, 113–152 ([Mejuri rings](https://mejuri.com/world/en/collections/rings)). **Jessica McCormack** is the palest and most green-yellow, at hue 40–44° ([JM feed](https://www.jessicamccormack.com/products.json)). The most saturated gold in the whole sample is **moonmagic**, which is 18k vermeil on silver, at saturation up to 0.55 ([moonmagic feed](https://moonmagic.com/products.json)). Karat does not change the picture: Mejuri's 10k, 14k and vermeil and the 18k of the luxury houses all fall in hue 35–40°. That supports the owner's single yellow for 14K and 18K.

The table puts the three candidates against that cluster. HSV hue and saturation are computed from the means; the Lab figures use D65, and ΔE is the CIE76 distance to the average of the 18 Tiffany, Cartier, Bulgari and Mejuri measurements.

| | Mean RGB | Hue / saturation | Lab L / C / h | ΔE to luxury average | Shine p95 | Darkest 5% |
|---|---|---|---|---|---|---|
| Luxury average (18 packshots) | 219, 187, 133 | 37.7° / 0.39 | 77.5 / 31.9 / 82.7° | — | 221–241 | 60–150 |
| Current target | 209, 167, 111 | 34.3° / 0.47 | 71.1 / 35.7 / 76.5° | 8.3 | ≥ 212 | — |
| **C** (owner's choice) | 207, 168, 99 | 38.3° / **0.52** | 71.0 / **41.2** / 81.8° | **11.4** | 222 | 87 |
| **F** | 218, 185, 128 | 38.0° / 0.41 | 76.8 / 33.6 / 82.9° | **1.8** | 227 | 119 |
| **E** | 225, 192, 138 | 37.2° / 0.39 | 79.4 / 31.9 / 82.1° | 1.9 | 229 | 140 |

C fixed the old target's hue problem. The old target's 76.5° leaned toward ring A's 74°, which "read nearly as rose", and C is now at 82°. But C made the colour **more saturated and no lighter**. Its chroma of 41 is about 30% above the luxury average, and its lightness is 6.5 L* below it. That combination makes gold read as deep and orange-brassy. **F and E are both within about 2 ΔE of the luxury average**, a difference most viewers cannot see. They differ in polish more than colour. F's darkest 5% is 119, mid-range among the houses: Cartier is 79–122, Tiffany 61–151 and Mejuri 79–149. E's 140 is at the soft end, next to Jessica McCormack's 122–165, the lowest-contrast metal measured. On a handmade, sculpted piece, F keeps the amber-brown depth in recesses and edges that tells the eye the metal is solid. E risks a pale, low-contrast look that suits a very quiet brand but flattens texture. One caveat applies to the darkest-5% comparison: the brand figures used a slightly wider warm-metal mask (R−B>28), so the comparison is indicative, not exact. Both F and E sit inside the brand range either way.

A useful cross-check comes from the gold standard itself. ISO 8654 gives the nominal hue of a flat alloy sample as 2N "light yellow" at 82.1° and 3N "yellow" at 76.0° ([ISO 8654:2018/Amd 1:2019](https://cdn.standards.iteh.ai/samples/76036/b7e7b6570a9243c8ba787db22543cef8/ISO-8654-2018-Amd-1-2019.pdf)). The luxury photo cluster and F both sit at about 83°, in line with 2N. Photos are darker and about 1.5 times more saturated than the flat ISO samples, because polished metal reflects its surroundings again and again, so only the hue angle transfers from the standard.

## Polish is soft-box gradients, not black mirror bands

The houses make gold look "better than real" through **lighting and cleanup, not heavier colour**. On contact sheets of 25 packshots, there were no scratches, dust or environment reflections. Each facet carried one long, smooth gradient, and engraved logos were sharp. The darkest metal pixels are amber-brown (Bulgari about 70–87, 30–35, 7–13). Highlights stop just short of white with a yellow tint (about 249–255, 232–253, 198–218), and **only 0–1.4% of the piece clips** to pure white. Bulgari and moonmagic push contrast hardest; Tiffany, Pomellato, Mejuri and Jessica McCormack are softest (measurements from the brand pages cited above).

Professional retouchers reach this with a consistent recipe. They cut the piece out and paint smooth gradients inside paths drawn per facet. They shape with dodge and burn at about 3–8% opacity, and they heal dust and scratches while softening scratches rather than erasing every trace. They remove colour casts, sometimes by desaturating and re-toning, let only true speculars reach white, and add a subtle shadow at the end ([Adobe Community thread](https://community.adobe.com/t5/photoshop-ecosystem-discussions/jewelry-retouching/m-p/9670212); [ukclippingpath](https://ukclippingpath.com/?p=15970); [Retouching Labs](https://retouchinglabs.com/jewelry-photo-metal-smoothing/)). The key trick is separating tone from colour. Curves in Luminosity mode change the reflections without touching the hue ([Adobe Community](https://community.adobe.com/t5/photoshop/real-gold-effect/m-p/11655472)), and a shared gradient map recolours by luminosity, best done in 16-bit to avoid banding ([Adobe](https://www.adobe.com/creativecloud/photography/hub/guides/how-to-make-a-gold-effect-in-photoshop.html); [Julieanne Kost](https://jkost.com/blog/?p=9997)). Cullinan's new 5-point gradient map, applied to metal pixels only, is exactly this industry tool in code. The C/F/E test changed 0 pixels outside the metal mask, which shows the masking is sound.

For AI-generated images, painted reflection cards are rarely needed because Nano Banana already draws a soft-box studio. The useful local work is limited to colour toning through the gradient map and, if needed, a gentle lightness-only curve to bring the darkest 5% and the shine into the target band.

## Background, shadow and frame already match the D2C leaders

Every brand fixes one background value across its whole catalogue. The older houses use pure white 255, often through transparent cut-outs padded by the site: Bulgari uses Cloudinary `c_pad` ([Bulgari](https://www.bulgari.com/en-us/jewelry/rings)), and Van Cleef & Arpels serves 3000² PNGs ([VCA](https://www.vancleefarpels.com/us/en/home.html)). The design-led brands use a **flat neutral off-white of 246–251**, identical in all four corners: Jessica McCormack 246, Pomellato 247, Mejuri 248 and moonmagic 251 ([Pomellato feed](https://pomellato.com/products.json); [moonmagic feed](https://moonmagic.com/products.json)). Only Cartier shows a visible warm gradient ([Cartier](https://www.cartier.com/en-us/jewelry/rings/)). Cullinan's **251, 251, 253 is in that band**. Its slight blue lift is unique but harmless, and it pairs well with a neutral-to-cool white gold.

Shadows are soft and fixed in one direction per brand. **moonmagic's falls left**, 4.0–5.8% of the width on rings and barely visible. Mejuri's falls right. Pomellato's long shadow, 17–21% of the height, is a deliberate signature. Bulgari and VCA use none. No brand shows a hard drop shadow. Cullinan's soft grey shadow to the left with a thin contact line is the moonmagic model.

Framing splits into two philosophies. Under **fill-to-frame**, used by moonmagic, Catbird and Tiffany necklaces, every piece is scaled to about 70–77% of the frame. Under **true scale**, used by Mejuri, Jessica McCormack and Bulgari, a stud stays small. Every brand centres horizontally to 50% ±1, which can only be done by script; moonmagic's three T-Lock necklaces have pixel-identical boxes. Luxury rings often take only 31–47% of the width, leaving generous air. Cullinan's 76% of the height is the D2C fill-to-frame choice. It also meets Google Merchant Center's rule that the product take "no less than 75%, but not more than 90%" of the image ([Google](https://support.google.com/merchants/answer/6324350)), which matters for a Shopify store's Google feed. Shopify recommends a 2048 × 2048 square ([Shopify](https://www.shopify.com/blog/product-photography)), which is Cullinan's export size. Keep the frame as it is.

## The Cullinan gold standard and the workflow that holds it

Studios keep a catalogue identical with a written style guide, approved hero images that every file is matched to, and presets reused on every image ([Pixelz style guides](https://pixelz.com/blog/retouching-style-guides); [Pixelz](https://pixelz.com/retouching-services)). Cullinan's equivalents are this standard, the approved ring A (option F) as hero, and the gradient map as the preset. The targets below are measured with the existing R−B>45 method so `check-photo.cjs` can enforce them. The tolerances follow what the brands themselves ship: about ±10 per channel and ±2–4° of hue within one catalogue.

### Standard values

| Item | Target | Tolerance / band | Basis |
|---|---|---|---|
| Yellow gold mean (R−B>45) | **218, 185, 128** (option F) | ±8 per channel; hue 36–40°; HSV saturation 0.37–0.44; Lab h 81–85° | Luxury average 219, 187, 133 |
| Yellow shine (p95 luminance, same mask) | **227** | band **222–240**, not only a floor | Brands 221–241 |
| Yellow darkest 5% (luminance) | **119** | 95–145; never near-black | Brands 60–150; amber-brown |
| Clipped pixels (lum ≥ 250) | — | ≤ 2% of the piece | Brands 0–1.4% |
| Rose gold mean | **≈ 215, 170, 138** (proposed; currently 202, 152, 122) | ±8; hue 23–27°; saturation 0.34–0.38 | Bulgari 204–220, 158–175, 127–143; Pomellato paler; Lab h 62° = ISO 5N |
| White gold mean | 209, 204, 204 (keep) | Lab \|a*\|, \|b*\| ≤ 2; blue never more than 3 below red | Tiffany, Bulgari, Cartier neutral to slightly cool |
| Background | 251, 251, 253 | every border pixel ±1; corners identical | Off-white band 246–251, flat |
| Shadow | soft neutral grey, left, thin contact line | extends ≤ ~6% of width on rings; no colour | moonmagic pattern |
| Frame | centre 50% / 50%, piece 76% of height, 2048 × 2048 sRGB | centre ±0.5%, height ±1% | Google 75–90%; Shopify 2048² |

The rose proposal moves rose by the same logic as yellow: lighter and a little less saturated, so the two golds stay distinct and keep their spacing. It is a proposal only, because no rose candidate has been rendered yet. The owner should see it on a finished ring before it replaces 202, 152, 122, which was itself set darker on the owner's word.

### Workflow per piece

| Step | What happens | Tool |
|---|---|---|
| 1 | Raw photos examined, sheet filled, stones and doubts asked before any credit | `photography/workflow.md` |
| 2 | Yellow photos made in Nano Banana 2.1 at 4K, with the approved F ring A as style and gold reference and the stone reference in the first prompt | Higgsfield |
| 3 | Background flooded to 251, 251, 253; frame applied (50/50, 76%) | `bg-even.cjs`, `frame-photo.cjs` |
| 4 | Metal recoloured with the F gradient map, metal mask only, `--stone` boxes round every stone | gradient-map script |
| 5 | If shine or darkest 5% is outside its band: a lightness-only curve inside the mask, then step 4 again | `polish-curve.cjs` |
| 6 | White and rose made from the finished yellow | `metal-swap.cjs` / `metals-from-yellow.cjs` |
| 7 | Numeric QA (table below), then the human pass | `check-photo.cjs`, photo-checker |
| 8 | Owner review next to ring A and the previous piece | `compare-sheet.cjs` |

### QA checklist (every photo, before the owner sees it)

| Check | Pass rule |
|---|---|
| Gold colour | mean within ±8 per channel of the metal's target; hue and saturation inside the band above |
| Shine and depth | yellow p95 222–240; darkest 5% 95–145; clipping ≤ 2% |
| Spill | 0 pixels changed outside the metal mask (before/after difference); 0 inside stone boxes |
| Background | border pixels within ±1 of 251, 251, 253; no tile steps or rectangle round the piece |
| Shadow | falls left, soft, grey (no gold tint), thin contact line present |
| Frame | centre 50/50 ±0.5%; height 76% ±1%; 2048 × 2048, sRGB embedded |
| Sharpness | ends of the piece as sharp as the centre (focus-stacked look) |
| Stones | icy colourless white, dark facet contrast; no pink, lilac, grey or milky cast |
| Jewellery unchanged | same design, counts of stones, beads and prongs, angle and position as the source photo; equal parts equal; rhodium clearly white where the atelier puts it |
| Human pass | 100% zoom and thumbnail size, side by side with ring A and the last approved piece |

## Conclusion

The research reframes the owner's question. The task is to find the luxury band and land in it, not to make gold "richer". The luxury band turns out to be narrow and lighter than intuition suggests: houses that charge the most show gold closer to butter than to brass, and they create depth with form shading rather than saturation. Option F is the one candidate that is both on the luxury average and still contrasty enough to read as solid, polished handmade metal. That makes it the safest standard for a shop whose goal is to make its better pieces look desirable.

Two limits remain. The sample is small: 2–7 images per brand and metal, mostly rings. Van Cleef & Arpels, Messika, Ole Lynggaard and Catbird yellow gold could not be measured, and no house publishes its retouching standard, so all brand targets are inferred from delivered web JPEGs. The next useful step is to render F on two or three more finished pieces with stones and in different shapes, with the proposed rose beside them. That would show the band holds across the catalogue before every photo is converted.
