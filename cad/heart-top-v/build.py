"""Pair of wedding bands, soft V in the top edge only, three-stone heart below it, 14K yellow gold (2026-11-08).

Specification (mm):
- Hers: size 54, 5.0 wide. His: size 62, 5.8 wide. 1.6 thick at the centre, low domed top, comfort-fit inside.
- Bottom edge straight. Top edge dips in a soft V (0.5 / 0.55 deep) that stops above the heart: a polished strip stays between.
- Three round stones, 1.5 (hers) / 1.75 (his); six beads; open back under each stone.
- The band is generated directly as a fine grid (no flat patches). True size: no shrinkage allowance yet. STL only.
"""
import math, sys
from pathlib import Path
import numpy as np, cadquery as cq, trimesh, manifold3d as mf
sys.path.insert(0, str(Path(__file__).parent.parent))
import meshtools as mt
OUT = Path(__file__).parent / "out"; OUT.mkdir(exist_ok=True)
DENSITY_14K = 13.1
V = cq.Vector
THETAS = 1440

def tang(px, pz, cx, cz, R, side):
    dx, dz = cx - px, cz - pz; D = math.hypot(dx, dz); a = math.atan2(dz, dx); b = math.asin(R / D)
    L = math.sqrt(D * D - R * R); t = a + side * b
    return (px + L * math.cos(t), pz + L * math.sin(t))

def profile(r, top, W, sag=0.25, inner_sag=0.22, corner=0.18):
    """Closed cross-section (radius, z), z from -W/2 to W/2, rounded corners."""
    def arc(h_edge, h_mid, n):
        z = np.linspace(-W / 2, W / 2, n); return h_edge + (h_mid - h_edge) * (1 - (z / (W / 2)) ** 2), z
    ri, zi = arc(r + inner_sag, r, 130)
    ro, zo = arc(top - sag, top, 170)
    A, B = np.array([r + inner_sag, -W / 2]), np.array([r + inner_sag, W / 2])
    C, D = np.array([top - sag, W / 2]), np.array([top - sag, -W / 2])
    keep_i = (zi > -W / 2 + corner) & (zi < W / 2 - corner); keep_o = (zo > -W / 2 + corner) & (zo < W / 2 - corner)
    inner = np.c_[ri[keep_i], zi[keep_i]]; outer = np.c_[ro[keep_o], zo[keep_o]][::-1]
    def bez(a, c, b, n=18):
        t = np.linspace(0, 1, n)[:, None]; return (1 - t) ** 2 * a + 2 * t * (1 - t) * c + t * t * b
    side_up = np.linspace(B + [corner, 0], C - [corner, 0], 14); side_dn = np.linspace(D - [corner, 0], A + [corner, 0], 14)
    pts = [inner, bez(inner[-1], B, side_up[0])[1:-1], side_up, bez(side_up[-1], C, outer[0])[1:-1], outer,
           bez(outer[-1], D, side_dn[0])[1:-1], side_dn, bez(side_dn[-1], A, inner[0])[1:-1]]
    return np.vstack(pts)

def make(name, size, W, stone, d, t=1.6):
    u = stone / 1.5
    r = size / (2 * math.pi); top = r + t
    # band grid
    P = profile(r, top, W); nj = len(P)
    th = np.linspace(-math.pi, math.pi, THETAS, endpoint=False)
    rho, A = 0.04, 0.26
    s_ = (np.sqrt(th * th + rho * rho) - rho) / A
    s0, v0 = 0.6, 0.4
    f = np.where(s_ < s0, 1 - s_, np.where(s_ < s0 + 2 * v0, v0 * (1 - (s_ - s0) / (2 * v0)) ** 2, 0))
    verts = np.zeros((THETAS * nj, 3))
    for i, a in enumerate(th):
        zt = W / 2 - d * f[i]
        z = -W / 2 + (P[:, 1] + W / 2) / W * (zt + W / 2)
        verts[i * nj:(i + 1) * nj] = np.c_[P[:, 0] * np.sin(a), P[:, 0] * np.cos(a), z]
    tris = []
    i_ = np.arange(THETAS)[:, None]; j_ = np.arange(nj)[None, :]
    a = (i_ * nj + j_).ravel(); b = (((i_ + 1) % THETAS) * nj + j_).ravel()
    c = (((i_ + 1) % THETAS) * nj + (j_ + 1) % nj).ravel(); e = (i_ * nj + (j_ + 1) % nj).ravel()
    F = np.vstack([np.c_[a, b, c], np.c_[a, c, e]])
    t0 = trimesh.Trimesh(verts, F, process=False)
    if t0.volume < 0: F = F[:, ::-1]
    M = mf.Manifold(mf.Mesh(verts.astype(np.float32), F.astype(np.uint32)))
    assert M.status() == mf.Error.NoError, M.status()
    # heart layout (x, z about the band's centre at the front)
    sp, c_, R = 1.7 * u, 0.85 * u, 1.05 * u
    dzb = math.sqrt(sp * sp - c_ * c_); drop = dzb + 1.12 * u; h = R + drop
    zL = h / 2 - R; zB = zL - dzb; zP = zL - drop
    zs = -d / 2
    floor = top - 0.34
    tr = tang(0, zP, c_, zL, R, -1); tl = (-tr[0], tr[1])
    cusp = zL + math.sqrt(R * R - c_ * c_)
    a0 = math.atan2(tr[1] - zL, tr[0] - c_); a1 = math.atan2(cusp - zL, -c_)
    if a1 < a0: a1 += 2 * math.pi
    am = (a0 + a1) / 2; mr = (c_ + R * math.cos(am), zL + R * math.sin(am)); ml = (-mr[0], mr[1])
    recess = (cq.Workplane('XZ', origin=(0, floor, 0)).moveTo(0, zP).lineTo(*tr).threePointArc(mr, (0, cusp))
              .threePointArc(ml, tl).close().extrude(-3).val())
    centres = [(c_, zL), (-c_, zL), (0, zB)]
    Rs = stone / 2 + 0.02; pav = stone * 0.43; girdle = floor + 0.02
    rh = 0.35 * stone; db = (Rs - rh) * math.tan(math.radians(41)); rb = (sp - 0.45) / 2
    seats = [(cq.Workplane("XY").polyline([(0, r - 2), (rb, r - 2), (rb, r + 0.1), (rh, r + 0.7), (rh, girdle - db), (Rs, girdle), (Rs, girdle + 1), (0, girdle + 1)]).close()
              .revolve(360, (0, 0, 0), (0, 1, 0)).translate((x, 0, z))).val() for x, z in centres]
    br = 0.28 * u; by = floor + 0.12 * u
    midz = (zL + zB) / 2; out = 0.424 * u
    around = lambda cx, deg, dd=0.80 * u: (cx + dd * math.cos(math.radians(deg)), zL + dd * math.sin(math.radians(deg)))
    pts = [(0, (2 * zL + zB) / 3), (c_ / 2 + out * 0.866, midz - out * 0.5), (-c_ / 2 - out * 0.866, midz - out * 0.5),
           around(c_, 55), around(-c_, 125), (0, zB - 0.82 * u)]
    beads = [cq.Solid.makeSphere(br, V(x + 0.0013, by, z + 0.0017), V(0.31, 0.83, 0.47), -90, 90, 360) for x, z in pts]
    sh = V(0, 0, zs); q = dict(tol=0.001, ang=0.03)
    M = M - mt.to_manifold(recess.translate(sh), **q)
    for x in seats: M = M - mt.to_manifold(x.translate(sh), **q)
    for x in beads: M = M + mt.to_manifold(x.translate(sh), **q)
    m = mt.to_trimesh(M); m.fix_normals(); m.export(OUT / f"{name}.stl")
    m = trimesh.load(OUT / f"{name}.stl")
    mt.mirror_check(m, name)
    def rp(rad, y, n, off=0): return [(rad * math.cos(2 * math.pi * (i + off) / n), y, rad * math.sin(2 * math.pi * (i + off) / n)) for i in range(n)]
    s, cr = stone / 2, stone * 0.16
    hull = trimesh.convex.convex_hull(np.array(rp(s * .55, cr, 8) + rp(s * .8, cr * .55, 8, .5) + rp(s, .03, 16, .25) + rp(s, 0, 16, .25) + rp(s * .55, -pav * .52, 8) + [(0, -pav, 0)]))
    st = []
    for x, z in centres:
        g = hull.copy(); g.apply_translation((x, girdle, z + zs)); st.append(g)
    trimesh.util.concatenate(st).export(OUT / f"{name}-stones.stl")
    print(f"{name}: watertight {m.is_watertight} bodies {m.body_count} faces {len(m.faces)} volume {m.volume:.1f} weight {m.volume/1000*DENSITY_14K:.2f} g bbox {np.round(m.bounds[1]-m.bounds[0],2)} "
          f"heart {2*(c_+R):.2f} x {h:.2f}; strip V to heart {(W-d-h)/2:.2f}; beads {2*br:.2f}; web between seats {sp-2*Rs:.2f}; opening {2*rb:.2f}; hole {2*rh:.2f}; culet to finger {girdle-pav-r:.2f}")
    assert m.is_watertight and m.body_count == 1

make("hers-54", 54, 5.0, 1.5, 0.5)
make("his-62", 62, 5.8, 1.75, 0.55)
