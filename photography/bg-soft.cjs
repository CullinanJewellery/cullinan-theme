/*
  bg-soft.cjs — makes the paper of an AI original exactly ring A's background (251, 251, 253) while keeping the
  AI's whole soft shadow (owner, 2026-11-17: the same background on every picture).

  Why: bg-even.cjs (version 2) decides what is shadow with a flood fill; on ring A's AI original it cut most of the
  long soft shadow and left a ragged end. Here nothing is cut: the paper's own brightness is measured in 64 × 64 cells
  (median of the non-piece pixels), the shadow is removed from that estimate with a wide maximum filter, smoothed,
  and every non-piece pixel is divided by it (a smooth gain, so tile steps go too). Then pixels within 3 levels of
  the target snap to it exactly, pixels 3–7 below blend, and deeper ones (the shadow) keep their depth as neutral grey.
  The piece (coloured or dark pixels, grown by W/400 px) keeps its exact bytes.

  Usage (sharp, NODE_PATH as for check-photo.cjs):  node bg-soft.cjs <in.png> <out.png>
  Order for a new main photo: gold-standard.cjs → bg-soft.cjs → frame-photo.cjs c → check-photo.cjs.
*/
// bg-soft: paper -> 251,251,253 via smooth per-channel gain; shadow kept whole; piece pixels byte-identical.
const sharp=require('sharp');const [inp,out]=process.argv.slice(2);const T=[251,251,253];
(async()=>{
const {data,info}=await sharp(inp).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height,N=W*H;
// piece mask: coloured or dark, dilated
const m=new Uint8Array(N);
for(let i=0;i<N;i++){const r=data[3*i],g=data[3*i+1],b=data[3*i+2];const sp=Math.max(r,g,b)-Math.min(r,g,b);const L=.3*r+.59*g+.11*b;if(sp>12||L<150)m[i]=1;}
const D=Math.round(W/400);let mm=m;for(let k=0;k<D;k++){const n=new Uint8Array(N);for(let y=1;y<H-1;y++)for(let x=1;x<W-1;x++){const i=y*W+x;n[i]=mm[i]|mm[i-1]|mm[i+1]|mm[i-W]|mm[i+W];}mm=n;}
// background estimate at low res: per-cell max-ish (95th pct) of non-piece pixels, then max filter + blur
const S=64,cw=W/S,ch=H/S;const est=[new Float32Array(S*S),new Float32Array(S*S),new Float32Array(S*S)],have=new Uint8Array(S*S);
for(let cy=0;cy<S;cy++)for(let cx=0;cx<S;cx++){const v=[];for(let y=Math.floor(cy*ch);y<Math.floor((cy+1)*ch);y+=2)for(let x=Math.floor(cx*cw);x<Math.floor((cx+1)*cw);x+=2){const i=y*W+x;if(mm[i])continue;v.push(i);}
 if(v.length<20)continue;v.sort((a,b)=>(data[3*a]+data[3*a+1]+data[3*a+2])-(data[3*b]+data[3*b+1]+data[3*b+2]));const j=v[Math.floor(.5*(v.length-1))];for(let c=0;c<3;c++)est[c][cy*S+cx]=data[3*j+c];have[cy*S+cx]=1;}
// max filter radius R cells (removes shadow), filling holes
const R=6;const mx=[0,1,2].map(()=>new Float32Array(S*S));
for(let y=0;y<S;y++)for(let x=0;x<S;x++){let best=-1,bi=-1;for(let dy=-R;dy<=R;dy++)for(let dx=-R;dx<=R;dx++){const yy=y+dy,xx=x+dx;if(yy<0||xx<0||yy>=S||xx>=S)continue;const k=yy*S+xx;if(!have[k])continue;const s=est[0][k]+est[1][k]+est[2][k];if(s>best){best=s;bi=k;}}for(let c=0;c<3;c++)mx[c][y*S+x]=bi>=0?est[c][bi]:T[c];}
// blur 
const bl=a=>{let o=a;for(let p=0;p<3;p++){const n=new Float32Array(S*S);for(let y=0;y<S;y++)for(let x=0;x<S;x++){let s=0,c=0;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const yy=Math.min(S-1,Math.max(0,y+dy)),xx=Math.min(S-1,Math.max(0,x+dx));s+=o[yy*S+xx];c++;}n[y*S+x]=s/c;}o=n;}return o;};
const B=mx.map(bl);
const o=Buffer.from(data);let changedPiece=0;
for(let y=0;y<H;y++){const fy=Math.min(S-1.001,Math.max(0,y/ch-.5)),y0=Math.floor(fy),ty=fy-y0;for(let x=0;x<W;x++){const i=y*W+x;if(mm[i])continue;const fx=Math.min(S-1.001,Math.max(0,x/cw-.5)),x0=Math.floor(fx),tx=fx-x0;
 for(let c=0;c<3;c++){const a=B[c],k=y0*S+x0;const bb=a[k]*(1-tx)*(1-ty)+a[k+1]*tx*(1-ty)+a[k+S]*(1-tx)*ty+a[k+S+1]*tx*ty;
  // shadow depth relative to bg, kept; neutral: use luminance-ish depth
  o[3*i+c]=Math.max(0,Math.min(255,Math.round(data[3*i+c]*T[c]/bb)));}
 // paper snaps to exactly T; shadow (more than 3 below) kept, 3..7 blended so no edge
 const d=(T[0]+T[1]+T[2]-o[3*i]-o[3*i+1]-o[3*i+2])/3;const k=d<=3?1:d>=7?0:(7-d)/4;
 if(k>0){for(let c=0;c<3;c++)o[3*i+c]=Math.round(o[3*i+c]+(T[c]-o[3*i+c])*k);}
 // shadow stays neutral grey: tint as the target's
 else{const L=(o[3*i]+o[3*i+1]+o[3*i+2])/3;const tl=(T[0]+T[1]+T[2])/3;for(let c=0;c<3;c++)o[3*i+c]=Math.max(0,Math.round(L+(T[c]-tl)));}}}
await sharp(o,{raw:info}).png().toFile(out);console.log('done; piece pixels untouched (mask dilated',D,'px)');})();
