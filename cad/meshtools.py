"""Print-mesh helpers. Booleans are done on meshes with Manifold, which always gives a closed mesh; MeshFix is not
used for rings any more (2026-11-08: it filled a tessellation gap with a sloped wedge that a volume check did not see)."""
import numpy as np, trimesh, manifold3d as mf

def to_manifold(shape, tol=0.005, ang=0.1):
    v, f = shape.tessellate(tol, ang)
    t = trimesh.Trimesh(np.array([p.toTuple() for p in v]), np.array(f), process=False)
    t.merge_vertices(digits_vertex=6)
    t.update_faces(t.area_faces > 1e-11); t.remove_unreferenced_vertices()
    M = mf.Manifold(mf.Mesh(np.asarray(t.vertices, dtype=np.float32), np.asarray(t.faces, dtype=np.uint32)))
    assert M.status() == mf.Error.NoError, f"not closed: {M.status()}"
    return M

def to_trimesh(M):
    o = M.to_mesh()
    return trimesh.Trimesh(np.asarray(o.vert_properties)[:, :3], np.asarray(o.tri_verts), process=True)

def height_map(m, ext=3.2, n=640, ymin=None):
    T = m.triangles; lo_, hi_ = T.min(1), T.max(1); y0 = ymin if ymin is not None else m.bounds[1][1] - 3
    keep = (lo_[:, 0] < ext) & (hi_[:, 0] > -ext) & (lo_[:, 2] < ext) & (hi_[:, 2] > -ext) & (hi_[:, 1] > y0)
    step = 2 * ext / n; H = np.full((n, n), -1.0)
    for t in m.triangles[keep]:
        a, b, c0 = t[:, [0, 2]]; ys = t[:, 1]
        d = (b[1] - c0[1]) * (a[0] - c0[0]) + (c0[0] - b[0]) * (a[1] - c0[1])
        if abs(d) < 1e-12: continue
        lo = np.clip(np.floor((t[:, [0, 2]].min(0) + ext) / step).astype(int), 0, n - 1)
        hi = np.clip(np.ceil((t[:, [0, 2]].max(0) + ext) / step).astype(int), 0, n - 1)
        X, Z = np.meshgrid((np.arange(lo[0], hi[0] + 1) + .5) * step - ext, (np.arange(lo[1], hi[1] + 1) + .5) * step - ext, indexing='ij')
        l1 = ((b[1] - c0[1]) * (X - c0[0]) + (c0[0] - b[0]) * (Z - c0[1])) / d
        l2 = ((c0[1] - a[1]) * (X - c0[0]) + (a[0] - c0[0]) * (Z - c0[1])) / d
        l3 = 1 - l1 - l2; ins = (l1 >= 0) & (l2 >= 0) & (l3 >= 0); Y = l1 * ys[0] + l2 * ys[1] + l3 * ys[2]
        sub = H[lo[0]:hi[0] + 1, lo[1]:hi[1] + 1]; sub[ins] = np.maximum(sub[ins], Y[ins])
    return H

def mirror_check(m, label, limit=0.002):
    """The top of a symmetric piece must match its mirror image: share of points differing by more than 0.03 mm."""
    H = height_map(m); M = H[::-1, :]; ok = (H > 0) & (M > 0)
    share = float((np.abs(H - M)[ok] > 0.03).mean())
    print(f"{label}: mirror difference over 0.03 mm on {share*100:.3f}% of the top")
    assert share < limit, "the two halves differ: mesh defect"
    return H
