import { K as KState } from '../KState-fa1880c8.js';
import { B as BluetoothPuzzle } from '../bluetooth-puzzle-1cb7db76.js';
export { B as BluetoothPuzzle, A as MoveEvent, O as OrientationEvent } from '../bluetooth-puzzle-1cb7db76.js';
import { a as Alg, M as Move } from '../Alg-c6770822.js';

declare function enableDebugLogging(enable: boolean): void;

/** @category Keyboard Puzzles */
declare class KeyboardPuzzle extends BluetoothPuzzle {
    private target;
    private puzzle;
    private state;
    listener: (e: KeyboardEvent) => Promise<void>;
    constructor(target: Element);
    name(): string | undefined;
    disconnect(): void;
    getState(): Promise<KState>;
    private onKeyDown;
}
/** @category Keyboard Puzzles */
declare function debugKeyboardConnect(target?: any): Promise<KeyboardPuzzle>;

/******** connect() ********/
interface BluetoothConnectOptions {
    acceptAllDevices?: boolean;
}

/** @category Smart Puzzles */
declare function connectSmartPuzzle(options?: BluetoothConnectOptions): Promise<BluetoothPuzzle>;

/** @category Smart Puzzles */
declare class GanCube extends BluetoothPuzzle {
    private kpuzzle;
    private service;
    private server;
    private physicalStateCharacteristic;
    private lastMoveCounter;
    private aesKey;
    static connect(server: BluetoothRemoteGATTServer): Promise<GanCube>;
    INTERVAL_MS: number;
    private intervalHandle;
    private state;
    private cachedFaceletStatus1Characteristic;
    private cachedFaceletStatus2Characteristic;
    private cachedActualAngleAndBatteryCharacteristic;
    private constructor();
    name(): string | undefined;
    disconnect(): void;
    startTrackingMoves(): void;
    stopTrackingMoves(): void;
    intervalHandler(): Promise<void>;
    getBattery(): Promise<number>;
    getState(): Promise<KState>;
    faceletStatus1Characteristic(): Promise<BluetoothRemoteGATTCharacteristic>;
    faceletStatus2Characteristic(): Promise<BluetoothRemoteGATTCharacteristic>;
    actualAngleAndBatteryCharacteristic(): Promise<BluetoothRemoteGATTCharacteristic>;
    reset(): Promise<void>;
    readFaceletStatus1Characteristic(): Promise<ArrayBuffer>;
    readFaceletStatus2Characteristic(): Promise<string>;
    readActualAngleAndBatteryCharacteristic(): Promise<ArrayBuffer>;
}

/** @category Smart Puzzles */
declare class GiiKERCube extends BluetoothPuzzle {
    private server;
    private cubeCharacteristic;
    private originalValue?;
    static connect(server: BluetoothRemoteGATTServer): Promise<GiiKERCube>;
    private constructor();
    name(): string | undefined;
    disconnect(): void;
    getState(): Promise<KState>;
    private getBit;
    private toReid333;
    private onCubeCharacteristicChanged;
    private isRepeatedInitialValue;
}

/** @category Smart Puzzles */
declare class GoCube extends BluetoothPuzzle {
    private server;
    goCubeStateCharacteristic: BluetoothRemoteGATTCharacteristic;
    static connect(server: BluetoothRemoteGATTServer): Promise<GoCube>;
    private recorded;
    private homeQuatInverse;
    private lastRawQuat;
    private currentQuat;
    private lastTarget;
    private alg;
    private constructor();
    disconnect(): void;
    reset(): void;
    resetAlg(alg?: Alg): void;
    resetOrientation(): void;
    name(): string | undefined;
    private onCubeCharacteristicChanged;
}

interface GanRobotOptions {
    xAngle: boolean;
    singleMoveFixHack: boolean;
    bufferQueue: number;
    postSleep: number;
}
/** @category Robots */
declare class GanRobot extends EventTarget {
    private server;
    private statusCharacteristic;
    private moveCharacteristic;
    experimentalDebugOnSend: ((alg: Alg) => void) | null;
    experimentalDebugLog: typeof console.log;
    experimentalOptions: GanRobotOptions;
    constructor(_service: BluetoothRemoteGATTService, server: BluetoothRemoteGATTServer, device: BluetoothDevice, statusCharacteristic: BluetoothRemoteGATTCharacteristic, moveCharacteristic: BluetoothRemoteGATTCharacteristic);
    static connect(server: BluetoothRemoteGATTServer, device: BluetoothDevice): Promise<GanRobot>;
    name(): string | undefined;
    disconnect(): void;
    onDisconnect(): void;
    private moveToNibble;
    private writeNibbles;
    private getStatus;
    locked: boolean;
    processQueue(): void;
    private moveQueue;
    private queueMoves;
    applyMoves(moves: Iterable<Move>): Promise<void>;
}

/** @category Robots */
type BluetoothRobot = GanRobot;
/** @category Robots */
declare function connectSmartRobot(options?: BluetoothConnectOptions): Promise<BluetoothRobot>;

/** @category Timers */
declare class GanTimer extends EventTarget {
    private server;
    private timeCharacteristic;
    private polling;
    private previousDetail;
    constructor(_service: BluetoothRemoteGATTService, server: BluetoothRemoteGATTServer, device: BluetoothDevice, timeCharacteristic: BluetoothRemoteGATTCharacteristic);
    static connect(server: BluetoothRemoteGATTServer, device: BluetoothDevice): Promise<GanTimer>;
    disconnect(): void;
    poll(): Promise<void>;
    onDisconnect(): void;
    getTimeCharacteristic(): Promise<Uint8Array>;
    getTime(): Promise<number>;
    decodeTimeMs(bytes: Uint8Array): number;
    startPolling(): void;
    stopPolling(): void;
}

/** @category Timers */
type BluetoothTimer = GanTimer;
/** @category Timers */
declare function connectSmartTimer(options?: BluetoothConnectOptions): Promise<BluetoothTimer>;

export { BluetoothRobot, BluetoothTimer, GanCube, GiiKERCube, GoCube, KeyboardPuzzle, connectSmartPuzzle, connectSmartRobot, connectSmartTimer, debugKeyboardConnect, enableDebugLogging };
