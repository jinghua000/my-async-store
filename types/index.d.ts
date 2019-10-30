import { namespace } from './namespace';
/**
 * Add an sign to the default store,
 * and only this method can trigger `wait`.
 *
 * @param {*} sign
 * @returns {void}
 */
export declare const add: (sign: any) => void;
/**
 * Check the supplied signs are all added,
 * when succeed, resolve a `Promise`.
 *
 * And first add signs, then call this method will also be work.
 *
 * @param {...*} signs
 * @returns {Promise<void>}
 */
export declare const wait: (...signs: any) => Promise<void>;
/**
 * Delete a sign from the store.
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
 * Clear all signs.
 *
 * @return {void}
 */
export declare const clear: () => void;
/**
 * Return the number of signs.
 *
 * @return {number}
 */
export declare const size: () => number;
/**
 * Is the property point to the raw `Set` of the store,
 * and **DO NOT** edit this object directly.
 *
 * @type {Set<any>}
 */
export declare const store: Set<any>;
export { namespace };
