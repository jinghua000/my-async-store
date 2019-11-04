import { equals } from './shared'
import { set, all, clear } from '../src'

describe('test all', () => {

  beforeEach(clear)

  it('should return all set keys and values to pairs', () => {

    set('a', 1)
    set('b', 2)
    set('c', 3)
    equals(all(), [['a', 1], ['b', 2], ['c', 3]])

  })

  it('same keys will replace old one but will not change order', () => {

    set('a', 1)
    set('b', 2)
    set('b', 3)
    set('a', 4)
    equals(all(), [['a', 4], ['b', 3]])

  })

})