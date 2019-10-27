declare type StoreSet = Set<any>;
declare type Sign = any;
export interface AsyncStore {
    add: (sign: Sign) => void;
    wait: (...signs: Sign) => Promise<void>;
    has: (sign: Sign) => Boolean;
    del: (sign: Sign) => Boolean;
    clear: () => void;
    size: () => number;
    readonly store: StoreSet;
    namespace?: any;
}
export declare function createAsyncStore(): AsyncStore;
export {};
