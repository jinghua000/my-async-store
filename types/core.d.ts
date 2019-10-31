declare type StoreMap = Map<any, any>;
export interface AsyncStore {
    set: (sign: any, payload?: any) => void;
    wait: (...signs: any) => Promise<StoreMap>;
    get: (sign: any) => any;
    has: (sign: any) => Boolean;
    del: (sign: any) => Boolean;
    clear: () => void;
    size: () => number;
    readonly storeMap: StoreMap;
    namespace?: any;
}
export declare function createAsyncStore(): AsyncStore;
export {};
