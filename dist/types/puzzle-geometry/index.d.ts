import { P as Perm } from '../KState-fa1880c8.js';
export { u as EXPERIMENTAL_PUZZLE_BASE_SHAPES, s as EXPERIMENTAL_PUZZLE_CUT_TYPES, o as ExperimentalPGNotation, v as ExperimentalPuzzleBaseShape, q as ExperimentalPuzzleCutDescription, t as ExperimentalPuzzleCutType, r as ExperimentalPuzzleDescription, j as PuzzleGeometry, Q as Quat, S as StickerDat, k as StickerDatAxis, l as StickerDatFace, m as StickerDatSticker, i as getPG3DNamedPuzzles, g as getPuzzleDescriptionString, f as getPuzzleGeometryByDesc, h as getPuzzleGeometryByName, n as parseOptions, p as parsePuzzleDescription } from '../KState-fa1880c8.js';
import '../Alg-c6770822.js';

declare function schreierSims(g: Perm[], disp: (s: string) => void): bigint;

export { schreierSims };
