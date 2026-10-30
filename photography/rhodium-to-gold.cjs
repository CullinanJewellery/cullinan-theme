/*
  rhodium-to-gold.cjs — turns a white (rhodium) area inside a polygon into yellow gold at 212, 172, 104, keeping its
  own light and shade (owner, 2026-10-30: the part under the Virgin Mary's chin is gold on the real medallion; the model
  drew it white). Only nearly colourless pixels inside the polygon change; gold around it stays.
  Usage: node rhodium-to-gold.cjs <in.png> <out.png> "x,y x,y ..."   (polygon corners as fractions of the photo)
*/
// turns white (rhodium) pixels inside a polygon into yellow gold at 212,172,104, keeping their light and shade
const sharp=require('sharp');const [src,out,poly]=process.argv.slice(2);(async()=>{
const A=await sharp(src).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=A.info.width,H=A.info.height;const P=poly.split(' ').map(p=>p.split(',').map(Number));
const inside=(x,y)=>{let c=false;for(let i=0,j=P.length-1;i<P.length;j=i++){const[xi,yi]=P[i],[xj,yj]=P[j];if(((yi>y)!=(yj>y))&&(x<(xj-xi)*(y-yi)/(yj-yi)+xi))c=!c;}return c;};
const T=[212,172,104],TL=0.3*212+0.59*172+0.11*104,off=T.map(v=>v-TL);const d=Buffer.from(A.data);let n=0;
for(let y=0;y<H;y++)for(let x=0;x<W;x++){if(!inside(x/W,y/H))continue;const i=(y*W+x)*3,r=A.data[i],g=A.data[i+1],b=A.data[i+2];const mx=Math.max(r,g,b),s=mx?(mx-Math.min(r,g,b))/mx:0;
const w=s<0.12?1:s<0.2?(0.2-s)/0.08:0;if(!w)continue;n++;const L0=0.3*r+0.59*g+0.11*b;const L=Math.max(40,Math.min(250,TL+12+(L0-225)*1.8));const nv=off.map(o=>Math.max(0,Math.min(255,L+o*Math.min(1,L/TL))));for(let k=0;k<3;k++)d[i+k]=Math.round(A.data[i+k]*(1-w)+nv[k]*w);}
await sharp(d,{raw:{width:W,height:H,channels:3}}).png().toFile(out);console.log('changed',n);})();
