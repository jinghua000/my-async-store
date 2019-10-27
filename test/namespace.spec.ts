import { eq } from './shared'
import { add, wait, namespace, clear } from '../src'

describe('test namespace', () => {

  beforeEach(clear)

  it('different namespace will not influence each other', done => {

    let num1 = 0
    let num2 = 0

    namespace('foo').clear()

    add('foo')
    namespace('foo').add('bar')

    wait('foo', 'bar').then(() => num1 += 1)
    namespace('foo').wait('bar').then(() => num2 += 1)

    setTimeout(() => {
      eq(num1, 0)
      eq(num2, 1)

      done()
    }, 10)

  })

  it('namespace has all methods such as add, del, has...', () => {

    let mySpace = namespace('foo')
    mySpace.clear()

    eq('add' in mySpace, true)
    eq('clear' in mySpace, true)
    eq('del' in mySpace, true)
    eq('has' in mySpace, true)
    eq('size' in mySpace, true)
    eq('store' in mySpace, true)
    eq('wait' in mySpace, true)

  })

  it('namespace has extra property `namespace`', () => {

    let mySpace = namespace('foo')
    mySpace.clear()

    eq(mySpace.namespace, 'foo')

  })

})