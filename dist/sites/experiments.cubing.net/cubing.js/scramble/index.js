import"../chunk-IVJHF7GA.js";import{a as r}from"../chunk-6XI26NMX.js";import"../chunk-67YDZMJZ.js";import"../chunk-VCEJJ6IO.js";import"../chunk-FQVAE53Z.js";import"../chunk-KYICZVAX.js";import"../chunk-VFJPQATA.js";import"../chunk-MQN5DVPY.js";import"../chunk-LWA7II2Q.js";import"../chunk-5XPORB2B.js";import"../chunk-WKWCM3NN.js";import"../chunk-F3UND4MX.js";import{b as l}from"../chunk-S4ZNJEAB.js";import"../chunk-CM3DPZVF.js";import"../chunk-QIOL4UIE.js";import"../chunk-K5RKCHW3.js";import"../chunk-SYRP7SJ5.js";var t=document.querySelector("select"),a=document.querySelector("#scramble-string"),e=document.querySelector("twisty-player"),c=document.querySelector("button");async function n(){a.textContent="\u23F3",e.alg="";let o=await r(t.value);a.textContent=o.toString(),e.alg=o}window.addEventListener("DOMContentLoaded",()=>{c.addEventListener("click",n),t.addEventListener("change",()=>{e.alg="";try{e.puzzle=l(t.value).puzzleID}finally{}e.visualization=["clock","sq1"].includes(t.value)?"2D":"3D",setTimeout(n,100)}),n()});
//# sourceMappingURL=index.js.map