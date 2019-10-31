# my-async-store

[![Build Status](https://travis-ci.org/jinghua000/my-async-store.svg?branch=master)](https://travis-ci.org/jinghua000/my-async-store)
[![npm module](https://badge.fury.io/js/my-async-store.svg)](https://www.npmjs.com/package/my-async-store)
[![Dependency Status](https://david-dm.org/jinghua000/my-async-store.svg)](https://david-dm.org/jinghua000/my-async-store)

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
const { set, wait } = require('my-async-store')
```

or

```js
import { set, wait } from 'my-async-store'
```

or in browser:
```js
const { set, wait } = MyAsyncStore
```

**Then**

```js
// foo.js
setTimeout(() => {
  console.log('foo is ready')
  set('foo')
}, 10)
```

```js
// bar.js
setTimeout(() => {
  console.log('bar is ready')
  set('bar')
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

Further usage see [API documentation](./docs/API_DOCUMENTATION.md)