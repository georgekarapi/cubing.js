import{a as r}from"../../chunk-3MWMUJBD.js";import"../../chunk-S4ZNJEAB.js";import"../../chunk-CM3DPZVF.js";import"../../chunk-QIOL4UIE.js";import{q as n}from"../../chunk-K5RKCHW3.js";import"../../chunk-SYRP7SJ5.js";var l="robot-sent-",i="robot-recorded-";function a(e){let o=localStorage[`${l}${e}`],c=localStorage[`${i}${e}`];document.querySelector("#left").value=o,document.querySelector("#right").value=c,document.querySelector("#left-normalized").value=new n(r(n.fromString(o))).toString(),document.querySelector("#right-normalized").value=new n(r(n.fromString(c))).toString()}var t=[];for(let e of Object.keys(localStorage))e.startsWith(l)&&t.push(e.slice(l.length));t=t.sort();var s=document.querySelector("select");for(let e of t){let o=s.appendChild(document.createElement("option"));o.textContent=e,o.value=e}s.addEventListener("change",()=>{a(s.value)});t.length>0&&a(t[0]);
//# sourceMappingURL=index.js.map