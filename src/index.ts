import { namespace } from './namespace'

const defaultStore = namespace(
  Symbol('my-async-store')
)

/**
 * Add an sign to the default store,
 * and only this method can trigger `wait`.
 * 
 * @param {*} sign 
 * @returns {void}
 */
export const add = defaultStore.add

/**
 * Check the supplied signs are all added,
 * when succeed, resolve a `Promise`.
 * 
 * And first add signs, then call this method will also be work. 
 * 
 * @param {...*} signs
 * @returns {Promise<void>}
 */
export const wait = defaultStore.wait

/**
 * Delete a sign from the store.
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
 * Clear all signs.
 * 
 * @return {void}
 */
export const clear = defaultStore.clear

/**
 * Return the number of signs.
 * 
 * @return {number}
 */
export const size = defaultStore.size

/**
 * Is the property point to the raw `Set` of the store,
 * and **DO NOT** edit this object directly.
 * 
 * @type {Set<any>}
 */
export const store = defaultStore.store

export { namespace }