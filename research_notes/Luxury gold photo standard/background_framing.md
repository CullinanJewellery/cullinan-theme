# Background, shadow and framing standards in luxury jewellery product photos

Method note: "MEASURED" values come from a script run on 2026-11-17 against the brands' live CDN images: corners
2% patches, a median of the border, and a product bounding box. A pixel counts as non-background when any channel is
more than 40 levels from the border median ("b40", roughly the piece itself) or more than 8 levels ("b8", piece plus
soft shadow or reflection). "Shadow extent" is how far b8 reaches past b40 on each side, as a % of the frame. Sizes
are % of frame width (w) and height (h); the centre is cx/cy in % from the left and top. Sample: 3 to 12 main images
per brand, mostly first (main) images from listing pages or Shopify `products.json` feeds. These are small samples:
treat them as indicative. "GUIDE" values come from platform documents or studio blogs.

Not sampled: Ole Lynggaard Copenhagen (its listing URL returned 404 and there was no Shopify feed) and Messika (its
listing pages only gave campaign and still-life banners, no product packshots). Van Cleef & Arpels: only 5
transparent product PNGs taken from its homepage. Tiffany: necklaces only, because the ring listing hid its product
images.

## 1. What background values do they use? Flat or gradient?

### Takeaway
No luxury brand in the sample uses a visible gradient on its e-commerce packshot except Cartier. They split into
three groups:
- **Pure white 255, either a flat white background or a transparent cut-out:** Tiffany, Bulgari, Van Cleef & Arpels.
- **Flat neutral off-white, 246–251:** Jessica McCormack 246, Pomellato 247, Mejuri 248, moonmagic 251. All are
  perfectly flat: the corners differ by 0 levels and R = G = B.
- **Warm off-white:** Catbird 248,247,243, which is flat. Cartier about 240,236,229, which is a warm cream with a
  soft vignette (corners differ by about 10 levels).

Each brand keeps one exact value across its whole catalogue.

### Cited Findings
- MEASURED moonmagic (12 images, 1200 px renditions of 2500×2500 originals; 208 of the first 250 feed images are
  2500×2500): every corner and edge is 251,251,251, with a corner spread of 0.0 in 11 of 12 images. The background
  is neutral grey-white with no tint. — [moonmagic products feed](https://moonmagic.com/products.json)
- MEASURED Jessica McCormack (11 images): 246,246,246 in all four corners of every image, spread 0.0. Originals are
  3000×4000 (portrait 3:4; 199 of 250). — [jessicamccormack.com products feed](https://www.jessicamccormack.com/products.json)
- MEASURED Pomellato (12 images): 247,247,247 neutral. Originals are 3000×3000 (249 of 250). The bottom edge
  sometimes reads 241–245 where the soft shadow reaches the frame. One image was a transparent PNG
  (Collana Gold). — [pomellato.com products feed](https://pomellato.com/products.json)
- MEASURED Mejuri (8 PDP images from the rings listing): 248,248,248 neutral, flat (spread 0.0), size 1200×1433,
  a portrait of about 5:6. — [Mejuri rings](https://mejuri.com/shop/t/type/rings)
- MEASURED Catbird (5 images, 1440–2016 px square): 248,247,243 in every corner. This is a warm off-white (blue 5
  below red) and flat. One 3-up charm image is 251,247,244. — [Catbird rings](https://www.catbirdnyc.com/jewelry/designer-jewelry/rings.html)
- MEASURED Cartier (4 packshots, 2048×2048 native, served square through `?sw=`): the background is warm cream.
  Corners range from 237,232,226 to 248,243,237, with a median of about 240,236,229. Corner spread is 8.5–10.8
  luminance levels, so it is a lit, gently graded sweep and not a flat fill. The top middle is lighter (245,240,236)
  than the bottom. Two other "product" images in the listing were lifestyle shots on dark backgrounds. — [Cartier rings](https://www.cartier.com/en-us/jewelry/rings/)
- MEASURED Tiffany (5 necklace main images, `_PDT_MAIN1X1`, native 1280×1280): pure 255,255,255 in every corner,
  spread 0. — [Tiffany necklaces](https://www.tiffany.com/jewelry/necklaces-pendants/)
- MEASURED Bulgari (4 ring images): the masters are **transparent PNG cut-outs** (1800×1405). The listing pads them
  onto a 1090×1090 square with Cloudinary `c_pad` on white 255. — [Bulgari rings](https://www.bulgari.com/en-us/jewelry/rings)
- MEASURED Van Cleef & Arpels (5 product PNGs from the homepage): 3000×3000 with transparency, shown on white 255. —
  [Van Cleef & Arpels](https://www.vancleefarpels.com/us/en/home.html)
- GUIDE Amazon main image: "pure white (RGB 255.255.255)" (Pixelz, 2015 article) — [Pixelz](https://www.pixelz.com/blog/heres-everything-you-need-to-know-about-amazons-product-image-requirements/).
  Secondary 2025–26 guides repeat that jewellery main images with "non-pure white background (RGB less than 255)"
  are prohibited — [Jungle Scout](https://www.junglescout.com/resources/articles/amazon-image-requirements/). I did
  not find Amazon's own Seller Central page.
- GUIDE Google Merchant Center: the image_link page does **not** require white. It asks for "an unobstructed, clean
  view of the item" and "Don't use an image with a border". — [Google Merchant Center help](https://support.google.com/merchants/answer/6324350)
- GUIDE Shopify: "White backgrounds are great for your main product images." — [Shopify blog](https://www.shopify.com/blog/product-photography)

### Inferences
- Pure 255 is the marketplace (Amazon) convention and what the oldest houses use (Tiffany, Bulgari, VCA). Both
  Bulgari and VCA reach it by cut-outs, which let the site choose the canvas.
- The newer and more design-led houses (Pomellato, Jessica McCormack, Mejuri, moonmagic, Catbird) all use a flat
  off-white of 246–251. That keeps the photo from glaring against a white page and lets the image edge read slightly.
- Cullinan's target, 251,251,253 (#FCFBFC), lies in the measured off-white band. It is the same level as moonmagic
  (251), with a very slight cool lift in blue that none of the sampled brands use: they are neutral (R = G = B) or,
  for Catbird and Cartier, warm.
- Only Cartier uses a visible gradient. Everyone else is flat to the pixel, which implies a fill or flood in
  post-production rather than a lit sweep left as shot.

### Gaps
- No public document from any luxury house states its background value; all brand values above are measured.
- The figures are CDN renditions (JPEG or WebP re-encodes). An exact value could differ by about 1 level from the
  master files.
- Ole Lynggaard and Messika could not be measured.

## 2. Shadows: present or not, style, direction, darkness

### Takeaway
Most brands keep a **very soft, low-contrast grounding shadow** that adds only 1–7% of the frame beyond the piece,
and none shows a hard drop shadow.
- **Direction is fixed per brand:**
  - **Below / in front:** Pomellato, which also has the largest shadow: rings carry a shadow 17–21% of the frame
    long, falling down toward the viewer.
  - **Below:** Jessica McCormack and Tiffany (a faint shadow or reflection under pendants).
  - **Left:** moonmagic.
  - **Right:** Mejuri.
  - **Behind, to the right:** Cartier.
- **No shadow at all:** Bulgari and VCA (clean cut-outs) and Catbird (flat front view).

### Cited Findings
- MEASURED moonmagic: in every ring, bracelet and earring image the shadow extends only to the **left**, by 0.8–12.5%
  of the width (rings 4.0–5.8%). It extends 0–0.2% to the right and 0–0.8% at the bottom. It is very pale: on a
  visual check it is barely visible. — [moonmagic products feed](https://moonmagic.com/products.json)
- MEASURED Pomellato rings: the shadow extends **downward** 16.8–21.5% of the height. Seen by eye, it is a soft,
  long cast shadow falling toward the front and lower left. The darkest neutral shadow pixels sit at a luminance of
  about 188–196 on a background of 247, so roughly 20–24% darker than the background at the core. Earrings carry
  7.5–8.8% below; necklaces 1.3%. — [pomellato.com products feed](https://pomellato.com/products.json)
- MEASURED Jessica McCormack: the shadow is mainly **below**, 1.3–7.2% of the height, with a little to the right. It
  is a soft pool under pendants (checked visually). — [jessicamccormack.com products feed](https://www.jessicamccormack.com/products.json)
- MEASURED Mejuri: the shadow extends **right**, 3.2–5.0% of the width, on 4 of 8 images, and below by under 1.1%. —
  [Mejuri rings](https://mejuri.com/shop/t/type/rings)
- MEASURED Tiffany necklaces: there is only a slight extent **below** the pendant, 1.0–5.0% of the height. By eye
  it is a faint reflection or shadow under the pendant bar on pure white. — [Tiffany necklaces](https://www.tiffany.com/jewelry/necklaces-pendants/)
- MEASURED Cartier: by eye there is a soft, wide shadow behind and to the right of the ring on the cream sweep. The
  numbers could not isolate it because the background is graded. — [Cartier rings](https://www.cartier.com/en-us/jewelry/rings/)
- MEASURED Bulgari: the piece and the cut-out bounding boxes are identical (0.0–0.1%), so there is **no shadow**.
  Catbird shows 0.1–1.1% on all sides, which is effectively none. — [Bulgari rings](https://www.bulgari.com/en-us/jewelry/rings); [Catbird](https://www.catbirdnyc.com/jewelry/designer-jewelry/rings.html)
- MEASURED VCA: four of five homepage PNGs have no shadow (0–2%). One has a 27% extent below, probably a mirror
  reflection; it was not verified visually. — [Van Cleef & Arpels](https://www.vancleefarpels.com/us/en/home.html)
- GUIDE The Kohl's jewellery vendor guide, as summarised in search results, asks for a soft light from one side
  "that reveals shape and texture while leaving a soft grounding shadow", and says "the end result must match the
  reference images" however it is achieved. I could not open the PDF (403), so this is from the search snippet only. —
  [Kohl's Vendor Style Guide Jewelry](https://link.kohls.com/content/dam/klink/pdfs/Vendor_Style_Guide_Jewelry.pdf)
- GUIDE Retouching studios list "shadow creation for realism" as a standard retouching step: the shadow is
  built in post-production, not left as shot. — [Retouching Labs](https://retouchinglabs.com/jewelry-product-photo-editing/)

### Inferences
- The consistent pattern is one shadow direction per brand, applied to the whole catalogue, kept soft and short. On
  moonmagic and Mejuri it is so faint that it reads as grounding, not as a visible shadow. Cullinan's rule (soft
  neutral grey falling left, thin contact shadow) matches moonmagic's measured direction.
- A long, visible cast shadow (Pomellato's 17–21%) is a deliberate brand look, not the norm.

### Gaps
- Shadow opacity could not be measured cleanly where the stones or metal are dark. The "darkest shadow" figure is
  only reliable for Pomellato.
- Whether brands use a reflection (a mirror surface) or a shadow was judged by eye in only a few cases.

## 3. Product size in frame, centring, scale between pieces, angles

### Takeaway
There are **two opposite philosophies**.
- **Fill-to-frame:** moonmagic, Pomellato bracelets and necklaces, Tiffany necklaces. Every piece is scaled to about
  the same size whatever its real size. For moonmagic that is rings, earrings and bracelets at about 70–77% of the
  width; necklaces fill 87–93% of the height.
- **True relative scale:** Jessica McCormack, Mejuri, Bulgari. A stud is small and a bracelet is large, at a fixed
  magnification.
  - Mejuri studs are 11–14% of the width; Jessica McCormack studs 8–29%. Bulgari rings are all 40–45% of the width.

Horizontal centring is exact everywhere: the centre x is 49–51%. Vertical placement is either exactly centred (Mejuri,
Jessica McCormack, Catbird at about 50%) or sits a little low (moonmagic rings 52–55%, Bulgari 57%).

### Cited Findings
- MEASURED moonmagic (frame 1:1): rings b40 70–72% w × 63–66% h, centre about 47–50% / 52–54%; earrings 72–80% w;
  bracelets 72–75% w × 86–92% h; necklaces about 41% w × 90% h, centre 49% / 45%. Identical products are framed to
  the pixel: the three T-Lock necklaces all measure 40.7 × 89.8%. — [moonmagic products feed](https://moonmagic.com/products.json)
- MEASURED Jessica McCormack (frame 3:4, 3000×4000): rings 43% w; studs 8–29% w; pendants 14–16% w × 37–40% h;
  bracelets 57–62% w. Centre x is 49.3–51.3%, centre y 45–53%. The varying sizes point to a fixed-magnification
  (true-scale) system. — [jessicamccormack.com products feed](https://www.jessicamccormack.com/products.json)
- MEASURED Mejuri (about 5:6): products are centred to 49.3–50.2% x and 49.3–50.5% y. Studs and letters are
  11–14% w and about 7% h; pendants 22–23% w; one larger piece 87% w. This is true scale, strictly centred. —
  [Mejuri rings](https://mejuri.com/shop/t/type/rings)
- MEASURED Pomellato (1:1): rings 31–35% w × 37–50% h; earrings 42–58% w; bracelets 57–77% w; necklaces 84–91% h.
  The centre x is 48–51%. The piece sits slightly high (centre y 44–49%) with the shadow below it. —
  [pomellato.com products feed](https://pomellato.com/products.json)
- MEASURED Bulgari ring masters (1800×1405, transparent): four rings at 39.8–44.9% w and 61.6–64.9% h, centre x
  49.6–50.6%, centre y 55.8–57.6%. That is very tight consistency, which points to a fixed template. —
  [Bulgari rings](https://www.bulgari.com/en-us/jewelry/rings)
- MEASURED Tiffany necklaces (1:1): 85–87% h, centre x 48.7–50.0%, centre y 43–44% (the chain runs to near the top
  edge and the pendant sits in the lower half). — [Tiffany necklaces](https://www.tiffany.com/jewelry/necklaces-pendants/)
- MEASURED Cartier rings (1:1): about 44–47% w × 30–54% h, centre about 51% / 51% for the lying view; others about
  43% / 43%. — [Cartier rings](https://www.cartier.com/en-us/jewelry/rings/)
- MEASURED Catbird (1:1): rings 72% w, centre 50 / 50; charms 54–80% w, centre 50 / 48–52. — [Catbird](https://www.catbirdnyc.com/jewelry/designer-jewelry/rings.html)
- OBSERVED angles (by eye, contact sheets):
  - **moonmagic:** rings standing or stacked upright, three-quarter to front view.
  - **Pomellato:** ring standing at three-quarter with a long shadow.
  - **Cartier:** ring standing at three-quarter, or lying tilted.
  - **Bulgari:** B.zero1 standing upright, three-quarter.
  - **Catbird:** ring seen from the front (the stones' face), flat, no shadow.
  - **Tiffany:** necklace laid flat from straight above.
  - **Jessica McCormack:** pendants hanging upright, seen from the front.
- GUIDE Google Merchant Center (official): "Frame your product in the image space so that it takes up no less than
  75%, but not more than 90%, of the full image"; at least 500 × 500 px (enforced for all products from 31 January
  2027); 1500 × 1500 recommended; max 64 MP / 16 MB; "Google may test subtle cropping on your image". —
  [Google Merchant Center help](https://support.google.com/merchants/answer/6324350)
- GUIDE Amazon: the product fills at least 85% of the frame (Pixelz 2015; secondary guides in 2025–26 say 85–100%).
  Jewellery such as necklaces is allowed to touch or be cut by the frame edge. Zoom works from 1000 px. —
  [Pixelz](https://www.pixelz.com/blog/heres-everything-you-need-to-know-about-amazons-product-image-requirements/);
  [Jungle Scout](https://www.junglescout.com/resources/articles/amazon-image-requirements/)
- GUIDE Shopify: "An image size of 2048 by 2048 pixels for square product photos"; maximum 4472 × 4472 px, 20 MB. —
  [Shopify blog](https://www.shopify.com/blog/product-photography)
- MEASURED resolutions of the master files: moonmagic 2500², Pomellato 3000², Jessica McCormack 3000×4000, VCA 3000²,
  Cartier 2048², Catbird 1440–2016², Tiffany 1280² (largest served), Bulgari 1800×1405. — feeds and CDNs as above.

### Inferences
- Luxury houses do not follow the marketplace fill of 75–90%. Rings typically take only 31–47% of the width (Pomellato,
  Jessica McCormack, Cartier, Bulgari), which leaves generous white space and reads as "premium".
- Fill-to-frame (moonmagic about 70–77%, Catbird about 72%) is the D2C / fashion-jewellery approach. Cullinan's
  current 76% of the height is in that band.
- True scale (Mejuri, Jessica McCormack) makes earrings look small next to rings; fill-to-frame makes everything look
  equally big. Either is consistent if it is applied by rule. No brand mixes the two within one category.
- An exact centre x of 50% ±1 is universal, so it is clearly automated: a script or template aligning the bounding
  box. The ±0.0 repeat across identical moonmagic products confirms a template.

### Gaps
- Angles per category for Ole Lynggaard and Messika could not be checked.
- I sampled only the main image. Second and third images (worn, detail) were not measured.

## 4. Marketplace and platform guidelines

### Takeaway
Only Amazon requires pure white 255 and 85% fill. Google requires a 75–90% fill and no border, but no particular
background colour. Shopify only recommends white and a 2048 px square. None of these binds a Shopify brand store.

### Cited Findings
- Google: "no less than 75%, but not more than 90%"; no borders, watermarks or overlays; 500 × 500 minimum (from
  31 January 2027 for all products); 1500 × 1500 recommended. — [Google Merchant Center help](https://support.google.com/merchants/answer/6324350)
- Amazon: pure white 255,255,255; 85% fill; no text, logos, watermarks or props; jewellery may touch the frame edge.
  These come from third-party guides; Amazon's own page was not reached. — [Pixelz](https://www.pixelz.com/blog/heres-everything-you-need-to-know-about-amazons-product-image-requirements/); [Jungle Scout](https://www.junglescout.com/resources/articles/amazon-image-requirements/)
- Shopify: white for main images; 2048 × 2048 square; a tripod for a consistent camera angle. — [Shopify blog](https://www.shopify.com/blog/product-photography)

### Inferences
- An off-white of 251 with the piece at 76% of the height satisfies Google's fill rule (75–90%). Google is the
  relevant feed for a Shopify store, through the Google & YouTube channel. It would not pass Amazon's 255 rule, which
  is irrelevant unless the shop sells on Amazon.

### Gaps
- No official Amazon page was retrieved in this session; the Amazon figures are second-hand.

## 5. How studios and brands enforce consistency

### Takeaway
Consistency comes from a written style guide with reference images, a fixed physical setup (tripod, lights,
documented settings), and post-production templates: cut-out masks, fixed canvas, alignment, a shadow built in
post, colour calibration. The measurements show the outcome: the same background value to the level, the same
centring to ±1%, and identical framing for sibling products.

### Cited Findings
- Shopify advises writing a photography style guide and recording camera settings, lighting, background and
  equipment position, because variations from product to product will distract customers (search summary of the
  Shopify jewellery-photography post). — [Shopify jewelry photography](https://www.shopify.com/hk-en/blog/jewelry-photography)
- The Kohl's jewellery vendor style guide holds suppliers to reference images: "the end result must match". I saw
  only the snippet; the PDF returned 403. — [Kohl's guide](https://link.kohls.com/content/dam/klink/pdfs/Vendor_Style_Guide_Jewelry.pdf)
- Retouching Labs' checklist covers colour correction for gemstone and metal accuracy, reflection and glare control,
  dust and scratch retouching, shadow creation, and consistent spacing and alignment. — [Retouching Labs](https://retouchinglabs.com/jewelry-product-photo-editing/)
- A grey card or colour calibration keeps hues steady across shots. — [Rewarx](https://www.rewarx.com/blogs/what-jewelry-photography-style-works-best-for-ecommerce)
- MEASURED evidence of templates:
  - Bulgari serves transparent masters and pads them on the fly (Cloudinary `c_pad,h_1090,w_1090`), so the canvas and
    background are set by the site, not the photo.
  - VCA also serves transparent 3000² PNGs.
  - The three moonmagic T-Lock necklaces have pixel-identical bounding boxes.
  - — [Bulgari](https://www.bulgari.com/en-us/jewelry/rings); [moonmagic feed](https://moonmagic.com/products.json)

### Inferences
- There are two enforcement models.
  - **(a) Cut-out master plus a canvas set by code:** Bulgari and VCA. The background is exact by construction and the
    framing is controlled by padding rules.
  - **(b) A flattened off-white master, scripted:** moonmagic, Pomellato, Jessica McCormack, Mejuri. The background
    is flooded to one value and the piece is aligned to a fixed box.
- Cullinan's pipeline (bg-even.cjs flooding to 251,251,253; frame-photo.cjs at 50 / 50 and 76% of the height;
  check-photo.cjs) is model (b), the same as the D2C leaders.

### Gaps
- I found no first-hand description of an in-house luxury-house pipeline. Their tooling is inferred from the output.
  The studio guides are generic blogs, not standards.
