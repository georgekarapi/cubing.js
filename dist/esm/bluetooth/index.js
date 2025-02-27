import {
  binaryComponentsToReid3x3x3,
  twizzleBinaryToBinaryComponents
} from "../chunk-R4DWRDGD.js";
import {
  cube3x3x3,
  puzzles
} from "../chunk-XUDPTWYN.js";
import {
  experimental3x3x3KPuzzle
} from "../chunk-AJS6B74K.js";
import {
  KState
} from "../chunk-KLI2E737.js";
import {
  Alg,
  Move,
  experimentalAppendMove,
  keyToMove
} from "../chunk-VZP3KFTU.js";

// src/cubing/bluetooth/debug.ts
var DEBUG_LOGGING_ENABLED = false;
function enableDebugLogging(enable) {
  DEBUG_LOGGING_ENABLED = enable;
}
function debugLog(...args) {
  if (!DEBUG_LOGGING_ENABLED) {
    return;
  }
  if (console.info) {
    console.info(...args);
  } else {
    console.log(...args);
  }
}

// src/cubing/bluetooth/transformer.ts
import { Quaternion, Vector3 } from "three";
function maxAxis(v) {
  const maxVal = Math.max(Math.abs(v.x), Math.abs(v.y), Math.abs(v.z));
  switch (maxVal) {
    case v.x:
      return "x";
    case -v.x:
      return "-x";
    case v.y:
      return "y";
    case -v.y:
      return "-y";
    case v.z:
      return "z";
    case -v.z:
      return "-z";
    default:
      throw new Error("Uh-oh.");
  }
}
var s2 = Math.sqrt(0.5);
var m = {
  "y z": new Quaternion(0, 0, 0, 1),
  "-z y": new Quaternion(s2, 0, 0, s2),
  "x z": new Quaternion(0, 0, -s2, s2),
  "-x z": new Quaternion(0, 0, s2, s2)
};
var BasicRotationTransformer = class {
  transformAlgLeaf(_algLeafEvent) {
  }
  transformOrientation(orientationEvent) {
    const { x, y, z, w } = orientationEvent.quaternion;
    const quat = new Quaternion(x, y, z, w);
    const U = new Vector3(0, 1, 0);
    const F = new Vector3(0, 0, 1);
    const maxU = maxAxis(U.applyQuaternion(quat));
    const maxF = maxAxis(F.applyQuaternion(quat));
    const oriQuat = m[`${maxU} ${maxF}`] || m["y z"];
    console.log(quat);
    console.log(oriQuat);
    const q2 = quat.premultiply(oriQuat);
    console.log(q2);
    orientationEvent.quaternion = quat;
    console.log(orientationEvent.quaternion);
  }
};

// src/cubing/bluetooth/smart-puzzle/bluetooth-puzzle.ts
var BluetoothPuzzle = class extends EventTarget {
  constructor() {
    super(...arguments);
    this.transformers = [];
    this.listeners = [];
    this.orientationListeners = [];
  }
  async getState() {
    throw new Error("cannot get state");
  }
  addAlgLeafListener(listener) {
    this.listeners.push(listener);
  }
  addOrientationListener(listener) {
    this.orientationListeners.push(listener);
  }
  experimentalAddBasicRotationTransformer() {
    this.transformers.push(new BasicRotationTransformer());
  }
  dispatchAlgLeaf(algLeaf) {
    for (const transformer of this.transformers) {
      transformer.transformAlgLeaf(algLeaf);
    }
    for (const l of this.listeners) {
      l(algLeaf);
    }
  }
  dispatchOrientation(orientationEvent) {
    for (const transformer of this.transformers) {
      transformer.transformOrientation(orientationEvent);
    }
    const { x, y, z, w } = orientationEvent.quaternion;
    orientationEvent.quaternion = {
      x,
      y,
      z,
      w
    };
    for (const l of this.orientationListeners) {
      l(orientationEvent);
    }
  }
};

// src/cubing/bluetooth/keyboard.ts
var KeyboardPuzzle = class extends BluetoothPuzzle {
  constructor(target) {
    super();
    this.target = target;
    this.puzzle = puzzles["3x3x3"].kpuzzle();
    this.state = (async () => (await this.puzzle).startState())();
    this.listener = this.onKeyDown.bind(this);
    target.addEventListener("keydown", this.listener);
  }
  name() {
    return "Keyboard Input";
  }
  disconnect() {
    this.target.removeEventListener("keydown", this.listener);
  }
  async getState() {
    return this.state;
  }
  async onKeyDown(e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) {
      return;
    }
    const algLeaf = keyToMove(e);
    if (algLeaf) {
      const newState = (await this.state).applyAlg(new Alg([algLeaf]));
      this.state = Promise.resolve(newState);
      this.dispatchAlgLeaf({
        latestAlgLeaf: algLeaf,
        timeStamp: e.timeStamp,
        state: newState
      });
      e.preventDefault();
    }
  }
};
async function debugKeyboardConnect(target = window) {
  return new KeyboardPuzzle(target);
}

// src/cubing/bluetooth/connect/index.ts
function requestOptions(configs, acceptAllDevices = false) {
  const options = acceptAllDevices ? {
    acceptAllDevices: true,
    optionalServices: []
  } : {
    filters: [],
    optionalServices: []
  };
  for (const config of configs) {
    if (!acceptAllDevices) {
      options.filters = options.filters.concat(config.filters);
    }
    options.optionalServices = options.optionalServices.concat(
      config.optionalServices
    );
  }
  debugLog({ requestOptions: options });
  return options;
}
var consecutiveFailures = 0;
var MAX_FAILURES_BEFORE_ACCEPT_ALL_FALLBACK = 2;
async function bluetoothConnect(configs, options = {}) {
  debugLog("Attempting to pair.");
  let device;
  try {
    let acceptAllDevices = options.acceptAllDevices;
    if (!acceptAllDevices && consecutiveFailures >= MAX_FAILURES_BEFORE_ACCEPT_ALL_FALLBACK) {
      console.info(
        `The last ${MAX_FAILURES_BEFORE_ACCEPT_ALL_FALLBACK} Bluetooth puzzle connection attempts failed. This time, the Bluetooth prompt will show all possible devices.`
      );
      acceptAllDevices = true;
    }
    device = await navigator.bluetooth.requestDevice(
      requestOptions(configs, acceptAllDevices)
    );
    consecutiveFailures = 0;
  } catch (e) {
    consecutiveFailures++;
    throw new Error(e);
  }
  debugLog("Device:", device);
  if (typeof device.gatt === "undefined") {
    return Promise.reject("Device did not have a GATT server.");
  }
  const server = await device.gatt.connect();
  debugLog("Server:", server);
  const name = server.device?.name || "";
  for (const config of configs) {
    for (const prefix of config.prefixes) {
      if (name?.startsWith(prefix)) {
        return config.connect(server, device);
      }
    }
  }
  throw Error("Unknown Bluetooth devive.");
}

// src/cubing/bluetooth/smart-puzzle/gan.ts
import { Quaternion as Quaternion2 } from "three";

// src/cubing/vendor/public-domain/unsafe-raw-aes/unsafe-raw-aes.ts
var blockSize = 16;
var zeros = new Uint8Array(blockSize);
var paddingBlockPlaintext = new Uint8Array(
  new Array(blockSize).fill(blockSize)
);
var AES_CBC = "AES-CBC";
async function importKey(keyBytes) {
  return await crypto.subtle.importKey("raw", keyBytes, AES_CBC, true, [
    "encrypt",
    "decrypt"
  ]);
}
async function unsafeEncryptBlockWithIV(key, plaintextBlock, iv) {
  const cryptoResult = await window.crypto.subtle.encrypt(
    {
      name: AES_CBC,
      iv
    },
    key,
    plaintextBlock
  );
  return cryptoResult.slice(0, blockSize);
}
async function unsafeDecryptBlock(key, ciphertextBlock) {
  const paddingBlock = await unsafeEncryptBlockWithIV(
    key,
    paddingBlockPlaintext,
    ciphertextBlock
  );
  const cbcCiphertext = new Uint8Array(2 * blockSize);
  cbcCiphertext.set(new Uint8Array(ciphertextBlock), 0);
  cbcCiphertext.set(new Uint8Array(paddingBlock), blockSize);
  const cryptoResult = await window.crypto.subtle.decrypt(
    {
      name: AES_CBC,
      iv: zeros
    },
    key,
    cbcCiphertext
  );
  return cryptoResult.slice(0, blockSize);
}

// src/cubing/bluetooth/smart-puzzle/gan.ts
var DEFAULT_INTERVAL_MS = 150;
var MAX_LATEST_MOVES = 6;
var ganMoveToBlockMove = {
  0: new Move("U"),
  2: new Move("U", -1),
  3: new Move("R"),
  5: new Move("R", -1),
  6: new Move("F"),
  8: new Move("F", -1),
  9: new Move("D"),
  11: new Move("D", -1),
  12: new Move("L"),
  14: new Move("L", -1),
  15: new Move("B"),
  17: new Move("B", -1)
};
var homeQuatInverse = null;
function probablyDecodedCorrectly(data) {
  return data[13] < 18 && data[14] < 18 && data[15] < 18 && data[16] < 18 && data[17] < 18 && data[18] < 18;
}
var key10 = new Uint8Array([
  198,
  202,
  21,
  223,
  79,
  110,
  19,
  182,
  119,
  13,
  230,
  89,
  58,
  175,
  186,
  162
]);
var key11 = new Uint8Array([
  67,
  226,
  91,
  214,
  125,
  220,
  120,
  216,
  7,
  96,
  163,
  218,
  130,
  60,
  1,
  241
]);
async function decryptState(data, aesKey) {
  if (aesKey === null) {
    return data;
  }
  const copy = new Uint8Array(data);
  copy.set(new Uint8Array(await unsafeDecryptBlock(aesKey, copy.slice(3))), 3);
  copy.set(
    new Uint8Array(await unsafeDecryptBlock(aesKey, copy.slice(0, 16))),
    0
  );
  if (probablyDecodedCorrectly(copy)) {
    return copy;
  }
  throw new Error("Invalid Gan cube state");
}
var PhysicalState = class {
  constructor(dataView, timeStamp) {
    this.dataView = dataView;
    this.timeStamp = timeStamp;
    this.arrLen = 19;
    this.arr = new Uint8Array(dataView.buffer);
    if (this.arr.length !== this.arrLen) {
      throw new Error("Unexpected array length");
    }
  }
  static async read(characteristic, aesKey) {
    const value = await decryptState(
      new Uint8Array((await characteristic.readValue()).buffer),
      aesKey
    );
    const timeStamp = Date.now();
    return new PhysicalState(new DataView(value.buffer), timeStamp);
  }
  rotQuat() {
    let x = this.dataView.getInt16(0, true) / 16384;
    let y = this.dataView.getInt16(2, true) / 16384;
    let z = this.dataView.getInt16(4, true) / 16384;
    [x, y, z] = [-y, z, -x];
    const wSquared = 1 - (x * x + y * y + z * z);
    const w = wSquared > 0 ? Math.sqrt(wSquared) : 0;
    const quat = new Quaternion2(x, y, z, w);
    if (!homeQuatInverse) {
      homeQuatInverse = quat.clone().invert();
    }
    return quat.clone().multiply(homeQuatInverse.clone());
  }
  moveCounter() {
    return this.arr[12];
  }
  numMovesSince(previousMoveCounter) {
    return this.moveCounter() - previousMoveCounter & 255;
  }
  latestMoves(n) {
    if (n < 0 || n > MAX_LATEST_MOVES) {
      throw new Error(`Must ask for 0 to 6 latest moves. (Asked for ${n})`);
    }
    return Array.from(this.arr.slice(19 - n, 19)).map(
      (i) => ganMoveToBlockMove[i]
    );
  }
  debugInfo() {
    return {
      arr: this.arr
    };
  }
};
var UUIDs = {
  ganCubeService: "0000fff0-0000-1000-8000-00805f9b34fb",
  physicalStateCharacteristic: "0000fff5-0000-1000-8000-00805f9b34fb",
  actualAngleAndBatteryCharacteristic: "0000fff7-0000-1000-8000-00805f9b34fb",
  faceletStatus1Characteristic: "0000fff2-0000-1000-8000-00805f9b34fb",
  faceletStatus2Characteristic: "0000fff3-0000-1000-8000-00805f9b34fb",
  infoService: "0000180a-0000-1000-8000-00805f9b34fb",
  systemIDCharacteristic: "00002a23-0000-1000-8000-00805f9b34fb",
  versionCharacteristic: "00002a28-0000-1000-8000-00805f9b34fb"
};
var commands = {
  reset: new Uint8Array([
    0,
    0,
    36,
    0,
    73,
    146,
    36,
    73,
    109,
    146,
    219,
    182,
    73,
    146,
    182,
    36,
    109,
    219
  ])
};
function buf2hex(buffer) {
  return Array.prototype.map.call(
    new Uint8Array(buffer),
    (x) => `00${x.toString(16)}`.slice(-2)
  ).join(" ");
}
var reidEdgeOrder = "UF UR UB UL DF DR DB DL FR FL BR BL".split(" ");
var reidCornerOrder = "UFR URB UBL ULF DRF DFL DLB DBR".split(" ");
function rotateLeft(s, i) {
  return s.slice(i) + s.slice(0, i);
}
var pieceMap = {};
reidEdgeOrder.forEach((edge, idx) => {
  for (let i = 0; i < 2; i++) {
    pieceMap[rotateLeft(edge, i)] = { piece: idx, orientation: i };
  }
});
reidCornerOrder.forEach((corner, idx) => {
  for (let i = 0; i < 3; i++) {
    pieceMap[rotateLeft(corner, i)] = { piece: idx, orientation: i };
  }
});
var gan356iCornerMappings = [
  [0, 21, 15],
  [5, 13, 47],
  [7, 45, 39],
  [2, 37, 23],
  [29, 10, 16],
  [31, 18, 32],
  [26, 34, 40],
  [24, 42, 8]
];
var gan356iEdgeMappings = [
  [1, 22],
  [3, 14],
  [6, 46],
  [4, 38],
  [30, 17],
  [27, 9],
  [25, 41],
  [28, 33],
  [19, 12],
  [20, 35],
  [44, 11],
  [43, 36]
];
var faceOrder = "URFDLB";
async function getKey(server) {
  const infoService = await server.getPrimaryService(UUIDs.infoService);
  const versionCharacteristic = await infoService.getCharacteristic(
    UUIDs.versionCharacteristic
  );
  const versionBuffer = new Uint8Array(
    (await versionCharacteristic.readValue()).buffer
  );
  const versionValue = ((versionBuffer[0] << 8) + versionBuffer[1] << 8) + versionBuffer[2];
  if (versionValue < 65544) {
    return null;
  }
  const keyXor = versionValue < 65792 ? key10 : key11;
  const systemIDCharacteristic = await infoService.getCharacteristic(
    UUIDs.systemIDCharacteristic
  );
  const systemID = new Uint8Array(
    (await systemIDCharacteristic.readValue()).buffer
  ).reverse();
  const key = new Uint8Array(keyXor);
  for (let i = 0; i < systemID.length; i++) {
    key[i] = (key[i] + systemID[i]) % 256;
  }
  return importKey(key);
}
var GanCube = class extends BluetoothPuzzle {
  constructor(kpuzzle, service, server, physicalStateCharacteristic, lastMoveCounter, aesKey) {
    super();
    this.kpuzzle = kpuzzle;
    this.service = service;
    this.server = server;
    this.physicalStateCharacteristic = physicalStateCharacteristic;
    this.lastMoveCounter = lastMoveCounter;
    this.aesKey = aesKey;
    this.INTERVAL_MS = DEFAULT_INTERVAL_MS;
    this.intervalHandle = null;
    this.state = kpuzzle.startState();
    this.startTrackingMoves();
  }
  static async connect(server) {
    const ganCubeService = await server.getPrimaryService(UUIDs.ganCubeService);
    debugLog("Service:", ganCubeService);
    const physicalStateCharacteristic = await ganCubeService.getCharacteristic(
      UUIDs.physicalStateCharacteristic
    );
    debugLog("Characteristic:", physicalStateCharacteristic);
    const aesKey = await getKey(server);
    const initialMoveCounter = (await PhysicalState.read(physicalStateCharacteristic, aesKey)).moveCounter();
    debugLog("Initial Move Counter:", initialMoveCounter);
    const cube = new GanCube(
      await puzzles["3x3x3"].kpuzzle(),
      ganCubeService,
      server,
      physicalStateCharacteristic,
      initialMoveCounter,
      aesKey
    );
    return cube;
  }
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  startTrackingMoves() {
    this.intervalHandle = window.setInterval(
      this.intervalHandler.bind(this),
      this.INTERVAL_MS
    );
  }
  stopTrackingMoves() {
    if (!this.intervalHandle) {
      throw new Error("Not tracking moves!");
    }
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
  }
  async intervalHandler() {
    const physicalState = await PhysicalState.read(
      this.physicalStateCharacteristic,
      this.aesKey
    );
    let numInterveningMoves = physicalState.numMovesSince(this.lastMoveCounter);
    if (numInterveningMoves > MAX_LATEST_MOVES) {
      debugLog(
        `Too many moves! Dropping ${numInterveningMoves - MAX_LATEST_MOVES} moves`
      );
      numInterveningMoves = MAX_LATEST_MOVES;
    }
    for (const move of physicalState.latestMoves(numInterveningMoves)) {
      this.state = this.state.applyMove(move);
      this.dispatchAlgLeaf({
        latestAlgLeaf: move,
        timeStamp: physicalState.timeStamp,
        debug: physicalState.debugInfo(),
        state: this.state
      });
    }
    this.dispatchOrientation({
      timeStamp: physicalState.timeStamp,
      quaternion: physicalState.rotQuat()
    });
    this.lastMoveCounter = physicalState.moveCounter();
  }
  async getBattery() {
    return new Uint8Array(
      await this.readActualAngleAndBatteryCharacteristic()
    )[7];
  }
  async getState() {
    const arr = await decryptState(
      new Uint8Array(await this.readFaceletStatus1Characteristic()),
      this.aesKey
    );
    const stickers = [];
    for (let i = 0; i < 18; i += 3) {
      let v = ((arr[i ^ 1] << 8) + arr[i + 1 ^ 1] << 8) + arr[i + 2 ^ 1];
      for (let j = 0; j < 8; j++) {
        stickers.push(v & 7);
        v >>= 3;
      }
    }
    const stateData = {
      CORNERS: {
        pieces: [],
        orientation: []
      },
      EDGES: {
        pieces: [],
        orientation: []
      },
      CENTERS: {
        pieces: [0, 1, 2, 3, 4, 5],
        orientation: [0, 0, 0, 0, 0, 0]
      }
    };
    for (const cornerMapping of gan356iCornerMappings) {
      const pieceInfo = pieceMap[cornerMapping.map((i) => faceOrder[stickers[i]]).join("")];
      stateData.CORNERS.pieces.push(pieceInfo.piece);
      stateData.CORNERS.orientation.push(pieceInfo.orientation);
    }
    for (const edgeMapping of gan356iEdgeMappings) {
      const pieceInfo = pieceMap[edgeMapping.map((i) => faceOrder[stickers[i]]).join("")];
      stateData.EDGES.pieces.push(pieceInfo.piece);
      stateData.EDGES.orientation.push(pieceInfo.orientation);
    }
    return new KState(this.kpuzzle, stateData);
  }
  async faceletStatus1Characteristic() {
    this.cachedFaceletStatus1Characteristic = this.cachedFaceletStatus1Characteristic || this.service.getCharacteristic(UUIDs.faceletStatus1Characteristic);
    return this.cachedFaceletStatus1Characteristic;
  }
  async faceletStatus2Characteristic() {
    this.cachedFaceletStatus2Characteristic = this.cachedFaceletStatus2Characteristic || this.service.getCharacteristic(UUIDs.faceletStatus2Characteristic);
    return this.cachedFaceletStatus2Characteristic;
  }
  async actualAngleAndBatteryCharacteristic() {
    this.cachedActualAngleAndBatteryCharacteristic = this.cachedActualAngleAndBatteryCharacteristic || this.service.getCharacteristic(UUIDs.actualAngleAndBatteryCharacteristic);
    return this.cachedActualAngleAndBatteryCharacteristic;
  }
  async reset() {
    const faceletStatus1Characteristic = await this.faceletStatus1Characteristic();
    await faceletStatus1Characteristic.writeValue(commands.reset);
  }
  async readFaceletStatus1Characteristic() {
    const faceletStatus1Characteristic = await this.faceletStatus1Characteristic();
    return (await faceletStatus1Characteristic.readValue()).buffer;
  }
  async readFaceletStatus2Characteristic() {
    const faceletStatus2Characteristic = await this.faceletStatus2Characteristic();
    return buf2hex((await faceletStatus2Characteristic.readValue()).buffer);
  }
  async readActualAngleAndBatteryCharacteristic() {
    const actualAngleAndBatteryCharacteristic = await this.actualAngleAndBatteryCharacteristic();
    return (await actualAngleAndBatteryCharacteristic.readValue()).buffer;
  }
};
var ganConfig = {
  connect: GanCube.connect.bind(GanCube),
  prefixes: ["GAN"],
  filters: [{ namePrefix: "GAN" }],
  optionalServices: [UUIDs.ganCubeService, UUIDs.infoService]
};

// src/cubing/bluetooth/smart-puzzle/giiker.ts
var MESSAGE_LENGTH = 20;
var UUIDs2 = {
  cubeService: "0000aadb-0000-1000-8000-00805f9b34fb",
  cubeCharacteristic: "0000aadc-0000-1000-8000-00805f9b34fb"
};
function giikerMoveToAlgMove(face, amount) {
  switch (amount) {
    case 3: {
      amount = -1;
      break;
    }
    case 9: {
      debugLog("Encountered 9", face, amount);
      amount = -2;
      break;
    }
  }
  const family = ["?", "B", "D", "L", "U", "R", "F"][face];
  return new Move(family, amount);
}
function giikerStateStr(giikerState) {
  let str = "";
  str += giikerState.slice(0, 8).join(".");
  str += "\n";
  str += giikerState.slice(8, 16).join(".");
  str += "\n";
  str += giikerState.slice(16, 28).join(".");
  str += "\n";
  str += giikerState.slice(28, 32).join(".");
  str += "\n";
  str += giikerState.slice(32, 40).join(".");
  return str;
}
var Reid333SolvedCenters = {
  pieces: [0, 1, 2, 3, 4, 5],
  orientation: [0, 0, 0, 0, 0, 0]
};
var epGiiKERtoReid333 = [4, 8, 0, 9, 5, 1, 3, 7, 6, 10, 2, 11];
var epReid333toGiiKER = [2, 5, 10, 6, 0, 4, 8, 7, 1, 3, 9, 11];
var preEO = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
var postEO = [1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
var cpGiiKERtoReid333 = [4, 0, 3, 5, 7, 1, 2, 6];
var cpReid333toGiiKER = [1, 5, 6, 2, 0, 3, 7, 4];
var preCO = [1, 2, 1, 2, 2, 1, 2, 1];
var postCO = [2, 1, 2, 1, 1, 2, 1, 2];
var coFlip = [-1, 1, -1, 1, 1, -1, 1, -1];
function getNibble(val, i) {
  if (i % 2 === 1) {
    return val[i / 2 | 0] % 16;
  }
  return 0 | val[i / 2 | 0] / 16;
}
function probablyEncrypted(data) {
  return data[18] === 167;
}
var lookup = [
  176,
  81,
  104,
  224,
  86,
  137,
  237,
  119,
  38,
  26,
  193,
  161,
  210,
  126,
  150,
  81,
  93,
  13,
  236,
  249,
  89,
  235,
  88,
  24,
  113,
  81,
  214,
  131,
  130,
  199,
  2,
  169,
  39,
  165,
  171,
  41
];
function decryptState2(data) {
  const offset1 = getNibble(data, 38);
  const offset2 = getNibble(data, 39);
  const output = new Uint8Array(MESSAGE_LENGTH);
  for (let i = 0; i < MESSAGE_LENGTH; i++) {
    output[i] = data[i] + lookup[offset1 + i] + lookup[offset2 + i];
  }
  return output;
}
async function decodeState(data) {
  if (!probablyEncrypted(data)) {
    return data;
  }
  return decryptState2(data);
}
var GiiKERCube = class extends BluetoothPuzzle {
  constructor(server, cubeCharacteristic, originalValue) {
    super();
    this.server = server;
    this.cubeCharacteristic = cubeCharacteristic;
    this.originalValue = originalValue;
  }
  static async connect(server) {
    const cubeService = await server.getPrimaryService(UUIDs2.cubeService);
    debugLog("Service:", cubeService);
    const cubeCharacteristic = await cubeService.getCharacteristic(
      UUIDs2.cubeCharacteristic
    );
    debugLog("Characteristic:", cubeCharacteristic);
    const originalValue = await decodeState(
      new Uint8Array((await cubeCharacteristic.readValue()).buffer)
    );
    debugLog("Original value:", originalValue);
    const cube = new GiiKERCube(server, cubeCharacteristic, originalValue);
    await cubeCharacteristic.startNotifications();
    cubeCharacteristic.addEventListener(
      "characteristicvaluechanged",
      cube.onCubeCharacteristicChanged.bind(cube)
    );
    return cube;
  }
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  async getState() {
    return this.toReid333(
      new Uint8Array((await this.cubeCharacteristic.readValue()).buffer)
    );
  }
  getBit(val, i) {
    const n = i / 8 | 0;
    const shift = 7 - i % 8;
    return val[n] >> shift & 1;
  }
  toReid333(val) {
    const state = {
      EDGES: {
        pieces: new Array(12),
        orientation: new Array(12)
      },
      CORNERS: {
        pieces: new Array(8),
        orientation: new Array(8)
      },
      CENTERS: Reid333SolvedCenters
    };
    for (let i = 0; i < 12; i++) {
      const gi = epReid333toGiiKER[i];
      state.EDGES.pieces[i] = epGiiKERtoReid333[getNibble(val, gi + 16) - 1];
      state.EDGES.orientation[i] = this.getBit(val, gi + 112) ^ preEO[state.EDGES.pieces[i]] ^ postEO[i];
    }
    for (let i = 0; i < 8; i++) {
      const gi = cpReid333toGiiKER[i];
      state.CORNERS.pieces[i] = cpGiiKERtoReid333[getNibble(val, gi) - 1];
      state.CORNERS.orientation[i] = (getNibble(val, gi + 8) * coFlip[gi] + preCO[state.CORNERS.pieces[i]] + postCO[i]) % 3;
    }
    return new KState(experimental3x3x3KPuzzle, state);
  }
  async onCubeCharacteristicChanged(event) {
    const val = await decodeState(new Uint8Array(event.target.value.buffer));
    debugLog(val);
    debugLog(val);
    if (this.isRepeatedInitialValue(val)) {
      debugLog("Skipping repeated initial value.");
      return;
    }
    const giikerState = [];
    for (let i = 0; i < MESSAGE_LENGTH; i++) {
      giikerState.push(Math.floor(val[i] / 16));
      giikerState.push(val[i] % 16);
    }
    debugLog(giikerState);
    const str = giikerStateStr(giikerState);
    debugLog(str);
    this.dispatchAlgLeaf({
      latestAlgLeaf: giikerMoveToAlgMove(giikerState[32], giikerState[33]),
      timeStamp: event.timeStamp,
      debug: {
        stateStr: str
      },
      state: this.toReid333(val)
    });
  }
  isRepeatedInitialValue(val) {
    if (typeof this.originalValue === "undefined") {
      throw new Error("GiiKERCube has uninitialized original value.");
    }
    if (this.originalValue === null) {
      return false;
    }
    const originalValue = this.originalValue;
    this.originalValue = null;
    debugLog("Comparing against original value.");
    for (let i = 0; i < MESSAGE_LENGTH - 2; i++) {
      if (originalValue[i] !== val[i]) {
        debugLog("Different at index ", i);
        return false;
      }
    }
    return true;
  }
};
var giiKERConfig = {
  connect: GiiKERCube.connect.bind(GiiKERCube),
  prefixes: ["Gi", ""],
  filters: [
    { namePrefix: "Gi" },
    { services: ["0000aadb-0000-1000-8000-00805f9b34fb"] },
    { services: ["0000aaaa-0000-1000-8000-00805f9b34fb"] },
    { services: ["0000fe95-0000-1000-8000-00805f9b34fb"] }
  ],
  optionalServices: [
    UUIDs2.cubeService
  ]
};

// src/cubing/bluetooth/smart-puzzle/gocube.ts
import { Quaternion as Quaternion3 } from "three";
var UUIDs3 = {
  goCubeService: "6e400001-b5a3-f393-e0a9-e50e24dcca9e",
  goCubeStateCharacteristic: "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
};
function buf2hex2(buffer) {
  return Array.prototype.map.call(
    new Uint8Array(buffer),
    (x) => `00${x.toString(16)}`.slice(-2)
  ).join(" ");
}
function bufferToString(buffer) {
  const byteView = new Uint8Array(buffer);
  let str = "";
  for (const charCode of byteView) {
    str += String.fromCharCode(charCode);
  }
  return str;
}
var moveMap = [
  new Move("B", 1),
  new Move("B", -1),
  new Move("F", 1),
  new Move("F", -1),
  new Move("U", 1),
  new Move("U", -1),
  new Move("D", 1),
  new Move("D", -1),
  new Move("R", 1),
  new Move("R", -1),
  new Move("L", 1),
  new Move("L", -1)
];
var GoCube = class extends BluetoothPuzzle {
  constructor(server, goCubeStateCharacteristic) {
    super();
    this.server = server;
    this.goCubeStateCharacteristic = goCubeStateCharacteristic;
    this.recorded = [];
    this.homeQuatInverse = null;
    this.lastRawQuat = new Quaternion3(0, 0, 0, 1);
    this.currentQuat = new Quaternion3(0, 0, 0, 1);
    this.lastTarget = new Quaternion3(0, 0, 0, 1);
    this.alg = new Alg();
  }
  static async connect(server) {
    const service = await server.getPrimaryService(UUIDs3.goCubeService);
    debugLog({ service });
    const goCubeStateCharacteristic = await service.getCharacteristic(
      UUIDs3.goCubeStateCharacteristic
    );
    debugLog({ goCubeStateCharacteristic });
    const cube = new GoCube(server, goCubeStateCharacteristic);
    await goCubeStateCharacteristic.startNotifications();
    goCubeStateCharacteristic.addEventListener(
      "characteristicvaluechanged",
      cube.onCubeCharacteristicChanged.bind(cube)
    );
    return cube;
  }
  disconnect() {
    this.server.disconnect();
  }
  reset() {
    this.resetAlg();
    this.resetOrientation();
  }
  resetAlg(alg) {
    this.alg = alg || new Alg();
  }
  resetOrientation() {
    this.homeQuatInverse = this.lastRawQuat.clone().invert();
    this.currentQuat = new Quaternion3(0, 0, 0, 1);
    this.lastTarget = new Quaternion3(0, 0, 0, 1);
  }
  name() {
    return this.server.device.name;
  }
  onCubeCharacteristicChanged(event) {
    const buffer = event.target.value;
    this.recorded.push([event.timeStamp, buf2hex2(buffer.buffer)]);
    if (buffer.byteLength < 16) {
      for (let i = 3; i < buffer.byteLength - 4; i += 2) {
        const move = moveMap[buffer.getUint8(i)];
        this.alg = experimentalAppendMove(this.alg, move);
        this.dispatchAlgLeaf({
          latestAlgLeaf: moveMap[buffer.getUint8(i)],
          timeStamp: event.timeStamp,
          debug: {
            stateStr: buf2hex2(buffer.buffer)
          }
        });
      }
    } else {
      const coords = bufferToString(
        buffer.buffer.slice(3, buffer.byteLength - 3)
      ).split("#").map((s) => parseInt(s, 10) / 16384);
      const quat = new Quaternion3(coords[0], coords[1], coords[2], coords[3]);
      this.lastRawQuat = quat.clone();
      if (!this.homeQuatInverse) {
        this.homeQuatInverse = quat.clone().invert();
      }
      const targetQuat = quat.clone().multiply(this.homeQuatInverse.clone());
      targetQuat.y = -targetQuat.y;
      this.lastTarget.slerp(targetQuat, 0.5);
      this.currentQuat.rotateTowards(this.lastTarget, rotateTowardsRate);
      this.dispatchOrientation({
        quaternion: this.currentQuat,
        timeStamp: event.timeStamp
      });
    }
  }
};
var rotateTowardsRate = 0.5;
var goCubeConfig = {
  connect: GoCube.connect.bind(GoCube),
  prefixes: ["GoCube", "Rubik"],
  filters: [{ namePrefix: "GoCube" }, { namePrefix: "Rubik" }],
  optionalServices: [UUIDs3.goCubeService]
};

// src/cubing/bluetooth/smart-puzzle/endianness.ts
function flipBitOrder(v, numBits) {
  let result = 0;
  for (let i = 0; i < numBits; i++) {
    const shiftLeft = numBits - 1 - 2 * i;
    const unShiftedBit = v & 1 << i;
    result += shiftLeft < 0 ? unShiftedBit >> -shiftLeft : unShiftedBit << shiftLeft;
  }
  return result;
}

// src/cubing/bluetooth/smart-puzzle/Heykube.ts
var UUIDs4 = {
  heykubeService: "b46a791a-8273-4fc1-9e67-94d3dc2aac1c",
  stateCharacteristic: "a2f41a4e-0e31-4bbc-9389-4253475481fb",
  batteryCharacteristic: "fd51b3ba-99c7-49c6-9f85-5644ff56a378"
};
var HeykubeCube = class extends BluetoothPuzzle {
  constructor(_kpuzzle, _service, device, server, stateCharacteristic) {
    super();
    this.server = server;
    this.stateCharacteristic = stateCharacteristic;
    device.addEventListener(
      "gattserverdisconnected",
      this.onDisconnect.bind(this)
    );
    this.stateCharacteristic.startNotifications();
    this.startTrackingMoves();
  }
  static async connect(server, device) {
    const service = await server.getPrimaryService(UUIDs4.heykubeService);
    debugLog("Service:", service);
    const stateCharacteristic = await service.getCharacteristic(
      UUIDs4.stateCharacteristic
    );
    debugLog("Characteristic:", stateCharacteristic);
    const cube = new HeykubeCube(
      await puzzles["3x3x3"].kpuzzle(),
      service,
      device,
      server,
      stateCharacteristic
    );
    return cube;
  }
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  onDisconnect() {
    this.dispatchEvent(new CustomEvent("disconnect"));
  }
  startTrackingMoves() {
    this.stateCharacteristic.addEventListener(
      "characteristicvaluechanged",
      (e) => this.onStateCharacteristic(e)
    );
  }
  onStateCharacteristic(event) {
    const state = this.decodeState(event.target.value);
    this.dispatchAlgLeaf({
      latestAlgLeaf: state.latestMove,
      timeStamp: event.timeStamp,
      state: state.state
    });
  }
  decodeState(dv) {
    const moves = [
      new Move("U"),
      new Move("U'"),
      new Move("B"),
      new Move("B'"),
      new Move("F"),
      new Move("F'"),
      null,
      null,
      new Move("L"),
      new Move("L'"),
      new Move("D"),
      new Move("D'"),
      new Move("R"),
      new Move("R'")
    ];
    const b2 = new Uint8Array(dv.byteLength);
    for (let i = 0; i < dv.byteLength; i++) {
      b2[i] = flipBitOrder(dv.getUint8(i), 8);
    }
    const components1 = twizzleBinaryToBinaryComponents(
      b2.slice(0, 11)
    );
    const components2 = {
      epLex: flipBitOrder(components1.epLex, 29),
      eoMask: flipBitOrder(components1.eoMask, 12),
      cpLex: flipBitOrder(components1.cpLex, 16),
      coMask: flipBitOrder(components1.coMask, 13),
      poIdxL: 0,
      poIdxU: 7,
      moSupport: 1,
      moMask: 0
    };
    return {
      state: binaryComponentsToReid3x3x3(components2),
      latestMove: moves[b2[20] & 15]
    };
  }
  async getState() {
    const b1 = await this.stateCharacteristic.readValue();
    return this.decodeState(b1).state;
  }
};
var heykubeConfig = {
  connect: HeykubeCube.connect.bind(HeykubeCube),
  prefixes: ["HEYKUBE"],
  filters: [{ namePrefix: "HEYKUBE" }],
  optionalServices: [UUIDs4.heykubeService]
};

// src/cubing/bluetooth/smart-puzzle/connect.ts
var smartPuzzleConfigs = [
  ganConfig,
  goCubeConfig,
  heykubeConfig,
  giiKERConfig
];
async function connectSmartPuzzle(options) {
  return bluetoothConnect(smartPuzzleConfigs, options);
}

// src/cubing/bluetooth/smart-robot/GanRobot.ts
function buf2hex3(buffer) {
  return Array.prototype.map.call(
    new Uint8Array(buffer),
    (x) => `00${x.toString(16)}`.slice(-2)
  ).join(" ");
}
var MAX_NIBBLES_PER_WRITE = 18 * 2;
var QUANTUM_TURN_DURATION_MS = 150;
var DOUBLE_TURN_DURATION_MS = 250;
var U_D_SWAP = new Alg("F B R2 L2 B' F'");
var U_D_UNSWAP = U_D_SWAP.invert();
var F_B_SWAP = new Alg("U D R2 L2 D' U'");
var F_B_UNSWAP = F_B_SWAP.invert();
var UUIDs5 = {
  ganRobotService: "0000fff0-0000-1000-8000-00805f9b34fb",
  statusCharacteristic: "0000fff2-0000-1000-8000-00805f9b34fb",
  moveCharacteristic: "0000fff3-0000-1000-8000-00805f9b34fb"
};
var moveMap2 = {
  R: 0,
  R2: 1,
  "R2'": 1,
  "R'": 2,
  F: 3,
  F2: 4,
  "F2'": 4,
  "F'": 5,
  D: 6,
  D2: 7,
  "D2'": 7,
  "D'": 8,
  L: 9,
  L2: 10,
  "L2'": 10,
  "L'": 11,
  B: 12,
  B2: 13,
  "B2'": 13,
  "B'": 14
};
var moveMapX = {
  R: 0,
  R2: 1,
  "R2'": 1,
  "R'": 2,
  U: 3,
  U2: 4,
  "U2'": 4,
  "U'": 5,
  F: 6,
  F2: 7,
  "F2'": 7,
  "F'": 8,
  L: 9,
  L2: 10,
  "L2'": 10,
  "L'": 11,
  D: 12,
  D2: 13,
  "D2'": 13,
  "D'": 14
};
function isDoubleTurnNibble(nibble) {
  return nibble % 3 === 1;
}
function nibbleDuration(nibble) {
  return isDoubleTurnNibble(nibble) ? DOUBLE_TURN_DURATION_MS : QUANTUM_TURN_DURATION_MS;
}
function throwInvalidMove(move) {
  console.error("invalid move", move, move.toString());
  throw new Error("invalid move!");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
var GanRobot = class extends EventTarget {
  constructor(_service, server, device, statusCharacteristic, moveCharacteristic) {
    super();
    this.server = server;
    this.statusCharacteristic = statusCharacteristic;
    this.moveCharacteristic = moveCharacteristic;
    this.experimentalDebugOnSend = null;
    this.experimentalDebugLog = () => {
    };
    this.experimentalOptions = {
      xAngle: false,
      singleMoveFixHack: false,
      bufferQueue: 0,
      postSleep: 0
    };
    this.locked = false;
    this.moveQueue = new Alg();
    device.addEventListener(
      "gattserverdisconnected",
      this.onDisconnect.bind(this)
    );
  }
  static async connect(server, device) {
    const ganTimerService = await server.getPrimaryService(
      UUIDs5.ganRobotService
    );
    const statusCharacteristic = await ganTimerService.getCharacteristic(
      UUIDs5.statusCharacteristic
    );
    const moveCharacteristic = await ganTimerService.getCharacteristic(
      UUIDs5.moveCharacteristic
    );
    const timer = new GanRobot(
      ganTimerService,
      server,
      device,
      statusCharacteristic,
      moveCharacteristic
    );
    return timer;
  }
  name() {
    return this.server.device.name;
  }
  disconnect() {
    this.server.disconnect();
  }
  onDisconnect() {
    this.dispatchEvent(new CustomEvent("disconnect"));
  }
  moveToNibble(move) {
    const nibble = (this.experimentalOptions.xAngle ? moveMapX : moveMap2)[move.toString()] ?? null;
    if (nibble === null) {
      throwInvalidMove(move);
    }
    return nibble;
  }
  async writeNibbles(nibbles) {
    if (nibbles.length > MAX_NIBBLES_PER_WRITE) {
      throw new Error(
        `Can only write ${MAX_NIBBLES_PER_WRITE} nibbles at a time!`
      );
    }
    const bytes = new Uint8Array(18);
    let i;
    for (i = 0; i < nibbles.length; i++) {
      const byteIdx = Math.floor(i / 2);
      bytes[byteIdx] += nibbles[i];
      if (i % 2 === 0) {
        bytes[byteIdx] *= 16;
      }
    }
    if (nibbles.length % 2 === 1) {
      bytes[Math.ceil(nibbles.length / 2) - 1] += 15;
    }
    for (let i2 = Math.ceil(nibbles.length / 2); i2 < 18; i2++) {
      bytes[i2] = 255;
    }
    let sleepDuration = 0;
    for (const nibble of nibbles) {
      sleepDuration += nibbleDuration(nibble);
    }
    this.experimentalDebugLog("WRITING:", buf2hex3(bytes));
    await this.moveCharacteristic.writeValue(bytes);
    await sleep(sleepDuration * 0.75);
    while ((await this.getStatus()).movesRemaining > 0) {
    }
    await sleep(this.experimentalOptions.postSleep);
  }
  async getStatus() {
    const statusBytes = new Uint8Array(
      (await this.statusCharacteristic.readValue()).buffer
    );
    this.experimentalDebugLog("moves remaining:", statusBytes[0]);
    return {
      movesRemaining: statusBytes[0]
    };
  }
  processQueue() {
  }
  async queueMoves(moves) {
    this.moveQueue = this.moveQueue.concat(moves).experimentalSimplify({
      puzzleSpecificSimplifyOptions: cube3x3x3.puzzleSpecificSimplifyOptions
    });
    if (!this.locked) {
      try {
        this.locked = true;
        if (this.moveQueue.experimentalNumChildAlgNodes() === 1) {
          await sleep(this.experimentalOptions.bufferQueue);
        }
        while (this.moveQueue.experimentalNumChildAlgNodes() > 0) {
          let algNodes = Array.from(this.moveQueue.childAlgNodes());
          if (this.experimentalOptions.singleMoveFixHack && algNodes.length === 1) {
            const move = algNodes[0];
            if (move.amount === 2) {
              algNodes = [
                move.modified({ amount: 1 }),
                move.modified({ amount: 1 })
              ];
            } else {
              algNodes = [
                move.modified({ amount: -move.amount }),
                move.modified({ amount: 2 })
              ];
            }
          }
          const moves2 = algNodes.splice(0, MAX_NIBBLES_PER_WRITE);
          const nibbles = moves2.map(this.moveToNibble.bind(this));
          const sending = new Alg(moves2);
          this.experimentalDebugLog("SENDING", sending.toString());
          if (this.experimentalDebugOnSend) {
            this.experimentalDebugOnSend(sending);
          }
          const write = this.writeNibbles(nibbles);
          this.moveQueue = new Alg(algNodes);
          await write;
        }
      } finally {
        this.locked = false;
      }
    }
  }
  async applyMoves(moves) {
    for (const move of moves) {
      const str = move.toString();
      if (str in (this.experimentalOptions.xAngle ? moveMapX : moveMap2)) {
        await this.queueMoves(new Alg([move]));
      } else if (move.family === (this.experimentalOptions.xAngle ? "B" : "U")) {
        await Promise.all([
          this.queueMoves(
            this.experimentalOptions.xAngle ? F_B_SWAP : U_D_SWAP
          ),
          this.queueMoves(
            new Alg([
              move.modified({
                family: this.experimentalOptions.xAngle ? "F" : "D"
              })
            ]).concat(
              this.experimentalOptions.xAngle ? F_B_UNSWAP : U_D_UNSWAP
            )
          )
        ]);
      }
    }
  }
};
var ganTimerConfig = {
  connect: GanRobot.connect.bind(GanRobot),
  prefixes: ["GAN"],
  filters: [{ namePrefix: "GAN" }],
  optionalServices: [UUIDs5.ganRobotService]
};

// src/cubing/bluetooth/smart-robot/index.ts
var smartRobotConfigs = [ganTimerConfig];
async function connectSmartRobot(options) {
  return bluetoothConnect(smartRobotConfigs, options);
}

// src/cubing/bluetooth/smart-timer/GanTimer.ts
var UUIDs6 = {
  ganTimerService: "0000fff0-0000-1000-8000-00805f9b34fb",
  timeCharacteristic: "0000fff2-0000-1000-8000-00805f9b34fb"
};
var GanTimer = class extends EventTarget {
  constructor(_service, server, device, timeCharacteristic) {
    super();
    this.server = server;
    this.timeCharacteristic = timeCharacteristic;
    this.polling = false;
    this.previousDetail = null;
    this.startPolling();
    console.log(server);
    device.addEventListener(
      "gattserverdisconnected",
      this.onDisconnect.bind(this)
    );
  }
  static async connect(server, device) {
    const ganTimerService = await server.getPrimaryService(
      UUIDs6.ganTimerService
    );
    console.log("Service:", ganTimerService);
    const timeCharacteristic = await ganTimerService.getCharacteristic(
      UUIDs6.timeCharacteristic
    );
    console.log("Characteristic:", timeCharacteristic);
    const timer = new GanTimer(
      ganTimerService,
      server,
      device,
      timeCharacteristic
    );
    return timer;
  }
  disconnect() {
    this.server.disconnect();
  }
  async poll() {
    if (!this.polling) {
      return;
    }
    const value = await this.getTimeCharacteristic();
    const detail = {
      currentTime: this.decodeTimeMs(value.slice(0, 4)),
      latestTimes: [
        this.decodeTimeMs(value.slice(4, 8)),
        this.decodeTimeMs(value.slice(8, 12)),
        this.decodeTimeMs(value.slice(12, 16))
      ]
    };
    if (detail.currentTime === 0) {
      if (this.previousDetail && this.previousDetail.currentTime !== 0) {
        this.dispatchEvent(new CustomEvent("reset"));
      }
    }
    if (detail.currentTime !== 0 && this.previousDetail) {
      if (this.previousDetail.currentTime === 0) {
        this.dispatchEvent(new CustomEvent("start"));
      }
      if (detail.currentTime !== this.previousDetail.currentTime) {
        this.dispatchEvent(new CustomEvent("update", { detail }));
        if (detail.currentTime === detail.latestTimes[0] && detail.latestTimes[1] === this.previousDetail.latestTimes[0] && detail.latestTimes[2] === this.previousDetail.latestTimes[1]) {
          this.dispatchEvent(new CustomEvent("stop", { detail }));
        }
      }
    }
    this.previousDetail = detail;
    this.poll();
  }
  onDisconnect() {
    this.dispatchEvent(new CustomEvent("disconnect"));
  }
  async getTimeCharacteristic() {
    return new Uint8Array((await this.timeCharacteristic.readValue()).buffer);
  }
  async getTime() {
    const value = await this.getTimeCharacteristic();
    return this.decodeTimeMs(value.slice(0, 4));
  }
  decodeTimeMs(bytes) {
    return (bytes[0] * 60 + bytes[1]) * 1e3 + bytes[2] + bytes[3] * 256;
  }
  startPolling() {
    this.polling = true;
    this.poll();
  }
  stopPolling() {
    this.polling = false;
  }
};
var ganTimerConfig2 = {
  connect: GanTimer.connect.bind(GanTimer),
  prefixes: ["GAN"],
  filters: [{ namePrefix: "GAN" }],
  optionalServices: [UUIDs6.ganTimerService]
};

// src/cubing/bluetooth/smart-timer/index.ts
var smartTimerConfigs = [ganTimerConfig2];
async function connectSmartTimer(options) {
  return bluetoothConnect(smartTimerConfigs, options);
}
export {
  GanCube,
  GiiKERCube,
  GoCube,
  KeyboardPuzzle,
  connectSmartPuzzle,
  connectSmartRobot,
  connectSmartTimer,
  debugKeyboardConnect,
  enableDebugLogging
};
//# sourceMappingURL=index.js.map
