import {
  experimental3x3x3KPuzzle,
  normalize3x3x3Orientation,
  puzzleOrientation3x3x3Cache,
  puzzleOrientation3x3x3Idx
} from "./chunk-AJS6B74K.js";
import {
  KState
} from "./chunk-KLI2E737.js";

// src/cubing/protocol/binary/orbit-indexing.ts
function identityPermutation(numElems) {
  const arr = new Array(numElems);
  for (let i = 0; i < numElems; i++) {
    arr[i] = i;
  }
  return arr;
}
function orientationsToMask(radix, orientations) {
  let val = 0;
  for (const orientation of orientations) {
    val *= radix;
    val += orientation;
  }
  return val;
}
function maskToOrientations(radix, numElems, mask) {
  const arr = [];
  while (mask > 0) {
    arr.push(mask % radix);
    mask = Math.floor(mask / radix);
  }
  return new Array(numElems - arr.length).fill(0).concat(arr.reverse());
}
function permutationToLex(permutation) {
  const n = permutation.length;
  let lexicographicIdx = 0;
  for (let i = 0; i < n - 1; i++) {
    lexicographicIdx = lexicographicIdx * (n - i);
    for (let j = i + 1; j < n; j++) {
      if (permutation[i] > permutation[j]) {
        lexicographicIdx += 1;
      }
    }
  }
  return lexicographicIdx;
}
function lexToPermutation(numPieces, lexicographicIdx) {
  const permutation = new Array(numPieces);
  permutation[numPieces - 1] = 0;
  for (let i = numPieces - 2; i >= 0; i--) {
    permutation[i] = lexicographicIdx % (numPieces - i);
    lexicographicIdx = Math.floor(lexicographicIdx / (numPieces - i));
    for (let j = i + 1; j < numPieces; j++) {
      if (permutation[j] >= permutation[i]) {
        permutation[j] = permutation[j] + 1;
      }
    }
  }
  return permutation;
}

// src/cubing/protocol/binary/binary3x3x3.ts
function reorientPuzzle(state, idxU, idxL) {
  return state.applyTransformation(
    puzzleOrientation3x3x3Cache()[idxU][idxL].invert()
  );
}
var BIT_LENGTHS = [29, 12, 16, 13, 3, 2, 1, 12];
function arraySum(arr) {
  let total = 0;
  for (const entry of arr) {
    total += entry;
  }
  return total;
}
function splitBinary(bitLengths, buffy) {
  const u8buffy = new Uint8Array(buffy);
  let at = 0;
  let bits = 0;
  let accum = 0;
  const values = [];
  for (const bitLength of bitLengths) {
    while (bits < bitLength) {
      accum = accum << 8 | u8buffy[at++];
      bits += 8;
    }
    values.push(accum >> bits - bitLength & (1 << bitLength) - 1);
    bits -= bitLength;
  }
  return values;
}
function concatBinary(bitLengths, values) {
  const buffy = new Uint8Array(Math.ceil(arraySum(bitLengths) / 8));
  let at = 0;
  let bits = 0;
  let accum = 0;
  for (let i = 0; i < bitLengths.length; i++) {
    accum = accum << bitLengths[i] | values[i];
    bits += bitLengths[i];
    while (bits >= 8) {
      buffy[at++] = accum >> bits - 8;
      bits -= 8;
    }
  }
  if (bits > 0) {
    buffy[at++] = accum << 8 - bits;
  }
  return buffy;
}
function supportsPuzzleOrientation(components) {
  return components.poIdxU !== 7;
}
function reid3x3x3ToBinaryComponents(state) {
  const normedState = normalize3x3x3Orientation(state);
  const epLex = permutationToLex(normedState.stateData["EDGES"].pieces);
  const eoMask = orientationsToMask(
    2,
    normedState.stateData["EDGES"].orientation
  );
  const cpLex = permutationToLex(normedState.stateData["CORNERS"].pieces);
  const coMask = orientationsToMask(
    3,
    normedState.stateData["CORNERS"].orientation
  );
  const [poIdxU, poIdxL] = puzzleOrientation3x3x3Idx(state);
  const moSupport = 1;
  const moMask = orientationsToMask(
    4,
    normedState.stateData["CENTERS"].orientation
  );
  return {
    epLex,
    eoMask,
    cpLex,
    coMask,
    poIdxU,
    poIdxL,
    moSupport,
    moMask
  };
}
function binaryComponentsToTwizzleBinary(components) {
  const { epLex, eoMask, cpLex, coMask, poIdxU, poIdxL, moSupport, moMask } = components;
  return concatBinary(BIT_LENGTHS, [
    epLex,
    eoMask,
    cpLex,
    coMask,
    poIdxU,
    poIdxL,
    moSupport,
    moMask
  ]);
}
function reid3x3x3ToTwizzleBinary(state) {
  const components = reid3x3x3ToBinaryComponents(state);
  return binaryComponentsToTwizzleBinary(components);
}
function twizzleBinaryToBinaryComponents(buffer) {
  const [epLex, eoMask, cpLex, coMask, poIdxU, poIdxL, moSupport, moMask] = splitBinary(BIT_LENGTHS, buffer);
  return {
    epLex,
    eoMask,
    cpLex,
    coMask,
    poIdxU,
    poIdxL,
    moSupport,
    moMask
  };
}
function binaryComponentsToReid3x3x3(components) {
  if (components.moSupport !== 1) {
    throw new Error("Must support center orientation.");
  }
  const normedState = new KState(experimental3x3x3KPuzzle, {
    EDGES: {
      pieces: lexToPermutation(12, components.epLex),
      orientation: maskToOrientations(2, 12, components.eoMask)
    },
    CORNERS: {
      pieces: lexToPermutation(8, components.cpLex),
      orientation: maskToOrientations(3, 8, components.coMask)
    },
    CENTERS: {
      pieces: identityPermutation(6),
      orientation: maskToOrientations(4, 6, components.moMask)
    }
  });
  if (!supportsPuzzleOrientation(components)) {
    return normedState;
  }
  return reorientPuzzle(normedState, components.poIdxU, components.poIdxL);
}
function validateComponents(components) {
  const errors = [];
  if (components.epLex < 0 || components.epLex >= 479001600) {
    errors.push(`epLex (${components.epLex}) out of range`);
  }
  if (components.cpLex < 0 || components.cpLex >= 40320) {
    errors.push(`cpLex (${components.cpLex}) out of range`);
  }
  if (components.coMask < 0 || components.coMask >= 6561) {
    errors.push(`coMask (${components.coMask}) out of range`);
  }
  if (components.poIdxU < 0 || components.poIdxU >= 6) {
    if (supportsPuzzleOrientation(components)) {
      errors.push(`poIdxU (${components.poIdxU}) out of range`);
    }
  }
  if (components.eoMask < 0 || components.eoMask >= 4096) {
    errors.push(`eoMask (${components.eoMask}) out of range`);
  }
  if (components.moMask < 0 || components.moMask >= 4096) {
    errors.push(`moMask (${components.moMask}) out of range`);
  }
  if (components.poIdxL < 0 || components.poIdxL >= 4) {
    errors.push(`poIdxL (${components.poIdxL}) out of range`);
  }
  if (components.moSupport < 0 || components.moSupport >= 2) {
    errors.push(`moSupport (${components.moSupport}) out of range`);
  }
  return errors;
}
function twizzleBinaryToReid3x3x3(buffy) {
  const components = twizzleBinaryToBinaryComponents(buffy);
  const errors = validateComponents(components);
  if (errors.length !== 0) {
    throw new Error(`Invalid binary state components: ${errors.join(", ")}`);
  }
  return binaryComponentsToReid3x3x3(components);
}

// src/cubing/protocol/binary/hex.ts
function bufferToSpacedHex(buffer) {
  return Array.prototype.map.call(
    new Uint8Array(buffer),
    (x) => `00${x.toString(16)}`.slice(-2)
  ).join(" ");
}
function spacedHexToBuffer(hex) {
  return new Uint8Array(hex.split(" ").map((c) => parseInt(c, 16)));
}

export {
  reid3x3x3ToTwizzleBinary,
  twizzleBinaryToBinaryComponents,
  binaryComponentsToReid3x3x3,
  twizzleBinaryToReid3x3x3,
  bufferToSpacedHex,
  spacedHexToBuffer
};
//# sourceMappingURL=chunk-R4DWRDGD.js.map
