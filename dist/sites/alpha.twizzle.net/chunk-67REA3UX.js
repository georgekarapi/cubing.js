function W(e){let t=new WeakMap;return{postMessage:e.postMessage.bind(e),addEventListener:(n,r)=>{let o=l=>{"handleEvent"in r?r.handleEvent({data:l}):r({data:l})};e.on("message",o),t.set(r,o)},removeEventListener:(n,r)=>{let o=t.get(r);!o||(e.off("message",o),t.delete(r))},nodeWorker:e,terminate:()=>{e.terminate()}}}var j=W;var k=Symbol("Comlink.proxy"),v=Symbol("Comlink.endpoint"),A=Symbol("Comlink.releaseProxy"),y=Symbol("Comlink.thrown"),w=e=>typeof e=="object"&&e!==null||typeof e=="function",x={canHandle:e=>w(e)&&e[k],serialize(e){let{port1:t,port2:n}=new MessageChannel;return M(e,t),[n,[n]]},deserialize(e){return e.start(),N(e)}},R={canHandle:e=>w(e)&&y in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},L=new Map([["proxy",x],["throw",R]]);function M(e,t=self){t.addEventListener("message",function n(r){if(!r||!r.data)return;let{id:o,type:l,path:s}=Object.assign({path:[]},r.data),c=(r.data.argumentList||[]).map(f),a;try{let i=s.slice(0,-1).reduce((u,g)=>u[g],e),d=s.reduce((u,g)=>u[g],e);switch(l){case"GET":a=d;break;case"SET":i[s.slice(-1)[0]]=f(r.data.value),a=!0;break;case"APPLY":a=d.apply(i,c);break;case"CONSTRUCT":{let u=new d(...c);a=C(u)}break;case"ENDPOINT":{let{port1:u,port2:g}=new MessageChannel;M(e,g),a=_(u,[u])}break;case"RELEASE":a=void 0;break;default:return}}catch(i){a={value:i,[y]:0}}Promise.resolve(a).catch(i=>({value:i,[y]:0})).then(i=>{let[d,u]=h(i);t.postMessage(Object.assign(Object.assign({},d),{id:o}),u),l==="RELEASE"&&(t.removeEventListener("message",n),P(t))})}),t.start&&t.start()}function T(e){return e.constructor.name==="MessagePort"}function P(e){T(e)&&e.close()}function N(e,t){return p(e,[],t)}function E(e){if(e)throw new Error("Proxy has been released and is not useable")}function p(e,t=[],n=function(){}){let r=!1,o=new Proxy(n,{get(l,s){if(E(r),s===A)return()=>m(e,{type:"RELEASE",path:t.map(c=>c.toString())}).then(()=>{P(e),r=!0});if(s==="then"){if(t.length===0)return{then:()=>o};let c=m(e,{type:"GET",path:t.map(a=>a.toString())}).then(f);return c.then.bind(c)}return p(e,[...t,s])},set(l,s,c){E(r);let[a,i]=h(c);return m(e,{type:"SET",path:[...t,s].map(d=>d.toString()),value:a},i).then(f)},apply(l,s,c){E(r);let a=t[t.length-1];if(a===v)return m(e,{type:"ENDPOINT"}).then(f);if(a==="bind")return p(e,t.slice(0,-1));let[i,d]=b(c);return m(e,{type:"APPLY",path:t.map(u=>u.toString()),argumentList:i},d).then(f)},construct(l,s){E(r);let[c,a]=b(s);return m(e,{type:"CONSTRUCT",path:t.map(i=>i.toString()),argumentList:c},a).then(f)}});return o}function O(e){return Array.prototype.concat.apply([],e)}function b(e){let t=e.map(h);return[t.map(n=>n[0]),O(t.map(n=>n[1]))]}var S=new WeakMap;function _(e,t){return S.set(e,t),e}function C(e){return Object.assign(e,{[k]:!0})}function h(e){for(let[t,n]of L)if(n.canHandle(e)){let[r,o]=n.serialize(e);return[{type:"HANDLER",name:t,value:r},o]}return[{type:"RAW",value:e},S.get(e)||[]]}function f(e){switch(e.type){case"HANDLER":return L.get(e.name).deserialize(e.value);case"RAW":return e.value}}function m(e,t,n){return new Promise(r=>{let o=H();e.addEventListener("message",function l(s){!s.data||!s.data.id||s.data.id!==o||(e.removeEventListener("message",l),r(s.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),n)})}function H(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}export{j as a,M as b,N as c};
//# sourceMappingURL=chunk-67REA3UX.js.map
