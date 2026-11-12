// groove-lift.cjs (2026-11-12, bracelet 04: owner "remove the black lines, they make the cross ugly"). Run on yellow, white and rose with the yellow as <ref>. Used: box 600,1260,1300,1610, stone 1037,1389,1117,1469, floor 115, amount 0.6.
// groove-lift.cjs <yellow ref> <in> <out> <x0,y0,x1,y1> <stone x0,y0,x1,y1> [floor=150] [amt=0.75]
// lifts near-black pixels on the metal (deep grooves) toward the piece's own mid tone; the groove stays visible, only lighter
const s=require('sharp');const [ref,inp,out,bx,sb,fl,am]=process.argv.slice(2);const B=bx.split(',').map(Number),S=sb.split(',').map(Number);const F=+(fl||150),A=+(am||0.75);
(async()=>{const {data:Y,info}=await s(ref).removeAlpha().raw().toBuffer({resolveWithObject:true});const W=info.width;const d=await s(inp).removeAlpha().raw().toBuffer();const o=Buffer.from(d);
const L=(a,p)=>0.3*a[p]+0.59*a[p+1]+0.11*a[p+2];
const gold=new Uint8Array(W*W);for(let y=B[1];y<B[3];y++)for(let x=B[0];x<B[2];x++){const p=(y*W+x)*3;if(Y[p]-Y[p+2]>40&&Y[p]-Y[p+1]<70)gold[y*W+x]=1;}
const R=4,near=new Uint8Array(W*W);for(let y=B[1];y<B[3];y++)for(let x=B[0];x<B[2];x++){if(!gold[y*W+x])continue;for(let dy=-R;dy<=R;dy++)for(let dx=-R;dx<=R;dx++)near[(y+dy)*W+x+dx]=1;}
// require gold on both sides (inside the piece, not its outer edge): count gold in a 9px ring
let mid=[0,0,0],n=0;for(let i=0;i<W*W;i++){if(!gold[i])continue;const p=i*3,l=L(d,p);if(l>140&&l<190){for(let c=0;c<3;c++)mid[c]+=d[p+c];n++;}}mid=mid.map(v=>v/n);const Lm=0.3*mid[0]+0.59*mid[1]+0.11*mid[2];
const I=new Float64Array((W+1)*(W+1));for(let y=0;y<W;y++){let r=0;for(let x=0;x<W;x++){r+=gold[y*W+x];I[(y+1)*(W+1)+x+1]=I[y*(W+1)+x+1]+r;}}const RD=10;const dens=(x,y)=>{const a=Math.max(0,x-RD),b=Math.max(0,y-RD),c=Math.min(W,x+RD+1),e=Math.min(W,y+RD+1);return (I[e*(W+1)+c]-I[b*(W+1)+c]-I[e*(W+1)+a]+I[b*(W+1)+a])/((c-a)*(e-b));};let ch=0;for(let y=B[1];y<B[3];y++)for(let x=B[0];x<B[2];x++){const i=y*W+x;if(!near[i])continue;if(x>=S[0]&&x<S[2]&&y>=S[1]&&y<S[3])continue;
 const dn=dens(x,y);const wd=Math.min(1,Math.max(0,(dn-0.5)/0.25));if(!wd)continue;
 const p=i*3,l=L(d,p);if(l>=F)continue;const Yl=L(Y,p);if(Y[p]<Y[p+2])continue; // only warm/neutral metal-dark, not red cord/grey
 const tgt=l+(F-l)*A*Math.min(1,(F-l)/40);const k=tgt/Lm;for(let c=0;c<3;c++)o[p+c]=Math.min(255,Math.round(d[p+c]+(mid[c]*k-d[p+c])*Math.min(1,(F-l)/30)*wd));ch++;}
await s(o,{raw:{width:W,height:W,channels:3}}).png().toFile(out);console.log('changed',ch,'mid',mid.map(Math.round).join(','));})();
