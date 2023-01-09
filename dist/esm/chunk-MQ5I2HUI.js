import {
  addOrientationSuffix,
  initialize333,
  mustBeInsideWorker,
  random333FewestMovesScramble,
  random333OrientedScramble,
  random333Scramble,
  setIsInsideWorker,
  solve333
} from "./chunk-KOJ2BN7S.js";
import {
  countMoves
} from "./chunk-IN66QSRW.js";
import {
  cube2x2x2,
  puzzles
} from "./chunk-XUDPTWYN.js";
import {
  from,
  normalize2x2x2Orientation
} from "./chunk-AJS6B74K.js";
import {
  KPuzzle,
  KState
} from "./chunk-KLI2E737.js";
import {
  Alg,
  AlgBuilder,
  Move,
  QuantumMove
} from "./chunk-VZP3KFTU.js";

// src/cubing/search/inside/solve/puzzles/2x2x2.ts
import { randomPermuteInPlace, randomUIntBelow } from "random-uint-below";

// src/cubing/search/inside/solve/tremble.ts
import { randomChoice } from "random-uint-below";
var DEFAULT_STAGE1_DEPTH_LIMIT = 2;
var DOUBLECHECK_PLACED_PIECES = true;
var DEBUG = false;
function calculateMoves(kpuzzle, moveNames) {
  const searchMoves = [];
  moveNames.forEach(function(moveName) {
    const rootMove = new Move(moveName);
    if (rootMove.amount !== 1) {
      throw new Error(
        "SGS cannot handle def moves with an amount other than 1 yet."
      );
    }
    let transformation = kpuzzle.identityTransformation();
    for (let i = 1; true; i++) {
      transformation = transformation.applyMove(rootMove);
      if (transformation.isIdentityTransformation()) {
        break;
      }
      searchMoves.push({
        move: rootMove.modified({ amount: i }),
        transformation
      });
    }
  });
  return searchMoves;
}
var TrembleSolver = class {
  constructor(kpuzzle, sgs, trembleMoveNames) {
    this.kpuzzle = kpuzzle;
    this.sgs = sgs;
    this.searchMoves = calculateMoves(
      this.kpuzzle,
      trembleMoveNames ?? Object.keys(this.kpuzzle.definition.moves)
    );
  }
  async solve(state, stage1DepthLimit = DEFAULT_STAGE1_DEPTH_LIMIT, quantumMoveOrder) {
    const transformation = state.experimentalToTransformation();
    if (!transformation) {
      throw new Error(
        "distinguishable pieces are not supported in tremble solver yt"
      );
    }
    let bestAlg = null;
    let bestLen = 1e6;
    const recur = (recursiveTransformation, togo, sofar) => {
      if (togo === 0) {
        const sgsAlg = this.sgsPhaseSolve(recursiveTransformation, bestLen);
        if (!sgsAlg) {
          return;
        }
        const newAlg = sofar.concat(sgsAlg).experimentalSimplify({
          cancel: { puzzleSpecificModWrap: "canonical-centered" },
          puzzleSpecificSimplifyOptions: { quantumMoveOrder }
        });
        const len = countMoves(newAlg);
        if (bestAlg === null || len < bestLen) {
          if (DEBUG) {
            console.log(`New best (${len} moves): ${newAlg.toString()}`);
            console.log(`Tremble moves are: ${sofar.toString()}`);
          }
          bestAlg = newAlg;
          bestLen = len;
        }
        return;
      }
      for (const searchMove of this.searchMoves) {
        recur(
          recursiveTransformation.applyTransformation(
            searchMove.transformation
          ),
          togo - 1,
          sofar.concat([searchMove.move])
        );
      }
    };
    for (let d = 0; d <= stage1DepthLimit; d++) {
      recur(transformation, d, new Alg());
    }
    if (bestAlg === null) {
      throw new Error("SGS search failed.");
    }
    return bestAlg;
  }
  sgsPhaseSolve(initialTransformation, bestLenSofar) {
    const algBuilder = new AlgBuilder();
    let transformation = initialTransformation;
    for (const step of this.sgs.ordering) {
      const cubieSeq = step.pieceOrdering;
      let key = "";
      const inverseTransformation = transformation.invert();
      for (let i = 0; i < cubieSeq.length; i++) {
        const loc = cubieSeq[i];
        const orbitName = loc.orbitName;
        const idx = loc.permutationIdx;
        key += ` ${inverseTransformation.transformationData[orbitName].permutation[idx]} ${inverseTransformation.transformationData[orbitName].orientation[idx]}`;
      }
      const info = step.lookup[key];
      if (!info) {
        throw new Error("Missing algorithm in sgs or esgs?");
      }
      algBuilder.experimentalPushAlg(info.alg);
      if (algBuilder.experimentalNumAlgNodes() >= bestLenSofar) {
        return null;
      }
      transformation = transformation.applyTransformation(info.transformation);
      if (DOUBLECHECK_PLACED_PIECES) {
        for (let i = 0; i < cubieSeq.length; i++) {
          const location = cubieSeq[i];
          const orbitName = location.orbitName;
          const idx = location.permutationIdx;
          if (transformation.transformationData[orbitName].permutation[idx] !== idx || transformation.transformationData[orbitName].orientation[idx] !== 0) {
            throw new Error("bad SGS :-(");
          }
        }
      }
    }
    return algBuilder.toAlg();
  }
};
function randomStateFromSGS(kpuzzle, sgs) {
  let transformation = kpuzzle.identityTransformation();
  for (const step of sgs.ordering) {
    const sgsAction = randomChoice(Object.values(step.lookup));
    transformation = transformation.applyTransformation(
      sgsAction.transformation
    );
  }
  return transformation.toKState();
}

// src/cubing/search/inside/solve/puzzles/dynamic/sgs-side-events/index.ts
var searchDynamicSideEvents = from(() => import("./search-dynamic-sgs-side-events-OIZJ36HZ.js"));

// src/cubing/search/inside/solve/twsearch.ts
var twsearchPromise = from(async () => import("./twsearch-XTET7H4F.js"));
var existingPuzzleDefString;
var existingMoveSubsetString;
function mustBeNaturalNumber(meaning, n) {
  if (typeof n !== "number" || !Number.isInteger(n) || n < 0) {
    throw new Error(`Invalid ${meaning}: ${n}`);
  }
}
async function solveTwsearch(def, stateData, options) {
  const {
    setArg,
    setKPuzzleDefString,
    serializeDefToTws,
    solveState,
    serializeKTransformationDataToTws
  } = await twsearchPromise;
  const kpuzzle = new KPuzzle(def);
  setArg("--startprunedepth 5");
  let moveSubsetString = "";
  if (options) {
    if (options.moveSubset) {
      moveSubsetString = options?.moveSubset?.join(",");
      if (moveSubsetString.includes(" ")) {
        throw new Error("A move contains a space\u203D");
      }
      if (moveSubsetString.includes("-")) {
        throw new Error("A move contains a dash");
      }
      setArg(`--moves ${moveSubsetString}`);
    }
    let { minDepth, maxDepth } = options;
    if (typeof minDepth !== "undefined") {
      mustBeNaturalNumber("minDepth", minDepth);
      if (typeof maxDepth !== "undefined") {
        mustBeNaturalNumber("maxDepth", maxDepth);
      } else {
        maxDepth = 1e6;
      }
      setArg("--randomstart");
      setArg(`--mindepth ${minDepth}`);
      setArg(`--maxdepth ${maxDepth}`);
    } else if (typeof maxDepth !== "undefined") {
      mustBeNaturalNumber("maxDepth", maxDepth);
      setArg("--mindepth 0");
      setArg(`--maxdepth ${maxDepth}`);
    }
  }
  const puzzleDefString = serializeDefToTws(kpuzzle, options);
  if (existingPuzzleDefString) {
    if (existingPuzzleDefString !== puzzleDefString) {
      throw new Error(
        "Attempted to solve two puzzles in the same worker using `twsearch`. This is not currently supported!"
      );
    }
  } else {
    existingPuzzleDefString = puzzleDefString;
    await setKPuzzleDefString(puzzleDefString);
  }
  if (typeof existingMoveSubsetString !== "undefined" && moveSubsetString !== existingMoveSubsetString) {
    throw new Error(
      "Attempted to solve two different move subsets in the same worker using `twsearch`. This is not currently supported!"
    );
  }
  return await solveState(
    serializeKTransformationDataToTws("SearchState", stateData, true)
  );
}

// src/cubing/search/inside/solve/puzzles/2x2x2.ts
var cachedTrembleSolver = null;
async function getCachedTrembleSolver() {
  return cachedTrembleSolver || (cachedTrembleSolver = (async () => {
    const sgsCachedData = await (await searchDynamicSideEvents).cachedData222();
    return new TrembleSolver(
      await puzzles["2x2x2"].kpuzzle(),
      sgsCachedData,
      "URFLBD".split("")
    );
  })());
}
async function preInitialize222() {
  await getCachedTrembleSolver();
}
async function solve222HTMSubOptimal(state, maxDepth = 11) {
  mustBeInsideWorker();
  return await solveTwsearch(
    (await cube2x2x2.kpuzzle()).definition,
    state.experimentalToTransformation().transformationData,
    {
      moveSubset: "UFLR".split(""),
      maxDepth
    }
  );
}
async function solve222HTMOptimal(state, maxDepth = 11) {
  mustBeInsideWorker();
  const { normalizedState, normalizationAlg } = normalize2x2x2Orientation(state);
  const orientedResult = await solveTwsearch(
    (await cube2x2x2.kpuzzle()).definition,
    normalizedState.experimentalToTransformation().transformationData,
    {
      moveSubset: "UFLR".split(""),
      maxDepth
    }
  );
  return normalizationAlg.concat(orientedResult);
}
async function hasHTMSolutionWithFewerMoves(state, filterMin) {
  try {
    (await solve222HTMOptimal(state, filterMin - 1)).log();
    return true;
  } catch (e) {
    if (e instanceof (await twsearchPromise).NoSolutionError) {
      return false;
    }
    throw e;
  }
}
function isCancelling(alg) {
  let lastFamily;
  for (const node of alg.childAlgNodes()) {
    const move = node.as(Move);
    if (!move) {
      throw new Error("Unexpected solution with a non-move node!");
    }
    const { family } = move;
    if (lastFamily && (lastFamily === "L" && family === "R" || lastFamily === "R" && family === "L")) {
      return true;
    }
    lastFamily = family;
  }
  return false;
}
async function solve222ForScramble(state) {
  mustBeInsideWorker();
  return solveTwsearch(
    (await cube2x2x2.kpuzzle()).definition,
    state.experimentalToTransformation().transformationData,
    {
      moveSubset: "UFLR".split(""),
      minDepth: 11
    }
  );
}
function mutatingRandomizeOrbit(kpuzzle, orbitName, state, options) {
  randomPermuteInPlace(state.stateData[orbitName].pieces);
  const orbitDef = kpuzzle.definition.orbits[orbitName];
  const ori = state.stateData[orbitName].orientation;
  let sum = 0;
  for (let i = 0; i < orbitDef.numPieces; i++) {
    const o = randomUIntBelow(orbitDef.numOrientations);
    ori[i] = o;
    sum += o;
  }
  if (options && "orientationSum" in options) {
    ori[0] = ((ori[0] + options.orientationSum - sum) % orbitDef.numOrientations + orbitDef.numOrientations) % orbitDef.numOrientations;
  }
}
async function random222State() {
  const kpuzzle = await puzzles["2x2x2"].kpuzzle();
  const stateCopy = new KState(
    kpuzzle,
    JSON.parse(JSON.stringify(kpuzzle.startState().stateData))
  );
  mutatingRandomizeOrbit(kpuzzle, "CORNERS", stateCopy, {
    orientationSum: 0
  });
  return stateCopy;
}
async function random222Scramble() {
  let state = await random222State();
  while (await hasHTMSolutionWithFewerMoves(state, 4)) {
    console.info("Filtered out a 2x2x2 state!");
    state = await random222State();
  }
  const inverseState = state.experimentalToTransformation().invert().toKState();
  let sol = await solve222ForScramble(inverseState);
  while (isCancelling(sol)) {
    sol = await solve222ForScramble(inverseState);
  }
  return sol;
}

// src/cubing/search/inside/solve/puzzles/dynamic/4x4x4/index.ts
var dynamic4x4x4Solver = from(() => import("./search-dynamic-solve-4x4x4-MYAXEGDA.js"));

// src/cubing/search/inside/solve/puzzles/4x4x4.ts
var randomSuffixes = [
  [null, "x", "x2", "x'", "z", "z'"],
  [null, "y", "y2", "y'"]
];
async function initialize444() {
  return (await dynamic4x4x4Solver).initialize();
}
async function random444Scramble() {
  return (await dynamic4x4x4Solver).random444Scramble();
}
async function random444OrientedScramble() {
  return addOrientationSuffix(await random444Scramble(), randomSuffixes);
}

// src/cubing/search/inside/solve/puzzles/big-cubes.ts
import { randomChoice as randomChoice2, randomUIntBelow as randomUIntBelow2 } from "random-uint-below";
function numMoves(n) {
  switch (n) {
    case 5:
      return 60;
    case 6:
      return 80;
    default:
      return 100;
  }
}
var axesFaces = [
  ["U", "D"],
  ["L", "R"],
  ["F", "B"]
];
var axesMovesCache = /* @__PURE__ */ new Map();
function cachedAxesMoves(n) {
  const existing = axesMovesCache.get(n);
  if (existing) {
    return existing;
  }
  const axesMoves = [];
  for (const faces of axesFaces) {
    const axisMoveFamilies = [];
    axesMoves.push(axisMoveFamilies);
    for (const face of faces) {
      axisMoveFamilies.push(new QuantumMove(face));
      if (n > 3) {
        axisMoveFamilies.push(new QuantumMove(`${face}w`));
      }
      for (let i = 3; i <= n / 2; i++) {
        axisMoveFamilies.push(new QuantumMove(`${face}w`, i));
      }
    }
  }
  axesMovesCache.set(n, axesMoves);
  return axesMoves;
}
async function bigCubeRandomMoves(n) {
  const axesMoves = cachedAxesMoves(n);
  const cachedNumMoves = numMoves(n);
  const algBuilder = new AlgBuilder();
  let currentAxisIdx = 0;
  const currentAxisQuantumMoves = /* @__PURE__ */ new Set();
  while (algBuilder.experimentalNumAlgNodes() < cachedNumMoves) {
    const newAxisIdx = randomUIntBelow2(3);
    if (newAxisIdx !== currentAxisIdx) {
      currentAxisQuantumMoves.clear();
    }
    currentAxisIdx = newAxisIdx;
    const quantumMove = randomChoice2(axesMoves[currentAxisIdx]);
    const quantumMoveStr = quantumMove.toString();
    if (currentAxisQuantumMoves.has(quantumMoveStr)) {
      continue;
    }
    currentAxisQuantumMoves.add(quantumMoveStr);
    algBuilder.push(new Move(quantumMove, randomChoice2([1, 2, -1])));
  }
  return algBuilder.toAlg();
}

// src/cubing/search/inside/solve/puzzles/5x5x5.ts
var randomSuffixes2 = [
  [null, "3Rw", "3Rw2", "3Rw'", "3Fw", "3Fw'"],
  [null, "3Dw", "3Dw2", "3Dw'"]
];
async function oriented555RandomMoves() {
  return addOrientationSuffix(await bigCubeRandomMoves(5), randomSuffixes2);
}

// src/cubing/search/inside/solve/puzzles/dynamic/fto/index.ts
var dynamicFTOSolver = from(() => import("./search-dynamic-solve-fto-JJ32OJVM.js"));

// src/cubing/search/inside/solve/puzzles/fto.ts
var dynamic = from(() => import("./search-dynamic-sgs-unofficial-OLAZRPDV.js"));
async function randomFTOScramble() {
  mustBeInsideWorker();
  return new Alg(await (await dynamicFTOSolver).randomFTOScrambleString());
}

// src/cubing/search/inside/solve/puzzles/dynamic/kilominx/index.ts
var dynamicKilominxSolver = from(() => import("./search-dynamic-solve-kilominx-I7ZZOZ6H.js"));

// src/cubing/search/inside/solve/puzzles/kilominx.ts
async function randomKilominxScramble() {
  mustBeInsideWorker();
  return (await dynamicKilominxSolver).getRandomKilominxScramble();
}

// src/cubing/search/inside/solve/puzzles/dynamic/master_tetraminx/index.ts
var dynamicMasterTetraminxSolver = from(() => import("./search-dynamic-solve-master_tetraminx-UF5FKJW6.js"));

// src/cubing/search/inside/solve/puzzles/master_tetraminx.ts
async function randomMasterTetraminxScramble() {
  mustBeInsideWorker();
  return new Alg(
    await (await dynamicMasterTetraminxSolver).randomMasterTetraminxScrambleString()
  );
}

// src/cubing/search/inside/solve/puzzles/megaminx.ts
var TREMBLE_DEPTH = 2;
var cachedTrembleSolver2 = null;
async function getCachedTrembleSolver2() {
  return cachedTrembleSolver2 || (cachedTrembleSolver2 = (async () => {
    const json = await (await searchDynamicSideEvents).cachedSGSDataMegaminx();
    return new TrembleSolver(
      await (await searchDynamicSideEvents).cachedMegaminxKPuzzleWithoutMO(),
      json,
      ["U", "R", "F", "L", "BR", "BL", "FR", "FL", "DR", "DL", "B", "D"]
    );
  })());
}
async function solveMegaminx(state) {
  mustBeInsideWorker();
  const trembleSolver = await getCachedTrembleSolver2();
  const stateDataWithoutMO = JSON.parse(
    JSON.stringify(state.stateData)
  );
  stateDataWithoutMO.CENTERS.orientation = new Array(12).fill(0);
  const stateWithoutMO = new KState(
    await (await searchDynamicSideEvents).cachedMegaminxKPuzzleWithoutMO(),
    stateDataWithoutMO
  );
  const alg = await trembleSolver.solve(
    stateWithoutMO,
    TREMBLE_DEPTH,
    () => 5
  );
  return alg;
}

// src/cubing/search/inside/solve/puzzles/pyraminx.ts
var TREMBLE_DEPTH2 = 3;
var cachedTrembleSolver3 = null;
async function getCachedTrembleSolver3() {
  return cachedTrembleSolver3 || (cachedTrembleSolver3 = (async () => {
    const json = await (await searchDynamicSideEvents).sgsDataPyraminx();
    return new TrembleSolver(
      await puzzles.pyraminx.kpuzzle(),
      json,
      "RLUB".split("")
    );
  })());
}
async function solvePyraminx(state) {
  mustBeInsideWorker();
  const trembleSolver = await getCachedTrembleSolver3();
  const alg = await trembleSolver.solve(state, TREMBLE_DEPTH2, () => 3);
  return alg;
}
async function randomPyraminxStateFixedOrientation() {
  mustBeInsideWorker();
  return randomStateFromSGS(
    await puzzles.pyraminx.kpuzzle(),
    await (await searchDynamicSideEvents).sgsDataPyraminxFixedOrientation()
  );
}
async function randomPyraminxScrambleFixedOrientation() {
  return solvePyraminx(await randomPyraminxStateFixedOrientation());
}

// src/cubing/search/inside/solve/puzzles/dynamic/sgs-unofficial/index.ts
var searchDynamicUnofficial = from(() => import("./search-dynamic-sgs-unofficial-OLAZRPDV.js"));

// src/cubing/search/inside/solve/puzzles/redi_cube.ts
async function randomRediCubeScramble() {
  mustBeInsideWorker();
  return (await searchDynamicUnofficial).getRandomRediCubeScramble();
}

// src/cubing/search/inside/solve/puzzles/skewb.ts
var TREMBLE_DEPTH3 = 3;
var cachedTrembleSolver4 = null;
async function getCachedTrembleSolver4() {
  return cachedTrembleSolver4 || (cachedTrembleSolver4 = (async () => {
    const json = await (await searchDynamicSideEvents).sgsDataSkewb();
    return new TrembleSolver(
      await (await searchDynamicSideEvents).skewbKPuzzleWithoutMOCached(),
      json,
      "RLUB".split("")
    );
  })());
}
async function resetCenterOrientation(state) {
  return new KState(
    await (await searchDynamicSideEvents).skewbKPuzzleWithoutMOCached(),
    {
      CORNERS: state.stateData.CORNERS,
      CENTERS: {
        pieces: state.stateData.CENTERS.pieces,
        orientation: new Array(6).fill(0)
      }
    }
  );
}
async function solveSkewb(state) {
  mustBeInsideWorker();
  const trembleSolver = await getCachedTrembleSolver4();
  const alg = await trembleSolver.solve(
    await resetCenterOrientation(state),
    TREMBLE_DEPTH3,
    (quantumMove) => quantumMove.family === "y" ? 4 : 3
  );
  return alg;
}
async function randomSkewbFixedCornerState() {
  return randomStateFromSGS(
    await (await searchDynamicSideEvents).skewbKPuzzleWithoutMOCached(),
    await (await searchDynamicSideEvents).sgsDataSkewbFixedCorner()
  );
}
async function randomSkewbFixedCornerScramble() {
  return solveSkewb(await randomSkewbFixedCornerState());
}

// src/cubing/search/inside/solve/puzzles/dynamic/sq1/index.ts
var dynamicSq1Solver = from(() => import("./search-dynamic-solve-sq1-S6V3FTO2.js"));

// src/cubing/search/inside/solve/puzzles/sq1.ts
async function getRandomSquare1Scramble() {
  return Alg.fromString(
    await (await dynamicSq1Solver).getRandomSquare1ScrambleString()
  );
}

// src/cubing/search/inside/api.ts
var IDLE_PREFETCH_TIMEOUT_MS = 1e3;
setIsInsideWorker(true);
var DEBUG_MEASURE_PERF = true;
function setDebugMeasurePerf(newDebugMeasurePerf) {
  DEBUG_MEASURE_PERF = newDebugMeasurePerf;
}
function now() {
  return (typeof performance === "undefined" ? Date : performance).now();
}
async function measurePerf(name, f, options) {
  if (!DEBUG_MEASURE_PERF) {
    return f();
  }
  const start = now();
  const result = f();
  if (result?.then) {
    await result;
  }
  const end = now();
  console.warn(
    `${name}${options?.isPrefetch ? " (prefetched)" : ""}: ${Math.round(
      end - start
    )}ms`
  );
  return result;
}
var prefetchPromises = /* @__PURE__ */ new Map();
var queuedPrefetchTimeoutID = null;
async function randomScrambleForEvent(eventID, options) {
  switch (eventID) {
    case "222":
      return measurePerf("random222Scramble", random222Scramble, {
        isPrefetch: options?.isPrefetch
      });
    case "333":
    case "333oh":
    case "333ft":
      return measurePerf("random333Scramble", random333Scramble, {
        isPrefetch: options?.isPrefetch
      });
    case "333fm":
      return measurePerf(
        "random333FewestMovesScramble",
        random333FewestMovesScramble
      );
    case "333bf":
    case "333mb":
      return measurePerf(
        "random333OrientedScramble",
        random333OrientedScramble
      );
    case "444":
      return measurePerf("random444Scramble", random444Scramble, {
        isPrefetch: options?.isPrefetch
      });
    case "444bf":
      return measurePerf(
        "random444OrientedScramble",
        random444OrientedScramble
      );
    case "555":
      return measurePerf(
        "bigCubeScramble(5)",
        bigCubeRandomMoves.bind(bigCubeRandomMoves, 5)
      );
    case "555bf":
      return measurePerf("oriented555RandomMoves", oriented555RandomMoves);
    case "666":
      return measurePerf(
        "bigCubeScramble(6)",
        bigCubeRandomMoves.bind(bigCubeRandomMoves, 6)
      );
    case "777":
      return measurePerf(
        "bigCubeScramble(7)",
        bigCubeRandomMoves.bind(bigCubeRandomMoves, 7)
      );
    case "skewb":
      return measurePerf(
        "randomSkewbFixedCornerScramble",
        randomSkewbFixedCornerScramble
      );
    case "pyram":
      return measurePerf(
        "randomPyraminxScrambleFixedOrientation",
        randomPyraminxScrambleFixedOrientation
      );
    case "sq1":
      return measurePerf("getRandomSquare1Scramble", getRandomSquare1Scramble, {
        isPrefetch: options?.isPrefetch
      });
    case "fto":
      return measurePerf("randomFTOScramble", randomFTOScramble, {
        isPrefetch: options?.isPrefetch
      });
    case "master_tetraminx":
      return measurePerf(
        "randomMasterTetraminxScramble",
        randomMasterTetraminxScramble
      );
    case "kilominx":
      return measurePerf("randomKilominxScramble", randomKilominxScramble, {
        isPrefetch: options?.isPrefetch
      });
    case "redi_cube":
      return measurePerf("randomRediCubeScramble", randomRediCubeScramble, {
        isPrefetch: options?.isPrefetch
      });
    default:
      throw new Error(`unsupported event: ${eventID}`);
  }
}
var currentPrefetchLevel = "auto" /* Auto */;
var insideAPI = {
  initialize: async (eventID) => {
    switch (eventID) {
      case "222":
        return measurePerf("preInitialize222", preInitialize222);
      case "333":
      case "333oh":
      case "333ft":
        return measurePerf("initialize333", initialize333);
      case "444":
        return measurePerf("initialize444", initialize444);
      default:
        throw new Error(`unsupported event: ${eventID}`);
    }
  },
  setScramblePrefetchLevel(prefetchLevel) {
    currentPrefetchLevel = prefetchLevel;
  },
  randomScrambleForEvent: async (eventID) => {
    let promise = prefetchPromises.get(eventID);
    if (promise) {
      prefetchPromises.delete(eventID);
    } else {
      promise = randomScrambleForEvent(eventID);
    }
    if (currentPrefetchLevel !== "none" /* None */) {
      promise.then(() => {
        if (queuedPrefetchTimeoutID) {
          clearTimeout(queuedPrefetchTimeoutID);
        }
        queuedPrefetchTimeoutID = setTimeout(
          () => {
            prefetchPromises.set(
              eventID,
              randomScrambleForEvent(eventID, {
                isPrefetch: true
              })
            );
          },
          currentPrefetchLevel === "immediate" /* Immediate */ ? 0 : IDLE_PREFETCH_TIMEOUT_MS
        );
      });
    }
    return promise;
  },
  randomScrambleStringForEvent: async (eventID) => {
    return (await insideAPI.randomScrambleForEvent(eventID)).toString();
  },
  solve333ToString: async (stateData) => {
    const state = new KState(await puzzles["3x3x3"].kpuzzle(), stateData);
    return (await solve333(state)).toString();
  },
  solve222ToString: async (stateData) => {
    const state = new KState(await puzzles["2x2x2"].kpuzzle(), stateData);
    return (await solve222HTMSubOptimal(state)).toString();
  },
  solveSkewbToString: async (stateData) => {
    const state = new KState(await puzzles["skewb"].kpuzzle(), stateData);
    return (await solveSkewb(state)).toString();
  },
  solvePyraminxToString: async (stateData) => {
    const state = new KState(await puzzles["pyraminx"].kpuzzle(), stateData);
    return (await solvePyraminx(state)).toString();
  },
  solveMegaminxToString: async (stateData) => {
    const state = new KState(await puzzles["megaminx"].kpuzzle(), stateData);
    return (await solveMegaminx(state)).toString();
  },
  setDebugMeasurePerf: async (measure) => {
    setDebugMeasurePerf(measure);
  },
  solveTwsearchToString: async (def, stateData, options) => {
    return (await solveTwsearch(def, stateData, options)).toString();
  }
};

export {
  insideAPI
};
//# sourceMappingURL=chunk-MQ5I2HUI.js.map
