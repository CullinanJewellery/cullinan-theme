/*
  wrist-polish.cjs (2026-11-12, red-cord bracelets on the wrist): the main photos' polish (polish-curve.cjs, 0.6) and
  brightness (metal-lift.cjs, x1.05, highlights above 215 protected), applied only inside the bracelet's mask from
  wrist-metal.cjs (<id>-piece.png), so skin, cord and background do not change. The mid tone is the piece's own.
  Usage: node wrist-polish.cjs <piece mask.png> <in.png> <out.png> [polish 0.6] [lift 1.05]
*/
const s=require('sharp');const [mk,inp,out,aS,kS]=process.argv.slice(2);const A=+(aS||0.6),K=+(kS||1.05);
(async()=>{const m=await s(mk).raw().toBuffer();const {data:d,info}=await s(inp).removeAlpha().raw().toBuffer({resolveWithObject:true});const o=Buffer.from(d);
const lum=(r,g,b)=>0.3*r+0.59*g+0.11*b;let S=0,N=0;for(let i=0,p=0;p<d.length;p+=3,i++)if(m[i]>128){S+=lum(d[p],d[p+1],d[p+2]);N++;}const M=S/N;
for(let i=0,p=0;p<d.length;p+=3,i++){const w=m[i]/255;if(!w)continue;const L=lum(d[p],d[p+1],d[p+2]);if(!L)continue;
 const x=L>=M?(L-M)/(255-M):(L-M)/M;const y=Math.max(-1,Math.min(1,x+A*Math.sin(Math.PI*Math.abs(x))*Math.sign(x)*0.5));const L2=y>=0?M+y*(255-M):M+y*M;const k1=L2/L;
 const v=Math.max(d[p],d[p+1],d[p+2])*k1;const f=1+(K-1)*(1-Math.min(1,Math.max(0,(v-215)/40)));
 for(let c=0;c<3;c++){const nv=Math.min(255,d[p+c]*k1*f);o[p+c]=Math.round(d[p+c]+w*(nv-d[p+c]));}}
await s(o,{raw:{width:info.width,height:info.height,channels:3}}).png().toFile(out);console.log(out.split(/[\/]/).pop(),'mid',M.toFixed(0),'px',N);})();
