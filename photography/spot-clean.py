"""
spot-clean.py - removes the colour spots (yellow, orange, pink, grey blotches) from the paper and shadow of studio
photos and never touches the jewellery (owner, 2026-11-19: "the only thing that you are touching is the jewelry you
need to outline the jewelry so it is just on it ... check every jewelry for that").

Why: the AI paints warm light on the paper next to the metal (inside openings such as the bee's wings, round the
piece, at shadow edges). gold-standard.cjs maps every clearly coloured warm pixel to gold, so in the finished photo
that light is real gold colour (bee: 216, 176, 113 next to metal of 218, 185, 128) and neither colour nor shape can
tell it from the metal. glow-clean.cjs searched by colour and missed it. In the AI original the two differ clearly:
the metal is saturated gold (hue 34-50 degrees, saturation above 0.4), the light on the paper is a pale peach or
pink (hue under 32 degrees, saturation 0.06-0.38, brightness above 150).

How:
 1. The AI original is registered onto the finished yellow photo (scale and shift from the piece's outline, then
    OpenCV ECC, affine). --ai names it; without --ai the script searches --search <folder> (the piece's чернови)
    for the best-aligned, least-recoloured PNG.
 2. Outline of the jewellery = everything except the background. Background = the connected areas that hold the
    paper bg-soft wrote (exactly neutral: r = g, b = g + 2) plus the pixels that are pale warm light in the AI
    original (see above) and do not have a coloured-stone colour in the photo. Metal, its antialiased edge (a mix of
    gold and paper still has the gold's hue), rhodium (neutral in the AI), stones, pearls and cord are outline.
    A 1 px band round the outline is added to it, so thin wires and prongs keep every edge pixel.
 3. Spots = background pixels with a tint (max of |r - g|, |b - g - 2|) of 6 or more in areas of 40 px or more
    (reported). Fixed: every background pixel with a tint of 2 or more becomes neutral grey (r = g, b = g + 2) at
    its own brightness (shadows stay where and as dark as they were); 250.5 or brighter becomes exactly the paper
    251, 251, 253. Pixels touching the outline are blended half and half with their old value (no hard step).
    Outline pixels keep their bytes: the script counts them and stops if one changed.
 4. Rose, white, silver and two-tone photos of the same shot (they line up pixel for pixel with the yellow; checked
    on the paper) use the yellow's background: every pixel there that is tinted or differs from the fixed yellow by
    more than 3 (a blotch) takes the fixed yellow's value, so every metal of a shot ends with the same background
    and shadow.
 Without an AI original (--ai none) the background is only the exact paper and the faint tint next to it
 (tint 2-20, brightness above 200), so gold-coloured blobs are left; such shots are reported.

Usage (Python 3 with numpy and opencv-python):
  python spot-clean.py <yellow.png> [--ai <AI original.png> | --search <folder>] [--metals a.png b.png ...]
                       [--out <folder>] [--show <marks.jpg>] [--protect x0,y0,x1,y1 (fractions; repeatable)]
  Writes <out>/<same file name> for every photo that changed and prints one JSON line per photo
  (spot_px before, changed_px, outline_changed = 0). --protect boxes are outline (pearls, anything to keep).
Order: after gold-standard.cjs, bg-soft.cjs and frame-photo.cjs; then check-photo.cjs.
"""
import sys, os, json, re
import numpy as np, cv2

PAPER = np.array([251, 251, 253], np.int16)


def rd(p):
    a = cv2.imdecode(np.fromfile(p, np.uint8), cv2.IMREAD_COLOR)
    if a is None:
        raise SystemExit('cannot read ' + p)
    return a[:, :, ::-1].copy()


def wr(p, a, q=92):
    ext = os.path.splitext(p)[1].lower()
    ok, b = cv2.imencode(ext, np.ascontiguousarray(a[:, :, ::-1]),
                         [cv2.IMWRITE_JPEG_QUALITY, q] if ext == '.jpg' else [cv2.IMWRITE_PNG_COMPRESSION, 6])
    b.tofile(p)


def disk(r):
    return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))


def tint(a):
    a = a.astype(np.int16)
    return np.maximum(np.abs(a[..., 0] - a[..., 1]), np.abs(a[..., 2] - a[..., 1] - 2))


def seeds(a):
    a = a.astype(np.int16)
    return (a[..., 0] == a[..., 1]) & (a[..., 2] == a[..., 1] + 2)


def hsv(a):
    h = cv2.cvtColor(np.ascontiguousarray(a), cv2.COLOR_RGB2HSV_FULL).astype(np.float32)
    return h[..., 0] * 360 / 256, h[..., 1] / 255, h[..., 2]


def pale_light(ai, ref=None):
    """Warm light on the paper in the AI original (not metal). ref = (hue, saturation) of this AI's own gold
    (median over the metal): light must be clearly paler than the gold (saturation under 0.7 of it). Some AI golds are a
    pale champagne (cross 06: saturation 0.2), so a fixed limit would take their flat faces for light."""
    h, s, v = hsv(ai)
    a = ai.astype(np.int16)
    warm = a[..., 0] - a[..., 2] >= 2
    rh, rs = ref if ref is not None else (40.0, 0.6)
    smax = min(0.38, 0.7 * rs)
    low_hue = ((h < 32) | (h > 300)) & (s > 0.06) & (s < smax) & (v > 150)
    faint = (s <= 0.06) & warm & (v > 200)
    return low_hue | faint


def gold_ref(F, ai):
    """Median hue and saturation of the AI original where the finished photo is clearly gold."""
    hF, sF, vF = hsv(F)
    m = (sF > 0.35) & (hF > 20) & (hF < 60) & (vF > 120)
    h, s, v = hsv(ai)
    m &= v > 120
    if m.sum() < 500:
        return None
    return float(np.median(h[m])), float(np.median(s[m]))


def piece_mask(a):
    a = a.astype(np.int16)
    return ((a.max(2) - a.min(2)) > 30) | (a.mean(2) < 140)


def bbox(m):
    ys, xs = np.where(m)
    return xs.min(), ys.min(), xs.max() + 1, ys.max() + 1


def register(ai, F):
    """Affine warp of the AI original onto F's pixels; returns (warped, ecc correlation)."""
    H, W = F.shape[:2]
    bF = bbox(piece_mask(F)); bA = bbox(piece_mask(ai))
    s = ((bF[2] - bF[0]) / (bA[2] - bA[0]) + (bF[3] - bF[1]) / (bA[3] - bA[1])) / 2
    M = np.float32([[s, 0, bF[0] - s * bA[0]], [0, s, bF[1] - s * bA[1]]])
    k = 1024 / max(H, W)
    g = lambda x: cv2.cvtColor(np.ascontiguousarray(x), cv2.COLOR_RGB2GRAY).astype(np.float32)
    Fs = cv2.resize(g(F), (round(W * k), round(H * k)), interpolation=cv2.INTER_AREA)
    A0 = cv2.warpAffine(ai, M, (W, H), flags=cv2.INTER_LINEAR, borderValue=(251, 251, 253))
    As = cv2.resize(g(A0), (round(W * k), round(H * k)), interpolation=cv2.INTER_AREA)
    Wm = np.eye(2, 3, dtype=np.float32)
    cc = 0.0
    try:
        cc, Wm = cv2.findTransformECC(Fs, As, Wm, cv2.MOTION_AFFINE,
                                      (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 200, 1e-6), None, 5)
    except cv2.error:
        pass
    # compose: full-res refine = scale the small warp back up
    Wf = Wm.copy(); Wf[:, 2] /= k
    M3 = np.vstack([M, [0, 0, 1]]); W3 = np.vstack([Wf, [0, 0, 1]])
    T = (np.linalg.inv(W3) @ M3)[:2] if False else None
    # ECC finds Wm with As(Wm x) ~ Fs(x); apply: out(x) = A0(Wf x) = ai(M^-1 Wf x)
    Minv = cv2.invertAffineTransform(M)
    comb = (np.vstack([Minv, [0, 0, 1]]) @ W3)[:2]
    out = cv2.warpAffine(ai, comb, (W, H), flags=cv2.INTER_LINEAR | cv2.WARP_INVERSE_MAP, borderValue=(251, 251, 253))
    return out, float(cc)


def grad(a, sigma=1.0):
    f = cv2.GaussianBlur(a.astype(np.float32), (0, 0), sigma)
    G = np.zeros(a.shape[:2], np.float32)
    for c in range(3):
        gx = cv2.Sobel(f[..., c], cv2.CV_32F, 1, 0, ksize=3); gy = cv2.Sobel(f[..., c], cv2.CV_32F, 0, 1, ksize=3)
        G = np.maximum(G, np.sqrt(gx * gx + gy * gy))
    return G


def coloured_and_pearls(F, light):
    """Parts that are never background: red, green and blue stones, enamel and red cord (saturated, not a gold
    hue) with 6 px round them (their pale antialiased edge), and pearls: a large, compact, round area of pale
    warm 'light' (a glow on paper is thin or irregular), filled by its convex hull and grown by 3 px."""
    h, s, v = hsv(F)
    col = (s > 0.25) & ((h < 10) | (h > 330) | ((h > 70) & (h < 300)))
    keep = cv2.dilate(col.astype(np.uint8), disk(6)).astype(bool)
    core = cv2.erode(light.astype(np.uint8), disk(6))  # cut the thin links to the light round the piece
    n, lab, st, _ = cv2.connectedComponentsWithStats(core, connectivity=8)
    pearl = np.zeros(F.shape[:2], np.uint8)
    for i in range(1, n):
        x, y, w, hh, a = st[i]
        if a < 6000 or not (0.6 < w / hh < 1.65) or a < 0.5 * w * hh:
            continue
        ys, xs = np.where(lab[y:y + hh, x:x + w] == i)
        hull = cv2.convexHull(np.stack([xs + x, ys + y], 1).astype(np.int32))
        cv2.fillPoly(pearl, [hull], 1)
    keep |= cv2.dilate(pearl, disk(9)).astype(bool)
    return keep


def background_mask(F, ai=None, protect=None, gthr=60):
    """True = paper or shadow (may be changed). Everything else is the jewellery's outline."""
    sd = seeds(F)
    t = tint(F)
    h, s, v = hsv(F)
    stone_col = (s > 0.3) & ((h < 12) | (h > 70))  # red, green, blue stones and red cord in the photo
    ref = ai if ai is not None else F
    struct = grad(ref) > gthr  # every edge of the piece (metal, rhodium, stones); the AI's light on paper is soft
    r = ref.astype(np.int16)
    paper_ref = (r.mean(2) >= 236) & ((r.max(2) - r.min(2)) <= 12)
    if ai is not None:
        gr = gold_ref(F, ai)
        light = pale_light(ai, gr) & ~stone_col & (t >= 1)
        # a 3 px band round the AI's own metal (saturated like its gold, or dark) is always outline, so a pale
        # bright rim of the metal (cross 06's bail) never joins the light next to it
        ha, sa, va = hsv(ai)
        smax = min(0.38, 0.7 * (gr[1] if gr else 0.6))
        metal_ai = ((sa >= smax) & ((ha < 70) | (ha > 300))) | (va < 120)
        light &= ~cv2.dilate(metal_ai.astype(np.uint8), disk(3)).astype(bool)
    else:
        a = F.astype(np.int16)
        light = (t >= 2) & (t <= 20) & (a.mean(2) > 200) & ~stone_col
    keep = coloured_and_pearls(F, light & ~sd & ~struct)
    if protect is not None:
        keep |= protect
    cand = (sd | light) & ~struct & ~keep
    # close gaps up to 5 px in an edge: components are found on the eroded mask and grown back inside it,
    # so the paper never flows through a soft spot of an edge into a smooth metal face
    cand_full = cand
    cand = cv2.erode(cand.astype(np.uint8), disk(2)).astype(bool)
    n, lab, st, _ = cv2.connectedComponentsWithStats(cand.astype(np.uint8), connectivity=4)
    seedc = np.bincount(lab.ravel(), weights=sd.ravel().astype(np.float64), minlength=n)
    paperc = np.bincount(lab.ravel(), weights=(paper_ref | light).ravel().astype(np.float64), minlength=n)
    area = st[:, cv2.CC_STAT_AREA].astype(np.float64)
    H, W = F.shape[:2]
    x0, y0 = st[:, 0], st[:, 1]; x1, y1 = x0 + st[:, 2], y0 + st[:, 3]
    border = (x0 == 0) | (y0 == 0) | (x1 == W) | (y1 == H)
    # the paper round the piece (touches the border) or an opening: mostly paper-bright or pale light in the
    # reference
    # (a smooth reflection on rhodium is enclosed and mostly grey, so it stays part of the piece)
    ok = (seedc >= 300) & (border | (paperc >= 0.5 * area))
    ok[0] = False
    bg = cv2.dilate(ok[lab].astype(np.uint8), disk(2)).astype(bool) & cand_full
    outline = cv2.dilate((~bg).astype(np.uint8), disk(1)).astype(bool)
    return ~outline


def spots_of(a, bg, mina=40):
    s = (bg & (tint(a) >= 6)).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(s, connectivity=8)
    keep = st[:, cv2.CC_STAT_AREA] >= mina
    keep[0] = False
    return keep[lab]


def fix_own(a, bg, ai=None):
    """Neutral grey at the pixel's own brightness; with the AI original, the light the AI put on the paper takes
    the AI's own (smooth) brightness, scaled by bg-soft's gain measured on the paper round it, so a gold blob
    becomes the soft shadow the AI drew there instead of a flat patch with a hard edge."""
    x = a.astype(np.int16)
    t = tint(a)
    touch = bg & (t >= 2)
    L = x.mean(2) - 0.67
    if ai is not None:
        La = ai.astype(np.float32).mean(2)
        sd = seeds(a) & (La > 120)
        k = sd.astype(np.float32)
        ratio = np.where(sd, (L + 0.67) / np.maximum(La, 1), 0).astype(np.float32)
        num = cv2.GaussianBlur(ratio, (0, 0), 25); den = cv2.GaussianBlur(k, (0, 0), 25)
        num2 = cv2.GaussianBlur(ratio, (0, 0), 100); den2 = cv2.GaussianBlur(k, (0, 0), 100)
        G = np.where(den > 0.02, num / np.maximum(den, 1e-6), np.where(den2 > 1e-3, num2 / np.maximum(den2, 1e-6), 1.0))
        La2 = La * G - 0.67
        strong = touch & (t >= 6)
        # blend from own brightness (faint tint) to the AI's brightness (clear spot)
        w = np.clip((t.astype(np.float32) - 4) / 10, 0, 1)
        L = np.where(strong, (1 - w) * L + w * La2, L)
    # soften the steps where a fixed area meets the paper bg-soft left (its old hard edge round the blob):
    # normalised blur (sigma 4 px) over the background only, applied to the fixed pixels and the background
    # within 8 px of them; the outline is never read or written
    if touch.any():
        kb = bg.astype(np.float32)
        Lb = np.where(bg, L, 0).astype(np.float32)
        Ls = cv2.GaussianBlur(Lb, (0, 0), 4) / np.maximum(cv2.GaussianBlur(kb, (0, 0), 4), 1e-6)
        n, lab = cv2.connectedComponents(bg.astype(np.uint8), connectivity=4)
        hit = np.zeros(n, bool); hit[np.unique(lab[touch])] = True; hit[0] = False
        zone = hit[lab] & cv2.dilate(touch.astype(np.uint8), disk(8)).astype(bool)
        zone &= cv2.erode(bg.astype(np.uint8), disk(2)).astype(bool) | touch
        L = np.where(zone, Ls, L)
        touch = touch | (zone & (np.abs(Ls - (x.mean(2) - 0.67)) >= 0.75))
    g = np.clip(np.round(L), 0, 253).astype(np.int16)
    new = np.stack([g, g, g + 2], -1)
    new[L >= 250.5] = PAPER
    return blend(x, new, touch, bg)


def fix_like(a, bg, ref_fixed):
    ai = a.astype(np.int16); ri = ref_fixed.astype(np.int16)
    touch = bg & ((tint(a) >= 2) | (np.abs(ai - ri).max(2) > 3))
    return blend(ai, ri, touch, bg)


def blend(ai, new, touch, bg):
    near = cv2.dilate((~bg).astype(np.uint8), disk(1)).astype(bool) & touch
    val = np.where(near[..., None], (new + ai + 1) // 2, new)
    o = ai.copy()
    o[touch] = val[touch]
    return o.astype(np.uint8), touch


def marks(a, sp, bg):
    m = (a.astype(np.float32) * 0.85 + 38).astype(np.uint8)
    ol = ~bg
    edge = ol & ~cv2.erode(ol.astype(np.uint8), disk(1)).astype(bool)
    m[edge] = [0, 140, 255]
    m[sp] = [255, 0, 0]
    return m


AI_NAME = re.compile(r'\([0-9a-f]{8}|[0-9a-f]{8} |оригинал|higgsfield|суров|от AI', re.I)
OTHER_METAL = re.compile(r'розов|бяло|сребр|rose|white|silver', re.I)


def ai_rank(p):
    """Higher = more likely the untouched AI original: named like one (job id, 'оригинал', 'суров', 'Higgsfield')."""
    n = os.path.basename(p)
    return 2 if AI_NAME.search(n) else (1 if 'преди цветовете' in p or 'AI ориг' in p else 0)


def find_ai(F, folder):
    """Best AI original in folder (recursive): the piece lines up (IoU of the outline >= 0.8 at 256 px), not another
    metal's file, ranked by ai_rank and then by the amount of pale warm light (the least recoloured copy)."""
    best = None
    k = 256 / max(F.shape[:2])
    Ft = cv2.resize(F, None, fx=k, fy=k, interpolation=cv2.INTER_AREA)
    mF = piece_mask(Ft); bF = bbox(mF)
    for d, _, fs in os.walk(folder):
        for f in fs:
            p = os.path.join(d, f)
            if not f.lower().endswith('.png') or OTHER_METAL.search(p.replace(folder, '')):
                continue
            a = cv2.imdecode(np.fromfile(p, np.uint8), cv2.IMREAD_REDUCED_COLOR_4)
            if a is None:
                continue
            a = a[:, :, ::-1]
            kk = 256 / max(a.shape[:2])
            t = cv2.resize(a, None, fx=kk, fy=kk, interpolation=cv2.INTER_AREA)
            m = piece_mask(t)
            if m.sum() < 20:
                continue
            bA = bbox(m)
            sx = (bF[2] - bF[0]) / (bA[2] - bA[0]); sy = (bF[3] - bF[1]) / (bA[3] - bA[1])
            if abs(sx / sy - 1) > 0.06:
                continue
            s = (sx + sy) / 2
            M = np.float32([[s, 0, bF[0] - s * bA[0]], [0, s, bF[1] - s * bA[1]]])
            w = cv2.warpAffine(m.astype(np.uint8), M, mF.shape[::-1], flags=cv2.INTER_NEAREST).astype(bool)
            iou = (w & mF).sum() / max(1, (w | mF).sum())
            if iou < 0.8:
                continue
            tw = cv2.warpAffine(np.ascontiguousarray(t), M, mF.shape[::-1], borderValue=(251, 251, 253))
            score = (ai_rank(p), int((pale_light(tw) & mF).sum()))
            if best is None or score > best[0]:
                best = (score, p)
    return best[1] if best else None


def parse(av):
    o = {'metals': [], 'protect': []}
    pos = []
    i = 0
    while i < len(av):
        x = av[i]
        if x == '--metals':
            i += 1
            while i < len(av) and not av[i].startswith('--'):
                o['metals'].append(av[i]); i += 1
            continue
        if x == '--protect':
            o['protect'].append([float(v) for v in av[i + 1].split(',')]); i += 2; continue
        if x.startswith('--'):
            o[x[2:]] = av[i + 1]; i += 2; continue
        pos.append(x); i += 1
    return pos, o


def run(yellow, ai_path=None, search=None, metals=(), out=None, show=None, protect=()):
    F = rd(yellow)
    H, W = F.shape[:2]
    pm = None
    if protect:
        pm = np.zeros((H, W), bool)
        for x0, y0, x1, y1 in protect:
            pm[int(y0 * H):int(y1 * H), int(x0 * W):int(x1 * W)] = True
    if ai_path is None and search:
        ai_path = find_ai(F, search)
    ai = None; cc = None
    if ai_path and ai_path != 'none':
        ai, cc = register(rd(ai_path), F)
        if cc < 0.9:
            ai = None
    bg = background_mask(F, ai, pm)
    res = []
    sp = spots_of(F, bg)
    Ff, touch = fix_own(F, bg, ai)
    ch_in = int((np.abs(Ff.astype(np.int16) - F.astype(np.int16)).max(2) > 0)[~bg].sum())
    if ch_in:
        raise SystemExit('outline changed in ' + yellow)
    res.append({'file': yellow, 'spot_px': int(sp.sum()), 'changed_px': int(touch.sum()), 'outline_changed': ch_in,
                'ai': ai_path if ai is not None else None, 'ecc': cc})
    outs = [(yellow, F, Ff, sp)]
    sF = seeds(F)
    for mp in metals:
        A = rd(mp)
        if A.shape != F.shape:
            res.append({'file': mp, 'error': 'size differs from yellow'}); continue
        # lined up: on the yellow's paper the other photo is the same within 3 levels almost everywhere
        iou = float((np.abs(A.astype(np.int16) - F.astype(np.int16)).max(2) <= 3)[sF].mean())
        if iou < 0.97:
            res.append({'file': mp, 'error': 'paper does not line up with yellow (%.3f)' % iou}); continue
        spA = spots_of(A, bg)
        # blotches: background pixels differing from the fixed yellow by more than 3
        blot = bg & (np.abs(A.astype(np.int16) - Ff.astype(np.int16)).max(2) > 3)
        Af, tA = fix_like(A, bg, Ff)
        ch = int((np.abs(Af.astype(np.int16) - A.astype(np.int16)).max(2) > 0)[~bg].sum())
        if ch:
            raise SystemExit('outline changed in ' + mp)
        res.append({'file': mp, 'spot_px': int(spA.sum()), 'blotch_px': int(blot.sum()), 'changed_px': int(tA.sum()),
                    'outline_changed': ch, 'paper_match': iou})
        outs.append((mp, A, Af, spA | blot))
    if out:
        os.makedirs(out, exist_ok=True)
        for p, a, af, _ in outs:
            if (af != a).any():
                wr(os.path.join(out, os.path.basename(p)), af)
    if show:
        wr(show, marks(F, sp, bg))
    return res, bg, outs


if __name__ == '__main__':
    pos, o = parse(sys.argv[1:])
    res, _, _ = run(pos[0], o.get('ai'), o.get('search'), o['metals'], o.get('out'), o.get('show'), o['protect'])
    for r in res:
        print(json.dumps(r, ensure_ascii=False))
