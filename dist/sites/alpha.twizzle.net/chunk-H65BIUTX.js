import{l as s,n as l}from"./chunk-ULM6IQGD.js";var i={commutator:!1,conjugate:!1,caretNISS:!1,square1:!1},t=class extends s{traverseAlg(r,e){for(let a of r.childAlgNodes())this.traverseAlgNode(a,e)}traverseGrouping(r,e){e.caretNISS||(e.caretNISS=!!r.experimentalNISSPlaceholder),e.square1||(e.square1=!!r.experimentalAsSquare1Tuple()),this.traverseAlg(r.alg,e)}traverseMove(r,e){}traverseCommutator(r,e){e.commutator=!0,this.traverseAlg(r.A,e),this.traverseAlg(r.B,e)}traverseConjugate(r,e){e.conjugate=!0,this.traverseAlg(r.A,e),this.traverseAlg(r.B,e)}traversePause(r,e){}traverseNewline(r,e){}traverseLineComment(r,e){}},u=l(t);function b(o){let r={...i};return u(o,r),r}export{b as a};
//# sourceMappingURL=chunk-H65BIUTX.js.map