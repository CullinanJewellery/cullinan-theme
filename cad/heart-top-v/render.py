# Preview pictures of the pair: blender --background --python render.py
import bpy, math, os
from mathutils import Vector, Matrix
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = 200; sc.cycles.use_denoising = True
sc.render.resolution_x = sc.render.resolution_y = 1400
sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
try:
    p = bpy.context.preferences.addons['cycles'].preferences
    p.compute_device_type = 'OPTIX'; p.get_devices()
    for d in p.devices: d.use = True
    sc.cycles.device = 'GPU'
except Exception as e: print('CPU render', e)
def mat(name, f):
    m = bpy.data.materials.new(name); m.use_nodes = True; f(m.node_tree.nodes['Principled BSDF']); return m
def gold(b):
    b.inputs['Base Color'].default_value = (0.86, 0.60, 0.28, 1); b.inputs['Metallic'].default_value = 1; b.inputs['Roughness'].default_value = 0.14
def stone(b):
    b.inputs['Base Color'].default_value = (1, 1, 1, 1); b.inputs['Transmission Weight'].default_value = 1; b.inputs['IOR'].default_value = 2.42; b.inputs['Roughness'].default_value = 0
def floor(b):
    b.inputs['Base Color'].default_value = (0.96, 0.96, 0.97, 1); b.inputs['Roughness'].default_value = 0.6
G, S = mat('g', gold), mat('s', stone)
def imp(f, m, M, smooth):
    bpy.ops.wm.stl_import(filepath=os.path.join(OUT, f)); o = bpy.context.selected_objects[0]; o.matrix_world = M; o.data.materials.append(m)
    if smooth:
        bpy.context.view_layer.objects.active = o; bpy.ops.object.shade_smooth_by_angle(angle=math.radians(30))
    return o
TILT = math.radians(50)
objs = {}
def ring(name, y, outer, d):
    global HM
    M = Matrix.Translation((0, y, outer)) @ Matrix.Rotation(TILT, 4, 'Y') @ Matrix.Rotation(math.pi / 2, 4, 'X')
    if name == 'hers-54': HM = M
    objs.setdefault(name, [imp(name + '-final-size.stl', G, M, True), imp(name + '-stones.stl', S, M, False)])
    return M @ Vector((0, outer, -d)), (M.to_3x3() @ Vector((0, 1, 0))).normalized()
HM = None
h_top, h_n = ring('hers-54', -4.3, 54 / (2 * math.pi) + 1.6, 0.25)
ring('his-62', 4.7, 62 / (2 * math.pi) + 1.6, 0.275)
bpy.ops.mesh.primitive_plane_add(size=800, location=(0, 0, 0)); bpy.context.object.data.materials.append(mat('f', floor))
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; bg = w.node_tree.nodes['Background']; bg.inputs[0].default_value = (1, 1, 1, 1); bg.inputs[1].default_value = 0.75
def light(loc, size, power):
    d = bpy.data.lights.new('l', 'AREA'); d.size = size; d.energy = power; o = bpy.data.objects.new('l', d); sc.collection.objects.link(o); o.location = loc
    o.rotation_euler = (Vector((0, 0, 12)) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
light((45, -35, 65), 40, 26000); light((-45, -10, 35), 20, 5000); light((20, 45, 40), 30, 7000)
for loc in ((55, -30, 18), (30, 55, 20)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.scale = (9, 9, 26); o.visible_camera = False; o.visible_shadow = False
    o.data.materials.append(mat('d', lambda b: b.inputs['Base Color'].__setattr__('default_value', (0.02, 0.015, 0.01, 1))))
cd = bpy.data.cameras.new('c'); cd.lens = 100; cam = bpy.data.objects.new('c', cd); sc.collection.objects.link(cam); sc.camera = cam
def shot(name, loc, target):
    cam.location = loc; cam.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = os.path.join(OUT, name); bpy.ops.render.render(write_still=True)
shot('view-1-pair.png', (112, -62, 72), (0, 0, 11))
for o in objs['his-62']: o.hide_render = True
loc = h_top + h_n * 24 + Vector((0, -2.5, 0))
z = (loc - h_top).normalized(); up = Vector((0, -1, 0)); x = up.cross(z).normalized(); y = z.cross(x)
cam.matrix_world = Matrix((x, y, z)).transposed().to_4x4() @ Matrix.Identity(4)
cam.location = loc
sc.render.filepath = os.path.join(OUT, 'view-2-heart-close.png'); bpy.ops.render.render(write_still=True)
def low(name):
    T = (HM.to_3x3() @ Vector((1, 0, 0))).normalized()
    loc = h_top + (h_n * 0.5 + T * 0.87).normalized() * 24
    z = (loc - h_top).normalized(); x = Vector((0, -1, 0)).cross(z).normalized(); y = z.cross(x)
    cam.matrix_world = Matrix((x, y, z)).transposed().to_4x4(); cam.location = loc
    sc.render.filepath = os.path.join(OUT, name); bpy.ops.render.render(write_still=True)
low('view-5-prongs-low-angle.png')
loc = h_top + h_n * 24 + Vector((0, -2.5, 0))
z = (loc - h_top).normalized(); up = Vector((0, -1, 0)); x = up.cross(z).normalized(); y = z.cross(x)
cam.matrix_world = Matrix((x, y, z)).transposed().to_4x4(); cam.location = loc

# what is printed: no stones
for o in bpy.data.objects:
    if o.type == 'MESH' and o.data.materials and o.data.materials[0].name == 's': o.hide_render = True
sc.render.filepath = os.path.join(OUT, 'view-3-printed-no-stones.png'); bpy.ops.render.render(write_still=True)
low('view-6-prongs-low-angle-no-stones.png')
# from inside the ring, looking at the holes
r_ = 54 / (2 * math.pi); d_ = 0.25
loc = HM @ Vector((0, 2.2, -d_)); tgt = HM @ Vector((0, r_, -d_))
z = (loc - tgt).normalized(); up = (HM.to_3x3() @ Vector((0, 0, 1))).normalized(); x = up.cross(z).normalized(); y = z.cross(x)
cam.matrix_world = Matrix((x, y, z)).transposed().to_4x4(); cam.location = loc; cd.lens = 32
L = bpy.data.lights.new('in', 'POINT'); L.energy = 120; L.shadow_soft_size = 0.8; o = bpy.data.objects.new('in', L); sc.collection.objects.link(o); o.location = loc
sc.render.filepath = os.path.join(OUT, 'view-4-inside-holes.png'); bpy.ops.render.render(write_still=True)
