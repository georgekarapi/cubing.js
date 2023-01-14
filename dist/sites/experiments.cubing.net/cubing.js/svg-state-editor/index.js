import{e as o}from"../chunk-S4ZNJEAB.js";import"../chunk-CM3DPZVF.js";import"../chunk-QIOL4UIE.js";import"../chunk-K5RKCHW3.js";import"../chunk-SYRP7SJ5.js";var u=class{constructor(){this.mode="swap";let e=document.querySelector("#puzzles");for(let i in o){let s=e.appendChild(document.createElement("option"));s.value=i,s.textContent=o[i].fullName}let t=new URL(location.href).searchParams.get("puzzle")||"3x3x3";t&&(t in o?(this.cube=new p(o[t]),e.value=t):console.error("Invalid puzzle:",t)),e?.addEventListener("change",()=>{this.cube.setPuzzle(o[e.value]);let i=new URL(location.href);i.searchParams.set("puzzle",e.value),window.history.replaceState("","",i.toString())}),document.querySelectorAll('input[name="mode"]').forEach(i=>{i.addEventListener("change",()=>{this.mode=i.value})})}},p=class{constructor(e){this.pieces=new Map;this.displayCube=async()=>{let{orbits:e}=(await this.puzzle.kpuzzle()).definition;for(let t in e){let i=e[t];for(let s=0;s<i.numOrientations;s++)for(let c=0;c<i.numPieces;c++){let l=new h(t,c,s);this.pieces.get(t)||this.pieces.set(t,{}),this.pieces.get(t)[c]={...this.pieces.get(t)[c],[s]:l}}}};this.setPuzzle(e)}setPuzzle(e){this.puzzle=e,e.svg().then(t=>{document.querySelector("#puzzle").innerHTML=t,document.querySelector("svg").removeAttribute("width"),document.querySelector("svg").removeAttribute("height"),this.displayCube()}),this.selectedFacelet=null}getFaceletByOrientation(e,t){return e[t]}getPieceByFacelet({position:e,type:t}){return this.pieces.get(t)[e]}swapFacelets(e,t){let i=e.element.style.fill;e.element.style.fill=t.element.style.fill,t.element.style.fill=i}async twist(e){let t=this.getPieceByFacelet(e),{orbits:i}=(await this.puzzle.kpuzzle()).definition,{numOrientations:s}=i[e.type];for(let c=0;c<s-1;c++){let l=this.getFaceletByOrientation(t,c),a=(s+l.orientation+1)%s;this.swapFacelets(l,this.getFaceletByOrientation(t,a))}}async swap(e,t){let i=this.getPieceByFacelet(e),s=this.getPieceByFacelet(t);if(i===s)return;let c=t.orientation-e.orientation,{orbits:l}=(await this.puzzle.kpuzzle()).definition,{numOrientations:a}=l[e.type];for(let r=0;r<a;r++){let m=this.getFaceletByOrientation(i,r),z=(a+m.orientation+c)%a;this.swapFacelets(m,this.getFaceletByOrientation(s,z))}}},h=class{constructor(e,t,i){this.type=e,this.orientation=i,this.position=t,this.element=document.getElementById(this.getId()),this.element.onclick=()=>this.click()}getId(){return`${this.type}-l${this.position}-o${this.orientation}`}deselect(){n.cube.selectedFacelet=null,this.element.style.opacity="1"}select(){n.cube.selectedFacelet&&n.cube.selectedFacelet.deselect(),n.cube.selectedFacelet=this,this.element.style.opacity="0.7"}click(){switch(n.mode){case"swap":{n.cube.selectedFacelet&&n.cube.selectedFacelet.type===this.type?(n.cube.swap(n.cube.selectedFacelet,this),n.cube.selectedFacelet.deselect()):this.select();break}case"twist":{n.cube.twist(this);break}default:console.error("unexpected mode",n.mode);break}}},n=new u;window.app=n;
//# sourceMappingURL=index.js.map