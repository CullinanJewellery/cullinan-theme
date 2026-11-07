// gold-deepen.cjs <in> <out> <satK> <valK> — owner, 2026-11-07, ring A: thin pieces (beads, chains, thin bands) look
// lighter than a wide band of the same measured gold, so after gold-look-match.cjs they are deepened (option 2:
// saturation x1.25, brightness x0.94). Gold pixels only; highlights above 245 kept.
// deepen.cjs in out satK valK : on gold pixels (hue 15-70, red-blue > 25 soft) saturation x satK, brightness x valK
// (highlights near white kept: the change fades out as brightness approaches 255)
const s=require('sharp');const [i,o,sk,vk]=process.argv.slice(2);const SK=+sk,VK=+vk;
(async()=>{const {data:d,info}=await s(i).removeAlpha().raw().toBuffer({resolveWithObject:true});const out=Buffer.from(d);
for(let p=0;p<d.length;p+=3){const r=d[p],g=d[p+1],b=d[p+2];const mx=Math.max(r,g,b),mn=Math.min(r,g,b);if(mx!==r||mx===mn)continue;const h=(g-b)/(mx-mn)*60;if(h<15||h>70)continue;
const w=Math.min(1,Math.max(0,(r-b-25)/25))*Math.min(1,(h-15)/8);if(!w)continue;let S=(mx-mn)/mx,V=mx;
const keep=V>245?(V-245)/10:0;S=Math.min(1,S*(1+(SK-1)*(1-keep)));V=V*(1+(VK-1)*(1-keep));
const c=V*S,x=c*(1-Math.abs((h/60)%2-1)),m=V-c;const n=[c+m,x+m,m];for(let k=0;k<3;k++)out[p+k]=Math.max(0,Math.min(255,Math.round(d[p+k]+w*(n[k]-d[p+k]))));}
await s(out,{raw:{width:info.width,height:info.height,channels:3}}).png().toFile(o);})();
