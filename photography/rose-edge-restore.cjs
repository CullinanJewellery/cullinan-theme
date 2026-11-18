// rose pixels wrongly filled as paper (rose's own glow search took light metal edges): put the metal back, mapped
// from the same pixel of the finished yellow (every rose is made from the yellow; mapping learned on this photo).
const sharp=require('sharp');const [yf,rf,mf,out]=process.argv.slice(2);
(async()=>{const Y=await sharp(yf).removeAlpha().raw().toBuffer({resolveWithObject:true});const Rr=await sharp(rf).removeAlpha().raw().toBuffer();const M=await sharp(mf).extractChannel(0).raw().toBuffer();
const N=Y.info.width*Y.info.height,y=Y.data;const fill=(b,i)=>b[3*i]===b[3*i+1]&&b[3*i+2]===b[3*i]+2;
const Q=4,S=64,acc=new Float64Array(S*S*S*3),cnt=new Float64Array(S*S*S);const key=(i)=>((y[3*i]>>2)*S+(y[3*i+1]>>2))*S+(y[3*i+2]>>2);
const warm=(i)=>y[3*i]-y[3*i+2]>4&&!fill(y,i);
for(let i=0;i<N;i++){if(!warm(i)||M[i]>=128||fill(Rr,i))continue;const k=key(i);cnt[k]++;for(let c=0;c<3;c++)acc[3*k+c]+=Rr[3*i+c];}
const o=Buffer.from(Rr);let n=0,miss=0;
for(let i=0;i<N;i++){if(!warm(i)||M[i]>=128||!fill(Rr,i))continue;let k=key(i);
 if(!cnt[k]){// nearest filled bin by search in growing cube
  let best=-1;for(let r=1;r<6&&best<0;r++){const r0=y[3*i]>>2,g0=y[3*i+1]>>2,b0=y[3*i+2]>>2;let bc=0;for(let a=-r;a<=r;a++)for(let b=-r;b<=r;b++)for(let c=-r;c<=r;c++){const rr=r0+a,gg=g0+b,bb=b0+c;if(rr<0||gg<0||bb<0||rr>=S||gg>=S||bb>=S)continue;const kk=(rr*S+gg)*S+bb;if(cnt[kk]>bc){bc=cnt[kk];best=kk;}}}
  if(best<0){miss++;continue;}k=best;}
 for(let c=0;c<3;c++)o[3*i+c]=Math.round(acc[3*k+c]/cnt[k]);n++;}
await sharp(o,{raw:Y.info}).png().toFile(out);console.log('restored',n,'missed',miss);})();
