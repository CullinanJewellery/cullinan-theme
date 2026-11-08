# Preview pictures: blender --background --python render.py   (Cycles; colour close to the site's yellow gold)
import bpy, math, os
from mathutils import Vector
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
bpy.ops.wm.read_factory_settings(use_empty=True)
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.samples = 160; sc.cycles.use_denoising = True
sc.render.resolution_x = sc.render.resolution_y = 1400
sc.view_settings.view_transform = 'Standard'; sc.view_settings.look = 'None'
try:
    p = bpy.context.preferences.addons['cycles'].preferences
    p.compute_device_type = 'OPTIX'; p.get_devices()
    for d in p.devices: d.use = True
    sc.cycles.device = 'GPU'
except Exception as e: print('CPU render', e)

def mat(name, f):
    m = bpy.data.materials.new(name); m.use_nodes = True; b = m.node_tree.nodes['Principled BSDF']; f(b); return m
def gold(b):
    b.inputs['Base Color'].default_value = (0.86, 0.60, 0.28, 1); b.inputs['Metallic'].default_value = 1; b.inputs['Roughness'].default_value = 0.14
def stone(b):
    b.inputs['Base Color'].default_value = (1, 1, 1, 1); b.inputs['Transmission Weight'].default_value = 1; b.inputs['IOR'].default_value = 2.42; b.inputs['Roughness'].default_value = 0
def floor(b):
    b.inputs['Base Color'].default_value = (0.96, 0.96, 0.97, 1); b.inputs['Roughness'].default_value = 0.6

def imp(f, m, smooth):
    bpy.ops.wm.stl_import(filepath=os.path.join(OUT, f))
    o = bpy.context.selected_objects[0]; o.rotation_euler = (math.pi/2, 0, 0); o.data.materials.append(m)
    if smooth:
        bpy.context.view_layer.objects.active = o; bpy.ops.object.shade_smooth_by_angle(angle=math.radians(35))
    return o
imp('ring.stl', mat('gold', gold), True)
imp('stone.stl', mat('stone', stone), False)

bpy.ops.mesh.primitive_plane_add(size=600, location=(0, 0, -9.795)); bpy.context.object.data.materials.append(mat('floor', floor))
w = bpy.data.worlds.new('w'); sc.world = w; w.use_nodes = True; w.node_tree.nodes['Background'].inputs[0].default_value = (1, 1, 1, 1); w.node_tree.nodes['Background'].inputs[1].default_value = 0.75

def light(loc, size, power):
    d = bpy.data.lights.new('l', 'AREA'); d.size = size; d.energy = power; o = bpy.data.objects.new('l', d); sc.collection.objects.link(o); o.location = loc
    o.rotation_euler = (Vector((0,0,2)) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
light((35, -30, 55), 40, 26000); light((-45, -10, 25), 20, 5000); light((10, 45, 30), 30, 7000)
# dark cards give the polished metal its contrast
for loc in ((-30, -45, 8), (40, 10, 6)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc); o = bpy.context.object; o.scale = (10, 10, 22)
    o.visible_camera = False; o.visible_shadow = False
    o.data.materials.append(mat('dark', lambda b: b.inputs['Base Color'].__setattr__('default_value', (0.02, 0.015, 0.01, 1))))

cam_d = bpy.data.cameras.new('c'); cam_d.lens = 100; cam = bpy.data.objects.new('c', cam_d); sc.collection.objects.link(cam); sc.camera = cam
def shot(name, loc, target):
    cam.location = loc; cam.rotation_euler = (Vector(target) - Vector(loc)).to_track_quat('-Z', 'Y').to_euler()
    sc.render.filepath = os.path.join(OUT, name); bpy.ops.render.render(write_still=True)
shot('view-1-three-quarter.png', (58, -96, 38), (0, 0, 1.4))
shot('view-2-front.png', (0, -125, 4), (0, 0, 1.4))
shot('view-3-side.png', (125, 0, 6), (0, 0, 1.4))
shot('view-4-head-close.png', (10, -42, 34), (0, 0, 11.5))
