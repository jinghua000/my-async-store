import { eq, equals } from './shared'
import { set, wait, namespace, clear } from '../src'

describe('test namespace', () => {

  beforeEach(clear)

  it('different namespace will not influence each other', done => {

    let arr = []

    namespace('foo').clear()

    namespace('foo').wait('foo').then(() => arr.push('bar'))
    wait('foo').then(() => arr.push('foo'))

    set('foo')
    namespace('foo').set('foo')

    setTimeout(() => {
      equals(arr, ['foo', 'bar'])

      done()
    }, 10)

  })

  it('namespace has all methods such as set, del, has...', () => {

    let mySpace = namespace('foo')
    mySpace.clear()

    eq('set' in mySpace, true)
    eq('get' in mySpace, true)
    eq('clear' in mySpace, true)
    eq('del' in mySpace, true)
    eq('has' in mySpace, true)
    eq('size' in mySpace, true)
    eq('storeMap' in mySpace, true)
    eq('wait' in mySpace, true)

  })

  it('namespace has extra property `namespace`', () => {

    let mySpace = namespace('foo')
    mySpace.clear()

    eq(mySpace.namespace, 'foo')

  })

  it('namespace methods not depend on context', () => {

    const { set, get, clear } = namespace('foo')
    clear()

    set('foo', 'foo')
    eq(get('foo'), 'foo')

  })

})