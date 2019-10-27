import { AsyncStore, createAsyncStore } from './core'

const storeMap: Map<any, AsyncStore> = new Map()

export function namespace (namespace: any): AsyncStore {
  if (storeMap.has(namespace)) {
    return storeMap.get(namespace)
  } 
  
  const store = createAsyncStore()
  store.namespace = namespace

  storeMap.set(namespace, store)
  return store
}
