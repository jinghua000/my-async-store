import { namespace } from './namespace'

const { add, del, has, wait, clear, size, store } = namespace(
  Symbol('my-async-store')
)

export { add, del, has, wait, clear, size, store }
export { namespace }