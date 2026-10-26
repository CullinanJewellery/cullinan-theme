/*
  wall-lines.cjs — removes the thin dark lines a flat openwork piece shows along its cut-outs (the metal's side walls in
  shadow), by filling each dark pixel on the gold with the mean of the gold face round it. Colour only: nothing moves,
  the white rhodium parts (cool greys), the background and the shadow outside the piece are skipped. Owner, 2026-10-26
  (Libra openwork pendant): "the shadows down on the circle I don't want them … try to remove it with the free thing".
  Usage (needs sharp, NODE_PATH as for check-photo.cjs), on the framed photo, then gold-match.cjs:
    node wall-lines.cjs <in.png> <out.png> <y0 fraction: start below the bail> [radius 10] [Lmax 150] [face share 0.5]
  Libra: pass 1  0.31 10 150      (the lines)
         pass 2  0.31 6 150 0.12  (dark dots left along the outer edge)
  The bail is excluded (above y0): its dark band is its polish, not a wall.
*/
const s=require('sharp');const [i,o,y0s,rs,ls,fs]=process.argv.slice(2);const FR=+(fs||0.5);const R=+(rs||10),LM=+(ls||150);
(async()=>{const {data,info}=await s(i).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height;
const L=new Float32Array(W*H),face=new Uint8Array(W*H);
for(let j=0;j<W*H;j++){const p=j*3,r=data[p],g=data[p+1],b=data[p+2];L[j]=0.3*r+0.59*g+0.11*b;
 face[j]=(L[j]>=LM&&L[j]<245&&r>=g&&g>=b&&(r-b)/r>0.25)?1:0;}
// integral images of face colour for fast box means
const N=(W+1)*(H+1),S=[new Float64Array(N),new Float64Array(N),new Float64Array(N)],C=new Float64Array(N);
for(let y=0;y<H;y++)for(let x=0;x<W;x++){const j=y*W+x,q=(y+1)*(W+1)+x+1;for(let c=0;c<3;c++)S[c][q]=S[c][q-1]+S[c][q-W-1]-S[c][q-W-2]+(face[j]?data[j*3+c]:0);C[q]=C[q-1]+C[q-W-1]-C[q-W-2]+face[j];}
const box=(A,x0,y0,x1,y1)=>A[(y1+1)*(W+1)+x1+1]-A[y0*(W+1)+x1+1]-A[(y1+1)*(W+1)+x0]+A[y0*(W+1)+x0];
const out=Buffer.from(data);let n=0;const Y0=Math.round(+y0s*H);
for(let y=Y0;y<H;y++)for(let x=0;x<W;x++){const j=y*W+x,p=j*3,r=data[p],g=data[p+1],b=data[p+2];
 if(L[j]>=LM||b>g+2)continue; // dark, not cool grey (scales, shadow)
 const x0=Math.max(0,x-R),x1=Math.min(W-1,x+R),y0=Math.max(0,y-R),y1=Math.min(H-1,y+R);const cnt=box(C,x0,y0,x1,y1);
 if(cnt<R*R*FR)continue; // not on the gold
 const w=Math.min(1,(LM-L[j])/15);for(let c=0;c<3;c++)out[p+c]=Math.round(data[p+c]+w*(box(S[c],x0,y0,x1,y1)/cnt-data[p+c]));n++;}
await s(out,{raw:{width:W,height:H,channels:3}}).png().toFile(o);console.log('changed',n)})();
