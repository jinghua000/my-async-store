import { namespace } from './namespace'

const defaultStore = namespace(
  Symbol('my-async-store')
)

export const add = defaultStore.add
export const del = defaultStore.del
export const has = defaultStore.has
export const wait = defaultStore.wait
export const clear = defaultStore.clear
export const size = defaultStore.size
export const store = defaultStore.store
export { namespace }