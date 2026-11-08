"""Pair of V-shaped wedding bands with a three-stone heart at the point, 14K yellow gold (2026-11-08).

Specification (mm):
- Hers: size 54, 3.5 wide at the back, 5.2 at the heart. His: size 62, 4.5 and 6.0. 1.6 thick at the centre.
- The whole band bends into a soft V at the front: both edges move together, so the V is a shape of the band and no
  cut is made in an edge. A polished strip of at least 0.4 stays between each edge and the heart.
- Three round stones, 1.5 (hers) / 1.75 (his); six beads, three per stone.
- True size: no shrinkage allowance yet. STL only: the V is applied to the mesh, so there is no STEP file.
"""
import math
from pathlib import Path
import sys
import numpy as np, cadquery as cq, trimesh
sys.path.insert(0, str(Path(__file__).parent.parent))
import meshtools as mt
import manifold3d as mf

OUT = Path(__file__).parent / "out"; OUT.mkdir(exist_ok=True)
DENSITY_14K = 13.1
V = cq.Vector

def tang(px, pz, cx, cz, R, side):
    dx, dz = cx - px, cz - pz; D = math.hypot(dx, dz); a = math.atan2(dz, dx); b = math.asin(R / D)
    L = math.sqrt(D * D - R * R); t = a + side * b
    return (px + L * math.cos(t), pz + L * math.sin(t))

def make(name, size, w0, w, stone, d, t=1.6, sag=0.25, inner_sag=0.22):
    k = stone / 1.1
    r = size / (2 * math.pi); top = r + t
    # band
    prof = (cq.Workplane("XZ").moveTo(r + inner_sag, -w / 2).threePointArc((r, 0), (r + inner_sag, w / 2))
            .lineTo(top - sag, w / 2).threePointArc((top, 0), (top - sag, -w / 2)).close())
    full = prof.revolve(360, (0, 0, 0), (0, 1, 0)).val()
    # the outline seen from the front: width depends on height (y), so one extruded shape trims both sides
    y0, y1 = 0.45 * top, top
    def half(y):
        u = min(1, max(0, (y - y0) / (y1 - y0))); return w0 / 2 + (w - w0) / 2 * u * u * (3 - 2 * u)
    ys = [y0 + (y1 - y0) * i / 12 for i in range(13)]
    right = [(half(y), y) for y in ys]
    left = [(-z, y) for z, y in reversed(right)]
    Y0, Y1 = -top - 2, top + 2
    outline = (cq.Workplane('ZY', origin=(30, 0, 0)).moveTo(w0 / 2, Y0).lineTo(*right[0]).spline(right[1:], includeCurrent=True)
               .lineTo(w / 2, Y1).lineTo(-w / 2, Y1).lineTo(*left[0]).spline(left[1:], includeCurrent=True).lineTo(-w0 / 2, Y0).close().extrude(60).val())
    band = full.intersect(outline)
    print(name, 'trimmed', band.isValid(), round(band.Volume(), 1), len(band.Solids()))
    try:
        b2 = cq.Workplane(obj=band).edges(cq.selectors.BoxSelector((-99, -99, -w), (99, 99, w))).fillet(0.12).val()
        if b2.isValid(): band = b2
        else: print('fillet invalid, kept sharp')
    except Exception as e: print('fillet failed, kept sharp', e)
    # heart layout in (x, z), centred on the band
    c, R, sp = 0.75 * k, 0.88 * k, 1.5 * k
    dzb = math.sqrt(sp * sp - c * c)
    drop = dzb + 1.05 * k
    h = R + drop; zL = h / 2 - R; zB = zL - dzb; zP = zL - drop
    floor = top - 0.34
    tr = tang(0, zP, c, zL, R, -1); tl = (-tr[0], tr[1])
    # one closed outline (arcs and lines), so no tangent surfaces meet in the cut
    cusp_z = zL + math.sqrt(R * R - c * c)
    a0 = math.atan2(tr[1] - zL, tr[0] - c); a1 = math.atan2(cusp_z - zL, -c)
    if a1 < a0: a1 += 2 * math.pi
    am = (a0 + a1) / 2
    mr = (c + R * math.cos(am), zL + R * math.sin(am)); ml = (-mr[0], mr[1])
    recess = (cq.Workplane('XZ', origin=(0, floor, 0)).moveTo(0, zP).lineTo(*tr).threePointArc(mr, (0, cusp_z))
              .threePointArc(ml, tl).close().extrude(-3).val())
    # note: Workplane("XZ") local y is world Z
    centres = [(c, zL), (-c, zL), (0, zB)]
    Rs = stone / 2 + 0.02; pav = stone * 0.43; girdle = floor + 0.02
    seats = []
    for x, z in centres:
        seats.append((cq.Workplane("XY").polyline([(0, r - 2), (0.35 * k, r - 2), (0.35 * k, girdle - pav), (Rs, girdle), (Rs, girdle + 1), (0, girdle + 1)]).close()
                      .revolve(360, (0, 0, 0), (0, 1, 0)).translate((x, 0, z))).val())
    # beads
    br = 0.25 * k; by = floor + 0.12 * k
    def around(cx, cz, deg, d=0.70 * k):
        return (cx + d * math.cos(math.radians(deg)), cz + d * math.sin(math.radians(deg)))
    pts = [(0, zL), (c / 2, (zL + zB) / 2), (-c / 2, (zL + zB) / 2), around(c, zL, 25), around(-c, zL, 155), (0, zB - 0.72 * k)]
    beads = [cq.Solid.makeSphere(br, V(x + 0.0013, by, z + 0.0017), V(0.31, 0.83, 0.47), -90, 90, 360) for x, z in pts]
    print(name, "band", band.isValid(), round(band.Volume(),1), "recess", recess.isValid(), type(recess).__name__, round(recess.Volume(),2))
    # print mesh: same cuts and beads, done on closed meshes (meshtools.py)
    B = mt.to_manifold(band).refine_to_length(0.12).to_mesh()
    v3 = np.array(B.vert_properties)[:, :3].astype(float)
    th = np.arctan2(v3[:, 0], v3[:, 1])
    rho, A = 0.05, 0.45  # radians: rounding of the point, length of the V's arms
    s_ = (np.sqrt(th * th + rho * rho) - rho) / A
    s0, v0 = 0.6, 0.4
    f = np.where(s_ < s0, 1 - s_, np.where(s_ < s0 + 2 * v0, v0 * (1 - (s_ - s0) / (2 * v0)) ** 2, 0))
    v3[:, 2] -= d * f
    M = mf.Manifold(mf.Mesh(v3.astype(np.float32), np.asarray(B.tri_verts, dtype=np.uint32)))
    assert M.status() == mf.Error.NoError, M.status()
    sh = V(0, 0, -d)
    M = M - mt.to_manifold(recess.translate(sh))
    for x in seats: M = M - mt.to_manifold(x.translate(sh))
    for x in beads: M = M + mt.to_manifold(x.translate(sh))
    m = mt.to_trimesh(M); m.fix_normals(); m.export(OUT / f"{name}.stl")
    m = trimesh.load(OUT / f"{name}.stl")
    raw_vol, raw_ok = m.volume, m.is_watertight
    mt.mirror_check(m, name)
    # stones
    def rp(rad, y, n, off=0): return [(rad * math.cos(2 * math.pi * (i + off) / n), y, rad * math.sin(2 * math.pi * (i + off) / n)) for i in range(n)]
    s, cr = stone / 2, stone * 0.16
    hull = trimesh.convex.convex_hull(np.array(rp(s * .55, cr, 8) + rp(s * .8, cr * .55, 8, .5) + rp(s, .03, 16, .25) + rp(s, 0, 16, .25) + rp(s * .55, -pav * .52, 8) + [(0, -pav, 0)]))
    st = []
    for x, z in centres:
        g = hull.copy(); g.apply_translation((x, girdle, z - d)); st.append(g)
    trimesh.util.concatenate(st).export(OUT / f"{name}-stones.stl")
    ext = m.bounds[1] - m.bounds[0]
    edge = w / 2 - max(abs(zP), zL + R)
    print(f"{name}: watertight {m.is_watertight} bodies {m.body_count} volume {m.volume:.1f} weight {m.volume/1000*DENSITY_14K:.2f} g bbox {np.round(ext,2)} "
          f"heart {2*(c+R):.2f} x {h:.2f}; strip to the edge {edge:.2f}; beads {2*br:.2f}; under floor {floor-r:.2f}; id {2*r:.2f}")
    assert m.is_watertight and m.body_count == 1

make("hers-54", 54, 3.5, 5.2, 1.5, 1.2)
make("his-62", 62, 4.5, 6.0, 1.75, 1.35)
