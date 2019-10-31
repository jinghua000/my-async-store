const { set } = require('../dist/my-async-store.cjs')

setTimeout(() => {
  console.log('bar is ready')
  set('bar')
}, 20)