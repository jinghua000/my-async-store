import { eq } from './shared'
import { add, del, wait, clear } from '../src'

describe('test del', () => {

  beforeEach(clear)

  it('deleted async sign will not trigger wait.', done => {

    let num = 0

    add('foo')
    del('foo')
    wait('foo', () => {
      num += 1
    })

    setTimeout(() => {
      eq(num, 0)
      done()
    }, 10)

  })

  it('if sign is exist, del method will return true, else false.', () => {
    add('foo')

    eq(del('foo'), true)
    eq(del('bar'), false)
  })

})