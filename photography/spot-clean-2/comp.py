# composite: current metal inside the matte, neutralised clean background from a reference photo outside
import sys; S=r'C:/Users/NITROV~1/AppData/Local/Temp/claude/7109541ebf6a848d/c1300a2b-db77-4090-b592-c50fe61888a1/scratchpad/'
sys.path.insert(0,S+'pylib2'); sys.path.insert(1,S+'pylib')
import numpy as np, cv2, json
_s={}
def rd(p):
    a=cv2.imdecode(np.fromfile(p,np.uint8),cv2.IMREAD_COLOR); return a[:,:,::-1].copy()
def wr(p,a): cv2.imencode('.png',np.ascontiguousarray(a[:,:,::-1]))[1].tofile(p)
def matte(img,model='birefnet-general'):
    from rembg import new_session, remove; from PIL import Image
    if model not in _s:
        import onnxruntime as ort
        try: ort.preload_dlls()
        except Exception as e: print('preload',e)
        _s[model]=new_session(model,providers=['CPUExecutionProvider'])
        print('providers',_s[model].inner_session.get_providers(),flush=True)
    return np.asarray(remove(Image.fromarray(img),session=_s[model],only_mask=True)).astype(np.float32)/255
def neutral(bg):
    b=bg.astype(np.float32); L=0.299*b[...,0]+0.587*b[...,1]+0.114*b[...,2]
    g=np.clip(L-0.23,0,253); o=np.stack([g,g,g+2],-1)   # r=g, b=g+2 at the same luminance
    o[L>=250.5]=[251,251,253]; return o
def composite(cur,ref,al,grow=0):
    a=al.copy()
    if grow: a=cv2.dilate(a,np.ones((2*grow+1,)*2,np.uint8))
    a=a[...,None]; out=cur.astype(np.float32)*a+neutral(ref)*(1-a)
    return np.clip(np.round(out),0,255).astype(np.uint8)
