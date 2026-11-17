# Professional jewellery photo retouching workflow (idealised metal, catalogue-wide consistency), and how to reproduce it in code

Scope note: the public web material on high-end jewellery retouching is thin and mostly comes from retouching-service blogs (marketing pages with little numeric detail). The most specific practitioner accounts are forum posts and portfolio notes. The colour targets for gold alloys come from a primary source (the ISO 8654:2018 Amd 1:2019 sample pages, read directly from the PDF). The image-processing methods (histogram matching, Reinhard transfer) come from primary or library documentation. Wherever a step is my own translation into code, it is listed under "Inferences".

## 1. How retouchers make polished gold look "better than real"

### Takeaway
The pro method treats polished metal as a curved mirror: the piece is cut out, the broken, messy reflections are replaced or evened with smooth gradients (often painted inside pen-tool paths, one per facet or band), shape is rebuilt with low-opacity dodge and burn, dust and scratches are healed, colour casts are neutralised (sometimes by desaturating and re-toning), and highlights are allowed to reach pure white. Restraint is a constant warning: keep the real texture and the real colour.

### Cited Findings
- Polished metal behaves like a curved mirror and picks up the camera, light modifiers and the studio; masked Curves or light dodge and burn even out broken reflections while keeping the surface gradient; cloning is reserved for isolated reflections that cut across an edge or hide a detail. — [Retouching Labs / search summary of jewelry retouching guides](https://retouchinglabs.com/jewelry-photo-metal-smoothing/)
- Dodge and burn on a separate layer in Soft Light or Overlay mode, with the Dodge and Burn tools at about 3–8% opacity, to recover shine and restore 3D depth; soft, low-opacity brushes to avoid hard lines. — [ukclippingpath, Balancing sparkle and realism](https://ukclippingpath.com/?p=15970); [Retouching Labs tutorial](https://retouchinglabs.com/jewelry-retouching-tutorial/)
- A practitioner's ring workflow: cut out the ring; build paths around the facets (especially the shank) and fill them with gradients to model the metal's form; dodge and burn to shape further; desaturate to black and white to remove colour casts from lighting or flare, then bring back some colour as a grade; let highlights reach pure white (specular); custom brushes for sparkle; high-pass sharpening; finally place on a background with a subtle shadow/reflection. — [Adobe Community, "Jewelry retouching" thread](https://community.adobe.com/t5/photoshop-ecosystem-discussions/jewelry-retouching/m-p/9670212)
- A professional portfolio describes "amplifying" existing shine and reflection while removing ambient light and imperfections; rings first extracted with deep etching, then retouched, with reflections added via inverse clone. — [Coroflot, High-End Jewelry Retouching IV](https://coroflot.com/BrianRetouchWiz/High-End-Jewelry-Retouching-IV)
- Frequency separation lets the retoucher edit texture (scratches) separately from colour/tone (reflections). — [Retouching Labs, jewelry retouching Photoshop](https://retouchinglabs.com/jewelry-retouching-photoshop/); [Retouching Labs tutorial](https://retouchinglabs.com/jewelry-retouching-tutorial/)
- The Gradient Tool is used to control reflections, e.g. fading glare on polished surfaces to a smooth look. — [Picup Media, jewelry photo retouching](https://blog.picupmedia.com/jewelry-photo-retouching/)
- Typical steps named across service guides: focus stacking (Helicon Focus or Photoshop Auto-Align/Auto-Blend), clipping path with the Pen tool, dust/scratch removal with Clone Stamp / Spot Healing (scratches reduced, not erased, to stay realistic), colour cast removal with consistent tones across a set, dodge and burn for shine, gem hue/saturation/contrast and sharpening, shadows (reflective, drop or natural), final zoomed-out check. — [Color Clipping, 11 jewelry retouching techniques](https://www.colorclipping.com/blog/11-jewelry-retouching-techniques-create-visual-perfection)
- Gold commonly reads orange and silver bluish or orange because of lighting; these casts are corrected. — [Color Clipping](https://www.colorclipping.com/blog/11-jewelry-retouching-techniques-create-visual-perfection)
- On faked or weak gold: "Gold, like any shiny metal, is about reflections" — a forum answer used a Curves layer in Luminosity blend mode to build reflective contrast, then a Hue/Saturation layer for colour. — [Adobe Community, real gold effect](https://community.adobe.com/t5/photoshop/real-gold-effect/m-p/11655472)
- Retouching guides warn repeatedly against over-editing: preserve authentic metal texture and true colour. — [Retouching Labs, metal smoothing](https://retouchinglabs.com/jewelry-photo-metal-smoothing/); [ukclippingpath](https://ukclippingpath.com/?p=15970)

### Inferences (programmatic equivalents; my translation, not from the sources)
- **Separate tone from colour first.** Work in CIELAB/LCh (or OKLab): L* carries the reflections (the "black and white" layer of the forum workflow), a*/b* (or C*, h) carry the gold colour. All shine work (gradients, dodge/burn, contrast between bright bands and dark mirror bands) is done on L* only, inside the metal mask; colour is then set separately. This mirrors "desaturate, shape, re-tone" and the Luminosity-blend Curves trick.
- **Dodge and burn ≈ low-amplitude local L* edits.** Equivalent operations: (a) a large-radius unsharp mask / "clarity" on L* (Gaussian sigma ~ 1–3% of the piece's size, amount 0.1–0.3) to separate bright bands from dark bands; (b) an S-curve on L* restricted to the mask; (c) for "painted" gradients, replace L* in a band with a smoothed version: L_smooth = Gaussian blur (or edge-preserving bilateral/guided filter) of L* within the mask, then blend L = L_smooth + k·(L − L_smooth) with k ≈ 0.3–0.6 — this is frequency separation: the low band holds the gradient, the high band holds scratches/noise and is attenuated.
- **Scratches and dust** live in the high-frequency band: detect isolated small outliers (|L − median filter(L, 5–9 px)| above a threshold, small connected area) inside the metal mask and replace them with the median value (a scripted "spot healing"). Never apply to stone pixels (sparkle is high frequency by nature).
- **Let speculars clip.** After shaping, map the top ~0.5–2% of metal L* to near white (the forum step "let the whites reach pure white"); preserve hue in the near-white so highlights do not turn grey.
- **Contrast of bright vs dark mirror bands** can be measured and set: P95(L*) − P5(L*) on the metal mask. This is the scripted equivalent of "how polished it looks" (see section 3).
- With AI-generated images, painted reflection cards are rarely needed (the model already draws a studio environment); the useful parts are the L*-only smoothing/contrast and colour toning.

### Gaps
- No free, step-by-step source with exact numbers for "reflection cards" painted in post (the term is used in studio lighting for physical white/black cards; I found no detailed retouching write-up of painting them digitally beyond "gradients inside pen paths"). Photigy's 53-minute ring tutorial exists but is paywalled ([Photigy](https://www.photigy.com/school/jewelry-retouching-tutorial-photoshop-ring/)).
- No published numeric targets for dodge/burn strength or band contrast in high-end houses.

## 2. Keeping gold colour consistent across a catalogue

### Takeaway
Studios keep colour consistent with a written style guide plus approved reference ("hero") images that every retoucher matches, with fixed settings/presets reused across all files; metal toning is often done with a shared gradient map or Hue/Saturation/Selective Colour preset. The physical metal colours themselves are standardised by ISO 8654 (colour codes 0N–6N with CIELAB nominal values), which gives an objective hue reference.

### Cited Findings
- Pixelz: client reference images are the benchmark retouchers match; style guides and specifications are stored and reused across assets; they help define one if the client has none. — [Pixelz retouching services](https://pixelz.com/retouching-services); [Pixelz all services](https://www.pixelz.com/all-services/)
- A retouching style guide specifies crop (baseline height, margins, positioning), colour treatment, background colour/texture, shadows, output (file type, dimensions, DPI, compression, colour profile), with supporting visual examples; one shared document is the constant reference for in-house and outsourced retouchers. — [Pixelz blog, retouching style guides](https://pixelz.com/blog/retouching-style-guides)
- The usual manual approach is to edit one hero frame, then match tone, contrast and colour on every other piece; a slight warm or cool cast changes how gold, silver and stones read. — [Imagen, jewelry photo editing workflow 2026](https://imagen-ai.com/valuable-tips/jewelry-photo-editing-workflow-2026/) (vendor marketing page)
- Use the same techniques and settings across all photos for uniformity. — [Retouching Labs, best guidelines](https://retouchinglabs.com/best-guidelines-for-jewelry-photo-retouching/)
- Gradient maps remap luminosity onto a colour ramp (mapped by luminosity, not position); 16-bit avoids banding in gold gradients; opacity or blend mode (e.g. 40% opacity, Overlay) lets the original show through; ready-made metal gradient sets exist for gold, rose gold, palladium, silver. — [Adobe, how to make a gold effect](https://www.adobe.com/creativecloud/photography/hub/guides/how-to-make-a-gold-effect-in-photoshop.html); [Photoshop Essentials, gradient map toning](https://www.photoshopessentials.com/photo-effects/warm-golden-sunset-effect-with-photoshop/); [Julieanne Kost, Gradient Map adjustment layer](https://jkost.com/blog/?p=9997); [Metal gradient maps (Gumroad)](https://kumanz.gumroad.com/l/MetalGRDmaps)
- **ISO 8654:2018/Amd 1:2019, Table B.2 (10° standard observer), nominal CIELAB of gold alloy colours** (read directly from the iTeh sample PDF): 0N L 93.0 a −1.14 b 21.15; 1N 91.6 / 2.27 / 21.84; 2N 90.2 / 3.47 / 25.10; 3N 89.1 / 5.74 / 23.05; 4N 88.1 / 7.78 / 20.71; 5N 87.0 / 9.51 / 18.11; 6N 85.8 / 10.82 / 15.27. Table B.3 (LCh): 0N C 21.18 h 93.10°; 1N C 21.96 h 84.08°; 2N C 25.34 h 82.13°; 3N C 23.76 h 76.01°; 4N C 22.12 h 69.42°; 5N C 20.46 h 62.29°; 6N C 18.71 h 54.70°. L* tolerance about ±1.7–1.9 around each nominal (e.g. 3N L 87.3–90.8). Designations: 0N yellow-green, 1N pale yellow, 2N light yellow, 3N yellow, 4N pink, 5N red, 6N dark red. The amendment states the main document uses a 2° observer for gold alloy coatings, Annex B gives the 10° values. — [ISO 8654:2018/Amd 1:2019 sample (iTeh)](https://cdn.standards.iteh.ai/samples/76036/b7e7b6570a9243c8ba787db22543cef8/ISO-8654-2018-Amd-1-2019.pdf)
- Gold Bulletin, Cretu & van der Lingen, "Coloured gold alloys" (1999, 32, 115–126) plots a*/b* coordinates of coloured gold alloys (figure and table not accessible here). — [Springer DOI 10.1007/BF03214796](https://link.springer.com/doi/10.1007/BF03214796)
- White gold is graded by the ASTM Yellowness Index, with CIELAB as an alternative (Henderson & Manchanda, Gold Bulletin 2005). — [Springer, White gold alloys](https://link.springer.com/article/10.1007/BF03215234) (paywalled/blocked; summary from search snippet)
- Patent data for 18K grey/white gold: a preferred alloy measured L* 81.8, a* 2.48, b* 8.39; another patent targets L ≥ 80, a* < 1.5, b* < 5 for 18K grey alloys. — [USPTO grey gold alloy patents](https://image-ppubs.uspto.gov/dirsearch-public/print/downloadPdf/10458002)
- Typical 18K recipes (secondary sources): yellow 75% Au / 12.5% Cu / 12.5% Ag; rose 75% Au / 20% Cu / 5% Ag. — [Luxe Digital gold colours guide](https://luxe.digital/lifestyle/jewelry/gold-colors-guide/) (secondary; verify)

### Inferences
- **Measured alloy colour ≠ photographed colour.** ISO values are for a flat sample in a spectrophotometer (very light: converted to sRGB D65 they are about 3N ≈ (251, 219, 180), 5N ≈ (249, 211, 184) — my conversion). In a photo of polished jewellery the mid-tone metal is much darker and more saturated, because the camera sees reflections of a dark/light environment tinted by the metal, and concave areas reflect several times (each bounce multiplies the spectral reflectance, which raises chroma). So retouchers (and code) should transfer the **hue angle**, not the L* or chroma, from the standard.
- **The project's current targets agree with ISO hues** (my conversion of sRGB to Lab D65): yellow target 209,167,111 → L 71.1, a 8.3, b 34.7, C 35.7, **h 76.5°**, which is almost exactly ISO **3N yellow (h 76.0°)**; ring A's 208,165,114 → h 74.0° (between 3N and 4N, explaining why it "read nearly as rose"); rose target 202,152,122 → L 66.8, C 27.4, **h 57.3°**, between ISO **5N red (62.3°)** and **6N (54.7°)**; white 209,204,204 → a 1.7, b 0.6, C 1.8 (essentially neutral; rhodium-plated white gold should be neutral, while un-plated 18K white gold is measurably yellowish, b* ≈ 5–8 from the patent data). The photo chroma (C ≈ 36 yellow) is ~1.5× the ISO flat-sample chroma, consistent with the multi-reflection effect above.
- **A scripted "colour standard"**: store, per metal, a target in LCh as a *distribution* over metal pixels (median h, median C at mid-L*, and C as a function of L*), measured from the approved master image (ring A / the project's approved yellow). Then for each new image: inside the metal mask, rotate h to the target median (luminance-preserving, since L* is untouched), scale C by target/current at matching L* bins, and leave L* to the brightness step. This is the code equivalent of a shared gradient map + Hue/Saturation preset, but measured instead of eyeballed.
- A gradient map in code: build a 256-entry LUT from the master image (for each L* bin, the median a*, b* of metal pixels), then for a new image set a*, b* from the LUT at each pixel's L*, blended with the original at an "opacity" (e.g. 0.6–0.8) to keep natural variation. This reproduces "one gold preset across every image".

### Gaps
- Could not read the Gold Bulletin 1999 figure/table or the 2005 white gold paper (Springer login redirect; sterc.org DNS failed). No published CIELAB for 14K vs 18K yellow specifically (14K alloys are usually paler/more copper or silver-shifted depending on recipe; not sourced).
- No source gives the Lab values that luxury brands actually aim for *in photographs*; that is studio-internal.

## 3. Matching brightness and polish between images

### Takeaway
Retouchers match by eye to a hero image; the scriptable equivalents are histogram matching (CDF mapping) and statistics transfer (Reinhard: mean and standard deviation per channel in a decorrelated colour space). For jewellery they should be restricted to metal pixels and applied to L* only, ideally via a few percentile anchors (P5/P50/P95) rather than a full histogram, to avoid shifting the piece's own shading.

### Cited Findings
- scikit-image `match_histograms(image, reference, channel_axis=-1)` matches the cumulative histogram of each channel independently; described as a lightweight normalisation, not a full colour correction. — [scikit-image histogram matching example](https://scikit-image.org/docs/stable/auto_examples/color_exposure/plot_histogram_matching.html)
- Reinhard et al. 2001, "Color Transfer between Images" (IEEE CG&A 21(5) 34–41): convert to lαβ (decorrelated, log-based), subtract the source mean per channel, scale by the ratio of standard deviations, add the target mean; many implementations use CIELAB instead of lαβ. — [Academia.edu copy](https://www.academia.edu/9445485/Color_Transfer_between_Images); [Overview of colour transfer (arXiv 2204.13339)](https://arxiv.org/pdf/2204.13339); [Brown CS129 colour matching lab code](https://cs.brown.edu/courses/cs129/2020_Fall/labs/lab_colormatching/colormatch.py)
- Curves set to Luminosity blend mode change contrast without changing colour (used for reflective look on gold). — [Adobe Community](https://community.adobe.com/t5/photoshop/real-gold-effect/m-p/11655472)

### Inferences (recipe)
1. Compute L* (or OKLab L) for metal pixels only (mask from section 4), excluding stones and excluding clipped speculars (L* > 97) from statistics.
2. Measure P5, P25, P50, P75, P95 of L* on the master image and on the new image. Record "polish contrast" = P95 − P5 and "brightness" = P50.
3. Build a monotone piecewise-linear (or monotone cubic, e.g. PCHIP) curve mapping the new image's percentiles to the master's; apply to L* inside the mask only; keep a*, b* scaled so chroma at a given L* follows the master (or re-run the colour step after).
4. Feather the edit at the mask edge (see section 4) so edge pixels blend; never apply to the background.
5. Full CDF matching (`match_histograms`) on L* is acceptable when the two pieces have similar geometry; for different shapes (thin band vs. wide pendant) percentile anchors are more robust because the share of dark vs bright bands legitimately differs. Clamp the curve's slope (e.g. 0.6–1.6) to prevent posterisation.
6. Reinhard (mean/std) on a*, b* of metal pixels is a quick colour normaliser, but it equalises spread too — for gold, rotating the hue and scaling chroma (section 2) is safer because it does not inflate noise in near-white highlights.
7. Do the arithmetic in 16-bit/float and linear-light where blurring is involved; convert back to sRGB 8-bit only at export (avoids banding, the same reason the gradient-map guide recommends 16-bit).

### Gaps
- No source publishes percentile targets used by commercial jewellery studios; the P5/P50/P95 approach is an engineering inference.

## 4. Masking metal vs stones vs pearls vs background, spill and halos

### Takeaway
Pros cut the piece out with Pen-tool clipping paths (pixel-precise on metal edges), then build sub-masks inside it for facets, stones and details; AI segmentation is used for speed but needs human finishing. Colour and tone edits are then clipped to these masks so they cannot bleed onto background or stones.

### Cited Findings
- Clipping path with the Pen tool is the standard isolation method (time-consuming); AI clipping is claimed to be ~80% precise, with humans finishing the rest (vendor claim). — [Color Clipping](https://www.colorclipping.com/blog/11-jewelry-retouching-techniques-create-visual-perfection)
- Pen Tool for pixel-perfect paths on metal edges, then path → selection; inside the basic shape, further mask selections for details to add colour and shading later. — [Retouching Labs, Photoshop](https://retouchinglabs.com/jewelry-retouching-photoshop/); [Photoshop Gurus forum](https://photoshopgurus.com/forum/threads/how-to-retouch-this-piece.43013)
- Layer masks keep dodge and burn precise; Selective Color adjusts individual tones without affecting the whole image. — [Retouching Labs tutorial](https://retouchinglabs.com/jewelry-retouching-tutorial/)
- Pixelz combines AI with human editors; human QC catches unacceptable AI output. — [Pixelz retouching services](https://pixelz.com/retouching-services)

### Inferences (scriptable masking and spill QA)
- **Background mask** on an off-white seamless (e.g. 251,251,253): pixels with ΔE2000 < ~3 to the background colour *and* connected to the image border (flood fill), which keeps enclosed white highlights on the metal from being taken as background. The soft shadow is a separate class: low chroma (C* < ~4), L* below background, connected to background.
- **Metal mask (gold)**: inside the non-background region, pixels whose hue lies within the metal's hue window (yellow h ≈ 60–95°, rose ≈ 40–70°) and C* above ~8 at mid L*, plus near-white/near-black pixels enclosed by those (speculars and dark mirror bands are achromatic, so close them morphologically: dilate the hue mask, fill holes, intersect with the object mask).
- **Stone mask**: user-drawn boxes/ellipses (as the project already does with `--stone`), or automatic: low-chroma, high local variance (sparkle) regions inside the object; pearls: low chroma, smooth, high L*. With white gold (also achromatic), automatic separation of stones is unreliable — keep manual boxes.
- **AI segmentation** (e.g. SAM/SAM 2 promptable masks, or background-removal matting models such as BiRefNet/RMBG) can produce the object mask and alpha; still refine edges. (Model names are from general knowledge, not from the sources above.)
- **Feathering**: blur the mask 1–3 px at 2048 px output (proportionally more at 4K), and shrink it by ~1 px before feathering for colour edits so the edit fades inside the metal edge rather than outside it. For L*-only edits a slightly wider feather is fine; for hue/chroma edits keep it tight (halo risk).
- **Spill / halo QA (difference mask)**: compute ΔE2000 between before and after per pixel. (a) Any ΔE > 1 inside the background mask (dilated 0–20 px ring around the object) = spill; report count and max. (b) Any ΔE > 1 inside stone boxes = stone contamination. (c) Inside a 2–6 px band around the object edge, check after-image chroma vs. background: a coloured fringe shows as C* rising above the background's (~1) outside the object boundary. (d) Re-measure background flatness: P1/P99 of background RGB within ±1 of target. Save the ΔE map as a heatmap for human review.

### Gaps
- No source describes how high-end studios QA spill numerically; the difference-mask method above is an engineering inference. No source on pearl masking specifically.

## 5. QA checklist before publishing (common to the sources) and typical gold colour values

### Takeaway
Published checklists are qualitative: colour/lighting accurate and consistent across the set, backdrop correct, details sharp at zoom, polish natural, shadows aligned, result realistic versus the physical piece, output specs uniform. These can be turned into numeric checks against the master image.

### Cited Findings
- Final check list: lighting and colour balanced and accurate (gold, gem colour); backdrop complements the piece; details hold up zoomed in; polishing, smoothing, sharpening clear but not artificial; shadows in the right place; realistic compared with the physical product; export format, file naming, compression per platform. — [Color Clipping](https://www.colorclipping.com/blog/11-jewelry-retouching-techniques-create-visual-perfection)
- Style-guide items to verify: crop baseline/margins/positioning, background colour, shadow, output type/dimensions/DPI/compression/colour profile. — [Pixelz style guides](https://pixelz.com/blog/retouching-style-guides)
- Output: monitor calibration, correct colour profile, PNG/JPEG for web. — [Retouching Labs tutorial](https://retouchinglabs.com/jewelry-retouching-tutorial/)
- Sharpening: avoid over-sharpening, which looks unrealistic. — [Color Clipping](https://www.colorclipping.com/blog/11-jewelry-retouching-techniques-create-visual-perfection)
- Colour values: see ISO 8654 table in section 2. — [ISO 8654 Amd 1 sample](https://cdn.standards.iteh.ai/samples/76036/b7e7b6570a9243c8ba787db22543cef8/ISO-8654-2018-Amd-1-2019.pdf)

### Inferences (numeric version of the checklist, per image vs. master)
- Metal hue: median h within ±2° of the metal's target (yellow ≈ 76.5°, i.e. ISO 3N's 76.0°; rose ≈ 57° between 5N and 6N); median C* at mid-L* within ±10% of target; white/rhodium |a*|, |b*| ≤ ~2 (b* > ~4 reads as yellowish/champagne).
- Metal brightness/polish: P50 L* within ±2, (P95 − P5) within ±5 of master; speculars present (P99 ≥ ~95).
- Background: every border pixel within ±1–2 RGB of target; no rectangle/tile steps (row/column means flat).
- Spill: ΔE before/after ≤ 1 outside the metal mask (background and stones).
- Geometry: bounding box size and centre within tolerance of the frame spec; output dimensions/profile (sRGB, embedded) correct.
- Sharpness: Laplacian variance at the ends of the piece ≥ a fraction of the centre's (focus-stack look).
- Stones: chroma below a threshold (no pink/lilac/milky cast) and local contrast (facet dark/light) above a threshold.
- Human pass last, at 100% zoom and at thumbnail size, side by side with the master.

### Gaps
- Exact tolerances used by luxury houses (ΔE thresholds) are not published; the numbers above are reasonable defaults (ΔE00 ≈ 1–2 is commonly treated as barely perceptible in colour-management practice, not sourced here).
- 14K vs 18K target values in imagery: no source; many brands show one yellow for both (consistent with the project's owner decision).
