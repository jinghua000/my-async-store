import { namespace } from './namespace';
/**
 * Set an sign to the default async store,
 * and only this method can trigger `wait`.
 *
 * And second parameter payload used to carry some extra message.
 *
 * The same sign will replace the old one.
 *
 * @param {*} sign
 * @param {*} [payload]
 * @returns {void}
 */
export declare const set: (sign: any, payload?: any) => void;
/**
 * Read the supplied sign corresponding payload,
 * if not exist or not been set return `undefined`.
 *
 * @param {*} sign
 * @returns {*}
 */
export declare const get: (sign: any) => any;
/**
 * Check the supplied signs are all been set,
 * when succeed, return a `Promise`,
 * it will resolve the [storeMap](#storeMap)
 * where can get the message you have ever set.
 *
 * And first set signs, then call this method will also work.
 *
 * @param {...*} signs
 * @returns {Promise<Map>}
 */
export declare const wait: (...signs: any) => Promise<Map<any, any>>;
/**
 * Delete a sign from the store,
 * if not exist will return false, else true.
 *
 * @param {*} sign
 * @returns {boolean}
 */
export declare const del: (sign: any) => Boolean;
/**
 * Check the sign whether exist in the store.
 *
 * @param {*} sign
 * @returns {boolean}
 */
export declare const has: (sign: any) => Boolean;
/**
 * Clear all signs from store.
 *
 * @returns {void}
 */
export declare const clear: () => void;
/**
 * Return the number of signs.
 *
 * @returns {number}
 */
export declare const size: () => number;
/**
 * The property point to the raw `Map` of the store.
 *
 * When set signs to the store, first parameter as the Map key,
 * second parameter as the Map value.
 *
 * And it's only used to read,
 * **DO NOT** edit this object directly.
 *
 * @type {Map}
 */
export declare const storeMap: Map<any, any>;
export { namespace };
