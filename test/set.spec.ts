import { eq } from './shared'
import { set, get, wait, clear } from '../src'

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
      eq(num, 1)
    })

    setTimeout(() => {
      eq(num, 2)
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

  it('set can pass payload to the wait', done => {

    let obj = {}

    wait('foo', 'bar').then(() => {
      eq(get('foo'), obj)
      eq(get('bar'), 123)
      
      done()
    })

    set('foo', obj)
    set('bar', 123)

  })

  it('several same signs payload set in sync should trigger the last one', done => {
    // That's because `wait` resolve a `promise`, it's a micro task, 
    // will called after synchronous tasks.

    wait('foo').then(() => {
      eq(get('foo'), 'baz')
      done()
    })

    set('foo', 'foo')
    set('foo', 'bar')
    set('foo', 'baz')
    
  })

  it('several same signs payload set in async(setTimeout) should trigger the first one', done => {

    wait('foo').then(() => {
      eq(get('foo'), 'foo')
      done()
    })

    setTimeout(() => {
      set('foo', 'foo')
    }, 10)

    setTimeout(() => {
      set('foo', 'bar')
    }, 20)
    
  })

  it('several same signs payload set in async(Promise) should trigger the first one', done => {

    wait('foo').then(() => {
      eq(get('foo'), 'foo')
      done()
    })

    Promise
      .resolve()
      .then(() => set('foo', 'foo'))
      .then(() => set('foo', 'bar'))

  })


})