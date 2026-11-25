/* The Book of Jairo — book engine */
let lang='nl';
const t=(nl,en)=>lang==='nl'?nl:en;
const WF=234,NS=14,SW=(W-WF)/NS,TT=46,TMIN=5;
const book=document.getElementById('book');
const fit=document.getElementById('fit'),pan=document.getElementById('pan'),tilt=document.getElementById('tilt');
let B=null,leaves=[],blocks={},board6=null;
let spread=0,side=0,mobile=false,S=0;
const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
const backOut=x=>{const c=1.55;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2)};

function el(cls,css,html){const d=document.createElement('div');if(cls)d.className=cls;if(css)d.style.cssText=css;if(html!==undefined)d.innerHTML=html;return d}
const noVid=h=>h.replace(/<video[^>]*><\/video>/g,'<div style="width:100%;height:100%;background:#3a342c"></div>');
function vslots(f){f.querySelectorAll('video').forEach(v=>{const s=document.createElement('div');s.className='vslot';const src=v.getAttribute('src');s.dataset.src=src;s.style.cssText=v.getAttribute('style')||'';s.style.backgroundImage=`url(${src.replace(/\.mp4$/,'-poster.webp')})`;v.replaceWith(s)})}
function face(html,w,off,back){const f=el('face'+(back?' bk':''),`width:${w}px`);f.innerHTML=html;vslots(f);const pg=f.firstElementChild;pg.style.position='absolute';pg.style.top='0';pg.style.left=off+'px';const s=el('sh');f.appendChild(s);return [f,s]}

/* ---------- page block ---------- */
function makeBlock(sd){const b=el('block','left:'+(sd==='L'?0:520)+'px');
 b.innerHTML=`<div class="contact"></div><div class="board" style="left:${sd==='L'?-6:0}px;width:526px;top:-6px;height:692px;transform:translateZ(-1px)"></div><div class="topf"></div><div class="edgeB"></div><div class="edgeS" style="left:${sd==='L'?0:520}px;transform-origin:0 0"></div>`;
 book.appendChild(b);return b}
function setBlock(b,h){b.querySelector('.topf').style.transform=`translateZ(${h}px)`;b.querySelector('.edgeB').style.height=h+'px';const es=b.querySelector('.edgeS');es.style.width=h+'px';es.style.transform='rotateY(-90deg)';b.style.opacity=h>0.5?1:0}

/* ---------- leaves ---------- */
const COVER=`<div class="pg" style="background:none"><div class="cov"><h1>The Book of <i>Jairo</i></h1><div class="r2"></div><p>bbo.technology</p></div></div>`;
function makeLeaf(F,Bk,rigid){
 const lf=el('leaf');
 const [ff,fs]=face(F,W,0,false);ff.classList.add('full');
 const [bf,bs]=face(Bk,W,0,true);bf.classList.add('full');
 lf.append(ff,bf);book.appendChild(lf);
 return {el:lf,F,Bk,rigidOnly:rigid,phi:0,target:0,dir:1,flat:null,strips:null,shF:[fs],shB:[bs],anim:false,zk:0};
}
function ensureStrips(l){
 if(l.flat||l.rigidOnly)return;
 const F=noVid(l.F),Bk=noVid(l.Bk);
 const flat=el('flat','left:0;width:'+WF+'px');
 const [ff,fs]=face(F,WF,0,false);flat.appendChild(ff);
 const bc=el('bc',`left:${-WF}px;width:${WF}px;transform-origin:100% 50%;transform:rotateY(180deg)`);
 const [bf,bs]=face(Bk,WF,-(W-WF),false);bc.appendChild(bf);flat.appendChild(bc);
 const strips=[],shF=[fs],shB=[bs];let parent=flat;
 for(let k=0;k<NS;k++){const x=WF+k*SW;const s=el('strip',`left:${k===0?WF:SW}px;width:${SW}px`);
  const [a,as]=face(F,SW+.8,-x,false);const [b,bs2]=face(Bk,SW+.8,-(W-x-SW)+.8,true);s.append(a,b);parent.appendChild(s);parent=s;strips.push(s);shF.push(as);shB.push(bs2)}
 l.el.appendChild(flat);l.flat=flat;l.strips=strips;l.sF=shF;l.sB=shB;
}
function dropStrips(l){if(l.flat){l.flat.remove();l.flat=null;l.strips=null}}
/* keep the curl strips of the two leaves that can turn next built (and painted, near-invisible) so a turn never starts with blank copies */
/* the leaf after next is also pre-built, and building happens in idle time one leaf per tick (never in the landing frame) */
let warmT=null;
function warm(){clearTimeout(warmT);setTimeout(()=>decodeLeaves(spread-2,spread+2),200);const need=i=>(i>=spread-1&&i<=spread+1);
 leaves.forEach((l,i)=>{if(!need(i)&&!l.anim)dropStrips(l)});
 const todo=leaves.filter((l,i)=>need(i)&&!l.flat&&!l.rigidOnly);
 const step=()=>{if(anim.length){warmT=setTimeout(step,300);return}const l=todo.shift();if(!l)return;ensureStrips(l);render();warmT=setTimeout(step,120)};
 warmT=setTimeout(step,350)}

function build(){
 book.querySelectorAll('.leaf,.block,.board6').forEach(n=>n.remove());
 B=BOOK(t);S=B.N/2;leaves=[];preload();
 blocks.L=makeBlock('L');blocks.R=makeBlock('R');
 board6=el('board6','position:absolute;left:520px;top:0;width:520px;height:680px;transform-style:preserve-3d');
 const f6=el('face','width:520px');f6.innerHTML=B.pages[B.N-1].html;board6.appendChild(f6);book.appendChild(board6);
 leaves.push(makeLeaf(COVER,B.pages[0].html,true));
 for(let i=1;i<B.N-1;i+=2)leaves.push(makeLeaf(B.pages[i].html,B.pages[i+1].html,false));
 leaves.forEach((l,i)=>{l.phi=l.target=i<spread?180:0});
 render();warm();
}

/* ---------- turning ---------- */
let anim=[];
/* load and decode every image up front, and keep them referenced, so pages never show up blank */
const PRE={};
function preload(){B.pages.forEach(p=>(p.html.match(/src="([^"]+\.webp)"/g)||[]).forEach(m=>{const s=m.slice(5,-1);if(PRE[s])return;const i=new Image();i.src=s;PRE[s]=i}))}
/* decode the images of the pages that a turn will reveal, so they are on screen before the sheet lifts */
function decodeLeaves(a,b){const ps=[];for(let i=Math.max(0,a);i<=Math.min(leaves.length-1,b);i++)leaves[i].el.querySelectorAll(':scope>.full img').forEach(im=>{if(im.decode)ps.push(im.decode().catch(()=>{}))});return Promise.all(ps)}
let turnBusy=false;
function turnTo(n){n=Math.max(0,Math.min(S,n));if(n===spread||turnBusy)return;
 if(Math.abs(n-spread)>1||anim.length){doTurn(n);return}
 /* single turn: make sure the page underneath is decoded first (at most 220 ms), then turn */
 const lo=n>spread?n-1:n-1,hi=n>spread?n+1:n;turnBusy=true;
 Promise.race([decodeLeaves(lo,hi),new Promise(r=>setTimeout(r,220))]).then(()=>{turnBusy=false;doTurn(n)})}
function doTurn(n){
 const now=performance.now(),fwd=n>spread,multi=Math.abs(n-spread)>1;
 const idx=[];if(fwd)for(let i=spread;i<n;i++)idx.push(i);else for(let i=spread-1;i>=n;i--)idx.push(i);
 idx.forEach((i,k)=>{const l=leaves[i],tg=fwd?180:0;l.dir=fwd?1:-1;l.rigid=multi;if(!multi)ensureStrips(l);
  l.zk=k;anim.push({l,from:l.phi,to:tg,t0:now+k*(multi?90:0),d:multi?760:1250});l.target=tg;l.anim=true});
 spread=n;book.classList.toggle('closed',n===0);updatePan(multi?0:650);updateCount();loop()}
let looping=false,lastT=0;
function loop(){if(looping)return;looping=true;lastT=performance.now();const f=()=>{const now=performance.now(),dt=now-lastT;lastT=now;
  anim=anim.filter(a=>{const q=Math.min(1,Math.max(0,(now-a.t0)/a.d));a.l.phi=a.from+(a.to-a.from)*ease(q);if(q>=1){a.l.anim=false}return q<1});
  if(!anim.length)warm();
  render();
  if(anim.length)requestAnimationFrame(f);else looping=false};requestAnimationFrame(f)}

function render(){
 const lf=leaves.reduce((a,l)=>a+l.phi/180,0);
 const o=Math.min(lf,1),hL=o*(TMIN+TT/2),hR=TMIN+TT/2+(1-o)*TT/2;
 setBlock(blocks.L,hL);setBlock(blocks.R,hR);
 board6.style.transform=`translateZ(${hR+.25}px)`;
 const zOf=i=>{const l=leaves[i],onLeft=l.phi>90;return (onLeft?hL:hR)+1+(l.anim?((4+l.zk*.5)*Math.max(0,Math.sin(Math.PI*l.phi/180))):-.25*Math.min(4,onLeft?spread-1-i:i-spread)-(underAnim(i,onLeft)?.1:0))};/* sink less than the .25 step between leaves, so the stack order never flips */
 /* a resting leaf directly under a turning one sinks a little (it is covered), so the turning leaf never needs a sudden lift */
 function underAnim(i,onLeft){for(const j of [i-1,i+1]){const n=leaves[j];if(n&&n.anim&&(n.phi>90)===onLeft)return true}return false}
 const near=new Set();leaves.forEach((l,i)=>{if(l.anim){near.add(i-1);near.add(i+1)}});
 leaves.forEach((l,i)=>{
  const vis=l.anim||(i>=spread-2&&i<=spread+2)||near.has(i);
  l.el.classList.toggle('hidden',!vis);if(!vis)return;
  l.el.classList.toggle('under',i!==spread-1&&i!==spread);
  /* video layers ignore 3D stacking in most browsers: only show them on the open spread when nothing is turning */
  const vf=anim.length?'':i===spread-1?'bk':i===spread?'fr':'';if(l.vf!==vf){l.vf=vf;setVideos(l,vf)}
  const sc=1+.004*(1-Math.max(0,Math.sin(Math.PI*l.phi/180)));/* spine bleed only at rest, fading out while the leaf turns, so the hinge sits exactly on the spine */
  l.el.style.transform=`translateZ(${zOf(i)}px) rotateY(${-l.phi}deg) translateX(520px) scaleX(${sc.toFixed(5)}) translateX(-520px)`;
  const curl=!!(l.strips&&!l.rigid&&l.anim);
  l.el.classList.toggle('rest',!curl);
  const q=l.phi/180,m=Math.sin(Math.PI*q);
  if(curl){let cum=0;const tot=NS*(NS+1)*(2*NS+1)/6;
   l.strips.forEach((s,k)=>{const b=l.dir*m*95*(k+1)*(k+1)/tot;cum+=b;s.style.transform=`rotateY(${b}deg)`;
    const ang=l.phi-cum,sh=Math.max(0,Math.sin(ang*Math.PI/180))*.22;l.sF[k+1].style.opacity=ang<90?sh:0;l.sB[k+1].style.opacity=ang>90?sh:0});
   const sh=m*.18;l.sF[0].style.opacity=l.phi<90?sh:0;l.sB[0].style.opacity=l.phi>90?sh:0}
  const sh=m*.16;l.shF[0].style.opacity=l.phi<90?sh:0;l.shB[0].style.opacity=l.phi>90?sh:0;
 });
}

/* a <video> only exists on the open spread; elsewhere the slot shows its poster still */
function setVideos(l,vf){l.el.querySelectorAll(':scope>.full .vslot').forEach(s=>{let v=s.querySelector('video');const on=!!vf&&(s.closest('.face').classList.contains('bk')===(vf==='bk'));
 if(on&&!v){v=document.createElement('video');/* inline first, source last: otherwise iOS opens it full screen */v.setAttribute('playsinline','');v.setAttribute('webkit-playsinline','');v.playsInline=true;v.setAttribute('muted','');v.muted=true;v.defaultMuted=true;v.loop=true;v.preload='auto';v.disablePictureInPicture=true;v.src=s.dataset.src;
  v.style.cssText='display:block;width:100%;height:100%;object-fit:cover';s.appendChild(v);const pr=v.play();if(pr&&pr.catch)pr.catch(()=>{})}
 else if(!on&&v){v.muted=true;v.pause();v.remove();const b=s.parentElement&&s.parentElement.querySelector('.snd');if(b)b.classList.remove('on')}})}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('.snd');if(!b)return;e.stopPropagation();
 const v=b.parentElement.querySelector('video');if(!v)return;v.muted=!v.muted;if(!v.muted){v.currentTime=0;v.play().catch(()=>{})}b.classList.toggle('on',!v.muted)},true);
/* ---------- view ---------- */
let rx=36,ry=0,ptrY=0,try_=0,FS=1;
/* touch nudge: the book slides under the finger and turns about the centre of the page in view, then springs back */
const NG={x:0,y:0,z:0,a:0,b:0,vx:0,vy:0,vz:0,va:0,vb:0,tx:0,ty:0,tz:0,ta:0,tb:0,down:false};
function layout(){mobile=innerWidth<760;
 const s=mobile?Math.min((innerWidth-28)/W,(innerHeight-150)/(H*.86)):Math.min(1.05,(innerWidth-60)/1120,(innerHeight-150)/(H*.86));
 fit.style.transform=`scale(${s})`;FS=s;
 if(mobile&&spread>0&&(side<2*spread-1||side>2*spread))side=2*spread-1;if(spread===0)side=0;
 updatePan();updateCount()}
function updatePan(delay){pan.style.transitionDelay=(mobile&&delay?delay:0)+'ms';let x;if(spread===0)x=-260;else if(!mobile)x=0;else x=(side%2===1)?260:-260;pan.style.transform=`translateX(${x}px)`}
function chOf(p){const pg=B.pages[p-1];return pg&&pg.ch?pg.ch:null}
function updateCount(){const c=document.getElementById('count');
 if(spread===0){c.textContent=t('Open het boek','Open the book');return}
 const pl=2*spread-1,pr=2*spread,ch=chOf(mobile?side:pr)||chOf(pl);
 const label=ch?`${ch.num} · ${ch.title}`:(spread===1?t('Inhoud','Contents'):t('Colofon','Colophon'));
 c.textContent=label;
 try{const id=ch?ch.id:'';history.replaceState(null,'',id?'#'+id:location.pathname)}catch(e){}
 if(ch)countChapter(ch)}
/* visitor counting (GoatCounter, no cookies): the page load counts itself; each chapter is counted once per visit,
   only after the reader has stayed on it for 2 s, so flicking through or TOC jumps don't count every chapter passed */
const SEEN={};let cntT=null;
function countChapter(ch){clearTimeout(cntT);if(SEEN[ch.id])return;
 cntT=setTimeout(()=>{if(SEEN[ch.id])return;const gc=window.goatcounter;if(!gc||!gc.count)return;SEEN[ch.id]=1;
  try{gc.count({path:'/hoofdstuk/'+ch.id,title:ch.num+' · '+ch.title,event:false})}catch(e){}},2000)}
function next(){if(!mobile){turnTo(spread+1);return}
 if(spread===0){side=1;turnTo(1);return}
 if(side%2===1){side++;updatePan();updateCount();return}
 if(spread<S){side++;turnTo(spread+1)}}
function prev(){if(!mobile){turnTo(spread-1);return}
 if(spread===0)return;
 if(side%2===0){side--;updatePan();updateCount();return}
 if(spread===1){side=0;turnTo(0);return}
 side--;turnTo(spread-1)}
function gotoPage(p){const s=Math.ceil(p/2);side=p;turnTo(s)}
function jumpTo(s){spread=s;side=2*s-1;leaves.forEach((l,i)=>{l.phi=l.target=i<s?180:0});book.classList.toggle('closed',s===0);render();warm();updatePan();updateCount()}
document.getElementById('next').onclick=next;document.getElementById('prev').onclick=prev;
document.getElementById('hitR').onclick=next;document.getElementById('hitL').onclick=prev;
document.getElementById('tocbtn').onclick=()=>{side=2;turnTo(1)};
document.addEventListener('click',e=>{const li=e.target.closest&&e.target.closest('[data-goto]');if(li){e.stopPropagation();gotoPage(+li.dataset.goto)}
 else if(spread===0&&e.target.closest&&e.target.closest('.cov')){next()}});
addEventListener('keydown',e=>{if(POLA.open){if(e.key==='Escape')closePola();return}if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev()});
/* ---------- YouTube links open as an instant-camera print ---------- */
const POLA={open:false,el:null};
function ytId(u){const m=u.match(/(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/)([\w-]{11})/);return m?m[1]:null}
function openPola(url,label){const id=ytId(url);if(!id)return false;const tall=/\/shorts\//.test(url);
 const w=document.createElement('div');w.className='pola-wrap';
 w.innerHTML=`<div class="pola${tall?' tall':''}" role="dialog" aria-label="video"><div class="pola-img" style="background-image:url(https://i.ytimg.com/vi/${id}/hqdefault.jpg)"><iframe src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen title="video"></iframe></div>
  <div class="pola-cap"><span>${label}</span><a href="${url}" target="_blank" rel="noopener">YouTube ↗</a></div><button class="pola-x" aria-label="${t('Sluiten','Close')}">×</button></div>`;
 document.body.appendChild(w);POLA.open=true;POLA.el=w;requestAnimationFrame(()=>w.classList.add('in'));
 w.addEventListener('click',ev=>{if(ev.target===w||ev.target.closest('.pola-x'))closePola()});return true}
function closePola(){const w=POLA.el;if(!w)return;POLA.open=false;POLA.el=null;w.classList.remove('in');setTimeout(()=>w.remove(),350)}
function ytOpen(a){const u=a.dataset.yt;const tx=(a.textContent||'').trim(),lab=(document.getElementById('count').textContent||'')+(/^video\s*\d/i.test(tx)?' · '+tx:'');
 openPola(u,lab)}
for(const tgt of [window,document])tgt.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('[data-yt]');if(!a||POLA.open)return;e.preventDefault();e.stopPropagation();ytOpen(a)},true);
addEventListener('keydown',e=>{const a=e.target.closest&&e.target.closest('[data-yt]');if(a&&(e.key==='Enter'||e.key===' ')&&!POLA.open){e.preventDefault();ytOpen(a)}});
/* clicking the outer part of a page turns it (the fixed hit zones sit at the screen edges, which on a wide window are beside the book) */
function edgeZone(x,y){if(spread===0||anim.length&&false)return 0;const r=book.getBoundingClientRect();if(y<r.top||y>r.bottom)return 0;
 const z=Math.min(170,r.width*.16);if(x>r.right-z&&x<=r.right+8&&spread<S)return 1;if(x<r.left+z&&x>=r.left-8)return -1;return 0}
const NOTURN='a,button,[data-goto],[data-yt],.snd,.ui,video,.hit';
document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest(NOTURN))return;const z=edgeZone(e.clientX,e.clientY);if(z>0)next();else if(z<0)prev()});
addEventListener('pointermove',e=>{if(e.pointerType!=='mouse')return;const z=e.target.closest&&e.target.closest(NOTURN)?0:edgeZone(e.clientX,e.clientY);document.body.style.cursor=z?'pointer':''});
/* pointer position tilts the book and moves the gloss: mouse hover on desktop, finger drag on touch */
function tiltAt(cx,cy){const x=cx/innerWidth-.5,y=cy/innerHeight-.5;try_=x*8;ptrY=y;document.documentElement.style.setProperty('--gx',(50+x*90).toFixed(1)+'%')}
addEventListener('pointermove',e=>{if(e.pointerType==='mouse')tiltAt(e.clientX,e.clientY)});
/* touch: a slow drag only tilts; a quick horizontal flick turns the page */
let tx0=null,ty0=0,tt0=0;
function nudge(px,py,dx,dy){const k=Math.min(innerWidth,innerHeight),c=v=>Math.max(-1,Math.min(1,v));
 const rx_=(px-innerWidth/2)/k,ry_=(py-innerHeight*.5)/k,fx=c(dx/(k*.6)),fy=c(dy/(k*.6));
 NG.ta=fx*4;NG.tb=-fy*2;NG.tx=fx*12/FS;NG.ty=fy*10/FS;NG.tz=c((rx_*fy-ry_*fx)*2)*1.2;
 document.documentElement.style.setProperty('--gx',(50+fx*60).toFixed(1)+'%')}
function dragTilt(dx,dy){if(!dx&&!dy){NG.tx=NG.ty=NG.tz=NG.ta=NG.tb=0;NG.down=false}}
addEventListener('touchstart',e=>{if(POLA.open){tx0=null;return}const p=e.touches[0];tx0=p.clientX;ty0=p.clientY;tt0=performance.now()},{passive:true});
addEventListener('touchmove',e=>{if(tx0===null)return;const p=e.touches[0];NG.down=true;nudge(p.clientX,p.clientY,p.clientX-tx0,p.clientY-ty0)},{passive:true});
addEventListener('touchcancel',()=>{tx0=null;dragTilt(0,0)},{passive:true});
addEventListener('touchend',e=>{if(tx0===null)return;const p=e.changedTouches[0],dx=p.clientX-tx0,dy=p.clientY-ty0,dt=performance.now()-tt0;
 if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5&&dt<450)(dx<0?next:prev)();tx0=null;dragTilt(0,0)},{passive:true});
document.querySelectorAll('.ui.top button[data-l]').forEach(b=>b.onclick=()=>{lang=b.dataset.l;document.documentElement.lang=lang;document.getElementById('tocbtn').textContent=t('INHOUD','CONTENTS');document.querySelectorAll('.ui.top button[data-l]').forEach(x=>x.classList.toggle('on',x===b));build();updateCount()});
addEventListener('resize',layout);

let tlT=performance.now();
(function tl(){const now=performance.now(),dt=Math.min(.05,(now-tlT)/1000);tlT=now;
 const trx=36-ptrY*7;rx+=(trx-rx)*.06;ry+=(try_-ry)*.08;
 /* spring: stiff while the finger holds the book, softer with a little overshoot when released */
 const K=NG.down?90:55,D=NG.down?19:12.5;/* calm: (near) critically damped, no wobble */
 for(const a of ['x','y','z','a','b']){const v='v'+a;NG[v]+=(K*(NG['t'+a]-NG[a])-D*NG[v])*dt;NG[a]+=NG[v]*dt}
 tilt.style.transform=`rotateX(${(rx+NG.b).toFixed(2)}deg) rotateY(${(ry+NG.a).toFixed(2)}deg) translate3d(${NG.x.toFixed(2)}px,${NG.y.toFixed(2)}px,0) rotateZ(${NG.z.toFixed(3)}deg)`;
 requestAnimationFrame(tl)})();
build();layout();
(function(){const id=location.hash.slice(1);if(!id)return;const c=B.chapters.find(x=>x.id===id);if(c)jumpTo(Math.ceil(c.start/2));})();
