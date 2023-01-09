import {
  insideAPI
} from "./chunk-MQ5I2HUI.js";
import {
  exposeAPI
} from "./chunk-RHC3DIN3.js";
import {
  node_adapter_default
} from "./chunk-EV25IJFC.js";
import {
  Alg
} from "./chunk-VZP3KFTU.js";

// src/cubing/search/inside/solve/puzzles/clock.ts
import { randomUIntBelow } from "random-uint-below";
var pins = ["UR", "DR", "DL", "UL"];
var backMoves = ["U", "R", "D", "L", "ALL"];
var frontMoves = pins.concat(backMoves);
function randomClockScrambleString() {
  let filteringMoveCount = 0;
  function randomSuffix() {
    const amount = randomUIntBelow(12);
    if (amount !== 0) {
      filteringMoveCount++;
    }
    if (amount <= 6) {
      return `${amount}+`;
    } else {
      return `${12 - amount}-`;
    }
  }
  const moves = [];
  function side(families) {
    for (const family of families) {
      moves.push(`${family}${randomSuffix()}`);
    }
  }
  side(frontMoves);
  moves.push("y2");
  side(backMoves);
  if (filteringMoveCount < 2) {
    return randomClockScrambleString();
  }
  for (const pin of pins) {
    if (randomUIntBelow(2) === 0) {
      moves.push(pin);
    }
  }
  return moves.join(" ");
}

// src/cubing/search/inside/solve/puzzles/wca-minx.ts
import { randomUIntBelow as randomUIntBelow2 } from "random-uint-below";
var suffixes = ["++", "--"];
function randomMegaminxScrambleString() {
  function rdPair() {
    return `R${suffixes[randomUIntBelow2(2)]} D${suffixes[randomUIntBelow2(2)]}`;
  }
  function randomU() {
    return `U${["", "'"][randomUIntBelow2(2)]}`;
  }
  function row() {
    const chunks2 = [];
    for (let i = 0; i < 5; i++) {
      chunks2.push(rdPair());
    }
    chunks2.push(randomU());
    return chunks2.join(" ");
  }
  const chunks = [];
  for (let i = 0; i < 6; i++) {
    chunks.push(row());
  }
  return chunks.join("\n");
}

// src/cubing/vendor/apache/comlink-everywhere/outside/index.ts
import { wrap } from "comlink";
var worker_threads_mangled = "node:w-orker-_threa-ds";
var worker_threads_unmangled = () => worker_threads_mangled.replace(/-/g, "");
var useNodeWorkarounds = typeof globalThis.Worker === "undefined" && typeof globalThis.WorkerNavigator === "undefined";
async function nodeWorker(source, options) {
  const { Worker: NodeWorker } = await import(worker_threads_unmangled());
  const worker = new NodeWorker(source, options);
  worker.unref();
  return node_adapter_default(worker);
}
async function constructWorker(source, options) {
  let worker;
  if (useNodeWorkarounds) {
    return nodeWorker(source, { eval: options?.eval });
  } else {
    if (options?.eval) {
      const blob = new Blob([source], {
        type: "application/javascript"
      });
      source = URL.createObjectURL(blob);
    }
    worker = new globalThis.Worker(source, {
      type: options ? options.type : void 0
    });
  }
  return worker;
}

// src/cubing/search/inside/search-worker-ts-entry-path-getter.ts
exposeAPI.expose = false;
async function getWorkerEntryFileURL() {
  return (await import("./search-worker-ts-entry-FIZRQDEE.js")).WORKER_ENTRY_FILE_URL;
}

// src/cubing/search/instantiator.ts
var MODULE_WORKER_TIMEOUT_MILLISECONDS = 5e3;
async function instantiateModuleWorker() {
  return new Promise(async (resolve, reject) => {
    const timeoutID = setTimeout(() => {
      reject(new Error("module instantiation timeout"));
    }, MODULE_WORKER_TIMEOUT_MILLISECONDS);
    try {
      const workerEntryFileURL = await getWorkerEntryFileURL();
      if (!workerEntryFileURL) {
        reject(new Error("Could not get worker entry file URL."));
      }
      let url;
      if (globalThis.Worker) {
        const importSrc = `import "${workerEntryFileURL}";`;
        const blob = new Blob([importSrc], {
          type: "text/javascript"
        });
        url = URL.createObjectURL(blob);
      } else {
        url = new URL(workerEntryFileURL);
      }
      const worker = await constructWorker(url, {
        type: "module"
      });
      const onError = (e) => {
        if (e.message?.startsWith("SyntaxError")) {
          reject(e);
        }
      };
      const onFirstMessage = (messageData) => {
        if (messageData === "comlink-exposed") {
          clearTimeout(timeoutID);
          resolve(wrapWithTerminate(worker));
        } else {
          reject(
            new Error(`wrong module instantiation message ${messageData}`)
          );
        }
      };
      if (worker.nodeWorker) {
        worker.nodeWorker.once("message", onFirstMessage);
      } else {
        worker.addEventListener("error", onError, {
          once: true
        });
        worker.addEventListener("message", (e) => onFirstMessage(e.data), {
          once: true
        });
      }
    } catch (e) {
      reject(e);
    }
  });
}
function wrapWithTerminate(worker) {
  const insideAPI2 = wrap(worker);
  const terminate = worker.terminate.bind(worker);
  return { insideAPI: insideAPI2, outsideAPI: { terminate } };
}
async function instantiateClassicWorker() {
  const { workerSource } = await import("./search-worker-inside-generated-string-FVOPMFZW.js");
  const worker = await constructWorker(workerSource, { eval: true });
  return wrapWithTerminate(worker);
}
var allInsideOutsideAPIPromises = [];
async function instantiateWorker() {
  const insideOutsideAPIPromise = instantiateWorkerImplementation();
  allInsideOutsideAPIPromises.push(insideOutsideAPIPromise);
  insideAPI.setDebugMeasurePerf(searchOutsideDebugGlobals.logPerf);
  insideAPI.setScramblePrefetchLevel(
    searchOutsideDebugGlobals.scramblePrefetchLevel
  );
  return insideOutsideAPIPromise;
}
async function mapToAllWorkers(f) {
  await Promise.all(
    allInsideOutsideAPIPromises.map((worker) => worker.then(f))
  );
}
async function instantiateWorkerImplementation() {
  if (searchOutsideDebugGlobals.forceStringWorker) {
    console.warn(
      "Using the `forceStringWorker` workaround for search worker instantiation. This will require downloading significantly more code than necessary, but the functionality will be the same."
    );
    return instantiateClassicWorker();
  }
  try {
    return await instantiateModuleWorker();
  } catch (e) {
    const commonErrorPrefix = "Could not instantiate module worker (this may happen in Firefox, or when using Parcel).";
    if (searchOutsideDebugGlobals.disableStringWorker) {
      console.error(
        `${commonErrorPrefix} Fallback to string worker is disabled.`,
        e
      );
      throw new Error("Module worker instantiation failed.");
    }
    console.warn(`${commonErrorPrefix} Falling back to string worker.`, e);
    return instantiateClassicWorker();
  }
}

// src/cubing/search/outside.ts
var cachedWorkerInstance = null;
async function getCachedWorkerInstance() {
  return await (cachedWorkerInstance ?? (cachedWorkerInstance = instantiateWorker()));
}
async function randomScrambleForEvent(eventID) {
  switch (eventID) {
    case "clock":
      return Alg.fromString(await randomClockScrambleString());
    case "minx":
      return Alg.fromString(await randomMegaminxScrambleString());
  }
  const prom = _randomScrambleStringForEvent(eventID);
  const wat = await prom;
  return Alg.fromString(wat);
}
async function _randomScrambleStringForEvent(eventID) {
  if (searchOutsideDebugGlobals.forceNewWorkerForEveryScramble) {
  }
  const worker = searchOutsideDebugGlobals.forceNewWorkerForEveryScramble ? await instantiateWorker() : await getCachedWorkerInstance();
  return worker.insideAPI.randomScrambleStringForEvent(eventID);
}
async function experimentalSolve3x3x3IgnoringCenters(state) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(await cwi.insideAPI.solve333ToString(state.stateData));
}
async function experimentalSolve2x2x2(state) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(await cwi.insideAPI.solve222ToString(state.stateData));
}
async function solveSkewb(state) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(
    await cwi.insideAPI.solveSkewbToString(state.stateData)
  );
}
async function solvePyraminx(state) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(
    await cwi.insideAPI.solvePyraminxToString(state.stateData)
  );
}
async function solveMegaminx(state) {
  const cwi = await getCachedWorkerInstance();
  return Alg.fromString(
    await cwi.insideAPI.solveMegaminxToString(state.stateData)
  );
}
async function solveTwsearch(kpuzzle, state, options) {
  const { startState, ...otherOptions } = options ?? {};
  const apiOptions = otherOptions;
  if (startState) {
    apiOptions.startState = startState.experimentalToTransformation().transformationData;
  }
  const { ...def } = kpuzzle.definition;
  delete def.experimentalIsStateSolved;
  const dedicatedWorker = await instantiateWorker();
  try {
    return Alg.fromString(
      await dedicatedWorker.insideAPI.solveTwsearchToString(
        def,
        state.experimentalToTransformation().transformationData,
        apiOptions
      )
    );
  } finally {
    console.log("Search ended, terminating dedicated `twsearch` worker.");
    await dedicatedWorker.outsideAPI.terminate();
  }
}
var searchOutsideDebugGlobals = {
  logPerf: false,
  scramblePrefetchLevel: "auto",
  forceStringWorker: false,
  disableStringWorker: false,
  forceNewWorkerForEveryScramble: false
};
function setDebug(options) {
  const { logPerf, scramblePrefetchLevel } = options;
  if (typeof logPerf !== "undefined") {
    searchOutsideDebugGlobals.logPerf = logPerf;
    mapToAllWorkers((worker) => worker.insideAPI.setDebugMeasurePerf(logPerf));
  }
  if (typeof scramblePrefetchLevel !== "undefined") {
    searchOutsideDebugGlobals.scramblePrefetchLevel = scramblePrefetchLevel;
    mapToAllWorkers(
      (worker) => worker.insideAPI.setScramblePrefetchLevel(
        scramblePrefetchLevel
      )
    );
  }
  if ("forceStringWorker" in options) {
    searchOutsideDebugGlobals.forceStringWorker = !!options.forceStringWorker;
  }
  if ("disableStringWorker" in options) {
    searchOutsideDebugGlobals.disableStringWorker = !!options.disableStringWorker;
  }
  if ("forceNewWorkerForEveryScramble" in options) {
    searchOutsideDebugGlobals.forceNewWorkerForEveryScramble = !!options.forceNewWorkerForEveryScramble;
  }
}

export {
  randomScrambleForEvent,
  experimentalSolve3x3x3IgnoringCenters,
  experimentalSolve2x2x2,
  solveSkewb,
  solvePyraminx,
  solveMegaminx,
  solveTwsearch,
  setDebug
};
//# sourceMappingURL=chunk-LQTIP4KR.js.map
