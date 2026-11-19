import sys; sys.path.insert(0, r'C:/Users/NITROV~1/AppData/Local/Temp/claude/7109541ebf6a848d/c1300a2b-db77-4090-b592-c50fe61888a1/scratchpad/pylib')
from PIL import Image, ImageFilter, ImageChops
import numpy as np
pairs=[('v0.png','k0.png','h0.png','layout12-червен.png','0'),('v1.png','k1.png','h1.png','layout12-зелен.png','1')]
diffs=[]
for v,k,h,lay,n in pairs:
    V=Image.open(v).convert('RGB'); W,H=V.size
    L=np.asarray(Image.open(lay).convert('HSV'))[:,:,1]>25
    m=Image.fromarray((L*255).astype('uint8')).resize((W,H))
    m=m.filter(ImageFilter.MaxFilter(9)).resize((W//8,H//8)).filter(ImageFilter.MaxFilter(61)).resize((W,H))
    a=np.asarray(m)>128
    a[:int(0.33*H),int(0.3*W):int(0.62*W)]=True
    A=np.asarray(V,dtype=int); r,g,b=A[:,:,0],A[:,:,1],A[:,:,2]
    hsv=np.asarray(V.convert('HSV'),dtype=int)
    gold=(r-b>45)&(r>90)
    stone=(hsv[:,:,1]>75)&((hsv[:,:,0]<15)|(hsv[:,:,0]>225)|((hsv[:,:,0]>75)&(hsv[:,:,0]<135)))&(np.abs(r-g)>40)
    pc=Image.fromarray(((gold|stone)*255).astype('uint8')).filter(ImageFilter.MaxFilter(15))
    a=a&(np.asarray(pc)>0)
    if n=='0': a[3850:,3100:]=False
    # only where the edit actually differs (gold/stones), soft edge
    mm=Image.fromarray((a*255).astype('uint8')).filter(ImageFilter.GaussianBlur(20))
    for src,tag in ((k,'f'),(h,'fh')):
        S=Image.open(src).convert('RGB')
        Image.composite(S,V,mm).save(f'{tag}{n}.png')
    d=np.abs(np.asarray(Image.open(f'f{n}.png'),dtype=int)-np.asarray(V,dtype=int)).sum(2)>12
    diffs.append(Image.fromarray((d*255).astype('uint8')).resize((W//8,H//8)))
D=Image.new('L',(diffs[0].width*2+20,diffs[0].height),128)
D.paste(diffs[0],(0,0)); D.paste(diffs[1],(diffs[0].width+20,0)); D.save('diffs.png')
