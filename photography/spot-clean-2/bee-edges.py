# bee: crisp edges in the wing cells and the gaps; metal found from the yellow photo's own colour (gold vs neutral
# paper), the paper next to the metal continued from the paper a few px away (no smudges); rhodium body untouched
import sys,json,os; sys.path.insert(0,'../pylib'); sys.path.insert(0,'.')
import numpy as np,cv2
from comp import rd,wr
def disk(r): return cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*r+1,2*r+1))
def lum(a): a=a.astype(np.float32); return 0.299*a[...,0]+0.587*a[...,1]+0.114*a[...,2]
C0,C1=float(sys.argv[2]) if len(sys.argv)>2 else 14.0, float(sys.argv[3]) if len(sys.argv)>3 else 40.0
i=46; outdir=sys.argv[1] if len(sys.argv)>1 else 'outbee'; os.makedirs(outdir,exist_ok=True)
log=json.load(open('v3_log_part1.json',encoding='utf-8'))
es=[x for x in log if x.get('i')==i]
eY=[e for e in es if 'жълто' in e['out']][0]
Y=rd(eY['file']).astype(np.float32)
A=np.load(f'out3/{i:03d}_A.npy').astype(np.float32)/255
ch=Y.max(2)-Y.min(2)
al=np.clip((ch-C0)/(C1-C0),0,1)
# rhodium body and collar: neutral metal inside the matte; it and a band round it stay as they are
rh=((A>0.97)&(ch<20)&(lum(Y)>120)).astype(np.uint8)
n,lab,st,_=cv2.connectedComponentsWithStats(rh,8); big=st[:,4]>3000; big[0]=False; rh=big[lab].astype(np.uint8)
keep=cv2.dilate(rh,disk(8)).astype(bool)
zone=(A<0.995)&(A>0.0)|(cv2.dilate((A>0.02).astype(np.uint8),disk(4)).astype(bool)&(A<0.995))
zone&=~keep
hard=(al>0.5).astype(np.uint8)
# specks: tiny gold bits floating in paper (chroma noise) are not metal
n,lab,st,_=cv2.connectedComponentsWithStats(hard,8); sm=st[:,4]<40; sm[0]=False
al[sm[lab]]=0
al=np.maximum(al,np.clip((A-0.85)/0.1,0,1))      # inside the matte (shine on the metal) stays metal
res=[]
for e in es:
    cur=rd(e['file']).astype(np.float32); v3=rd(e['out']).astype(np.float32)
    far=(cv2.dilate((al>0.05).astype(np.uint8),disk(3))==0)&(A<0.5)
    Lv=lum(v3); m=far.astype(np.float32)
    num=cv2.GaussianBlur(Lv*m,(0,0),3); den=cv2.GaussianBlur(m,(0,0),3)
    num2=cv2.GaussianBlur(Lv*m,(0,0),8); den2=cv2.GaussianBlur(m,(0,0),8)
    Lf=np.where(den>0.2,num/np.maximum(den,1e-6),np.where(den2>0.02,num2/np.maximum(den2,1e-6),Lv))
    gg=np.clip(Lf-0.23,0,253); floor=np.stack([gg,gg,gg+2],-1); floor[Lf>=250.5]=[251,251,253]
    a=al[...,None]
    new=a*cur+(1-a)*floor
    out=np.where(zone[...,None],new,v3)
    out=np.clip(np.round(out),0,255).astype(np.uint8)
    o=os.path.join(outdir,os.path.basename(e['out'])); wr(o,out)
    d=np.abs(out.astype(int)-v3.astype(int)).max(2)
    res.append({'file':e['file'],'out':o,'changed_vs_v3':int((d>2).sum()),'rh_changed':int((d[rh>0]>0).sum())})
print(res and [(r['changed_vs_v3'],r['rh_changed']) for r in res])
json.dump(res,open(f'{outdir}/log.json','w',encoding='utf-8'),ensure_ascii=False)
