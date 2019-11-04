import { equals } from './shared'
import { set, keys, clear } from '../src'

describe('test keys', () => {

  beforeEach(clear)

  it('should return keys been set', () => {

    set('a')
    set('b')
    set('c')
    equals(keys(), ['a', 'b', 'c'])

  })

  it('same keys will replace old one but will not change order', () => {

    set('a', 1)
    set('b', 2)
    set('b', 3)
    set('a', 4)
    equals(keys(), ['a', 'b'])

  })

})