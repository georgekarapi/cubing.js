import{a as E}from"./chunk-2CL2GCKX.js";import{a as j}from"./chunk-RT7HLEI5.js";import{a as q,c as k}from"./chunk-67REA3UX.js";import{a as d}from"./chunk-I4ZTGZIU.js";import{a as z,b as Q,c as X}from"./chunk-CR2P3CF2.js";import{h as V,n as f,o as Y,p as J}from"./chunk-HTCOBPXI.js";import{b as B}from"./chunk-XQOKBTVP.js";import{a as _}from"./chunk-H65BIUTX.js";import{a as I,b as c}from"./chunk-KCW2Z5PM.js";import{a as Z}from"./chunk-RHYNKE36.js";import{a as A}from"./chunk-2OS3C5NM.js";import{a as ee,b as te}from"./chunk-3XXGTIIX.js";import{o as P}from"./chunk-D3X4C52T.js";import{c as G,f as K,g as v,j as x,p as b,q as m}from"./chunk-ULM6IQGD.js";var ie=["UR","DR","DL","UL"],re=["U","R","D","L","ALL"],he=ie.concat(re);function T(){let r=0;function e(){let n=d(12);return n!==0&&r++,n<=6?`${n}+`:`${12-n}-`}let i=[];function t(n){for(let o of n)i.push(`${o}${e()}`)}if(t(he),i.push("y2"),t(re),r<2)return T();for(let n of ie)d(2)===0&&i.push(n);return i.join(" ")}var ne=["++","--"];function oe(){function r(){return`R${ne[d(2)]} D${ne[d(2)]}`}function e(){return`U${["","'"][d(2)]}`}function i(){let n=[];for(let o=0;o<5;o++)n.push(r());return n.push(e()),n.join(" ")}let t=[];for(let n=0;n<6;n++)t.push(i());return t.join(`
`)}var ge="node:w-orker-_threa-ds",fe=()=>ge.replace(/-/g,""),Se=typeof globalThis.Worker>"u"&&typeof globalThis.WorkerNavigator>"u";async function we(r,e){let{Worker:i}=await import(fe()),t=new i(r,e);return t.unref(),q(t)}async function L(r,e){let i;if(Se)return we(r,{eval:e?.eval});if(e?.eval){let t=new Blob([r],{type:"application/javascript"});r=URL.createObjectURL(t)}return i=new globalThis.Worker(r,{type:e?e.type:void 0}),i}j.expose=!1;async function se(){return(await import("./search-worker-ts-entry-HV646ONY.js")).WORKER_ENTRY_FILE_URL}var ve=5e3;async function ye(){return new Promise(async(r,e)=>{let i=setTimeout(()=>{e(new Error("module instantiation timeout"))},ve);try{let t=await se();t||e(new Error("Could not get worker entry file URL."));let n;if(globalThis.Worker){let s=`import "${t}";`,a=new Blob([s],{type:"text/javascript"});n=URL.createObjectURL(a)}else n=new URL(t);let o=await L(n,{type:"module"}),l=s=>{s.message?.startsWith("SyntaxError")&&e(s)},u=s=>{s==="comlink-exposed"?(clearTimeout(i),r(le(o))):e(new Error(`wrong module instantiation message ${s}`))};o.nodeWorker?o.nodeWorker.once("message",u):(o.addEventListener("error",l,{once:!0}),o.addEventListener("message",s=>u(s.data),{once:!0}))}catch(t){e(t)}})}function le(r){let e=k(r),i=r.terminate.bind(r);return{insideAPI:e,outsideAPI:{terminate:i}}}async function ae(){let{workerSource:r}=await import("./search-worker-inside-generated-string-CEA5SUDT.js"),e=await L(r,{eval:!0});return le(e)}var xe=[];async function C(){let r=be();return xe.push(r),E.setDebugMeasurePerf(h.logPerf),E.setScramblePrefetchLevel(h.scramblePrefetchLevel),r}async function be(){if(h.forceStringWorker)return console.warn("Using the `forceStringWorker` workaround for search worker instantiation. This will require downloading significantly more code than necessary, but the functionality will be the same."),ae();try{return await ye()}catch(r){let e="Could not instantiate module worker (this may happen in Firefox, or when using Parcel).";if(h.disableStringWorker)throw console.error(`${e} Fallback to string worker is disabled.`,r),new Error("Module worker instantiation failed.");return console.warn(`${e} Falling back to string worker.`,r),ae()}}var Pe=null;async function g(){return await(Pe??(Pe=C()))}async function y(r){switch(r){case"clock":return m.fromString(await T());case"minx":return m.fromString(await oe())}let i=await ke(r);return m.fromString(i)}async function ke(r){return h.forceNewWorkerForEveryScramble,(h.forceNewWorkerForEveryScramble?await C():await g()).insideAPI.randomScrambleStringForEvent(r)}async function M(r){let e=await g();return m.fromString(await e.insideAPI.solve333ToString(r.stateData))}async function W(r){let e=await g();return m.fromString(await e.insideAPI.solve222ToString(r.stateData))}async function D(r){let e=await g();return m.fromString(await e.insideAPI.solveSkewbToString(r.stateData))}async function O(r){let e=await g();return m.fromString(await e.insideAPI.solvePyraminxToString(r.stateData))}async function F(r){let e=await g();return m.fromString(await e.insideAPI.solveMegaminxToString(r.stateData))}var h={logPerf:!1,scramblePrefetchLevel:"auto",forceStringWorker:!1,disableStringWorker:!1,forceNewWorkerForEveryScramble:!1};var ce=new Y(`
:host {
  width: 384px;
  height: 256px;
  display: grid;

  font-family: "Ubuntu", sans-serif;
}

.wrapper {
  display: grid;
  place-content: center;
  gap: 0.5em;
}
`);var S=class extends EventTarget{constructor(i){super();this.puzzle=i;i.addAlgLeafListener(t=>{let n=t.latestAlgLeaf.as(x);!n||this.dispatchEvent(new CustomEvent("move",{detail:{move:n}}))})}static async connect(){let t=await(await import("./bluetooth-5ZMOW5RP.js")).connectSmartPuzzle();return new S(t)}disconnect(){this.puzzle.disconnect()}},w=class extends EventTarget{constructor(i){super();this.puzzle=i;i.addAlgLeafListener(t=>{let n=t.latestAlgLeaf.as(x);!n||this.dispatchEvent(new CustomEvent("move",{detail:{move:n}}))})}static async connect(){let t=await(await import("./bluetooth-5ZMOW5RP.js")).debugKeyboardConnect();return new w(t)}disconnect(){this.puzzle.disconnect()}},R=class extends J{constructor(){super(),this.addCSS(ce),this.addElement(document.createElement("span")).textContent="Connect a stream source:";let e=this.addSource("\u{1F4E1} Bluetooth",S);this.addSource("\u2328\uFE0F Keyboard",w),this.addStreamSource(),navigator?.bluetooth||(e.disabled=!0)}addSource(e,i){let t=this.addElement(document.createElement("button"));return t.textContent=e,t.addEventListener("click",async()=>{let n=await i.connect();t.disabled=!0,t.textContent+=" \u2705",n.addEventListener("move",o=>{this.dispatchEvent(new CustomEvent("move",o))})}),t}addStreamSource(){let e="SENTINEL",i=this.addElement(document.createElement("button"));i.textContent="\u{1F534} Get Twizzle streams";let t=this.addElement(document.createElement("select"));t.appendChild(document.createElement("option")).textContent="Streams",t.disabled=!0;let n=null;i.addEventListener("click",async()=>{let o=(await import("./stream-PT4QU5UO.js")).ExperimentalTwizzleStreamServer;n||(n=new o);let l=await n.streams();t.textContent="",t.disabled=!1;let u=t.appendChild(document.createElement("option"));u.textContent=`Select a stream (${l.length} available)`,u.value=e;for(let s of l){let a=s.senders[0],p=t.appendChild(document.createElement("option"));p.value=s.streamID,p.textContent=`${a.name} (${s.streamID.slice(-2)})`}}),t.addEventListener("change",()=>{let o=t.value;if(o===e)return;n.connect(o).addEventListener("move",u=>{console.log(u),this.dispatchEvent(new CustomEvent("move",u))})})}};f.define("twisty-stream-source",R);var U="(unsupported stickering)";function me(r,e,i){let t=new G;return t.experimentalPushAlg(r),r.experimentalIsEmpty()||Array.from(r.childAlgNodes()).slice(-1)[0].is(v)||t.push(new v),t.push(new K(e)),t.push(new v),t.experimentalPushAlg(i),t.toAlg()}var de={"3x3x3":"333","2x2x2":"222","4x4x4":"444","5x5x5":"555","6x6x6":"666","7x7x7":"777",clock:"clock",megaminx:"minx",pyraminx:"pyram",skewb:"skewb",square1:"sq1",fto:"fto",master_tetraminx:"master_tetraminx",kilominx:"kilominx",redi_cube:"redi_cube"},ue=class{constructor(e,i){this.element=e;this.puzzlePane=I(this.element,"puzzle-pane","puzzle-pane"),this.puzzlePane.classList.remove("loading");let t=this.puzzlePane.querySelector(".spinner");t&&this.puzzlePane.removeChild(t),this.initializeTwisty(i);let n=I(this.element,"control-pane","control-pane");n.classList.remove("loading"),this.controlPane=new H(this,this.twistyPlayer,n,this.solve.bind(this),this.scramble.bind(this)),new X(this.twistyPlayer.experimentalModel)}initializeTwisty(e){e.viewerLink="none",this.twistyPlayer=new Q(e),this.twistyPlayer.experimentalModel.twistySceneModel.initialHintFaceletsAnimation.set("none"),this.puzzlePane.appendChild(this.twistyPlayer)}async solve(){let[e,i]=await Promise.all([this.twistyPlayer.experimentalModel.puzzleID.get(),this.twistyPlayer.experimentalModel.alg.get()]),t=i.alg,n,o=await P[e].kpuzzle();switch(console.log(o),e){case"2x2x2":{n=await W(o.algToTransformation(t).toKState());break}case"3x3x3":{n=await M(o.algToTransformation(t).toKState());break}case"skewb":{n=await D(o.algToTransformation(t).toKState());break}case"pyraminx":{n=await O(o.algToTransformation(t).toKState());break}case"megaminx":{n=await F(o.algToTransformation(t).toKState());break}default:return}this.twistyPlayer.alg=me(t," Solution",n)}async scramble(){let[e,i]=await Promise.all([this.twistyPlayer.experimentalModel.puzzleID.get(),this.twistyPlayer.experimentalModel.alg.get()]),t=de[e];t&&(this.twistyPlayer.alg=me(i.alg," Scramble",await y(t)))}},N=class extends HTMLElement{constructor(){super();for(let e of Array.from(this.querySelectorAll("button")))e.addEventListener("click",this.onClick.bind(this))}onClick(e){this.dispatchEvent(new CustomEvent("action",{detail:{action:e.target.id}}))}setButtonEnabled(e,i){this.querySelector(`#${e}`).disabled=!i}};f.define("button-grid",N);var H=class{constructor(e,i,t,n,o){this.app=e;this.twistyPlayer=i;this.element=t;this.solve=n;this.scramble=o;let l=c(this.element,"title");l.textContent=A,i.experimentalModel.puzzleID.addFreshListener(this.onPuzzle.bind(this)),i.experimentalModel.title.addFreshListener(s=>{l.textContent=s??A}),i.experimentalModel.alg.addFreshListener(({alg:s})=>{let a=_(s);this.caretNISSInfo.hidden=!a.caretNISS,this.commutatorConjugateInfo.hidden=!(a.commutator||a.conjugate);let p=[];a.commutator&&p.push("commutator"),a.conjugate&&p.push("conjugate"),this.commutatorConjugateInfo.querySelector("a").textContent=`${p.join(" and ")} notation`,this.square1Info.hidden=!a.square1}),i.experimentalModel.videoURL.addFreshListener(s=>{let a=document.querySelector(".video-url"),p=s?.toString();a.href=p||"",a.textContent=p?"\u{1F3A5} Video":""}),i.experimentalModel.competitionID.addFreshListener(s=>{let a=document.querySelector(".competition-url");a.href=s?`https://www.worldcubeassociation.org/competitions/${s}`:"",a.textContent=s?"\u{1F3C6} Competition":""}),this.experimentalSetupAlgInput=c(this.element,"experimental-setup-alg","twisty-alg-editor"),this.experimentalSetupAlgInput.twistyPlayer=i,this.moveCountDisplay=c(this.element,"move-count","span"),this.twistyPlayer.experimentalModel.puzzleAlg.addFreshListener(s=>{s.issues.errors.length===0?this.moveCountDisplay.textContent=` (${B(s.alg)} ETM)`:this.moveCountDisplay.textContent=""}),this.algInput=c(this.element,"alg","twisty-alg-editor"),this.algInput.twistyPlayer=i,this.puzzleSelect=c(this.element,"puzzle","select"),this.twistyPlayer.experimentalModel.puzzleID.get().then(s=>this.initializePuzzleSelect(s)),this.setupAnchorSelect=c(this.element,"setup-anchor","select"),this.twistyPlayer.experimentalModel.setupAnchor.get().then(s=>this.initializeSetupAnchorSelect(s)),this.stickeringSelect=c(this.element,"stickering","select"),new V().addMultiListener([this.twistyPlayer.experimentalModel.twistySceneModel.stickeringRequest,this.twistyPlayer.experimentalModel.puzzleID],([s,a])=>this.updateStickeringSelect(s,a)),this.tempoInput=c(this.element,"tempo","input"),this.tempoDisplay=c(this.element,"tempo-display","span"),this.caretNISSInfo=c(this.element,"caret-niss-info","p"),this.commutatorConjugateInfo=c(this.element,"commutator-conjugate-info","p"),this.square1Info=c(this.element,"square1-info","p"),this.hintFaceletCheckbox=c(this.element,"hint-facelets","input"),this.tempoInput.addEventListener("input",this.onTempoInput.bind(this)),this.hintFaceletCheckbox.addEventListener("input",this.onHintFaceletInput.bind(this)),this.toolGrid=c(this.element,"tool-grid","button-grid"),this.toolGrid.addEventListener("action",this.onToolAction.bind(this)),this.examplesGrid=c(this.element,"examples-grid","button-grid"),this.examplesGrid.addEventListener("action",this.onExampleAction.bind(this)),this.twistyStreamSource=e.element.querySelector("twisty-stream-source"),this.twistyStreamSource.addEventListener("move",this.onMove.bind(this))}async onMove(e){let i=e.detail.move;try{this.twistyPlayer.experimentalAddMove(i,{cancel:!0})}catch{console.info("Ignoring move:",i.toString())}}onTempoInput(){let e=parseFloat(this.tempoInput.value);this.twistyPlayer.tempoScale=e,this.tempoDisplay.textContent=`${e}\xD7`}onHintFaceletInput(){this.twistyPlayer.hintFacelets=this.hintFaceletCheckbox.checked?"floating":"none"}async onToolAction(e){switch(e.detail.action){case"expand":{this.twistyPlayer.alg=(await this.twistyPlayer.experimentalModel.alg.get()).alg.expand();break}case"simplify":{this.twistyPlayer.experimentalModel.alg.set((async()=>{let[i,t]=await Promise.all([this.twistyPlayer.experimentalModel.alg.get(),this.twistyPlayer.experimentalModel.puzzleLoader.get()]);return i.alg.experimentalSimplify({cancel:!0,puzzleLoader:t})})());break}case"clear":{this.twistyPlayer.alg=new m,this.twistyPlayer.experimentalSetupAlg=new m,this.twistyPlayer.experimentalTitle=null;break}case"invert":{this.twistyPlayer.alg=(await this.twistyPlayer.experimentalModel.alg.get()).alg.invert();break}case"solve":{this.solve();break}case"scramble":{this.scramble();break}case"screenshot":{this.screenshot();break}case"connect-input":{this.connectInput();break}default:throw new Error(`Unknown tool action! ${e.detail.action}`)}}screenshot(){this.app.twistyPlayer.experimentalDownloadScreenshot()}connectInput(){this.twistyStreamSource.style.setProperty("display","inherit")}onExampleAction(e){let i=Z[e.detail.action];this.twistyPlayer.alg=b(i.alg),this.twistyPlayer.experimentalSetupAlg=b(i.experimentalSetupAlg),this.twistyPlayer.experimentalTitle=i.experimentalTitle??null}initializePuzzleSelect(e){this.puzzleSelect.textContent="";for(let[i,t]of Object.entries(ee)){let n=this.puzzleSelect.appendChild(document.createElement("optgroup"));n.label=i;for(let o of t){let l=document.createElement("option");l.value=o.name,l.textContent=`${o.symbol} ${te[o.name].displayName()}`,n.appendChild(l),o.name===e&&(l.selected=!0)}}this.puzzleSelect.addEventListener("change",this.puzzleSelectChanged.bind(this))}puzzleSelectChanged(){let e=this.puzzleSelect.selectedOptions[0];this.twistyPlayer.puzzle=e.value}initializeSetupAnchorSelect(e){this.setupAnchorSelect.textContent="";for(let i of["start","end"]){let t=document.createElement("option");t.value=i,t.textContent=`anchored at ${i}`,this.setupAnchorSelect.appendChild(t),i===e&&(t.selected=!0)}this.setupAnchorSelect.addEventListener("change",this.setupAnchorSelectChanged.bind(this))}setupAnchorSelectChanged(){let e=this.setupAnchorSelect.selectedOptions[0];this.twistyPlayer.experimentalSetupAnchor=e.value}async updateStickeringSelect(e,i){e??(e="full");let t,n=P[i];if(n.stickerings){t={};for(let l of await n.stickerings())t[l]={}}else t={full:{}};e in t||(t[U]={},e=U),this.stickeringSelect.textContent="";let o=null;for(let[l,u]of Object.entries(t)){let s=l===U?"Unsupported":z(l,i);(!o||o.label!==s)&&(o=this.stickeringSelect.appendChild(document.createElement("optgroup")),o.label=s);let a=document.createElement("option");a.value=l,a.textContent=u?.name??l,o.appendChild(a),l===e&&(a.selected=!0)}this.stickeringSelect.addEventListener("change",this.stickeringChanged.bind(this))}stickeringChanged(){this.twistyPlayer.experimentalStickering=this.stickeringSelect.selectedOptions[0].value}onPuzzle(e){this.hintFaceletCheckbox.disabled=["clock","square1","kilominx","redi_cube","melindas2x2x2x2"].includes(e),this.toolGrid.setButtonEnabled("solve",["2x2x2","3x3x3","skewb","pyraminx","megaminx"].includes(e)),this.toolGrid.setButtonEnabled("scramble",Object.keys(de).includes(e))}},pe=[],$=class extends HTMLElement{constructor(){super(...arguments);this.associatedElem=null}connectedCallback(){let i=this.getAttribute("for");this.associatedElem=i?document.getElementById(i):null,this.expandIcon=this.querySelector(".expand-icon"),this.querySelector("a").addEventListener("click",this.onClick.bind(this)),this.expanded=this.getAttribute("expanded")==="true",this.exclusive=this.getAttribute("exclusive")!=="false",this.exclusive&&pe.push(this)}onClick(i){if(i.preventDefault(),this.toggle(),this.exclusive&&this.expanded)for(let t of pe)t!==this&&t.toggle(!1)}toggle(i){this.expanded=i??!this.expanded,this.associatedElem&&(this.associatedElem.hidden=!this.expanded),this.expandIcon.textContent=this.exclusive?this.expanded?"\u25BF":"\u25B9":this.expanded?"\u25BE":"\u25B8"}};f.define("expand-button",$);export{ue as a};
//# sourceMappingURL=chunk-SXWKUOXG.js.map
