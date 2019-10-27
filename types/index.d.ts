import { namespace } from './namespace';
declare const add: (sign: any) => void, del: (sign: any) => Boolean, has: (sign: any) => Boolean, wait: (...signs: any) => Promise<void>, clear: () => void, size: () => number, store: Set<any>;
export { add, del, has, wait, clear, size, store };
export { namespace };
