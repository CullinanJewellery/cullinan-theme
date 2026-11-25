# v6 openwork channels: paper = where the photo before gold F shows paper (pinkish, G-B small, light), inside the
# frame's openings (Телец template, matched); gold the AI drew (walls, bevels) is kept; crisp at metal edges
import sys,os; sys.path.insert(0,'../pylib'); sys.path.insert(0,'.')
import json,numpy as np,cv2
from wsfix import segment,disc_of,lum,disk,rd,wr
from unitfit import frame_mask   # openwork-frames.py (was v7.py)
GB1,GB0,L0,L1=45.0,25.0,150.0,180.0
def shift_of(a,b,box):
    x0,y0,x1,y1=box; f=lambda im:cv2.GaussianBlur(im[y0:y1,x0:x1].mean(2).astype(np.float32),(0,0),1)
    (dx,dy),_=cv2.phaseCorrelate(f(a),f(b)); return dx,dy
def mv(img,dx,dy):
    M=np.float32([[1,0,dx],[0,1,dy]]); return cv2.warpAffine(img,M,(img.shape[1],img.shape[0]),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)
def paper_w(preY,cur,T,ann,box):
    dx,dy=shift_of(preY,cur,box)
    p=mv(preY.astype(np.float32),dx,dy); gb=p[...,1]-p[...,2]; L=p.mean(2)
    q=np.clip((GB1-gb)/(GB1-GB0),0,1)*np.clip((L-L0)/(L1-L0),0,1)
    q=cv2.GaussianBlur(q,(0,0),1.5)
    Tin=(T>0.5)&(ann>0)
    hard=((q>0.5)&Tin).astype(np.uint8)
    hard=cv2.morphologyEx(hard,cv2.MORPH_OPEN,disk(2))
    n,lab,st,_=cv2.connectedComponentsWithStats(hard,8); sm=st[:,4]<150; sm[0]=False; hard[sm[lab]]=0
    hole=(Tin&(hard==0)).astype(np.uint8); n,lab,st,_=cv2.connectedComponentsWithStats(hole,4)
    edge=cv2.dilate((~Tin).astype(np.uint8),disk(1)).astype(bool)
    touch=np.bincount(lab.ravel(),weights=edge.ravel().astype(float),minlength=n)>0
    fl=(st[:,4]<400)&~touch; fl[0]=False; hard[fl[lab]]=1
    hard=cv2.morphologyEx(hard,cv2.MORPH_CLOSE,disk(2))
    soft=cv2.GaussianBlur(hard.astype(np.float32),(0,0),1.3)
    soft=np.clip((soft-0.5)*1.6+0.5,0,1)          # edge about 2 px wide on the paper/glow side
    Ts=np.clip(T,0,1)
    return np.minimum(soft,Ts)*ann,(dx,dy)
def fix(i,log,inv,outdir='out7',SIG=7.0,LMIN=218.0):
    os.makedirs(outdir,exist_ok=True)
    Pm,A,es,pre=segment(i,log,inv)
    cx,cy,r=disc_of(A); yy,xx=np.mgrid[:A.shape[0],:A.shape[1]]; D=np.sqrt((xx-cx)**2+(yy-cy)**2)
    box=(int(cx-r-20),int(cy-r-20),int(cx+r+20),int(cy+r+20))
    filled=np.zeros((A.shape[0]+2,A.shape[1]+2),np.uint8); solid=(A>0.5).astype(np.uint8).copy()
    cv2.floodFill(solid,filled,(0,0),2); outside=(solid==2)
    ann=((D>r*0.64)&~outside).astype(np.float32)
    central=(D<r*0.66); figure=(D<r*0.62)&(A>=0.9)
    eY=es['жълто'][0]; preY=rd(pre[eY['file']]); curY=rd(eY['out'])
    T,fits,g=frame_mask(curY,(cx,cy,r)); sh=(g,0)
    T=np.clip(T,0,1)*(D<r-12)*(D>r*0.70)
    ew=(es['бяло'] or es['жълто'])[0]; Lw=lum(rd(pre[ew['file']])); Lcw=lum(rd(ew['out']))
    inner=(D<r*0.70)
    mc=(Pm&inner).astype(np.uint8)
    mc=cv2.morphologyEx(mc,cv2.MORPH_OPEN,disk(3))           # no thin slivers of paper in the gold pockets
    n_,lab_,st_,_=cv2.connectedComponentsWithStats(mc,8); ok_=st_[:,4]>=300; ok_[0]=False; mc=ok_[lab_].astype(np.float32)
    wc=np.maximum(cv2.GaussianBlur(mc,(0,0),0.7),mc)*inner
    res=[]
    for k,v in es.items():
        for e in v:
            cur=rd(e['out'])
            wa=T*ann; s=(0.0,0.0)
            w=np.maximum(wa,wc)
            m=(w>0.5).astype(np.float32)
            num=cv2.GaussianBlur(Lw*m,(0,0),SIG); den=cv2.GaussianBlur(m,(0,0),SIG)
            Lf=np.maximum(np.where(den>0.05,num/np.maximum(den,1e-6),Lw),LMIN)
            Lf=np.where(central,Lcw,Lf)
            gg=np.clip(Lf-0.23,0,253); floor=np.stack([gg,gg,gg+2],-1); floor[Lf>=250.5]=[251,251,253]
            out=np.clip(np.round(cur*(1-w[...,None])+floor*w[...,None]),0,255).astype(np.uint8)
            out[figure]=cur[figure]
            o=os.path.join(outdir,os.path.basename(e['out'])); wr(o,out)
            d=np.abs(out.astype(int)-cur.astype(int)).max(2)
            res.append({'i':i,'file':e['file'],'out3':e['out'],'out':o,'shift':[float(s[0]),float(s[1])],'tshift':[float(sh[0]),float(sh[1])],'changed':int((d>2).sum()),'figure_changed':int((d[figure]>0).sum())})
            if k=='жълто': np.save(f'{outdir}/{i:03d}_w.npy',(w*255).astype(np.uint8))
    return res
if __name__=='__main__':
    log=json.load(open(sys.argv[1],encoding='utf-8')); inv=json.load(open('inv.json',encoding='utf-8'))
    allr=[]
    for i in [int(x) for x in sys.argv[2].split(',')]:
        r=fix(i,log,inv); allr+=r; print(i,[(x['changed'],x['figure_changed']) for x in r],flush=True)
    json.dump(allr,open(sys.argv[3],'w',encoding='utf-8'),ensure_ascii=False,indent=0)
