import { eq, equals } from './shared'
import { store, clear, add } from '../src'

describe('test store', () => {

  beforeEach(clear)

  it('store is an instance of Set', () => {

    eq(store instanceof Set, true)

  })

  it('store contains async signs', () => {

    add('foo')
    add('bar')
    add('foo')

    eq(store.has('foo'), true)
    eq(store.has('bar'), true)
    eq(store.has('baz'), false)
    eq(store.size, 2)
    equals([...store], ['foo', 'bar'])

  })

})