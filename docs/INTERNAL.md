# Internal Implementation

Okay, let's talk about something of internal implementation.

Mainly methods are `set` and `wait`, they export from `AsyncStore` object, and `AsyncStore` object created by a factory function `createAsyncStore`.

Types seems like:

```ts
interface AsyncStore<K, V> {
  set: (sign: K, payload?: V) => void;
  wait: (...signs: K[]) => Promise<void>;
  // ...
}    

function createAsyncStore(): AsyncStore<any, any>;
```

Then, there are two important storage inside the `createAsyncStore` function.

- `storeMap` - `Map<any, any>` - used to save the sign which express the completion of the async.
- `deps` - `Set<Function>` - used to save the function for check whether the `storeMap` have enough async sign.

When `set` invoked:

1. Set async sign as the key to the `storeMap`.
2. Invoke every function in the `deps`.

When `wait` invoked:

1. New a `Promise`.
2. Set a function into `deps`, which check `storeMap` whether has all of the supplied keys, 
3. Once the function checked successfully, remove itself from the `deps` and resolve the `Promise`.

That's a simple `publish-subscribe`, isn't it?

See also [Main Code](../src/core.ts).