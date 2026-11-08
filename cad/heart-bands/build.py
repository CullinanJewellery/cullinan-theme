"""Pair of wedding bands with a small three-stone heart, 14K yellow gold (2026-11-08).

Specification (mm; own proportions, from the common motif):
- Hers: size 54, 3.5 wide. His: size 62, 4.5 wide. Both 1.6 thick at the centre, low domed top, comfort-fit inside.
- Heart: shallow recess with a flat floor at the top of the band, point towards one edge.
- Three round stones, 1.0 (hers) / 1.3 (his), two in the lobes and one below; each seat has a through hole.
- Eight small beads hold the stones (0.45 / 0.59 diameter). The setter raises and finishes them.
- True size: no shrinkage allowance yet.
Output per ring: out/<name>.stl + .step (gold only), out/<name>-stones.stl (preview only).
"""
import math
from pathlib import Path
import numpy as np, cadquery as cq, trimesh, pymeshfix

OUT = Path(__file__).parent / "out"; OUT.mkdir(exist_ok=True)
DENSITY_14K = 13.1
V = cq.Vector

def tang(px, pz, cx, cz, R, side):
    dx, dz = cx - px, cz - pz; D = math.hypot(dx, dz); a = math.atan2(dz, dx); b = math.asin(R / D)
    L = math.sqrt(D * D - R * R); t = a + side * b
    return (px + L * math.cos(t), pz + L * math.sin(t))

def make(name, size, w, stone, t=1.6, sag=0.25, inner_sag=0.22):
    k = stone / 1.1
    r = size / (2 * math.pi); top = r + t
    # band
    prof = (cq.Workplane("XZ").moveTo(r + inner_sag, -w / 2).threePointArc((r, 0), (r + inner_sag, w / 2))
            .lineTo(top - sag, w / 2).threePointArc((top, 0), (top - sag, -w / 2)).close())
    band = prof.revolve(360, (0, 0, 0), (0, 1, 0)).edges("%CIRCLE").edges(cq.selectors.BoxSelector((-99,-99,-w),(99,99,w))).fillet(0.15).val()
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
    pts = [(0, zL), (c / 2, (zL + zB) / 2), (-c / 2, (zL + zB) / 2),  # between the stones
           around(c, zL, 60), around(-c, zL, 120), around(c, zL, -20), around(-c, zL, 200), (0, zB - 0.72 * k)]
    beads = [cq.Solid.makeSphere(br, V(x + 0.0013, by, z + 0.0017), V(0.31, 0.83, 0.47), -90, 90, 360) for x, z in pts]
    print(name, "band", band.isValid(), round(band.Volume(),1), "recess", recess.isValid(), type(recess).__name__, round(recess.Volume(),2))
    ring = band.cut(recess)
    print(" after recess", ring.isValid(), round(ring.Volume(),1), len(ring.Solids()))
    for s in seats: ring = ring.cut(s)
    print(" after seats", ring.isValid(), round(ring.Volume(),1), len(ring.Solids()))
    for i, b in enumerate(beads):
        n = ring.fuse(b)
        if not n.isValid():
            n = ring.fuse(b, tol=1e-3)
            print("  bead", i, "needed tolerance; valid", n.isValid())
        ring = n
    print(" after beads", ring.isValid(), round(ring.Volume(),1), len(ring.Solids()))
    # files
    cq.exporters.export(cq.Workplane(obj=ring), str(OUT / f"{name}.step"))
    v, f = ring.tessellate(0.005, 0.1)
    m = trimesh.Trimesh(np.array([p.toTuple() for p in v]), np.array(f), process=False); m.merge_vertices(digits_vertex=6)
    raw_vol, raw_ok = abs(m.volume), m.is_watertight
    print(" tess", len(m.vertices), len(m.faces), m.is_watertight)
    fix = pymeshfix.MeshFix(np.asarray(m.vertices), np.asarray(m.faces)); fix.repair()
    m = trimesh.Trimesh(fix.points, fix.faces, process=True); m.fix_normals(); m.export(OUT / f"{name}.stl")
    m = trimesh.load(OUT / f"{name}.stl")
    # stones
    def rp(rad, y, n, off=0): return [(rad * math.cos(2 * math.pi * (i + off) / n), y, rad * math.sin(2 * math.pi * (i + off) / n)) for i in range(n)]
    s, cr = stone / 2, stone * 0.16
    hull = trimesh.convex.convex_hull(np.array(rp(s * .55, cr, 8) + rp(s * .8, cr * .55, 8, .5) + rp(s, .03, 16, .25) + rp(s, 0, 16, .25) + rp(s * .55, -pav * .52, 8) + [(0, -pav, 0)]))
    st = []
    for x, z in centres:
        g = hull.copy(); g.apply_translation((x, girdle, z)); st.append(g)
    trimesh.util.concatenate(st).export(OUT / f"{name}-stones.stl")
    ext = m.bounds[1] - m.bounds[0]
    print(f"{name}: tessellated volume {raw_vol:.1f} watertight {raw_ok}")
    assert ring.isValid() and abs(m.volume - ring.Volume()) / ring.Volume() < 0.015, "mesh does not match the solid"
    edge = w / 2 - max(abs(zP), zL + R)
    print(f"{name}: valid {ring.isValid()} solids {len(ring.Solids())} watertight {m.is_watertight} bodies {m.body_count} "
          f"volume {ring.Volume():.1f} (mesh {m.volume:.1f}) weight {ring.Volume()/1000*DENSITY_14K:.2f} g bbox {np.round(ext,2)} "
          f"heart {2*(c+R):.2f} x {h:.2f}, margin to band edge {edge:.2f}; under floor {floor-r:.2f}; id {2*r:.2f}; top {top:.2f}")

make("hers-54", 54, 3.5, 1.0)
make("his-62", 62, 4.5, 1.3)
