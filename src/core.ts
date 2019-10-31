import { removeFrom, call } from './shared'

type StoreMap = Map<any, any>

export interface AsyncStore {
  set: (sign: any, payload?: any) => void
  wait: (...signs: any) => Promise<StoreMap>
  get: (sign: any) => any
  has: (sign: any) => Boolean
  del: (sign: any) => Boolean
  clear: () => void
  size: () => number
  readonly storeMap: StoreMap
  namespace?: any
}

export function createAsyncStore (): AsyncStore {

  const storeMap: StoreMap = new Map()
  const deps: Function[] = []
  const remove = removeFrom(deps)
  const isCompleted = (signs: any[]): Boolean => 
    signs.map(storeMap.has.bind(storeMap)).every(Boolean)

  function wait (...signs: any): Promise<StoreMap> {
    return new Promise(resolve => {

      let isCalled = false

      const run = (): void => {
        if (!isCompleted(signs)) { return }
        if (isCalled) { throw new Error('Called More Than One Times!') } 
        
        isCalled = true
        remove(run)
        resolve(storeMap)
      }

      run()

      // if `run` not completely called, push to the `deps`
      isCalled || deps.push(run)
    })
  }

  return {
    wait,
    storeMap,
    // here needs shallow copy since that function in deps are using splice.
    set: (sign, payload) => storeMap.set(sign, payload) && [].concat(deps).forEach(call),
    get: sign => storeMap.get(sign),
    del: sign => storeMap.delete(sign),
    has: sign => storeMap.has(sign),
    clear: () => storeMap.clear(),
    size: () => storeMap.size,
  }
}