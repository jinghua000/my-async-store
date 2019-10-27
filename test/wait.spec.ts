import { eq } from './shared'
import { wait, clear } from '../src'

describe('test wait', () => {

  beforeEach(clear)

  it('wait nothing will work', done => {

    let num = 0

    wait().then(() => num += 1)

    setTimeout(() => {
      eq(num, 1)
      done()
    }, 10)

  })

})