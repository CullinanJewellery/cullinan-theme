/*
  red-cord.cjs: keeps a red cord (or other red part) out of metal-swap.cjs (2026-11-12, red-cord bracelets).
  metal-swap.cjs measures the photo's average gold by warmth (red - blue); a red cord counts as "gold" and pulled the
  rose pale and blotchy. So: mask turns every red pixel (hue under 22 or over 330 degrees) into neutral grey of the
  same brightness; run metal-swap.cjs (and white-neutral.cjs) on the masked file; back puts the red pixels back
  exactly from the yellow photo.
  Usage (needs sharp, NODE_PATH as for check-photo.cjs):
    node red-cord.cjs mask <yellow.png> x <masked.png>
    node red-cord.cjs back <yellow.png> <swapped.png> <out.png>
*/
// mask: red cord -> neutral grey of same luminance; back: put red cord pixels back from the yellow photo
const sharp=require('sharp');const [mode,yel,inp,out]=process.argv.slice(2);
const hue=(r,g,b)=>{const mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx-mn<30)return -1;let h=mx===r?((g-b)/(mx-mn))*60:mx===g?((b-r)/(mx-mn)+2)*60:((r-g)/(mx-mn)+4)*60;return h<0?h+360:h;};
const wt=h=>h<0?0:(h<16||h>330)?1:h<22?(22-h)/6:0;
(async()=>{const {data:Y,info}=await sharp(yel).removeAlpha().raw().toBuffer({resolveWithObject:true});
const o=mode==='mask'?Buffer.from(Y):await sharp(inp).removeAlpha().raw().toBuffer();
for(let p=0;p<o.length;p+=3){const w=wt(hue(Y[p],Y[p+1],Y[p+2]));if(!w)continue;
 if(mode==='mask'){const L=Math.round(0.3*Y[p]+0.59*Y[p+1]+0.11*Y[p+2]);for(let c=0;c<3;c++)o[p+c]=Math.round(Y[p+c]+w*(L-Y[p+c]));}
 else for(let c=0;c<3;c++)o[p+c]=Math.round(o[p+c]+w*(Y[p+c]-o[p+c]));}
await sharp(o,{raw:{width:info.width,height:info.height,channels:3}}).png().toFile(out);})();
