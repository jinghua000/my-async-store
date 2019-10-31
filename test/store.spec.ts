import { eq, equals } from './shared'
import { storeMap, clear, set } from '../src'

describe('test storeMap', () => {

  beforeEach(clear)

  it('storeMap is an instance of Map', () => {

    eq(storeMap instanceof Map, true)

  })

  it('storeMap contains async signs', () => {

    set('foo', 123)
    set('bar', 234)

    eq(storeMap.has('foo'), true)
    eq(storeMap.has('bar'), true)
    eq(storeMap.has('baz'), false)
    eq(storeMap.size, 2)
    equals([...storeMap.keys()], ['foo', 'bar'])
    equals([...storeMap.values()], [123, 234])

  })

})