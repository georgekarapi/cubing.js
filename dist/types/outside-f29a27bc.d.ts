import { a as Alg } from './Alg-c6770822.js';
import { K as KState, a as KPuzzle } from './KState-fa1880c8.js';

declare enum PrefetchLevel {
    Auto = "auto",
    None = "none",
    Immediate = "immediate"
}

declare function randomScrambleForEvent(eventID: string): Promise<Alg>;
declare function experimentalSolve3x3x3IgnoringCenters(state: KState): Promise<Alg>;
declare function experimentalSolve2x2x2(state: KState): Promise<Alg>;
declare function solveSkewb(state: KState): Promise<Alg>;
declare function solvePyraminx(state: KState): Promise<Alg>;
declare function solveMegaminx(state: KState): Promise<Alg>;
declare function solveTwsearch(kpuzzle: KPuzzle, state: KState, options?: {
    moveSubset?: string[];
    startState?: KState;
    minDepth?: number;
}): Promise<Alg>;
interface SearchOutsideDebugGlobals {
    logPerf: boolean;
    scramblePrefetchLevel: `${PrefetchLevel}`;
    forceStringWorker: boolean;
    disableStringWorker: boolean;
    forceNewWorkerForEveryScramble: boolean;
}
declare function setDebug(options: Partial<SearchOutsideDebugGlobals>): void;

export { experimentalSolve2x2x2 as a, solvePyraminx as b, solveMegaminx as c, setDebug as d, experimentalSolve3x3x3IgnoringCenters as e, solveTwsearch as f, randomScrambleForEvent as r, solveSkewb as s };
