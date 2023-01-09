import { K as KState } from '../KState-fa1880c8.js';
import '../Alg-c6770822.js';

type Binary3x3x3State = ArrayBuffer;
interface Binary3x3x3Components {
    epLex: number;
    eoMask: number;
    cpLex: number;
    coMask: number;
    poIdxU: number;
    poIdxL: number;
    moSupport: number;
    moMask: number;
}
/** @category Binary 3x3x3 Format */
declare function reid3x3x3ToTwizzleBinary(state: KState): Binary3x3x3State;
/** @category Binary 3x3x3 Format */
declare function twizzleBinaryToBinaryComponents(buffer: ArrayBuffer): Binary3x3x3Components;
/** @category Binary 3x3x3 Format */
declare function binaryComponentsToReid3x3x3(components: Binary3x3x3Components): KState;
/** @category Binary 3x3x3 Format */
declare function twizzleBinaryToReid3x3x3(buffy: ArrayBuffer): KState;

declare function bufferToSpacedHex(buffer: ArrayBuffer): string;
declare function spacedHexToBuffer(hex: string): Uint8Array;

export { binaryComponentsToReid3x3x3 as experimentalBinaryComponentsToReid3x3x3, bufferToSpacedHex as experimentalBufferToSpacedHex, reid3x3x3ToTwizzleBinary as experimentalReid3x3x3ToTwizzleBinary, spacedHexToBuffer as experimentalSpacedHexToBuffer, twizzleBinaryToBinaryComponents as experimentalTwizzleBinaryToBinaryComponents, twizzleBinaryToReid3x3x3 as experimentalTwizzleBinaryToReid3x3x3 };
