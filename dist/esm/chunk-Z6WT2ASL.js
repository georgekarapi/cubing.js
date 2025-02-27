import {
  node_adapter_default
} from "./chunk-EV25IJFC.js";

// src/cubing/vendor/apache/comlink-everywhere/inside/index.ts
import { expose as comlinkExpose } from "comlink";
var useNodeWorkarounds = typeof globalThis.Worker === "undefined" && typeof globalThis.WorkerNavigator === "undefined";
var worker_threads_mangled = "node:w-orker-_threa-ds";
var worker_threads_unmangled = () => worker_threads_mangled.replace(/-/g, "");
async function nodeEndpointPort() {
  const { parentPort } = await import(worker_threads_unmangled()).catch();
  return node_adapter_default(parentPort);
}
function expose(api) {
  if (useNodeWorkarounds) {
    (async () => {
      comlinkExpose(api, await nodeEndpointPort());
    })();
  } else {
    comlinkExpose(api);
  }
}

export {
  nodeEndpointPort,
  expose
};
//# sourceMappingURL=chunk-Z6WT2ASL.js.map
