import { A as AlgIndexer, T as Timestamp, D as Duration, S as StickeringMask } from '../TwizzleLink-9873b9f1.js';
export { A as AlgIndexer, B as BackViewLayout, N as EXPERIMENTAL_PROP_NO_VALUE, M as ExperimentalMillisecondTimestamp, E as ExperimentalStickering, P as PuzzleID, d as TwistyAlgEditor, c as TwistyAlgViewer, b as TwistyPlayer, e as TwistyPlayerConfig, g as TwizzleLink, V as VisualizationFormat, f as backViewLayouts } from '../TwizzleLink-9873b9f1.js';
import { a as Alg, M as Move } from '../Alg-c6770822.js';
import { a as KPuzzle, K as KState, e as KTransformation } from '../KState-fa1880c8.js';
import 'three';
import '../parseAlg-d2c83795.js';

declare const twistyDebugGlobals: {
    shareAllNewRenderers: "auto" | "always" | "never";
    showRenderStats: boolean;
};
declare function setTwistyDebug(options: Partial<typeof twistyDebugGlobals>): void;

declare class SimpleAlgIndexer implements AlgIndexer {
    private kpuzzle;
    private moves;
    private durationFn;
    constructor(kpuzzle: KPuzzle, alg: Alg);
    getAnimLeaf(index: number): Move;
    indexToMoveStartTimestamp(index: number): Timestamp;
    timestampToIndex(timestamp: Timestamp): number;
    stateAtIndex(index: number): KState;
    transformationAtIndex(index: number): KTransformation;
    algDuration(): Duration;
    numAnimatedLeaves(): number;
    moveDuration(index: number): number;
}

declare class TreeAlgIndexer implements AlgIndexer {
    private kpuzzle;
    private decoration;
    private walker;
    constructor(kpuzzle: KPuzzle, alg: Alg);
    getAnimLeaf(index: number): Move | null;
    indexToMoveStartTimestamp(index: number): Timestamp;
    indexToMovesInProgress(index: number): Timestamp;
    stateAtIndex(index: number, startState?: KState): KState;
    transformationAtIndex(index: number): KTransformation;
    numAnimatedLeaves(): number;
    timestampToIndex(timestamp: Timestamp): number;
    algDuration(): Duration;
    moveDuration(index: number): number;
}

declare class KPuzzleSVGWrapper {
    kpuzzle: KPuzzle;
    wrapperElement: HTMLElement;
    svgElement: SVGElement;
    gradientDefs: SVGDefsElement;
    private originalColors;
    private gradients;
    private svgID;
    constructor(kpuzzle: KPuzzle, svgSource: string, experimentalStickeringMask?: StickeringMask);
    drawState(state: KState, nextState?: KState, fraction?: number): void;
    draw(state: KState, nextState?: KState, fraction?: number): void;
    private newGradient;
    private elementID;
    private elementByID;
}

export { KPuzzleSVGWrapper as ExperimentalKPuzzleSVGWrapper, SimpleAlgIndexer, TreeAlgIndexer, setTwistyDebug };
