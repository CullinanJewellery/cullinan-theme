"""Bands folded into a chevron heart at the top edge, from the owner's own AI image, 14K yellow gold (2026-11-08).

Specification (mm, FINISHED ring; the print file is scaled up by SHRINK; rules in ../JEWELLERY-CAD-BASICS.md):
- Hers: size 54, 4.0 wide, five 0.8 stones. His: size 62, 5.0 wide, five 0.93 stones. 1.6 thick, nearly flat outside.
- The top edge drops in a sharp V; a V-shaped pocket follows it, with a polished rim between. Bottom edge straight.
- Two flat facets meet in a crease on the centre line, so the band looks folded; the crease runs from the point to the bottom edge.
- 9 shared prongs, the one at the crease oval. Straight holes, countersunk from the inside. Open channel inside the band away from the heart.
"""
import math, sys
from pathlib import Path
import numpy as np, cadquery as cq, trimesh, manifold3d as mf
sys.path.insert(0, str(Path(__file__).parent.parent))
import meshtools as mt
OUT = Path(__file__).parent / "out"; OUT.mkdir(exist_ok=True)
DENSITY_14K = 13.1
SHRINK = 0.06     # estimate for print -> cast master -> rubber -> wax -> final casting; replace with the atelier's measured value
V = cq.Vector
THETAS = 1440
WALL, RAIL, EDGE = 1.0, 0.8, 0.4
T1, T2, RAMP = 0.48, math.pi - 0.32, 0.22
SAG = 0.12
TF = 0.14          # half the angle of the fold, radians
ALPHA = math.radians(42)

def S(x):
    x = np.clip(x, 0, 1); return x * x * (3 - 2 * x)

def profile(r, top, W, inner_sag=0.22, corner=0.18, flat=0.0):
    z = np.linspace(-W / 2, W / 2, 130); ri = r + inner_sag * (np.maximum(np.abs(z) - flat, 0) / (W / 2 - flat)) ** 2
    zo = np.linspace(-W / 2, W / 2, 170); ro = top - SAG * (zo / (W / 2)) ** 2
    A, B = np.array([r + inner_sag, -W / 2]), np.array([r + inner_sag, W / 2])
    C, D = np.array([top - SAG, W / 2]), np.array([top - SAG, -W / 2])
    ki = (z > -W / 2 + corner) & (z < W / 2 - corner); ko = (zo > -W / 2 + corner) & (zo < W / 2 - corner)
    inner = np.c_[ri[ki], z[ki]]; outer = np.c_[ro[ko], zo[ko]][::-1]
    def bez(a, c, b, n=18):
        t = np.linspace(0, 1, n)[:, None]; return (1 - t) ** 2 * a + 2 * t * (1 - t) * c + t * t * b
    up = np.linspace(B + [corner, 0], C - [corner, 0], 14); dn = np.linspace(D - [corner, 0], A + [corner, 0], 14)
    return np.vstack([inner, bez(inner[-1], B, up[0])[1:-1], up, bez(up[-1], C, outer[0])[1:-1], outer,
                      bez(outer[-1], D, dn[0])[1:-1], dn, bez(dn[-1], A, inner[0])[1:-1]]), len(inner)

def polywire(pts, y):
    p = [V(x, y, z) for x, z in pts]
    return cq.Wire.makePolygon(p + [p[0]])

def make(name, size, W, stone, t=1.6):
    u = stone / 0.8
    r = size / (2 * math.pi); top = r + t
    Zc = W / 2 - RAIL
    P, ni = profile(r, top, W, flat=Zc); nj = len(P)
    zin = P[:ni, 1]; hollow = (top - SAG * (zin / (W / 2)) ** 2 - WALL - P[:ni, 0]) * S((Zc - np.abs(zin)) / EDGE)
    th = np.linspace(-math.pi, math.pi, THETAS, endpoint=False)
    verts = np.zeros((THETAS * nj, 3))
    for i, a in enumerate(th):
        ab = abs(a)
        delta = (top * math.cos(TF) / math.cos(ab - TF) - top) * float(S((2 * TF - ab) / 0.06)) if ab < 2 * TF else 0.0
        k = float(S((ab - T1) / RAMP) * S((T2 - ab) / RAMP))
        rad = P[:, 0] + delta * (P[:, 0] - r) / t
        rad[:ni] += k * hollow
        verts[i * nj:(i + 1) * nj] = np.c_[rad * np.sin(a), rad * np.cos(a), P[:, 1]]
    i_ = np.arange(THETAS)[:, None]; j_ = np.arange(nj)[None, :]
    a = (i_ * nj + j_).ravel(); b = (((i_ + 1) % THETAS) * nj + j_).ravel()
    c = (((i_ + 1) % THETAS) * nj + (j_ + 1) % nj).ravel(); e = (i_ * nj + (j_ + 1) % nj).ravel()
    F = np.vstack([np.c_[a, b, c], np.c_[a, c, e]])
    if trimesh.Trimesh(verts, F, process=False).volume < 0: F = F[:, ::-1]
    M = mf.Manifold(mf.Mesh(verts.astype(np.float32), F.astype(np.uint32))); assert M.status() == mf.Error.NoError
    # layout on the two facets; x is the distance from the crease
    ca, sa, ta = math.cos(ALPHA), math.sin(ALPHA), math.tan(ALPHA)
    gap = 0.173 * u; p = stone + gap; pd = 0.48 * u; pr = pd / 2; lap = 0.05 * u; dist = stone / 2 + pr - lap; kk = math.sqrt(dist * dist - p * p / 4)
    hw = kk + pr - 0.07 * u; rim = 0.45 * u; top_margin = 0.35; capc = 2 * p + 0.05 * u
    zc = W / 2 - top_margin - hw - capc * sa
    OB0, IB0 = zc - hw / ca, zc + hw / ca; zt = IB0 + rim / ca
    hf = top * math.cos(TF); L = 2 * top * math.sin(TF); drop = top - hf
    depth = 0.26 * u; floor = top - depth; girdle = floor + 0.08 * u
    def on_facet(s_, x, z, side):
        if side == 0: return s_.translate((x, 0, z))
        return s_.translate(((x - L / 2) * side, -drop, z)).rotate((0, 0, 0), (0, 0, 1), -side * math.degrees(TF))
    bev = 0.5; g = bev * 0.18      # small lean: the prongs stay grown into the wall all the way to their tips
    Q = (capc * ca, zc + capc * sa); n = (sa, -ca); d_ = (ca, sa)
    def chevron(grow, y):
        R_ = hw + grow; s0 = grow / ca; steps = 24; a0 = math.atan2(n[1], n[0])
        arc = [(Q[0] + R_ * math.cos(a0 + math.pi * i / steps), Q[1] + R_ * math.sin(a0 + math.pi * i / steps)) for i in range(steps + 1)]
        return polywire([(0.0, OB0 - s0)] + arc + [(0.0, IB0 + s0)] + [(-x, z) for x, z in arc[::-1]], y)
    yref = floor - 0.05 * u
    pocket = mt.to_manifold(cq.Solid.makeLoft([chevron(-0.3 * g / bev * 1.0, yref - 0.3), chevron(g, yref + bev)], True), tol=0.001, ang=0.03)
    # one outline, its floor the two facets: exact same walls, so the halves join without slivers
    sf, cf = math.sin(TF), math.cos(TF); fl = hf - depth
    pocket = pocket.trim_by_plane((sf, cf, 0.0), fl) + pocket.trim_by_plane((-sf, cf, 0.0), fl)
    # V cut in the top edge: bevel outside, softened inside
    def vcut(grow, y):
        s0 = grow / ca; zt_ = zt - s0; Z = W / 2 + 1.5; X = (Z - zt_) / ta
        return polywire([(0.0, zt_), (X, Z), (-X, Z)], y)
    notch = cq.Solid.makeLoft([vcut(0.25, r - 0.6), vcut(0, r + 0.2), vcut(0, top - 0.35), vcut(0.22, top + 0.25)], True)
    assert notch.isValid()
    sh_q = dict(tol=0.001, ang=0.03)
    M = M - mt.to_manifold(notch, **sh_q)
    M = M - pocket
    table = girdle + stone * 0.16
    def prong():
        hd, foot = 0.5 * pr, pr * 1.1; tip = table + hd; rd = (pr * pr + hd * hd) / (2 * hd); am_ = math.asin(pr / rd) / 2
        return (cq.Workplane("XY").moveTo(0, floor - 0.3).lineTo(foot, floor - 0.3).lineTo(foot, floor - 0.04).lineTo(pr, girdle + 0.017).lineTo(pr, table)
                .threePointArc((rd * math.sin(am_), tip - rd + rd * math.cos(am_)), (0, tip)).close().revolve(360, (0, 0, 0), (0, 1, 0))).val()
    Rs = stone / 2 + 0.02; pav = stone * 0.43; crown = stone * 0.16; Rt = stone * 0.275; rh = 0.28 * stone; db = (Rs - rh) * pav / (stone / 2); rb = 0.47 * stone
    hole_top = girdle - db; straight = 2 * rh * 1.5
    seat = (cq.Workplane("XY").polyline([(0, r - 2), (rb, r - 2), (rb, r - 0.05), (rh, hole_top - straight), (rh, hole_top), (Rs, girdle), (Rs, girdle + 0.04),
                                         (Rt + 0.02, girdle + crown + 0.02), (0, girdle + crown + 0.02)]).close().revolve(360, (0, 0, 0), (0, 1, 0))).val()
    stones = [(0, 0.0, zc)] + [(sd, k * p * ca, zc + k * p * sa) for sd in (1, -1) for k in (1, 2)]
    prs = []
    for sd in (1, -1):
        for k in (0.5, 1.5):
            for w in (1, -1):
                prs.append((sd, (k * p) * ca + w * kk * n[0], zc + (k * p) * sa + w * kk * n[1]))
        prs.append((sd, (2 * p + dist) * ca, zc + (2 * p + dist) * sa))
    posts = [mt.to_manifold(on_facet(prong().rotate((0, 0, 0), (0, 1, 0), 3.1 + 17.3 * i_p), x, z, sd), **sh_q) for i_p, (sd, x, z) in enumerate(prs)]
    # the two prongs at the crease on the V side would overlap: one oval prong shared by the three middle stones
    oval = (posts[1] + posts[6]).hull()
    for i_p, q_ in enumerate(posts):
        if i_p not in (1, 6): M = M + q_
    M = M + oval
    for i_s, (sd, x, z) in enumerate(stones):   # each seat turned a little so its facets never line up with a prong's, which tears on saving
        M = M - mt.to_manifold(on_facet(seat.rotate((0, 0, 0), (0, 1, 0), 7.3 + 11.7 * i_s), x, z, sd), **sh_q)
    m = mt.to_trimesh(M); m.fix_normals(); m.export(OUT / f"{name}-final-size.stl")
    m = trimesh.load(OUT / f"{name}-final-size.stl")
    big = m.copy(); big.apply_scale(1 / (1 - SHRINK)); big.export(OUT / f"{name}-PRINT.stl")
    mt.mirror_check(m, name)
    def rp(rad, y, n_, off=0): return [(rad * math.cos(2 * math.pi * (i + off) / n_), y, rad * math.sin(2 * math.pi * (i + off) / n_)) for i in range(n_)]
    s_h = stone / 2
    hull = trimesh.convex.convex_hull(np.array(rp(s_h * .55, crown, 8) + rp(s_h * .8, crown * .55, 8, .5) + rp(s_h, .02, 16, .25) + rp(s_h, 0, 16, .25) + rp(s_h * .55, -pav * .52, 8) + [(0, -pav, 0)]))
    st = []
    for sd, x, z in stones:
        g_ = hull.copy()
        if sd == 0: g_.apply_translation((x, girdle, z))
        else:
            g_.apply_translation(((x - L / 2) * sd, girdle - drop, z)); g_.apply_transform(trimesh.transformations.rotation_matrix(-sd * TF, [0, 0, 1]))
        st.append(g_)
    trimesh.util.concatenate(st).export(OUT / f"{name}-stones.stl")
    print(f"  stones {stone} x5, gap {gap:.2f}; prongs {len(prs) - 1} of {pd:.2f}, overlap of girdle {stone/2+pr-dist:.3f}; pocket arm width {2*hw:.2f}, rim at the V {rim:.2f}; V depth {W/2-zt:.2f}, opening {2*(W/2-zt)/ta:.2f}; below the point {OB0+W/2:.2f}; above the arm ends {top_margin:.2f}; heart width {2*(Q[0]+hw):.2f}")
    print(f"  hole dia {2*rh:.2f}, straight {straight:.2f} (limit {4*rh:.2f}), countersink to {2*rb:.2f}; culet to finger {girdle-pav-r:.2f}; floor to finger {floor-r:.2f}; fold {2*math.degrees(TF):.0f} degrees, facet sag {top-hf:.2f}")
    print(f"  print x{1/(1-SHRINK):.4f}: inner diameter {2*r/(1-SHRINK):.2f} (finished {2*r:.2f}), width {W/(1-SHRINK):.2f}, stone seat {stone/(1-SHRINK):.3f}")
    print(f"{name}: watertight {m.is_watertight} bodies {m.body_count} faces {len(m.faces)} weight {m.volume/1000*DENSITY_14K:.2f} g bbox {np.round(m.bounds[1]-m.bounds[0],2)}")
    if not m.is_watertight:
        e_ = np.sort(m.edges, axis=1); u_, c_ = np.unique(e_, axis=0, return_counts=True); bad = u_[c_ != 2]
        print('  BAD EDGES', len(bad), np.round((m.vertices[bad[:, 0]] + m.vertices[bad[:, 1]]) / 2, 3).tolist()[:8], np.round(np.linalg.norm(m.vertices[bad[:, 0]] - m.vertices[bad[:, 1]], axis=1), 4).tolist()[:8])
    assert m.is_watertight and m.body_count == 1

make("hers-54", 54, 4.0, 0.8)
make("his-62", 62, 5.0, 0.93)
