import{n as t,o as l}from"./chunk-K5RKCHW3.js";var r=class extends t{*traverseAlg(e){yield["Alg",e];for(let o of e.childAlgNodes())yield*this.traverseAlgNode(o)}*traverseGrouping(e){yield["Grouping",e],yield*this.traverseAlg(e.alg)}*traverseMove(e){yield["Move",e]}*traverseCommutator(e){yield["Commutator",e],yield*this.traverseAlg(e.A),yield*this.traverseAlg(e.B)}*traverseConjugate(e){yield["Conjugate",e],yield*this.traverseAlg(e.A),yield*this.traverseAlg(e.B)}*traversePause(e){yield["Pause",e]}*traverseNewline(e){yield["Newline",e]}*traverseLineComment(e){yield["Comment",e]}},u=l(r);export{u as a};
//# sourceMappingURL=chunk-YUFA2DNA.js.map