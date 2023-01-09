import{a as l}from"../chunk-YUFA2DNA.js";import{q as a}from"../chunk-K5RKCHW3.js";import"../chunk-SYRP7SJ5.js";var o=document.querySelector("#alg"),t=document.querySelector("#inspector");function x(e){return console.log({n:e}),e<2?Array(e).fill("\u2423").join(""):`\u2514${new Array(e-2).fill("\u2500").join("")}\u2518`}function s(e){let c=e.replaceAll(`
`,"\u23CE");t.textContent="";try{let r=a.fromString(e);for(let[d,i]of l(r)){let n=i;t.textContent+=`
`,t.textContent+=`${d}: `.padStart(12," "),t.textContent+="".padStart(n.startCharIndex," "),t.textContent+=c.slice(n.startCharIndex,n.endCharIndex),t.textContent+=`
`,t.textContent+="".padEnd(12+n.startCharIndex," "),t.textContent+=x(n.endCharIndex-n.startCharIndex)}}catch(r){console.error(r),t.textContent+=`
--------
ERROR:
`+r.toString()}}o.addEventListener("input",()=>s(o.value));s(o.value);
//# sourceMappingURL=inspector.js.map
