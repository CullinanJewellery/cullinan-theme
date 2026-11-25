# Spot fix v3: jewellery outline = what every metal's own pre-gold-F photo agrees is jewellery (BiRefNet cutout).
# Only spots are changed (colour the gold F step put on pale paper; tinted paper away from the metal);
# every other pixel keeps its bytes. Writes to out3/, never to the photo folders.
import sys, os, json, re, time, hashlib
sys.path.insert(0, '.')
from comp import rd, wr, matte
import numpy as np, cv2

def disk(r): return cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2 * r + 1, 2 * r + 1))
def lum(a): a = a.astype(np.float32); return 0.299 * a[..., 0] + 0.587 * a[..., 1] + 0.114 * a[..., 2]
def chroma(a): return a.max(2).astype(np.int16) - a.min(2)
def tint(a):
    a = a.astype(np.int16); return np.maximum(np.abs(a[..., 0] - a[..., 1]), np.abs(a[..., 2] - a[..., 1] - 2))

rows = json.load(open('inv.json', encoding='utf-8'))
shots = {}
for r in rows:
    key = r['piece'] + '|' + re.sub(r' - (жълто злато|розово злато|бяло злато|сребро)\.png$', '', r['name'])
    shots.setdefault(key, []).append(r)
ONLY = set(int(x) for x in sys.argv[1].split(',')) if len(sys.argv) > 1 and sys.argv[1] != 'all' else None
SIG = float(os.environ.get('SIG', '10')); OUT = 'out3'; os.makedirs(OUT, exist_ok=True); os.makedirs('mcache', exist_ok=True)
LOGF = 'v3_log.json' if ONLY is None else 'v3_test_log.json'
log = []

for i, (k, rs) in enumerate(sorted(shots.items())):
    if ONLY is not None and i not in ONLY: continue
    t0 = time.time()
    rp = [r for r in rs if r['pre']]
    if not rp: log.append({'shot': k, 'i': i, 'skip': 'no pre'}); continue
    pres = [rd(r['pre']) for r in rp]
    if any(p.shape != pres[0].shape for p in pres): log.append({'shot': k, 'i': i, 'skip': 'pre shapes'}); continue
    mats = []
    for r, p in zip(rp, pres):
        h = hashlib.md5(p.tobytes()).hexdigest()[:16]; f = f'mcache/{h}.npy'
        if os.path.exists(f): m = np.load(f).astype(np.float32) / 255
        else: m = matte(p); np.save(f, (m * 255).astype(np.uint8))
        mats.append(m)
    A = np.min(np.stack(mats), 0)
    chs = np.stack([chroma(p) for p in pres]); amin = np.argmin(chs, 0); ch = np.min(chs, 0)
    Ls = np.stack([lum(p) for p in pres]); Lp = np.take_along_axis(Ls, amin[None], 0)[0]
    ref = next((r for r in rs if r['metal'] == 'жълто злато'), rs[0]); curY = rd(ref['file'])
    if curY.shape != pres[0].shape: log.append({'shot': k, 'i': i, 'skip': 'shape'}); continue
    # coloured pixels connected to the jewellery core stay jewellery (thin wires, stones, cord)
    core = (A > 0.5).astype(np.uint8)
    prot = np.clip((ch - 25) / 15, 0, 1).astype(np.float32)
    n, lab = cv2.connectedComponents(((prot > 0) | (core > 0)).astype(np.uint8), connectivity=8)
    ok = np.zeros(n, bool); ok[np.unique(lab[core > 0])] = True; ok[0] = False
    A = np.maximum(A, prot * ok[lab])
    # gaps inside the outline with no clean paper are metal (reflections the cutout read as paper)
    seedY = (curY[..., 0] == curY[..., 1]) & (curY[..., 2].astype(int) == curY[..., 1].astype(int) + 2)
    holes = (A < 0.5).astype(np.uint8); n, lab, st, _ = cv2.connectedComponentsWithStats(holes, connectivity=4)
    cnt = np.bincount(lab.ravel(), weights=seedY.ravel().astype(np.float64), minlength=n)
    fill = (cnt < np.maximum(15, 0.03 * st[:, cv2.CC_STAT_AREA])) & (st[:, cv2.CC_STAT_AREA] < 20000); fill[0] = False
    A[fill[lab]] = 1.0
    chc = chroma(curY)
    cl = cv2.morphologyEx((A > 0.5).astype(np.uint8), cv2.MORPH_CLOSE, disk(12)) > 0
    A[cl & (A <= 0.5) & ~seedY & ~((chc - ch) > 20)] = 1.0
    core = (A > 0.5).astype(np.uint8)
    dcore = cv2.distanceTransform(1 - core, cv2.DIST_L2, 3)
    # clean background: the current shadow, with the luminance of the cleanest earlier photo where a blob is
    Lc = lum(curY); tc = tint(curY)
    blob = ((tc >= 4) & (np.abs(Lc - Lp) >= 3)).astype(np.uint8); blob = cv2.dilate(blob, disk(1))
    use = 1 - cv2.GaussianBlur(blob.astype(np.float32), (0, 0), 1.5)
    L = Lc * use + Lp * (1 - use)
    g = np.clip(L - 0.23, 0, 253); bg = np.stack([g, g, g + 2], -1); bg[L >= 250.5] = [251, 251, 253]
    for r in rs:
        cur = rd(r['file'])
        if cur.shape != curY.shape: log.append({'shot': k, 'i': i, 'file': r['file'], 'skip': 'shape'}); continue
        ct = tint(cur); cc = chroma(cur)
        fb = ((cc - ch) > 25) & (A < 0.3)                        # gold F turned pale paper into metal colour
        tp = (ct >= 4) & (A < 0.05) & (dcore >= 3) & (ch < 20)   # tinted paper away from the metal
        sp = ((fb | tp) & (dcore >= 4)).astype(np.uint8)          # light hugging the metal's edge stays
        n, lab, st, _ = cv2.connectedComponentsWithStats(sp, connectivity=8)
        okc = st[:, cv2.CC_STAT_AREA] >= 30; okc[0] = False; sp = okc[lab].astype(np.uint8)
        grow = ((fb | tp) & (dcore >= 1.5)).astype(np.uint8)
        for _ in range(6): sp = cv2.dilate(sp, disk(1)) & grow
        sp = cv2.dilate(sp, disk(2))
        # the paper under a spot is rebuilt from the surrounding paper of the same photo (shadow continues)
        Lm = lum(cur); hole = cv2.dilate(sp, disk(3))
        Li = cv2.inpaint(np.clip(Lm * 255 / 256, 0, 255).astype(np.uint8), hole, 8, cv2.INPAINT_TELEA).astype(np.float32) * 256 / 255
        Li = np.where(hole > 0, cv2.GaussianBlur(Li, (0, 0), 2.0), Lm)
        # away from the metal the shadow becomes a clean soft gradient (no blotches); near it nothing changes
        wg = ((A < 0.05) & (dcore >= 2)).astype(np.float32)
        num = cv2.GaussianBlur(Li * wg, (0, 0), SIG); den = cv2.GaussianBlur(wg, (0, 0), SIG)
        Ls = np.where(den > 0.05, num / np.maximum(den, 1e-6), Li)
        b2 = np.clip((dcore - 2) / 4, 0, 1) * (1 - A)
        Lf = Li * (1 - b2) + Ls * b2
        gg = np.clip(Lf - 0.23, 0, 253); bg = np.stack([gg, gg, gg + 2], -1); bg[Lf >= 250.5] = [251, 251, 253]
        w = cv2.GaussianBlur(sp.astype(np.float32), (0, 0), 2.0) * (1 - A)
        w = np.maximum(np.clip(w * 1.5, 0, 1), b2)[..., None]
        out = np.clip(np.round(cur.astype(np.float32) * (1 - w) + bg * w), 0, 255).astype(np.uint8)
        full = A >= 0.999; out[full] = cur[full]
        o = f'{OUT}/{i:03d}_{r["metal"]}_{os.path.basename(r["file"])}'; wr(o, out)
        d = np.abs(out.astype(int) - cur.astype(int)).max(2)
        log.append({'shot': k, 'i': i, 'file': r['file'], 'out': o, 'changed': int((d > 2).sum()),
                    'big': int((d > 25).sum()), 'jewel_changed': int((d[A >= 0.999] > 0).sum())})
    np.save(f'{OUT}/{i:03d}_A.npy', (A * 255).astype(np.uint8))
    print(i, len(shots), round(time.time() - t0, 1), flush=True)
    json.dump(log, open(LOGF, 'w', encoding='utf-8'), ensure_ascii=False, indent=0)
print('done', flush=True)
