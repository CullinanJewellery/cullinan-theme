// metal-lift.cjs (2026-11-12, red-cord bracelets; owner: "a little brighter"). Usage: node metal-lift.cjs <yellow with cord masked> <in> <out> [k=1.05]
// lift.cjs <maskSource(yellow, cord masked)> <in> <out> [k=1.05]: brightens metal pixels (warm in the mask source) by k,
// fading out above 215 so highlights do not burn
const s=require('sharp');const [ms,i,o,kS]=process.argv.slice(2);const K=+(kS||1.05);
(async()=>{const Y=await s(ms).removeAlpha().raw().toBuffer();const {data:d,info}=await s(i).removeAlpha().raw().toBuffer({resolveWithObject:true});const out=Buffer.from(d);
for(let p=0;p<d.length;p+=3){const w=Math.min(1,Math.max(0,(Y[p]-Y[p+2]-25)/25));if(!w)continue;const v=Math.max(d[p],d[p+1],d[p+2]);const f=1+(K-1)*w*(1-Math.min(1,Math.max(0,(v-215)/40)));
for(let c=0;c<3;c++)out[p+c]=Math.min(255,Math.round(d[p+c]*f));}
await s(out,{raw:{width:info.width,height:info.height,channels:3}}).png().toFile(o);})();
