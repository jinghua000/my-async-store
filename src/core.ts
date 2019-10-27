import { removeFrom, call } from './shared'

type StoreSet = Set<any> 
type Sign = any

export interface AsyncStore {
  add: (sign: Sign) => void
  wait: (...signs: Sign) => Promise<void>
  has: (sign: Sign) => Boolean
  del: (sign: Sign) => Boolean
  clear: () => void
  size: () => number
  readonly store: StoreSet
  namespace?: any
}

export function createAsyncStore (): AsyncStore {

  const store: StoreSet = new Set()
  const deps: Function[] = []
  const remove = removeFrom(deps)
  const isCompleted = (signs: Sign[]): Boolean => 
    signs.map(store.has.bind(store)).every(Boolean)

  function wait (...signs: Sign): Promise<void> {
    return new Promise(resolve => {

      let isCalled = false

      const run = (): void => {
        if (!isCompleted(signs)) { return }
        if (isCalled) { throw new Error('Called More Than One Times!') } 
        
        isCalled = true
        remove(run)
        resolve()
      }

      run()

      // if `run` not completely called, push to the `deps`
      isCalled || deps.push(run)
    })
  }

  return {
    wait,
    store,
    add: sign => store.add(sign) && deps.forEach(call),
    del: sign => store.delete(sign),
    has: sign => store.has(sign),
    clear: () => store.clear(),
    size: () => store.size,
  }
}