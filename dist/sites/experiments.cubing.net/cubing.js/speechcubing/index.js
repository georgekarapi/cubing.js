import"../chunk-MQN5DVPY.js";import"../chunk-LWA7II2Q.js";import"../chunk-5XPORB2B.js";import"../chunk-WKWCM3NN.js";import"../chunk-F3UND4MX.js";import"../chunk-S4ZNJEAB.js";import{b as i,d as p}from"../chunk-CM3DPZVF.js";import"../chunk-QIOL4UIE.js";import{q as s}from"../chunk-K5RKCHW3.js";import"../chunk-SYRP7SJ5.js";var E=webkitSpeechRecognition,g=webkitSpeechGrammarList,R="ULFRBDxyzMES".split(""),D=`#JSGF V1.0; grammar colors; public <color> = ${R.join(" | ")} ;`,e=new E,m=new g;m.addFromString(D,1);e.grammars=m;e.continuous=!0;e.lang="en-US";e.interimResults=!1;e.maxAlternatives=10;document.body.onclick=function(){e.start(),console.log("Ready to receive a color command.")};var w=new i(p),r=document.querySelector("twisty-player"),d=document.querySelector("alternative-list");e.onresult=function(o){let n=o.results.item(o.results.length-1);d.textContent="Raw alternatives: "+Array.from(n).map(c=>c.transcript).join(" / ");for(let c of Array.from(n)){let t=c.transcript.trim().toUpperCase();switch(console.log(c),t=t.replace("YOUTUBE","U2").replace("YOU","U").replace(" PRIME","'").replace(" WIDE","w").replace(" TWO","2").replace(" TO","2").replace("WHY","Y").replace("DEEP","D").replace("DEE","D").replace("ARE","R").replace("OUR","R").replace("ALL","L").replace("EL","L").replace("WHITE","WIDE").replace("WHY DO","WIDE").replace("WHY ARE","WIDE R"),t){case"UNDO":{r.experimentalModel.alg.set((async()=>{let a=(await r.experimentalModel.alg.get()).alg,l=Array.from(a.childAlgNodes());return new s(l.slice(0,l.length-1))})());return}case"CLEAR":{r.alg="";return}case"MEGAMINX":case"PYRAMINX":case"FTO":{r.puzzle=t.toLowerCase();return}case"START":{r.timestamp="start";return}case"PLAY":{r.play();return}case"TWIZZLE":{r.controller.visitTwizzleLink();return}case"FAST":{r.tempoScale=5;return}case"SLOW":{r.tempoScale=1;return}}t=t.replace("X","x").replace("Y","y").replace("Z","z").replace("WIDE U","Uw").replace("WIDE F","Fw").replace("WIDE L","Lw").replace("WIDE R","Rw").replace("WIDE B","Bw").replace("WIDE D","Dw");try{w.moveToTransformation(t),r.experimentalAddMove(t);break}catch{}}console.log(n);let u=o.results[0][0].transcript;console.log(u),console.log(`Confidence: ${o.results[0][0].confidence}`)};e.onspeechend=function(){e.stop()};e.onnomatch=function(o){};e.onerror=function(o){};
//# sourceMappingURL=index.js.map
