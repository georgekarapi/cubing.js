// script/test/src/internal-import-restrictions/target-infos.js
var targetInfos = {
  alg: {
    deps: {
      direct: [],
      dynamic: []
    }
  },
  bluetooth: {
    deps: {
      direct: ["alg", "kpuzzle", "protocol", "puzzles"],
      dynamic: []
    }
  },
  kpuzzle: {
    deps: {
      direct: ["alg"],
      dynamic: []
    }
  },
  notation: {
    deps: {
      direct: ["alg"],
      dynamic: []
    }
  },
  protocol: {
    deps: {
      direct: ["alg", "kpuzzle", "puzzles"],
      dynamic: []
    }
  },
  "puzzle-geometry": {
    deps: {
      direct: ["alg"],
      dynamic: []
    }
  },
  puzzles: {
    deps: {
      direct: ["alg", "kpuzzle"],
      dynamic: ["puzzle-geometry"]
    }
  },
  scramble: {
    deps: {
      direct: ["alg", "search"],
      dynamic: []
    }
  },
  search: {
    deps: {
      direct: ["alg", "kpuzzle", "notation", "puzzles"],
      dynamic: ["puzzle-geometry"]
    }
  },
  stream: {
    deps: {
      direct: ["alg"],
      dynamic: []
    }
  },
  twisty: {
    deps: {
      direct: ["alg", "kpuzzle", "notation", "puzzles"],
      dynamic: ["puzzle-geometry"]
    }
  }
};
var targetNames = Object.keys(targetInfos);

// src/bin/import-restrictions-mermaid-diagram.ts
console.log("graph BT");
for (const [target, targetInfo] of Object.entries(targetInfos)) {
  for (const direct of targetInfo.deps.direct) {
    console.log(`  ${target} --> ${direct}`);
  }
  for (const dynamic of targetInfo.deps.dynamic) {
    console.log(`  ${target} -.-> ${dynamic}`);
  }
}
console.log("%% Paste into: https://mermaid.live/");
