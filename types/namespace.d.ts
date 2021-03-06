import { AsyncStore } from './core';
/**
 * Return the async store with the supplied namespace.
 *
 * The result object has all other exports methods,
 * and have the extra property `namespace`, means the namespace's name.
 *
 * Store with different namespace will not make influence to each other.
 *
 * API declare detail check [AsyncStore](../types/core.d.ts)
 *
 * @param {*} namespace
 * @return {AsyncStore}
 * @example
 *
 * const { set, get, wait } = namesapce('my-space')
 *
 * set('foo', 'bar')
 * get('foo') // => bar
 * wait('foo').then(() => console.log('works')) // logs: works
 * namespace('my-space').namespace // => my-space
 */
export declare function namespace(namespace: any): AsyncStore<any, any>;
