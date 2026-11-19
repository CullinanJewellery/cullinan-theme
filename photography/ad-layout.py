import sys; sys.path.insert(0, r'C:/Users/NITROV~1/AppData/Local/Temp/claude/7109541ebf6a848d/c1300a2b-db77-4090-b592-c50fe61888a1/scratchpad/pylib')
from PIL import Image, ImageFilter
import numpy as np
R=r'C:/Users/Nitro V/Pictures/PicturesForWebFaceInstagram/pictures for the website/25 Комплект цвете - номер предстои/'
O=r'C:/Users/NITROV~1/AppData/Local/Temp/claude/7109541ebf6a848d/c1300a2b-db77-4090-b592-c50fe61888a1/scratchpad/ads2/'
def cut(path):
    im=Image.open(path).convert('RGB'); a=np.asarray(im).astype(float)
    mx=a.max(2); mn=a.min(2); sat=(mx-mn)/(mx+1)
    m=(sat>0.16)|(mx<120)
    m=Image.fromarray((m*255).astype('uint8')).filter(ImageFilter.MedianFilter(5)).filter(ImageFilter.GaussianBlur(1.2))
    rgba=im.copy(); rgba.putalpha(m); return rgba
def bbox_cols(rgba,x0,x1):
    a=np.asarray(rgba)[:,:,3]; sub=a[:,x0:x1]>128
    ys=np.where(sub.any(1))[0]; xs=np.where(sub.any(0))[0]
    return (x0+xs[0],ys[0],x0+xs[-1]+1,ys[-1]+1)
for stone in ['червен','зелен']:
    p=cut(R+f'Висулка - {stone} камък/жълто злато/01 основна снимка - жълто злато.png')
    e=cut(R+f'Обеци - {stone} камък/жълто злато/01 основна снимка - жълто злато.png')
    pb=bbox_cols(p,300,1800); p=p.crop(pb)
    eb=bbox_cols(e,1060,2000); e=e.crop(eb)   # right stud, face on
    # flower width of the pendant = its full width (petals); stud width = its width
    W,H=2048,2560; target_stud=600; scale_e=target_stud/e.width; e2=e.resize((round(e.width*scale_e),round(e.height*scale_e)),Image.LANCZOS)
    scale_p=(target_stud*1.3)/p.width; p2=p.resize((round(p.width*scale_p),round(p.height*scale_p)),Image.LANCZOS)
    can=Image.new('RGB',(W,H),(205,205,205))
    px=(W-p2.width)//2; py=560; can.paste(p2,(px,py),p2)
    ey=py+p2.height+110; gap=150
    can.paste(e2,(W//2-gap//2-e2.width,ey),e2)
    e3=e2.rotate(12,resample=Image.BICUBIC,expand=True); can.paste(e3,(W//2+gap//2,ey-(e3.height-e2.height)//2),e3)
    can.save(O+f'layout-{stone}.png'); print(stone,p.size,e.size,p2.size,e2.size,ey+e2.height)
