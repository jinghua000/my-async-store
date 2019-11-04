import { call } from './shared'

type StoreMap = Map<any, any>

export interface AsyncStore<K, V>{
  set: (sign: K, payload?: V) => void
  wait: (...signs: K[]) => Promise<void>
  get: (sign: K) => V
  has: (sign: K) => Boolean
  del: (sign: K) => Boolean
  keys: () => K[]
  values: () => V[]
  all: () => Array<Array<K|V>>
  clear: () => void
  size: () => number
  namespace?: any
}

export function createAsyncStore (): AsyncStore<any, any> {

  const storeMap: StoreMap = new Map()
  const deps: Set<Function> = new Set()
  const isCompleted = (signs: any[]): Boolean => 
    signs.map(storeMap.has.bind(storeMap)).every(Boolean)

  function wait (...signs: any): Promise<void> {
    return new Promise(resolve => {

      let isCalled = false

      const run = (): void => {
        if (!isCompleted(signs)) { return }
        if (isCalled) { throw new Error('Called More Than One Times!') } 
        
        isCalled = true
        deps.delete(run)
        resolve()
      }

      run()

      // if `run` not completely called, add to the `deps`
      isCalled || deps.add(run)
    })
  }

  return {
    wait,
    set: (sign, payload) => storeMap.set(sign, payload) && deps.forEach(call),
    get: sign => storeMap.get(sign),
    del: sign => storeMap.delete(sign),
    has: sign => storeMap.has(sign),
    keys: () => Array.from(storeMap.keys()),
    values: () => Array.from(storeMap.values()),
    all: () => Array.from(storeMap),
    clear: () => storeMap.clear(),
    size: () => storeMap.size,
  }
}