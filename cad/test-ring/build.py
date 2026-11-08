"""Test ring: small four-prong solitaire on a beaded band, 14K yellow gold (2026-11-08).

Specification (all mm). Own proportions for a common ring type; not a copy of any one ring.
- Size EU 54 (inner circumference 54, inner diameter 17.19).
- Band 1.8 wide x 1.2 thick, all round; edges rounded 0.3. The lower part stays plain so a jeweller can resize it.
- 11 equal beads each side, 1.5 diameter, fused to the band.
- Head for one round 4.0 stone: 4 prongs, 0.9 at the stone, 1.0 at the base, left long for the setter; one
  gallery ring. Culet clears the band.
- True size: no shrinkage allowance yet (measure the first print and casting, then set SCALE_XY).
Output: out/ring.stl and ring.step (gold only, for printing), out/stone.stl (preview only).
"""
import math
from pathlib import Path
import numpy as np
import cadquery as cq
import trimesh

SIZE = 54.0; WIDTH = 1.8; THICK = 1.2; EDGE = 0.3
BEAD_D = 1.5; BEAD_PITCH = 1.40; BEADS = 11; FIRST_BEAD_X = 2.1
STONE_D = 4.0; PAV = 0.43; CROWN = 0.16; GIRDLE_Y = 11.8
PRONG_BASE_D = 1.0; PRONG_D = 0.9; PRONG_R_BASE = 1.4; PRONG_R = 2.30; BASE_Y = 9.6; PRONG_OVER = 0.3
GALLERY_Y = 10.9; GALLERY_D = 0.7
SCALE_XY = 1.0
DENSITY_14K = 13.1  # g/cm3, usual figure for 14K yellow
OUT = Path(__file__).parent / "out"

V = cq.Vector
r = SIZE / (2 * math.pi)
Y = V(0, 1, 0)
sphere = lambda rad, p: cq.Solid.makeSphere(rad, V(*p), V(0, 0, 1), -90, 90, 360)

band = (cq.Workplane("XZ").center(r + THICK / 2, 0).rect(THICK, WIDTH)
        .revolve(360, (-(r + THICK / 2), 0, 0), (-(r + THICK / 2), 1, 0)).edges().fillet(EDGE)).val()

# beads
Rb = r + THICK - 0.05
step = 2 * math.asin(BEAD_PITCH / 2 / Rb)
t0 = math.asin(FIRST_BEAD_X / Rb)
beads = []
for s in (1, -1):
    for k in range(BEADS):
        a = t0 + k * step
        beads.append(sphere(BEAD_D / 2, (s * Rb * math.sin(a), Rb * math.cos(a), 0)))

# prongs
pav_h = STONE_D * PAV
crown_h = STONE_D * CROWN
top_y = GIRDLE_Y + crown_h + PRONG_OVER
head = [cq.Solid.makeTorus(PRONG_R_BASE + (GALLERY_Y - BASE_Y) * (PRONG_R - PRONG_R_BASE) / (GIRDLE_Y - BASE_Y),
                           GALLERY_D / 2, V(0, GALLERY_Y, 0), Y)]
for ang in (45, 135, 225, 315):
    c, s = math.cos(math.radians(ang)), math.sin(math.radians(ang))
    b = V(PRONG_R_BASE * c, BASE_Y, PRONG_R_BASE * s)
    g = V(PRONG_R * c, GIRDLE_Y, PRONG_R * s)
    d = g - b
    head.append(cq.Solid.makeCone(PRONG_BASE_D / 2, PRONG_D / 2, d.Length, b, d.normalized()))
    head.append(cq.Solid.makeCylinder(PRONG_D / 2, top_y - GIRDLE_Y, g, Y))
    head.append(sphere(PRONG_D / 2 + 0.001, (g.x, GIRDLE_Y, g.z)))
    head.append(sphere(PRONG_D / 2, (g.x, top_y, g.z)))

# stone seat: stone shape + 0.03 clearance, cut from the head only
R = STONE_D / 2 + 0.03
seat = (cq.Workplane("XY").polyline([(0, GIRDLE_Y - pav_h), (R, GIRDLE_Y), (R, GIRDLE_Y + 0.08),
                                     (R * 0.55, GIRDLE_Y + 0.08 + crown_h), (0, GIRDLE_Y + 0.08 + crown_h)]).close()
        .revolve(360, (0, 0, 0), (0, 1, 0))).val()
culet_y = GIRDLE_Y - pav_h

head_solid = head[0].fuse(*head[1:]).clean()
head_solid = head_solid.cut(seat)
ring = band.fuse(*beads).fuse(head_solid).clean()

vol = ring.Volume()
solids = len(ring.Solids())
OUT.mkdir(exist_ok=True)
cq.exporters.export(cq.Workplane(obj=ring), str(OUT / "ring.step"))
cq.exporters.export(cq.Workplane(obj=ring), str(OUT / "ring.stl"), tolerance=0.006, angularTolerance=0.1)

# preview stone: faceted hull
def ringpts(rad, y, n, off=0):
    return [(rad * math.cos(2 * math.pi * (i + off) / n), y, rad * math.sin(2 * math.pi * (i + off) / n)) for i in range(n)]
s = STONE_D / 2; g = GIRDLE_Y
pts = ringpts(s * .55, g + crown_h, 8) + ringpts(s * .80, g + crown_h * .55, 8, .5) + ringpts(s, g + .04, 16, .25) \
    + ringpts(s, g, 16, .25) + ringpts(s * .55, g - pav_h * .52, 8) + [(0, g - pav_h, 0)]
trimesh.convex.convex_hull(np.array(pts)).export(OUT / "stone.stl")

# OCC leaves a few zero-area slivers where surfaces meet; MeshFix closes them so the slicer gets a watertight file
import pymeshfix
_v, _f = ring.tessellate(0.006, 0.1)
_m = trimesh.Trimesh(np.array([p.toTuple() for p in _v]), np.array(_f), process=False)
_m.merge_vertices(digits_vertex=6)
_fix = pymeshfix.MeshFix(np.asarray(_m.vertices), np.asarray(_m.faces))
_fix.repair()
m = trimesh.Trimesh(_fix.points, _fix.faces, process=True)
m.fix_normals()
m.export(OUT / 'ring.stl')
m = trimesh.load(OUT / 'ring.stl')
print(f'mesh: watertight {m.is_watertight}, winding {m.is_winding_consistent}, bodies {m.body_count}, volume {m.volume:.1f} (solid {vol:.1f})')
bb = m.bounds
print(f"inner diameter {2*r:.2f}; valid {ring.isValid()}; solids {solids}; watertight {m.is_watertight}; faces {len(m.faces)}")
print(f"volume {vol:.1f} mm3; 14K weight about {vol/1000*DENSITY_14K:.2f} g; bbox {bb[1]-bb[0]}")
print(f"beads {len(beads)}; culet y {culet_y:.2f} vs band outer {r+THICK:.2f} (clearance {culet_y-r-THICK:.2f}); finger inner {r:.2f}")
print(f"height above finger to stone top {g+crown_h+0.08-r:.2f}; prong top {top_y+PRONG_D/2:.2f}")
