// pearl-clean.cjs (2026-11-19, 14 earrings): inside the pearls (mask: 0 = pearl), the yellow gold's reflection (hue 22-65°, colour spread above 14)
// becomes the pearl's own pink-cream tint at the same brightness. White and rose at strength 1, yellow at 0.6 (a soft reflection stays).
// node pearl-clean.cjs <in.png> <out.png> <mask.png: 0 = pearl> [strength]
const sharp=require('sharp');const [inp,out,mask,st]=process.argv.slice(2);const STR=+(st||1);
(async()=>{const {data,info}=await sharp(inp).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height,N=W*H;
const P=await sharp(mask).resize(W,H).extractChannel(0).raw().toBuffer();
const tint=[[],[],[]];for(let i=0;i<N;i++){if(P[i]>=128)continue;const r=data[3*i],g=data[3*i+1],b=data[3*i+2];const c=Math.max(r,g,b)-Math.min(r,g,b);if(c<5||c>16)continue;const h=((((g-b)/c)%6+6)%6)*60;if(h>22)continue;const m=(r+g+b)/3;tint[0].push(r-m);tint[1].push(g-m);tint[2].push(b-m);}
const T=tint.map(v=>{v.sort((a,b)=>a-b);return v[v.length>>1]});console.log('pearl tint',T.map(v=>v.toFixed(1)).join(','));
const o=Buffer.from(data);let n=0;
for(let i=0;i<N;i++){if(P[i]>=128)continue;const r=data[3*i],g=data[3*i+1],b=data[3*i+2];const c=Math.max(r,g,b)-Math.min(r,g,b);if(c<=10)continue;const h=((((g-b)/c)%6+6)%6)*60;if(h<16||h>70)continue;
 const wh=Math.min(1,(h-16)/8)*Math.min(1,(70-h)/6),wc=Math.min(1,(c-10)/10),w=wh*wc*STR;const m=(r+g+b)/3;
 for(const [k,v] of [[0,r],[1,g],[2,b]])o[3*i+k]=Math.max(0,Math.min(255,Math.round(v+(m+T[k]-v)*w)));n++;}
await sharp(o,{raw:info}).png().toFile(out);console.log('pearlfix',n)})();
