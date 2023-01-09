import{a as c}from"./chunk-5XPORB2B.js";import{b as d,i as g,j as h,k as l}from"./chunk-WKWCM3NN.js";import{a as u}from"./chunk-F3UND4MX.js";function m(a){let n=a.toString();if(n.length<50)return n;n=n.slice(0,50);let e=n.lastIndexOf(" ");return e!==-1&&(n=`${n.slice(0,e)}\u2026`),n}var o=class extends l{constructor(e,i){super();this.name=e;this.twistyProp=i;this.valueElem=null;this.#e=new c(this,"highlight-",["de-emphasize","grandparent-or-further","parent","self","child","grandchild-or-further"])}connectedCallback(){let e=document.createElement("span");e.textContent=this.name,this.contentWrapper.append(e),this.valueElem=this.contentWrapper.appendChild(document.createElement("div")),this.twistyProp.addRawListener(this.onPropRaw.bind(this)),this.twistyProp.addFreshListener(this.onProp.bind(this)),this.addCSS(new h(`

.wrapper {
  font-family: Ubuntu, sans-serif;
  display: grid;
  grid-template-rows: 1.5em 3.5em;
  max-width: 20em;

  border: 2px solid #ddd;
  overflow: hidden;
  box-sizing: border-box;

  cursor: pointer;
}

.wrapper > :nth-child(2) {
  border-top: 1px solid #000;
  width: 100%;
  height: 3.5em;
  overflow-wrap: anywhere;
  padding: 0.25em;
}

.wrapper > span {
  padding: 0.25em;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 1em;
}

.wrapper.highlight-de-emphasize {
  opacity: 0.25;
}

/* .wrapper:hover > span::before { content: "\u2B50\uFE0F "; margin-right: 0.1em; } */

.wrapper.highlight-grandchild-or-further,
.wrapper.highlight-grandparent-or-further                { background: rgba(0, 0, 0, 0.2); }
.wrapper.highlight-grandparent-or-further > span::before { content: "\u23EC "; margin-right: 0.1em; }

.wrapper.highlight-child,
.wrapper.highlight-parent                { background: rgba(0, 0, 0, 0.6); color: white; }
.wrapper.highlight-parent > span::before { content: "\u{1F53D} "; margin-right: 0.1em; }

.wrapper.highlight-self                { background: rgba(0, 0, 0, 0.8); color: white; }
.wrapper.highlight-self > span::before { content: "\u2B50\uFE0F "; margin-right: 0.1em; }

.wrapper.highlight-child > span::before { content: "\u{1F53C} "; margin-right: 0.1em; }

.wrapper.highlight-grandchild-or-further > span::before { content: "\u23EB "; margin-right: 0.1em; }

.wrapper:hover {
  border: 2px solid #000;
  opacity: 1;
}

.wrapper.highlight-self:hover {
  /* border: 2px solid #f00; */
}
.wrapper.highlight-self:hover > span::before { content: "\u{1F31F} "; margin-right: 0.1em; }

    `))}async onPropRaw(){this.valueElem?.animate([{background:"rgba(244, 133, 66, 0.4)"},{background:"transparent"}],{duration:500})}async onProp(e){function i(s){try{return s instanceof Object&&"alg"in s&&"issues"in s}catch{return!1}}let t;try{if(typeof e>"u")t="(undefined)";else if(i(e)){let s=e.issues;if(t="Alg",s.errors.length>0)t+=` \u{1F6A8} ${s.errors[0]}`;else{let r=u(e.alg);t+=` (${r} moves)`,r>0&&(t+=`: ${m(e.alg)}`)}s.warnings.length>0&&(t+=` \u26A0\uFE0F ${s.warnings[0]}`)}else{let s=JSON.stringify(e);typeof s>"u"?e.name?t=`${e.name} (constructor)`:t="(undefined)":t=s.slice(0,100)}}catch{t="(can't be serialized)"}this.valueElem&&(this.valueElem.textContent=t),this.valueElem?.animate([{background:"rgba(90, 160, 253, 0.4)"},{background:"transparent"}],{duration:500})}#e;setHighlight(e){e!==null?this.#e.setValue(e):this.#e.clearValue()}};g.define("twisty-prop-debugger",o);var p=class extends l{constructor(e){super({mode:"open"});this.player=e;this.twistyPropDebuggers=new Map;this.parentPropElems=new Map;this.childPropElems=new Map;this.currentHighlighted=null}connectedCallback(){this.addCSS(new h(`
.wrapper {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12em, 1fr));
}

twisty-prop-debugger.hidden {
  /* display: none; */
}

twisty-prop-debugger.first-in-group,
twisty-prop-debugger.highlighted {
  /* grid-column-start: 1; */
}

twisty-prop-debugger.highlighted {
  /* grid-column: 1 / -1; */
  /* margin: 1em 0; */
}
`));for(let[e,i]of Object.entries(this.player.experimentalModel).concat(Object.entries(this.player.experimentalModel.twistySceneModel)))if(i instanceof d){let t=this.addElement(new o(e,i));this.twistyPropDebuggers.set(i,t),this.parentPropElems.set(t,new Set),this.childPropElems.set(t,new Set),t.addEventListener("click",()=>{this.highlightFamilyTree(t)})}for(let e of this.twistyPropDebuggers.values())for(let i of e.twistyProp.debugGetChildren()){let t=this.twistyPropDebuggers.get(i);if(!t)throw new Error("inconsistency!");this.parentPropElems.get(t).add(e),this.childPropElems.get(e).add(t)}}highlightFamilyTree(e){if(this.currentHighlighted===e){for(let r of this.twistyPropDebuggers.values())r.setHighlight(null),r.classList.remove("hidden"),r.classList.remove("first-in-group"),r.classList.remove("highlighted");this.currentHighlighted=null;return}for(let r of this.twistyPropDebuggers.values())r.setHighlight("de-emphasize"),r.classList.add("hidden"),r.classList.remove("first-in-group"),r.classList.remove("highlighted");e.setHighlight("self"),e.classList.remove("hidden"),e.classList.add("highlighted"),this.currentHighlighted=e;let i=this.childPropElems.get(e),t=!0;for(let r of this.getDescendants(e))r.setHighlight(i.has(r)?"child":"grandchild-or-further"),r.classList.remove("hidden"),t&&(r.classList.add("first-in-group"),t=!1);let s=this.parentPropElems.get(e);t=!0;for(let r of this.getAncestors(e))r.setHighlight(s.has(r)?"parent":"grandparent-or-further"),r.classList.remove("hidden"),t&&(r.classList.add("first-in-group"),t=!1)}getDescendants(e,i=new Set){for(let t of this.childPropElems.get(e)??[])i.has(t)||(i.add(t),this.getDescendants(t,i));return i}getAncestors(e,i=new Set){for(let t of this.parentPropElems.get(e)??[])i.has(t)||(i.add(t),this.getAncestors(t,i));return i}};g.define("twisty-player-debugger",p);export{o as a,p as b};
//# sourceMappingURL=chunk-E45CENAW.js.map
