# How luxury and premium jewellery brands render gold in e-commerce packshots (measured, 2026-11-17)

Method note (applies to every section). All numbers marked **[measured]** were measured by me on 2026-11-17 from the
brands' current product images, downloaded from their own CDNs (Shopify `cdn.shopify.com`, `media.tiffany.com`,
`cartier.com/dw/image`, `media.bulgari.com`) at about 1000–1200 px and resized to fit 600 px, with a Node/sharp script
(scratchpad `tools/measure.cjs`). Definitions:
- **mean (project metric)**: average RGB of all pixels with R − B > 45, and **shine** = 95th percentile of luminance
  (0.3R + 0.59G + 0.11B) of those pixels. This is exactly the metric of `photography/check-photo.cjs`, so it compares
  directly with Cullinan's targets (yellow 209, 167, 111, shine ≥ 212; ring A 216).
- **mid / hi / lo**: on a wider warm-metal mask (differs from background, R − B > 28, R ≥ G, so pale highlights are
  included), the mean RGB of the 40–60th, top 5% and bottom 5% luminance slices (Rec.709 luminance).
- **L p5/p50/p95**: luminance percentiles of that warm-metal mask. **obj p1/p99**: luminance range of the whole piece
  (stones included, pale grey shadow excluded). **clip%**: share of piece pixels with luminance ≥ 250.
- White gold: a neutral mask (differs from background by > 25, channel spread < 28), so near-background highlights are
  excluded and white-gold numbers read darker than the eye sees.
Limitations: 3–10 images per brand, rings mostly; stones and enamel can leak into masks; JPEG/WebP delivery
(sRGB, assumed untagged). Everything in "Inferences" is my reading of the numbers and a visual check of contact
sheets (crops of Tiffany T1/True, Cartier LOVE, Bulgari Serpenti Viper/B.zero1, Pomellato Iconica, moonmagic Lania,
Mejuri Diamonds Band, Jessica McCormack Torque).

Brands NOT measured (gap): Van Cleef & Arpels (CDN refuses non-browser downloads; collection page only exposed
campaign pictures), Messika (category pages did not render product tiles), Ole Lynggaard and Catbird (not reached
within the time budget).

## 1. What yellow, rose and white gold look like per brand (hue, warmth, saturation, brightness, RGB)

### Takeaway
Luxury houses render yellow gold as a **light, slightly lemon-leaning, moderately saturated** yellow: project-metric
mean about **212–229 R, 173–195 G, 124–144 B**, hue **36–40°**, HSV saturation **0.36–0.44**, with mid-tones around
**(226–240, 187–211, 131–159)**. Cullinan's target 209, 167, 111 (hue 34°, saturation 0.47) is **darker, more orange and
more saturated than every luxury brand measured**; only moonmagic (gold vermeil) is as saturated, and it is more lemon.

### Cited Findings
Yellow gold, project metric mean → hue / saturation / value, shine p95 **[measured]**:
- **Tiffany & Co.** (white #FFFFFF background, `_MAIN1X1` packshots): True Wide 221,188,135 (37°, 0.39), True Narrow
  223,187,132 (36°, 0.41), T1 212,173,124 (33°, 0.42), Knot/Lock-type 70305291 221,185,127 (37°, 0.43), Double Row
  198,164,113 (36°, 0.43), Wire 229,195,144 (36°, 0.37), Square 215,190,141 (40°, 0.34). Shine 228–239.
  Mid-tones 215–240 / 177–217 / 121–174; highlights ≈ 249–255, 232–247, 207–217; darkest 5% ≈ 60–145, 39–110, 8–59.
  — [Tiffany gold jewelry](https://www.tiffany.com/jewelry/gold/), [Tiffany rings](https://www.tiffany.com/jewelry/rings/), images from media.tiffany.com
- **Cartier** (warm off-white/beige background ≈ 244,240,234 with gradient, not pure white): LOVE ring yellow gold
  221,195,142 (40°, 0.36) and 215,188,133 (40°, 0.38); shine 233–241; mid 228–234, 202–211, 149–159; highlights
  249–254, 241–245, 205–210; darkest 5% 80–125, 47–82, 9–36. Other LOVE images on the same listing are on-hand or
  coloured-background lifestyle shots (grey, dark green, terracotta) and were excluded. — [Cartier rings](https://www.cartier.com/en-us/jewelry/rings/)
- **Bulgari** (pure white, square padded packshot): Serpenti Viper yellow 224,191,130 (39°, 0.42) and 221,184,123
  (37°, 0.44); B.zero1 one band 218,183,128 (37°, 0.41); shine 233–238; mid 231–239, 199–207, 134–142; highlights
  254, 240–244, 198–207; darkest 5% ≈ 70–87, 30–35, 7–13 (deep amber-brown). — [Bulgari rings](https://www.bulgari.com/en-us/jewelry/rings)
- **Mejuri** (light grey #F8F8F8 background; 14k solid gold): Diamonds Band 233,203,152 (38°, 0.35), Diamonds Team
  Ring 223,194,141 (39°, 0.37), Pavé Slim Signet 201,169,113 (38°, 0.44), Diamond Pearl Stacker 224,195,138 (40°,
  0.38), Wishbone 217,188,148 (35°, 0.32), Stacker 10k 227,195,136 (39°, 0.40). Shine 221–236. Vermeil pieces measure
  the same range (213–224, 180–197, 123–147). — [Mejuri rings](https://mejuri.com/world/en/collections/rings)
- **Jessica McCormack** (light grey #F6F6F6; 18k yellow, pieces small in frame): Ball n Chain pendant 215,192,147
  (40°, 0.32), Button Back rings 216,195,136 (44°, 0.37) ×2, Torque pendant 223,203,149 (44°, 0.33); shine 209–245.
  The palest, most green-yellow (hue 40–44°) gold of the set. — [Jessica McCormack products feed](https://www.jessicamccormack.com/products.json)
- **moonmagic.com** (near-white 251,251,251; mostly 18k gold vermeil on silver, so not solid gold): T-Lock necklaces
  199,167,90 / 193,161,93 / 194,162,93 (41–42°, 0.52–0.55), Heroine 196,163,101 (39°, 0.48), November bundle 207,166,105
  (36°, 0.49), Lania ring 226,191,122 (40°, 0.46), Petite ring 222,180,133 (32°, 0.40). Shine 226–240. Mid 212–239,
  176–206, 99–150 — the most saturated gold measured (mid saturation up to 0.55). — [moonmagic products feed](https://moonmagic.com/products.json)
- **Pomellato**: the current catalogue feed is dominated by rose gold (code O7000) and white/rose combinations; no
  plain yellow-gold packshot was measured. — [Pomellato products feed](https://pomellato.com/products.json)

Rose gold **[measured]**:
- **Pomellato** (light grey #F7F7F7, long soft shadow): Iconica Extra Slim 228,187,151 (28°, 0.34), Iconica Slim
  223,178,142 (27°, 0.36), Iconica Large 233,194,156 (30°, 0.33), Catene 220,178,143 (27°, 0.35), Iconica earrings
  227,183,151 (25°, 0.33). Mid-tones very light: 233–246, 198–216, 168–189 (a pale peach). Shine 225–237. — [Pomellato](https://pomellato.com/products.json)
- **Bulgari** Serpenti Viper rose 220,175,143 / 217,173,141 / 204,158,127 (24–25°, 0.35–0.38); B.zero1 rose
  209,165,132 (26°, 0.37). Shine 215–235. — [Bulgari rings](https://www.bulgari.com/en-us/jewelry/rings)
- **Tiffany** T wire rings in rose gold 215,167,144 and 216,169,143 (19–21°, 0.33–0.34): the pinkest rose measured.
  — [Tiffany rings](https://www.tiffany.com/jewelry/rings/)
- Cullinan's rose target 202,152,122 (23°, 0.40) is in Bulgari's hue range but darker and more saturated than all
  three brands. [measured comparison with CLAUDE.md target]

White gold, neutral-mask mid-tone **[measured]**:
- Tiffany T1 / True Narrow white gold: mid 150,150,150 and 156,160,164 — dead neutral to slightly cool (blue +8 over
  red). — [Tiffany rings](https://www.tiffany.com/jewelry/rings/)
- Bulgari Serpenti Viper white: 151,151,151 and 144,145,146 (neutral, highlights 196,202,213 — slightly blue).
  — [Bulgari rings](https://www.bulgari.com/en-us/jewelry/rings)
- Cartier LOVE white (unlimited): 138,138,138 and 148,146,143 (neutral to a hair warm). — [Cartier rings](https://www.cartier.com/en-us/jewelry/rings/)
- Jessica McCormack Ball n Chain white gold: 136,136,136 and 128,128,128 (neutral). — [JM feed](https://www.jessicamccormack.com/products.json)
- **Pomellato is the exception**: Together white gold mid 206,194,184 and 202,194,183 (hue 27–35°, saturation 0.09–0.11) —
  a deliberately warm, champagne-grey white. — [Pomellato feed](https://pomellato.com/products.json)

### Inferences
- The "luxury yellow" cluster (Tiffany, Cartier, Bulgari, Mejuri) is remarkably tight: hue 36–40°, saturation
  0.36–0.44, value 212–229. Moving Cullinan's 209,167,111 toward it would mean roughly **+10 R, +20 G, +20 B**
  (e.g. ~220,186,130): lighter, less orange, a little less saturated.
- Jessica McCormack's very pale, greener gold (hue 44°) and Pomellato's pale peach rose show that the most "quiet
  luxury" brands go lighter and less saturated, not deeper.
- White gold at Tiffany/Bulgari/Cartier/JM is rendered neutral or slightly cool, consistent with Cullinan's owner
  rule "no yellow cast"; Pomellato's warm white is a brand signature, not the norm.

### Gaps
- No yellow-gold numbers for Van Cleef & Arpels, Messika, Ole Lynggaard, Catbird, Pomellato (see method note).
- No reliable published colour specifications from any brand; these are measurements of delivered web JPEGs only.

## 2. Contrast of the polish: dark mirror bands, gradients, highlight clipping

### Takeaway
Luxury packshots use **broad, smooth soft-box gradients**, not hard black mirror bands. The darkest metal (bottom 5%)
sits around luminance **60–150** (amber-brown, never black) and highlights stop just short of white with a yellow
tint (≈ 252, 243, 205); **clipped pixels are 0–1.4% of the piece**. Bulgari and moonmagic push contrast hardest;
Tiffany, Pomellato, Mejuri and Jessica McCormack are softest.

### Cited Findings
Warm-metal luminance p5 / p50 / p95 and clip% **[measured]** (sources as in section 1):
- Tiffany yellow: p5 61–151, p50 181–220, p95 230–243; clip 0–1.3%. Visually: wide gradients from pale cream to
  honey; dark only in recesses and the inner band.
- Cartier LOVE yellow: p5 79–122, p50 204–212, p95 239–242; clip 0%. Visually: one large, smooth light-to-amber
  gradient over the band and a darker honey interior; crisp screw-head edges.
- Bulgari yellow: p5 62–70, p50 202–209, p95 234–239; clip 0–0.3%. Visually: strongest form shading of the luxury
  set — dark amber-brown edge bands defining each scale of the Serpenti and each groove of B.zero1.
- Mejuri 14k: p5 79–149, p50 184–222, p95 226–241; clip 0–0.8%.
- Jessica McCormack: p5 122–165, p50 195–222, p95 220–249; clip 0–1.4%. Lowest contrast metal.
- moonmagic: p5 44–122, p50 180–209, p95 232–245; clip 0.2–2.3%; darkest 5% as dark as 54,31,5 — near-black brown
  reflection bands on chains and pendants; the most "contrasty" look measured.
- Pomellato rose: p5 73–139, p50 204–221, p95 231–242; clip 0%; darkest 5% ≈ 97–159, 33–96, 17–59.
- Highlights (top 5% of metal) everywhere hold colour: yellow ≈ 249–255, 232–253, 198–218; rose ≈ 249–255,
  234–243, 211–223. — all [measured]
- Retouching vendors advise keeping the gradients that make metal look dimensional while removing distracting or
  broken reflections, and note that soft-box reflections can read as scratches if left. — [ColorClipping, 20 jewelry retouching mistakes](https://www.colorclipping.com/blog/why-jewelry-photos-fail-to-convert); [ColorClipping, gold retouching tips](https://colorclipping.com/blog/16-simple-gold-jewelry-retouching-tips-for-making-images-appealing-than-ever) (vendor blogs, marketing-informed)

### Inferences
- In project terms, every brand's shine (p95 of the r−b>45 pixels) is **221–241**, above Cullinan's threshold 212 and
  ring A's 216: luxury gold reads brighter at the top end, mostly because the mid-tones are lighter.
- The look is "polished but soft-lit": large diffusers produce long gradients; dark tones come from the form turning
  away (insides, edges, recesses), not from black cards reflected in the metal.
- Clipping is tolerated only in tiny specular points (≤ ~1–2% of the piece); broad areas stay below 250.

### Gaps
- Gradient width/shape was judged visually, not measured (no profile analysis across bands).
- Studio set-ups (light sizes, cards) are not published by any of these brands.

## 3. Consistency within one brand catalogue

### Takeaway
Within a brand, the yellow mean varies by about **±10 per channel** and hue by **±2–4°**; the biggest outliers come from
piece geometry (openwork, tiny pieces, stones) rather than a different gold colour.

### Cited Findings
- Tiffany yellow, 7 rings: R 198–229, G 164–195, B 113–144, hue 33–40°, saturation 0.34–0.43; five of seven are
  within hue 36–37°. [measured]
- Bulgari yellow, 3 rings: R 218–224, G 183–191, B 123–130, hue 37–39°. Rose, 4 rings: hue 24–26°, saturation
  0.35–0.38. Background identical (255,255,255) across all. [measured]
- Pomellato rose, 5 pieces: hue 25–30°, saturation 0.33–0.36; background identical (247,247,247). [measured]
- Mejuri, 6 solid-gold rings: hue 35–40°, saturation 0.32–0.44. [measured]
- moonmagic, 7 vermeil pieces: hue 32–42°, saturation 0.40–0.55 — the widest spread. [measured]
- Backgrounds are fixed per brand: Tiffany 255, Bulgari 255, Pomellato 247, Mejuri 248, Jessica McCormack 246,
  moonmagic 251 (all neutral grey); Cartier warm 244,240,234. [measured]

### Inferences
- A tolerance of about ±8 per channel on the metal mean (what `check-photo.cjs` uses) is in line with what the
  luxury houses actually ship.

### Gaps
- Sample sizes are small (2–7 per brand per metal).

## 4. How the metal is made to look idealised yet believable

### Takeaway
Visually: perfectly clean, scratch-free and dust-free surfaces; reflections reduced to a few long smooth gradients;
edges crisp; highlights tinted, not white; shadows soft and neutral. Gold is lighter and cleaner than in phone
photos, not deeper or more orange.

### Cited Findings
- Contact-sheet inspection of 25 measured packshots (Tiffany, Cartier, Bulgari, Pomellato, Mejuri, JM, moonmagic):
  no visible scratches, dust, fingerprints or environment reflections; each facet carries one smooth gradient;
  engraved logos (Cartier, Pomellato, Bulgari) are sharp. [observed]
- Shadows: Pomellato uses a long, soft grey cast shadow; Cartier a soft shadow on a warm gradient backdrop; Tiffany,
  Bulgari and Mejuri a very short contact shadow on a flat field. [observed]
- Retouching guidance: isolate metal with masks so colour corrections do not spill to background; match gold tone to
  karat and finish; warm shifts that go too far make 14K look like costume jewellery. — [ColorClipping](https://www.colorclipping.com/blog/why-jewelry-photos-fail-to-convert); [Path, editing jewelry photos](https://pathedits.com/blogs/tips/how-to-edit-jewelry-product-photos-like-a-pro) (vendor sources)
- A vendor page claims Tiffany uses high-end jewelry editing; not independently verifiable. — [search summary of vendor pages; unverified]

### Inferences
- "Better than real" in these catalogues is achieved with lighting and cleanup, not with heavier saturation: the
  most saturated gold measured is moonmagic's plated silver, not a luxury house.

### Gaps
- No primary source from any brand describing its retouching standard.

## 5. 14K vs 18K yellow in imagery

### Takeaway
In the delivered images, karat is not visibly encoded: Mejuri's 14k/10k and vermeil (18k plating), and the 18k of
Tiffany, Cartier and Bulgari all fall in hue 35–40°, saturation 0.32–0.44.

### Cited Findings
- Mejuri 10k Stacker 227,195,136 (39°, 0.40) vs 14k Diamonds Band 233,203,152 (38°, 0.35) vs vermeil Dot ring
  224,197,140 (43°, 0.37). [measured]
- 18k luxury: Tiffany 33–40°, Cartier 40°, Bulgari 37–39°; 18k Jessica McCormack 40–44° and the palest. [measured]
- Retouchers say tone should be matched to karat and that an over-warm 14K looks like costume jewellery. —
  [ColorClipping](https://www.colorclipping.com/blog/why-jewelry-photos-fail-to-convert) (vendor blog)

### Inferences
- Using a single yellow for 14K and 18K (Cullinan's owner decision of 2026-11-07) matches what both premium and
  luxury brands actually show.

### Gaps
- No same-design, same-studio 14K vs 18K pair was found to isolate the karat effect.
