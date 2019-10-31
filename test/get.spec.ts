import { eq } from './shared'
import { set, get, clear } from '../src'

describe('test get', () => {

  beforeEach(clear)

  it('should get supplied sign corresponding payload', () => {

    set('foo', 'foo')

    eq(get('foo'), 'foo')

  })

  it('sign not been set payload or not exist should return undefined', () => {

    set('foo')

    eq(get('foo'), void 0)
    eq(get('bar'), void 0)

  })

  it('several same signs payload should get the last one', () => {

    set('foo', 123)
    set('foo', 234)

    eq(get('foo'), 234)

  })

})