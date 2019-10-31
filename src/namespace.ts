import { AsyncStore, createAsyncStore } from './core'

const globalStoreMap: Map<any, AsyncStore> = new Map()

/**
 * Return the async store with the supplied namespace.
 * 
 * The result object has all other exports methods,
 * and have the extra property `namespace`, means the namespace's name.
 * 
 * Different namespace store will not make influence to each other.
 * 
 * API declare detail check [AsyncStore](../types/core.d.ts)
 * 
 * @param {any} namespace - namespace's name.
 * @return {AsyncStore}
 */
export function namespace (namespace: any): AsyncStore {
  if (globalStoreMap.has(namespace)) {
    return globalStoreMap.get(namespace)
  } 
  
  const store = createAsyncStore()
  store.namespace = namespace

  globalStoreMap.set(namespace, store)
  return store
}
