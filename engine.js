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
function face(html,w,off,back){const f=el('face'+(back?' bk':''),`width:${w}px`);f.innerHTML=html;const pg=f.firstElementChild;pg.style.position='absolute';pg.style.top='0';pg.style.left=off+'px';const s=el('sh');f.appendChild(s);return [f,s]}

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
function warm(){leaves.forEach((l,i)=>{if((i===spread-1||i===spread)&&!l.rigidOnly)ensureStrips(l);else if(!l.anim)dropStrips(l)})}

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
function preload(){B.pages.forEach(p=>(p.html.match(/src="([^"]+\.webp)"/g)||[]).forEach(m=>{const s=m.slice(5,-1);if(PRE[s])return;const i=new Image();i.src=s;PRE[s]=i;i.decode&&i.decode().catch(()=>{})}))}
function turnTo(n){n=Math.max(0,Math.min(S,n));if(n===spread)return;doTurn(n)}
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
 const zOf=i=>{const l=leaves[i],onLeft=l.phi>90;return (onLeft?hL:hR)+1+(l.anim?(.4+(3.6+l.zk*.5)*Math.sin(Math.PI*l.phi/180)):-.25*Math.min(4,onLeft?spread-1-i:i-spread))};
 const near=new Set();leaves.forEach((l,i)=>{if(l.anim){near.add(i-1);near.add(i+1)}});
 leaves.forEach((l,i)=>{
  const vis=l.anim||(i>=spread-2&&i<=spread+1)||near.has(i);
  l.el.classList.toggle('hidden',!vis);if(!vis)return;
  l.el.classList.toggle('under',i!==spread-1&&i!==spread);
  /* video layers ignore 3D stacking in most browsers: only show them on the open spread when nothing is turning */
  const vok=(i===spread-1||i===spread)&&!anim.length;if(l.vok!==vok){l.vok=vok;l.el.classList.toggle('vidoff',!vok);l.el.querySelectorAll('video').forEach(v=>{try{vok?v.play():v.pause()}catch(err){}})}
  l.el.style.transform=`translateZ(${zOf(i)}px) rotateY(${-l.phi}deg) translateX(520px) scaleX(1.004) translateX(-520px)`;
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

/* ---------- view ---------- */
let rx=36,ry=0,ptrY=0,try_=0;
function layout(){mobile=innerWidth<760;
 const s=mobile?Math.min((innerWidth-28)/W,(innerHeight-150)/(H*.86)):Math.min(1.05,(innerWidth-60)/1120,(innerHeight-150)/(H*.86));
 fit.style.transform=`scale(${s})`;
 if(mobile&&spread>0&&(side<2*spread-1||side>2*spread))side=2*spread-1;if(spread===0)side=0;
 updatePan();updateCount()}
function updatePan(delay){pan.style.transitionDelay=(mobile&&delay?delay:0)+'ms';let x;if(spread===0)x=-260;else if(!mobile)x=0;else x=(side%2===1)?260:-260;pan.style.transform=`translateX(${x}px)`}
function chOf(p){const pg=B.pages[p-1];return pg&&pg.ch?pg.ch:null}
function updateCount(){const c=document.getElementById('count');
 if(spread===0){c.textContent=t('Open het boek','Open the book');return}
 const pl=2*spread-1,pr=2*spread,ch=chOf(mobile?side:pr)||chOf(pl);
 const label=ch?`${ch.num} · ${ch.title}`:(spread===1?t('Inhoud','Contents'):t('Colofon','Colophon'));
 c.textContent=label;
 try{const id=ch?ch.id:'';history.replaceState(null,'',id?'#'+id:location.pathname)}catch(e){}}
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
addEventListener('keydown',e=>{if(e.key==='ArrowRight')next();if(e.key==='ArrowLeft')prev()});
/* pointer position tilts the book and moves the gloss: mouse hover on desktop, finger drag on touch */
function tiltAt(cx,cy){const x=cx/innerWidth-.5,y=cy/innerHeight-.5;try_=x*8;ptrY=y;document.documentElement.style.setProperty('--gx',(50+x*90).toFixed(1)+'%')}
addEventListener('pointermove',e=>{if(e.pointerType==='mouse')tiltAt(e.clientX,e.clientY)});
/* touch: a slow drag only tilts; a quick horizontal flick turns the page */
let tx0=null,ty0=0,tt0=0;
/* touch tilt follows the drag distance (a finger moves much less than a mouse), and springs back on release */
function dragTilt(dx,dy){const k=Math.min(innerWidth,innerHeight),x=Math.max(-1,Math.min(1,dx/(k*.35))),y=Math.max(-1,Math.min(1,dy/(k*.35)));
 try_=x*12;ptrY=y*1.1;document.documentElement.style.setProperty('--gx',(50+x*80).toFixed(1)+'%')}
addEventListener('touchstart',e=>{const p=e.touches[0];tx0=p.clientX;ty0=p.clientY;tt0=performance.now()},{passive:true});
addEventListener('touchmove',e=>{if(tx0===null)return;const p=e.touches[0];dragTilt(p.clientX-tx0,p.clientY-ty0)},{passive:true});
addEventListener('touchcancel',()=>{tx0=null;dragTilt(0,0)},{passive:true});
addEventListener('touchend',e=>{if(tx0===null)return;const p=e.changedTouches[0],dx=p.clientX-tx0,dy=p.clientY-ty0,dt=performance.now()-tt0;
 if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)*1.5&&dt<450)(dx<0?next:prev)();tx0=null;dragTilt(0,0)},{passive:true});
document.querySelectorAll('.ui.top button[data-l]').forEach(b=>b.onclick=()=>{lang=b.dataset.l;document.documentElement.lang=lang;document.getElementById('tocbtn').textContent=t('INHOUD','CONTENTS');document.querySelectorAll('.ui.top button[data-l]').forEach(x=>x.classList.toggle('on',x===b));build();updateCount()});
addEventListener('resize',layout);

(function tl(){const trx=36-ptrY*7;rx+=(trx-rx)*.06;ry+=(try_-ry)*.08;tilt.style.transform=`rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;requestAnimationFrame(tl)})();
build();layout();
(function(){const id=location.hash.slice(1);if(!id)return;const c=B.chapters.find(x=>x.id===id);if(c)jumpTo(Math.ceil(c.start/2));})();
