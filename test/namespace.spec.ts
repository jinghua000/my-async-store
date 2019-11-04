import { eq } from './shared'
import { set, get, namespace, clear } from '../src'

describe('test namespace', () => {

  beforeEach(clear)

  it('different namespace will not influence each other', () => {

    namespace('foo').clear()

    set('foo', 123)
    namespace('foo').set('foo', 234)

    eq(get('foo'), 123)
    eq(namespace('foo').get('foo'), 234)

  })

  it('namespace has all methods such as set, del, has...', () => {

    let mySpace = namespace('foo')
    mySpace.clear()

    eq('set' in mySpace, true)
    eq('get' in mySpace, true)
    eq('clear' in mySpace, true)
    eq('del' in mySpace, true)
    eq('has' in mySpace, true)
    eq('keys' in mySpace, true)
    eq('values' in mySpace, true)
    eq('all' in mySpace, true)
    eq('size' in mySpace, true)
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