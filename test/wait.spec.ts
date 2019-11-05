import { eq, equals } from './shared'
import { set, wait, clear } from '../src'

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

  it('several waits will work together', done => {

    let arr = []

    wait('foo').then(() => arr.push('foo1'))
    wait('foo').then(() => arr.push('foo2'))
    wait('foo').then(() => arr.push('foo3'))

    set('foo')

    setTimeout(() => {
      equals(arr, ['foo1', 'foo2', 'foo3']) 
      done()
    }, 10)

  })

})