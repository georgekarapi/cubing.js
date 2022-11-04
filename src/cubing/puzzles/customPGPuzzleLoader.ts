import { Move, PuzzleSpecificSimplifyOptions, QuantumMove } from "../alg";
import { KPuzzle, KPuzzleDefinition } from "../kpuzzle";
import type { PuzzleGeometry } from "../puzzle-geometry";
import type { PuzzleDescriptionString } from "../puzzle-geometry/PGPuzzles";
import { PLazy } from "../vendor/p-lazy/p-lazy";
import type { PuzzleLoader } from "./PuzzleLoader";

// TODO: modify this to handle TwistyPlayer options
export async function descAsyncGetPuzzleGeometry(
  desc: PuzzleDescriptionString,
): Promise<PuzzleGeometry> {
  const puzzleGeometry = await import("../puzzle-geometry");
  return puzzleGeometry.getPuzzleGeometryByDesc(desc, {
    allMoves: true,
    orientCenters: true,
    addRotations: true,
  });
}

// TODO: dedup with `cubing/puzzles`
export async function asyncGetKPuzzle(
  desc: PuzzleDescriptionString,
): Promise<KPuzzle> {
  const pg = await descAsyncGetPuzzleGeometry(desc);
  const kpuzzleDefinition: KPuzzleDefinition = pg.getKPuzzleDefinition(true);
  kpuzzleDefinition.name = `description: ${desc}`;
  const puzzleGeometry = await import("../puzzle-geometry");
  const pgNotation = new puzzleGeometry.ExperimentalPGNotation(
    pg,
    pg.getOrbitsDef(true),
  );
  return new KPuzzle(kpuzzleDefinition, {
    experimentalPGNotation: pgNotation,
  });
}

// TODO: Can we avoid relying on IDs to deduplicate work at higher levels?
let nextCustomID = 1;

export function customPGPuzzleLoader(
  desc: PuzzleDescriptionString,
  info?: {
    fullName?: string;
    inventedBy?: string[];
    inventionYear?: number;
  },
): PuzzleLoader {
  const customID = nextCustomID++;
  let cachedKPuzzle: Promise<KPuzzle> | null = null;
  const kpuzzlePromise = async () => {
    return (cachedKPuzzle ??= asyncGetKPuzzle(desc));
  };
  const puzzleLoader: PuzzleLoader = {
    id: `custom-${customID}`,
    fullName: info?.fullName ?? `Custom Puzzle (instance #${customID})`,
    kpuzzle: kpuzzlePromise,
    svg: async () => {
      const pg = await descAsyncGetPuzzleGeometry(desc);
      return pg.generatesvg();
    },
    pg: async () => {
      return descAsyncGetPuzzleGeometry(desc);
    },
    puzzleSpecificSimplifyOptionsPromise: new PLazy(
      async (resolve: (options: PuzzleSpecificSimplifyOptions) => void) => {
        const kpuzzle = await kpuzzlePromise();
        resolve({
          quantumMoveOrder: (m: QuantumMove) => {
            return kpuzzle.moveToTransformation(new Move(m)).repetitionOrder();
          },
        });
      },
    ),
  };
  if (info?.inventedBy) {
    puzzleLoader.inventedBy = info.inventedBy;
  }
  if (info?.inventionYear) {
    puzzleLoader.inventionYear = info.inventionYear;
  }
  return puzzleLoader;
}
