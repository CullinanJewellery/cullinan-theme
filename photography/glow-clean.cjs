/*
  glow-clean.cjs — removes the gold's warm glow left on the paper beside the metal: inside openings (Детелина's
  hearts), round a two-tone figure, at a shadow's edge (owner, 2026-11-19: "the yellow spot ... why is that
  happening"). Why it happens: the AI paints gold light onto the paper next to the metal; bg-soft.cjs keeps pixels
  close to the piece (its mask margin), and gold-standard.cjs then turns that pale peach into gold.
  How: seeds = paper bg-soft wrote (r == g, b == g + 2) in areas of at least --mina px. Glow = warm pale pixels
  (red - blue 5..--cmax, brightness >= --l) within --d px of the paper, never within 2 px of strong gold or --rh px
  of white metal (rhodium). Filled by diffusion from the surrounding paper and shadow, so no flat patch.
  Order: after bg-soft. Find on yellow with --save-mask m.png; rose: --use-mask m.png --union --cmax 80 --gold 90;
  white: --use-mask m.png. --protect mask.png (255 = keep) for pearls; --show out.png marks what changed in red.
    node glow-clean.cjs <in.png> <out.png> [options]
*/
const sharp=require('sharp');const [inp,out,...a]=process.argv.slice(2);const opt=(k,d)=>{const i=a.indexOf(k);return i<0?d:a[i+1]};
const D=+opt('--d',40),LMIN=+opt('--l',185),show=opt('--show',null),protect=opt('--protect',null);
(async()=>{const {data,info}=await sharp(inp).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width,H=info.height,N=W*H;
const P=protect?await sharp(protect).resize(W,H).extractChannel(0).raw().toBuffer():null;
const seed=new Uint8Array(N),L=new Float32Array(N);
for(let i=0;i<N;i++){const r=data[3*i],g=data[3*i+1],b=data[3*i+2];L[i]=(r+g+b)/3;if(r===g&&b===g+2)seed[i]=1;}
// remove isolated seeds (on rhodium metal by chance): keep seeds with >= 30 of 49 neighbours seeds
const s2=new Uint8Array(N);for(let y=3;y<H-3;y++)for(let x=3;x<W-3;x++){const i=y*W+x;if(!seed[i])continue;let c=0;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++)c+=seed[i+dy*W+dx];if(c>=30)s2[i]=1;}
// seeds only in large paper areas: a bright highlight on white metal can be written by bg-soft too (small islands)
{const MINA=+opt('--mina',300);const lab=new Int32Array(N).fill(-1);const st=new Int32Array(N);
 for(let i0=0;i0<N;i0++){if(!s2[i0]||lab[i0]>=0)continue;let sp=0,cnt=0;st[sp++]=i0;lab[i0]=i0;const comp=[];
  while(sp){const i=st[--sp];comp.push(i);const x=i%W;for(const j of [i-1,i+1,i-W,i+W]){if(j<0||j>=N||lab[j]>=0||!s2[j])continue;if((j===i-1&&x===0)||(j===i+1&&x===W-1))continue;lab[j]=i0;st[sp++]=j;}}
  if(comp.length<MINA)for(const i of comp)s2[i]=0;}}
// BFS from seeds through candidate pixels, distance limit D
const dist=new Int32Array(N).fill(-1);const q=new Int32Array(N);let h=0,t=0;
for(let i=0;i<N;i++)if(s2[i]){dist[i]=0;q[t++]=i;}
const CMAX=+opt('--cmax',60),GOLD=+opt('--gold',65),hue=opt('--hue','warm');
// strong metal (gold chroma > GOLD) grown by 2 px is never touched, so metal edges keep their shape
const strong=new Uint8Array(N);for(let i=0;i<N;i++){const r=data[3*i],g=data[3*i+1],b=data[3*i+2];if(Math.max(r,g,b)-Math.min(r,g,b)>GOLD)strong[i]=1;}
// rhodium / white metal (neutral pixels bg-soft did not write) is protected too, grown by RH px
const RH=+opt('--rh',6);
// rhodium core: neutral pixels bg-soft did not write and with no paper within 7 px (paper next to the metal, inside
// bg-soft's own mask margin, is neutral too and must not count)
{const sd=new Float32Array(N);for(let i=0;i<N;i++)sd[i]=seed[i];const R7=+opt("--core",5),ss=new Float32Array(N),tt=new Float32Array(N);
 for(let y=0;y<H;y++){let s=0;const r=y*W;for(let x=-R7;x<=R7;x++)s+=sd[r+Math.min(W-1,Math.max(0,x))];for(let x=0;x<W;x++){tt[r+x]=s;s+=sd[r+Math.min(W-1,x+R7+1)]-sd[r+Math.max(0,x-R7)];}}
 for(let x=0;x<W;x++){let s=0;for(let y=-R7;y<=R7;y++)s+=tt[Math.min(H-1,Math.max(0,y))*W+x];for(let y=0;y<H;y++){ss[y*W+x]=s;s+=tt[Math.min(H-1,y+R7+1)*W+x]-tt[Math.max(0,y-R7)*W+x];}}
 for(let i=0;i<N;i++){const r=data[3*i],g=data[3*i+1],b=data[3*i+2];if(!seed[i]&&ss[i]<0.5&&Math.max(r,g,b)-Math.min(r,g,b)<=8)strong[i]=2;}}
const near=new Uint8Array(N);for(let y=RH;y<H-RH;y++)for(let x=RH;x<W-RH;x++){const i=y*W+x;let f=0;for(let dy=-RH;dy<=RH&&!f;dy++)for(let dx=-RH;dx<=RH;dx++){const v=strong[i+dy*W+dx];if(v===2||(v===1&&Math.abs(dx)<=2&&Math.abs(dy)<=2)){f=1;break;}}near[i]=f;}
const cand=(i)=>{if(seed[i]||L[i]<LMIN||near[i]||(P&&P[i]>=128))return false;const r=data[3*i],b=data[3*i+2];const c=r-b;return c>4&&c<=CMAX;};
while(h<t){const i=q[h++];if(dist[i]>=D)continue;const x=i%W;for(const j of [i-1,i+1,i-W,i+W]){if(j<0||j>=N||dist[j]>=0)continue;if((j===i-1&&x===0)||(j===i+1&&x===W-1))continue;if(!cand(j))continue;dist[j]=dist[i]+1;q[t++]=j;}}
let glow=new Uint8Array(N);let n=0;for(let i=0;i<N;i++)if(dist[i]>0){glow[i]=1;n++;}
const um=opt('--use-mask',null),sm=opt('--save-mask',null);
if(um){const M=await sharp(um).extractChannel(0).raw().toBuffer();if(!a.includes('--union'))glow=new Uint8Array(N);n=0;for(let i=0;i<N;i++){if(M[i]>=128)glow[i]=1;n+=glow[i];}}
if(sm){const M=Buffer.alloc(N);for(let i=0;i<N;i++)M[i]=glow[i]?255:0;await sharp(M,{raw:{width:W,height:H,channels:1}}).png().toFile(sm);}
// fill: normalised box blur of seed L, growing radius until defined
const o=Buffer.from(data);
let val=new Float32Array(N),wt=new Float32Array(N);for(let i=0;i<N;i++)if(s2[i]&&!glow[i]){val[i]=L[i];wt[i]=1;}
const box=(A,R)=>{const tt=new Float32Array(N),oo=new Float32Array(N);for(let y=0;y<H;y++){let s=0;const r=y*W;for(let x=-R;x<=R;x++)s+=A[r+Math.min(W-1,Math.max(0,x))];for(let x=0;x<W;x++){tt[r+x]=s;s+=A[r+Math.min(W-1,x+R+1)]-A[r+Math.max(0,x-R)];}}for(let x=0;x<W;x++){let s=0;for(let y=-R;y<=R;y++)s+=tt[Math.min(H-1,Math.max(0,y))*W+x];for(let y=0;y<H;y++){oo[y*W+x]=s;s+=tt[Math.min(H-1,y+R+1)*W+x]-tt[Math.max(0,y-R)*W+x];}}return oo;};
const R=Math.max(8,Math.round(D*0.6));const bv=box(val,R),bw=box(wt,R),bv2=box(val,R*3),bw2=box(wt,R*3);
const F=new Float32Array(N);for(let i=0;i<N;i++)F[i]=(s2[i]||seed[i])&&!glow[i]?L[i]:NaN;
const gl=[];for(let i=0;i<N;i++)if(glow[i]){gl.push(i);F[i]=bw[i]>0?bv[i]/bw[i]:bw2[i]>0?bv2[i]/bw2[i]:251.67;}
// harmonic fill (diffusion from the surrounding paper and shadow only), so no flat patch with an edge
for(let it=0;it<+opt('--it',600);it++)for(const i of gl){let s=0,c=0;for(const j of [i-1,i+1,i-W,i+W]){const v=F[j];if(v===v){s+=v;c++;}}if(c)F[i]=s/c;}
for(const i of gl){const v=F[i];o[3*i]=Math.min(255,Math.max(0,Math.round(v-0.67)));o[3*i+1]=o[3*i];o[3*i+2]=Math.min(255,o[3*i]+2);}
if(0)for(let i=0;i<N;i++)if(glow[i]){const v=bw[i]>0?bv[i]/bw[i]:bw2[i]>0?bv2[i]/bw2[i]:251.67;const l=Math.round(v);o[3*i]=l-1<0?0:Math.min(255,l-1+1)-0;o[3*i]=Math.min(255,Math.max(0,Math.round(v-0.67)));o[3*i+1]=o[3*i];o[3*i+2]=Math.min(255,o[3*i]+2);}
await sharp(o,{raw:info}).png().toFile(out);
if(show){const s=Buffer.from(data);for(let i=0;i<N;i++)if(glow[i]){s[3*i]=255;s[3*i+1]=0;s[3*i+2]=0;}await sharp(s,{raw:info}).png().toFile(show);}
console.log('holefix: changed',n,'px');})();
