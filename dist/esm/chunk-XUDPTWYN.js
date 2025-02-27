import {
  CubePGPuzzleLoader,
  PGPuzzleLoader,
  PuzzleStickering,
  StickeringManager,
  asyncGetPuzzleGeometry,
  cubeLikeStickeringList,
  cubeLikeStickeringMask,
  experimental3x3x3KPuzzle,
  from,
  getCached
} from "./chunk-AJS6B74K.js";
import {
  KPuzzle
} from "./chunk-KLI2E737.js";
import {
  Move,
  QuantumMove
} from "./chunk-VZP3KFTU.js";

// src/cubing/puzzles/events.ts
var wcaEvents = {
  "333": { puzzleID: "3x3x3", eventName: "3x3x3 Cube" },
  "222": { puzzleID: "2x2x2", eventName: "2x2x2 Cube" },
  "444": { puzzleID: "4x4x4", eventName: "4x4x4 Cube" },
  "555": { puzzleID: "5x5x5", eventName: "5x5x5 Cube" },
  "666": { puzzleID: "6x6x6", eventName: "6x6x6 Cube" },
  "777": { puzzleID: "7x7x7", eventName: "7x7x7 Cube" },
  "333bf": { puzzleID: "3x3x3", eventName: "3x3x3 Blindfolded" },
  "333fm": { puzzleID: "3x3x3", eventName: "3x3x3 Fewest Moves" },
  "333oh": { puzzleID: "3x3x3", eventName: "3x3x3 One-Handed" },
  clock: { puzzleID: "clock", eventName: "Clock" },
  minx: { puzzleID: "megaminx", eventName: "Megaminx" },
  pyram: { puzzleID: "pyraminx", eventName: "Pyraminx" },
  skewb: { puzzleID: "skewb", eventName: "Skewb" },
  sq1: { puzzleID: "square1", eventName: "Square-1" },
  "444bf": { puzzleID: "4x4x4", eventName: "4x4x4 Blindfolded" },
  "555bf": { puzzleID: "5x5x5", eventName: "5x5x5 Blindfolded" },
  "333mb": { puzzleID: "3x3x3", eventName: "3x3x3 Multi-Blind" }
};
function wcaEventInfo(event) {
  return wcaEvents[event] ?? null;
}
var twizzleEvents = {
  ...wcaEvents,
  fto: { puzzleID: "fto", eventName: "Face-Turning Octahedron" },
  master_tetraminx: {
    puzzleID: "master_tetraminx",
    eventName: "Master Tetraminx"
  },
  kilominx: {
    puzzleID: "kilominx",
    eventName: "Kilominx"
  },
  redi_cube: {
    puzzleID: "redi_cube",
    eventName: "Redi Cube"
  }
};
function eventInfo(event) {
  return twizzleEvents[event] ?? null;
}

// src/cubing/puzzles/implementations/2x2x2/index.ts
var cube2x2x2 = {
  id: "2x2x2",
  fullName: "2\xD72\xD72 Cube",
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).cube2x2x2JSON
    )
  ),
  svg: async () => (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).cube2x2x2SVG,
  llSVG: getCached(
    async () => (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).cube2x2x2LLSVG
  ),
  pg: getCached(async () => {
    return asyncGetPuzzleGeometry("2x2x2");
  }),
  stickeringMask: (stickering) => cubeLikeStickeringMask(cube2x2x2, stickering),
  stickerings: () => cubeLikeStickeringList("2x2x2", { use3x3x3Fallbacks: true })
};

// src/cubing/puzzles/implementations/3x3x3/puzzle-specific-simplifications.ts
function makeSourceInfo(moveStrings, type, from2, to) {
  const output = [];
  for (const moveString of moveStrings) {
    const move = Move.fromString(moveString);
    const { family, amount: direction } = move;
    if (![-1, 1].includes(direction)) {
      throw new Error("Invalid config move");
    }
    output.push({ family, direction, type, from: from2, to });
  }
  return output;
}
var axisInfos = {
  ["x axis" /* X */]: {
    sliceDiameter: 3,
    extendsThroughEntirePuzzle: true,
    moveSourceInfos: [
      ...makeSourceInfo(["R"], 0 /* INDEXABLE_SLICE_NEAR */, 0, 3),
      ...makeSourceInfo(["L'"], 1 /* INDEXABLE_SLICE_FAR */, 0, 3),
      ...makeSourceInfo(["r", "Rw"], 2 /* INDEXABLE_WIDE_NEAR */, 0, 2),
      ...makeSourceInfo(["l'", "Lw'"], 3 /* INDEXABLE_WIDE_FAR */, 0, 2),
      ...makeSourceInfo(["M'"], 4 /* SPECIFIC_SLICE */, 1, 2),
      ...makeSourceInfo(["x", "Uv", "Dv'"], 5 /* ROTATION */, 0, 3)
    ]
  },
  ["y axis" /* Y */]: {
    sliceDiameter: 3,
    extendsThroughEntirePuzzle: true,
    moveSourceInfos: [
      ...makeSourceInfo(["U"], 0 /* INDEXABLE_SLICE_NEAR */, 0, 3),
      ...makeSourceInfo(["D'"], 1 /* INDEXABLE_SLICE_FAR */, 0, 3),
      ...makeSourceInfo(["u", "Uw"], 2 /* INDEXABLE_WIDE_NEAR */, 0, 2),
      ...makeSourceInfo(["d'", "Dw'"], 3 /* INDEXABLE_WIDE_FAR */, 0, 2),
      ...makeSourceInfo(["E'"], 4 /* SPECIFIC_SLICE */, 1, 2),
      ...makeSourceInfo(["y", "Uv", "Dv'"], 5 /* ROTATION */, 0, 3)
    ]
  },
  ["z axis" /* Z */]: {
    sliceDiameter: 3,
    extendsThroughEntirePuzzle: true,
    moveSourceInfos: [
      ...makeSourceInfo(["F"], 0 /* INDEXABLE_SLICE_NEAR */, 0, 3),
      ...makeSourceInfo(["B'"], 1 /* INDEXABLE_SLICE_FAR */, 0, 3),
      ...makeSourceInfo(["f", "Fw"], 2 /* INDEXABLE_WIDE_NEAR */, 0, 3),
      ...makeSourceInfo(["b'", "Bw'"], 3 /* INDEXABLE_WIDE_FAR */, 0, 3),
      ...makeSourceInfo(["S"], 4 /* SPECIFIC_SLICE */, 1, 2),
      ...makeSourceInfo(["z", "Fv", "Bv'"], 5 /* ROTATION */, 0, 3)
    ]
  }
};
var byFamily = {};
for (const [axis, info] of Object.entries(axisInfos)) {
  for (const moveSourceInfo of info.moveSourceInfos) {
    byFamily[moveSourceInfo.family] = { axis, moveSourceInfo };
  }
}
var byAxisThenType = {};
var _a;
for (const axis of Object.keys(axisInfos)) {
  const entry = {};
  byAxisThenType[axis] = entry;
  for (const moveSourceInfo of axisInfos[axis].moveSourceInfos) {
    (entry[_a = moveSourceInfo.type] ?? (entry[_a] = [])).push(moveSourceInfo);
  }
}
var byAxisThenSpecificSlices = {};
for (const axis of Object.keys(axisInfos)) {
  const entry = /* @__PURE__ */ new Map();
  byAxisThenSpecificSlices[axis] = entry;
  for (const moveSourceInfo of axisInfos[axis].moveSourceInfos) {
    if (!entry.get(moveSourceInfo.from)) {
      entry.set(moveSourceInfo.from, moveSourceInfo);
    }
  }
}
function firstOfType(axis, moveSourceType) {
  const entry = byAxisThenType[axis][moveSourceType]?.[0];
  if (!entry) {
    throw new Error(
      `Could not find a reference move (axis: ${axis}, move source type: ${moveSourceType})`
    );
  }
  return entry;
}
var areQuantumMovesSameAxis = (quantumMove1, quantumMove2) => {
  return byFamily[quantumMove1.family].axis === byFamily[quantumMove2.family].axis;
};
function simplestMove(axis, from2, to, directedAmount) {
  if (from2 + 1 === to) {
    const sliceSpecificInfo = byAxisThenSpecificSlices[axis].get(from2);
    if (sliceSpecificInfo) {
      return new Move(
        new QuantumMove(sliceSpecificInfo.family),
        directedAmount * sliceSpecificInfo.direction
      );
    }
  }
  const axisInfo = axisInfos[axis];
  const { sliceDiameter } = axisInfo;
  if (from2 === 0 && to === sliceDiameter) {
    const moveSourceInfo2 = firstOfType(axis, 5 /* ROTATION */);
    return new Move(
      new QuantumMove(moveSourceInfo2.family),
      directedAmount * moveSourceInfo2.direction
    );
  }
  const far = from2 + to > sliceDiameter;
  if (far) {
    [from2, to] = [sliceDiameter - to, sliceDiameter - from2];
  }
  let outerLayer = from2 + 1;
  let innerLayer = to;
  const slice = outerLayer === innerLayer;
  if (slice) {
    innerLayer = null;
  }
  if (outerLayer === 1) {
    outerLayer = null;
  }
  if (slice && outerLayer === 1) {
    innerLayer = null;
  }
  if (!slice && innerLayer === 2) {
    innerLayer = null;
  }
  const moveSourceType = slice ? far ? 1 /* INDEXABLE_SLICE_FAR */ : 0 /* INDEXABLE_SLICE_NEAR */ : far ? 3 /* INDEXABLE_WIDE_FAR */ : 2 /* INDEXABLE_WIDE_NEAR */;
  const moveSourceInfo = firstOfType(axis, moveSourceType);
  return new Move(
    new QuantumMove(moveSourceInfo.family, innerLayer, outerLayer),
    directedAmount * moveSourceInfo.direction
  );
}
function simplifySameAxisMoves(moves, quantumMod = true) {
  if (moves.length === 0) {
    return [];
  }
  const axis = byFamily[moves[0].family].axis;
  const axisInfo = axisInfos[axis];
  const { sliceDiameter } = axisInfo;
  const sliceDeltas = /* @__PURE__ */ new Map();
  let lastCandidateRange = null;
  function adjustValue(idx, relativeDelta) {
    let newDelta = (sliceDeltas.get(idx) ?? 0) + relativeDelta;
    if (quantumMod) {
      newDelta = newDelta % 4 + 5 % 4 - 1;
    }
    if (newDelta === 0) {
      sliceDeltas.delete(idx);
    } else {
      sliceDeltas.set(idx, newDelta);
    }
  }
  let suffixLength = 0;
  for (const move of Array.from(moves).reverse()) {
    suffixLength++;
    const { moveSourceInfo } = byFamily[move.family];
    const directedAmount2 = move.amount * moveSourceInfo.direction;
    switch (moveSourceInfo.type) {
      case 0 /* INDEXABLE_SLICE_NEAR */: {
        const idx = (move.innerLayer ?? 1) - 1;
        adjustValue(idx, directedAmount2);
        adjustValue(idx + 1, -directedAmount2);
        break;
      }
      case 1 /* INDEXABLE_SLICE_FAR */: {
        const idx = sliceDiameter - (move.innerLayer ?? 1);
        adjustValue(idx, directedAmount2);
        adjustValue(idx + 1, -directedAmount2);
        break;
      }
      case 2 /* INDEXABLE_WIDE_NEAR */: {
        adjustValue((move.outerLayer ?? 1) - 1, directedAmount2);
        adjustValue(move.innerLayer ?? 2, -directedAmount2);
        break;
      }
      case 3 /* INDEXABLE_WIDE_FAR */: {
        adjustValue(sliceDiameter - (move.innerLayer ?? 2), directedAmount2);
        adjustValue(
          sliceDiameter - ((move.outerLayer ?? 1) - 1),
          -directedAmount2
        );
        break;
      }
      case 4 /* SPECIFIC_SLICE */: {
        adjustValue(moveSourceInfo.from, directedAmount2);
        adjustValue(moveSourceInfo.to, -directedAmount2);
        break;
      }
      case 5 /* ROTATION */: {
        adjustValue(0, directedAmount2);
        adjustValue(sliceDiameter, -directedAmount2);
        break;
      }
    }
    if ([0, 2].includes(sliceDeltas.size)) {
      lastCandidateRange = { suffixLength, sliceDeltas: new Map(sliceDeltas) };
    }
  }
  if (sliceDeltas.size === 0) {
    return [];
  }
  if (!lastCandidateRange) {
    return moves;
  }
  let [from2, to] = lastCandidateRange.sliceDeltas.keys();
  if (from2 > to) {
    [from2, to] = [to, from2];
  }
  const directedAmount = lastCandidateRange.sliceDeltas.get(from2);
  return [
    ...moves.slice(0, -lastCandidateRange.suffixLength),
    ...directedAmount !== 0 ? [simplestMove(axis, from2, to, directedAmount)] : []
  ];
}
var puzzleSpecificSimplifyOptions333 = {
  quantumMoveOrder: () => 4,
  axis: { areQuantumMovesSameAxis, simplifySameAxisMoves }
};

// src/cubing/puzzles/implementations/3x3x3/index.ts
var cube3x3x3 = {
  id: "3x3x3",
  fullName: "3\xD73\xD73 Cube",
  inventedBy: ["Ern\u0151 Rubik"],
  inventionYear: 1974,
  kpuzzle: getCached(async () => {
    return experimental3x3x3KPuzzle;
  }),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-3x3x3-QN5DUJUA.js")).cube3x3x3SVG;
  }),
  llSVG: getCached(async () => {
    return (await import("./puzzles-dynamic-3x3x3-QN5DUJUA.js")).cube3x3x3LLSVG;
  }),
  pg: getCached(async () => {
    return asyncGetPuzzleGeometry("3x3x3");
  }),
  stickeringMask: (stickering) => cubeLikeStickeringMask(cube3x3x3, stickering),
  stickerings: () => cubeLikeStickeringList("3x3x3"),
  puzzleSpecificSimplifyOptions: puzzleSpecificSimplifyOptions333
};

// src/cubing/puzzles/implementations/clock/index.ts
var clock = {
  id: "clock",
  fullName: "Clock",
  inventedBy: ["Christopher C. Wiggs", "Christopher J. Taylor"],
  inventionYear: 1988,
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).clockJSON
    )
  ),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).clockSVG;
  })
};

// src/cubing/puzzles/stickerings/fto-stickerings.ts
async function ftoStickering(puzzleLoader, stickering) {
  const kpuzzle = await puzzleLoader.kpuzzle();
  const puzzleStickering = new PuzzleStickering(kpuzzle);
  const m = new StickeringManager(kpuzzle);
  const experimentalFTO_FC = () => m.and([m.move("U"), m.not(m.or(m.moves(["F", "BL", "BR"])))]);
  const experimentalFTO_F2T = () => m.and([m.move("U"), m.not(m.move("F"))]);
  const experimentalFTO_SC = () => m.or([
    experimentalFTO_F2T(),
    m.and([m.move("F"), m.not(m.or(m.moves(["U", "BL", "BR"])))])
  ]);
  const experimentalFTO_L2C = () => m.not(
    m.or([
      m.and([m.move("U"), m.move("F")]),
      m.and([m.move("F"), m.move("BL")]),
      m.and([m.move("F"), m.move("BR")]),
      m.and([m.move("BL"), m.move("BR")])
    ])
  );
  const experimentalFTO_LBT = () => m.not(
    m.or([
      m.and([m.move("F"), m.move("BL")]),
      m.and([m.move("F"), m.move("BR")]),
      m.and([m.move("BL"), m.move("BR")])
    ])
  );
  switch (stickering) {
    case "full":
      break;
    case "experimental-fto-fc": {
      puzzleStickering.set(
        m.not(experimentalFTO_FC()),
        "Ignored" /* Ignored */
      );
      break;
    }
    case "experimental-fto-f2t": {
      puzzleStickering.set(
        m.not(experimentalFTO_F2T()),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(experimentalFTO_FC(), "Dim" /* Dim */);
      break;
    }
    case "experimental-fto-sc": {
      puzzleStickering.set(
        m.not(experimentalFTO_SC()),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(experimentalFTO_F2T(), "Dim" /* Dim */);
      break;
    }
    case "experimental-fto-l2c": {
      puzzleStickering.set(
        m.not(experimentalFTO_L2C()),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(experimentalFTO_SC(), "Dim" /* Dim */);
      break;
    }
    case "experimental-fto-lbt": {
      puzzleStickering.set(
        m.not(experimentalFTO_LBT()),
        "Ignored" /* Ignored */
      );
      puzzleStickering.set(experimentalFTO_L2C(), "Dim" /* Dim */);
      break;
    }
    case "experimental-fto-l3t": {
      puzzleStickering.set(experimentalFTO_LBT(), "Dim" /* Dim */);
      break;
    }
    default:
      console.warn(
        `Unsupported stickering for ${puzzleLoader.id}: ${stickering}. Setting all pieces to dim.`
      );
      puzzleStickering.set(m.and(m.moves([])), "Dim" /* Dim */);
  }
  return puzzleStickering.toStickeringMask();
}
async function ftoStickerings() {
  return [
    "full",
    "experimental-fto-fc",
    "experimental-fto-f2t",
    "experimental-fto-sc",
    "experimental-fto-l2c",
    "experimental-fto-lbt",
    "experimental-fto-l3t"
  ];
}

// src/cubing/puzzles/implementations/fto/index.ts
var FTOPuzzleLoader = class extends PGPuzzleLoader {
  constructor() {
    super({
      pgID: "FTO",
      id: "fto",
      fullName: "Face-Turning Octahedron",
      inventedBy: ["Karl Rohrbach", "David Pitcher"],
      inventionYear: 1983
    });
    this.stickerings = ftoStickerings;
    this.svg = getCached(async () => {
      return (await import("./puzzles-dynamic-unofficial-QXSDLTK5.js")).ftoSVG;
    });
  }
  stickeringMask(stickering) {
    return ftoStickering(this, stickering);
  }
};
var fto = new FTOPuzzleLoader();

// src/cubing/puzzles/stickerings/megaminx-stickerings.ts
async function megaminxStickeringMask(puzzleLoader, stickering) {
  if ((await megaminxStickerings()).includes(stickering)) {
    return cubeLikeStickeringMask(puzzleLoader, stickering);
  }
  console.warn(
    `Unsupported stickering for ${puzzleLoader.id}: ${stickering}. Setting all pieces to dim.`
  );
  return cubeLikeStickeringMask(puzzleLoader, "full");
}
var megaminxStickeringListPromise = from(
  () => cubeLikeStickeringList("megaminx")
);
function megaminxStickerings() {
  return megaminxStickeringListPromise;
}

// src/cubing/puzzles/implementations/megaminx/index.ts
var MegaminxPuzzleLoader = class extends PGPuzzleLoader {
  constructor() {
    super({
      id: "megaminx",
      fullName: "Megaminx",
      inventionYear: 1981
    });
    this.stickerings = megaminxStickerings;
    this.llSVG = getCached(async () => {
      return (await import("./puzzles-dynamic-megaminx-FUKAIAP5.js")).megaminxLLSVG;
    });
  }
  stickeringMask(stickering) {
    return megaminxStickeringMask(this, stickering);
  }
};
var megaminx = new MegaminxPuzzleLoader();

// src/cubing/puzzles/implementations/pyraminx/index.ts
var PyraminxPuzzleLoader = class extends PGPuzzleLoader {
  constructor() {
    super({
      id: "pyraminx",
      fullName: "Pyraminx",
      inventedBy: ["Uwe Meffert"]
    });
    this.svg = getCached(async () => {
      return (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).pyraminxSVG;
    });
  }
};
var pyraminx = new PyraminxPuzzleLoader();

// src/cubing/puzzles/implementations/square1/index.ts
var square1 = {
  id: "square1",
  fullName: "Square-1",
  inventedBy: ["Karel Hr\u0161el", "Vojtech Kopsk\xFD"],
  inventionYear: 1990,
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).sq1HyperOrbitJSON
    )
  ),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).sq1HyperOrbitSVG;
  })
};

// src/cubing/puzzles/implementations/kilominx/index.ts
var kilominx = {
  id: "kilominx",
  fullName: "Kilominx",
  kpuzzle: getCached(async () => {
    const pg = await asyncGetPuzzleGeometry("megaminx + chopasaurus");
    const kpuzzleDefinition = JSON.parse(
      JSON.stringify(pg.getKPuzzleDefinition(true))
    );
    delete kpuzzleDefinition.orbits.CENTERS;
    delete kpuzzleDefinition.orbits.CENTERS2;
    delete kpuzzleDefinition.startStateData.CENTERS;
    delete kpuzzleDefinition.startStateData.CENTERS2;
    for (const moveDefinition of Object.values(kpuzzleDefinition.moves)) {
      delete moveDefinition.CENTERS;
      delete moveDefinition.CENTERS2;
    }
    kpuzzleDefinition.name = "kilominx";
    delete kpuzzleDefinition.experimentalPuzzleDescription;
    const puzzleGeometry = await import("./puzzle-geometry/index.js");
    const pgNotation = new puzzleGeometry.ExperimentalPGNotation(
      pg,
      pg.getOrbitsDef(true)
    );
    const kpuzzle = new KPuzzle(kpuzzleDefinition, {
      experimentalPGNotation: {
        lookupMove: (move) => {
          if (move.toString() === "x2" || move.toString() === "x2'") {
            return x2Transformation.transformationData;
          }
          return pgNotation.lookupMove(move);
        }
      }
    });
    const x2Transformation = kpuzzle.algToTransformation("Rv2 Fv Uv'");
    kpuzzleDefinition.moves["x2"] = x2Transformation;
    return kpuzzle;
  }),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-unofficial-QXSDLTK5.js")).kilominxSVG;
  })
};

// src/cubing/puzzles/implementations/redi-cube/index.ts
var rediCube = {
  id: "redi_cube",
  fullName: "Redi Cube",
  inventedBy: ["Oskar van Deventer"],
  inventionYear: 2009,
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-unofficial-QXSDLTK5.js")).rediCubeJSON
    )
  ),
  svg: async () => {
    return (await import("./puzzles-dynamic-unofficial-QXSDLTK5.js")).rediCubeSVG;
  }
};

// src/cubing/puzzles/implementations/4x4x4/index.ts
var cube4x4x4 = new CubePGPuzzleLoader({
  id: "4x4x4",
  fullName: "4\xD74\xD74 Cube"
});
cube4x4x4.llSVG = getCached(async () => {
  return (await import("./puzzles-dynamic-4x4x4-DT42HVIY.js")).cube4x4x4LLSVG;
});

// src/cubing/puzzles/implementations/melindas2x2x2x2/index.ts
var melindas2x2x2x2 = {
  id: "melindas2x2x2x2",
  fullName: "Melinda's 2\xD72\xD72\xD72",
  inventedBy: ["Melinda Green"],
  kpuzzle: getCached(
    async () => new KPuzzle(
      (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).melindas2x2x2x2OrbitJSON
    )
  ),
  svg: getCached(async () => {
    return (await import("./puzzles-dynamic-side-events-FCWYXIA7.js")).melindas2x2x2x2OrbitSVG;
  })
};

// src/cubing/puzzles/index.ts
var puzzles = {
  "3x3x3": cube3x3x3,
  "2x2x2": cube2x2x2,
  "4x4x4": cube4x4x4,
  "5x5x5": new CubePGPuzzleLoader({ id: "5x5x5", fullName: "5\xD75\xD75 Cube" }),
  "6x6x6": new CubePGPuzzleLoader({ id: "6x6x6", fullName: "6\xD76\xD76 Cube" }),
  "7x7x7": new CubePGPuzzleLoader({ id: "7x7x7", fullName: "7\xD77\xD77 Cube" }),
  "40x40x40": new CubePGPuzzleLoader({
    id: "40x40x40",
    fullName: "40\xD740\xD740 Cube"
  }),
  clock,
  megaminx,
  pyraminx,
  skewb: new PGPuzzleLoader({
    id: "skewb",
    fullName: "Skewb",
    inventedBy: ["Tony Durham"]
  }),
  square1,
  fto,
  gigaminx: new PGPuzzleLoader({
    id: "gigaminx",
    fullName: "Gigaminx",
    inventedBy: ["Tyler Fox"],
    inventionYear: 2006
  }),
  master_tetraminx: new PGPuzzleLoader({
    pgID: "master tetraminx",
    id: "master_tetraminx",
    fullName: "Master Tetraminx",
    inventedBy: ["Katsuhiko Okamoto"],
    inventionYear: 2002
  }),
  kilominx,
  redi_cube: rediCube,
  melindas2x2x2x2
};

export {
  wcaEvents,
  wcaEventInfo,
  twizzleEvents,
  eventInfo,
  cube2x2x2,
  cube3x3x3,
  puzzles
};
//# sourceMappingURL=chunk-XUDPTWYN.js.map
