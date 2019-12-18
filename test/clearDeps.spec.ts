import { equals } from './shared'
import { clear, set, wait, clearDeps } from '../src'

describe('test clearDeps', () => {

  beforeEach(clear)

  it('deps should be cleared after clearDeps invoked', done => {

    const arr = []

    wait('foo').then(() => arr.push(1))
    wait('foo').then(() => arr.push(2))
    wait('foo').then(() => arr.push(3))

    clearDeps()

    wait('foo').then(() => arr.push(4))
    wait('foo').then(() => arr.push(5))

    set('foo')

    setTimeout(() => {
      equals(arr, [4, 5])
      done()
    }, 10)

  })

})