import { eq } from './shared'
import { clear, size, set } from '../src'

describe('test size', () => {

  beforeEach(clear)

  it('should return the number of async signs', () => {

    set('foo')  
    set('bar')  
    set('baz')  

    eq(size(), 3)

    clear()

    eq(size(), 0)

  })

})