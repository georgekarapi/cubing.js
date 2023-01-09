import{i as Y,j as E,l as ze,n as xe,q as T}from"./chunk-ULM6IQGD.js";function V(n,t,r){let i={};for(let e in n.orbits){let o=n.orbits[e],a=t[e],s=r[e];if(U(o.numOrientations,s))i[e]=a;else if(U(o.numOrientations,a))i[e]=s;else{let c=new Array(o.numPieces);if(o.numOrientations===1){for(let u=0;u<o.numPieces;u++)c[u]=a.permutation[s.permutation[u]];i[e]={permutation:c,orientation:a.orientation}}else{let u=new Array(o.numPieces);for(let m=0;m<o.numPieces;m++)u[m]=(a.orientation[s.permutation[m]]+s.orientation[m])%o.numOrientations,c[m]=a.permutation[s.permutation[m]];i[e]={permutation:c,orientation:u}}}}return i}function J(n,t,r){let i={};for(let e in n.orbits){let o=n.orbits[e],a=t[e],s=r[e];if(U(o.numOrientations,s))i[e]=a;else{let c=new Array(o.numPieces);if(o.numOrientations===1){for(let u=0;u<o.numPieces;u++)c[u]=a.pieces[s.permutation[u]];i[e]={pieces:c,orientation:a.orientation}}else{let u=new Array(o.numPieces);for(let m=0;m<o.numPieces;m++)u[m]=(a.orientation[s.permutation[m]]+s.orientation[m])%o.numOrientations,c[m]=a.pieces[s.permutation[m]];i[e]={pieces:c,orientation:u}}}}return i}function U(n,t){let{permutation:r}=t,i=r.length;for(let e=0;e<i;e++)if(r[e]!==e)return!1;if(n>1){let{orientation:e}=t;for(let o=0;o<i;o++)if(e[o]!==0)return!1}return!0}function Qe(n,t,r,i={}){for(let e=0;e<n.numPieces;e++)if(!i?.ignoreOrientation&&t.orientation[e]!==r.orientation[e]||!i?.ignorePermutation&&t.permutation[e]!==r.permutation[e])return!1;return!0}function ge(n,t,r){for(let[i,e]of Object.entries(n.definition.orbits))if(!Qe(e,t[i],r[i]))return!1;return!0}function ee(n,t){let r={};for(let i in n.definition.orbits){let e=n.definition.orbits[i],o=t[i];if(U(e.numOrientations,o))r[i]=o;else if(e.numOrientations===1){let a=new Array(e.numPieces);for(let s=0;s<e.numPieces;s++)a[o.permutation[s]]=s;r[i]={permutation:a,orientation:o.orientation}}else{let a=new Array(e.numPieces),s=new Array(e.numPieces);for(let c=0;c<e.numPieces;c++){let u=o.permutation[c];a[u]=c,s[u]=(e.numOrientations-o.orientation[c]+e.numOrientations)%e.numOrientations}r[i]={permutation:a,orientation:s}}}return r}function w(n,t,r){if(r===1)return t;if(r<0)return w(n,ee(n,t),-r);if(r===0){let{transformationData:o}=n.identityTransformation();return o}let i=t;r!==2&&(i=w(n,t,Math.floor(r/2)));let e=V(n.definition,i,i);return r%2===0?e:V(n.definition,t,e)}var Q=class extends ze{traverseAlg(t,r){let i=null;for(let e of t.childAlgNodes())i?i=i.applyTransformation(this.traverseAlgNode(e,r)):i=this.traverseAlgNode(e,r);return i??r.identityTransformation()}traverseGrouping(t,r){let i=this.traverseAlg(t.alg,r);return new x(r,w(r,i.transformationData,t.amount))}traverseMove(t,r){return r.moveToTransformation(t)}traverseCommutator(t,r){let i=this.traverseAlg(t.A,r),e=this.traverseAlg(t.B,r);return i.applyTransformation(e).applyTransformation(i.invert()).applyTransformation(e.invert())}traverseConjugate(t,r){let i=this.traverseAlg(t.A,r),e=this.traverseAlg(t.B,r);return i.applyTransformation(e).applyTransformation(i.invert())}traversePause(t,r){return r.identityTransformation()}traverseNewline(t,r){return r.identityTransformation()}traverseLineComment(t,r){return r.identityTransformation()}},Se=xe(Q);function H(n,t){return t?H(t,n%t):n}function de(n,t){let r=1;for(let i in n.orbits){let e=n.orbits[i],o=t.transformationData[i],a=new Array(e.numPieces);for(let s=0;s<e.numPieces;s++)if(!a[s]){let c=s,u=0,m=0;for(;a[c]=!0,u=u+o.orientation[c],m=m+1,c=o.permutation[c],c!==s;);u!==0&&(m=m*e.numOrientations/H(e.numOrientations,Math.abs(u))),r=r*m/H(r,m)}}return r}var ke=!1,Pe=new Map;function He(n){let t=Pe.get(n);if(t)return t;let r=new Array(n),i=new Array(n);for(let o=0;o<n;o++)r[o]=o,i[o]=0;let e={permutation:r,orientation:i};return ke&&(Object.freeze(r),Object.freeze(i),Object.freeze(e)),Pe.set(n,e),e}function ye(n){let t={};for(let[r,i]of Object.entries(n.orbits))t[r]=He(i.numPieces);return ke&&Object.freeze(t),t}function De(n,t){let r=t.quantum.toString(),i=n.definition.moves[r];if(!i){let a=n.definition.experimentalDerivedMoves?.[r];a&&(i=n.algToTransformation(a).transformationData)}if(i)return w(n,i,t.amount);let e=n.definition.moves[t.toString()];if(e)return e;let o=n.definition.moves[t.invert().toString()];if(o)return w(n,o,-1);throw new Error(`Invalid move for KPuzzle (${n.name()}): ${t}`)}var k=class{constructor(t,r){this.kpuzzle=t;this.stateData=r}toJSON(){return{experimentalPuzzleName:this.kpuzzle.name(),stateData:this.stateData}}static fromTransformation(t){let r=J(t.kpuzzle.definition,t.kpuzzle.definition.startStateData,t.transformationData);return new k(t.kpuzzle,r)}apply(t){return this.applyTransformation(this.kpuzzle.toTransformation(t))}applyTransformation(t){if(t.isIdentityTransformation())return new k(this.kpuzzle,this.stateData);let r=J(this.kpuzzle.definition,this.stateData,t.transformationData);return new k(this.kpuzzle,r)}applyMove(t){return this.applyTransformation(this.kpuzzle.moveToTransformation(t))}applyAlg(t){return this.applyTransformation(this.kpuzzle.algToTransformation(t))}experimentalToTransformation(){if(!this.kpuzzle.canConvertStateToUniqueTransformation())return null;let t={};for(let[r,i]of Object.entries(this.stateData)){let e={permutation:i.pieces,orientation:i.orientation};t[r]=e}return new x(this.kpuzzle,t)}experimentalIsSolved(t){if(!this.kpuzzle.definition.experimentalIsStateSolved)throw new Error("`KState.experimentalIsSolved()` is not supported for this puzzle at the moment.");return this.kpuzzle.definition.experimentalIsStateSolved(this,t)}};var x=class{constructor(t,r){this.kpuzzle=t;this.transformationData=r}toJSON(){return{experimentalPuzzleName:this.kpuzzle.name(),transformationData:this.transformationData}}invert(){return new x(this.kpuzzle,ee(this.kpuzzle,this.transformationData))}#e;isIdentityTransformation(){return this.#e??(this.#e=this.isIdentical(this.kpuzzle.identityTransformation()))}static experimentalConstructIdentity(t){let r=new x(t,ye(t.definition));return r.#e=!0,r}isIdentical(t){return ge(this.kpuzzle,this.transformationData,t.transformationData)}apply(t){return this.applyTransformation(this.kpuzzle.toTransformation(t))}applyTransformation(t){if(this.kpuzzle!==t.kpuzzle)throw new Error(`Tried to apply a transformation for a KPuzzle (${t.kpuzzle.name()}) to a different KPuzzle (${this.kpuzzle.name()}).`);return this.#e?new x(this.kpuzzle,t.transformationData):t.#e?new x(this.kpuzzle,this.transformationData):new x(this.kpuzzle,V(this.kpuzzle.definition,this.transformationData,t.transformationData))}applyMove(t){return this.applyTransformation(this.kpuzzle.moveToTransformation(t))}applyAlg(t){return this.applyTransformation(this.kpuzzle.algToTransformation(t))}toKState(){return k.fromTransformation(this)}repetitionOrder(){return de(this.kpuzzle.definition,this)}selfMultiply(t){return new x(this.kpuzzle,w(this.kpuzzle,this.transformationData,t))}};var z=class{constructor(t,r){this.definition=t;this.#e=new Map;this.experimentalPGNotation=r?.experimentalPGNotation}name(){return this.definition.name}identityTransformation(){return x.experimentalConstructIdentity(this)}#e;moveToTransformation(t){typeof t=="string"&&(t=new E(t));let r=t.toString(),i=this.#e.get(r);if(i)return new x(this,i);if(this.experimentalPGNotation){let o=this.experimentalPGNotation.lookupMove(t);if(!o)throw new Error(`could not map to internal move: ${t}`);return this.#e.set(r,o),new x(this,o)}let e=De(this,t);return this.#e.set(r,e),new x(this,e)}algToTransformation(t){return typeof t=="string"&&(t=new T(t)),Se(t,this)}toTransformation(t){return typeof t=="string"?this.algToTransformation(t):t?.is?.(T)?this.algToTransformation(t):t?.is?.(E)?this.moveToTransformation(t):t}startState(){return new k(this,this.definition.startStateData)}#t;canConvertStateToUniqueTransformation(){return this.#t??(this.#t=(()=>{for(let[t,r]of Object.entries(this.definition.orbits)){let i=new Array(r.numPieces).fill(!1);for(let e of this.definition.startStateData[t].pieces)i[e]=!0;for(let e of i)if(!e)return!1}return!0})())}};function et(n,t,r,i,e){let a=n.orbits[t].pieces[r];if(a===null)return b;let s=a.facelets?.[i];return s===null?b:typeof s=="string"?s:e?s.hintMask??s.mask:(console.log(s),s.mask)}var h=class{constructor(t,r){this.stickerings=new Map;for(let[i,e]of Object.entries(t.definition.orbits))this.stickerings.set(i,new Array(e.numPieces).fill(r))}},b="regular",P="ignored",A="oriented",X="invisible",R="dim",tt={["Regular"]:{facelets:[b,b,b,b,b]},["Ignored"]:{facelets:[P,P,P,P,P]},["OrientationStickers"]:{facelets:[A,A,A,A,A]},["IgnoreNonPrimary"]:{facelets:[b,P,P,P,P]},["Invisible"]:{facelets:[X,X,X,X,X]},["PermuteNonPrimary"]:{facelets:[R,b,b,b,b]},["Dim"]:{facelets:[R,R,R,R,R]},["Ignoriented"]:{facelets:[R,P,P,P,P]},["OrientationWithoutPermutation"]:{facelets:[A,P,P,P,P]}};function be(n){return tt[n]}var G=class extends h{constructor(t){super(t,"Regular")}set(t,r){for(let[i,e]of this.stickerings.entries())for(let o=0;o<e.length;o++)t.stickerings.get(i)[o]&&(e[o]=r);return this}toStickeringMask(){let t={orbits:{}};for(let[r,i]of this.stickerings.entries()){let e=[],o={pieces:e};t.orbits[r]=o;for(let a of i)e.push(be(a))}return t}},F=class{constructor(t){this.kpuzzle=t}and(t){let r=new h(this.kpuzzle,!1);for(let[i,e]of Object.entries(this.kpuzzle.definition.orbits)){e:for(let o=0;o<e.numPieces;o++){r.stickerings.get(i)[o]=!0;for(let a of t)if(!a.stickerings.get(i)[o]){r.stickerings.get(i)[o]=!1;continue e}}}return r}or(t){let r=new h(this.kpuzzle,!1);for(let[i,e]of Object.entries(this.kpuzzle.definition.orbits)){e:for(let o=0;o<e.numPieces;o++){r.stickerings.get(i)[o]=!1;for(let a of t)if(a.stickerings.get(i)[o]){r.stickerings.get(i)[o]=!0;continue e}}}return r}not(t){let r=new h(this.kpuzzle,!1);for(let[i,e]of Object.entries(this.kpuzzle.definition.orbits))for(let o=0;o<e.numPieces;o++)r.stickerings.get(i)[o]=!t.stickerings.get(i)[o];return r}all(){return this.and(this.moves([]))}move(t){let r=this.kpuzzle.moveToTransformation(t),i=new h(this.kpuzzle,!1);for(let[e,o]of Object.entries(this.kpuzzle.definition.orbits))for(let a=0;a<o.numPieces;a++)(r.transformationData[e].permutation[a]!==a||r.transformationData[e].orientation[a]!==0)&&(i.stickerings.get(e)[a]=!0);return i}moves(t){return t.map(r=>this.move(r))}orbits(t){let r=new h(this.kpuzzle,!1);for(let i of t)r.stickerings.get(i).fill(!0);return r}orbitPrefix(t){let r=new h(this.kpuzzle,!1);for(let i in this.kpuzzle.definition.orbits)i.startsWith(t)&&r.stickerings.get(i).fill(!0);return r}};var ve="Last Layer",Ee="Last Slot",v={"3x3x3":ve,megaminx:ve},B={"3x3x3":Ee,megaminx:Ee},te={full:{groups:{"3x3x3":"Stickering",megaminx:"Stickering"}},OLL:{groups:v},PLL:{groups:v},LL:{groups:v},EOLL:{groups:v},COLL:{groups:v},OCLL:{groups:v},CPLL:{groups:v},CLL:{groups:v},EPLL:{groups:v},ELL:{groups:v},ZBLL:{groups:v},LS:{groups:B},ELS:{groups:B},CLS:{groups:B},ZBLS:{groups:B},VLS:{groups:B},WVLS:{groups:B},F2L:{groups:{"3x3x3":"CFOP (Fridrich)"}},Daisy:{groups:{"3x3x3":"CFOP (Fridrich)"}},Cross:{groups:{"3x3x3":"CFOP (Fridrich)"}},EO:{groups:{"3x3x3":"ZZ"}},EOline:{groups:{"3x3x3":"ZZ"}},EOcross:{groups:{"3x3x3":"ZZ"}},CMLL:{groups:{"3x3x3":"Roux"}},L10P:{groups:{"3x3x3":"Roux"}},L6E:{groups:{"3x3x3":"Roux"}},L6EO:{groups:{"3x3x3":"Roux"}},"2x2x2":{groups:{"3x3x3":"Petrus"}},"2x2x3":{groups:{"3x3x3":"Petrus"}},L2C:{groups:{"4x4x4":"Reduction","5x5x5":"Reduction","6x6x6":"Reduction"}},PBL:{groups:{"2x2x2":"Ortega"}},"Void Cube":{groups:{"3x3x3":"Miscellaneous"}},invisible:{groups:{"3x3x3":"Miscellaneous"}},picture:{groups:{"3x3x3":"Miscellaneous"}},"centers-only":{groups:{"3x3x3":"Miscellaneous"}},"experimental-centers-U":{},"experimental-centers-U-D":{},"experimental-centers-U-L-D":{},"experimental-centers-U-L-B-D":{},"experimental-centers":{},"experimental-fto-fc":{groups:{fto:"Bencisco"}},"experimental-fto-f2t":{groups:{fto:"Bencisco"}},"experimental-fto-sc":{groups:{fto:"Bencisco"}},"experimental-fto-l2c":{groups:{fto:"Bencisco"}},"experimental-fto-lbt":{groups:{fto:"Bencisco"}},"experimental-fto-l3t":{groups:{fto:"Bencisco"}}};async function L(n,t){let r=await n.kpuzzle(),i=new G(r),e=new F(r),o=()=>e.move("U"),a=()=>e.or(e.moves(["U","D"])),s=()=>e.or(e.moves(["L","R"])),c=()=>e.not(s()),u=()=>e.not(o()),m=()=>e.orbitPrefix("CENTER"),S=()=>e.orbitPrefix("EDGE"),l=()=>e.or([e.orbitPrefix("CORNER"),e.orbitPrefix("C4RNER"),e.orbitPrefix("C5RNER")]),D=()=>e.or([c(),e.and([o(),S()])]),f=()=>e.and([o(),m()]),O=()=>e.and([e.and(e.moves(["F","R"])),S()]),Z=()=>e.and([e.and(e.moves(["F","R"])),l(),e.not(o())]),W=()=>e.or([Z(),O()]);function d(){i.set(u(),"Dim")}function Ze(){i.set(o(),"PermuteNonPrimary"),i.set(f(),"Dim")}function _(){i.set(o(),"IgnoreNonPrimary"),i.set(f(),"Regular")}function Je(){i.set(o(),"Ignoriented"),i.set(f(),"Dim")}switch(t){case"full":break;case"PLL":{d(),Ze();break}case"CLS":{d(),i.set(Z(),"Regular"),i.set(o(),"Ignoriented"),i.set(e.and([o(),m()]),"Dim"),i.set(e.and([o(),l()]),"IgnoreNonPrimary");break}case"OLL":{d(),_();break}case"EOLL":{d(),_(),i.set(e.and([o(),l()]),"Ignored");break}case"COLL":{d(),i.set(e.and([o(),S()]),"Ignoriented"),i.set(e.and([o(),m()]),"Dim"),i.set(e.and([o(),l()]),"Regular");break}case"OCLL":{d(),Je(),i.set(e.and([o(),l()]),"IgnoreNonPrimary");break}case"CPLL":{d(),i.set(e.and([l(),o()]),"PermuteNonPrimary"),i.set(e.and([e.not(l()),o()]),"Dim");break}case"CLL":{d(),i.set(e.not(e.and([l(),o()])),"Dim");break}case"EPLL":{d(),i.set(o(),"Dim"),i.set(e.and([o(),S()]),"PermuteNonPrimary");break}case"ELL":{d(),i.set(o(),"Dim"),i.set(e.and([o(),S()]),"Regular");break}case"ELS":{d(),_(),i.set(e.and([o(),l()]),"Ignored"),i.set(O(),"Regular"),i.set(Z(),"Ignored");break}case"LL":{d();break}case"F2L":{i.set(o(),"Ignored");break}case"ZBLL":{d(),i.set(o(),"PermuteNonPrimary"),i.set(f(),"Dim"),i.set(e.and([o(),l()]),"Regular");break}case"ZBLS":{d(),i.set(W(),"Regular"),_(),i.set(e.and([o(),l()]),"Ignored");break}case"VLS":{d(),i.set(W(),"Regular"),_();break}case"WVLS":{d(),i.set(W(),"Regular"),i.set(e.and([o(),S()]),"Ignoriented"),i.set(e.and([o(),m()]),"Dim"),i.set(e.and([o(),l()]),"IgnoreNonPrimary");break}case"LS":{d(),i.set(W(),"Regular"),i.set(o(),"Ignored"),i.set(f(),"Dim");break}case"EO":{i.set(l(),"Ignored"),i.set(S(),"OrientationWithoutPermutation");break}case"EOline":{i.set(l(),"Ignored"),i.set(S(),"OrientationWithoutPermutation"),i.set(e.and(e.moves(["D","M"])),"Regular");break}case"EOcross":{i.set(S(),"OrientationWithoutPermutation"),i.set(e.move("D"),"Regular"),i.set(l(),"Ignored");break}case"CMLL":{i.set(u(),"Dim"),i.set(D(),"Ignored"),i.set(e.and([o(),l()]),"Regular");break}case"L10P":{i.set(e.not(D()),"Dim"),i.set(e.and([l(),o()]),"Regular");break}case"L6E":{i.set(e.not(D()),"Dim");break}case"L6EO":{i.set(e.not(D()),"Dim"),i.set(D(),"OrientationWithoutPermutation"),i.set(e.and([m(),a()]),"OrientationStickers");break}case"Daisy":{i.set(e.all(),"Ignored"),i.set(m(),"Dim"),i.set(e.and([e.move("D"),m()]),"Regular"),i.set(e.and([e.move("U"),S()]),"IgnoreNonPrimary");break}case"Cross":{i.set(e.all(),"Ignored"),i.set(m(),"Dim"),i.set(e.and([e.move("D"),m()]),"Regular"),i.set(e.and([e.move("D"),S()]),"Regular");break}case"2x2x2":{i.set(e.or(e.moves(["U","F","R"])),"Ignored"),i.set(e.and([e.or(e.moves(["U","F","R"])),m()]),"Dim");break}case"2x2x3":{i.set(e.all(),"Dim"),i.set(e.or(e.moves(["U","F","R"])),"Ignored"),i.set(e.and([e.or(e.moves(["U","F","R"])),m()]),"Dim"),i.set(e.and([e.move("F"),e.not(e.or(e.moves(["U","R"])))]),"Regular");break}case"L2C":{i.set(e.or(e.moves(["L","R","B","D"])),"Dim"),i.set(e.not(m()),"Ignored");break}case"PBL":{i.set(e.all(),"Ignored"),i.set(e.or(e.moves(["U","D"])),"PermuteNonPrimary");break}case"Void Cube":{i.set(m(),"Invisible");break}case"picture":case"invisible":{i.set(e.all(),"Invisible");break}case"centers-only":{i.set(e.not(m()),"Ignored");break}default:console.warn(`Unsupported stickering for ${n.id}: ${t}. Setting all pieces to dim.`),i.set(e.and(e.moves([])),"Dim")}return i.toStickeringMask()}async function K(n,t){let r=[],i=[];for(let[e,o]of Object.entries(te))o.groups&&(n in o.groups?r.push(e):t?.use3x3x3Fallbacks&&"3x3x3"in o.groups&&i.push(e));return r.concat(i)}function p(n){let t=null;return()=>t??(t=n())}var I=class extends Promise{constructor(t){super(r=>{r()}),this._executor=t}static from(t){return new I(r=>{r(t())})}static resolve(t){return new I(r=>{r(t)})}static reject(t){return new I((r,i)=>{i(t)})}then(t,r){return this._promise=this._promise||new Promise(this._executor),this._promise.then(t,r)}catch(t){return this._promise=this._promise||new Promise(this._executor),this._promise.catch(t)}};function he(n){return new I(t=>{t(n())})}async function M(n){return(await import("./puzzle-geometry-NAEPGQRU.js")).getPuzzleGeometryByName(n,{allMoves:!0,orientCenters:!0,addRotations:!0})}async function it(n,t){let r=await n,i=r.getKPuzzleDefinition(!0);i.name=t;let e=await import("./puzzle-geometry-NAEPGQRU.js"),o=new e.ExperimentalPGNotation(r,r.getOrbitsDef(!0));return new z(i,{experimentalPGNotation:o})}var y=class{constructor(t){this.puzzleSpecificSimplifyOptionsPromise=ie(this.kpuzzle.bind(this));this.pgId=t.pgID,this.id=t.id,this.fullName=t.fullName,this.inventedBy=t.inventedBy,this.inventionYear=t.inventionYear}#e;pg(){return this.#e??(this.#e=M(this.pgId??this.id))}#t;kpuzzle(){return this.#t??(this.#t=it(this.pg(),this.id))}#i;svg(){return this.#i??(this.#i=(async()=>(await this.pg()).generatesvg())())}},N=class extends y{constructor(){super(...arguments);this.stickerings=()=>K(this.id,{use3x3x3Fallbacks:!0})}stickeringMask(r){return L(this,r)}};function ie(n){return new I(async t=>{let r=await n();t({quantumMoveOrder:i=>r.moveToTransformation(new E(i)).repetitionOrder()})})}var q={name:"3x3x3",orbits:{EDGES:{numPieces:12,numOrientations:2},CORNERS:{numPieces:8,numOrientations:3},CENTERS:{numPieces:6,numOrientations:4}},startStateData:{EDGES:{pieces:[0,1,2,3,4,5,6,7,8,9,10,11],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{pieces:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{pieces:[0,1,2,3,4,5],orientation:[0,0,0,0,0,0]}},moves:{U:{EDGES:{permutation:[1,2,3,0,4,5,6,7,8,9,10,11],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientation:[1,0,0,0,0,0]}},y:{EDGES:{permutation:[1,2,3,0,5,6,7,4,10,8,11,9],orientation:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,7,4,5,6],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,2,3,4,1,5],orientation:[1,0,0,0,0,3]}},x:{EDGES:{permutation:[4,8,0,9,6,10,2,11,5,7,1,3],orientation:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,3,5,7,6,2,1],orientation:[2,1,2,1,1,2,1,2]},CENTERS:{permutation:[2,1,5,3,0,4],orientation:[0,3,0,1,2,2]}},L:{EDGES:{permutation:[0,1,2,11,4,5,6,9,8,3,10,7],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[0,1,6,2,4,3,5,7],orientation:[0,0,2,1,0,2,1,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientation:[0,1,0,0,0,0]}},F:{EDGES:{permutation:[9,1,2,3,8,5,6,7,0,4,10,11],orientation:[1,0,0,0,1,0,0,0,1,1,0,0]},CORNERS:{permutation:[3,1,2,5,0,4,6,7],orientation:[1,0,0,2,2,1,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientation:[0,0,1,0,0,0]}},R:{EDGES:{permutation:[0,8,2,3,4,10,6,7,5,9,1,11],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[4,0,2,3,7,5,6,1],orientation:[2,1,0,0,1,0,0,2]},CENTERS:{permutation:[0,1,2,3,4,5],orientation:[0,0,0,1,0,0]}},B:{EDGES:{permutation:[0,1,10,3,4,5,11,7,8,9,6,2],orientation:[0,0,1,0,0,0,1,0,0,0,1,1]},CORNERS:{permutation:[0,7,1,3,4,5,2,6],orientation:[0,2,1,0,0,0,2,1]},CENTERS:{permutation:[0,1,2,3,4,5],orientation:[0,0,0,0,1,0]}},D:{EDGES:{permutation:[0,1,2,3,7,4,5,6,8,9,10,11],orientation:[0,0,0,0,0,0,0,0,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,5,6,7,4],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,1,2,3,4,5],orientation:[0,0,0,0,0,1]}},z:{EDGES:{permutation:[9,3,11,7,8,1,10,5,0,4,2,6],orientation:[1,1,1,1,1,1,1,1,1,1,1,1]},CORNERS:{permutation:[3,2,6,5,0,4,7,1],orientation:[1,2,1,2,2,1,2,1]},CENTERS:{permutation:[1,5,2,0,4,3],orientation:[1,1,1,1,3,1]}},M:{EDGES:{permutation:[2,1,6,3,0,5,4,7,8,9,10,11],orientation:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[4,1,0,3,5,2],orientation:[2,0,0,0,2,0]}},E:{EDGES:{permutation:[0,1,2,3,4,5,6,7,9,11,8,10],orientation:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,4,1,2,3,5],orientation:[0,0,0,0,0,0]}},S:{EDGES:{permutation:[0,3,2,7,4,1,6,5,8,9,10,11],orientation:[0,1,0,1,0,1,0,1,0,0,0,0]},CORNERS:{permutation:[0,1,2,3,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[1,5,2,0,4,3],orientation:[1,1,0,1,0,1]}},u:{EDGES:{permutation:[1,2,3,0,4,5,6,7,10,8,11,9],orientation:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[1,2,3,0,4,5,6,7],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,2,3,4,1,5],orientation:[1,0,0,0,0,0]}},l:{EDGES:{permutation:[2,1,6,11,0,5,4,9,8,3,10,7],orientation:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[0,1,6,2,4,3,5,7],orientation:[0,0,2,1,0,2,1,0]},CENTERS:{permutation:[4,1,0,3,5,2],orientation:[2,1,0,0,2,0]}},f:{EDGES:{permutation:[9,3,2,7,8,1,6,5,0,4,10,11],orientation:[1,1,0,1,1,1,0,1,1,1,0,0]},CORNERS:{permutation:[3,1,2,5,0,4,6,7],orientation:[1,0,0,2,2,1,0,0]},CENTERS:{permutation:[1,5,2,0,4,3],orientation:[1,1,1,1,0,1]}},r:{EDGES:{permutation:[4,8,0,3,6,10,2,7,5,9,1,11],orientation:[1,0,1,0,1,0,1,0,0,0,0,0]},CORNERS:{permutation:[4,0,2,3,7,5,6,1],orientation:[2,1,0,0,1,0,0,2]},CENTERS:{permutation:[2,1,5,3,0,4],orientation:[0,0,0,1,2,2]}},b:{EDGES:{permutation:[0,5,10,1,4,7,11,3,8,9,6,2],orientation:[0,1,1,1,0,1,1,1,0,0,1,1]},CORNERS:{permutation:[0,7,1,3,4,5,2,6],orientation:[0,2,1,0,0,0,2,1]},CENTERS:{permutation:[3,0,2,5,4,1],orientation:[3,3,0,3,1,3]}},d:{EDGES:{permutation:[0,1,2,3,7,4,5,6,9,11,8,10],orientation:[0,0,0,0,0,0,0,0,1,1,1,1]},CORNERS:{permutation:[0,1,2,3,5,6,7,4],orientation:[0,0,0,0,0,0,0,0]},CENTERS:{permutation:[0,4,1,2,3,5],orientation:[0,0,0,0,0,1]}}}};q.experimentalDerivedMoves={Uw:"u",Lw:"l",Fw:"f",Rw:"r",Bw:"b",Dw:"d",Uv:"y",Lv:"x'",Fv:"z",Rv:"x",Bv:"z'",Dv:"y'","2U":"u U'","2L":"l L'","2F":"f F'","2R":"r R'","2B":"b B'","2D":"d D'"};function re(n){let t=n.stateData.CENTERS.pieces[0],r=n.stateData.CENTERS.pieces[5],i=n.stateData.CENTERS.pieces[1],e=i;return t<i&&e--,r<i&&e--,[t,e]}var Le=new Array(6).fill(0).map(()=>new Array(6)),rt=!1;function Ie(){if(!rt){let n=["","z","x","z'","x'","x2"].map(r=>T.fromString(r)),t=new T("y");for(let r of n){let i=$.algToTransformation(r);for(let e=0;e<4;e++){i=i.applyAlg(t);let[o,a]=re(i.toKState());Le[o][a]=i.invert()}}}return Le}function Ne(n){let[t,r]=re(n),i=Ie()[t][r];return n.applyTransformation(i)}function ne(n,t){return t.ignorePuzzleOrientation&&(n=Ne(n)),t.ignoreCenterOrientation&&(n=new k(n.kpuzzle,{EDGES:n.stateData.EDGES,CORNERS:n.stateData.CORNERS,CENTERS:{pieces:n.stateData.CENTERS.pieces,orientation:new Array(6).fill(0)}})),!!n.experimentalToTransformation()?.isIdentityTransformation()}async function nt(n){let t=await(n.puzzleSpecificSimplifyOptions??n.puzzleSpecificSimplifyOptionsPromise);return t?{puzzleLoader:{puzzleSpecificSimplifyOptions:t}}:{}}function oe(n){let r=n.experimentalToTransformation().invert().transformationData.CORNERS;return r.permutation[6]*3+r.orientation[6]}var Oe=new Array(24),ot=!1;function we(n){if(!ot){let t=["","z","x","z'","x'","x2"].map(i=>T.fromString(i)),r=new T("y");for(let i of t){let e=n.algToTransformation(i);for(let o=0;o<4;o++){e=e.applyAlg(r);let a=oe(e.toKState());Oe[a]={transformation:e.invert(),alg:i.concat(r)}}}}return Oe}function at(n){let t=oe(n),{transformation:r,alg:i}=we(n.kpuzzle)[t];return{normalizedState:n.applyTransformation(r),normalizationAlg:i.invert()}}async function ae(n){return(await import("./puzzle-geometry-NAEPGQRU.js")).getPuzzleGeometryByDesc(n,{allMoves:!0,orientCenters:!0,addRotations:!0})}async function st(n){let t=await ae(n),r=t.getKPuzzleDefinition(!0);r.name=`description: ${n}`;let i=await import("./puzzle-geometry-NAEPGQRU.js"),e=new i.ExperimentalPGNotation(t,t.getOrbitsDef(!0));return new z(r,{experimentalPGNotation:e})}var mt=1;function ut(n,t){let r=mt++,i=null,e=async()=>i??(i=st(n)),o={id:`custom-${r}`,fullName:t?.fullName??`Custom Puzzle (instance #${r})`,kpuzzle:e,svg:async()=>(await ae(n)).generatesvg(),pg:async()=>ae(n),puzzleSpecificSimplifyOptionsPromise:ie(e)};return t?.inventedBy&&(o.inventedBy=t.inventedBy),t?.inventionYear&&(o.inventionYear=t.inventionYear),o}var $=new z(q);q.experimentalIsStateSolved=ne;function g(n,t,r,i){let e=[];for(let o of n){let a=E.fromString(o),{family:s,amount:c}=a;if(![-1,1].includes(c))throw new Error("Invalid config move");e.push({family:s,direction:c,type:t,from:r,to:i})}return e}var C={["x axis"]:{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...g(["R"],0,0,3),...g(["L'"],1,0,3),...g(["r","Rw"],2,0,2),...g(["l'","Lw'"],3,0,2),...g(["M'"],4,1,2),...g(["x","Uv","Dv'"],5,0,3)]},["y axis"]:{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...g(["U"],0,0,3),...g(["D'"],1,0,3),...g(["u","Uw"],2,0,2),...g(["d'","Dw'"],3,0,2),...g(["E'"],4,1,2),...g(["y","Uv","Dv'"],5,0,3)]},["z axis"]:{sliceDiameter:3,extendsThroughEntirePuzzle:!0,moveSourceInfos:[...g(["F"],0,0,3),...g(["B'"],1,0,3),...g(["f","Fw"],2,0,3),...g(["b'","Bw'"],3,0,3),...g(["S"],4,1,2),...g(["z","Fv","Bv'"],5,0,3)]}},j={};for(let[n,t]of Object.entries(C))for(let r of t.moveSourceInfos)j[r.family]={axis:n,moveSourceInfo:r};var Me={},Re;for(let n of Object.keys(C)){let t={};Me[n]=t;for(let r of C[n].moveSourceInfos)(t[Re=r.type]??(t[Re]=[])).push(r)}var Ce={};for(let n of Object.keys(C)){let t=new Map;Ce[n]=t;for(let r of C[n].moveSourceInfos)t.get(r.from)||t.set(r.from,r)}function Ke(n,t){let r=Me[n][t]?.[0];if(!r)throw new Error(`Could not find a reference move (axis: ${n}, move source type: ${t})`);return r}var ct=(n,t)=>j[n.family].axis===j[t.family].axis;function lt(n,t,r,i){if(t+1===r){let l=Ce[n].get(t);if(l)return new E(new Y(l.family),i*l.direction)}let e=C[n],{sliceDiameter:o}=e;if(t===0&&r===o){let l=Ke(n,5);return new E(new Y(l.family),i*l.direction)}let a=t+r>o;a&&([t,r]=[o-r,o-t]);let s=t+1,c=r,u=s===c;u&&(c=null),s===1&&(s=null),u&&s===1&&(c=null),!u&&c===2&&(c=null);let S=Ke(n,u?a?1:0:a?3:2);return new E(new Y(S.family,c,s),i*S.direction)}function pt(n,t=!0){if(n.length===0)return[];let r=j[n[0].family].axis,i=C[r],{sliceDiameter:e}=i,o=new Map,a=null;function s(l,D){let f=(o.get(l)??0)+D;t&&(f=f%4+5%4-1),f===0?o.delete(l):o.set(l,f)}let c=0;for(let l of Array.from(n).reverse()){c++;let{moveSourceInfo:D}=j[l.family],f=l.amount*D.direction;switch(D.type){case 0:{let O=(l.innerLayer??1)-1;s(O,f),s(O+1,-f);break}case 1:{let O=e-(l.innerLayer??1);s(O,f),s(O+1,-f);break}case 2:{s((l.outerLayer??1)-1,f),s(l.innerLayer??2,-f);break}case 3:{s(e-(l.innerLayer??2),f),s(e-((l.outerLayer??1)-1),-f);break}case 4:{s(D.from,f),s(D.to,-f);break}case 5:{s(0,f),s(e,-f);break}}[0,2].includes(o.size)&&(a={suffixLength:c,sliceDeltas:new Map(o)})}if(o.size===0)return[];if(!a)return n;let[u,m]=a.sliceDeltas.keys();u>m&&([u,m]=[m,u]);let S=a.sliceDeltas.get(u);return[...n.slice(0,-a.suffixLength),...S!==0?[lt(r,u,m,S)]:[]]}var Ae={quantumMoveOrder:()=>4,axis:{areQuantumMovesSameAxis:ct,simplifySameAxisMoves:pt}};var se={id:"3x3x3",fullName:"3\xD73\xD73 Cube",inventedBy:["Ern\u0151 Rubik"],inventionYear:1974,kpuzzle:p(async()=>$),svg:p(async()=>(await import("./puzzles-dynamic-3x3x3-Q5LUS64K.js")).cube3x3x3SVG),llSVG:p(async()=>(await import("./puzzles-dynamic-3x3x3-Q5LUS64K.js")).cube3x3x3LLSVG),pg:p(async()=>M("3x3x3")),stickeringMask:n=>L(se,n),stickerings:()=>K("3x3x3"),puzzleSpecificSimplifyOptions:Ae};var Ge={333:{puzzleID:"3x3x3",eventName:"3x3x3 Cube"},222:{puzzleID:"2x2x2",eventName:"2x2x2 Cube"},444:{puzzleID:"4x4x4",eventName:"4x4x4 Cube"},555:{puzzleID:"5x5x5",eventName:"5x5x5 Cube"},666:{puzzleID:"6x6x6",eventName:"6x6x6 Cube"},777:{puzzleID:"7x7x7",eventName:"7x7x7 Cube"},"333bf":{puzzleID:"3x3x3",eventName:"3x3x3 Blindfolded"},"333fm":{puzzleID:"3x3x3",eventName:"3x3x3 Fewest Moves"},"333oh":{puzzleID:"3x3x3",eventName:"3x3x3 One-Handed"},clock:{puzzleID:"clock",eventName:"Clock"},minx:{puzzleID:"megaminx",eventName:"Megaminx"},pyram:{puzzleID:"pyraminx",eventName:"Pyraminx"},skewb:{puzzleID:"skewb",eventName:"Skewb"},sq1:{puzzleID:"square1",eventName:"Square-1"},"444bf":{puzzleID:"4x4x4",eventName:"4x4x4 Blindfolded"},"555bf":{puzzleID:"5x5x5",eventName:"5x5x5 Blindfolded"},"333mb":{puzzleID:"3x3x3",eventName:"3x3x3 Multi-Blind"}};var ft={...Ge,fto:{puzzleID:"fto",eventName:"Face-Turning Octahedron"},master_tetraminx:{puzzleID:"master_tetraminx",eventName:"Master Tetraminx"},kilominx:{puzzleID:"kilominx",eventName:"Kilominx"},redi_cube:{puzzleID:"redi_cube",eventName:"Redi Cube"}};var me={id:"2x2x2",fullName:"2\xD72\xD72 Cube",kpuzzle:p(async()=>new z((await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).cube2x2x2JSON)),svg:async()=>(await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).cube2x2x2SVG,llSVG:p(async()=>(await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).cube2x2x2LLSVG),pg:p(async()=>M("2x2x2")),stickeringMask:n=>L(me,n),stickerings:()=>K("2x2x2",{use3x3x3Fallbacks:!0})};var Fe={id:"clock",fullName:"Clock",inventedBy:["Christopher C. Wiggs","Christopher J. Taylor"],inventionYear:1988,kpuzzle:p(async()=>new z((await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).clockJSON)),svg:p(async()=>(await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).clockSVG)};async function Be(n,t){let r=await n.kpuzzle(),i=new G(r),e=new F(r),o=()=>e.and([e.move("U"),e.not(e.or(e.moves(["F","BL","BR"])))]),a=()=>e.and([e.move("U"),e.not(e.move("F"))]),s=()=>e.or([a(),e.and([e.move("F"),e.not(e.or(e.moves(["U","BL","BR"])))])]),c=()=>e.not(e.or([e.and([e.move("U"),e.move("F")]),e.and([e.move("F"),e.move("BL")]),e.and([e.move("F"),e.move("BR")]),e.and([e.move("BL"),e.move("BR")])])),u=()=>e.not(e.or([e.and([e.move("F"),e.move("BL")]),e.and([e.move("F"),e.move("BR")]),e.and([e.move("BL"),e.move("BR")])]));switch(t){case"full":break;case"experimental-fto-fc":{i.set(e.not(o()),"Ignored");break}case"experimental-fto-f2t":{i.set(e.not(a()),"Ignored"),i.set(o(),"Dim");break}case"experimental-fto-sc":{i.set(e.not(s()),"Ignored"),i.set(a(),"Dim");break}case"experimental-fto-l2c":{i.set(e.not(c()),"Ignored"),i.set(s(),"Dim");break}case"experimental-fto-lbt":{i.set(e.not(u()),"Ignored"),i.set(c(),"Dim");break}case"experimental-fto-l3t":{i.set(u(),"Dim");break}default:console.warn(`Unsupported stickering for ${n.id}: ${t}. Setting all pieces to dim.`),i.set(e.and(e.moves([])),"Dim")}return i.toStickeringMask()}async function _e(){return["full","experimental-fto-fc","experimental-fto-f2t","experimental-fto-sc","experimental-fto-l2c","experimental-fto-lbt","experimental-fto-l3t"]}var ue=class extends y{constructor(){super({pgID:"FTO",id:"fto",fullName:"Face-Turning Octahedron",inventedBy:["Karl Rohrbach","David Pitcher"],inventionYear:1983});this.stickerings=_e;this.svg=p(async()=>(await import("./puzzles-dynamic-unofficial-GN6OUMRF.js")).ftoSVG)}stickeringMask(r){return Be(this,r)}},Ue=new ue;async function Ve(n,t){return(await ce()).includes(t)?L(n,t):(console.warn(`Unsupported stickering for ${n.id}: ${t}. Setting all pieces to dim.`),L(n,"full"))}var zt=he(()=>K("megaminx"));function ce(){return zt}var le=class extends y{constructor(){super({id:"megaminx",fullName:"Megaminx",inventionYear:1981});this.stickerings=ce;this.llSVG=p(async()=>(await import("./puzzles-dynamic-megaminx-JWJPZNHU.js")).megaminxLLSVG)}stickeringMask(r){return Ve(this,r)}},Xe=new le;var pe=class extends y{constructor(){super({id:"pyraminx",fullName:"Pyraminx",inventedBy:["Uwe Meffert"]});this.svg=p(async()=>(await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).pyraminxSVG)}},je=new pe;var We={id:"square1",fullName:"Square-1",inventedBy:["Karel Hr\u0161el","Vojtech Kopsk\xFD"],inventionYear:1990,kpuzzle:p(async()=>new z((await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).sq1HyperOrbitJSON)),svg:p(async()=>(await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).sq1HyperOrbitSVG)};var Ye={id:"kilominx",fullName:"Kilominx",kpuzzle:p(async()=>{let n=await M("megaminx + chopasaurus"),t=JSON.parse(JSON.stringify(n.getKPuzzleDefinition(!0)));delete t.orbits.CENTERS,delete t.orbits.CENTERS2,delete t.startStateData.CENTERS,delete t.startStateData.CENTERS2;for(let a of Object.values(t.moves))delete a.CENTERS,delete a.CENTERS2;t.name="kilominx",delete t.experimentalPuzzleDescription;let r=await import("./puzzle-geometry-NAEPGQRU.js"),i=new r.ExperimentalPGNotation(n,n.getOrbitsDef(!0)),e=new z(t,{experimentalPGNotation:{lookupMove:a=>a.toString()==="x2"||a.toString()==="x2'"?o.transformationData:i.lookupMove(a)}}),o=e.algToTransformation("Rv2 Fv Uv'");return t.moves.x2=o,e}),svg:p(async()=>(await import("./puzzles-dynamic-unofficial-GN6OUMRF.js")).kilominxSVG)};var qe={id:"redi_cube",fullName:"Redi Cube",inventedBy:["Oskar van Deventer"],inventionYear:2009,kpuzzle:p(async()=>new z((await import("./puzzles-dynamic-unofficial-GN6OUMRF.js")).rediCubeJSON)),svg:async()=>(await import("./puzzles-dynamic-unofficial-GN6OUMRF.js")).rediCubeSVG};var fe=new N({id:"4x4x4",fullName:"4\xD74\xD74 Cube"});fe.llSVG=p(async()=>(await import("./puzzles-dynamic-4x4x4-YZIRFPJU.js")).cube4x4x4LLSVG);var $e={id:"melindas2x2x2x2",fullName:"Melinda's 2\xD72\xD72\xD72",inventedBy:["Melinda Green"],kpuzzle:p(async()=>new z((await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).melindas2x2x2x2OrbitJSON)),svg:p(async()=>(await import("./puzzles-dynamic-side-events-PJW3HJDH.js")).melindas2x2x2x2OrbitSVG)};var Jr={"3x3x3":se,"2x2x2":me,"4x4x4":fe,"5x5x5":new N({id:"5x5x5",fullName:"5\xD75\xD75 Cube"}),"6x6x6":new N({id:"6x6x6",fullName:"6\xD76\xD76 Cube"}),"7x7x7":new N({id:"7x7x7",fullName:"7\xD77\xD77 Cube"}),"40x40x40":new N({id:"40x40x40",fullName:"40\xD740\xD740 Cube"}),clock:Fe,megaminx:Xe,pyraminx:je,skewb:new y({id:"skewb",fullName:"Skewb",inventedBy:["Tony Durham"]}),square1:We,fto:Ue,gigaminx:new y({id:"gigaminx",fullName:"Gigaminx",inventedBy:["Tyler Fox"],inventionYear:2006}),master_tetraminx:new y({pgID:"master tetraminx",id:"master_tetraminx",fullName:"Master Tetraminx",inventedBy:["Katsuhiko Okamoto"],inventionYear:2002}),kilominx:Ye,redi_cube:qe,melindas2x2x2x2:$e};export{k as a,x as b,z as c,et as d,be as e,te as f,he as g,me as h,Ie as i,nt as j,at as k,ut as l,$ as m,se as n,Jr as o};
//# sourceMappingURL=chunk-D3X4C52T.js.map
