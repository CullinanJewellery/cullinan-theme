"""Worn photo -> white / rose: metal-swap.cjs on the whole photo, kept only inside the jewellery outline
(BiRefNet on tiles round the piece and chain). Everything outside the outline keeps its exact pixels."""
import sys, os, subprocess, json
S = os.environ.get("SCRATCH", ".") + "/"  # folder holding pylib2 (rembg + BiRefNet), pylib and tools/node_modules
sys.path.insert(0, S + 'pylib2'); sys.path.insert(1, S + 'pylib')
import numpy as np, cv2
from rembg import new_session, remove
from PIL import Image
PH = r'C:\Users\Nitro V\Documents\cullinan-theme\photography'
env = dict(os.environ, NODE_PATH=S + 'tools/node_modules')
sess = new_session('birefnet-general')

def outline(img, tiles):
    H, W = img.shape[:2]; m = np.zeros((H, W), np.float32)
    for (x0, y0, x1, y1) in tiles:
        x0, y0, x1, y1 = max(0, x0), max(0, y0), min(W, x1), min(H, y1)
        crop = Image.fromarray(cv2.cvtColor(img[y0:y1, x0:x1], cv2.COLOR_BGR2RGB))
        k = np.array(remove(crop, session=sess, only_mask=True)).astype(np.float32) / 255
        if (k > 0.5).mean() > 0.4: continue  # tile read as one solid foreground (skin) - not jewellery
        m[y0:y1, x0:x1] = np.maximum(m[y0:y1, x0:x1], k)
    return m

def grid(x0, y0, x1, y1, size=1024, step=768):
    out = []
    for y in range(y0, max(y0 + 1, y1 - size + step), step):
        for x in range(x0, max(x0 + 1, x1 - size + step), step):
            out.append((x, y, x + size, y + size))
    return out

def run(src, name, tiles, outdir):
    img = cv2.imread(src)
    m = outline(img, tiles)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    # drop outline pixels far from any coloured metal (shirt edges, nails) - keep near saturated gold
    gold = ((hsv[..., 1] > 70) & (img[..., 2].astype(int) - img[..., 0] > 35)).astype(np.uint8)
    near = cv2.dilate(gold, np.ones((25, 25), np.uint8)).astype(np.float32)
    m = m * near
    b = (m > 0.4).astype(np.uint8)
    n, lab, st, _ = cv2.connectedComponentsWithStats(b, 8)
    if n > 1:
        big = st[1:, cv2.CC_STAT_AREA].max()
        keep = [i for i in range(1, n) if st[i, cv2.CC_STAT_AREA] >= 0.05 * big]
        b = np.isin(lab, keep).astype(np.uint8)
    m = b.astype(np.float32)
    m = cv2.GaussianBlur(cv2.dilate((m > 0.4).astype(np.uint8), np.ones((5, 5), np.uint8)).astype(np.float32), (0, 0), 1.5)
    np.save(os.path.join(outdir, name + '-mask.npy'), m)
    cv2.imwrite(os.path.join(outdir, name + '-mask.jpg'), cv2.resize((m * 255).astype(np.uint8), (1024, 1024)))
    res = {}
    for kind in ('white', 'rose'):
        t = os.path.join(outdir, f'{name}-{kind}-full.png')
        subprocess.run(['node', os.path.join(PH, 'metal-swap.cjs'), kind, src, t], env=env, check=True, capture_output=True)
        sw = cv2.imread(t).astype(np.float32)
        out = img.astype(np.float32) * (1 - m[..., None]) + sw * m[..., None]
        o = os.path.join(outdir, f'{name}-{kind}.png'); cv2.imwrite(o, np.clip(out, 0, 255).astype(np.uint8)); res[kind] = o
        os.remove(t)
    return res

if __name__ == '__main__':
    cfg = json.load(open(sys.argv[1], encoding='utf-8'))
    od = cfg['out']; os.makedirs(od, exist_ok=True)
    for it in cfg['items']:
        tiles = [tuple(t) for t in it.get('tiles', [])] + [tuple(t) for g in it.get('grids', []) for t in grid(*g)]
        print(it['name'], len(tiles), 'tiles', run(it['src'], it['name'], tiles, od), flush=True)
