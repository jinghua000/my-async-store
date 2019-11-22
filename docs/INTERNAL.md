# Internal Implementation

Okay, let's talk about something of internal implementation.

Mainly methods are `set` and `wait`, they export from `AsyncStore` object. And `AsyncStore` object created by a factory function `createAsyncStore`.

Types seems like this

```ts
function createAsyncStore(): AsyncStore<any, any>;
```

See also [Main Code](../src/core.ts).