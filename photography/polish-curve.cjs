/*
  polish-curve.cjs — deepens the polish of yellow gold when a photo is flatter than ring A (owner's OK, 2026-10-20,
  ring G: "use the stronger one"). A tone curve on gold pixels only, around the gold's own mid tone: highlights a
  little brighter, dark mirror bands a little deeper. Per pixel, no spatial filter, so nothing new is drawn (the
  2026-10-15 local-contrast test that the owner rejected used one, lesson 38). Stones, background and shadow are not
  gold and do not change. Run gold-match.cjs --target 208,165,113 after it; aim for the checker's shine at least 212.
  Usage (needs sharp, NODE_PATH as for check-photo.cjs): node polish-curve.cjs <in.png> <out.png> [strength 0.4]
*/

const sharp=require('sharp');const [src,dst,amtS]=process.argv.slice(2);const A=+(amtS||0.4);
(async()=>{const {data,info}=await sharp(src).removeAlpha().raw().toBuffer({resolveWithObject:true});const o=Buffer.from(data);
const lum=(r,g,b)=>0.3*r+0.59*g+0.11*b;const w=(r,b)=>Math.min(1,Math.max(0,(r-b-25)/25));
// mid tone of the gold
let s=0,n=0;for(let p=0;p<data.length;p+=3){if(data[p]-data[p+2]>45){s+=lum(data[p],data[p+1],data[p+2]);n++;}}const M=s/n;
for(let p=0;p<data.length;p+=3){const r=data[p],g=data[p+1],b=data[p+2],ww=w(r,b);if(!ww)continue;const L=lum(r,g,b);
 // smooth S-curve around M: x in [-1,1]
 const x=L>=M?(L-M)/(255-M):(L-M)/M; const y=x+A*Math.sin(Math.PI*x)*(x>=0?0.5:0.6)*Math.sign(x)*Math.sign(x)*(x>=0?1:1);
 const y2=Math.max(-1,Math.min(1,x+A*Math.sin(Math.PI*Math.abs(x))*Math.sign(x)*0.5));
 const L2=y2>=0?M+y2*(255-M):M+y2*M; const k=L?L2/L:1;
 for(let c=0;c<3;c++){const v=data[p+c]*k; o[p+c]=Math.max(0,Math.min(255,Math.round(data[p+c]+ww*(v-data[p+c]))));}}
await sharp(o,{raw:{width:info.width,height:info.height,channels:3}}).png().toFile(dst);console.log('mid',M.toFixed(0));})();
