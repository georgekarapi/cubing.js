// src/cubing/vendor/apache/comlink-everywhere/node-adapter.ts
function nodeEndpoint(nep) {
  const listeners = /* @__PURE__ */ new WeakMap();
  return {
    postMessage: nep.postMessage.bind(nep),
    addEventListener: (_, eh) => {
      const l = (data) => {
        if ("handleEvent" in eh) {
          eh.handleEvent({ data });
        } else {
          eh({ data });
        }
      };
      nep.on("message", l);
      listeners.set(eh, l);
    },
    removeEventListener: (_, eh) => {
      const l = listeners.get(eh);
      if (!l) {
        return;
      }
      nep.off("message", l);
      listeners.delete(eh);
    },
    nodeWorker: nep,
    terminate: () => {
      nep.terminate();
    }
  };
}
var node_adapter_default = nodeEndpoint;

export {
  node_adapter_default
};
//# sourceMappingURL=chunk-EV25IJFC.js.map
