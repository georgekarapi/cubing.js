import{a as g,e as E,f as v,g as f,h as C,i as y,j as k,l as L,m as b}from"../chunk-MQN5DVPY.js";import{c as h}from"../chunk-LWA7II2Q.js";import"../chunk-5XPORB2B.js";import"../chunk-WKWCM3NN.js";import"../chunk-F3UND4MX.js";import"../chunk-S4ZNJEAB.js";import{i as u}from"../chunk-CM3DPZVF.js";import"../chunk-QIOL4UIE.js";import{q as c}from"../chunk-K5RKCHW3.js";import"../chunk-SYRP7SJ5.js";var p=document.querySelector(".content"),l=new b;p.appendChild(l);var m=p.appendChild(document.createElement("table")),x=[["alg","alg",c.fromString("R U R'")],["experimentalSetupAlg","experimental-setup-alg",c.fromString("")]];for(let[o,a,r]of x){let n=m.appendChild(document.createElement("tr")),i=n.appendChild(document.createElement("td"));i.appendChild(document.createElement("code")).textContent=a;let e=n.appendChild(document.createElement("td")).appendChild(document.createElement("input"));e.value=r.toString(),e.placeholder="(none)";let t=()=>{l[o]=c.fromString(e.value)};e.addEventListener("change",t),e.addEventListener("keyup",t),t()}var S=[["experimentalSetupAnchor","experimental-setup-anchor",E],["puzzle","puzzle",v],["visualization","visualization",y],["hintFacelets","hint-facelets",h],["experimentalStickering","experimental-stickering",u],["background","background",L],["controlPanel","control-panel",g],["backView","back-view",f],["experimentalDragInput","experimental-drag-input",Object.assign({auto:!0},k)],["viewerLink","viewer-link",C]];for(let[o,a,r]of S){let n=m.appendChild(document.createElement("tr")),i=n.appendChild(document.createElement("td"));i.appendChild(document.createElement("code")).textContent=a;let d=n.appendChild(document.createElement("td")),e=document.createElement("select");d.appendChild(e);for(let t in r){let s=e.appendChild(document.createElement("option"));s.textContent=t,s.value=t}e.addEventListener("change",()=>{console.log(a,e.value),l[o]=e.value}),p.append(document.createElement("br"))}var w=[["cameraLatitude","camera-latitude",0],["cameraLongitude","camera-longitude",0],["cameraLatitudeLimit","camera-latitude-limit",35]];for(let[o,a,r]of w){let n=m.appendChild(document.createElement("tr")),i=n.appendChild(document.createElement("td"));i.appendChild(document.createElement("code")).textContent=a;let e=n.appendChild(document.createElement("td")).appendChild(document.createElement("input"));e.value=r.toString(),e.type="number",e.placeholder="(no value)",e.value="";let t=()=>{e.value!==""&&(l[o]=e.value)};e.addEventListener("input",t),e.addEventListener("keyup",t)}
//# sourceMappingURL=twisty-player-config.js.map
