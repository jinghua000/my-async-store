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
 * when succeed, return a `Promise`, resolve `undefined`.
 * 
 * And first set signs, then call this method will also work. 
 * 
 * @param {...*} signs
 * @returns {Promise<void>}
 * @example
 * 
 * set('foo')
 * set('bar')
 * 
 * wait('foo', 'bar').then(
 *   () => console.log('foo, bar is ready') // => logs succeeded.
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

/**
 * Return all keys of the store.
 * 
 * @returns {array}
 * @example 
 * 
 * set('foo')
 * set('bar')
 * keys() // => ['foo', 'bar']
 */
export const keys = defaultStore.keys

/**
 * Return all values of the store. 
 * 
 * @returns {array}
 * @example
 * 
 * set('foo')
 * set('bar', 123)
 * values() // => [undefined, 123]
 */
export const values = defaultStore.values

/**
 * Return all keys and values of the store.
 * 
 * @returns {array}
 * @example
 * 
 * set('foo')
 * set('bar', 123)
 * all() // => [['foo', undefined], ['bar', 123]]
 */
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