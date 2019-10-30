import { eq } from './shared'
import { set, wait, clear } from '../src'

describe('test set', () => {

  beforeEach(clear)

  it('wait promise should execute after all specified signs been set', done => {

    let num = 0

    setTimeout(() => {
      num += 1
      set('foo')
    }, 10)

    setTimeout(() => {
      num += 1
      set('bar')
    }, 20)

    setTimeout(() => {
      num += 1
      set('baz')
    }, 30)

    wait('foo', 'bar', 'baz').then(() => {
      eq(num, 3)
      done()
    })

  })

  it('once wait promise completed, will not be called any more', done => {
    
    let num = 0

    setTimeout(() => {
      num += 1
      set('foo')
    }, 10)

    setTimeout(() => {
      num += 1
      set('foo')
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

  it('first set, then declared wait should work', done => {

    let num = 0

    set('foo')

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

  it('set can pass the context to the wait', done => {

    let obj = {}

    wait('foo', 'bar').then(map => {
      eq(map.get('foo'), obj)
      eq(map.get('bar'), 123)
      eq(map.size, 2)
      
      done()
    })

    set('foo', obj)
    set('bar', 123)

  })

})