import { AsyncStore, createAsyncStore } from './core'

const storeMap: Map<any, AsyncStore> = new Map()

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
export function namespace (namespace: any): AsyncStore {
  if (storeMap.has(namespace)) {
    return storeMap.get(namespace)
  } 
  
  const store = createAsyncStore()
  store.namespace = namespace

  storeMap.set(namespace, store)
  return store
}
