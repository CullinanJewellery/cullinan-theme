import sys, numpy as np, trimesh
from pathlib import Path
p = Path(__file__).parent/"out"/"ring.stl"
m = trimesh.load(p, process=False)
print('raw', len(m.vertices), len(m.faces))
m.merge_vertices(digits_vertex=5)
print('merged', len(m.vertices), len(m.faces), 'watertight', m.is_watertight, 'winding', m.is_winding_consistent)
from collections import Counter
e = np.sort(m.edges, axis=1)
c = Counter(map(tuple, e))
cnt = Counter(c.values()); print('edge use counts', cnt)
a = m.area_faces; print('degenerate faces', int((a<1e-9).sum()))
bad=[k for k,v in c.items() if v!=2][:400]
if bad:
    v=m.vertices[np.array(bad).ravel()]; print('bad edge region min/max', v.min(0), v.max(0)); print('bad y hist', np.histogram(v[:,1],bins=8))
