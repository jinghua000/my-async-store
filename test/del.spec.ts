import { eq } from './shared'
import { set, del, has, clear } from '../src'

describe('test del', () => {

  beforeEach(clear)

  it('deleted async sign will not exist.', () => {

    set('foo')
    del('foo')

    eq(has('foo'), false)

  })

  it('if sign is exist, del method will return true, else false.', () => {

    set('foo')

    eq(del('foo'), true)
    eq(del('bar'), false)
    
  })

})