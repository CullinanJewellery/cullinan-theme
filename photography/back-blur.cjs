/* photography/back-blur.cjs: soft depth of field on the back of a lying bracelet (owner, 2026-11-12:
   blur the back so the end beads, which the model made plainer than the front ones, cannot be compared).
   Finds the top of the piece (first row with coloured pixels), blurs fully from there to +FULL px,
   then fades to sharp by +FADE px, like a lens focused on the motif. Only a blur: nothing is redrawn.
   Usage: node back-blur.cjs <in.png> <out.png> [--sigma 4.5] [--full 160] [--fade 560] */
const sharp=require('sharp');
const a=process.argv.slice(2);const [inp,out]=a;const opt=k=>{const i=a.indexOf('--'+k);return i>0?+a[i+1]:null};
const SIG=opt('sigma')||4.5,FULL=opt('full')||160,FADE=opt('fade')||560;
(async()=>{const {data:d,info}=await sharp(inp).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height;
let top=0;for(let y=0;y<H&&!top;y++){let c=0;for(let x=0;x<W;x++){const i=(y*W+x)*3;if(Math.max(d[i],d[i+1],d[i+2])-Math.min(d[i],d[i+1],d[i+2])>40)c++}if(c>3)top=y}
const b=await sharp(d,{raw:{width:W,height:H,channels:3}}).blur(SIG).raw().toBuffer();const o=Buffer.from(d);
for(let y=0;y<H;y++){const t=y-top;const w=t<=FULL?1:t>=FADE?0:1-(t-FULL)/(FADE-FULL);if(!w)continue;const ws=w*w*(3-2*w);
 for(let x=0;x<W;x++){const i=(y*W+x)*3;for(let k=0;k<3;k++)o[i+k]=Math.round(d[i+k]*(1-ws)+b[i+k]*ws)}}
console.log(inp.split(/[\/]/).pop(),'top',top,'sigma',SIG);
await sharp(o,{raw:{width:W,height:H,channels:3}}).png().toFile(out)})();
