import { AsyncStore } from './core';
/**
 * Return the store with the namespace of the supplied namespace's name.
 *
 * The result object has all other exports methods,
 * and have the extra property `namespace`, means the supplied namespace's name.
 *
 * Different namespace store will not make influence to each other.
 *
 * @param {any} namespace - namespace's name.
 * @return {object}
 */
export declare function namespace(namespace: any): AsyncStore;
