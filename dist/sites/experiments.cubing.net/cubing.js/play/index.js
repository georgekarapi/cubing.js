import{a as V}from"../chunk-6NQFQQAF.js";import{e as F}from"../chunk-XXHMF4PA.js";import"../chunk-VEMOVSEF.js";import{a as I,b as m,d as T,f as N,g as W}from"../chunk-4KNYPLKC.js";import{a as B}from"../chunk-3YNO7HT6.js";import"../chunk-E2NCNLSG.js";import{c as M,g as U}from"../chunk-WX2LTJPA.js";import"../chunk-UW55Z7GB.js";import"../chunk-6JCOA7ZK.js";import"../chunk-JDD2UWSX.js";import"../chunk-MQN5DVPY.js";import{a as G}from"../chunk-LWA7II2Q.js";import"../chunk-5XPORB2B.js";import"../chunk-WKWCM3NN.js";import"../chunk-F3UND4MX.js";import"../chunk-S4ZNJEAB.js";import"../chunk-CM3DPZVF.js";import"../chunk-QIOL4UIE.js";import{j as D,q as O}from"../chunk-K5RKCHW3.js";import"../chunk-SYRP7SJ5.js";var q=new URL("./bluetooth.svg",import.meta.url).toString(),X=new URL("./clear.svg",import.meta.url).toString();G({showRenderStats:T()});var h=!1,u=null,a=null;function $(i){return{megaminx:"Megaminx"}[i]??i}var r=async(i,l,y)=>{if(!i&&l&&y?.which&&y.which!==32)return;let f=document.querySelector("#twizzle-logo");f.animate([{opacity:1},{opacity:0}],{duration:200,easing:"ease-in"}).onfinish=()=>{document.body.removeChild(f)},f.classList.add("faded-away");let s=document.createElement("div");s.classList.add("swipe-wrapper"),document.body.appendChild(s);let c=document.createElement("div");c.classList.add("control-bar"),s.appendChild(c);function b(e){if(m()!=="3x3x3"){let t=e.latestAlgLeaf.as(D);if(t)switch(t.family){case"y":{e={...e},e.latestAlgLeaf=t.modified({family:"Uv"});break}}}n.addAlgLeaf(e.latestAlgLeaf),a&&a.sendMoveEvent(e),g()}let p=document.createElement("button"),E=document.createElement("img");E.src=X,p.appendChild(E),c.appendChild(p),p.addEventListener("click",w);let o=document.createElement("a"),k=l||i?"Type to add moves":"Swipe to add moves.";o.textContent=k,c.appendChild(o);async function g(){await new Promise(t=>setTimeout(t,10));let e=await n.twistyPlayer.experimentalGet.alg();e.experimentalIsEmpty()?(o.textContent=k,o.removeAttribute("href")):(o.textContent=e.toString(),o.href=await n.twistyPlayer.experimentalModel.twizzleLink())}let d=document.createElement("button"),x=document.createElement("img");x.src=q,d.appendChild(x),c.appendChild(d);function j(){}function P(e){h||(h=!0,void 0),a&&a.sendOrientationEvent(e)}d.addEventListener("click",async()=>{try{u=await U(),u.addAlgLeafListener(b),d.style.display="none",u?.addOrientationListener(P)}finally{n.twistyPlayer.blur()}}),navigator.bluetooth||(d.style.display="none"),s.animate([{opacity:0},{opacity:1}],{duration:200,easing:"ease-in"}),s.appendChild(n),l||i||n.showGrid(),(await M(document.body)).addAlgLeafListener(b),window.removeEventListener("keydown",L),document.body.removeEventListener("mousedown",Z),document.body.removeEventListener("touchstart",z);function w(){n.twistyPlayer.alg=new O,g(),a&&(console.log("resetting!"),a.sendResetEvent()),u?.resetOrientation&&u?.resetOrientation(),p.blur()}function C(){n.twistyPlayer.experimentalRemoveFinalChild(),g()}async function S(){let e=await n.twistyPlayer.experimentalModel.twizzleLink(),t=document.createElement("a");t.href=e,t.click()}window.addEventListener("keydown",e=>{e.which===32&&w(),e.which===13&&S(),e.code==="Backspace"&&C()}),n.setActionListener(e=>{switch(e){case"space":{w();break}case"enter":{S();break}case"backspace":{C();break}}}),n.setAlgListener(g),document.addEventListener("copy",async e=>{let t=await n.twistyPlayer.experimentalGet.alg();e.clipboardData.setData("text/plain",t.toString());let v=document.createElement("a");v.href=await n.twistyPlayer.experimentalModel.twizzleLink(),v.textContent=t.toString();let _=new XMLSerializer().serializeToString(v);e.clipboardData.setData("text/html",_),e.preventDefault()}),l&&y?.preventDefault();let A=W();if(A){console.log("Registering receiver");let e=new URL(A);e.pathname="/register-receiver",new V(e.toString(),t=>{switch(console.log(t),t.event){case"move":{b(t.data);break}case"orientation":{P(t.data);break}case"reset":{w();break}}})}let R=N();if(R){console.log("Registering senter");let e=new URL(R);e.pathname="/register-sender",a=new B(e.toString())}},L=r.bind(r,!1,!0),Z=r.bind(r,!0,!1),z=r.bind(r,!1,!1);window.addEventListener("DOMContentLoaded",()=>{switch(window.addEventListener("keydown",L),document.body.addEventListener("mousedown",Z),document.body.addEventListener("touchstart",z),new URL(document.location.href).searchParams.get("go")){case"keyboard":{L();break}case"swipe":{z();break}}m()!==I&&(document.title=`Twizzle | ${$(m())}`)});var n=new F(m(),()=>{},()=>{});
//# sourceMappingURL=index.js.map
