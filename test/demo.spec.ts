import { eq, equals } from './shared'
import { clear } from '../src'

describe('demo', () => {

  beforeEach(clear)

  it('demo', () => {

    eq(1, 1)
    equals([1, 2, 3], [1, 2, 3])

  })

})