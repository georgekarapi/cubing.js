import { M as Move, a as Alg } from './Alg-c6770822.js';

type KTransformationData = Record<string, KTransformationOrbitData>;
interface KTransformationOrbitData {
    permutation: number[];
    orientation: number[];
}
type KStateData = Record<string, KStateOrbitData>;
interface KStateOrbitData {
    pieces: number[];
    orientation: number[];
}
interface KOrbitDefinition {
    numPieces: number;
    numOrientations: number;
}
interface KPuzzleDefinition {
    name: string;
    orbits: Record<string, KOrbitDefinition>;
    startStateData: KStateData;
    moves: Record<string, KTransformationData>;
    experimentalDerivedMoves?: Record<string, string>;
    experimentalIsStateSolved?: (kstate: KState, options: {
        ignorePuzzleOrientation: boolean;
        ignoreCenterOrientation: boolean;
    }) => boolean;
}

declare class KTransformation {
    #private;
    readonly kpuzzle: KPuzzle;
    readonly transformationData: KTransformationData;
    constructor(kpuzzle: KPuzzle, transformationData: KTransformationData);
    toJSON(): any;
    invert(): KTransformation;
    isIdentityTransformation(): boolean;
    /** @deprecated */
    static experimentalConstructIdentity(kpuzzle: KPuzzle): KTransformation;
    isIdentical(t2: KTransformation): boolean;
    /** @deprecated */
    apply(source: KTransformationSource): KTransformation;
    applyTransformation(t2: KTransformation): KTransformation;
    applyMove(move: Move | string): KTransformation;
    applyAlg(alg: Alg | string): KTransformation;
    toKState(): KState;
    repetitionOrder(): number;
    selfMultiply(amount: number): KTransformation;
}

interface NotationMapper {
    notationToInternal(move: Move): Move | null;
    notationToExternal(move: Move): Move | null;
}

declare function parseOptions(argv: string[]): {
    puzzleDescription: PuzzleDescription | null;
    options: PuzzleGeometryOptions;
};
type FaceName = string;
type OrientationDirection = [number, number, number];
type FaceBasedOrientationDescription = [
    [
        FaceName,
        OrientationDirection
    ],
    [
        FaceName,
        OrientationDirection
    ]
];
type BaseFaceCount = 4 | 6 | 8 | 12 | 20;
type FaceBasedOrientationDescriptionLookup = Record<BaseFaceCount, FaceBasedOrientationDescription>;
declare class PuzzleGeometryFullOptions {
    verbosity: number;
    allMoves: boolean;
    outerBlockMoves: boolean;
    vertexMoves: boolean;
    addRotations: boolean;
    moveList: string[] | null;
    fixedOrientation: boolean;
    fixedPieceType: null | "e" | "v" | "f";
    orientCenters: boolean;
    includeCornerOrbits: boolean;
    includeCenterOrbits: boolean;
    includeEdgeOrbits: boolean;
    excludeOrbits: string[];
    optimizeOrbits: boolean;
    grayCorners: boolean;
    grayCenters: boolean;
    grayEdges: boolean;
    puzzleOrientation: FaceBasedOrientationDescription | null;
    puzzleOrientations: FaceBasedOrientationDescriptionLookup | null;
    scrambleAmount: number;
    constructor(options?: PuzzleGeometryOptions);
}
type PuzzleGeometryOptions = Partial<PuzzleGeometryFullOptions>;

declare class Perm {
    n: number;
    p: number[];
    constructor(a: number[]);
    toString(): string;
    mul(p2: Perm): Perm;
    rmul(p2: Perm): Perm;
    inv(): Perm;
    compareTo(p2: Perm): number;
    toGap(): string;
    order(): number;
}

declare class PGOrbitDef {
    size: number;
    mod: number;
    constructor(size: number, mod: number);
    reassemblySize(): bigint;
}
declare class PGOrbitsDef {
    orbitnames: string[];
    private orbitdefs;
    solved: VisibleState;
    movenames: string[];
    moveops: PGTransform[];
    isRotation: boolean[];
    forcenames: boolean[];
    constructor(orbitnames: string[], orbitdefs: PGOrbitDef[], solved: VisibleState, movenames: string[], moveops: PGTransform[], isRotation: boolean[], forcenames: boolean[]);
    transformToKTransformationData(t: PGTransform): KTransformationData;
    static transformToKTransformationData(orbitnames: string[], t: PGTransform): KTransformationData;
    private describeSet;
    toKsolve(name: string, mapper?: NotationMapper): string[];
    toKPuzzleDefinition(includemoves: boolean): KPuzzleDefinition;
    optimize(): PGOrbitsDef;
    scramble(n: number): void;
    getScrambleTransformation(n: number): PGTransform;
    reassemblySize(): bigint;
}
declare class PGOrbit {
    perm: number[];
    ori: number[];
    orimod: number;
    private static kcache;
    static e(n: number, mod: number): PGOrbit;
    constructor(perm: number[], ori: number[], orimod: number);
    mul(b: PGOrbit): PGOrbit;
    inv(): PGOrbit;
    equal(b: PGOrbit): boolean;
    killOri(): this;
    toPerm(): Perm;
    identicalPieces(): number[][];
    order(): number;
    isIdentity(): boolean;
    private zeroOris;
    remap(no: number[], on: number[], nv: number): PGOrbit;
    remapVS(no: number[], nv: number): PGOrbit;
    appendDefinition(result: string[], name: string, useVS: boolean, concise?: boolean): void;
    toKPuzzle(): Record<string, number[]>;
}
declare class PGTransformBase {
    orbits: PGOrbit[];
    constructor(orbits: PGOrbit[]);
    internalMul(b: PGTransformBase): PGOrbit[];
    protected internalInv(): PGOrbit[];
    equal(b: PGTransformBase): boolean;
    protected killOri(): this;
    toPerm(): Perm;
    identicalPieces(): number[][];
    order(): number;
}
declare class PGTransform extends PGTransformBase {
    constructor(orbits: PGOrbit[]);
    mul(b: PGTransform): PGTransform;
    mulScalar(n: number): PGTransform;
    inv(): PGTransform;
    e(): PGTransform;
}
declare class VisibleState extends PGTransformBase {
    constructor(orbits: PGOrbit[]);
    mul(b: PGTransform): VisibleState;
}

type PuzzleDescriptionString = string;
declare const PGPuzzles: {
    [name: string]: PuzzleDescriptionString;
};
type PuzzleName = keyof typeof PGPuzzles;

declare class Quat {
    a: number;
    b: number;
    c: number;
    d: number;
    constructor(a: number, b: number, c: number, d: number);
    mul(q: Quat): Quat;
    toString(): string;
    dist(q: Quat): number;
    len(): number;
    cross(q: Quat): Quat;
    dot(q: Quat): number;
    normalize(): Quat;
    makenormal(): Quat;
    normalizeplane(): Quat;
    smul(m: number): Quat;
    sum(q: Quat): Quat;
    sub(q: Quat): Quat;
    angle(): number;
    invrot(): Quat;
    det3x3(a00: number, a01: number, a02: number, a10: number, a11: number, a12: number, a20: number, a21: number, a22: number): number;
    rotateplane(q: Quat): Quat;
    orthogonal(): Quat;
    pointrotation(b: Quat): Quat;
    unproject(b: Quat): Quat;
    rotatepoint(q: Quat): Quat;
    rotateface(face: Quat[]): Quat[];
    intersect3(p2: Quat, p3: Quat): Quat | false;
    side(x: number): number;
    /**
     * Cuts a face by this plane, or returns null if there
     * is no intersection.
     * @param face The face to cut.
     */
    cutface(face: Quat[]): Quat[][] | null;
    cutfaces(faces: Quat[][]): Quat[][];
    faceside(face: Quat[]): number;
    sameplane(p: Quat): boolean;
    makecut(r: number): Quat;
}

interface TextureMapper {
    getuv(fn: number, threed: number[]): number[];
}
interface StickerDatSticker {
    coords: number[];
    color: string;
    orbit: string;
    ord: number;
    ori: number;
    face: number;
    isDup?: boolean;
}
interface StickerDatFace {
    coords: number[];
    name: string;
}
type StickerDatAxis = {
    coordinates: number[];
    quantumMove: Move;
    order: number;
};
interface StickerDat {
    stickers: StickerDatSticker[];
    faces: StickerDatFace[];
    axis: StickerDatAxis[];
    unswizzle(mv: Move): Move | null;
    notationMapper: NotationMapper;
    textureMapper: TextureMapper;
}
declare function getPG3DNamedPuzzles(): {
    [s: string]: PuzzleDescriptionString;
};
declare function getPuzzleDescriptionString(puzzleName: PuzzleName): PuzzleDescriptionString;
declare const PUZZLE_BASE_SHAPES: readonly ["c", "t", "o", "d", "i"];
type PuzzleBaseShape = typeof PUZZLE_BASE_SHAPES[number];
declare const PUZZLE_CUT_TYPES: readonly ["f", "v", "e"];
type PuzzleCutType = typeof PUZZLE_CUT_TYPES[number];
type PuzzleCutDescription = {
    cutType: PuzzleCutType;
    distance: number;
};
type PuzzleDescription = {
    shape: PuzzleBaseShape;
    cuts: PuzzleCutDescription[];
};
declare function parsePuzzleDescription(s: PuzzleDescriptionString): PuzzleDescription | null;
declare function getPuzzleGeometryByDesc(desc: string, options?: PuzzleGeometryOptions): PuzzleGeometry;
declare function getPuzzleGeometryByName(puzzleName: PuzzleName, options?: PuzzleGeometryOptions): PuzzleGeometry;
/** @category PuzzleGeometry */
declare class PuzzleGeometry {
    puzzleDescription: PuzzleDescription;
    private rotations;
    baseplanerot: Quat[];
    private baseplanes;
    private facenames;
    private faceplanes;
    private edgenames;
    private vertexnames;
    private geonormals;
    private moveplanes;
    private moveplanes2;
    moveplanesets: Quat[][];
    private moveplanenormals;
    movesetorders: number[];
    movesetgeos: [string, string, string, string, number][];
    private basefaces;
    private faces;
    private facecentermass;
    private baseFaceCount;
    stickersperface: number;
    shortedge: number;
    private markedface;
    cubies: number[][];
    private vertexdistance;
    private edgedistance;
    private facetocubie;
    private facetoord;
    private moverotations;
    private facelisthash;
    private cubiesetnames;
    private cubieords;
    private cubiesetnums;
    private cubieordnums;
    private orbitoris;
    private cubievaluemap;
    private cubiesetcubies;
    cmovesbyslice: number[][][];
    parsedmovelist: [
        string | undefined,
        number,
        number,
        number,
        boolean,
        number
    ][];
    private duplicatedFaces;
    private duplicatedCubies;
    private fixedCubie;
    private net;
    private colors;
    private swizzler;
    notationMapper: NotationMapper;
    private addNotationMapper;
    private setReidOrder;
    private options;
    constructor(puzzleDescription: PuzzleDescription, options: PuzzleGeometryOptions);
    create(puzzleDescription: PuzzleDescription): void;
    private keyface;
    private keyface2;
    private keyface3;
    private findface;
    private project2d;
    allstickers(): void;
    unswizzle(mv: Move): Move | null;
    private stringToBlockMove;
    parseMove(move: Move): [string | undefined, number, number, number, boolean, number];
    private parsemove;
    genperms(): void;
    private getboundarygeometry;
    private getmovesets;
    private graybyori;
    private skipbyori;
    private skipcubie;
    private header;
    writegap(): string;
    writeksolve(name?: string): string;
    getKPuzzleDefinition(fortwisty?: boolean, includemoves?: boolean): KPuzzleDefinition;
    getMoveFromBits(moverange: number[], amount: number, inverted: boolean, axiscmoves: number[][], setmoves: number[] | undefined, movesetorder: number): PGTransform;
    private omitSet;
    private diffmvsets;
    getOrbitsDef(fortwisty: boolean, includemoves?: boolean): PGOrbitsDef;
    getScramble(n?: number): KTransformationData;
    getMovesAsPerms(): Perm[];
    showcanon(disp: (s: string) => void): void;
    getsolved(): Perm;
    private getOrientationRotation;
    private getInitial3DRotation;
    private generate2dmapping;
    generatesvg(w?: number, h?: number, trim?: number, threed?: boolean): string;
    get3d(options?: {
        stickerColors?: string[];
    }): StickerDat;
    getGeoNormal(geoname: string): number[] | undefined;
    private getfaceindex;
    textForTwizzleExplorer(): string;
    writeSchreierSims(tw: (s: string) => void): void;
}
declare class PGNotation {
    private pg;
    private orbitNames;
    constructor(pg: PuzzleGeometry, od: PGOrbitsDef);
    lookupMove(move: Move): KTransformationData | null;
}

type KTransformationSource = Alg | Move | string | KTransformation;
declare class KPuzzle {
    #private;
    readonly definition: KPuzzleDefinition;
    private experimentalPGNotation;
    constructor(definition: KPuzzleDefinition, options?: {
        experimentalPGNotation?: PGNotation;
    });
    name(): string;
    identityTransformation(): KTransformation;
    moveToTransformation(move: Move | string): KTransformation;
    algToTransformation(alg: Alg | string): KTransformation;
    /** @deprecated */
    toTransformation(source: KTransformationSource): KTransformation;
    startState(): KState;
    canConvertStateToUniqueTransformation(): boolean;
}

declare class KState {
    readonly kpuzzle: KPuzzle;
    readonly stateData: KStateData;
    constructor(kpuzzle: KPuzzle, stateData: KStateData);
    toJSON(): any;
    static fromTransformation(transformation: KTransformation): KState;
    /** @deprecated */
    apply(source: KTransformationSource): KState;
    applyTransformation(transformation: KTransformation): KState;
    applyMove(move: Move | string): KState;
    applyAlg(alg: Alg | string): KState;
    /** @deprecated */
    experimentalToTransformation(): KTransformation | null;
    experimentalIsSolved(options: {
        ignorePuzzleOrientation: boolean;
        ignoreCenterOrientation: boolean;
    }): boolean;
}

export { KState as K, Perm as P, Quat as Q, StickerDat as S, KPuzzle as a, KPuzzleDefinition as b, KStateData as c, KTransformationData as d, KTransformation as e, getPuzzleGeometryByDesc as f, getPuzzleDescriptionString as g, getPuzzleGeometryByName as h, getPG3DNamedPuzzles as i, PuzzleGeometry as j, StickerDatAxis as k, StickerDatFace as l, StickerDatSticker as m, parseOptions as n, PGNotation as o, parsePuzzleDescription as p, PuzzleCutDescription as q, PuzzleDescription as r, PUZZLE_CUT_TYPES as s, PuzzleCutType as t, PUZZLE_BASE_SHAPES as u, PuzzleBaseShape as v, PuzzleDescriptionString as w };
