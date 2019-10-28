import { namespace } from './namespace';
export declare const add: (sign: any) => void;
export declare const del: (sign: any) => Boolean;
export declare const has: (sign: any) => Boolean;
export declare const wait: (...signs: any) => Promise<void>;
export declare const clear: () => void;
export declare const size: () => number;
export declare const store: Set<any>;
export { namespace };
