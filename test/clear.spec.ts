import { eq } from './shared'
import { set, clear, has } from '../src'

describe('test clear', () => {

  beforeEach(clear)

  it('cleared sign will not exist', () => {

    set('foo')

    clear()

    eq(has('foo'), false)

  })

})