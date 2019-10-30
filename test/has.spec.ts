import { eq } from './shared'
import { set, del, has, clear } from '../src'

describe('test has', () => {

  beforeEach(clear)

  it('check sign been set should return true.', () => {
    set('foo')

    eq(has('foo'), true)
  })

  it('check deleted sign should return false.', () => {
    set('foo')
    del('foo')

    eq(has('foo'), false)
  })

})