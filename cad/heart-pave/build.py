"""Slim wedding bands with a bevelled heart of six small stones, 14K yellow gold (2026-11-08).

Specification (mm, FINISHED ring; the print file is scaled up by SHRINK; rules in ../JEWELLERY-CAD-BASICS.md):
- Hers: size 54, 4.8 wide, stones 0.8. His: size 62, 5.6 wide, stones 0.93. 1.6 thick, low dome, both edges straight.
- Heart fully inside the band with polished metal all round it, bevelled rim, six stones on 10 shared prongs.
- Open channel inside the band (wall 1.0, shallower under the heart, rails 0.8), solid at the bottom for sprue and resizing.
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
WALL, WALL_HEART, RAIL, EDGE = 1.0, 1.15, 0.8, 0.4
T2, RAMP, HEART_END = math.pi - 0.32, 0.22, 0.30
SAG = 0.25

def S(x):
    x = np.clip(x, 0, 1); return x * x * (3 - 2 * x)

def tang(px, pz, cx, cz, R, side):
    dx, dz = cx - px, cz - pz; D = math.hypot(dx, dz); a = math.atan2(dz, dx); b = math.asin(R / D)
    L = math.sqrt(D * D - R * R); t = a + side * b
    return (px + L * math.cos(t), pz + L * math.sin(t))

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

def heart_wire(c, zL, R, zP, y):
    tr = tang(0, zP, c, zL, R, -1); tl = (-tr[0], tr[1]); cusp = zL + math.sqrt(R * R - c * c)
    a0 = math.atan2(tr[1] - zL, tr[0] - c); a1 = math.atan2(cusp - zL, -c)
    if a1 < a0: a1 += 2 * math.pi
    am = (a0 + a1) / 2; mr = (c + R * math.cos(am), zL + R * math.sin(am)); ml = (-mr[0], mr[1])
    P = lambda p: V(p[0], y, p[1])
    E = cq.Edge
    return cq.Wire.assembleEdges([E.makeLine(P((0, zP)), P(tr)), E.makeThreePointArc(P(tr), P(mr), P((0, cusp))),
                                  E.makeThreePointArc(P((0, cusp)), P(ml), P(tl)), E.makeLine(P(tl), P((0, zP)))]), tr

def circum(a, b, c):
    ax, ay = a; bx, by = b; cx, cy = c
    d = 2 * (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)); s = ax * ax + ay * ay; t = bx * bx + by * by; w = cx * cx + cy * cy
    return ((s * (by - cy) + t * (cy - ay) + w * (ay - by)) / d, (s * (cx - bx) + t * (ax - cx) + w * (bx - ax)) / d)

def make(name, size, W, stone, t=1.6):
    u = stone / 0.8
    r = size / (2 * math.pi); top = r + t
    Zc = W / 2 - RAIL
    P, ni = profile(r, top, W, flat=Zc); nj = len(P)
    zin = P[:ni, 1]; hollow = (top - SAG * (zin / (W / 2)) ** 2 - WALL - P[:ni, 0]) * S((Zc - np.abs(zin)) / EDGE)
    th = np.linspace(-math.pi, math.pi, THETAS, endpoint=False)
    verts = np.zeros((THETAS * nj, 3)); shallow = (t - WALL_HEART) / (t - WALL)
    for i, a in enumerate(th):
        k = S((T2 - abs(a)) / RAMP) * (shallow + (1 - shallow) * S((abs(a) - HEART_END) / RAMP))
        rad = P[:, 0].copy(); rad[:ni] += k * hollow
        verts[i * nj:(i + 1) * nj] = np.c_[rad * np.sin(a), rad * np.cos(a), P[:, 1]]
    i_ = np.arange(THETAS)[:, None]; j_ = np.arange(nj)[None, :]
    a = (i_ * nj + j_).ravel(); b = (((i_ + 1) % THETAS) * nj + j_).ravel()
    c = (((i_ + 1) % THETAS) * nj + (j_ + 1) % nj).ravel(); e = (i_ * nj + (j_ + 1) % nj).ravel()
    F = np.vstack([np.c_[a, b, c], np.c_[a, c, e]])
    if trimesh.Trimesh(verts, F, process=False).volume < 0: F = F[:, ::-1]
    M = mf.Manifold(mf.Mesh(verts.astype(np.float32), F.astype(np.uint32))); assert M.status() == mf.Error.NoError
    # stones: 3 + 2 + 1, outer two of the top row a little higher so the heart has lobes
    p, dz, dl = 0.95 * u, 0.823 * u, 0.18 * u
    St = [(-p, dl), (0, 0), (p, dl), (-p / 2, -dz), (p / 2, -dz), (0, -2 * dz)]
    cL, zL, R, zP = 0.72 * u, 0.2 * u, 0.96 * u, -2.5 * u
    zs = -(zL + R + zP) / 2
    depth = 0.24 * u; floor = top - depth; girdle = floor + 0.08 * u; bevel = 0.5
    w0, tr = heart_wire(cL, zL, R, zP, floor)
    grow = bevel * 0.7                        # the wall leans outwards about 35 degrees
    half = math.atan2(tr[0], tr[1] - zP)      # half angle at the point
    w1, _ = heart_wire(cL, zL, R + grow, zP - grow / math.sin(half), floor + bevel)
    recess = cq.Solid.makeLoft([w0, w1], True)
    assert recess.isValid() and recess.Volume() > 0
    Rs = stone / 2 + 0.02; pav = stone * 0.43; crown = stone * 0.16; Rt = stone * 0.275; rh = 0.28 * stone; db = (Rs - rh) * pav / (stone / 2)
    seats = [(cq.Workplane("XY").polyline([(0, r - 2), (rh, r - 2), (rh, girdle - db), (Rs, girdle), (Rs, girdle + 0.04),
                                           (Rt + 0.02, girdle + crown + 0.02), (0, girdle + crown + 0.02)]).close()
              .revolve(360, (0, 0, 0), (0, 1, 0)).translate((x, 0, z))).val() for x, z in St]
    pd = 0.48 * u; pr = pd / 2; lap = 0.05 * u; dist = stone / 2 + pr - lap; table = girdle + crown
    def prong(x, z, flare=1.1):
        hd, foot = 0.5 * pr, pr * flare; tip = table + hd; rd = (pr * pr + hd * hd) / (2 * hd); am_ = math.asin(pr / rd) / 2
        return (cq.Workplane("XY").moveTo(0, floor - 0.3).lineTo(foot, floor - 0.3).lineTo(foot, floor).lineTo(pr, girdle).lineTo(pr, table)
                .threePointArc((rd * math.sin(am_), tip - rd + rd * math.cos(am_)), (0, tip)).close()
                .revolve(360, (0, 0, 0), (0, 1, 0)).translate((x, 0, z))).val()
    tips = [(0, 1, 3), (1, 2, 4), (1, 3, 4), (3, 4, 5)]
    pts = [circum(St[i], St[j], St[k]) for i, j, k in tips]
    def shared(i, j, sx):   # on the outer side of two neighbouring stones, holding both
        ax, az = St[i]; bx, bz = St[j]; mx, mz = (ax + bx) / 2, (az + bz) / 2; L = math.hypot(bx - ax, bz - az); k = math.sqrt(dist * dist - L * L / 4)
        nx, nz = (bz - az) / L, -(bx - ax) / L
        if nx * sx + nz * (0.3 if i < 3 and j < 3 else -0.8) < 0: nx, nz = -nx, -nz
        return (mx + nx * k, mz + nz * k)
    pts += [shared(0, 1, 0), shared(1, 2, 0), shared(3, 5, -1), shared(4, 5, 1)]
    pts += [(St[i][0] + dist * math.cos(math.radians(d)), St[i][1] + dist * math.sin(math.radians(d))) for i, d in [(0, 190), (2, 350)]]
    sh = V(0, 0, zs); q = dict(tol=0.001, ang=0.03)
    M = M - mt.to_manifold(recess.translate(sh), **q)
    for x, z in pts: M = M + mt.to_manifold(prong(x, z).translate(sh), **q)
    for x in seats: M = M - mt.to_manifold(x.translate(sh), **q)
    m = mt.to_trimesh(M); m.fix_normals(); m.export(OUT / f"{name}-final-size.stl")
    m = trimesh.load(OUT / f"{name}-final-size.stl")
    big = m.copy(); big.apply_scale(1 / (1 - SHRINK)); big.export(OUT / f"{name}-PRINT.stl")
    mt.mirror_check(m, name)
    def rp(rad, y, n, off=0): return [(rad * math.cos(2 * math.pi * (i + off) / n), y, rad * math.sin(2 * math.pi * (i + off) / n)) for i in range(n)]
    s_ = stone / 2
    hull = trimesh.convex.convex_hull(np.array(rp(s_ * .55, crown, 8) + rp(s_ * .8, crown * .55, 8, .5) + rp(s_, .02, 16, .25) + rp(s_, 0, 16, .25) + rp(s_ * .55, -pav * .52, 8) + [(0, -pav, 0)]))
    st = []
    for x, z in St:
        g = hull.copy(); g.apply_translation((x, girdle, z + zs)); st.append(g)
    trimesh.util.concatenate(st).export(OUT / f"{name}-stones.stl")
    laps = [stone / 2 - min(math.hypot(x - cx, z - cz) - pr for cx, cz in St) for x, z in pts]
    third = [sorted(math.hypot(x - cx, z - cz) for cx, cz in St)[2] for x, z in pts[:4]]
    gaps = [math.hypot(St[i][0] - St[j][0], St[i][1] - St[j][1]) - stone for i in range(6) for j in range(i)]
    b_s = depth * 0.7; hH = zL + R - zP + 2 * b_s
    hole_len = (girdle - db) - (top - WALL_HEART)
    print(f"  stones {stone} x6; girdle gap at least {min(gaps):.2f}; prongs {len(pts)} of {pd:.2f}; overlap of girdle min {min(laps):.3f} max {max(laps):.3f}; inner prongs on the third stone {[round(stone/2+pr-n,3) for n in third]}")
    print(f"  heart {2*(cL+R):.2f} x {zL+R-zP:.2f}, with bevel {2*(cL+R+b_s):.2f} x {hH:.2f}; polished band above and below {(W-hH)/2:.2f}; hole dia {2*rh:.2f}, length {hole_len:.2f} (limit {4*rh:.2f}); metal between recess floor and channel {floor-(top-WALL_HEART):.2f}; culet to finger {girdle-pav-r:.2f}")
    print(f"  print x{1/(1-SHRINK):.4f}: inner diameter {2*r/(1-SHRINK):.2f} (finished {2*r:.2f}), stone seat {stone/(1-SHRINK):.3f}")
    print(f"{name}: watertight {m.is_watertight} bodies {m.body_count} faces {len(m.faces)} weight {m.volume/1000*DENSITY_14K:.2f} g bbox {np.round(m.bounds[1]-m.bounds[0],2)}")
    assert m.is_watertight and m.body_count == 1

make("hers-54", 54, 4.8, 0.8)
make("his-62", 62, 5.6, 0.93)
