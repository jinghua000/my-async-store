import { eq } from './shared'
import { add, clear, wait } from '../src'

describe('test clear', () => {

  beforeEach(clear)

  it('cleared sign will not trigger wait', done => {

    let num = 0 

    add('foo')
    clear()

    wait('foo', () => num += 1)

    setTimeout(() => {
      eq(num, 0)
      done()
    }, 10)

  })

})