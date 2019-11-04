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
 * @example
 * 
 * wait('foo').then(
 *   () => console.log(`${get('foo')} is ready`)
 * )
 * 
 * setTimeout() => set('foo', 'bar'), 30)
 * 
 * // after 30 ms logs: bar is ready
 */
export const set = defaultStore.set

/**
 * Read the supplied sign corresponding payload,
 * if not exist or not been set return `undefined`.
 * 
 * @param {*} sign
 * @returns {*}
 * @example
 * 
 * let obj = {}
 * 
 * set('foo', obj)
 * get('foo') === obj // => true
 * get('bar') // => undefined
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
 * @example
 * 
 * set('foo')
 * set('bar')
 * 
 * wait('foo', 'bar').then(
 *   map => map === storeMap // => true
 * )
 */
export const wait = defaultStore.wait

/**
 * Delete a sign from the store,
 * if not exist will return false, else true.
 * 
 * @param {*} sign
 * @returns {boolean}
 * @example
 * 
 * set('foo')
 * del('foo') // => true
 * del('foo') // => false
 */
export const del = defaultStore.del

/**
 * Check the sign whether exist in the store.
 * 
 * @param {*} sign
 * @returns {boolean}
 * @example
 * 
 * set('foo')
 * has('foo') // => true
 * del('foo')
 * has('foo') // => false
 */
export const has = defaultStore.has

export const keys = defaultStore.keys
export const values = defaultStore.values
export const all = defaultStore.all

/**
 * Clear all signs from store.
 * 
 * @returns {void}
 * @example
 * 
 * set('foo')
 * set('bar')
 * clear()
 * has('foo') // => false
 * has('bar') // => false
 */
export const clear = defaultStore.clear

/**
 * Return the number of signs.
 * 
 * @returns {number}
 * @example
 * 
 * set('foo')
 * size() // => 1
 * set('bar')
 * size() // => 2
 * clear()
 * size() // => 0
 */
export const size = defaultStore.size

export { namespace }