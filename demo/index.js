require('./foo')
require('./bar')

const { wait } = require('../dist/my-async-store.cjs')

wait('foo', 'bar').then(() => console.log('everyone is ready!'))
