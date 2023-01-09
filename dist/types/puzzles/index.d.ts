import { P as PuzzleID, a as PuzzleLoader } from '../TwizzleLink-9873b9f1.js';
export { a as PuzzleLoader } from '../TwizzleLink-9873b9f1.js';
import 'three';
import '../Alg-c6770822.js';
import '../parseAlg-d2c83795.js';
import '../KState-fa1880c8.js';

interface EventInfo {
    puzzleID: PuzzleID;
    eventName: string;
}
declare const wcaEvents: Record<string, EventInfo>;
/** @category Event Info */
declare function wcaEventInfo(event: string): EventInfo | null;
declare const twizzleEvents: Record<string, EventInfo>;
/** @category Event Info */
declare function eventInfo(event: string): EventInfo | null;

/** @category Specific Puzzles */
declare const cube2x2x2: PuzzleLoader;

/** @category Specific Puzzles */
declare const cube3x3x3: PuzzleLoader;

/** @category All Puzzles */
declare const puzzles: Record<string, PuzzleLoader>;

export { cube2x2x2, cube3x3x3, eventInfo, puzzles, twizzleEvents, wcaEventInfo, wcaEvents };
