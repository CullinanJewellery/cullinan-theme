/*
  rhodium-to-gold.cjs — turns a white (rhodium) area the model drew where the real piece is gold into yellow gold at
  212, 172, 104, keeping its own light and shade. The area is a smooth closed curve through the points given (fractions
  of the photo) with a soft edge, so no straight cut shows (owner, 2026-10-30, Virgin Mary: under the chin and the robe
  fold beside it; "do it more smoothly, not just a straight cut").
  Usage: node rhodium-to-gold.cjs <in.png> <out.png> "x,y x,y ..." [feather px, default 4]
*/
// white rhodium pixels inside a SMOOTH closed curve (Catmull-Rom through the points), soft edge, become yellow gold
const sharp=require('sharp');const [src,out,poly,feather]=process.argv.slice(2);(async()=>{
const A=await sharp(src).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=A.info.width,H=A.info.height;
const P=poly.split(' ').map(p=>p.split(',').map(Number)).map(([x,y])=>[x*W,y*H]);const n=P.length;let d=`M${P[0][0]},${P[0][1]}`;
for(let i=0;i<n;i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];d+=` C${p1[0]+(p2[0]-p0[0])/6},${p1[1]+(p2[1]-p0[1])/6} ${p2[0]-(p3[0]-p1[0])/6},${p2[1]-(p3[1]-p1[1])/6} ${p2[0]},${p2[1]}`;}
const svg=`<svg width="${W}" height="${H}"><rect width="100%" height="100%" fill="black"/><path d="${d} Z" fill="white"/></svg>`;
const M=await sharp(Buffer.from(svg)).blur(+feather||4).greyscale().raw().toBuffer();
const T=[212,172,104],TL=0.3*212+0.59*172+0.11*104,off=T.map(v=>v-TL);const o=Buffer.from(A.data);let c=0;
for(let i=0;i<W*H;i++){const m=M[i]/255;if(m<0.01)continue;const k=i*3,r=A.data[k],g=A.data[k+1],b=A.data[k+2];const mx=Math.max(r,g,b),s=mx?(mx-Math.min(r,g,b))/mx:0;
const w=m*(s<0.12?1:s<0.2?(0.2-s)/0.08:0);if(!w)continue;c++;const L0=0.3*r+0.59*g+0.11*b;const L=Math.max(40,Math.min(250,TL+12+(L0-225)*1.8));
for(let j=0;j<3;j++){const nv=Math.max(0,Math.min(255,L+off[j]*Math.min(1,L/TL)));o[k+j]=Math.round(A.data[k+j]*(1-w)+nv*w);}}
await sharp(o,{raw:{width:W,height:H,channels:3}}).png().toFile(out);console.log('changed',c);})();
