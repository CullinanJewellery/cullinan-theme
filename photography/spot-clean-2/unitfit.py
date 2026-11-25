# frame openings from one consensus Greek-key unit (median of Телец's 8 units), placed on each unit of each piece
# by matching its edges to the photo's edges, in polar coordinates; back to the photo with smooth (antialiased) edges
import sys,json; sys.path.insert(0,'../pylib'); sys.path.insert(0,'.')
import numpy as np,cv2
from wsfix import lum
NA=7200; U=NA//8; R0,R1=300,485
med=np.load('unit_med.npz')['a']; al0=np.load('unit_al.npy')
um=cv2.GaussianBlur(med.astype(np.float32),(0,0),2.0); um=(um>0.5).astype(np.float32)
# soften to an antialiased shape (1 px ramp)
um=cv2.GaussianBlur(um,(0,0),0.8)
def place(s,t,k):
    can=np.zeros((NA,R1-R0),np.float32)
    rows=(k*U - s + np.arange(U))%NA
    sh=np.roll(um,-t,1)
    can[rows]=sh
    return can
def frame_mask(cur,c,search=14,tsearch=4):
    cx,cy,r=c
    L=cv2.GaussianBlur(lum(cur),(0,0),1.0); G=np.hypot(cv2.Sobel(L,cv2.CV_32F,1,0),cv2.Sobel(L,cv2.CV_32F,0,1))
    Gp=cv2.warpPolar(G,(R1,NA),(cx,cy),R1,cv2.WARP_POLAR_LINEAR)[:,R0:R1]
    full=np.zeros((NA,R1-R0),np.float32); fits=[]
    # global phase first: the unit grid may sit at another angle on this piece
    bestg=(-1,0)
    for g in range(-60,61,2):
        sc=0
        for k in range(8):
            e=np.abs(cv2.Sobel(place(int(al0[k][0])+g,int(al0[k][1]),k),cv2.CV_32F,0,1))+np.abs(cv2.Sobel(place(int(al0[k][0])+g,int(al0[k][1]),k),cv2.CV_32F,1,0))
            sc+=float((e*Gp).sum())
        if sc>bestg[0]: bestg=(sc,g)
    g=bestg[1]
    for k in range(8):
        s0,t0=int(al0[k][0])+g,int(al0[k][1]); best=(-1,s0,t0)
        for s in range(s0-search,s0+search+1):
            for t in range(t0-tsearch,t0+tsearch+1):
                p=place(s,t,k); e=np.abs(cv2.Sobel(p,cv2.CV_32F,0,1))+np.abs(cv2.Sobel(p,cv2.CV_32F,1,0))
                sc=float((e*Gp).sum())
                if sc>best[0]: best=(sc,s,t)
        fits.append(best[1:]); full=np.maximum(full,place(best[1],best[2],k))
    canvas=np.zeros((NA,R1),np.float32); canvas[:,R0:R1]=full
    M=cv2.warpPolar(canvas,(cur.shape[1],cur.shape[0]),(cx,cy),R1,cv2.WARP_POLAR_LINEAR|cv2.WARP_INVERSE_MAP|cv2.INTER_LINEAR)
    return M,fits,g
