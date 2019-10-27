import { eq } from './shared'
import { add, del, has, clear } from '../src'

describe('test has', () => {

  beforeEach(clear)

  it('check added sign should return true.', () => {
    add('foo')

    eq(has('foo'), true)
  })

  it('check deleted sign should return false.', () => {
    add('foo')
    del('foo')

    eq(has('foo'), false)
  })

})