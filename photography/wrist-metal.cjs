/*
  wrist-metal.cjs: white and rose gold from a finished yellow photo of a red-cord bracelet on the wrist (free; 2026-11-12).
  Steps: red-cord.cjs mask, then metal-swap.cjs --hand (box round the cord) --hue a,b (rose with --relative), then only
  the piece is blended in, then red-cord.cjs back. The piece mask: gold-candidate pixels (hue from --ch, default 27, to 62,
  saturation over 0.12) within R px of the cord, grouped; a group is kept when it is smaller than --maxb px (360) and
  at least --cf (0.08) of it is clearly gold (hue 30-55, saturation over 0.4), or when it is bead-sized (under 70 px,
  mean hue 30 or more, mean saturation over 0.25). Wall and skin areas are larger or not clearly gold, so they stay.
  Used: --hue 25,29 for all; 04 and 09 --ch 30 (warm skin wisps next to the cross); 11, 12 --cf 0.01 and 13 --cf 0.001
  (pale gold). Check every result zoomed in, with left.cjs-style counts of gold left in the white.
  Usage: node wrist-metal.cjs <yellow wrist.png> <out dir> <id> [--hue a,b] [--R px] [--ch deg] [--cf f] [--maxb px]
  Writes <id>-white.png and <id>-rose.png (plus working files) into the out dir.
*/
const s=require('sharp'),path=require('path'),fs=require('fs'),{execFileSync}=require('child_process');
const P=__dirname;
const a=process.argv.slice(2);const[Y,od,id]=a;const hi=a.indexOf('--hue');const hue=hi>0?a[hi+1]:'24,28';const ri=a.indexOf('--R');const R=ri>0?+a[ri+1]:130;
const hsv=(r,g,b)=>{const mx=Math.max(r,g,b),mn=Math.min(r,g,b),d=mx-mn;let h=0;if(d){h=mx===r?((g-b)/d)*60:mx===g?((b-r)/d+2)*60:((r-g)/d+4)*60;if(h<0)h+=360;}return[h,mx?d/mx:0,mx];};
(async()=>{const {data:o,info}=await s(Y).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height;
const m=Buffer.alloc(W*H);const xs=[],ys=[];
for(let i=0,p=0;i<W*H;i++,p+=3){const[h,sa,v]=hsv(o[p],o[p+1],o[p+2]);if((h<10||h>345)&&sa>0.7&&v>100){m[i]=255;xs.push(i%W);ys.push((i/W)|0);}}
xs.sort((a,b)=>a-b);ys.sort((a,b)=>a-b);const q=(arr,f)=>arr[Math.floor(f*(arr.length-1))];
const box=[q(xs,0.001)-R,q(ys,0.001)-R,q(xs,0.999)+R,q(ys,0.999)+R].map((v,k)=>Math.max(0,Math.min(k%2?H:W,v)));
// near-cord weight: grid of 8 px cells holding any cord pixel, dilated by R, soft 32 px edge
const sc=8,gw=Math.ceil(W/sc),gh=Math.ceil(H/sc),g=new Uint8Array(gw*gh);for(let i=0;i<W*H;i++)if(m[i])g[((i/W/sc)|0)*gw+((i%W)/sc|0)]=1;
const pts=[];for(let i=0;i<gw*gh;i++)if(g[i])pts.push([i%gw,(i/gw)|0]);
const dist=new Float32Array(gw*gh).fill(1e9);const rc=Math.ceil((R+32)/sc);
for(const[x,y] of pts)for(let dy=-rc;dy<=rc;dy++)for(let dx=-rc;dx<=rc;dx++){const X=x+dx,Y2=y+dy;if(X<0||Y2<0||X>=gw||Y2>=gh)continue;const d=Math.hypot(dx,dy)*sc;const k=Y2*gw+X;if(d<dist[k])dist[k]=d;}
const near=new Float32Array(W*H);for(let i=0;i<W*H;i++){const d=dist[((i/W/sc)|0)*gw+((i%W)/sc|0)];near[i]=d<=R?1:d>=R+32?0:(R+32-d)/32;}
// piece mask: gold-candidate pixels (hue 27-62, sat>0.12, v>90) inside the cord band, connected components;
// keep those that touch the cord and whose bbox is under MAXB px (wall and skin areas are larger); then dilate 5 px
const CH=+(a[a.indexOf('--ch')+1]||0)||27;const CF=+(a[a.indexOf('--cf')+1]||0)||0.08;const MAXB=+(a[a.indexOf('--maxb')+1]||0)||360;
const cand=new Uint8Array(W*H);for(let i=0,p=0;i<W*H;i++,p+=3){if(near[i]<0.5)continue;const[h,sa,v]=hsv(o[p],o[p+1],o[p+2]);if(h>=CH&&h<=62&&sa>0.12&&v>90)cand[i]=1;}
const lab=new Int32Array(W*H);const keep=new Uint8Array(W*H);let L=0;const st=new Int32Array(W*H);
for(let i=0;i<W*H;i++){if(!cand[i]||lab[i])continue;L++;let sp=0;st[sp++]=i;lab[i]=L;const mem=[];let x0=1e9,y0=1e9,x1=-1,y1=-1,touch=false;
 while(sp){const k=st[--sp];mem.push(k);const x=k%W,y=(k/W)|0;if(x<x0)x0=x;if(x>x1)x1=x;if(y<y0)y0=y;if(y>y1)y1=y;
  for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++){const X=x+dx,Yy=y+dy;if(X<0||Yy<0||X>=W||Yy>=H)continue;const n=Yy*W+X;if(m[n])touch=true;if(cand[n]&&!lab[n]){lab[n]=L;st[sp++]=n;}}}
 let conf=0,mh=0,ms=0;for(const k of mem){const p=k*3;const[h,sa,v]=hsv(o[p],o[p+1],o[p+2]);mh+=h;ms+=sa;if(h>=30&&h<=55&&sa>0.4&&v>140)conf++;}mh/=mem.length;ms/=mem.length;const bead=x1-x0<70&&y1-y0<70&&mem.length>8&&mh>=30&&ms>0.25;if(x1-x0<MAXB&&y1-y0<MAXB&&mem.length>30&&conf/mem.length>=CF||bead){for(const k of mem)keep[k]=1;}}
// also keep components within 6 px of the cord even if not touching (beads behind a cord gap): via dilation below
const piece=new Float32Array(W*H);const D5=5;for(let i=0;i<W*H;i++){if(!keep[i])continue;const x=i%W,y=(i/W)|0;for(let dy=-D5;dy<=D5;dy++)for(let dx=-D5;dx<=D5;dx++){const X=x+dx,Yy=y+dy;if(X<0||Yy<0||X>=W||Yy>=H)continue;const d=Math.hypot(dx,dy);const w=d<=3?1:d>=D5?0:(D5-d)/2;const n=Yy*W+X;if(w>piece[n])piece[n]=w;}}
const t=n=>path.join(od,id+n);
execFileSync(process.execPath,[path.join(P,'red-cord.cjs'),'mask',Y,'x',t('-m.png')]);
const fb=box.map((v,k)=>(v/(k%2?H:W)).toFixed(4)).join(',');
await s(Buffer.from(piece.map(v=>Math.round(v*255))),{raw:{width:W,height:H,channels:1}}).png().toFile(t('-piece.png'));
const out={};for(const kind of ['rose','white']){const args=[path.join(P,'metal-swap.cjs'),kind,t('-m.png'),t('-'+kind+'-s.png'),'--hand',fb,'--hue',hue];if(kind==='rose')args.push('--relative');
 out[kind]=execFileSync(process.execPath,args).toString().trim();
 const sw=await s(t('-'+kind+'-s.png')).removeAlpha().raw().toBuffer();const r=Buffer.from(o);
 for(let i=0,p=0;i<W*H;i++,p+=3){let w=near[i];if(!w)continue;w*=piece[i];if(!w)continue;for(let c=0;c<3;c++)r[p+c]=Math.round(o[p+c]+w*(sw[p+c]-o[p+c]));}
 await s(r,{raw:{width:W,height:H,channels:3}}).png().toFile(t('-'+kind+'-n.png'));
 execFileSync(process.execPath,[path.join(P,'red-cord.cjs'),'back',Y,t('-'+kind+'-n.png'),t('-'+kind+'.png')]);}
console.log(id,'box',fb,JSON.stringify(out).slice(0,300));})();
