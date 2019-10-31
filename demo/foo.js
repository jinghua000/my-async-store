const { set } = require('../dist/my-async-store.cjs')

setTimeout(() => {
  console.log('foo is ready')
  set('foo')
}, 10)