// photography/ghost-clear.cjs: clears a faint duplicate of the bracelet that the model left in the background above it:
// finds runs of rows holding coloured pixels, keeps the largest run (the bracelet), paints rows above it background
const s=require('sharp');const [inp,out]=process.argv.slice(2);
(async()=>{const {data:d,info}=await s(inp).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height;
const cnt=new Array(H).fill(0);for(let y=0;y<H;y++)for(let x=0;x<W;x++){const i=(y*W+x)*3;const mx=Math.max(d[i],d[i+1],d[i+2]),mn=Math.min(d[i],d[i+1],d[i+2]);if(mx-mn>30)cnt[y]++}
const runs=[];let st=-1,gap=0;for(let y=0;y<H;y++){if(cnt[y]>4){if(st<0)st=y;gap=0;runs.length&&runs[runs.length-1].e===y-1-gap}else if(st>=0){gap++;if(gap>=40){runs.push({s:st,e:y-gap,sum:0});st=-1;gap=0}}}
if(st>=0)runs.push({s:st,e:H-1,sum:0});for(const r of runs)for(let y=r.s;y<=r.e;y++)r.sum+=cnt[y];
runs.sort((a,b)=>b.sum-a.sum);const main=runs[0];console.log('runs',runs.map(r=>[r.s,r.e,r.sum]));
const o=Buffer.from(d);const top=Math.max(0,main.s-25),bot=H;let n=0;
for(let y=0;y<H;y++){if(y>=top&&y<bot)continue;for(let x=0;x<W;x++){const i=(y*W+x)*3;o[i]=251;o[i+1]=251;o[i+2]=253;n++}}
console.log('painted rows outside',top,bot);
await s(o,{raw:{width:W,height:H,channels:3}}).png().toFile(out)})();
