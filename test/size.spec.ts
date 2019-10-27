import { eq } from './shared'
import { clear, size, add } from '../src'

describe('test size', () => {

  beforeEach(clear)

  it('should return the async signs length', () => {

    add('foo')  
    add('bar')  
    add('baz')  

    eq(size(), 3)

    clear()

    eq(size(), 0)

  })

})