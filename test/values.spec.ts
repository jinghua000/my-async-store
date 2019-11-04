import { equals } from './shared'
import { set, values, clear } from '../src'

describe('test values', () => {

  beforeEach(clear)

  it('should return values been set', () => {

    set('a', 1)
    set('b', 2)
    set('c', 3)
    equals(values(), [1, 2, 3])

  })

  it('same keys will replace old one but will not change order', () => {

    set('a', 1)
    set('b', 2)
    set('b', 3)
    set('a', 4)
    equals(values(), [4, 3])

  })

})