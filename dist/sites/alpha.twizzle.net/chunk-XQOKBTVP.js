import{m as s,n as u}from"./chunk-ULM6IQGD.js";var o=class extends s{constructor(r){super();this.metric=r}traverseAlg(r){let n=0;for(let i of r.childAlgNodes())n+=this.traverseAlgNode(i);return n}traverseGrouping(r){let n=r.alg;return this.traverseAlg(n)*Math.abs(r.amount)}traverseMove(r){return this.metric(r)}traverseCommutator(r){return 2*(this.traverseAlg(r.A)+this.traverseAlg(r.B))}traverseConjugate(r){return 2*this.traverseAlg(r.A)+this.traverseAlg(r.B)}traversePause(r){return 0}traverseNewline(r){return 0}traverseLineComment(r){return 0}};function m(t){return"A"<=t&&t<="Z"}function l(t){let e=t.family;return m(e[0])&&e[e.length-1]==="v"||e==="x"||e==="y"||e==="z"||e==="T"?0:1}function v(t){return 1}function c(t){let e=t.family;return m(e[0])&&e[e.length-1]==="v"||e==="x"||e==="y"||e==="z"||e==="T"?0:Math.abs(t.amount)}var b=u(o,[l]),p=u(o,[v]),g=u(o,[c]);var a=class extends s{traverseAlg(e){let r=0;for(let n of e.childAlgNodes())r+=this.traverseAlgNode(n);return r}traverseGrouping(e){return this.traverseAlg(e.alg)*Math.abs(e.amount)}traverseMove(e){return 1}traverseCommutator(e){return 2*(this.traverseAlg(e.A)+this.traverseAlg(e.B))}traverseConjugate(e){return 2*this.traverseAlg(e.A)+this.traverseAlg(e.B)}traversePause(e){return 1}traverseNewline(e){return 0}traverseLineComment(e){return 0}},A=u(a);export{b as a,p as b,A as c};
//# sourceMappingURL=chunk-XQOKBTVP.js.map
