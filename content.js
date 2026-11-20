/* The Book of Jairo — content. Concept texts (NL/EN), to be edited by Jairo. */
const IMG='img/';
const W=520,H=680;
const DIM={"bm-inject.webp":[1000,750],"bm-lattice.webp":[640,569],"bm-vacuum.webp":[652,696],"mt-c-trots.webp":[420,534],"mt-c-leuk.webp":[420,446],"mt-c-begrepen.webp":[420,477],"wo-vid.mp4":[784,208],"ho-fusion.webp":[1000,745],"bm-product.webp":[1000,500],"bm-incubator.webp":[1040,1360],"bm-kangaroo.webp":[1040,1360],"bm-proto.webp":[1040,1360],"pw-vid.mp4":[848,480],"ca-reel.mp4":[960,540],"jw-s0c.webp":[950,598],"as-a.webp":[882,538],"as-b.webp":[900,416],"ax-bed.webp":[600,600],"ax-fig.webp":[600,800],"ax-full.webp":[1040,1360],"ax-peng.webp":[600,800],"ax-png.webp":[600,800],"ax-spread.webp":[2080,1360],"bm-detail.webp":[600,800],"bm-full.webp":[1040,1360],"bo-detail.webp":[600,800],"bo-full.webp":[1040,1360],"board.webp":[600,600],"bt-cad.webp":[600,800],"bt-full.webp":[1040,1360],"bt-horn.webp":[600,800],"bt-parts.webp":[600,800],"bt-setup.webp":[600,800],"bt-sketch.webp":[600,800],"bt-spread.webp":[2080,1360],"bt-u.webp":[600,800],"ca-cad.webp":[800,600],"ca-full.webp":[1040,1360],"ca-logo.webp":[600,800],"ca-mold.webp":[600,800],"ca-pink.webp":[600,800],"ca-shell.webp":[600,800],"ca-side.webp":[700,930],"ca-spike.webp":[600,800],"ca-wood.webp":[700,930],"cad-front.webp":[626,703],"cad-hip-wire.webp":[696,480],"cb-detail.webp":[600,800],"cb-drawing.webp":[600,800],"cb-full.webp":[1040,1360],"cb-gold.webp":[600,800],"cb-mold.webp":[700,930],"cb-pink.webp":[600,800],"cb-print.webp":[600,800],"cb-raw.webp":[700,930],"cp-build.webp":[800,600],"cp-cob.webp":[600,800],"cp-full.webp":[1040,1360],"desk.webp":[900,600],"duck-gear.webp":[900,900],"duck-mujoco.webp":[619,532],"duck-real.webp":[825,1100],"duck-render.webp":[631,1000],"duck-scale.webp":[557,800],"duck-wire.webp":[360,552],"full-hand.webp":[1040,1360],"ho-cad.webp":[900,587],"jw-s0.webp":[1000,643],"jw-s1.webp":[1000,454],"jw-s2.webp":[499,321],"jw-s3.webp":[544,397],"jw-s4.webp":[867,532],"jw-title.webp":[1200,610],"kn-detail.webp":[600,800],"kn-full.webp":[1040,1360],"mt-home.webp":[500,801],"mt-leuk.webp":[600,647],"mt-rust.webp":[600,446],"mt-trots.webp":[600,761],"pw-full.webp":[1040,1360],"scale-photo.webp":[600,750],"ss-shot.webp":[900,900],"vi-clamp.webp":[600,800],"vi-final.webp":[800,600],"vi-fit.webp":[600,800],"vi-full.webp":[1040,1360],"vi-heat.webp":[600,800],"vi-print.webp":[600,800],"vi-scan.webp":[600,800],"vi-spread.webp":[2080,1360],"we-a.webp":[710,528],"we-b.webp":[710,528],"wires.webp":[600,600],"wo-full.webp":[1040,1360],"wo-render.webp":[800,485],"wo-sketch.webp":[800,609],"ze-full.webp":[1040,1360],"ze-scale.webp":[600,800],"ax-vid.mp4":[540,960],"bt-vid.mp4":[540,304],"ca-vid.mp4":[540,304],"cb-vid.mp4":[540,960],"cp-vid.mp4":[540,960],"duck-servos.mp4":[540,960],"jw-vid.mp4":[540,306]};
const AR=s=>DIM[s]?DIM[s][0]/DIM[s][1]:.75;

/* ---------- building blocks ---------- */
const im=(src,css='')=>`<img src="${IMG+src}" alt="" decoding="sync" style="${css}">`;
const full=(src,cap)=>`<div class="photo" style="left:0;top:0;width:${W}px;height:${H}px">${im(src)}</div>${cap?`<div class="capfade"></div><div class="cap onphoto" style="position:absolute;left:62px;bottom:30px;right:62px">${cap}</div>`:''}`;
const half=(src,side,cap)=>`<div class="photo half" style="left:0;top:0;width:${W}px;height:${H}px">${im(src,`position:absolute;top:0;left:${side==='l'?0:-W}px;width:${2*W}px;height:${H}px;object-fit:cover`)}</div>${cap?`<div class="cap onphoto" style="position:absolute;right:62px;bottom:30px;width:240px;text-align:right">${cap}</div>`:''}`;
const print=(src,x,y,w,h,rot=0,cap='')=>`<figure class="print" style="left:${x}px;top:${y}px;width:${w+12}px;transform:rotate(${rot}deg)"><div class="photo" style="position:relative;width:${w}px;height:${h}px">${im(src)}</div>${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;
const vprint=(src,x,y,w,h,rot=0,cap='')=>`<figure class="print" style="left:${x}px;top:${y}px;width:${w+12}px;transform:rotate(${rot}deg)"><div class="photo" style="position:relative;width:${w}px;height:${h}px"><div class="vslot" data-src="${IMG+src}" style="background-image:url(${IMG+src.replace(/\.mp4$/,'-poster.webp')})"></div></div>${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;
const plate=(src,w,h,cap)=>`<div class="plate" style="left:${(W-w)/2}px;top:${(H-h)/2-16}px;width:${w}px;height:${h}px">${im(src)}</div>${cap?`<div class="cap" style="position:absolute;left:62px;right:62px;top:${(H+h)/2+2}px;text-align:center">${cap}</div>`:''}`;
const cols=(ps,force)=>{const n=ps.join('').replace(/<[^>]+>/g,'').length;return `<div class="cols${force||(n<260?' one':'')}${n<140?' nodrop':''}">${ps.map(p=>`<p>${p}</p>`).join('')}</div>`};const _c=0;
const specs=(rows,css)=>`<dl class="specs" style="position:absolute;${css}">${rows.map(([a,b])=>`<dt>${a}</dt><dd>${b}</dd>`).join('')}</dl>`;
const cap=(txt,css)=>`<div class="cap" style="position:absolute;${css}">${txt}</div>`;
/* YouTube links are not real links: they open the instant-camera print (a plain <a> gets taken over by some viewers) */
const link=(url,txt)=>/youtu\.?be/.test(url)?`<span class="ytl" role="button" tabindex="0" data-yt="${url}">${txt}</span>`:`<a href="${url}" target="_blank" rel="noopener">${txt}</a>`;
const todo=txt=>`<span class="todo">${txt}</span>`;
const opener=(num,title,lede,paras)=>`<div style="position:absolute;left:62px;right:62px;top:92px"><div class="num">${num}</div><h2 class="ttl">${title}</h2><p class="lede">${lede}</p><div class="rule"></div>${cols(paras)}</div>`;
const section=(title,lede,paras,top=92)=>`<div style="position:absolute;left:62px;right:62px;top:${top}px"><h3 class="h2">${title}</h3>${lede?`<p class="lede" style="font-size:16px">${lede}</p>`:''}<div class="rule"></div>${cols(paras)}</div>`;
const smallOpener=(num,title,lede,paras)=>`<div style="position:absolute;left:62px;right:62px;top:86px"><div class="num" style="font-size:84px">${num}</div><h2 class="ttl" style="font-size:44px">${title}</h2><p class="lede" style="font-size:17px">${lede}</p><div class="rule"></div>${cols(paras)}</div>`;
const cutout=(src,y,h)=>{const w=Math.round(h*AR(src));return `<div class="cutout" style="left:${(W-w)/2}px;top:${y}px;width:${w}px;height:${h}px">${im(src)}</div>`};
const ROMAN=['','I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV','XV','XVI','XVII','XVIII','XIX','XX'];

/* ---------- chapters ---------- */
function CHAPTERS(t){
 const C=[];
 /* I — Duckling (pop-up centrefold) */
 C.push({id:'duckling',title:'Duckling',pages:[
  ()=>full('full-hand.webp',t('Fig. 1 — De Duckling, november 2026','Fig. 1 — The Duckling, November 2026')),
  n=>opener(n,'Duckling',t('Hoe klein kun je een lopende robot maken zonder dat hij zijn karakter verliest?','How small can you make a walking robot before it loses its character?'),
   t(['De Duckling begint bij de open-source XGO-Duck, de versie van Luwu Dynamics van Pollens Microduck. Ik bracht hem terug tot ongeveer 0,65 keer de oorspronkelijke maat: zo’n vijftien centimeter hoog, met onderdelen die op een SLA-printer passen.','Kleiner worden betekende dat bijna alles opnieuw moest. Het lichaam draait nu op servo’s van vier en twee gram. De heup werd een eigen ontwerp: een differentieel met kegeltandwielen, aangedreven door twee servo’s, met een draaias erboven.','Alle drie de assen komen samen in één punt, zoals een heup hoort te werken.'],
     ['The Duckling starts from the open-source XGO-Duck, Luwu Dynamics’ take on Pollen’s Microduck. I scaled it down to roughly 0.65 of its original size: about fifteen centimetres tall, with parts that fit an SLA printer.','Getting smaller meant redoing almost everything. The body now runs on four- and two-gram servos. The hip became a design of its own: a bevel-gear differential driven by two servos, with a yaw axis above it.','All three axes meet in a single point, the way a hip should work.']))
   +print('duck-gear.webp',62,532,84,84,-1.2)+cap(t('Fig. 2<br><i>Heupdifferentieel</i>','Fig. 2<br><i>Hip differential</i>'),'left:176px;top:578px;width:160px'),
  ()=>cutout('duck-render.webp',70,500)+cap(t('<i>Plaat</i><br>Het nieuwste ontwerp in Fusion 360.','<i>Plate</i><br>The latest design in Fusion 360.'),'left:62px;bottom:62px;width:210px'),
  ()=>section(t('Leren lopen','Learning to walk'),t('Elke misstap is een val.','Every misstep is a fall.'),
   t(['Een robot van vijftien centimeter heeft weinig marge. Daarom leert de Duckling eerst lopen in MuJoCo, een fysicasimulatie. Met reinforcement learning probeert een neuraal netwerk het duizenden keren, en wordt het beloond voor alles wat lijkt op een loopje dat ik zelf in Blender animeerde.','In de simulatie zag de eerste versie er goed uit. Op de echte robot maaide hij met zijn poten en viel hij meteen om. Dus terug, en eenvoudiger: één stijl, alleen vooruit, draaien en blijven staan.','Het netwerk is nu alleen nog de benen. De firmware op de RP2350 bepaalt waar hij heen gaat.'],
     ['A fifteen-centimetre robot has little margin. So the Duckling first learns to walk in MuJoCo, a physics simulation. With reinforcement learning a neural network tries thousands of times, rewarded for anything resembling a gait I animated myself in Blender.','In simulation the first version looked good. On the real robot it flailed its legs and fell over straight away. So back, and simpler: one style, forward only, turning and standing still.','The network is now just the legs. The firmware on the RP2350 decides where it goes.']))
   +print('duck-mujoco.webp',62,446,194,150)+print('scale-photo.webp',290,438,108,135,-1.4)+cap(t('Fig. 4–5 · <i>Eerste stappen in MuJoCo · op de weegschaal</i>','Fig. 4–5 · <i>First steps in MuJoCo · on the scale</i>'),'left:62px;bottom:58px;width:390px'),
  ()=>section(t('Karakter','Character'),t('Lopen is het begin.','Walking is just the start.'),
   t(['De kop moet bewegen zoals in een animatiefilm: met anticipatie, naslingeren en kleine verbaasde momenten. In rust zit hij, kijkt om zich heen en volgt gezichten. Zwaai je, of loop je weg, dan komt hij je achterna.','Een ESP32-camera doet het kijken met optical flow in plaats van een neuraal netwerk, en stuurt alleen door wat ertoe doet. En als alles werkt: een snavel die kan kwaken.'],
     ['The head should move like an animated film: anticipation, follow-through and small moments of surprise. At rest it sits, looks around and follows faces. Wave, or walk away, and it comes after you.','An ESP32 camera does the looking with optical flow instead of a neural network, passing on only what matters. And if everything works: a beak that can quack.']))
   +vprint('duck-servos.mp4',62,388,120,170)+print('wires.webp',210,388,106,106,1.2)+print('board.webp',342,388,106,106,-1)
   +specs([[t('Hoogte','Height'),'± 15 cm'],[t('Schaal','Scale'),'0,65 × XGO-Duck'],['Print','SLA'],[t('Servo’s','Servos'),'Emax ES9051 · ES9251'],[t('Brein','Brain'),'RP2350 · ESP32-CAM']],'left:210px;top:528px')
   +cap(t('Fig. 6–8<br><i>Servo’s, bedrading, print</i>','Fig. 6–8<br><i>Servos, wiring, board</i>'),'left:62px;top:578px;width:132px'),
  ()=>full('duck-front.webp',t('Fig. 9 · <i>de Duckling, geprint en bedraad</i>','Fig. 9 · <i>the Duckling, printed and wired</i>')),
 ]});

 /* II — Ceramic Audio */
 C.push(big({v:'A',id:'ceramic-audio',title:'Ceramic Audio',full:'ca-full.webp',
  lede:t('Luidsprekers van klei, gegoten in mallen uit de 3D-printer.','Loudspeakers made of clay, cast in moulds from the 3D printer.'),
  intro:t(['Ceramic Audio is mijn luidsprekerpraktijk. Ik ontwerp en bouw luidsprekers, en probeer de bestaande conventies even te vergeten om er iets nieuws uit te maken.','Elke vorm begint in CAD. De mal is een matrix van 3D-geprinte delen met gipsen wanden; alleen die mal kost al zo’n vier weken. Daarna wordt de klei gegoten, bijgewerkt en gebakken.','Op de volgende pagina’s: de vormen, de mallen en de proefstukken die onderweg ontstonden.'],
   ['Ceramic Audio is my loudspeaker practice. I design and build loudspeakers, and try to forget the existing conventions for a moment to make something new from them.','Every shape starts in CAD. The mould is a matrix of 3D-printed parts with plaster walls; the mould alone takes about four weeks. Then the clay is cast, finished and fired.','On the following pages: the shapes, the moulds and the test pieces made along the way.']),
  openPrint:['ca-cad.webp',200,150,t('Fig. 1 · <i>CAD</i>','Fig. 1 · <i>CAD</i>')],
  spreadL:'ca-side.webp',spreadR:'ca-wood.webp',reel:'ca-reel.mp4',videoPage:t('Fig. 2 · <i>Ceramic Audio Works, promo reel</i>','Fig. 2 · <i>Ceramic Audio Works, promo reel</i>'),
  s5title:t('Van mal tot klank','From mould to sound'),s5lede:t('De mal is het eigenlijke werk.','The mould is the real work.'),
  s5:t(['De mallen bestaan uit geprinte delen die in gips of siliconen worden afgegoten, zodat de klei er later weer uit kan. Een geprint proefmodel laat eerst zien of de vorm klopt.','Bij het gieten blijft de klei ruim een uur in de mal staan. Daarna worden de randen geschraapt en geschuurd, en pas dan gaat het stuk de oven in.','Sommige ontwerpen zijn nog concept, zoals de Pompidou: een transmissielijn in keramiek met uitlaten die aan een Harley-Davidson doen denken.'],
   ['The moulds are printed parts cast in plaster or silicone, so the clay can come out again later. A printed test model first shows whether the shape is right.','When casting, the clay stays in the mould for over an hour. Then the edges are scraped and sanded, and only then does the piece go into the kiln.','Some designs are still concepts, like the Pompidou: a ceramic transmission line with outlets reminiscent of a Harley-Davidson.']),
  s5prints:[['ca-pink.webp','geprint proefmodel','printed test model'],['ca-mold.webp','mal','mould'],['ca-shell.webp','gietvorm','casting shell']],
  s6title:t('Proefstukken','Test pieces'),s6:t([`Niet alles haalt de oven. Sommige vormen blijven een stap in het proces, en laten zien waar het naartoe ging.`,`Een roze geprint model, een mal met stekels, een halve schaal: elk stuk beantwoordde een vraag.`],
   [`Not everything makes it into the kiln. Some shapes remain a step in the process, and show where things were heading.`,`A pink printed model, a spiked mould, half a shell: each piece answered a question.`]),
  video:'ca-vid.mp4',s6prints:[['ca-spike.webp'],['ca-logo.webp']],
  specs:[[t('Materiaal','Material'),t('keramiek','ceramics')],[t('Mallen','Moulds'),t('3D-print · gips · siliconen','3D print · plaster · silicone')],['Web',link('https://ceramic.audio','ceramic.audio')]]
 },t));

 /* III — Companion Cube */
 C.push(big({v:'B',id:'companion-cube',title:'Companion Cube',full:'cb-full.webp',
  lede:t('Een kubus uit een computerspel, gegoten in klei en belegd met bladgoud.','A cube from a video game, cast in clay and covered in gold leaf.'),
  intro:t(['In Portal 2 is de Companion Cube je trouwste metgezel. Bij Ceramic Audio werd hij een monoluidspreker: een geglazuurde keramische kubus met de driver in het zijvlak.','De gouden editie is met de hand belegd met 23-karaats bladgoud. De klank omschrijf ik als droog en helder.'],
   ['In Portal 2 the Companion Cube is your most loyal companion. At Ceramic Audio it became a mono loudspeaker: a glazed ceramic cube with the driver in its side.','The gold edition is covered by hand in 23-carat gold leaf. I describe the sound as dry and clear.']),
  openPrint:['cb-drawing.webp',150,200,t('Fig. 1 · <i>eerste tekening</i>','Fig. 1 · <i>first drawing</i>')],
  spreadL:'cb-mold.webp',spreadR:'cb-raw.webp',spreadCap:t('Fig. 2–3 · de mal, het ruwe afgietsel','Fig. 2–3 · the mould, the raw cast'),
  s5title:t('De mal','The mould'),s5lede:t('Zes vlakken, één keer gieten.','Six faces, one pour.'),
  s5:t(['De mal bestaat uit 3D-geprinte delen die in siliconen worden afgegoten, met gips aan alle kanten. De klei blijft ruim een uur in de mal staan; daarna worden de randen geschraapt en geschuurd, en pas dan wordt hij gebakken.','Tussen mal en eindresultaat zitten veel proeven: geprinte mallen, een roze kleurproef en ruwe afgietsels.'],
   ['The mould is made of 3D-printed parts cast in silicone, with plaster on every side. The clay stays in the mould for over an hour; then the edges are scraped and sanded, and only then is it fired.','Between mould and result there are many trials: printed moulds, a pink colour test and raw casts.']),
  s5prints:[['cb-print.webp','geprinte mal','printed mould'],['cb-pink.webp','kleurproef','colour test']],
  s6title:t('Bladgoud','Gold leaf'),s6:t([`Het bladgoud gaat er vel voor vel op, met de hand. Het is zo dun dat een zucht genoeg is om het weg te blazen.`,`Pas als alles zit, komt de driver in het zijvlak en klinkt de kubus voor het eerst.`],
   [`The gold leaf goes on sheet by sheet, by hand. It is so thin that a sigh is enough to blow it away.`,`Only when everything is in place does the driver go into the side, and the cube plays for the first time.`]),
  video:'cb-vid.mp4',s6prints:[['cb-gold.webp'],['cb-detail.webp']],
  specs:[[t('Vorm','Shape'),'Companion Cube · Portal 2'],[t('Materiaal','Material'),t('geglazuurd keramiek, 23 kt bladgoud','glazed ceramic, 23 ct gold leaf')],[t('Mal','Mould'),t('3D-print · siliconen · gips','3D print · silicone · plaster')],[t('Klank','Sound'),t('droog, helder','dry, clear')]]
 },t));

 /* IV — Concrete speaker */
 C.push(medium({v:'B',id:'betonnen-speaker',title:t('Betonnen speaker','Concrete speaker'),full:'bt-full.webp',
  lede:t('Een transmissielijn die je kunt zien.','A transmission line you can see.'),
  intro:t(['Een drieweg-luidspreker van beton, met een transmissielijn in de vorm van een dubbele helix. De buizen die normaal in een kast verstopt zitten, zijn hier de vorm zelf geworden.','Het ontwerp ontstond in Fusion 360. De delen zijn apart gegoten en daarna aan elkaar gezet tot één doorlopende lijn.',todo(t('Aan te vullen: drivers, maten en gietproces.','To be added: drivers, dimensions and casting process.'))],
   ['A three-way concrete loudspeaker with a transmission line shaped as a double helix. The tubes normally hidden inside a cabinet have become the shape itself.','The design started in Fusion 360. The parts were cast separately and then joined into one continuous line.',todo('To be added: drivers, dimensions and casting process.')]),
  openPrint:['bt-cad.webp',150,200,t('Fig. 1 · <i>Fusion 360</i>','Fig. 1 · <i>Fusion 360</i>')],
  spread:'bt-spread.webp',spreadCap:t('Fig. 2 · een gietvorm','Fig. 2 · a casting mould'),
  s5title:t('Gieten','Casting'),s5lede:t('Bocht voor bocht.','Bend by bend.'),
  s5:t(['Elk deel van de lijn is apart gegoten en daarna gepast, gelijmd en bijgewerkt. Wekenlang lag het geheel in delen op tafel: bochten, een U-stuk, de hoorn.'],['Each part of the line was cast separately, then fitted, glued and finished. For weeks the whole thing lay in pieces on the table: bends, a U-piece, the horn.']),
  s5prints:[['bt-u.webp','U-stuk','U-piece'],['bt-parts.webp','delen','parts'],['bt-horn.webp','hoorn','horn']],
  s6title:t('Proefopstelling','Test setup'),s6:t([`Voordat er iets wordt afgewerkt, staat het geheel in een proefopstelling. Eerst meten en luisteren, dan pas schuren.`],
   [`Before anything gets finished, the whole thing sits in a test setup. Measure and listen first, sand later.`]),
  video:'bt-vid.mp4',s6prints:[['bt-sketch.webp'],['bt-setup.webp']],
  specs:[['Type',t('drieweg','three-way')],[t('Behuizing','Enclosure'),t('beton','concrete')],[t('Lijn','Line'),t('dubbele helix','double helix')],[t('Ontwerp','Design'),'Fusion 360']]
 },t));

 /* V–VI — small Ceramic Audio prototypes */
 C.push(small({v:'A',id:'bol',title:'Bol',full:'bo-full.webp',lede:t('Een verjaardagscadeau.','A birthday present.'),
  paras:t([`De Bol begon als verjaardagscadeau: een ronde kast op drie pootjes, met een gedraaide houten ring om de driver.`,`Een bol is een dankbare vorm voor een luidspreker. Er zijn geen evenwijdige wanden, dus het geluid kaatst binnenin minder heen en weer.`,`Het was het eerste prototype van een vorm die daarna verder ging als de zeppelin.`],
   [`The Bol started as a birthday present: a round cabinet on three legs, with a turned wooden ring around the driver.`,`A sphere is a grateful shape for a loudspeaker. There are no parallel walls, so the sound bounces back and forth inside much less.`,`It was the first prototype of a shape that later continued as the zeppelin.`]),
  prints:[['bo-detail.webp',150,200]]},t));
 C.push(small({v:'B',id:'zeppelin',title:'Zeppelin',full:'ze-full.webp',lede:t('Het tweede prototype.','The second prototype.'),
  paras:t([`De zeppelin is het tweede prototype van de bolle vorm: langer, gestroomlijnder, met dezelfde houten ring aan de voorkant.`,`Een kast die naar achteren smal toeloopt, geeft het geluid binnenin nog minder kans om heen en weer te kaatsen. En hij ziet er ook gewoon goed uit.`,`${todo(t('Aan te vullen: driver en materiaal.','To be added: driver and material.'))}`],
   [`The zeppelin is the second prototype of the round shape: longer, more streamlined, with the same wooden ring at the front.`,`A cabinet that tapers towards the back gives the sound inside even less chance to bounce around. And it simply looks good.`,`${todo('To be added: driver and material.')}`]),
  prints:[['ze-scale.webp',150,200,t('voor de schaal','for scale')]]},t));

 /* VII — 5-axis printer */
 C.push(big({v:'C',id:'5-axis-printer',title:t('5-assige printer','5-axis printer'),full:'ax-full.webp',
  lede:t('Printen zonder support, door het bed te laten kantelen.','Printing without support, by tilting the bed.'),
  intro:t(['Een gewone 3D-printer bouwt laag op laag, recht omhoog. Alles wat overhangt heeft support nodig, en dat laat lelijke sporen na.','Deze printer heeft een printbed dat kan kantelen en draaien: twee extra assen, A en B. Zo kan elk deel van een model in de richting geprint worden die het best past.'],
   ['An ordinary 3D printer builds layer upon layer, straight up. Anything that overhangs needs support, and that leaves ugly marks.','This printer has a build plate that tilts and rotates: two extra axes, A and B. That way every part of a model can be printed in the direction that suits it best.']),
  openPrint:['ax-png.webp',120,160,t('Fig. 1 · <i>printbed</i>','Fig. 1 · <i>build plate</i>')],
  spread:'ax-spread.webp',spreadCap:t('Fig. 2 · het kantelende bed','Fig. 2 · the tilting bed'),
  s5title:t('Slicen in Blender','Slicing in Blender'),s5lede:t('Eigen software voor vijf assen.','Custom software for five axes.'),
  s5:t(['Ik schreef een Blender-addon die het model opdeelt met “slicing cubes”: elke kubus bepaalt een deel dat in een andere stand geprint wordt. De addon berekent de A- en B-rotatie, snijdt het deel los en bewaart de rotatie erbij.','Daarna maakt CuraEngine de G-code voor elk deel, en de addon voegt alles samen tot één bestand.'],
   ['I wrote a Blender add-on that divides the model with “slicing cubes”: each cube defines a part to be printed in another orientation. The add-on computes the A and B rotation, slices the part off and stores the rotation with it.','CuraEngine then generates G-code for each part, and the add-on combines everything into one file.']),
  s5prints:[['ax-bed.webp','het bed','the bed'],['ax-fig.webp','figuur','figure']],
  s6title:'Code',s6:t([`De addon staat open op GitHub: ${link('https://github.com/bbo-git/5AxisSlicerBlenderAddon','5AxisSlicerBlenderAddon')}.`],[`The add-on is open on GitHub: ${link('https://github.com/bbo-git/5AxisSlicerBlenderAddon','5AxisSlicerBlenderAddon')}.`]),
  video:'ax-vid.mp4',s6prints:[['ax-peng.webp']],
  specs:[[t('Assen','Axes'),'X · Y · Z · A · B'],['Software',t('Blender-addon + CuraEngine','Blender add-on + CuraEngine')],[t('Doel','Goal'),t('overhang zonder support','overhangs without support')]]
 },t));

 /* VIII — The Journey Within */
 C.push(big({v:'A',id:'journey-within',title:'The Journey Within',heroC:['jw-title.webp','#0b1020',t('Fig. 1 · de helden','Fig. 1 · the heroes')],
  lede:t('Een spel dat zichzelf maakt terwijl je speelt.','A game that makes itself while you play.'),
  intro:t(['The Journey Within is een turn-based online spel voor vijf vrienden, op de regels van D&D. Karakters, wapens en beelden ontstaan tijdens het spelen: van tekst naar beeld naar 3D-model.','Dat genereren mag je zien. Het hoort bij de ervaring, net als de dobbelstenen die in 3D over het bord rollen.'],
   ['The Journey Within is a turn-based online game for five friends, built on the rules of D&D. Characters, weapons and images are created during play: from text to image to 3D model.','You get to see that generation happen. It is part of the experience, like the dice rolling across the board in 3D.']),
  openPrint:['jw-s2.webp',200,129,t('Fig. 2 · <i>stripstijl</i>','Fig. 2 · <i>comic style</i>')],
  spread:'jw-s0c.webp',spreadCap:t('Fig. 3 · een diorama, gegenereerd','Fig. 3 · a generated diorama'),
  s5title:'Session zero',s5lede:t('De eerste avond is helemaal karakters maken.','The first evening is all about making characters.'),
  s5:t(['Spelers kiezen om de beurt een klasse, passen een voorbeeldprompt aan voor hun 3D-model en rollen voor hun eigenschappen, terwijl hun held op de server ontstaat.','Het verhaal opent met de klassieke Lost Mine of Phandelver, in een stripstijl die doet denken aan Thorgal.'],
   ['Players take turns choosing a class, adjust an example prompt for their 3D model and roll for their abilities, while their hero is generated on the server.','The story opens with the classic Lost Mine of Phandelver, in a comic style reminiscent of Thorgal.']),
  s5prints:[['jw-s3.webp','het speelbord','the game board'],['jw-s1.webp','de forge','the forge'],['jw-s4.webp','het slagveld','the battlefield']],
  s6title:t('Techniek','Technology'),s6:t(['Beelden, 3D-modellen en tekst worden gegenereerd op een eigen GPU-server; Godot laat het spel zien.'],['Images, 3D models and text are generated on a dedicated GPU server; Godot shows the game.']),
  video:'jw-vid.mp4',s6prints:[],
  specs:[[t('Spelers','Players'),'5'],[t('Regels','Rules'),'D&D 5e'],['Engine','Godot'],[t('Generatie','Generation'),t('eigen GPU-server','dedicated GPU server')]]
 },t));

 /* IX — Violin shoulder rest */
 C.push(medium({v:'A',id:'vioolsteun',title:t('Vioolsteun','Violin shoulder rest'),full:'vi-full.webp',
  lede:t('Een schoudersteun die past als een handschoen.','A shoulder rest that fits like a glove.'),
  intro:t([`Mijn oude schoudersteun, een Wolf van zo’n 25 jaar oud, hield de viool niet goed op zijn plek. Mijn linkerhand moest dat steeds opvangen.`,`Dus scande ik mijn eigen schouder, in speelhouding, met Scandy Pro op een iPhone 12 Pro. Van die scan werd een schaal van vijf millimeter dik, die ik printte en combineerde met de eindstukken van de oude steun. De pasvorm was meteen goed.`],
   [`My old shoulder rest, a Wolf about 25 years old, didn’t keep the violin in place. My left hand kept having to make up for it.`,`So I scanned my own shoulder, in playing position, with Scandy Pro on an iPhone 12 Pro. The scan became a five-millimetre shell, which I printed and combined with the end pieces of the old rest. The fit was right first time.`]),
  openPrint:['vi-scan.webp',150,200,t('Fig. 1 · <i>de scan</i>','Fig. 1 · <i>the scan</i>')],
  spread:'vi-spread.webp',spreadCap:t('Fig. 2 · draaibank, Openbare Werkplaats','Fig. 2 · lathe, Openbare Werkplaats'),
  s5title:t('Van print naar esdoorn','From print to maple'),s5lede:t('Hout dat de vorm van een schouder krijgt.','Wood taking the shape of a shoulder.'),
  s5:t([`Voor de tweede versie printte ik een mal van de schouder, acht uur lang, om esdoornfineer in te persen en te lijmen. Buigen bleek veel lastiger dan gedacht, maar met lijmklemmen lukte het.`,`De eindstukken zijn van walnoot en messing buis, met M3-inserts zodat alles vervangbaar blijft. In de Openbare Werkplaats hielp Remco me groefjes in de staven te draaien. Daarna moest ik ze inkorten, en zaten de groefjes op de verkeerde plek. Dat heb ik geleerd.`],
   [`For the second version I printed a mould of the shoulder, eight hours long, to press and glue maple veneer into. Bending turned out to be much harder than expected, but clamps did the job.`,`The end pieces are walnut and brass tube, with M3 inserts so everything stays replaceable. At the Openbare Werkplaats, Remco helped me turn notches into the rods. Then I had to shorten them, and the notches ended up in the wrong place. Lesson learned.`]),
  s5prints:[['vi-print.webp','geprinte versie','printed version'],['vi-heat.webp','mal in de slicer','mould in the slicer'],['vi-clamp.webp','lijmen','gluing']],
  s6title:t('Resultaat','Result'),s6:t([`Met neopreen aan de onderkant is hij af. Het esdoorn veert prettig mee en voelt toch stevig, en niets raakt de achterkant van de viool. Nooit eerder kon ik de viool zo zeker loslaten met mijn linkerhand.`],
   [`With neoprene underneath it is finished. The maple flexes pleasantly yet feels firm, and nothing touches the back of the violin. Never before could I let go of the violin so confidently with my left hand.`]),
  video:null,s6prints:[['vi-fit.webp'],['vi-final.webp']],
  specs:[['Scan','Scandy Pro · iPhone 12 Pro'],[t('Materiaal','Material'),t('esdoorn, walnoot, messing','maple, walnut, brass')],[t('Mal','Mould'),t('PLA, 8 uur printen','PLA, 8 hour print')]]
 },t));

 /* X–XIX — small chapters */
 C.push(small({v:'C',id:'holo-display',title:t('Holografisch display','Holographic display'),plate:['ho-cad.webp',400,261,t('Fig. 1 · het mechaniek','Fig. 1 · the mechanism')],
  lede:t('Een LED-paneel dat zo snel op en neer zwiept dat er een volume ontstaat.','An LED panel sweeping up and down so fast that it becomes a volume.'),
  paras:t([`Een paneel van 16 × 16 LED’s zwiept op en neer en vormt zo een volume van 16 × 16 × 16 voxels. Een trommel draait continu rond; een nok maakt daar twee keer per omwenteling een slag op en neer van.`,`Een encoder op de trommel vertelt de Teensy 4.1 precies waar het paneel is, zodat op elke hoogte de juiste laag oplicht. Wat je ziet, hangt als een lichtsculptuur in de lucht.`,`Eerst kwamen de testprogramma’s en een vuurwerkdemo. Het doel: een interactief display met eigen spellen, zoals een canyon-flyer.`,`${link('https://youtube.com/shorts/RJR5n-0cEtM','Video 1')} · ${link('https://youtube.com/shorts/0Z9TOoc5prw','Video 2')}`],
   [`A panel of 16 × 16 LEDs sweeps up and down, forming a volume of 16 × 16 × 16 voxels. A barrel rotates continuously; a cam turns that into two up-and-down strokes per revolution.`,`An encoder on the barrel tells the Teensy 4.1 exactly where the panel is, so the right layer lights up at every height. What you see hangs in the air like a sculpture of light.`,`First came the test programs and a fireworks demo. The goal: an interactive display with games of its own, like a canyon flyer.`,`${link('https://youtube.com/shorts/RJR5n-0cEtM','Video 1')} · ${link('https://youtube.com/shorts/0Z9TOoc5prw','Video 2')}`]),prints:[['ho-fusion.webp',200,149]]},t));
 C.push(small({v:'A',id:'cinema-projector',title:t('Bioscoopprojector','Cinema projector'),full:'cp-full.webp',
  lede:t('Een goedkope beamer, flink opgewaardeerd.','A cheap projector, seriously upgraded.'),
  paras:t([`Een goedkope smart-home-projector, omgebouwd met een Mamiya-lens en een COB-led van 200 watt.`,`Het idee was simpel: de projector levert het beeld, de rest wordt beter. Een cameralens in plaats van het plastic exemplaar, en een veel fellere lichtbron.`,`Zo’n led wordt heet, dus er zit een flinke koeler op. Het resultaat hangt aan de muur en vult de kamer.`],
   [`A cheap smart home projector, rebuilt with a Mamiya lens and a 200-watt COB LED.`,`The idea was simple: the projector supplies the image, everything else gets better. A camera lens instead of the plastic one, and a much brighter light source.`,`An LED like that gets hot, so it sits on a hefty cooler. The result hangs on the wall and fills the room.`]),
  prints:[['cp-cob.webp',100,133,t('COB-led','COB LED')],['cp-build.webp',150,113,t('de ombouw','the rebuild')]],video:'cp-vid.mp4'},t));
 C.push(small({v:'B',id:'mood-tracker',title:'Mood tracker',plate:['mt-home.webp',220,352,t('Fig. 1 · de check-in','Fig. 1 · the check-in')],
  lede:t('Hoe gaat het met je?','How are you doing?'),
  paras:t([`Een persoonlijke check-in-app die je op je telefoon installeert. Op willekeurige momenten komt er een melding; je kiest dan per vraag de kaart die het best past, en ziet later de trends in grafieken.`,`De kaarten zijn waterverftekeningen van een klein figuurtje, Max. De antwoorden blijven op je eigen toestel. Gebouwd met React en Vite, met pushmeldingen via een kleine serverless backend.`,`${link('https://mood-tracker-one-bice.vercel.app',t('Probeer de app','Try the app'))}`],
   [`A personal check-in app you install on your phone. At random moments a notification arrives; you pick the card that fits best for each question, and later see the trends in charts.`,`The cards are watercolour drawings of a small character, Max. The answers stay on your own device. Built with React and Vite, with push notifications through a small serverless backend.`,`${link('https://mood-tracker-one-bice.vercel.app','Try the app')}`]),
  prints:[['mt-c-trots.webp',108,137],['mt-c-leuk.webp',108,115],['mt-c-begrepen.webp',108,123]]},t));
 C.push(small({v:'C',id:'the-woolf',title:'The Woolf',full:'wo-full.webp',heroPrint:['wo-render.webp',t('Fig. 2 · het geprinte prototype','Fig. 2 · the printed prototype')],heroVid:['wo-vid.mp4',t('Fig. 1 · <i>kijk scheel tot de twee beelden samenvallen</i>','Fig. 1 · <i>cross your eyes until the two images merge</i>')],
  lede:t('3D-video met je iPhone, via spiegels.','3D video with your iPhone, through mirrors.'),
  paras:t([`The Woolf klikt voor de camera van een iPhone. Spiegels splitsen het beeld als twee periscopen, op de afstand van twee ogen, zodat je stereoscopische video opneemt.`,`De eerste versie, ruim tien jaar geleden, had een Indiegogo-campagne en een paar trouwe backers. Maar met de ene camera van de iPhone 4 was het eigenlijk te veel gevraagd.`,`Met de camera’s van een iPhone 12 Pro werkt het principe veel beter. Ik neem met twee camera’s tegelijk op en zet de beelden in Blender naast elkaar. De viewer maakte ik van karton en lenzen die nog rondslingerden.`],
   [`The Woolf snaps in front of an iPhone camera. Mirrors split the view like two periscopes, spaced like a pair of eyes, so you record stereoscopic video.`,`The first version, over ten years ago, had an Indiegogo campaign and a few loyal backers. But with the single camera of the iPhone 4 it was really asking too much.`,`With the cameras of an iPhone 12 Pro the principle works much better. I record with two cameras at once and put the images side by side in Blender. I made the viewer from cardboard and some lenses I had lying around.`]),
  prints:[['wo-full.webp',110,144],['wo-sketch.webp',170,129]]},t));
 { const d={v:'A',id:'bambi-medical',title:'Bambi Medical',full:'bm-incubator.webp',
  lede:t('Een band voor de allerkleinsten.','A belt for the very smallest.'),
  intro:t([`De Bambi Belt meet draadloos de hartslag (ECG) en de ademhaling van te vroeg geboren baby’s. Geen plakkers en snoeren meer op een huid die daar nog veel te kwetsbaar voor is.`,
   `Ik ontwierp het prototype en bedacht dat de band een gietstuk van siliconenrubber moest zijn: dat glijdt niet, rekt mee en voelt zacht aan. Dat idee zit nu in het ontwerp van de Bambi Belt.`],
   [`The Bambi Belt wirelessly monitors heart rate (ECG) and breathing in premature babies. No more stickers and wires on skin that is far too fragile for them.`,
   `I designed the prototype and came up with the idea that the belt should be cast in silicone rubber: it doesn’t slip, it stretches and it feels soft. That idea is now part of the Bambi Belt design.`]),
  openPrint:['bm-product.webp',240,120,t('Fig. 2 · de Bambi Belt met basisstation','Fig. 2 · the Bambi Belt with base station')],
  s5title:t('Gieten','Casting'),s5lede:t('Siliconen in geprinte mallen.','Silicone in printed moulds.'),
  s5:t([`De mallen printte ik in gewoon PLA, open en gesloten. Siliconen gieten gaat daarin verrassend makkelijk. Mijn ontwerp had drie elektrodes, elk met een eigen kanaaltje naar de sensormodule.`,
   `Ik probeerde van alles: elektrodemateriaal injecteren in een gesloten mal, twee helften op elkaar lijmen, en het materiaal er met een injectienaald druppel voor druppel in leggen. ${link('https://youtube.com/watch?v=9ZlGgzDDFHI',t('Bekijk de video','Watch the video'))}`],
   [`I printed the moulds in ordinary PLA, open and closed. Casting silicone in them is surprisingly easy. My design had three electrodes, each with its own channel to the sensor module.`,
   `I tried everything: injecting electrode material into a closed mould, gluing two halves together, and laying the material in drop by drop with a hypodermic needle. ${link('https://youtube.com/watch?v=9ZlGgzDDFHI','Watch the video')}`]),
  s6title:t('Software','Software'),
  s6:t([`Later schreef ik embedded software voor de Bambi Interface: data loggen naar een SD-kaart, op een STM32 met FreeRTOS. Na een nachtelijke test stond er bijna 5 MB op de kaart, zonder één onderbreking. Missie geslaagd.`],
   [`Later I wrote embedded software for the Bambi Interface: logging data to an SD card, on an STM32 running FreeRTOS. After an overnight test there were almost 5 MB on the card, without a single interruption. Mission accomplished.`]),
  specs:[[t('Meet','Measures'),t('ECG en ademhaling','ECG and breathing')],[t('Band','Belt'),t('siliconenrubber','silicone rubber')],[t('Mallen','Moulds'),t('3D-geprint PLA','3D-printed PLA')],['Software','STM32 · FreeRTOS']],
  pull:'bm-detail.webp',
  endFull:'bm-proto.webp',endCap:t('Fig. 3 · prototype: drie elektrodes in gegoten siliconen','Fig. 3 · prototype: three electrodes in cast silicone')};
  const dGiet={...d,s6:null,s6title:null};
  const dSoft={s5title:d.s6title,s5lede:t('Data, elke 2 milliseconden.','Data, every 2 milliseconds.'),s5:d.s6};
  C.push({id:d.id,title:d.title,pages:[
   ()=>hero(d),
   n=>opener2(n,d,'l'),
   ()=>textPage(dGiet,t,null),
   ()=>collage([['bm-inject.webp','elektrodemateriaal injecteren in de gesloten mal','injecting electrode material into the closed mould'],['bm-vacuum.webp','mal en vacuümpot','mould and vacuum pot'],['bm-lattice.webp','een gegoten band','a cast belt']],t),
   ()=>full('bm-proto.webp',d.endCap),
   ()=>textPage(dSoft,t,null)+print('bm-kangaroo.webp',176,300,206,270,1.2)+cap(t('Fig. 6 · huid op huid, met de band om','Fig. 6 · skin to skin, belt on'),'left:62px;top:520px;width:96px')
  ]});
 }
 C.push(small({v:'A',id:'self-promoting-pawn',title:'Self-promoting pawn',full:'pw-full.webp',heroVid:['pw-vid.mp4',t('Fig. 1 · <i>de pion promoveert zichzelf</i>','Fig. 1 · <i>the pawn promotes itself</i>')],prints:[['pw-full.webp',96,128]],
  lede:t('Een pion die zichzelf tot dame promoveert.','A pawn that promotes itself to a queen.'),
  paras:t([`Een ontwerp van Works By Design dat me meteen te pakken had. Mijn eigen printer kon de kleine details niet aan, dus printte ik hem in resin.`,`Resin is niet het taaiste materiaal, en bewegende delen plakken snel. Eerst grafiet uit een potlood, daarna vaseline: toen gleed alles soepel. Met de STEP-bestanden paste ik een paar delen net iets aan.`,`De ijzerhandel keek vreemd op van stiftjes van 1,5 mm, en de veer vond ik bij een Deense fabrikant. Hij werkt drie, vier keer; daarna moet het ontgrendeldeel vervangen worden. Daar zoek ik nog een oplossing voor.`],
   [`A design by Works By Design that grabbed me straight away. My own printer couldn’t handle the small details, so I printed it in resin.`,`Resin isn’t the toughest material, and moving parts stick easily. First graphite from a pencil, then petroleum jelly: after that everything slid smoothly. With the STEP files I adjusted a few parts slightly.`,`The hardware store was surprised by 1.5 mm pins, and I found the spring at a Danish manufacturer. It works three or four times; then the release part needs replacing. I’m still looking for a fix.`])},t));
 C.push(small({v:'B',id:'knight-with-axe',title:'Knight with Axe',full:'kn-full.webp',
  lede:t('Een stempel dat een beweegbaar figuur werd.','A stamp that became a posable figure.'),
  paras:t([`Het begon met een ridder met een tweehandige bijl uit de stempelset van mijn oudste zoon. Eerst maakte ik er een beweegbaar houten figuurtje van, uit hout dat over was van de vioolsteun.`,`Ik vond hem zo leuk dat ik hem in Blender modelleerde, met een wat cartooneske look. De print is in PLA met roestvrijstalen kogels van 10 mm als gewrichten, dus hij is poseerbaar. Sommige gewrichten klikken te strak, andere te los.`,`De cape en de pluim verfde ik apart, in bijna kokend water met pigment.`],
   [`It started with a knight with a two-handed axe from my eldest son’s stamp set. First I made a small posable wooden figure of it, from wood left over from the violin rest.`,`I liked it so much that I modelled it in Blender, with a slightly cartoony look. The print is PLA with 10 mm stainless steel balls as joints, so it is posable. Some joints snap too tight, others too loose.`,`I dyed the cape and plume separately, in almost boiling water with pigment.`]),
  prints:[['kn-detail.webp',120,160]]},t));
 C.push(small({v:'C',id:'wall-e',title:'WALL-E',plate:['we-a.webp',360,268,t('Fig. 1','Fig. 1')],
  lede:t('Een klein, schattig model.','A small, cute model.'),
  paras:t([`Een van mijn eerste geprinte modellen, uit de tijd dat een 3D-print bestellen nog heel bijzonder was. Ik wilde iets kleins en schattigs maken: WALL-E.`,`De uitdaging zat in de rupsbanden, de scharnierende armen en het beweegbare hoofd. Sommige details zijn kleiner dan een halve millimeter.`,`${link('https://youtu.be/Scn7BxiT-Ew',t('Bekijk de video','Watch the video'))}`],
   [`One of my first printed models, from the days when ordering a 3D print still felt special. I wanted to make something small and cute: WALL-E.`,`The challenge was in the tracks, the articulated arms and the moving head. Some details are smaller than half a millimetre.`,`${link('https://youtu.be/Scn7BxiT-Ew','Watch the video')}`]),
  prints:[['we-b.webp',200,149]]},t));
 C.push(small({v:'A',id:'shapescale',title:'ShapeScale',plate:['ss-shot.webp',320,320,t('Fig. 1 · de app','Fig. 1 · the app')],
  lede:t('Freelance iOS, in 3D.','Freelance iOS, in 3D.'),
  paras:t([`In 2021 werkte ik als freelancer voor een bedrijf uit San Francisco aan hun iOS-app. ShapeScale maakt een 3D-scan van je lichaam, zodat je ziet hoe het verandert.`,`Ik werkte met SceneKit als 3D-engine en leerde van de besten in het vak. Race conditions, geheugenlekken, encryptie, Bluetooth, en een app die bijna helemaal opnieuw werd ontworpen. Klinkt leuk? Dat was het ook.`,`${link('https://youtube.com/watch?v=LKY5OF8ZXbg',t('Bekijk de video','Watch the video'))}`],
   [`In 2021 I freelanced for a San Francisco company on their iOS app. ShapeScale makes a 3D scan of your body, so you can see how it changes.`,`I worked with SceneKit as the 3D engine and learned from the best in the field. Race conditions, memory leaks, encryption, Bluetooth, and an app redesigned almost from scratch. Sounds fun? It was.`,`${link('https://youtube.com/watch?v=LKY5OF8ZXbg','Watch the video')}`]),prints:[]},t));
 C.push(small({v:'B',id:'asteroids-3d',title:'Asteroids 3D',plate:['as-a.webp',400,244,t('Fig. 1','Fig. 1')],
  lede:t('Een klassieker, in drie dimensies.','A classic, in three dimensions.'),
  paras:t([`Wat heb ik een plezier gehad met dit spel. De arcadeklassieker, maar dan in drie dimensies: een native iOS-game in SceneKit.`,`Met ruimtelijk geluid, mixed reality en een dogfight voor twee spelers met gamecontrollers.`,`${link('https://github.com/bbo-git/asteroids3D','GitHub')} · ${link('https://apps.apple.com/nl/app/asteroids-3d/id6446431464','App Store')} · ${link('https://youtube.com/shorts/CF-fIKQSH2A','Video')}`],
   [`I had so much fun with this game. The arcade classic, but in three dimensions: a native iOS game in SceneKit.`,`With spatial audio, mixed reality and a two-player dogfight with game controllers.`,`${link('https://github.com/bbo-git/asteroids3D','GitHub')} · ${link('https://apps.apple.com/nl/app/asteroids-3d/id6446431464','App Store')} · ${link('https://youtube.com/shorts/CF-fIKQSH2A','Video')}`]),
  prints:[['as-b.webp',200,92]]},t));
 return C;
}

/* ---------- chapter templates ----------
   Rule: every spread pairs a text page with an image page (full-bleed, plate or collage). */
const isVid=s=>/\.mp4$/.test(s);
function media(src,x,y,w,h,rot=0){return isVid(src)?vprint(src,x,y,w,h,rot):print(src,x,y,w,h,rot)}
/* fit an item of aspect a into a slot box, centred */
function fitBox(a,bx,by,bw,bh){let w=bw,h=w/a;if(h>bh){h=bh;w=h*a}return [Math.round(bx+(bw-w)/2),Math.round(by+(bh-h)/2),Math.round(w),Math.round(h)]}
function plateFit(src,mw,mh,capTxt){const [,,w,h]=fitBox(AR(src),0,0,mw,mh);return plate(src,w,h,capTxt)}
const fullContain=(src,bg,capTxt)=>`<div class="photo" style="left:0;top:0;width:${W}px;height:${H}px;background:${bg}">${im(src,'object-fit:contain')}</div>${capTxt?`<div class="cap onphoto" style="position:absolute;left:62px;bottom:30px;right:62px">${capTxt}</div>`:''}`;
const fullVid=(src,capTxt)=>`<div class="photo" style="left:0;top:0;width:${W}px;height:${H}px"><div class="vslot" data-src="${IMG+src}" style="background-image:url(${IMG+src.replace(/\.mp4$/,'-poster.webp')})"></div></div>${capTxt?`<div class="cap onphoto" style="position:absolute;left:62px;bottom:30px;right:62px">${capTxt}</div>`:''}`;
const heroImg=(d,m)=>hero(d,m);
function hero(d,mode){
 if(d.heroC)return fullContain(d.heroC[0],d.heroC[1],d.heroC[2]);
 if(d.full&&mode!=='plate')return full(d.full);
 const src=d.full||d.plate[0];return plateFit(src,380,470,d.plate?d.plate[3]:'');
}
/* collage: 2–5 items in hand-placed slots inside 62..458 × 84..592, numbered captions below */
const SLOTS={
 1:[[62,110,396,440]],
 2:[[62,92,250,290],[196,370,262,210]],
 3:[[62,92,226,260],[300,150,158,210],[120,372,290,210]],
 4:[[62,92,200,230],[276,112,182,190],[62,348,170,226],[250,322,208,262]],
 5:[[62,92,186,196],[262,92,196,150],[62,312,130,170],[208,262,250,200],[96,486,170,100]]};
function stack(items,t){items=items.slice(0,3);const n=items.length;let w=items.map(()=>300);
 const tot=()=>items.reduce((a,[s],i)=>a+w[i]/AR(s)+12,0)+26*(n-1);
 while(tot()>500&&w[0]>150)w=w.map(x=>x-6);
 let y=92+Math.max(0,(500-tot())/2),out='';const rots=[-1,.8,-.6,1];
 items.forEach(([src],i)=>{const h=Math.round(w[i]/AR(src));const x=i%2?458-w[i]-12:62;out+=media(src,x,y,w[i],h,rots[i]);y+=h+12+26});
 const caps=items.map(([,nl,en],i)=>nl?`${i+1}. ${t(nl,en)}`:'').filter(Boolean);
 if(caps.length)out+=cap(caps.join(' · '),'left:62px;bottom:52px;width:396px');return out}
function collage(items,t){if(items.filter(([s])=>AR(s)>1.15).length>items.length/2)return stack(items,t);items=items.slice(0,4);const sl=SLOTS[items.length]||SLOTS[1];let out='';const rots=[-1.2,.9,-.5,1.1,-.8];
 items.forEach(([src],i)=>{const [x,y,w,h]=fitBox(AR(src),...sl[i]);out+=media(src,x,y,w-12,h-12,rots[i])});
 const caps=items.map(([,nl,en],i)=>nl?`${i+1}. ${t(nl,en)}`:'').filter(Boolean);
 if(caps.length)out+=cap(caps.join(' · '),'left:62px;bottom:52px;width:396px');return out}
/* text page: section + optional second section + specs, flowing */
function textPage(d,t,withPull){
 let s=`<div style="position:absolute;left:62px;right:62px;top:92px"><h3 class="h2">${d.s5title}</h3>${d.s5lede?`<p class="lede" style="font-size:16px">${d.s5lede}</p>`:''}<div class="rule"></div>${cols(d.s5,' two')}`;
 if(d.s6&&d.s6title)s+=`<h4 class="h4">${d.s6title}</h4>${cols(d.s6)}`;
 s+=`</div>`;
 if(d.specs)s+=specs(d.specs,'left:62px;bottom:84px;width:250px');
 if(withPull){const [x,y,w,h]=fitBox(AR(withPull),326,440,132,168);s+=media(withPull,x,y+(168-h),w-12,h-12,1)}
 return s}
/* mixed: single text column left, prints stacked right */
function columnPage(d,t,items){
 let s=`<div style="position:absolute;left:62px;top:92px;width:224px"><h3 class="h2">${d.s5title}</h3>${d.s5lede?`<p class="lede" style="font-size:15px">${d.s5lede}</p>`:''}<div class="rule"></div>${cols(d.s5,' one')}${d.s6title?`<h4 class="h4">${d.s6title}</h4>${cols(d.s6,' one')}`:''}</div>`;
 items=items.slice(0,3);const n=items.length,gap=22,tot=520-gap*(n-1);let y=92;
 items.forEach(([src],i)=>{const [x,,w,h]=fitBox(AR(src),312,0,146,tot/n);s+=media(src,x+(i%2?8:-6),y,w-12,h-12,[.9,-1,.6][i]);y+=h+gap});
 if(d.specs)s+=specs(d.specs,'left:62px;bottom:84px;width:224px');
 return s}
function opener2(n,d,side){let s=opener(n,d.title,d.lede,d.intro);
 if(d.openPrint){let [src,w,h,c]=d.openPrint;const k=Math.min(1,150/h,(w>h*1.4?240:170)/w);w=Math.round(w*k);h=Math.round(h*k);
  if(side==='r')s+=print(src,458-w-12,680-58-h-12,w,h,1)+cap(c,`right:${62+w+40}px;bottom:72px;width:${Math.min(160,458-(62+w+40))}px;text-align:right`);
  else s+=print(src,62,680-58-h-12,w,h,-1)+cap(c,`left:${62+w+40}px;bottom:72px;width:${Math.min(180,458-(62+w+40))}px`)}
 return s}
function videoPlate(src,capTxt,snd,top){const a=AR(src),w=a>1?420:300,h=Math.round(w/a);top=top==null?(H-h)/2-30:top;
 return `<div class="plate" style="left:${(W-w-16)/2}px;top:${top}px;width:${w}px;height:${h}px"><div class="vslot" data-src="${IMG+src}" style="background-image:url(${IMG+src.replace(/\.mp4$/,'-poster.webp')})"></div>${snd?`<button class="snd" aria-label="sound">♪ <span>${t('geluid aan','sound on')}</span><span>${t('geluid uit','sound off')}</span></button>`:''}</div>${capTxt?`<div class="cap" style="position:absolute;left:62px;right:62px;top:${top+h+34}px;text-align:center">${capTxt}</div>`:''}`}
function spreadPair(d){
 if(d.videoPage)return [()=>full(d.spreadL),()=>videoPlate(d.reel||d.video,d.videoPage,!!d.reel)];
 if(d.spread)return [()=>half(d.spread,'l'),()=>half(d.spread,'r',d.spreadCap)];
 if(d.spreadL)return [()=>full(d.spreadL),()=>full(d.spreadR,d.spreadCap)];
 return [()=>plateFit(d.plateL[0],400,470),()=>plateFit(d.plateR[0],400,470,d.spreadCap)];
}
const pool=d=>[...(d.videoPage&&d.spreadR?[[d.spreadR,'houten front','wooden front']]:[]),...(d.s5prints||[]),...(d.s6prints||[]).map(p=>[p[0],p[1]||'',p[2]||''])];
function big(d,t){const v=d.v||'A',[sL,sR]=spreadPair(d),P=pool(d),V=d.video&&!d.videoPage?[[d.video,'video','video']]:[];
 const P2=d.pull?P.filter(p=>p[0]!==d.pull):P;
 const pages=
  v==='A'?[()=>hero(d),n=>opener2(n,d,'l'),sL,sR,()=>textPage(d,t,d.pull),()=>collage([...V,...P2],t)]:
  v==='B'?[n=>opener2(n,d,'r'),()=>hero(d),()=>collage([...P2,...V],t),()=>textPage(d,t,d.pull),sL,sR]:
  /* C */  [()=>hero(d,'plate'),n=>opener2(n,d,'l'),sL,sR,()=>columnPage(d,t,P),()=>d.video?fullVid(d.video,d.videoCap):full(P[P.length-1][0])];
 return {id:d.id,title:d.title,pages}}
function medium(d,t){const v=d.v||'A',P=pool(d),V=d.video?[[d.video,'video','video']]:[];
 const pages=v==='A'
  ?[()=>hero(d),n=>opener2(n,d,'l'),()=>textPage(d,t,d.pull),()=>d.endFull?full(d.endFull,d.endCap):collage([...V,...P.filter(p=>p[0]!==d.pull)],t)]
  :[n=>opener2(n,d,'r'),()=>hero(d),()=>columnPage(d,t,P),()=>d.spread?full(d.spread,d.spreadCap):d.video?fullVid(d.video):full(P[0][0])];
 return {id:d.id,title:d.title,pages}}
/* a playing card from the app: cut out along its own rounded edge, no photo border */
const cardImg=(src,x,y,w,h,rot)=>`<div class="cardimg" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px;transform:rotate(${rot}deg)">${im(src)}</div>`;
function smallText(n,d,align){let out=smallOpener(n,d.title,d.lede,d.paras);const ps=[...(d.video?[[d.video,100,150]]:[]),...(d.prints||[])];
 const g=ps.length>2?20:30,tw=ps.reduce((a,[s,w])=>a+w+12,0)+g*(ps.length-1);let x=align==='r'?458-tw:62;
 ps.forEach(([src,w,h],i)=>{const hh=h||150;out+=/^mt-c-/.test(src)?cardImg(src,x+6,680-70-hh-6,w,hh,[-2.5,1.5,-1][i]):media(src,x,680-70-hh-12,w,hh,[1,-1.2,.7][i]);x+=w+12+g});
 return out}
function small(d,t){const v=d.v||'A',hero=(d,m)=>d.heroVid?(d.heroPrint?videoPlate(d.heroVid[0],d.heroVid[1],true,118)+(()=>{const [src,cp]=d.heroPrint,w=300,h=Math.round(w/AR(src));return print(src,(W-w)/2-6,330,w,h,-1.2)+cap(cp,`left:62px;right:62px;top:${330+h+30}px;text-align:center`)})():videoPlate(d.heroVid[0],d.heroVid[1],true)):heroImg(d,m);
 const pages=v==='A'?[()=>hero(d),n=>smallText(n,d,'l')]
  :v==='B'?[n=>smallText(n,d,'r'),()=>hero(d)]
  :[()=>hero(d,'plate'),n=>smallText(n,d,'l')];
 return {id:d.id,title:d.title,pages}}

/* ---------- the whole book ---------- */
function BOOK(t){
 const C=CHAPTERS(t);
 const pages=[];  // {html,lr,ch}
 // title page (left, back of the cover) and contents (right)
 pages.push({kind:'title'});pages.push({kind:'toc'});
 C.forEach((c,ci)=>{c.num=ROMAN[ci+1];c.start=pages.length+1;c.pages.forEach((fn,k)=>pages.push({fn,ch:c,k}))});
 pages.push({kind:'colophon'});pages.push({kind:'end'});
 const N=pages.length;
 pages.forEach((p,i)=>{p.n=i+1;p.lr=(i%2===0)?'l':'r'});
 const titleHTML=`<div style="position:absolute;left:62px;right:62px;top:200px;text-align:center">
   <div class="num" style="font-size:22px;letter-spacing:.3em;color:var(--soft)">bbo.technology</div>
   <h1 class="ttl" style="font-size:54px;margin:26px 0">The Book of <i>Jairo</i></h1><div class="rule" style="margin:22px auto"></div>
   <p class="lede" style="font-size:17px">${t('Wat ik maak: robots, luidsprekers, printers, spellen en apps. Ik studeerde aan de filmschool, werkte als iOS-ontwikkelaar en ben altijd maker gebleven.','What I make: robots, loudspeakers, printers, games and apps. I studied at film school, worked as an iOS developer and have always remained a maker.')}</p>
   <p class="cap" style="margin-top:60px">Jairo Bambang Oetomo · Amsterdam</p></div>`;
 const tocHTML=`<div style="position:absolute;left:62px;right:62px;top:86px"><h3 class="h2">${t('Inhoud','Contents')}</h3><div class="rule"></div>
   <ol class="toc">${C.map(c=>`<li data-goto="${c.start}"><span class="tn">${c.num}</span><span class="tt">${c.title}</span><span class="tp">${c.start-2}</span></li>`).join('')}</ol></div>`;
 const colHTML=`<div style="position:absolute;left:62px;right:62px;top:92px"><h3 class="h2">${t('Colofon','Colophon')}</h3><div class="rule"></div>
   <p class="cap" style="line-height:2">The Book of Jairo<br>${t('Ontwerp, tekst en beeld','Design, text and images')}: Jairo Bambang Oetomo<br>${t('Gezet in EB Garamond en Cormorant Garamond','Set in EB Garamond and Cormorant Garamond')}<br>${t('Gebouwd met HTML en CSS','Built with HTML and CSS')}<br>${t('Concepttekst · november 2026','Draft text · November 2026')}</p></div>`;
 pages.forEach(p=>{
  const rh=p.ch?(p.lr==='l'?'The Book of Jairo':`${p.ch.num} · ${p.ch.title}`):'';
  const fo=(p.n>2&&p.n<N-1)?`<div class="fo">${p.n-2}</div>`:'';
  let inner;
  if(p.kind==='title')inner=titleHTML;else if(p.kind==='toc')inner=tocHTML;else if(p.kind==='colophon')inner=colHTML;
  else if(p.kind==='end')inner=`<div class="cap" style="position:absolute;left:0;right:0;bottom:60px;text-align:center">bbo.technology</div>`;
  else inner=p.fn(p.ch.num);
  const isFull=/class="photo( half)?" style="left:0;top:0;width:520px/.test(inner);
  p.html=`<div class="pg ${p.lr}">${inner}${rh&&!isFull?`<div class="rh">${rh}</div>`:''}${isFull?'':fo}</div>`;
 });
 return {pages,chapters:C,N};
}
