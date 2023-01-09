import {
  TraversalUp,
  functionFromTraversal
} from "./chunk-VZP3KFTU.js";

// src/cubing/notation/CountMoves.ts
var CountMoves = class extends TraversalUp {
  constructor(metric) {
    super();
    this.metric = metric;
  }
  traverseAlg(alg) {
    let r = 0;
    for (const algNode of alg.childAlgNodes()) {
      r += this.traverseAlgNode(algNode);
    }
    return r;
  }
  traverseGrouping(grouping) {
    const alg = grouping.alg;
    return this.traverseAlg(alg) * Math.abs(grouping.amount);
  }
  traverseMove(move) {
    return this.metric(move);
  }
  traverseCommutator(commutator) {
    return 2 * (this.traverseAlg(commutator.A) + this.traverseAlg(commutator.B));
  }
  traverseConjugate(conjugate) {
    return 2 * this.traverseAlg(conjugate.A) + this.traverseAlg(conjugate.B);
  }
  traversePause(_pause) {
    return 0;
  }
  traverseNewline(_newLine) {
    return 0;
  }
  traverseLineComment(_comment) {
    return 0;
  }
};
function isCharUppercase(c) {
  return "A" <= c && c <= "Z";
}
function baseMetric(move) {
  const fam = move.family;
  if (isCharUppercase(fam[0]) && fam[fam.length - 1] === "v" || fam === "x" || fam === "y" || fam === "z" || fam === "T") {
    return 0;
  } else {
    return 1;
  }
}
function etmMetric(_move) {
  return 1;
}
function quantumMetric(move) {
  const fam = move.family;
  if (isCharUppercase(fam[0]) && fam[fam.length - 1] === "v" || fam === "x" || fam === "y" || fam === "z" || fam === "T") {
    return 0;
  } else {
    return Math.abs(move.amount);
  }
}
var countMoves = functionFromTraversal(CountMoves, [baseMetric]);
var countMovesETM = functionFromTraversal(CountMoves, [etmMetric]);
var countQuantumMoves = functionFromTraversal(CountMoves, [
  quantumMetric
]);

// src/cubing/notation/CountAnimatedLeaves.ts
var CountAnimatedLeaves = class extends TraversalUp {
  traverseAlg(alg) {
    let total = 0;
    for (const part of alg.childAlgNodes()) {
      total += this.traverseAlgNode(part);
    }
    return total;
  }
  traverseGrouping(grouping) {
    return this.traverseAlg(grouping.alg) * Math.abs(grouping.amount);
  }
  traverseMove(_move) {
    return 1;
  }
  traverseCommutator(commutator) {
    return 2 * (this.traverseAlg(commutator.A) + this.traverseAlg(commutator.B));
  }
  traverseConjugate(conjugate) {
    return 2 * this.traverseAlg(conjugate.A) + this.traverseAlg(conjugate.B);
  }
  traversePause(_pause) {
    return 1;
  }
  traverseNewline(_newline) {
    return 0;
  }
  traverseLineComment(_comment) {
    return 0;
  }
};
var countAnimatedLeaves = functionFromTraversal(CountAnimatedLeaves);

export {
  countMoves,
  countMovesETM,
  countQuantumMoves,
  countAnimatedLeaves
};
//# sourceMappingURL=chunk-IN66QSRW.js.map
