# my-async-store

## Introduction

There is a case that we have many asynchronous functions need to call, and they are probably in different files.

And we need to know the state of them.

That's a little trouble and this library make it simplify.

## Install

Install either in node or browser as you like.

```bash
npm i -D 'my-async-store'
```

or

```bash
yarn add -D 'my-async-store'
```

or

```html
<script src="./dist/my-async-store.umd.js"></script>
```

## Usage

in node:

```js
const { add, wait } = require('my-async-store')
```

or

```js
import { add, wait } from 'my-async-store'
```

or in browser:
```js
const { add, wait } = MyAsyncStore
```

**Then**

```js
// foo.js
setTimeout(() => {
  console.log('foo is ready')
  add('foo')
}, 10)
```

```js
// bar.js
setTimeout(() => {
  console.log('bar is ready')
  add('bar')
}, 20)
```

```js
// hello.js
wait('foo', 'bar').then(() => console.log('everyone is ready!'))
```


and console will logs

```js
// foo is ready
// bar is ready
// everyone is ready!
```

That's all! 

## Documentation

TODO 