import{a as pr,b as U,d as mr,f as ur,h as dr,i as cr,k as kt,l as gr,m as I}from"./chunk-LWA7II2Q.js";import{a as W}from"./chunk-5XPORB2B.js";import{a as ge,c as P,d as u,e as A,f as d,g as S,h as It,i as y,j as z,k as x}from"./chunk-WKWCM3NN.js";import{a as he,b as hr}from"./chunk-F3UND4MX.js";import{d as lr,e as ce}from"./chunk-S4ZNJEAB.js";import{h as or,l as ar,u as sr}from"./chunk-CM3DPZVF.js";import{a as Pt,b as At,c as bt,e as Dt,h as St,j as p,k as G,m as K,n as N,o as R,p as nr,q as w}from"./chunk-K5RKCHW3.js";import{c as $r}from"./chunk-SYRP7SJ5.js";var fr={"bottom-row":!0,none:!0},fe=class extends u{getDefaultValue(){return"auto"}};var ye="http://www.w3.org/2000/svg",yr="data-copy-id",wr=0;function Jr(){return wr+=1,`svg${wr.toString()}`}var ei={dim:{white:"#dddddd",orange:"#884400",limegreen:"#008800",red:"#660000","rgb(34, 102, 255)":"#000088",yellow:"#888800","rgb(102, 0, 153)":"rgb(50, 0, 76)",purple:"#3f003f"},oriented:"#44ddcc",ignored:"#555555",invisible:"#00000000"},Q=class{constructor(t,e,r){this.kpuzzle=t;this.originalColors={};this.gradients={};if(!e)throw new Error(`No SVG definition for puzzle type: ${t.name()}`);this.svgID=Jr(),this.wrapperElement=document.createElement("div"),this.wrapperElement.classList.add("svg-wrapper"),this.wrapperElement.innerHTML=e;let i=this.wrapperElement.querySelector("svg");if(!i)throw new Error("Could not get SVG element");if(this.svgElement=i,ye!==i.namespaceURI)throw new Error("Unexpected XML namespace");i.style.maxWidth="100%",i.style.maxHeight="100%",this.gradientDefs=document.createElementNS(ye,"defs"),i.insertBefore(this.gradientDefs,i.firstChild);for(let o in t.definition.orbits){let a=t.definition.orbits[o];for(let s=0;s<a.numPieces;s++)for(let l=0;l<a.numOrientations;l++){let c=this.elementID(o,s,l),m=this.elementByID(c),f=m.style.fill;r?(()=>{let g=r.orbits;if(!g)return;let M=g[o];if(!M)return;let T=M.pieces[s];if(!T)return;let D=T.facelets[l];if(!D)return;let j=typeof D=="string"?D:D?.mask,F=ei[j];typeof F=="string"?f=F:F&&(f=F[f])})():f=m.style.fill,this.originalColors[c]=f,this.gradients[c]=this.newGradient(c,f),this.gradientDefs.appendChild(this.gradients[c]),m.setAttribute("style",`fill: url(#grad-${this.svgID}-${c})`)}}for(let o of Array.from(i.querySelectorAll(`[${yr}]`))){let a=o.getAttribute(yr);o.setAttribute("style",`fill: url(#grad-${this.svgID}-${a})`)}}drawState(t,e,r){this.draw(t,e,r)}draw(t,e,r){let i=t.experimentalToTransformation(),o=e?.experimentalToTransformation();if(!i)throw new Error("Distinguishable pieces are not handled for SVG yet!");for(let a in i.kpuzzle.definition.orbits){let s=i.kpuzzle.definition.orbits[a],l=i.transformationData[a],c=o?o.transformationData[a]:null;for(let m=0;m<s.numPieces;m++)for(let f=0;f<s.numOrientations;f++){let g=this.elementID(a,m,f),M=this.elementID(a,l.permutation[m],(s.numOrientations-l.orientation[m]+f)%s.numOrientations),T=!1;if(c){let D=this.elementID(a,c.permutation[m],(s.numOrientations-c.orientation[m]+f)%s.numOrientations);M===D&&(T=!0),r=r||0;let j=100*(1-r*r*(2-r*r));this.gradients[g].children[0].setAttribute("stop-color",this.originalColors[M]),this.gradients[g].children[1].setAttribute("stop-color",this.originalColors[M]),this.gradients[g].children[1].setAttribute("offset",`${Math.max(j-5,0)}%`),this.gradients[g].children[2].setAttribute("offset",`${Math.max(j-5,0)}%`),this.gradients[g].children[3].setAttribute("offset",`${j}%`),this.gradients[g].children[4].setAttribute("offset",`${j}%`),this.gradients[g].children[4].setAttribute("stop-color",this.originalColors[D]),this.gradients[g].children[5].setAttribute("stop-color",this.originalColors[D])}else T=!0;T&&(this.gradients[g].children[0].setAttribute("stop-color",this.originalColors[M]),this.gradients[g].children[1].setAttribute("stop-color",this.originalColors[M]),this.gradients[g].children[1].setAttribute("offset","100%"),this.gradients[g].children[2].setAttribute("offset","100%"),this.gradients[g].children[3].setAttribute("offset","100%"),this.gradients[g].children[4].setAttribute("offset","100%"))}}}newGradient(t,e){let r=document.createElementNS(ye,"radialGradient");r.setAttribute("id",`grad-${this.svgID}-${t}`),r.setAttribute("r","70.7107%");let i=[{offset:0,color:e},{offset:0,color:e},{offset:0,color:"black"},{offset:0,color:"black"},{offset:0,color:e},{offset:100,color:e}];for(let o of i){let a=document.createElementNS(ye,"stop");a.setAttribute("offset",`${o.offset}%`),a.setAttribute("stop-color",o.color),a.setAttribute("stop-opacity","1"),r.appendChild(a)}return r}elementID(t,e,r){return`${t}-l${e}-o${r}`}elementByID(t){return this.wrapperElement.querySelector(`#${t}`)}};var Ci={auto:!0,simple:!0,tree:!0,simultaneous:!0},we=class extends u{getDefaultValue(){return"auto"}};function ee(n,t){if(n===t)return!0;if(n.length!==t.length)return!1;for(let e=0;e<n.length;e++)if(n[e]!==t[e])return!1;return!0}function Lt(n,t,e){if(n===t)return!0;if(n.length!==t.length)return!1;for(let r=0;r<n.length;r++)if(!e(n[r],t[r]))return!1;return!0}function Ct(n,t,e=0){return(n%t+t+e)%t-e}function Et(n,t,e){return Ct(n-t,e-t)+t}var k=class{constructor(t){this.warnings=Object.freeze(t?.warnings??[]),this.errors=Object.freeze(t?.errors??[]),Object.freeze(this)}add(t){return new k({warnings:this.warnings.concat(t?.warnings??[]),errors:this.errors.concat(t?.errors??[])})}log(){this.errors.length>0?console.error(`\u{1F6A8} ${this.errors[0]}`):this.warnings.length>0?console.warn(`\u26A0\uFE0F ${this.warnings[0]}`):console.info("\u{1F60E} No issues!")}};function Nt(n){try{let t=w.fromString(n),e=[];return t.toString()!==n&&e.push("Alg is non-canonical!"),{alg:t,issues:new k({warnings:e})}}catch(t){return{alg:new w,issues:new k({errors:[`Malformed alg: ${t.toString()}`]})}}}function ti(n,t){return n.alg.isIdentical(t.alg)&&ee(n.issues.warnings,t.issues.warnings)&&ee(n.issues.errors,t.issues.errors)}var te=class extends P{getDefaultValue(){return{alg:new w,issues:new k}}canReuseValue(t,e){return ti(t,e)}async derive(t){return typeof t=="string"?Nt(t):{alg:t,issues:new k}}};var vr=!0;function qi(n){vr=n}var re=class extends d{async derive(t){try{return vr&&t.kpuzzle.algToTransformation(t.algWithIssues.alg),t.algWithIssues}catch(e){return{alg:new w,issues:new k({errors:[`Invalid alg for puzzle: ${e.toString()}`]})}}}};var Ki={start:!0,end:!0},ve=class extends u{getDefaultValue(){return"start"}};var Zi={"3x3x3":!0,custom:!0,"2x2x2":!0,"4x4x4":!0,"5x5x5":!0,"6x6x6":!0,"7x7x7":!0,"40x40x40":!0,megaminx:!0,pyraminx:!0,square1:!0,clock:!0,skewb:!0,fto:!0,gigaminx:!0,master_tetraminx:!0,kilominx:!0,redi_cube:!0,melindas2x2x2x2:!0},xe=class extends u{getDefaultValue(){return A}};var xr={none:!0,"side-by-side":!0,"top-right":!0},Me=class extends u{getDefaultValue(){return"auto"}};var tn={twizzle:!0,"experimental-twizzle-explorer":!0,none:!0},ze=class extends u{getDefaultValue(){return"auto"}};var on={"3D":!0,"2D":!0,"experimental-2D-LL":!0,PG3D:!0},Te=class extends u{getDefaultValue(){return"auto"}};var ln={auto:!0,none:!0},Pe=class extends u{getDefaultValue(){return"auto"}};var un={auto:!0,none:!0,basic:!0},Ae=class extends u{getDefaultValue(){return"auto"}};var gn={checkered:!0,"checkered-transparent":!0,none:!0},be=class extends u{getDefaultValue(){return"auto"}};var Rt=class{constructor(t){this.model=t;this.catchingUp=!1;this.pendingFrame=!1;this.scheduler=new U(this.animFrame.bind(this));this.catchUpMs=500;this.lastTimestamp=0}start(){this.catchingUp||(this.lastTimestamp=performance.now()),this.catchingUp=!0,this.pendingFrame=!0,this.scheduler.requestAnimFrame()}stop(){this.catchingUp=!1,this.scheduler.cancelAnimFrame()}animFrame(t){this.scheduler.requestAnimFrame();let e=(t-this.lastTimestamp)/this.catchUpMs;this.lastTimestamp=t,this.model.catchUpMove.set((async()=>{let r=await this.model.catchUpMove.get();if(r.move===null)return r;let i=r.amount+e;return i>=1?(this.pendingFrame=!0,this.stop(),this.model.timestampRequest.set("end"),{move:null,amount:0}):(this.pendingFrame=!1,{move:r.move,amount:i})})())}},De=class{constructor(t,e){this.delegate=e;this.playing=!1;this.direction=1;this.lastDatestamp=0;this.scheduler=new U(this.animFrame.bind(this));this.#t=new ge;this.model=t,this.lastTimestampPromise=this.#e(),this.model.playingInfo.addFreshListener(this.onPlayingProp.bind(this)),this.catchUpHelper=new Rt(this.model),this.model.catchUpMove.addFreshListener(this.onCatchUpMoveProp.bind(this))}async onPlayingProp(t){t.playing!==this.playing&&(t.playing?this.play(t):this.pause())}async onCatchUpMoveProp(t){let e=t.move!==null;e!==this.catchUpHelper.catchingUp&&(e?this.catchUpHelper.start():this.catchUpHelper.stop()),this.scheduler.requestAnimFrame()}async#e(){return(await this.model.detailedTimelineInfo.get()).timestamp}jumpToStart(t){this.model.timestampRequest.set("start"),this.pause(),t?.flash&&this.delegate.flash()}jumpToEnd(t){this.model.timestampRequest.set("end"),this.pause(),t?.flash&&this.delegate.flash()}playPause(){this.playing?this.pause():this.play()}async play(t){let e=t?.direction??1,r=await this.model.coarseTimelineInfo.get();(t?.autoSkipToOtherEndIfStartingAtBoundary??!0)&&(e===1&&r.atEnd&&(this.model.timestampRequest.set("start"),this.delegate.flash()),e===-1&&r.atStart&&(this.model.timestampRequest.set("end"),this.delegate.flash())),this.model.playingInfo.set({playing:!0,direction:e,untilBoundary:t?.untilBoundary??"entire-timeline",loop:t?.loop??!1}),this.playing=!0,this.lastDatestamp=performance.now(),this.lastTimestampPromise=this.#e(),this.scheduler.requestAnimFrame()}pause(){this.playing=!1,this.scheduler.cancelAnimFrame(),this.model.playingInfo.set({playing:!1,untilBoundary:"entire-timeline"})}#t;async animFrame(t){this.playing&&this.scheduler.requestAnimFrame();let e=this.lastDatestamp,r=await this.#t.queue(Promise.all([this.model.playingInfo.get(),this.lastTimestampPromise,this.model.timeRange.get(),this.model.tempoScale.get(),this.model.currentMoveInfo.get()])),[i,o,a,s,l]=r;if(!i.playing){this.playing=!1;return}let c=l.earliestEnd;(l.currentMoves.length===0||i.untilBoundary==="entire-timeline")&&(c=a.end);let m=l.latestStart;(l.currentMoves.length===0||i.untilBoundary==="entire-timeline")&&(m=a.start);let f=(t-e)*this.direction*s;f=Math.max(f,1),f*=i.direction;let g=o+f,M=null;g>=c?i.loop?g=Et(g,a.start,a.end):(g===a.end?M="end":g=c,this.playing=!1,this.model.playingInfo.set({playing:!1})):g<=m&&(i.loop?g=Et(g,a.start,a.end):(g===a.start?M="start":g=m,this.playing=!1,this.model.playingInfo.set({playing:!1}))),this.lastDatestamp=t,this.lastTimestampPromise=Promise.resolve(g),this.model.timestampRequest.set(M??g)}};var Se=class{constructor(t,e){this.model=t;this.animationController=new De(t,e)}jumpToStart(t){this.animationController.jumpToStart(t)}jumpToEnd(t){this.animationController.jumpToEnd(t)}togglePlay(t){typeof t>"u"&&this.animationController.playPause(),t?this.animationController.play():this.animationController.pause()}async visitTwizzleLink(){let t=document.createElement("a");t.href=await this.model.twizzleLink(),t.target="_blank",t.click()}};var Ie=new z(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.wrapper > * {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.wrapper.back-view-side-by-side {
  grid-template-columns: 1fr 1fr;
}

.wrapper.back-view-top-right {
  grid-template-columns: 3fr 1fr;
  grid-template-rows: 1fr 3fr;
}

.wrapper.back-view-top-right > :nth-child(1) {
  grid-row: 1 / 3;
  grid-column: 1 / 3;
}

.wrapper.back-view-top-right > :nth-child(2) {
  grid-row: 1 / 2;
  grid-column: 2 / 3;
}
`);var Mr=new z(`
:host {
  width: 384px;
  height: 256px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
}

.svg-wrapper,
twisty-2d-svg,
svg {
  width: 100%;
  height: 100%;
  display: grid;
  min-height: 0;
}

svg {
  animation: fade-in 0.25s ease-in;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
`);var ie=class extends x{constructor(e,r,i,o,a){super();this.model=e;this.kpuzzle=r;this.svgSource=i;this.options=o;this.puzzleLoader=a;this.scheduler=new U(this.render.bind(this));this.#e=null;this.#t=new S;this.addCSS(Mr),this.resetSVG(),this.#t.addListener(this.model.puzzleID,s=>{a?.id!==s&&this.disconnect()}),this.#t.addListener(this.model.legacyPosition,this.onPositionChange.bind(this)),this.options?.experimentalStickeringMask&&this.experimentalSetStickeringMask(this.options.experimentalStickeringMask)}#e;#t;disconnect(){this.#t.disconnect()}onPositionChange(e){try{if(e.movesInProgress.length>0){let r=e.movesInProgress[0].move,i=r;e.movesInProgress[0].direction===-1&&(i=r.invert());let o=e.state.applyMove(i);this.svgWrapper.draw(e.state,o,e.movesInProgress[0].fraction)}else this.svgWrapper.draw(e.state),this.#e=e}catch(r){console.warn("Bad position (this doesn't necessarily mean something is wrong). Pre-emptively disconnecting:",this.puzzleLoader?.id,r),this.disconnect()}}scheduleRender(){this.scheduler.requestAnimFrame()}experimentalSetStickeringMask(e){this.resetSVG(e)}resetSVG(e){this.svgWrapper&&this.removeElement(this.svgWrapper.wrapperElement),this.kpuzzle&&(this.svgWrapper=new Q(this.kpuzzle,this.svgSource,e),this.addElement(this.svgWrapper.wrapperElement),this.#e&&this.onPositionChange(this.#e))}render(){}};y.define("twisty-2d-puzzle",ie);var ke=class{constructor(t,e,r,i){this.model=t;this.schedulable=e;this.puzzleLoader=r;this.effectiveVisualization=i;this.twisty2DPuzzle(),this.#e.addListener(this.model.twistySceneModel.stickeringMask,async o=>{(await this.twisty2DPuzzle()).experimentalSetStickeringMask(o)})}#e=new S;disconnect(){this.#e.disconnect()}scheduleRender(){}#t=null;async twisty2DPuzzle(){return this.#t??(this.#t=(async()=>{let t=this.effectiveVisualization==="experimental-2D-LL"?this.puzzleLoader.llSVG():this.puzzleLoader.svg();return new ie(this.model,await this.puzzleLoader.kpuzzle(),await t,{},this.puzzleLoader)})())}};var ne=class extends x{constructor(e,r){super();this.model=e;this.effectiveVisualization=r}#e=new S;disconnect(){this.#e.disconnect()}async connectedCallback(){this.addCSS(Ie),this.model&&this.#e.addListener(this.model.twistyPlayerModel.puzzleLoader,this.onPuzzleLoader.bind(this))}#t;async scene(){return this.#t??(this.#t=(async()=>new(await I).Scene)())}scheduleRender(){this.#r?.scheduleRender()}#r=null;currentTwisty2DPuzzleWrapper(){return this.#r}async setCurrentTwisty2DPuzzleWrapper(e){let r=this.#r;this.#r=e,r?.disconnect();let i=e.twisty2DPuzzle();this.contentWrapper.textContent="",this.addElement(await i)}async onPuzzleLoader(e){this.#r?.disconnect();let r=new ke(this.model.twistyPlayerModel,this,e,this.effectiveVisualization);this.setCurrentTwisty2DPuzzleWrapper(r)}};y.define("twisty-2d-scene-wrapper",ne);var _=class{constructor(){this.promise=new Promise((t,e)=>{this.#e=t,this.reject=e})}#e;handleNewValue(t){this.#e(t)}};var Z=class extends EventTarget{constructor(e,r,i,o){super();this.model=e;this.schedulable=r;this.puzzleLoader=i;this.visualizationStrategy=o;this.twisty3DPuzzle(),this.#e.addListener(this.model.puzzleLoader,a=>{this.puzzleLoader.id!==a.id&&this.disconnect()}),this.#e.addListener(this.model.legacyPosition,async a=>{try{(await this.twisty3DPuzzle()).onPositionChange(a),this.scheduleRender()}catch{this.disconnect()}}),this.#e.addListener(this.model.twistySceneModel.hintFacelet,async a=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({hintFacelets:a==="auto"?"floating":a}),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.foundationDisplay,async a=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({showFoundation:a!=="none"}),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.stickeringMask,async a=>{(await this.twisty3DPuzzle()).setStickeringMask(a),this.scheduleRender()}),this.#e.addListener(this.model.twistySceneModel.faceletScale,async a=>{(await this.twisty3DPuzzle()).experimentalUpdateOptions({faceletScale:a}),this.scheduleRender()}),this.#e.addMultiListener3([this.model.twistySceneModel.stickeringMask,this.model.twistySceneModel.foundationStickerSprite,this.model.twistySceneModel.hintStickerSprite],async a=>{"experimentalUpdateTexture"in await this.twisty3DPuzzle()&&((await this.twisty3DPuzzle()).experimentalUpdateTexture(a[0].specialBehaviour==="picture",a[1],a[2]),this.scheduleRender())})}#e=new S;disconnect(){this.#e.disconnect()}scheduleRender(){this.schedulable.scheduleRender(),this.dispatchEvent(new CustomEvent("render-scheduled"))}#t=null;async twisty3DPuzzle(){return this.#t??(this.#t=(async()=>{let e=gr();if(this.puzzleLoader.id==="3x3x3"&&this.visualizationStrategy==="Cube3D"){let[r,i,o,a]=await Promise.all([this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.stickeringMask.get(),this.model.twistySceneModel.initialHintFaceletsAnimation.get()]);return(await e).cube3DShim(()=>this.schedulable.scheduleRender(),{foundationSprite:r,hintSprite:i,experimentalStickeringMask:o,initialHintFaceletsAnimation:a})}else{let[r,i,o,a]=await Promise.all([this.model.twistySceneModel.hintFacelet.get(),this.model.twistySceneModel.foundationStickerSprite.get(),this.model.twistySceneModel.hintStickerSprite.get(),this.model.twistySceneModel.faceletScale.get()]),s=(await e).pg3dShim(()=>this.schedulable.scheduleRender(),this.puzzleLoader,r==="auto"?"floating":r,a);return s.then(l=>l.experimentalUpdateTexture(!0,i??void 0,o??void 0)),s}})())}async raycastMove(e,r){let i=await this.twisty3DPuzzle();if(!("experimentalGetControlTargets"in i)){console.info("not PG3D! skipping raycast");return}let o=i.experimentalGetControlTargets(),[a,s]=await Promise.all([e,this.model.twistySceneModel.movePressCancelOptions.get()]),l=a.intersectObjects(o);if(l.length>0){let c=i.getClosestMoveToAxis(l[0].point,r);c?this.model.experimentalAddMove(c.move,{cancel:s}):console.info("Skipping move!")}}};var X=class extends x{constructor(e){super();this.model=e}#e=new W(this,"back-view-",["auto","none","side-by-side","top-right"]);#t=new S;disconnect(){this.#t.disconnect()}async connectedCallback(){if(Array.from(this.#o.values()).length<1){this.addCSS(Ie);let e=new kt(this.model,this);this.addVantage(e),this.model&&(this.#t.addMultiListener([this.model.puzzleLoader,this.model.visualizationStrategy],this.onPuzzle.bind(this)),this.#t.addListener(this.model.backView,this.onBackView.bind(this))),this.scheduleRender()}}#r=null;setBackView(e){let r=["side-by-side","top-right"].includes(e),i=this.#r!==null;this.#e.setValue(e),r?i||(this.#r=new kt(this.model,this,{backView:!0}),this.addVantage(this.#r),this.scheduleRender()):this.#r&&(this.removeVantage(this.#r),this.#r=null)}onBackView(e){this.setBackView(e)}async onPress(e){let r=this.#n;if(!r){console.info("no wrapper; skipping scene wrapper press!");return}let i=(async()=>{let[o,a]=await Promise.all([e.detail.cameraPromise,I]),s=new a.Raycaster,l=new(await I).Vector2(e.detail.pressInfo.normalizedX,e.detail.pressInfo.normalizedY);return s.setFromCamera(l,o),s})();r.raycastMove(i,{invert:!e.detail.pressInfo.rightClick,depth:e.detail.pressInfo.keys.ctrlOrMetaKey?"rotation":e.detail.pressInfo.keys.shiftKey?"secondSlice":"none"})}#i;async scene(){return this.#i??(this.#i=(async()=>new(await I).Scene)())}#o=new Set;addVantage(e){e.addEventListener("press",this.onPress.bind(this)),this.#o.add(e),this.contentWrapper.appendChild(e)}removeVantage(e){this.#o.delete(e),e.remove(),e.disconnect(),this.#n?.disconnect()}experimentalVantages(){return this.#o.values()}scheduleRender(){for(let e of this.#o)e.scheduleRender()}#n=null;async setCurrentTwisty3DPuzzleWrapper(e,r){let i=this.#n;try{this.#n=r,i?.disconnect(),e.add(await r.twisty3DPuzzle())}finally{i&&e.remove(await i.twisty3DPuzzle())}this.#a.handleNewValue(r)}#a=new _;async experimentalTwisty3DPuzzleWrapper(){return this.#n||this.#a.promise}#s=new ge;async onPuzzle(e){if(e[1]==="2D")return;this.#n?.disconnect();let[r,i]=await this.#s.queue(Promise.all([this.scene(),new Z(this.model,this,e[0],e[1])]));this.setCurrentTwisty3DPuzzleWrapper(r,i)}};y.define("twisty-3d-scene-wrapper",X);var zr=new z(`
:host {
  width: 384px;
  height: 24px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.wrapper {
  grid-auto-flow: column;
}

.viewer-link-none .twizzle-link-button {
  display: none;
}

.wrapper twisty-button,
.wrapper twisty-control-button {
  width: inherit;
  height: inherit;
}
`),Tr=new z(`
:host:not([hidden]) {
  display: grid;
}

:host {
  width: 48px;
  height: 24px;
}

.wrapper {
  width: 100%;
  height: 100%;
}

button {
  width: 100%;
  height: 100%;
  border: none;
  
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-color: rgba(196, 196, 196, 0.75);
}

button:enabled {
  background-color: rgba(196, 196, 196, 0.75)
}

.dark-mode button:enabled {
  background-color: #88888888;
}

button:disabled {
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0.25;
  pointer-events: none;
}

.dark-mode button:disabled {
  background-color: #ffffff44;
}

button:enabled:hover {
  background-color: rgba(255, 255, 255, 0.75);
  box-shadow: 0 0 1em rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

/* TODO: fullscreen icons have too much padding?? */
.svg-skip-to-start button,
button.svg-skip-to-start {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjQzIDEwMzdxMTktMTkgMzItMTN0MTMgMzJ2MTQ3MnEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djcxMHEwIDI2LTEzIDMydC0zMi0xM2wtNzEwLTcxMHEtOS05LTEzLTE5djY3OHEwIDI2LTE5IDQ1dC00NSAxOUg5NjBxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWgxMjhxMjYgMCA0NSAxOXQxOSA0NXY2NzhxNC0xMSAxMy0xOWw3MTAtNzEwcTE5LTE5IDMyLTEzdDEzIDMydjcxMHE0LTExIDEzLTE5eiIvPjwvc3ZnPg==");
}

.svg-skip-to-end button,
button.svg-skip-to-end {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik05NDEgMjU0N3EtMTkgMTktMzIgMTN0LTEzLTMyVjEwNTZxMC0yNiAxMy0zMnQzMiAxM2w3MTAgNzEwcTggOCAxMyAxOXYtNzEwcTAtMjYgMTMtMzJ0MzIgMTNsNzEwIDcxMHE4IDggMTMgMTl2LTY3OHEwLTI2IDE5LTQ1dDQ1LTE5aDEyOHEyNiAwIDQ1IDE5dDE5IDQ1djE0MDhxMCAyNi0xOSA0NXQtNDUgMTloLTEyOHEtMjYgMC00NS0xOXQtMTktNDV2LTY3OHEtNSAxMC0xMyAxOWwtNzEwIDcxMHEtMTkgMTktMzIgMTN0LTEzLTMydi03MTBxLTUgMTAtMTMgMTl6Ii8+PC9zdmc+");
}

.svg-step-forward button,
button.svg-step-forward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDE1NjhxMCAyNi0xOSA0NWwtNTEyIDUxMnEtMTkgMTktNDUgMTl0LTQ1LTE5cS0xOS0xOS0xOS00NXYtMjU2aC0yMjRxLTk4IDAtMTc1LjUgNnQtMTU0IDIxLjVxLTc2LjUgMTUuNS0xMzMgNDIuNXQtMTA1LjUgNjkuNXEtNDkgNDIuNS04MCAxMDF0LTQ4LjUgMTM4LjVxLTE3LjUgODAtMTcuNSAxODEgMCA1NSA1IDEyMyAwIDYgMi41IDIzLjV0Mi41IDI2LjVxMCAxNS04LjUgMjV0LTIzLjUgMTBxLTE2IDAtMjgtMTctNy05LTEzLTIydC0xMy41LTMwcS03LjUtMTctMTAuNS0yNC0xMjctMjg1LTEyNy00NTEgMC0xOTkgNTMtMzMzIDE2Mi00MDMgODc1LTQwM2gyMjR2LTI1NnEwLTI2IDE5LTQ1dDQ1LTE5cTI2IDAgNDUgMTlsNTEyIDUxMnExOSAxOSAxOSA0NXoiLz48L3N2Zz4=");
}

.svg-step-backward button,
button.svg-step-backward {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNjg4IDIwNDhxMCAxNjYtMTI3IDQ1MS0zIDctMTAuNSAyNHQtMTMuNSAzMHEtNiAxMy0xMyAyMi0xMiAxNy0yOCAxNy0xNSAwLTIzLjUtMTB0LTguNS0yNXEwLTkgMi41LTI2LjV0Mi41LTIzLjVxNS02OCA1LTEyMyAwLTEwMS0xNy41LTE4MXQtNDguNS0xMzguNXEtMzEtNTguNS04MC0xMDF0LTEwNS41LTY5LjVxLTU2LjUtMjctMTMzLTQyLjV0LTE1NC0yMS41cS03Ny41LTYtMTc1LjUtNmgtMjI0djI1NnEwIDI2LTE5IDQ1dC00NSAxOXEtMjYgMC00NS0xOWwtNTEyLTUxMnEtMTktMTktMTktNDV0MTktNDVsNTEyLTUxMnExOS0xOSA0NS0xOXQ0NSAxOXExOSAxOSAxOSA0NXYyNTZoMjI0cTcxMyAwIDg3NSA0MDMgNTMgMTM0IDUzIDMzM3oiLz48L3N2Zz4=");
}

.svg-pause button,
button.svg-pause {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNTYwIDEwODh2MTQwOHEwIDI2LTE5IDQ1dC00NSAxOWgtNTEycS0yNiAwLTQ1LTE5dC0xOS00NVYxMDg4cTAtMjYgMTktNDV0NDUtMTloNTEycTI2IDAgNDUgMTl0MTkgNDV6bS04OTYgMHYxNDA4cTAgMjYtMTkgNDV0LTQ1IDE5aC01MTJxLTI2IDAtNDUtMTl0LTE5LTQ1VjEwODhxMC0yNiAxOS00NXQ0NS0xOWg1MTJxMjYgMCA0NSAxOXQxOSA0NXoiLz48L3N2Zz4=");
}

.svg-play button,
button.svg-play {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNTg0IiBoZWlnaHQ9IjM1ODQiIHZpZXdCb3g9IjAgMCAzNTg0IDM1ODQiPjxwYXRoIGQ9Ik0yNDcyLjUgMTgyM2wtMTMyOCA3MzhxLTIzIDEzLTM5LjUgM3QtMTYuNS0zNlYxMDU2cTAtMjYgMTYuNS0zNnQzOS41IDNsMTMyOCA3MzhxMjMgMTMgMjMgMzF0LTIzIDMxeiIvPjwvc3ZnPg==");
}

.svg-enter-fullscreen button,
button.svg-enter-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTkgMTZIN3Y1aDV2LTJIOXYtM3ptLTItNGgyVjloM1Y3SDd2NXptMTIgN2gtM3YyaDV2LTVoLTJ2M3pNMTYgN3YyaDN2M2gyVjdoLTV6Ii8+PC9zdmc+");
}

.svg-exit-fullscreen button,
button.svg-exit-fullscreen {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgd2lkdGg9IjI4Ij48cGF0aCBkPSJNMiAyaDI0djI0SDJ6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTcgMThoM3YzaDJ2LTVIN3Yyem0zLThIN3YyaDVWN2gtMnYzem02IDExaDJ2LTNoM3YtMmgtNXY1em0yLTExVjdoLTJ2NWg1di0yaC0zeiIvPjwvc3ZnPg==");
}

.svg-twizzle-tw button,
button.svg-twizzle-tw {
  background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODY0IiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMzk3LjU4MSAxNTEuMTh2NTcuMDg0aC04OS43MDN2MjQwLjM1MmgtNjYuOTU1VjIwOC4yNjRIMTUxLjIydi01Ny4wODNoMjQ2LjM2MXptNTQuMzEgNzEuNjc3bDcuNTEyIDMzLjY5MmMyLjcxOCAxMi4xNiA1LjU4IDI0LjY4IDguNTg0IDM3LjU1NWEyMTgwLjc3NSAyMTgwLjc3NSAwIDAwOS40NDIgMzguODQzIDEyNjYuMyAxMjY2LjMgMCAwMDEwLjA4NiAzNy41NTVjMy43Mi0xMi41OSA3LjM2OC0yNS40NjYgMTAuOTQ1LTM4LjYyOCAzLjU3Ni0xMy4xNjIgNy4wMS0yNi4xMSAxMC4zLTM4Ljg0M2w1Ljc2OS0yMi40NTZjMS4yNDgtNC44ODcgMi40NzItOS43MDUgMy42NzQtMTQuNDU1IDMuMDA0LTExLjg3NSA1LjY1MS0yMi45NjIgNy45NC0zMy4yNjNoNDYuMzU0bDIuMzg0IDEwLjU2M2EyMDAwLjc3IDIwMDAuNzcgMCAwMDMuOTM1IDE2LjgyOGw2LjcxMSAyNy43MWMxLjIxMyA0Ljk1NiAyLjQ1IDkuOTggMy43MDkgMTUuMDczYTMxMTkuNzc3IDMxMTkuNzc3IDAgMDA5Ljg3MSAzOC44NDMgMTI0OS4yMjcgMTI0OS4yMjcgMCAwMDEwLjczIDM4LjYyOCAxOTA3LjYwNSAxOTA3LjYwNSAwIDAwMTAuMzAxLTM3LjU1NSAxMzk3Ljk0IDEzOTcuOTQgMCAwMDkuNjU3LTM4Ljg0M2w0LjQtMTkuMDQ2Yy43MTUtMy4xMyAxLjQyMS02LjIzNiAyLjExOC05LjMyMWw5LjU3Ny00Mi44OGg2Ni41MjZhMjk4OC43MTggMjk4OC43MTggMCAwMS0xOS41MjkgNjYuMzExbC01LjcyOCAxOC40ODJhMzIzNy40NiAzMjM3LjQ2IDAgMDEtMTQuMDE1IDQzLjc1MmMtNi40MzggMTkuNi0xMi43MzMgMzcuNjk4LTE4Ljg4NSA1NC4yOTRsLTMuMzA2IDguODI1Yy00Ljg4NCAxMi44OTgtOS40MzMgMjQuMjYzLTEzLjY0NyAzNC4wOTVoLTQ5Ljc4N2E4NDE3LjI4OSA4NDE3LjI4OSAwIDAxLTIxLjAzMS02NC44MDkgMTI4OC42ODYgMTI4OC42ODYgMCAwMS0xOC44ODUtNjQuODEgMTk3Mi40NDQgMTk3Mi40NDQgMCAwMS0xOC4yNCA2NC44MSAyNTc5LjQxMiAyNTc5LjQxMiAwIDAxLTIwLjM4OCA2NC44MWgtNDkuNzg3Yy00LjY4Mi0xMC45MjYtOS43Mi0yMy43NDMtMTUuMTEtMzguNDUxbC0xLjYyOS00LjQ3Yy01LjI1OC0xNC41MjEtMTAuNjgtMzAuMTkyLTE2LjI2Ni00Ny4wMTRsLTIuNDA0LTcuMjhjLTYuNDM4LTE5LjYtMTMuMDItNDAuMzQ0LTE5Ljc0My02Mi4yMzRhMjk4OC43MDcgMjk4OC43MDcgMCAwMS0xOS41MjktNjYuMzExaDY3LjM4NXoiIGZpbGw9IiM0Mjg1RjQiIGZpbGwtcnVsZT0ibm9uemVybyIvPjwvc3ZnPg==");
}
`);var C=typeof document>"u"?null:document;var Pr=C?.fullscreenEnabled||!!C?.webkitFullscreenEnabled;function Ar(){return document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen()}function Ot(){return document.fullscreenElement?document.fullscreenElement:document.webkitFullscreenElement??null}function br(n){return n.requestFullscreen?n.requestFullscreen():n.webkitRequestFullscreen()}var Dr=["skip-to-start","skip-to-end","step-forward","step-backward","pause","play","enter-fullscreen","exit-fullscreen","twizzle-tw"],Le=class extends d{derive(t){return{fullscreen:{enabled:Pr,icon:document.fullscreenElement===null?"enter-fullscreen":"exit-fullscreen",title:"Enter fullscreen"},"jump-to-start":{enabled:!t.coarseTimelineInfo.atStart,icon:"skip-to-start",title:"Restart"},"play-step-backwards":{enabled:!t.coarseTimelineInfo.atStart,icon:"step-backward",title:"Step backward"},"play-pause":{enabled:!(t.coarseTimelineInfo.atStart&&t.coarseTimelineInfo.atEnd),icon:t.coarseTimelineInfo.playing?"pause":"play",title:t.coarseTimelineInfo.playing?"Pause":"Play"},"play-step":{enabled:!t.coarseTimelineInfo.atEnd,icon:"step-forward",title:"Step forward"},"jump-to-end":{enabled:!t.coarseTimelineInfo.atEnd,icon:"skip-to-end",title:"Skip to End"},"twizzle-link":{enabled:!0,icon:"twizzle-tw",title:"View at Twizzle",hidden:t.viewerLink==="none"}}}};var Sr={fullscreen:!0,"jump-to-start":!0,"play-step-backwards":!0,"play-pause":!0,"play-step":!0,"jump-to-end":!0,"twizzle-link":!0},oe=class extends x{constructor(e,r,i){super();this.model=e;this.controller=r;this.defaultFullscreenElement=i;this.buttons=null}connectedCallback(){this.addCSS(zr);let e={};for(let r in Sr){let i=new Ce;e[r]=i,i.htmlButton.addEventListener("click",()=>this.#e(r)),this.addElement(i)}this.buttons=e,this.model?.buttonAppearance.addFreshListener(this.update.bind(this)),this.model?.twistySceneModel.darkMode.addFreshListener(this.updateDarkMode.bind(this))}#e(e){switch(e){case"fullscreen":{this.onFullscreenButton();break}case"jump-to-start":{this.controller?.jumpToStart({flash:!0});break}case"play-step-backwards":{this.controller?.animationController.play({direction:-1,untilBoundary:"move"});break}case"play-pause":{this.controller?.togglePlay();break}case"play-step":{this.controller?.animationController.play({direction:1,untilBoundary:"move"});break}case"jump-to-end":{this.controller?.jumpToEnd({flash:!0});break}case"twizzle-link":{this.controller?.visitTwizzleLink();break}default:throw new Error("Missing command")}}async onFullscreenButton(){if(!this.defaultFullscreenElement)throw new Error("Attempted to go fullscreen without an element.");if(Ot()===this.defaultFullscreenElement)Ar();else{this.buttons?.fullscreen.setIcon("exit-fullscreen"),br(await this.model?.twistySceneModel.fullscreenElement.get()??this.defaultFullscreenElement);let e=()=>{Ot()!==this.defaultFullscreenElement&&(this.buttons?.fullscreen.setIcon("enter-fullscreen"),window.removeEventListener("fullscreenchange",e))};window.addEventListener("fullscreenchange",e)}}async update(e){for(let r in Sr){let i=this.buttons[r],o=e[r];i.htmlButton.disabled=!o.enabled,i.htmlButton.title=o.title,i.setIcon(o.icon),i.hidden=!!o.hidden}}updateDarkMode(e){for(let r of Object.values(this.buttons??{}))r.updateDarkMode(e)}};y.define("twisty-buttons",oe);var Ce=class extends x{constructor(){super(...arguments);this.htmlButton=document.createElement("button");this.#e=new W(this,"svg-",Dr)}updateDarkMode(e){this.contentWrapper.classList.toggle("dark-mode",e==="dark")}connectedCallback(){this.addCSS(Tr),this.addElement(this.htmlButton)}#e;setIcon(e){this.#e.setValue(e)}};y.define("twisty-button",Ce);var Ir=new z(`
:host {
  width: 384px;
  height: 16px;
  display: grid;
}

.wrapper {
  width: 100%;
  height: 100%;
  display: grid;
  overflow: hidden;
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  background: rgba(196, 196, 196, 0.75);
}

input:not(:disabled) {
  cursor: ew-resize;
}

.wrapper.dark-mode {
  background: #666666;
}
`);var ri=!1,Ne=!1;C?.addEventListener("mousedown",function(n){n.which&&(Ne=!0)},!0);C?.addEventListener("mouseup",function(n){n.which&&(Ne=!1)},!0);var Ft=0,Ee=0;C?.addEventListener("mousedown",()=>{Ee++},!1);C?.addEventListener("mousemove",Cr,!1);C?.addEventListener("mouseenter",Cr,!1);function Cr(n){Ft=n.pageY}var kr=0,Lr=0,Vt=!1,jt=0,ae=class extends x{constructor(e,r){super();this.model=e;this.controller=r}async onDetailedTimelineInfo(e){let r=await this.inputElem();r.min=e.timeRange.start.toString(),r.max=e.timeRange.end.toString(),r.disabled=r.min===r.max,r.value=e.timestamp.toString()}async connectedCallback(){this.addCSS(Ir),this.addElement(await this.inputElem()),this.model?.twistySceneModel.darkMode.addFreshListener(this.updateDarkMode.bind(this))}updateDarkMode(e){this.contentWrapper.classList.toggle("dark-mode",e==="dark")}#e=null;async inputElem(){return this.#e??(this.#e=(async()=>{let e=document.createElement("input");return e.type="range",e.disabled=!0,this.model?.detailedTimelineInfo.addFreshListener(this.onDetailedTimelineInfo.bind(this)),e.addEventListener("input",this.onInput.bind(this)),e.addEventListener("keydown",this.onKeypress.bind(this)),e})())}async onInput(e){if(Vt)return;let r=await this.inputElem();await this.slowDown(e,r);let i=parseInt(r.value);this.model?.playingInfo.set({playing:!1}),this.model?.timestampRequest.set(i)}onKeypress(e){switch(e.key){case"ArrowLeft":case"ArrowRight":{this.controller?.animationController.play({direction:e.key==="ArrowLeft"?-1:1,untilBoundary:"move"}),e.preventDefault();break}case" ":{this.controller?.togglePlay(),e.preventDefault();break}}}async slowDown(e,r){if(!!ri&&Ne){let i=r.getBoundingClientRect(),o=i.top+i.height/2;console.log(o,e,Ft,Ne);let a=Math.abs(o-Ft),s=1;a>64&&(s=Math.max(Math.pow(2,-(a-64)/64),1/32));let l=parseInt(r.value);if(console.log("cl",jt,Ee,l),jt===Ee){let c=(l-Lr)*s;console.log("delta",c,a),Vt=!0;let m=l;m=kr+c*s+(l-kr)*Math.min(1,Math.pow(1/2,a*a/64)),r.value=m.toString(),console.log(s),Vt=!1,this.contentWrapper.style.opacity=s.toString()}else jt=Ee;Lr=l}}};y.define("twisty-scrubber",ae);var ii=null;async function Ut(n,t){let[{PerspectiveCamera:e,Scene:r},i,o,a,s,l,c]=await Promise.all([I,await n.puzzleLoader.get(),await n.visualizationStrategy.get(),await n.twistySceneModel.stickeringRequest.get(),await n.twistySceneModel.stickeringMaskRequest.get(),await n.legacyPosition.get(),await n.twistySceneModel.orbitCoordinates.get()]),m=t?.width??2048,f=t?.height??2048,g=m/f,M=ii??(ii=await(async()=>new e(20,g,.1,20))()),T=new r,D=new Z(n,{scheduleRender:()=>{}},i,o);T.add(await D.twisty3DPuzzle()),await cr(M,c);let F=(await dr(m,f,T,M)).toDataURL(),Zr=await Bt(n);return{dataURL:F,download:async Xr=>{qt(F,Xr??Zr)}}}async function Bt(n){let[t,e]=await Promise.all([n.puzzleID.get(),n.alg.get()]);return`[${t}]${e.alg.experimentalNumChildAlgNodes()===0?"":` ${e.alg.toString()}`}`}function qt(n,t,e="png"){let r=document.createElement("a");r.href=n,r.download=`${t}.${e}`,r.click()}var Er=new z(`
:host {
  width: 384px;
  height: 256px;
  display: grid;

  -webkit-user-select: none;
  user-select: none;
}

.wrapper {
  display: grid;
  overflow: hidden;
  contain: size;
  grid-template-rows: 7fr minmax(1.5em, 0.5fr) minmax(2em, 1fr);
}

.wrapper > * {
  width: inherit;
  height: inherit;
  overflow: hidden;
}

.wrapper.controls-none {
  grid-template-rows: 7fr;
}

.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-control-button-panel ,
.wrapper.controls-none twisty-scrubber,
.wrapper.controls-none twisty-buttons {
  display: none;
}

twisty-scrubber {
  background: rgba(196, 196, 196, 0.5);
}

.wrapper.checkered,
.wrapper.checkered-transparent {
  background-color: #EAEAEA;
  background-image: linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD),
    linear-gradient(45deg, #DDD 25%, transparent 25%, transparent 75%, #DDD 75%, #DDD);
  background-size: 32px 32px;
  background-position: 0 0, 16px 16px;
}

.wrapper.checkered-transparent {
  background-color: #F4F4F4;
  background-image: linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88),
    linear-gradient(45deg, #DDDDDD88 25%, transparent 25%, transparent 75%, #DDDDDD88 75%, #DDDDDD88);
}

.wrapper.dark-mode {
  background-color: #444;
  background-image: linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b),
    linear-gradient(45deg, #DDDDDD0b 25%, transparent 25%, transparent 75%, #DDDDDD0b 75%, #DDDDDD0b);
}

.visualization-wrapper > * {
  width: 100%;
  height: 100%;
}

.error-elem {
  width: 100%;
  height: 100%;
  display: none;
  place-content: center;
  font-family: sans-serif;
  box-shadow: inset 0 0 2em rgb(255, 0, 0);
  color: red;
  text-shadow: 0 0 0.2em white;
  background: rgba(255, 255, 255, 0.25);
}

.wrapper.error .visualization-wrapper {
  display: none;
}

.wrapper.error .error-elem {
  display: grid;
}
`);var se=class extends u{getDefaultValue(){return null}};var B=class extends P{getDefaultValue(){return null}derive(t){return typeof t=="string"?new URL(t,location.href):t}};var Re=class extends d{derive(t){return t.kpuzzle.algToTransformation(t.setupAlg.alg)}};var We=class extends d{derive(t){if(t.setupTransformation)return t.setupTransformation;switch(t.setupAnchor){case"start":return t.setupAlgTransformation;case"end":{let r=t.indexer.transformationAtIndex(t.indexer.numAnimatedLeaves()).invert();return t.setupAlgTransformation.applyTransformation(r)}default:throw new Error("Unimplemented!")}}};var Oe=class extends u{getDefaultValue(){return{move:null,amount:0}}canReuseValue(t,e){return t.move===e.move&&t.amount===e.amount}};var Ve=class extends d{derive(t){return{stateIndex:t.currentMoveInfo.stateIndex,movesFinishing:t.currentMoveInfo.movesFinishing.map(e=>e.move),movesFinished:t.currentMoveInfo.movesFinished.map(e=>e.move)}}canReuseValue(t,e){return t.stateIndex===e.stateIndex&&Lt(t.movesFinishing,e.movesFinishing,(r,i)=>r.isIdentical(i))&&Lt(t.movesFinished,e.movesFinished,(r,i)=>r.isIdentical(i))}};var je=class extends d{derive(t){function e(r){return t.detailedTimelineInfo.atEnd&&t.catchUpMove.move!==null&&r.currentMoves.push({move:t.catchUpMove.move,direction:-1,fraction:1-t.catchUpMove.amount,startTimestamp:-1,endTimestamp:-1}),r}if(t.indexer.currentMoveInfo)return e(t.indexer.currentMoveInfo(t.detailedTimelineInfo.timestamp));{let r=t.indexer.timestampToIndex(t.detailedTimelineInfo.timestamp),i={stateIndex:r,currentMoves:[],movesFinishing:[],movesFinished:[],movesStarting:[],latestStart:-1/0,earliestEnd:1/0};if(t.indexer.numAnimatedLeaves()>0){let o=t.indexer.getAnimLeaf(r)?.as(p);if(!o)return e(i);let a=t.indexer.indexToMoveStartTimestamp(r),s=t.indexer.moveDuration(r),l=s?(t.detailedTimelineInfo.timestamp-a)/s:0,c=a+s,m={move:o,direction:1,fraction:l,startTimestamp:a,endTimestamp:c};l===0?i.movesStarting.push(m):l===1?i.movesFinishing.push(m):(i.currentMoves.push(m),i.latestStart=Math.max(i.latestStart,a),i.earliestEnd=Math.min(i.earliestEnd,c))}return e(i)}}};var Fe=class extends d{derive(t){let e=t.indexer.transformationAtIndex(t.currentLeavesSimplified.stateIndex);e=t.anchoredStart.applyTransformation(e);for(let r of t.currentLeavesSimplified.movesFinishing)e=e.applyMove(r);for(let r of t.currentLeavesSimplified.movesFinished)e=e.applyMove(r);return e.toKState()}};function L(n){switch(Math.abs(n)){case 0:return 0;case 1:return 1e3;case 2:return 1500;default:return 2e3}}var $=class extends N{constructor(e=L){super();this.durationForAmount=e}traverseAlg(e){let r=0;for(let i of e.childAlgNodes())r+=this.traverseAlgNode(i);return r}traverseGrouping(e){return e.amount*this.traverseAlg(e.alg)}traverseMove(e){return this.durationForAmount(e.amount)}traverseCommutator(e){return 2*(this.traverseAlg(e.A)+this.traverseAlg(e.B))}traverseConjugate(e){return 2*this.traverseAlg(e.A)+this.traverseAlg(e.B)}traversePause(e){return this.durationForAmount(1)}traverseNewline(e){return this.durationForAmount(1)}traverseLineComment(e){return this.durationForAmount(0)}};var J=class{constructor(t,e){this.kpuzzle=t;this.durationFn=new $(L);this.moves=new w(e.experimentalExpand())}getAnimLeaf(t){return Array.from(this.moves.childAlgNodes())[t]}indexToMoveStartTimestamp(t){let e=new w(Array.from(this.moves.childAlgNodes()).slice(0,t));return this.durationFn.traverseAlg(e)}timestampToIndex(t){let e=0,r;for(r=0;r<this.numAnimatedLeaves();r++)if(e+=this.durationFn.traverseMove(this.getAnimLeaf(r)),e>=t)return r;return r}stateAtIndex(t){return this.kpuzzle.startState().applyTransformation(this.transformationAtIndex(t))}transformationAtIndex(t){let e=this.kpuzzle.identityTransformation();for(let r of Array.from(this.moves.childAlgNodes()).slice(0,t))e=e.applyMove(r);return e}algDuration(){return this.durationFn.traverseAlg(this.moves)}numAnimatedLeaves(){return hr(this.moves)}moveDuration(t){return this.durationFn.traverseMove(this.getAnimLeaf(t))}};var Nr={u:"y",l:"x",f:"z",r:"x",b:"z",d:"y",m:"x",e:"y",s:"z",x:"x",y:"y",z:"z"};function ni(n,t){return Nr[n.family[0].toLowerCase()]===Nr[t.family[0].toLowerCase()]}var Ht=class extends N{traverseAlg(t){let e=[];for(let r of t.childAlgNodes())e.push(this.traverseAlgNode(r));return Array.prototype.concat(...e)}traverseGroupingOnce(t){if(t.experimentalIsEmpty())return[];for(let o of t.childAlgNodes())if(!o.is(p))return this.traverseAlg(t);let e=Array.from(t.childAlgNodes()),r=L(e[0].amount);for(let o=0;o<e.length-1;o++){for(let a=1;a<e.length;a++)if(!ni(e[o],e[a]))return this.traverseAlg(t);r=Math.max(r,L(e[o].amount))}let i=e.map(o=>({animLeafAlgNode:o,msUntilNext:0,duration:r}));return i[i.length-1].msUntilNext=r,i}traverseGrouping(t){let e=[],r=t.amount>0?t.alg:t.alg.invert();for(let i=0;i<Math.abs(t.amount);i++)e.push(this.traverseGroupingOnce(r));return Array.prototype.concat(...e)}traverseMove(t){let e=L(t.amount);return[{animLeafAlgNode:t,msUntilNext:e,duration:e}]}traverseCommutator(t){let e=[],r=[t.A,t.B,t.A.invert(),t.B.invert()];for(let i of r)e.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...e)}traverseConjugate(t){let e=[],r=[t.A,t.B,t.A.invert()];for(let i of r)e.push(this.traverseGroupingOnce(i));return Array.prototype.concat(...e)}traversePause(t){if(t.experimentalNISSGrouping)return[];let e=L(1);return[{animLeafAlgNode:t,msUntilNext:e,duration:e}]}traverseNewline(t){return[]}traverseLineComment(t){return[]}},oi=R(Ht);function Rr(n){let t=0;return oi(n).map(r=>{let i={animLeaf:r.animLeafAlgNode,start:t,end:t+r.duration};return t+=r.msUntilNext,i})}var ai={"y' y' U' E D R2 r2 F2 B2 U E D' R2 L2' z2 S2 U U D D S2 F2' B2":[{animLeaf:new p("y",-1),start:0,end:1e3},{animLeaf:new p("y",-1),start:1e3,end:2e3},{animLeaf:new p("U",-1),start:1e3,end:1600},{animLeaf:new p("E",1),start:1200,end:1800},{animLeaf:new p("D"),start:1400,end:2e3},{animLeaf:new p("R",2),start:2e3,end:3500},{animLeaf:new p("r",2),start:2e3,end:3500},{animLeaf:new p("F",2),start:3500,end:4200},{animLeaf:new p("B",2),start:3800,end:4500},{animLeaf:new p("U",1),start:4500,end:5500},{animLeaf:new p("E",1),start:4500,end:5500},{animLeaf:new p("D",-1),start:4500,end:5500},{animLeaf:new p("R",2),start:5500,end:6500},{animLeaf:new p("L",-2),start:5500,end:6500},{animLeaf:new p("z",2),start:5500,end:6500},{animLeaf:new p("S",2),start:6500,end:7500},{animLeaf:new p("U"),start:7500,end:8e3},{animLeaf:new p("D"),start:7750,end:8250},{animLeaf:new p("U"),start:8e3,end:8500},{animLeaf:new p("D"),start:8250,end:8750},{animLeaf:new p("S",2),start:8750,end:9250},{animLeaf:new p("F",-2),start:8750,end:1e4},{animLeaf:new p("B",2),start:8750,end:1e4}],"M' R' U' D' M R":[{animLeaf:new p("M",-1),start:0,end:1e3},{animLeaf:new p("R",-1),start:0,end:1e3},{animLeaf:new p("U",-1),start:1e3,end:2e3},{animLeaf:new p("D",-1),start:1e3,end:2e3},{animLeaf:new p("M"),start:2e3,end:3e3},{animLeaf:new p("R"),start:2e3,end:3e3}],"U' E' r E r2' E r U E":[{animLeaf:new p("U",-1),start:0,end:1e3},{animLeaf:new p("E",-1),start:0,end:1e3},{animLeaf:new p("r"),start:1e3,end:2500},{animLeaf:new p("E"),start:2500,end:3500},{animLeaf:new p("r",-2),start:3500,end:5e3},{animLeaf:new p("E"),start:5e3,end:6e3},{animLeaf:new p("r"),start:6e3,end:7e3},{animLeaf:new p("U"),start:7e3,end:8e3},{animLeaf:new p("E"),start:7e3,end:8e3}]},le=class{constructor(t,e){this.kpuzzle=t;this.animLeaves=ai[e.toString()]??Rr(e)}getAnimLeaf(t){return this.animLeaves[Math.min(t,this.animLeaves.length-1)]?.animLeaf??null}getAnimLeafWithRange(t){return this.animLeaves[Math.min(t,this.animLeaves.length-1)]}indexToMoveStartTimestamp(t){let e=0;return this.animLeaves.length>0&&(e=this.animLeaves[Math.min(t,this.animLeaves.length-1)].start),e}timestampToIndex(t){let e=0;for(e=0;e<this.animLeaves.length;e++)if(this.animLeaves[e].start>=t)return Math.max(0,e-1);return Math.max(0,e-1)}timestampToPosition(t,e){let r=this.currentMoveInfo(t),i=e??this.kpuzzle.identityTransformation().toKState();for(let o of this.animLeaves.slice(0,r.stateIndex)){let a=o.animLeaf.as(p);a!==null&&(i=i.applyMove(a))}return{state:i,movesInProgress:r.currentMoves}}currentMoveInfo(t){let e=1/0;for(let m of this.animLeaves)if(m.start<=t&&m.end>=t)e=Math.min(e,m.start);else if(m.start>t)break;let r=[],i=[],o=[],a=[],s=-1/0,l=1/0,c=0;for(let m of this.animLeaves)if(m.end<=e)c++;else{if(m.start>t)break;{let f=m.animLeaf.as(p);if(f!==null){let g=(t-m.start)/(m.end-m.start),M=!1;g>1&&(g=1,M=!0);let T={move:f,direction:1,fraction:g,startTimestamp:m.start,endTimestamp:m.end};switch(g){case 0:{i.push(T);break}case 1:{M?a.push(T):o.push(T);break}default:r.push(T),s=Math.max(s,m.start),l=Math.min(l,m.end)}}}}return{stateIndex:c,currentMoves:r,latestStart:s,earliestEnd:l,movesStarting:i,movesFinishing:o,movesFinished:a}}stateAtIndex(t,e){let r=e??this.kpuzzle.startState();for(let i=0;i<this.animLeaves.length&&i<t;i++){let a=this.animLeaves[i].animLeaf.as(p);a!==null&&(r=r.applyMove(a))}return r}transformationAtIndex(t){let e=this.kpuzzle.identityTransformation();for(let r of this.animLeaves.slice(0,t)){let i=r.animLeaf.as(p);i!==null&&(e=e.applyMove(i))}return e}algDuration(){let t=0;for(let e of this.animLeaves)t=Math.max(t,e.end);return t}numAnimatedLeaves(){return this.animLeaves.length}moveDuration(t){let e=this.getAnimLeafWithRange(t);return e.end-e.start}};var E=class{constructor(t,e,r,i,o=[]){this.moveCount=t;this.duration=e;this.forward=r;this.backward=i;this.children=o}},Ue=class extends N{constructor(e){super();this.kpuzzle=e;this.durationFn=new $(L);this.cache={};this.identity=e.identityTransformation(),this.dummyLeaf=new E(0,0,this.identity,this.identity,[])}traverseAlg(e){let r=0,i=0,o=this.identity,a=[];for(let s of e.childAlgNodes()){let l=this.traverseAlgNode(s);r+=l.moveCount,i+=l.duration,o===this.identity?o=l.forward:o=o.applyTransformation(l.forward),a.push(l)}return new E(r,i,o,o.invert(),a)}traverseGrouping(e){let r=this.traverseAlg(e.alg);return this.mult(r,e.amount,[r])}traverseMove(e){let r=e.toString(),i=this.cache[r];if(i)return i;let o=this.kpuzzle.moveToTransformation(e);return i=new E(1,this.durationFn.traverseAlgNode(e),o,o.invert()),this.cache[r]=i,i}traverseCommutator(e){let r=this.traverseAlg(e.A),i=this.traverseAlg(e.B),o=r.forward.applyTransformation(i.forward),a=r.backward.applyTransformation(i.backward),s=o.applyTransformation(a),l=new E(2*(r.moveCount+i.moveCount),2*(r.duration+i.duration),s,s.invert(),[r,i]);return this.mult(l,1,[l,r,i])}traverseConjugate(e){let r=this.traverseAlg(e.A),i=this.traverseAlg(e.B),a=r.forward.applyTransformation(i.forward).applyTransformation(r.backward),s=new E(2*r.moveCount+i.moveCount,2*r.duration+i.duration,a,a.invert(),[r,i]);return this.mult(s,1,[s,r,i])}traversePause(e){return e.experimentalNISSGrouping?this.dummyLeaf:new E(1,this.durationFn.traverseAlgNode(e),this.identity,this.identity)}traverseNewline(e){return this.dummyLeaf}traverseLineComment(e){return this.dummyLeaf}mult(e,r,i){let o=Math.abs(r),a=e.forward.selfMultiply(r);return new E(e.moveCount*o,e.duration*o,a,a.invert(),i)}},v=class{constructor(t,e){this.apd=t;this.back=e}},Be=class extends K{constructor(e,r,i){super();this.kpuzzle=e;this.algOrAlgNode=r;this.apd=i;this.i=-1,this.dur=-1,this.goali=-1,this.goaldur=-1,this.move=void 0,this.back=!1,this.moveDuration=0,this.st=this.kpuzzle.identityTransformation(),this.root=new v(this.apd,!1)}moveByIndex(e){return this.i>=0&&this.i===e?this.move!==void 0:this.dosearch(e,1/0)}moveByDuration(e){return this.dur>=0&&this.dur<e&&this.dur+this.moveDuration>=e?this.move!==void 0:this.dosearch(1/0,e)}dosearch(e,r){return this.goali=e,this.goaldur=r,this.i=0,this.dur=0,this.move=void 0,this.moveDuration=0,this.back=!1,this.st=this.kpuzzle.identityTransformation(),this.algOrAlgNode.is(w)?this.traverseAlg(this.algOrAlgNode,this.root):this.traverseAlgNode(this.algOrAlgNode,this.root)}traverseAlg(e,r){if(!this.firstcheck(r))return!1;let i=r.back?e.experimentalNumChildAlgNodes()-1:0;for(let o of At(e.childAlgNodes(),r.back?-1:1)){if(this.traverseAlgNode(o,new v(r.apd.children[i],r.back)))return!0;i+=r.back?-1:1}return!1}traverseGrouping(e,r){if(!this.firstcheck(r))return!1;let i=this.domult(r,e.amount);return this.traverseAlg(e.alg,new v(r.apd.children[0],i))}traverseMove(e,r){return this.firstcheck(r)?(this.move=e,this.moveDuration=r.apd.duration,this.back=r.back,!0):!1}traverseCommutator(e,r){if(!this.firstcheck(r))return!1;let i=this.domult(r,1);return i?this.traverseAlg(e.B,new v(r.apd.children[2],!i))||this.traverseAlg(e.A,new v(r.apd.children[1],!i))||this.traverseAlg(e.B,new v(r.apd.children[2],i))||this.traverseAlg(e.A,new v(r.apd.children[1],i)):this.traverseAlg(e.A,new v(r.apd.children[1],i))||this.traverseAlg(e.B,new v(r.apd.children[2],i))||this.traverseAlg(e.A,new v(r.apd.children[1],!i))||this.traverseAlg(e.B,new v(r.apd.children[2],!i))}traverseConjugate(e,r){if(!this.firstcheck(r))return!1;let i=this.domult(r,1);return i?this.traverseAlg(e.A,new v(r.apd.children[1],!i))||this.traverseAlg(e.B,new v(r.apd.children[2],i))||this.traverseAlg(e.A,new v(r.apd.children[1],i)):this.traverseAlg(e.A,new v(r.apd.children[1],i))||this.traverseAlg(e.B,new v(r.apd.children[2],i))||this.traverseAlg(e.A,new v(r.apd.children[1],!i))}traversePause(e,r){return this.firstcheck(r)?(this.move=e,this.moveDuration=r.apd.duration,this.back=r.back,!0):!1}traverseNewline(e,r){return!1}traverseLineComment(e,r){return!1}firstcheck(e){return e.apd.moveCount+this.i<=this.goali&&e.apd.duration+this.dur<this.goaldur?this.keepgoing(e):!0}domult(e,r){let i=e.back;if(r===0)return i;r<0&&(i=!i,r=-r);let o=e.apd.children[0],a=Math.min(Math.floor((this.goali-this.i)/o.moveCount),Math.ceil((this.goaldur-this.dur)/o.duration-1));return a>0&&this.keepgoing(new v(o,i),a),i}keepgoing(e,r=1){return this.i+=r*e.apd.moveCount,this.dur+=r*e.apd.duration,r!==1?e.back?this.st=this.st.applyTransformation(e.apd.backward.selfMultiply(r)):this.st=this.st.applyTransformation(e.apd.forward.selfMultiply(r)):e.back?this.st=this.st.applyTransformation(e.apd.backward):this.st=this.st.applyTransformation(e.apd.forward),!1}};var si=16;function li(n,t){let e=new bt,r=new bt;for(let i of n.childAlgNodes())r.push(i),r.experimentalNumAlgNodes()>=t&&(e.push(new G(r.toAlg())),r.reset());return e.push(new G(r.toAlg())),e.toAlg()}var Gt=class extends N{traverseAlg(t){let e=t.experimentalNumChildAlgNodes();return e<si?t:li(t,Math.ceil(Math.sqrt(e)))}traverseGrouping(t){return new G(this.traverseAlg(t.alg),t.amount)}traverseMove(t){return t}traverseCommutator(t){return new Dt(this.traverseAlg(t.A),this.traverseAlg(t.B))}traverseConjugate(t){return new Dt(this.traverseAlg(t.A),this.traverseAlg(t.B))}traversePause(t){return t}traverseNewline(t){return t}traverseLineComment(t){return t}},Or=R(Gt);var q=class{constructor(t,e){this.kpuzzle=t;let r=new Ue(this.kpuzzle),i=Or(e);this.decoration=r.traverseAlg(i),this.walker=new Be(this.kpuzzle,i,this.decoration)}getAnimLeaf(t){if(this.walker.moveByIndex(t)){if(!this.walker.move)throw new Error("`this.walker.mv` missing");let e=this.walker.move;return this.walker.back?e.invert():e}return null}indexToMoveStartTimestamp(t){if(this.walker.moveByIndex(t)||this.walker.i===t)return this.walker.dur;throw new Error(`Out of algorithm: index ${t}`)}indexToMovesInProgress(t){if(this.walker.moveByIndex(t)||this.walker.i===t)return this.walker.dur;throw new Error(`Out of algorithm: index ${t}`)}stateAtIndex(t,e){return this.walker.moveByIndex(t),(e??this.kpuzzle.startState()).applyTransformation(this.walker.st)}transformationAtIndex(t){return this.walker.moveByIndex(t),this.walker.st}numAnimatedLeaves(){return this.decoration.moveCount}timestampToIndex(t){return this.walker.moveByDuration(t),this.walker.i}algDuration(){return this.decoration.duration}moveDuration(t){return this.walker.moveByIndex(t),this.walker.moveDuration}};var qe=class extends d{derive(t){switch(t.indexerConstructorRequest){case"auto":return he(t.alg.alg)<100&&t.puzzle==="3x3x3"&&t.visualizationStrategy==="Cube3D"?le:q;case"tree":return q;case"simple":return J;case"simultaneous":return le;default:throw new Error("Invalid indexer request!")}}};var He=class extends d{derive(t){return new t.indexerConstructor(t.kpuzzle,t.algWithIssues.alg)}};var Ge=class extends d{derive(t){return{state:t.state,movesInProgress:t.currentMoveInfo.currentMoves}}};var Ke=class extends d{derive(t){return t.alg.issues.errors.length>0?null:he(t.alg.alg)}};var Qe=class extends u{getDefaultValue(){return null}};var Ye=class extends d{async derive(t){return t.puzzleLoader.kpuzzle()}};var _e=class extends u{getDefaultValue(){return A}};var Ze=class extends d{async derive(t){return t.puzzleLoader.id}};var Xe=class extends d{derive(t){if(t.puzzleIDRequest&&t.puzzleIDRequest!==A){let e=ce[t.puzzleIDRequest];return e||this.userVisibleErrorTracker.set({errors:[`Invalid puzzle ID: ${t.puzzleIDRequest}`]}),e}return t.puzzleDescriptionRequest&&t.puzzleDescriptionRequest!==A?sr(t.puzzleDescriptionRequest):lr}};var $e=class extends d{derive(t){return{playing:t.playingInfo.playing,atStart:t.detailedTimelineInfo.atStart,atEnd:t.detailedTimelineInfo.atEnd}}canReuseValue(t,e){return t.playing===e.playing&&t.atStart===e.atStart&&t.atEnd===e.atEnd}};var Je=class extends d{derive(t){let e=this.#e(t),r=!1,i=!1;return e>=t.timeRange.end&&(i=!0,e=Math.min(t.timeRange.end,e)),e<=t.timeRange.start&&(r=!0,e=Math.max(t.timeRange.start,e)),{timestamp:e,timeRange:t.timeRange,atStart:r,atEnd:i}}#e(t){switch(t.timestampRequest){case"auto":return t.setupAnchor==="start"&&t.setupAlg.alg.experimentalIsEmpty()?t.timeRange.end:t.timeRange.start;case"start":return t.timeRange.start;case"end":return t.timeRange.end;case"anchor":return t.setupAnchor==="start"?t.timeRange.start:t.timeRange.end;case"opposite-anchor":return t.setupAnchor==="start"?t.timeRange.end:t.timeRange.start;default:return t.timestampRequest}}canReuseValue(t,e){return t.timestamp===e.timestamp&&t.timeRange.start===e.timeRange.start&&t.timeRange.end===e.timeRange.end&&t.atStart===e.atStart&&t.atEnd===e.atEnd}};var et=class extends P{async getDefaultValue(){return{direction:1,playing:!1,untilBoundary:"entire-timeline",loop:!1}}async derive(t,e){let r=await e,i=Object.assign({},r);return Object.assign(i,t),i}canReuseValue(t,e){return t.direction===e.direction&&t.playing===e.playing&&t.untilBoundary===e.untilBoundary&&t.loop===e.loop}};var tt=class extends P{getDefaultValue(){return 1}derive(t){return t<0?1:t}};var pi={auto:!0,start:!0,end:!0,anchor:!0,"opposite-anchor":!0},rt=class extends u{getDefaultValue(){return"auto"}set(t){!this.validInput(t)||super.set(t)}validInput(t){return!!(typeof t=="number"||pi[t])}};var it=class extends d{derive(t){return{start:0,end:t.indexer.algDuration()}}};var nt=class extends d{derive(t){switch(t.puzzleID){case"clock":case"square1":case"kilominx":case"redi_cube":case"melindas2x2x2x2":return"2D";case"3x3x3":switch(t.visualizationRequest){case"auto":case"3D":return"Cube3D";default:return t.visualizationRequest}default:switch(t.visualizationRequest){case"auto":case"3D":return"PG3D";case"experimental-2D-LL":return["2x2x2","4x4x4","megaminx"].includes(t.puzzleID)?"experimental-2D-LL":"2D";default:return t.visualizationRequest}}}};var ot=class extends u{getDefaultValue(){return"auto"}};var at=class extends u{getDefaultValue(){return"auto"}};var st=class extends u{getDefaultValue(){return"auto"}};var mi=null;async function ui(){return mi??(mi=new(await I).TextureLoader)}var pe=class extends d{async derive(t){let{spriteURL:e}=t;return e===null?null:new Promise(async(r,i)=>{let o=()=>{console.warn("Could not load sprite:",e.toString()),r(null)};try{(await ui()).load(e.toString(),r,o,o)}catch{o()}})}};var di={facelets:["regular","regular","regular","regular","regular"]};async function ci(n){let{definition:t}=await n.kpuzzle(),e={orbits:{}};for(let[r,i]of Object.entries(t.orbits))e.orbits[r]={pieces:new Array(i.numPieces).fill(di)};return e}var lt=class extends d{getDefaultValue(){return{orbits:{}}}async derive(t){return t.stickeringMaskRequest?t.stickeringMaskRequest:t.stickeringRequest==="picture"?{specialBehaviour:"picture",orbits:{}}:t.puzzleLoader.stickeringMask?.(t.stickeringRequest??"full")??ci(t.puzzleLoader)}};var gi={"-":"Regular",D:"Dim",I:"Ignored",X:"Invisible",O:"IgnoreNonPrimary",P:"PermuteNonPrimary",o:"Ignoriented","?":"OrientationWithoutPermutation","@":"Regular"};function Vr(n){let t={orbits:{}},e=n.split(",");for(let r of e){let[i,o,...a]=r.split(":");if(a.length>0)throw new Error(`Invalid serialized orbit stickering mask (too many colons): \`${r}\``);let s=[];t.orbits[i]={pieces:s};for(let l of o){let c=gi[l];s.push(ar(c))}}return t}var pt=class extends P{getDefaultValue(){return null}derive(t){return t===null?null:typeof t=="string"?Vr(t):t}};var mt=class extends u{getDefaultValue(){return null}};var ut=class extends u{getDefaultValue(){return{}}};var dt=class extends d{derive(t){return t.darkModeRequest==="dark"?"dark":"light"}};var ct=class extends u{getDefaultValue(){return"auto"}};var gt=class extends u{getDefaultValue(){return null}};var hi=35,ht=class extends u{getDefaultValue(){return hi}};function Kt(n,t){return n.latitude===t.latitude&&n.longitude===t.longitude&&n.distance===t.distance}var ft=class extends P{getDefaultValue(){return"auto"}canReuseValue(t,e){return t===e||Kt(t,e)}async derive(t,e){if(t==="auto")return"auto";let r=await e;r==="auto"&&(r={});let i=Object.assign({},r);return Object.assign(i,t),typeof i.latitude<"u"&&(i.latitude=Math.min(Math.max(i.latitude,-90),90)),typeof i.longitude<"u"&&(i.longitude=Ct(i.longitude,360,180)),i}};var yt=class extends d{canReuseValue(t,e){return Kt(t,e)}async derive(t){if(t.orbitCoordinatesRequest==="auto")return Fr(t.puzzleID,t.strategy);let e=Object.assign(Object.assign({},Fr(t.puzzleID,t.strategy),t.orbitCoordinatesRequest));if(Math.abs(e.latitude)<=t.latitudeLimit)return e;{let{latitude:r,longitude:i,distance:o}=e;return{latitude:t.latitudeLimit*Math.sign(r),longitude:i,distance:o}}}},fi={latitude:31.717474411461005,longitude:0,distance:5.877852522924731},yi={latitude:35,longitude:30,distance:6},jr={latitude:35,longitude:30,distance:6.25},wi={latitude:Math.atan(1/2)*ur,longitude:0,distance:6.7},vi={latitude:26.56505117707799,longitude:0,distance:6};function Fr(n,t){if(n[1]==="x")return t==="Cube3D"?yi:jr;switch(n){case"megaminx":case"gigaminx":return wi;case"pyraminx":case"master_tetraminx":return vi;case"skewb":return jr;default:return fi}}var wt=class{constructor(t){this.twistyPlayerModel=t;this.background=new be;this.darkModeRequest=new ct;this.dragInput=new Pe;this.foundationDisplay=new at;this.foundationStickerSpriteURL=new B;this.fullscreenElement=new gt;this.hintFacelet=new mr;this.hintStickerSpriteURL=new B;this.initialHintFaceletsAnimation=new st;this.latitudeLimit=new ht;this.movePressInput=new Ae;this.movePressCancelOptions=new ut;this.orbitCoordinatesRequest=new ft;this.stickeringMaskRequest=new pt;this.stickeringRequest=new mt;this.faceletScale=new ot;this.darkMode=new dt({darkModeRequest:this.darkModeRequest});this.foundationStickerSprite=new pe({spriteURL:this.foundationStickerSpriteURL});this.hintStickerSprite=new pe({spriteURL:this.hintStickerSpriteURL});this.orbitCoordinates=new yt({orbitCoordinatesRequest:this.orbitCoordinatesRequest,latitudeLimit:this.latitudeLimit,puzzleID:t.puzzleID,strategy:t.visualizationStrategy}),this.stickeringMask=new lt({stickeringMaskRequest:this.stickeringMaskRequest,stickeringRequest:this.stickeringRequest,puzzleLoader:t.puzzleLoader})}};var xi={errors:[]},vt=class extends u{getDefaultValue(){return xi}reset(){this.set(this.getDefaultValue())}canReuseValue(t,e){return ee(t.errors,e.errors)}};var xt=class{constructor(){this.userVisibleErrorTracker=new vt;this.alg=new te;this.backView=new Me;this.controlPanel=new fe;this.catchUpMove=new Oe;this.indexerConstructorRequest=new we;this.playingInfo=new et;this.puzzleDescriptionRequest=new _e;this.puzzleIDRequest=new xe;this.setupAnchor=new ve;this.setupAlg=new te;this.setupTransformation=new Qe;this.tempoScale=new tt;this.timestampRequest=new rt;this.viewerLink=new ze;this.visualizationFormat=new Te;this.title=new se;this.videoURL=new B;this.competitionID=new se;this.puzzleLoader=new Xe({puzzleIDRequest:this.puzzleIDRequest,puzzleDescriptionRequest:this.puzzleDescriptionRequest},this.userVisibleErrorTracker);this.kpuzzle=new Ye({puzzleLoader:this.puzzleLoader});this.puzzleID=new Ze({puzzleLoader:this.puzzleLoader});this.puzzleAlg=new re({algWithIssues:this.alg,kpuzzle:this.kpuzzle});this.puzzleSetupAlg=new re({algWithIssues:this.setupAlg,kpuzzle:this.kpuzzle});this.visualizationStrategy=new nt({visualizationRequest:this.visualizationFormat,puzzleID:this.puzzleID});this.indexerConstructor=new qe({alg:this.alg,puzzle:this.puzzleID,visualizationStrategy:this.visualizationStrategy,indexerConstructorRequest:this.indexerConstructorRequest});this.moveCount=new Ke({alg:this.puzzleAlg});this.setupAlgTransformation=new Re({setupAlg:this.puzzleSetupAlg,kpuzzle:this.kpuzzle});this.indexer=new He({indexerConstructor:this.indexerConstructor,algWithIssues:this.puzzleAlg,kpuzzle:this.kpuzzle});this.anchorTransformation=new We({setupTransformation:this.setupTransformation,setupAnchor:this.setupAnchor,setupAlgTransformation:this.setupAlgTransformation,indexer:this.indexer});this.timeRange=new it({indexer:this.indexer});this.detailedTimelineInfo=new Je({timestampRequest:this.timestampRequest,timeRange:this.timeRange,setupAnchor:this.setupAnchor,setupAlg:this.setupAlg});this.coarseTimelineInfo=new $e({detailedTimelineInfo:this.detailedTimelineInfo,playingInfo:this.playingInfo});this.currentMoveInfo=new je({indexer:this.indexer,detailedTimelineInfo:this.detailedTimelineInfo,catchUpMove:this.catchUpMove});this.buttonAppearance=new Le({coarseTimelineInfo:this.coarseTimelineInfo,viewerLink:this.viewerLink});this.currentLeavesSimplified=new Ve({currentMoveInfo:this.currentMoveInfo});this.currentState=new Fe({anchoredStart:this.anchorTransformation,currentLeavesSimplified:this.currentLeavesSimplified,indexer:this.indexer});this.legacyPosition=new Ge({currentMoveInfo:this.currentMoveInfo,state:this.currentState});this.twistySceneModel=new wt(this)}async twizzleLink(){let[t,e,r,i,o,a,s,l]=await Promise.all([this.viewerLink.get(),this.puzzleID.get(),this.puzzleDescriptionRequest.get(),this.alg.get(),this.setupAlg.get(),this.setupAnchor.get(),this.twistySceneModel.stickeringRequest.get(),this.twistySceneModel.twistyPlayerModel.title.get()]),c=t==="experimental-twizzle-explorer",m=new URL(`https://alpha.twizzle.net/${c?"explore":"edit"}/`);return i.alg.experimentalIsEmpty()||m.searchParams.set("alg",i.alg.toString()),o.alg.experimentalIsEmpty()||m.searchParams.set("setup-alg",o.alg.toString()),a!=="start"&&m.searchParams.set("setup-anchor",a),s!=="full"&&s!==null&&m.searchParams.set("experimental-stickering",s),c&&r!==A?m.searchParams.set("puzzle-description",r):e!=="3x3x3"&&m.searchParams.set("puzzle",e),l&&m.searchParams.set("title",l),m.toString()}experimentalAddAlgLeaf(t,e){let r=t.as(p);r?this.experimentalAddMove(r,e):this.alg.set((async()=>{let o=(await this.alg.get()).alg.concat(new w([t]));return this.timestampRequest.set("end"),o})())}experimentalAddMove(t,e){let r=typeof t=="string"?new p(t):t;this.alg.set((async()=>{let[{alg:i},o]=await Promise.all([this.alg.get(),this.puzzleLoader.get()]),a=nr(i,r,{...e,...await or(o)});return this.timestampRequest.set("end"),this.catchUpMove.set({move:r,amount:0}),a})())}experimentalRemoveFinalChild(){this.alg.set((async()=>{let t=(await this.alg.get()).alg,e=Array.from(t.childAlgNodes()),[r]=e.splice(-1);if(!r)return t;this.timestampRequest.set("end");let i=r.as(p);return i&&this.catchUpMove.set({move:i.invert(),amount:0}),new w(e)})())}};function h(n){return new Error(`Cannot get \`.${n}\` directly from a \`TwistyPlayer\`.`)}var Mt=class extends x{constructor(){super(...arguments);this.experimentalModel=new xt;this.experimentalGet=new Qt(this.experimentalModel)}set alg(e){this.experimentalModel.alg.set(e)}get alg(){throw h("alg")}set experimentalSetupAlg(e){this.experimentalModel.setupAlg.set(e)}get experimentalSetupAlg(){throw h("setup")}set experimentalSetupAnchor(e){this.experimentalModel.setupAnchor.set(e)}get experimentalSetupAnchor(){throw h("anchor")}set puzzle(e){this.experimentalModel.puzzleIDRequest.set(e)}get puzzle(){throw h("puzzle")}set experimentalPuzzleDescription(e){this.experimentalModel.puzzleDescriptionRequest.set(e)}get experimentalPuzzleDescription(){throw h("experimentalPuzzleDescription")}set timestamp(e){this.experimentalModel.timestampRequest.set(e)}get timestamp(){throw h("timestamp")}set hintFacelets(e){this.experimentalModel.twistySceneModel.hintFacelet.set(e)}get hintFacelets(){throw h("hintFacelets")}set experimentalStickering(e){this.experimentalModel.twistySceneModel.stickeringRequest.set(e)}get experimentalStickering(){throw h("experimentalStickering")}set experimentalStickeringMaskOrbits(e){this.experimentalModel.twistySceneModel.stickeringMaskRequest.set(e)}get experimentalStickeringMaskOrbits(){throw h("experimentalStickeringMaskOrbits")}set experimentalFaceletScale(e){this.experimentalModel.twistySceneModel.faceletScale.set(e)}get experimentalFaceletScale(){throw h("experimentalFaceletScale")}set backView(e){this.experimentalModel.backView.set(e)}get backView(){throw h("backView")}set background(e){this.experimentalModel.twistySceneModel.background.set(e)}get background(){throw h("background")}set darkMode(e){this.experimentalModel.twistySceneModel.darkModeRequest.set(e)}get darkMode(){throw h("darkMode")}set controlPanel(e){this.experimentalModel.controlPanel.set(e)}get controlPanel(){throw h("controlPanel")}set visualization(e){this.experimentalModel.visualizationFormat.set(e)}get visualization(){throw h("visualization")}set experimentalTitle(e){this.experimentalModel.title.set(e)}get experimentalTitle(){throw h("experimentalTitle")}set experimentalVideoURL(e){this.experimentalModel.videoURL.set(e)}get experimentalVideoURL(){throw h("experimentalVideoURL")}set experimentalCompetitionID(e){this.experimentalModel.competitionID.set(e)}get experimentalCompetitionID(){throw h("experimentalCompetitionID")}set viewerLink(e){this.experimentalModel.viewerLink.set(e)}get viewerLink(){throw h("viewerLink")}set experimentalMovePressInput(e){this.experimentalModel.twistySceneModel.movePressInput.set(e)}get experimentalMovePressInput(){throw h("experimentalMovePressInput")}set experimentalMovePressCancelOptions(e){this.experimentalModel.twistySceneModel.movePressCancelOptions.set(e)}get experimentalMovePressCancelOptions(){throw h("experimentalMovePressCancelOptions")}set cameraLatitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({latitude:e})}get cameraLatitude(){throw h("cameraLatitude")}set cameraLongitude(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({longitude:e})}get cameraLongitude(){throw h("cameraLongitude")}set cameraDistance(e){this.experimentalModel.twistySceneModel.orbitCoordinatesRequest.set({distance:e})}get cameraDistance(){throw h("cameraDistance")}set cameraLatitudeLimit(e){this.experimentalModel.twistySceneModel.latitudeLimit.set(e)}get cameraLatitudeLimit(){throw h("cameraLatitudeLimit")}set indexer(e){this.experimentalModel.indexerConstructorRequest.set(e)}get indexer(){throw h("indexer")}set tempoScale(e){this.experimentalModel.tempoScale.set(e)}get tempoScale(){throw h("tempoScale")}set experimentalSprite(e){this.experimentalModel.twistySceneModel.foundationStickerSpriteURL.set(e)}get experimentalSprite(){throw h("experimentalSprite")}set experimentalHintSprite(e){this.experimentalModel.twistySceneModel.hintStickerSpriteURL.set(e)}get experimentalHintSprite(){throw h("experimentalHintSprite")}set fullscreenElement(e){this.experimentalModel.twistySceneModel.fullscreenElement.set(e)}get fullscreenElement(){throw h("fullscreenElement")}set experimentalInitialHintFaceletsAnimation(e){this.experimentalModel.twistySceneModel.initialHintFaceletsAnimation.set(e)}get experimentalInitialHintFaceletsAnimation(){throw h("experimentalInitialHintFaceletsAnimation")}set experimentalDragInput(e){this.experimentalModel.twistySceneModel.dragInput.set(e)}get experimentalDragInput(){throw h("experimentalDragInput")}},Qt=class{constructor(t){this.model=t}async alg(){return(await this.model.alg.get()).alg}async setupAlg(){return(await this.model.setupAlg.get()).alg}puzzleID(){return this.model.puzzleID.get()}async timestamp(){return(await this.model.detailedTimelineInfo.get()).timestamp}};var Yt="data-",me={alg:"alg","experimental-setup-alg":"experimentalSetupAlg","experimental-setup-anchor":"experimentalSetupAnchor",puzzle:"puzzle","experimental-puzzle-description":"experimentalPuzzleDescription",visualization:"visualization","hint-facelets":"hintFacelets","experimental-stickering":"experimentalStickering","experimental-stickering-mask-orbits":"experimentalStickeringMaskOrbits",background:"background","dark-mode":"darkMode","control-panel":"controlPanel","back-view":"backView","experimental-initial-hint-facelets-animation":"experimentalInitialHintFaceletsAnimation","viewer-link":"viewerLink","experimental-move-press-input":"experimentalMovePressInput","experimental-drag-input":"experimentalDragInput","experimental-title":"experimentalTitle","experimental-video-url":"experimentalVideoURL","experimental-competition-id":"experimentalCompetitionID","camera-latitude":"cameraLatitude","camera-longitude":"cameraLongitude","camera-distance":"cameraDistance","camera-latitude-limit":"cameraLatitudeLimit","tempo-scale":"tempoScale","experimental-sprite":"experimentalSprite","experimental-hint-sprite":"experimentalHintSprite"},Mi=Object.fromEntries(Object.values(me).map(n=>[n,!0])),zi={experimentalMovePressCancelOptions:!0},b=class extends Mt{constructor(e={}){super();this.controller=new Se(this.experimentalModel,this);this.experimentalCanvasClickCallback=()=>{};this.#e=new W(this,"controls-",["auto"].concat(Object.keys(fr)));this.#t=document.createElement("div");this.#r=document.createElement("div");this.#i=!1;this.#o="auto";this.#n=null;this.#a=new _;this.#s=null;for(let[r,i]of Object.entries(e)){if(!(Mi[r]||zi[r])){console.warn(`Invalid config passed to TwistyPlayer: ${r}`);break}this[r]=i}}#e;#t;#r;#i;async connectedCallback(){if(this.#i)return;this.#i=!0,this.addCSS(Er),this.addElement(this.#t).classList.add("visualization-wrapper"),this.addElement(this.#r).classList.add("error-elem"),this.#r.textContent="Error",this.experimentalModel.userVisibleErrorTracker.addFreshListener(r=>{let i=r.errors[0]??null;this.contentWrapper.classList.toggle("error",!!i),i&&(this.#r.textContent=i)});let e=new ae(this.experimentalModel,this.controller);this.contentWrapper.appendChild(e),this.buttons=new oe(this.experimentalModel,this.controller,this),this.contentWrapper.appendChild(this.buttons),this.experimentalModel.twistySceneModel.background.addFreshListener(r=>{this.contentWrapper.classList.toggle("checkered",["auto","checkered"].includes(r)),this.contentWrapper.classList.toggle("checkered-transparent",r==="checkered-transparent")}),this.experimentalModel.twistySceneModel.darkMode.addFreshListener(r=>{this.contentWrapper.classList.toggle("dark-mode",["dark"].includes(r))}),this.experimentalModel.controlPanel.addFreshListener(r=>{this.#e.setValue(r)}),this.experimentalModel.visualizationStrategy.addFreshListener(this.#l.bind(this)),this.experimentalModel.puzzleID.addFreshListener(this.flash.bind(this))}#o;experimentalSetFlashLevel(e){this.#o=e}flash(){this.#o==="auto"&&this.#n?.animate([{opacity:.25},{opacity:1}],{duration:250,easing:"ease-out"})}#n;#a;#s;#l(e){if(e!==this.#s){this.#n?.remove(),this.#n?.disconnect();let r;switch(e){case"2D":case"experimental-2D-LL":{r=new ne(this.experimentalModel.twistySceneModel,e);break}case"Cube3D":case"PG3D":{r=new X(this.experimentalModel),this.#a.handleNewValue(r);break}default:throw new Error("Invalid visualization")}this.#t.appendChild(r),this.#n=r,this.#s=e}}async experimentalCurrentVantages(){this.connectedCallback();let e=this.#n;return e instanceof X?e.experimentalVantages():[]}async experimentalCurrentCanvases(){let e=await this.experimentalCurrentVantages(),r=[];for(let i of e)r.push((await i.canvasInfo()).canvas);return r}async experimentalCurrentThreeJSPuzzleObject(e){this.connectedCallback();let i=await(await this.#a.promise).experimentalTwisty3DPuzzleWrapper(),o=i.twisty3DPuzzle(),a=(async()=>{await o,await new Promise(s=>setTimeout(s,0))})();if(e){let s=new U(async()=>{});i.addEventListener("render-scheduled",async()=>{s.requestIsPending()||(s.requestAnimFrame(),await a,e())})}return o}jumpToStart(e){this.controller.jumpToStart(e)}jumpToEnd(e){this.controller.jumpToEnd(e)}play(){this.controller.togglePlay(!0)}pause(){this.controller.togglePlay(!1)}togglePlay(e){this.controller.togglePlay(e)}experimentalAddMove(e,r){this.experimentalModel.experimentalAddMove(e,r)}experimentalAddAlgLeaf(e,r){this.experimentalModel.experimentalAddAlgLeaf(e,r)}static get observedAttributes(){let e=[];for(let r of Object.keys(me))e.push(r,Yt+r);return e}experimentalRemoveFinalChild(){this.experimentalModel.experimentalRemoveFinalChild()}attributeChangedCallback(e,r,i){e.startsWith(Yt)&&(e=e.slice(Yt.length));let o=me[e];!o||(this[o]=i)}async experimentalScreenshot(e){return(await Ut(this.experimentalModel,e)).dataURL}async experimentalDownloadScreenshot(e){if(["2D","experimental-2D-LL"].includes(await this.experimentalModel.visualizationStrategy.get())){let i=await this.#n.currentTwisty2DPuzzleWrapper().twisty2DPuzzle(),o=new XMLSerializer().serializeToString(i.svgWrapper.svgElement),a=URL.createObjectURL(new Blob([o]));qt(a,e??await Bt(this.experimentalModel),"svg")}else await(await Ut(this.experimentalModel)).download(e)}};y.define("twisty-player",b);var Ur=new z(`
:host {
  display: inline;
}

.wrapper {
  display: inline;
}

a:not(:hover) {
  color: inherit;
  text-decoration: none;
}

twisty-alg-leaf-elem.twisty-alg-comment {
  color: rgba(0, 0, 0, 0.4);
}

.wrapper.current-move {
  background: rgba(66, 133, 244, 0.3);
  margin-left: -0.1em;
  margin-right: -0.1em;
  padding-left: 0.1em;
  padding-right: 0.1em;
  border-radius: 0.1em;
}
`);var Ti=250;var O=class extends x{constructor(e,r,i,o,a,s){super({mode:"open"});this.algOrAlgNode=o;if(this.classList.add(e),this.addCSS(Ur),s){let l=this.contentWrapper.appendChild(document.createElement("a"));l.href="#",l.textContent=r,l.addEventListener("click",c=>{c.preventDefault(),i.twistyAlgViewer.jumpToIndex(i.earliestMoveIndex,a)})}else this.contentWrapper.appendChild(document.createElement("span")).textContent=r}pathToIndex(e){return[]}setCurrentMove(e){this.contentWrapper.classList.toggle("current-move",e)}};y.define("twisty-alg-leaf-elem",O);var V=class extends It{constructor(e,r){super();this.algOrAlgNode=r;this.queue=[];this.classList.add(e)}addString(e){this.queue.push(document.createTextNode(e))}addElem(e){return this.queue.push(e.element),e.moveCount}flushQueue(e=1){for(let r of Br(this.queue,e))this.append(r);this.queue=[]}pathToIndex(e){return[]}};y.define("twisty-alg-wrapper-elem",V);function Pi(n){return n===1?-1:1}function Ai(n,t){return t<0?Pi(n):n}function Br(n,t){if(t===1)return n;let e=Array.from(n);return e.reverse(),e}var _t=class extends K{traverseAlg(t,e){let r=0,i=new V("twisty-alg-alg",t),o=!0;for(let a of Pt(t.childAlgNodes(),e.direction))o||i.addString(" "),o=!1,a.as(St)?.experimentalNISSGrouping&&i.addString("^("),a.as(G)?.experimentalNISSPlaceholder||(r+=i.addElem(this.traverseAlgNode(a,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction}))),a.as(St)?.experimentalNISSGrouping&&i.addString(")");return i.flushQueue(e.direction),{moveCount:r,element:i}}traverseGrouping(t,e){let r=t.experimentalAsSquare1Tuple(),i=Ai(e.direction,t.amount),o=0,a=new V("twisty-alg-grouping",t);return a.addString("("),r?(o+=a.addElem({moveCount:1,element:new O("twisty-alg-move",r[0].amount.toString(),e,r[0],!0,!0)}),a.addString(", "),o+=a.addElem({moveCount:1,element:new O("twisty-alg-move",r[1].amount.toString(),e,r[1],!0,!0)})):o+=a.addElem(this.traverseAlg(t.alg,{earliestMoveIndex:e.earliestMoveIndex+o,twistyAlgViewer:e.twistyAlgViewer,direction:i})),a.addString(`)${t.experimentalRepetitionSuffix}`),a.flushQueue(),{moveCount:o*Math.abs(t.amount),element:a}}traverseMove(t,e){let r=new O("twisty-alg-move",t.toString(),e,t,!0,!0);return e.twistyAlgViewer.highlighter.addMove(t.startCharIndex,r),{moveCount:1,element:r}}traverseCommutator(t,e){let r=0,i=new V("twisty-alg-commutator",t);i.addString("["),i.flushQueue();let[o,a]=Br([t.A,t.B],e.direction);return r+=i.addElem(this.traverseAlg(o,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction})),i.addString(", "),r+=i.addElem(this.traverseAlg(a,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction})),i.flushQueue(e.direction),i.addString("]"),i.flushQueue(),{moveCount:r*2,element:i}}traverseConjugate(t,e){let r=0,i=new V("twisty-alg-conjugate",t);i.addString("[");let o=i.addElem(this.traverseAlg(t.A,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction}));return r+=o,i.addString(": "),r+=i.addElem(this.traverseAlg(t.B,{earliestMoveIndex:e.earliestMoveIndex+r,twistyAlgViewer:e.twistyAlgViewer,direction:e.direction})),i.addString("]"),i.flushQueue(),{moveCount:r+o,element:i}}traversePause(t,e){return t.experimentalNISSGrouping?this.traverseAlg(t.experimentalNISSGrouping.alg,e):{moveCount:1,element:new O("twisty-alg-pause",".",e,t,!0,!0)}}traverseNewline(t,e){let r=new V("twisty-alg-newline",t);return r.append(document.createElement("br")),{moveCount:0,element:r}}traverseLineComment(t,e){return{moveCount:0,element:new O("twisty-alg-line-comment",`//${t.text}`,e,t,!1,!1)}}},bi=R(_t),Zt=class{constructor(){this.moveCharIndexMap=new Map;this.currentElem=null}addMove(t,e){this.moveCharIndexMap.set(t,e)}set(t){let e=t?this.moveCharIndexMap.get(t.startCharIndex)??null:null;this.currentElem!==e&&(this.currentElem?.classList.remove("twisty-alg-current-move"),this.currentElem?.setCurrentMove(!1),e?.classList.add("twisty-alg-current-move"),e?.setCurrentMove(!0),this.currentElem=e)}},H=class extends It{constructor(e){super();this.highlighter=new Zt;this.#t=null;this.lastClickTimestamp=null;e?.twistyPlayer&&(this.twistyPlayer=e?.twistyPlayer)}#e;#t;connectedCallback(){}setAlg(e){this.#e=bi(e,{earliestMoveIndex:0,twistyAlgViewer:this,direction:1}).element,this.textContent="",this.appendChild(this.#e)}get twistyPlayer(){return this.#t}set twistyPlayer(e){this.#r(e)}async#r(e){if(this.#t){console.warn("twisty-player reassignment is not supported");return}if(e===null)throw new Error("clearing twistyPlayer is not supported");this.#t=e,this.#t.experimentalModel.alg.addFreshListener(o=>{this.setAlg(o.alg)});let r=(await this.#t.experimentalModel.alg.get()).alg,i="startCharIndex"in r?r:w.fromString(r.toString());this.setAlg(i),e.experimentalModel.currentMoveInfo.addFreshListener(o=>{let a=o.currentMoves[0];if(a??(a=o.movesStarting[0]),a??(a=o.movesFinishing[0]),!a)this.highlighter.set(null);else{let s=a.move;this.highlighter.set(s)}}),e.experimentalModel.detailedTimelineInfo.addFreshListener(o=>{o.timestamp!==this.lastClickTimestamp&&(this.lastClickTimestamp=null)})}async jumpToIndex(e,r){let i=this.#t;if(i){i.pause();let o=(async()=>{let a=await i.experimentalModel.indexer.get(),s=r?Ti:0;return a.indexToMoveStartTimestamp(e)+a.moveDuration(e)-s})();i.experimentalModel.timestampRequest.set(await o),this.lastClickTimestamp===await o?(i.play(),this.lastClickTimestamp=null):this.lastClickTimestamp=await o}}async attributeChangedCallback(e,r,i){if(e==="for"){let o=document.getElementById(i);if(!o){console.warn("for= elem does not exist");return}if(await customElements.whenDefined("twisty-player"),!(o instanceof b)){console.warn("for= elem is not a twisty-player");return}this.twistyPlayer=o}}static get observedAttributes(){return["for"]}};y.define("twisty-alg-viewer",H);var Xt=class extends K{traverseAlg(t,e){let r=[],i=0;for(let o of t.childAlgNodes()){let a=this.traverseAlgNode(o,{numMovesSofar:e.numMovesSofar+i});r.push(a.tokens),i+=a.numLeavesInside}return{tokens:Array.prototype.concat(...r),numLeavesInside:i}}traverseGrouping(t,e){let r=this.traverseAlg(t.alg,e);return{tokens:r.tokens,numLeavesInside:r.numLeavesInside*t.amount}}traverseMove(t,e){return{tokens:[{leaf:t,idx:e.numMovesSofar}],numLeavesInside:1}}traverseCommutator(t,e){let r=this.traverseAlg(t.A,e),i=this.traverseAlg(t.B,{numMovesSofar:e.numMovesSofar+r.numLeavesInside});return{tokens:r.tokens.concat(i.tokens),numLeavesInside:r.numLeavesInside*2+i.numLeavesInside}}traverseConjugate(t,e){let r=this.traverseAlg(t.A,e),i=this.traverseAlg(t.B,{numMovesSofar:e.numMovesSofar+r.numLeavesInside});return{tokens:r.tokens.concat(i.tokens),numLeavesInside:r.numLeavesInside*2+i.numLeavesInside*2}}traversePause(t,e){return{tokens:[{leaf:t,idx:e.numMovesSofar}],numLeavesInside:1}}traverseNewline(t,e){return{tokens:[],numLeavesInside:0}}traverseLineComment(t,e){return{tokens:[],numLeavesInside:0}}},qr=R(Xt);var $t=class extends u{getDefaultValue(){return""}},Jt=class extends d{derive(t){return Nt(t.value)}},er=class extends P{getDefaultValue(){return{selectionStart:0,selectionEnd:0,endChangedMostRecently:!1}}async derive(t,e){let{selectionStart:r,selectionEnd:i}=t,o=await e,a=t.selectionStart===o.selectionStart&&t.selectionEnd!==(await e).selectionEnd;return{selectionStart:r,selectionEnd:i,endChangedMostRecently:a}}},tr=class extends d{derive(t){return t.selectionInfo.endChangedMostRecently?t.selectionInfo.selectionEnd:t.selectionInfo.selectionStart}},rr=class extends d{derive(t){return qr(t.algWithIssues.alg,{numMovesSofar:0}).tokens}},ir=class extends d{derive(t){function e(i){if(i===null)return null;let o;return t.targetChar<i.leaf.startCharIndex?o="before":t.targetChar===i.leaf.startCharIndex?o="start":t.targetChar<i.leaf.endCharIndex?o="inside":t.targetChar===i.leaf.endCharIndex?o="end":o="after",{leafInfo:i,where:o}}let r=null;for(let i of t.leafTokens){if(t.targetChar<i.leaf.startCharIndex&&r!==null)return e(r);if(t.targetChar<=i.leaf.endCharIndex)return e(i);r=i}return e(r)}},zt=class{constructor(){this.valueProp=new $t;this.selectionProp=new er;this.targetCharProp=new tr({selectionInfo:this.selectionProp});this.algEditorAlgWithIssues=new Jt({value:this.valueProp});this.leafTokensProp=new rr({algWithIssues:this.algEditorAlgWithIssues});this.leafToHighlight=new ir({leafTokens:this.leafTokensProp,targetChar:this.targetCharProp})}};var Hr=new z(`
:host {
  width: 384px;
  display: grid;
}

.wrapper {
  /*overflow: hidden;
  resize: horizontal;*/

  background: var(--background, none);
  display: grid;
}

textarea, .carbon-copy {
  grid-area: 1 / 1 / 2 / 2;

  width: 100%;
  font-family: sans-serif;
  line-height: 1.2em;

  font-size: var(--font-size, inherit);
  font-family: var(--font-family, sans-serif);

  box-sizing: border-box;

  padding: var(--padding, 0.5em);
  /* Prevent horizontal growth. */
  overflow-x: hidden;
}

textarea {
  resize: none;
  background: none;
  z-index: 2;
  overflow: hidden;
  border: 1px solid var(--border-color, rgba(0, 0, 0, 0.25));
}

.carbon-copy {
  white-space: pre-wrap;
  word-wrap: break-word;
  color: transparent;
  user-select: none;
  pointer-events: none;

  z-index: 1;
}

.carbon-copy .highlight {
  background: var(--highlight-color, rgba(255, 128, 0, 0.5));
  padding: 0.1em 0.2em;
  margin: -0.1em -0.2em;
  border-radius: 0.2em;
}

.wrapper.issue-warning textarea,
.wrapper.valid-for-puzzle-warning textarea {
  outline: none;
  border: 1px solid rgba(200, 200, 0, 0.5);
  background: rgba(255, 255, 0, 0.1);
}

.wrapper.issue-error textarea,
.wrapper.valid-for-puzzle-error textarea {
  outline: none;
  border: 1px solid red;
  background: rgba(255, 0, 0, 0.1);
}
`);var Tt="for-twisty-player",Gr="placeholder",Kr="twisty-player-prop",ue=class extends x{constructor(e){super();this.model=new zt;this.#e=document.createElement("textarea");this.#t=document.createElement("div");this.#r=document.createElement("span");this.#i=document.createElement("span");this.#o=document.createElement("span");this.#n=new W(this,"valid-for-puzzle-",["none","warning","error"]);this.#a=null;this.debugNeverRequestTimestamp=!1;this.#p=!1;this.#u=null;this.#t.classList.add("carbon-copy"),this.addElement(this.#t),this.#e.rows=1,this.addElement(this.#e),this.#r.classList.add("prefix"),this.#t.appendChild(this.#r),this.#i.classList.add("highlight"),this.#t.appendChild(this.#i),this.#o.classList.add("suffix"),this.#t.appendChild(this.#o),this.#e.placeholder="Alg",this.#e.setAttribute("spellcheck","false"),this.addCSS(Hr),this.#e.addEventListener("input",()=>{this.#p=!0,this.onInput()}),this.#e.addEventListener("blur",()=>this.onBlur()),document.addEventListener("selectionchange",()=>this.onSelectionChange()),e?.twistyPlayer&&(this.twistyPlayer=e.twistyPlayer),this.#s=e?.twistyPlayerProp??"alg",e?.twistyPlayerProp==="alg"&&this.model.leafToHighlight.addFreshListener(r=>{r&&this.highlightLeaf(r.leafInfo.leaf)})}#e;#t;#r;#i;#o;#n;#a;#s;get#l(){return this.#a===null?null:this.#a.experimentalModel[this.#s]}set algString(e){this.#e.value=e,this.onInput()}get algString(){return this.#e.value}set placeholder(e){this.#e.placeholder=e}#p;onInput(){this.#i.hidden=!0,this.highlightLeaf(null);let e=this.#e.value.trimEnd();this.model.valueProp.set(e),this.#l?.set(e)}async onSelectionChange(){if(document.activeElement!==this||this.shadow.activeElement!==this.#e||this.#s!=="alg")return;let{selectionStart:e,selectionEnd:r}=this.#e;this.model.selectionProp.set({selectionStart:e,selectionEnd:r})}async onBlur(){}setAlgIssueClassForPuzzle(e){this.#n.setValue(e)}#m(e){return e.endsWith(`
`)?`${e} `:e}#u;highlightLeaf(e){if(this.#s==="alg"){if(e===null){this.#r.textContent="",this.#i.textContent="",this.#o.textContent=this.#m(this.#e.value);return}e!==this.#u&&(this.#u=e,this.#r.textContent=this.#e.value.slice(0,e.startCharIndex),this.#i.textContent=this.#e.value.slice(e.startCharIndex,e.endCharIndex),this.#o.textContent=this.#m(this.#e.value.slice(e.endCharIndex)),this.#i.hidden=!1)}}get twistyPlayer(){return this.#a}set twistyPlayer(e){if(this.#a){console.warn("twisty-player reassignment/clearing is not supported");return}this.#a=e,e&&((async()=>this.algString=this.#l?(await this.#l.get()).alg.toString():"")(),this.#s==="alg"&&(this.#a?.experimentalModel.puzzleAlg.addFreshListener(r=>{if(r.issues.errors.length===0){this.setAlgIssueClassForPuzzle(r.issues.warnings.length===0?"none":"warning");let i=r.alg,o=w.fromString(this.algString);i.isIdentical(o)||(this.algString=i.toString(),this.onInput())}else this.setAlgIssueClassForPuzzle("error")}),this.model.leafToHighlight.addFreshListener(async r=>{if(r===null)return;let[i,o]=await Promise.all([await e.experimentalModel.indexer.get(),await e.experimentalModel.timestampRequest.get()]);if(o==="auto"&&!this.#p)return;let a=i.indexToMoveStartTimestamp(r.leafInfo.idx),s=i.moveDuration(r.leafInfo.idx),l;switch(r.where){case"before":{l=a;break}case"start":case"inside":{l=a+s/4;break}case"end":case"after":{l=a+s;break}default:throw console.log("invalid where"),new Error("Invalid where!")}this.debugNeverRequestTimestamp||e.experimentalModel.timestampRequest.set(l)}),e.experimentalModel.currentLeavesSimplified.addFreshListener(async r=>{let o=(await e.experimentalModel.indexer.get()).getAnimLeaf(r.stateIndex);this.highlightLeaf(o)})))}attributeChangedCallback(e,r,i){switch(e){case Tt:{let o=document.getElementById(i);if(!o){console.warn(`${Tt}= elem does not exist`);return}if(!(o instanceof b)){console.warn(`${Tt}=is not a twisty-player`);return}this.twistyPlayer=o;return}case Gr:{this.placeholder=i;return}case Kr:{if(this.#a)throw console.log("cannot set prop"),new Error("cannot set prop after twisty player");this.#s=i;return}}}static get observedAttributes(){return[Tt,Gr,Kr]}};y.define("twisty-alg-editor",ue);var Di={};$r(Di,{EXPERIMENTAL_PROP_NO_VALUE:()=>A,ExperimentalKPuzzleSVGWrapper:()=>Q,SimpleAlgIndexer:()=>J,TreeAlgIndexer:()=>q,TwistyAlgEditor:()=>ue,TwistyAlgViewer:()=>H,TwistyPlayer:()=>b,TwizzleLink:()=>de,backViewLayouts:()=>xr,setTwistyDebug:()=>pr});var Qr=new z(`
.wrapper {
  background: rgb(255, 245, 235);
  border: 1px solid rgba(0, 0, 0, 0.25);
}

.setup-alg, twisty-alg-viewer {
  padding: 0.5em 1em;
}

.heading {
  background: rgba(255, 230, 210, 1);
  font-weight: bold;
  padding: 0.25em 0.5em;
}

.heading.title {
  background: rgb(255, 245, 235);
  font-size: 150%;
  white-space: pre;
}

.heading a {
  text-decoration: none;
  color: inherit;
}

twisty-player {
  width: 100%;
  min-height: 128px;
  height: 288px;
  resize: vertical;
  overflow-y: hidden;
}

twisty-player + .heading {
  padding-top: 0.5em;
}

twisty-alg-viewer {
  display: inline-block;
}

.wrapper {
  container-type: inline-size;
}

.scrollable-region {
  border-top: 1px solid rgba(0, 0, 0, 0.25);
}

.scrollable-region {
  max-height: 18em;
  overflow-y: auto;
}

@container (min-width: 512px) {
  .responsive-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  twisty-player {
    height: 320px
  }
  .scrollable-region {
    border-top: none;
    border-left: 1px solid rgba(0, 0, 0, 0.25);
    contain: strict;
    max-height: 100cqh;
  }
}

.wrapper:fullscreen,
.wrapper:fullscreen .responsive-wrapper {
  width: 100%;
  height: 100%;
}

.wrapper:fullscreen twisty-player,
.wrapper:fullscreen .scrollable-region {
  height: 50%;
}

@container (min-width: 512px) {
  .wrapper:fullscreen twisty-player,
  .wrapper:fullscreen .scrollable-region {
    height: 100%;
  }
}
`),Yr=new z(`
.wrapper {
  background: white;
}

.heading {
  background: #4285f422;
}

.scrollable-region {
  overflow-y: auto;
}

.wrapper.dark-mode {
  background: #262626;
  color: #929292;
  border-color: #FFFFFF44;
  color-scheme: dark;
}

.wrapper.dark-mode .heading:not(.title) {
  background: #1d1d1d;
  color: #ececec;
}

.heading.title {
  background: none;
}
`);function _r(n="",t=location.href){let e={alg:"alg","setup-alg":"experimental-setup-alg","setup-anchor":"experimental-setup-anchor",puzzle:"puzzle",stickering:"experimental-stickering","puzzle-description":"experimental-puzzle-description",title:"experimental-title","video-url":"experimental-video-url",competition:"experimental-competition-id"},r=new URL(t).searchParams,i={};for(let[o,a]of Object.entries(e)){let s=r.get(n+o);if(s!==null){let l=me[a];i[l]=s}}return i}var de=class extends x{constructor(e){super({mode:"open"});this.options=e;this.twistyPlayer=null;this.a=null}fallback(){if(this.contentWrapper.textContent="",this.a){let e=this.contentWrapper.appendChild(document.createElement("span"));e.textContent="\u2757\uFE0F",e.title="Could not show a player for link",this.addElement(this.a)}this.#e?.remove(),this.#t?.remove()}#e;#t;#r;#i;async connectedCallback(){if(this.#i=this.addElement(document.createElement("div")),this.#i.classList.add("responsive-wrapper"),this.options?.darkMode&&this.contentWrapper.classList.add("dark-mode"),this.#e=this.addCSS(Qr),this.options?.cdnForumTweaks&&this.addCSS(Yr),this.a=this.querySelector("a"),!this.a)return;let e=_r("",this.a.href),r=this.a?.href,{hostname:i,pathname:o}=new URL(r);if(i!=="alpha.twizzle.net"){this.fallback();return}if(["/edit/","/explore/"].includes(o)){let a=o==="/explore/";if(e.puzzle&&!(e.puzzle in ce)){let l=(await import("./puzzle-geometry-OIWNBVFY.js")).getPuzzleDescriptionString(e.puzzle);delete e.puzzle,e.experimentalPuzzleDescription=l}if(this.twistyPlayer=this.#i.appendChild(new b({background:this.options?.cdnForumTweaks?"checkered-transparent":"checkered",darkMode:this.options?.darkMode?"dark":"light",...e,viewerLink:a?"experimental-twizzle-explorer":"auto"})),this.twistyPlayer.fullscreenElement=this.contentWrapper,e.experimentalTitle&&(this.twistyPlayer.experimentalTitle=e.experimentalTitle),this.#r=this.#i.appendChild(document.createElement("div")),this.#r.classList.add("scrollable-region"),e.experimentalTitle&&this.addHeading(e.experimentalTitle).classList.add("title"),e.experimentalSetupAlg){this.addHeading("Setup",async()=>(await this.twistyPlayer?.experimentalModel.setupAlg.get())?.alg.toString()??null);let l=this.#r.appendChild(document.createElement("div"));l.classList.add("setup-alg"),l.textContent=new w(e.experimentalSetupAlg).toString()}this.addHeading("Moves",async()=>(await this.twistyPlayer?.experimentalModel.alg.get())?.alg.toString()??null),this.#r.appendChild(new H({twistyPlayer:this.twistyPlayer})).part.add("twisty-alg-viewer")}else this.fallback()}addHeading(e,r){let i=this.#r.appendChild(document.createElement("div"));if(i.classList.add("heading"),i.textContent=e,r){i.textContent+=" ";let o=i.appendChild(document.createElement("a"));o.textContent="\u{1F4CB}",o.href="#",o.title="Copy to clipboard";async function a(s){o.textContent=s,await new Promise(l=>setTimeout(l,2e3)),o.textContent===s&&(o.textContent="\u{1F4CB}")}o.addEventListener("click",async s=>{s.preventDefault(),o.textContent="\u2026\u{1F4CB}";let l=await r();if(l)try{await navigator.clipboard.writeText(l),a("\u2705\u{1F4CB}")}catch(c){throw a("\u274C\u{1F4CB}"),c}else a("\u274C\u{1F4CB}")})}return i}};y.define("twizzle-link",de);export{fr as a,Q as b,Ci as c,qi as d,Ki as e,Zi as f,xr as g,tn as h,on as i,ln as j,un as k,gn as l,b as m,H as n,ue as o,Di as p};
//# sourceMappingURL=chunk-MQN5DVPY.js.map
