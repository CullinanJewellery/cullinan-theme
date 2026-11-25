# openwork channels: paper the gold F step painted gold is found by watershed (sure-paper vs sure-metal seeds,
# boundary on the wall edges) and rebuilt as neutral paper with the approved AI photo's smoothed light; all metals
import sys, os; sys.path.insert(0,'.'); sys.path.insert(0,'../pylib')
import json,numpy as np,cv2
from comp import rd, wr
def disk(r): return cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(2*r+1,2*r+1))
def lum(a): a=a.astype(np.float32); return 0.299*a[...,0]+0.587*a[...,1]+0.114*a[...,2]
def chroma(a): return a.max(2).astype(np.int16)-a.min(2)
def disc_of(A):
    m=(A>0.5).astype(np.uint8); cs,_=cv2.findContours(m,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_NONE)
    c=max(cs,key=cv2.contourArea)[:,0,:].astype(np.float64); ys=c[:,1]; c=c[ys>ys.min()+0.3*(ys.max()-ys.min())]
    x,y=c[:,0],c[:,1]; M=np.c_[2*x,2*y,np.ones(len(x))]; b=x*x+y*y
    (cx,cy,k),*_=np.linalg.lstsq(M,b,rcond=None); return cx,cy,np.sqrt(k+cx*cx+cy*cy)
SPUR,SPA,SPF=3,260,0.4
RIM=13
USE_TMPL=True
def segment(i, log, inv, P=None):
    pre={r['file']:r['pre'] for r in inv}
    es={m:[e for e in log if e.get('i')==i and 'out' in e and m in e['out']] for m in ['жълто','бяло','розово','сребро']}
    A=np.load(f'out3/{i:03d}_A.npy').astype(np.float32)/255
    eY=es['жълто'][0]; curY=rd(eY['out']); preY=rd(pre[eY['file']])
    J=chroma(curY)-chroma(preY)
    if es['розово'] and pre.get(es['розово'][0]['file']):
        eR=es['розово'][0]; J=np.maximum(J,chroma(rd(eR['out']))-chroma(rd(pre[eR['file']])))
    cx,cy,r=disc_of(A); yy,xx=np.mgrid[:A.shape[0],:A.shape[1]]; D=np.sqrt((xx-cx)**2+(yy-cy)**2)
    inside=D<r-2
    Lp=lum(preY); chY=chroma(curY)
    paper=((J>35)&(Lp>140)&inside).astype(np.uint8); paper=cv2.erode(paper,disk(1))
    n,lab,st,_=cv2.connectedComponentsWithStats(paper,8); k=st[:,4]>=20; k[0]=False; paper=k[lab]
    # channel floors of the key: the 12 openwork zodiacs share one frame (made from the approved Libra); Телец's
    # verified channels (tmpl34.npy), shrunk, are sure paper; the frame away from them is sure metal
    T=np.load('tmpl34.npz')['a'].astype(np.uint8)
    floorseed=cv2.erode(T,disk(4)).astype(bool)&inside
    ann=(D<r-5)&(D>r*0.66)
    frame_metal=ann&~cv2.dilate(T,disk(5)).astype(bool)&(A>0.5)
    filled=np.zeros((A.shape[0]+2,A.shape[1]+2),np.uint8); solid=(A>0.5).astype(np.uint8).copy()
    cv2.floodFill(solid,filled,(0,0),2); outside=(solid==2)              # paper connected to the photo's edge
    dout=cv2.distanceTransform((~outside).astype(np.uint8),cv2.DIST_L2,3)
    rimband=(~outside)&(dout<=RIM-3)&(D>r*0.8)
    frame_metal|=rimband&(A>0.5)                              # the outer rim stays whole (follows the real outline)
    globals()['_dbg']=None
    paper&=~frame_metal                                      # glow seeds never on the frame's face
    paper|=floorseed
    paper|=(A<0.05)                                         # paper already cleaned by v3
    metal=(((J<0)&(chY>40)&~floorseed)|((chY<12)&(A>0.6)&(Lp<235)))&~paper   # real gold (lost colour in F), rhodium figure
    metal=cv2.erode(metal.astype(np.uint8),disk(2)).astype(bool)
    metal|=~inside&(A>0.5)                                  # bail and the outer rim: never paper here
    metal|=frame_metal
    mk=np.zeros(A.shape,np.int32); mk[metal]=1; mk[paper]=2
    g=cv2.cvtColor(curY,cv2.COLOR_RGB2BGR)
    # watershed on a slightly smoothed image so texture noise does not cut the regions
    ws=cv2.watershed(cv2.GaussianBlur(g,(0,0),0.8),mk.copy())
    Pm=(ws==2)&inside&(A>=0.3)&~rimband
    central=D<r*0.62
    Pm&=~(central&(A>=0.9))                                  # the figure itself is never touched (only its halo)
    Pm=cv2.morphologyEx(Pm.astype(np.uint8),cv2.MORPH_OPEN,disk(1)).astype(bool)
    # gold flecks left inside the openings: metal islands not joined to the frame or the figure become paper
    met=((A>=0.3)&~Pm).astype(np.uint8)
    n,lab,st,_=cv2.connectedComponentsWithStats(met,8)
    isl=(st[:,4]<600); isl[0]=False
    Pm|=isl[lab]&inside&~central
    # thin spurs (1-3 px gold hairs pointing into the paper): opened away, but only where the image is floor-coloured
    met=((A>=0.3)&~Pm).astype(np.uint8); op=cv2.morphologyEx(met,cv2.MORPH_OPEN,disk(SPUR)).astype(bool)
    spur=met.astype(bool)&~op&inside
    n,lab,st,_=cv2.connectedComponentsWithStats(spur.astype(np.uint8),8)
    nearP=cv2.dilate(Pm.astype(np.uint8),disk(1)).astype(bool)
    frac=np.bincount(lab.ravel(),weights=(nearP&spur).ravel().astype(float),minlength=n)/np.maximum(st[:,4],1)
    ok=(st[:,4]<SPA)&(frac>SPF); ok[0]=False
    Pm|=ok[lab]&~(central&(A>=0.9))
    # clean outline: the watershed edge follows texture; a light blur and threshold rounds its teeth
    Pm=(cv2.GaussianBlur(Pm.astype(np.float32),(0,0),1.6)>0.5)&inside&(A>=0.3)&~(central&(A>=0.9))
    if USE_TMPL:
        # the frame's channels: the cleaned Телец template, moved onto this piece by matching the wall edges
        TC=np.load('tmplC.npz')['a']; g0=np.load('tmplC_geom.npy')
        Lg=cv2.GaussianBlur(lum(curY),(0,0),1.0); G=np.hypot(cv2.Sobel(Lg,cv2.CV_32F,1,0),cv2.Sobel(Lg,cv2.CV_32F,0,1))
        E=cv2.morphologyEx(TC,cv2.MORPH_GRADIENT,np.ones((3,3),np.uint8)).astype(np.float32)
        base=(int(round(cx-g0[0])),int(round(cy-g0[1]))); best=(-1,0,0)
        for dy in range(-6,7):
            for dx in range(-6,7):
                M=np.float32([[1,0,base[0]+dx],[0,1,base[1]+dy]]); Es=cv2.warpAffine(E,M,(A.shape[1],A.shape[0]))
                sc=float((Es*G).sum())
                if sc>best[0]: best=(sc,base[0]+dx,base[1]+dy)
        M=np.float32([[1,0,best[1]],[0,1,best[2]]])
        Ts=cv2.warpAffine(TC,M,(A.shape[1],A.shape[0]),flags=cv2.INTER_NEAREST).astype(bool)
        globals()['_shift']=best[1:]
        annT=(D>r*0.64)
        Pm=(Pm&~annT)|(Ts&annT&(A>=0.3)&~rimband)
    for _ in range(2):
        met=((A>=0.3)&~Pm).astype(np.uint8); op=cv2.morphologyEx(met,cv2.MORPH_OPEN,disk(SPUR)).astype(bool)
        spur=met.astype(bool)&~op&inside
        n,lab,st,_=cv2.connectedComponentsWithStats(spur.astype(np.uint8),8)
        nearP=cv2.dilate(Pm.astype(np.uint8),disk(1)).astype(bool)
        frac=np.bincount(lab.ravel(),weights=(nearP&spur).ravel().astype(float),minlength=n)/np.maximum(st[:,4],1)
        ok=(st[:,4]<SPA)&(frac>SPF); ok[0]=False; Pm|=ok[lab]
    return Pm, A, es, pre
def fix(i, log, inv, outdir='out4', SIG=7.0, LMIN=218.0):
    os.makedirs(outdir,exist_ok=True)
    Pm,A,es,pre=segment(i,log,inv)
    ew=(es['бяло'] or es['жълто'])[0]; Lw=lum(rd(pre[ew['file']]))
    m=Pm.astype(np.float32)
    num=cv2.GaussianBlur(Lw*m,(0,0),SIG); den=cv2.GaussianBlur(m,(0,0),SIG)
    Lf=np.where(den>0.05,num/np.maximum(den,1e-6),Lw)
    Lf=np.maximum(Lf,LMIN)                                   # paper seen through a hole is light (owner's piece)
    # inside the big central opening (round the figure) the white photo's own light is kept: same shadow, no gold glow
    A_=A; cx,cy,r=disc_of(A_); yy,xx=np.mgrid[:A_.shape[0],:A_.shape[1]]; Dd=np.sqrt((xx-cx)**2+(yy-cy)**2)
    central=Dd<r*0.66
    ewo=(es['бяло'] or es['жълто'])[0]; Lcw=lum(rd(ewo['out']))
    Lf=np.where(central,Lcw,Lf)
    figure=(Dd<r*0.62)&(A>=0.9)
    gg=np.clip(Lf-0.23,0,253); floor=np.stack([gg,gg,gg+2],-1); floor[Lf>=250.5]=[251,251,253]
    w=np.maximum(cv2.GaussianBlur(m,(0,0),0.7),m)[...,None]
    res=[]
    for k,v in es.items():
        for e in v:
            cur=rd(e['out']); out=np.clip(np.round(cur*(1-w)+floor*w),0,255).astype(np.uint8)
            out[figure]=cur[figure]                         # the figure keeps its exact bytes
            o=os.path.join(outdir,os.path.basename(e['out'])); wr(o,out)
            d=np.abs(out.astype(int)-cur.astype(int)).max(2)
            res.append({'i':i,'file':e['file'],'out3':e['out'],'out':o,'changed':int((d>2).sum()),'figure_changed':int((d[figure]>0).sum())})
    np.save(f'{outdir}/{i:03d}_P.npy',Pm)
    return res
if __name__=='__main__':
    log=json.load(open(sys.argv[1],encoding='utf-8')); inv=json.load(open('inv.json',encoding='utf-8'))
    allr=[]
    for i in [int(x) for x in sys.argv[2].split(',')]:
        r=fix(i,log,inv); allr+=r; print(i,[x['changed'] for x in r],flush=True)
    json.dump(allr,open(sys.argv[3],'w',encoding='utf-8'),ensure_ascii=False,indent=0)
