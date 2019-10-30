import { namespace } from './namespace'

const defaultStore = namespace(
  Symbol('my-async-store')
)

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
export const set = defaultStore.set

/**
 * Read the supplied sign corresponding payload,
 * if not exist or not been set return `undefined`.
 * 
 * @param {*} sign
 * @returns {*}
 */
export const get = defaultStore.get

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
export const wait = defaultStore.wait

/**
 * Delete a sign from the store,
 * if not exist will return false, else true.
 * 
 * @param {*} sign
 * @returns {boolean}
 */
export const del = defaultStore.del

/**
 * Check the sign whether exist in the store.
 * 
 * @param {*} sign
 * @returns {boolean}
 */
export const has = defaultStore.has

/**
 * Clear all signs from store.
 * 
 * @returns {void}
 */
export const clear = defaultStore.clear

/**
 * Return the number of signs.
 * 
 * @returns {number}
 */
export const size = defaultStore.size

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
export const storeMap = defaultStore.storeMap

export { namespace }