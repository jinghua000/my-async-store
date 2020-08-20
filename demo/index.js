require('./foo')
require('./bar')

console.log('script start')

const { wait } = require('../dist/my-async-store.cjs')

wait('foo', 'bar').then(() => console.log('everyone is ready!'))

console.log('script end')