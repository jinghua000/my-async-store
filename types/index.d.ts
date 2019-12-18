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
export declare const set: (sign: any, payload?: any) => void;
/**
 * Read the supplied sign corresponding payload,
 * if not exist or not been set return `undefined`.
 *
 * @param {*} sign
 * @returns {*}
 * @example
 *
 * const obj = {}
 *
 * set('foo', obj)
 * get('foo') === obj // => true
 * get('bar') // => undefined
 */
export declare const get: (sign: any) => any;
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
export declare const wait: (...signs: any[]) => Promise<void>;
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
export declare const del: (sign: any) => Boolean;
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
export declare const has: (sign: any) => Boolean;
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
export declare const keys: () => any[];
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
export declare const values: () => any[];
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
export declare const all: () => any[][];
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
export declare const clear: () => void;
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
export declare const size: () => number;
/**
 * When several `wait` invoked, there will be many dependents inside the object.
 *
 * This method is used in order to clean them all.
 *
 * @returns {void}
 * @example
 *
 * const arr = []
 *
 * wait('foo').then(() => arr.push(1))
 * wait('foo').then(() => arr.push(2))
 * wait('foo').then(() => arr.push(3))
 *
 * clearDeps()
 *
 * wait('foo').then(() => arr.push(4))
 * wait('foo').then(() => arr.push(5))
 *
 * set('foo')
 *
 * console.log(arr) // => logs: [4, 5]
 */
export declare const clearDeps: () => void;
export { namespace };
