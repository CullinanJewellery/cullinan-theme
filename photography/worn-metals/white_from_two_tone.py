"""White version of a two-tone worn photo, from the ORIGINAL photo. The gold parts are found as areas (b* > 16 inside
the jewellery outline, closed so their highlights join them); inside them L is remapped to the tone scale of the
piece's own white parts (b* < 8) and a*/b* set to that white. Skin, stones and white parts keep their pixels."""
import sys, numpy as np, cv2
src, mpath, out = sys.argv[1:4]; ks = int(sys.argv[4]) if len(sys.argv) > 4 else 11
a = cv2.imread(src); m = np.load(mpath)
la = cv2.cvtColor(a, cv2.COLOR_BGR2LAB).astype(np.float32)
bs = la[..., 2] - 128
inner = cv2.erode((m > 0.95).astype(np.uint8), np.ones((3, 3), np.uint8))
gold = ((bs > 16) & (inner > 0)).astype(np.uint8)
gold = cv2.morphologyEx(gold, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (ks, ks))) & inner
wh = (inner > 0) & (bs < 8) & (gold == 0)
g = gold > 0
q = np.linspace(0, 100, 201)
L = np.interp(la[..., 0], np.percentile(la[..., 0][g], q), np.percentile(la[..., 0][wh], q))
A = np.full_like(L, np.median(la[..., 1][wh])); B = np.full_like(L, np.median(la[..., 2][wh]))
new = cv2.cvtColor(np.clip(np.dstack([L, A, B]), 0, 255).astype(np.uint8), cv2.COLOR_LAB2BGR).astype(np.float32)
wt = cv2.GaussianBlur(gold.astype(np.float32), (0, 0), 0.8)[..., None]
res = a.astype(np.float32) * (1 - wt) + new * wt
cv2.imwrite(out, np.clip(res, 0, 255).astype(np.uint8))
r = res.astype(np.uint8); print(out, 'ex-gold', r[g].mean(0)[::-1].round(), 'white', a[wh].mean(0)[::-1].round())
