export interface AsyncStore<K, V> {
    set: (sign: K, payload?: V) => void;
    wait: (...signs: K[]) => Promise<void>;
    get: (sign: K) => V;
    has: (sign: K) => Boolean;
    del: (sign: K) => Boolean;
    keys: () => K[];
    values: () => V[];
    all: () => Array<Array<K | V>>;
    clear: () => void;
    size: () => number;
    clearDeps: () => void;
    namespace?: any;
}
export declare function createAsyncStore(): AsyncStore<any, any>;
