import{a as b}from"./chunk-67YDZMJZ.js";import{a as w}from"./chunk-VCEJJ6IO.js";import{a as S,c as g}from"./chunk-FQVAE53Z.js";import{a as l}from"./chunk-VFJPQATA.js";import{q as s}from"./chunk-K5RKCHW3.js";var h=["UR","DR","DL","UL"],I=["U","R","D","L","ALL"],O=h.concat(I);function p(){let e=0;function r(){let n=l(12);return n!==0&&e++,n<=6?`${n}+`:`${12-n}-`}let t=[];function o(n){for(let i of n)t.push(`${i}${r()}`)}if(o(O),t.push("y2"),o(I),e<2)return p();for(let n of h)l(2)===0&&t.push(n);return t.join(" ")}var y=["++","--"];function W(){function e(){return`R${y[l(2)]} D${y[l(2)]}`}function r(){return`U${["","'"][l(2)]}`}function t(){let n=[];for(let i=0;i<5;i++)n.push(e());return n.push(r()),n.join(" ")}let o=[];for(let n=0;n<6;n++)o.push(t());return o.join(`
`)}var T="node:w-orker-_threa-ds",U=()=>T.replace(/-/g,""),R=typeof globalThis.Worker>"u"&&typeof globalThis.WorkerNavigator>"u";async function F(e,r){let{Worker:t}=await import(U()),o=new t(e,r);return o.unref(),S(o)}async function k(e,r){let t;if(R)return F(e,{eval:r?.eval});if(r?.eval){let o=new Blob([e],{type:"application/javascript"});e=URL.createObjectURL(o)}return t=new globalThis.Worker(e,{type:r?r.type:void 0}),t}b.expose=!1;async function v(){return(await import("./search-worker-ts-entry-3PEIOZ3R.js")).WORKER_ENTRY_FILE_URL}var D=5e3;async function M(){return new Promise(async(e,r)=>{let t=setTimeout(()=>{r(new Error("module instantiation timeout"))},D);try{let o=await v();o||r(new Error("Could not get worker entry file URL."));let n;if(globalThis.Worker){let c=`import "${o}";`,L=new Blob([c],{type:"text/javascript"});n=URL.createObjectURL(L)}else n=new URL(o);let i=await k(n,{type:"module"}),u=c=>{c.message?.startsWith("SyntaxError")&&r(c)},f=c=>{c==="comlink-exposed"?(clearTimeout(t),e(A(i))):r(new Error(`wrong module instantiation message ${c}`))};i.nodeWorker?i.nodeWorker.once("message",f):(i.addEventListener("error",u,{once:!0}),i.addEventListener("message",c=>f(c.data),{once:!0}))}catch(o){r(o)}})}function A(e){let r=g(e),t=e.terminate.bind(e);return{insideAPI:r,outsideAPI:{terminate:t}}}async function x(){let{workerSource:e}=await import("./search-worker-inside-generated-string-IZOQDSGG.js"),r=await k(e,{eval:!0});return A(r)}var E=[];async function d(){let e=_();return E.push(e),w.setDebugMeasurePerf(a.logPerf),w.setScramblePrefetchLevel(a.scramblePrefetchLevel),e}async function P(e){await Promise.all(E.map(r=>r.then(e)))}async function _(){if(a.forceStringWorker)return console.warn("Using the `forceStringWorker` workaround for search worker instantiation. This will require downloading significantly more code than necessary, but the functionality will be the same."),x();try{return await M()}catch(e){let r="Could not instantiate module worker (this may happen in Firefox, or when using Parcel).";if(a.disableStringWorker)throw console.error(`${r} Fallback to string worker is disabled.`,e),new Error("Module worker instantiation failed.");return console.warn(`${r} Falling back to string worker.`,e),x()}}var K=null;async function m(){return await(K??(K=d()))}async function ae(e){switch(e){case"clock":return s.fromString(await p());case"minx":return s.fromString(await W())}let t=await N(e);return s.fromString(t)}async function N(e){return a.forceNewWorkerForEveryScramble,(a.forceNewWorkerForEveryScramble?await d():await m()).insideAPI.randomScrambleStringForEvent(e)}async function se(e){let r=await m();return s.fromString(await r.insideAPI.solve333ToString(e.stateData))}async function ce(e){let r=await m();return s.fromString(await r.insideAPI.solve222ToString(e.stateData))}async function le(e){let r=await m();return s.fromString(await r.insideAPI.solveSkewbToString(e.stateData))}async function me(e){let r=await m();return s.fromString(await r.insideAPI.solvePyraminxToString(e.stateData))}async function fe(e){let r=await m();return s.fromString(await r.insideAPI.solveMegaminxToString(e.stateData))}async function ue(e,r,t){let{startState:o,...n}=t??{},i=n;o&&(i.startState=o.experimentalToTransformation().transformationData);let{...u}=e.definition;delete u.experimentalIsStateSolved;let f=await d();try{return s.fromString(await f.insideAPI.solveTwsearchToString(u,r.experimentalToTransformation().transformationData,i))}finally{console.log("Search ended, terminating dedicated `twsearch` worker."),await f.outsideAPI.terminate()}}var a={logPerf:!1,scramblePrefetchLevel:"auto",forceStringWorker:!1,disableStringWorker:!1,forceNewWorkerForEveryScramble:!1};function de(e){let{logPerf:r,scramblePrefetchLevel:t}=e;typeof r<"u"&&(a.logPerf=r,P(o=>o.insideAPI.setDebugMeasurePerf(r))),typeof t<"u"&&(a.scramblePrefetchLevel=t,P(o=>o.insideAPI.setScramblePrefetchLevel(t))),"forceStringWorker"in e&&(a.forceStringWorker=!!e.forceStringWorker),"disableStringWorker"in e&&(a.disableStringWorker=!!e.disableStringWorker),"forceNewWorkerForEveryScramble"in e&&(a.forceNewWorkerForEveryScramble=!!e.forceNewWorkerForEveryScramble)}export{ae as a,se as b,ce as c,le as d,me as e,fe as f,ue as g,de as h};
//# sourceMappingURL=chunk-6XI26NMX.js.map