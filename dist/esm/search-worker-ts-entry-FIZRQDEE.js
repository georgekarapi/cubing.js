import {
  nodeEndpointPort
} from "./chunk-Z6WT2ASL.js";
import {
  exposeAPI
} from "./chunk-RHC3DIN3.js";
import "./chunk-EV25IJFC.js";

// src/cubing/search/inside/search-worker-ts-entry.ts
if (exposeAPI.expose) {
  (async () => {
    await import("./search-worker-js-entry-MGEIHNU7.js");
    const messagePort = globalThis.postMessage ? globalThis : await nodeEndpointPort();
    messagePort.postMessage("comlink-exposed");
  })();
}
var WORKER_ENTRY_FILE_URL = import.meta.url;
export {
  WORKER_ENTRY_FILE_URL
};
//# sourceMappingURL=search-worker-ts-entry-FIZRQDEE.js.map
