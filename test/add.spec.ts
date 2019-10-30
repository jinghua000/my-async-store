import { eq } from './shared'
import { add, wait, clear } from '../src'
// TODO fix tests

describe('test add', () => {

  beforeEach(clear)

  it('wait promise should execute after all specified signs added', done => {

    let num = 0

    setTimeout(() => {
      num += 1
      add('foo')
    }, 10)

    setTimeout(() => {
      num += 1
      add('bar')
    }, 20)

    wait('foo', 'bar').then(() => {
      num += 1
      eq(num, 3)
    })

    setTimeout(() => {
      num += 1
      eq(num, 4)
      done()
    }, 30)

  })

  it('once wait promise completed, will not be called any more', done => {
    
    let num = 0

    setTimeout(() => {
      num += 1
      add('foo')
    }, 10)

    setTimeout(() => {
      num += 1
      add('foo')
    }, 20)

    wait('foo').then(() => {
      num += 1
      eq(num, 2)
    })

    setTimeout(() => {
      eq(num, 3)
      done()
    }, 30)

  })

  it('first added completed, then declared wait should work', done => {

    let num = 0

    add('foo')

    setTimeout(() => {
      wait('foo').then(() => {
        num += 1
        eq(num, 1)
      })
    }, 10)

    setTimeout(() => {
      eq(num, 1)
      done()
    }, 20)

  })

})