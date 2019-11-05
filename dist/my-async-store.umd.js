(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.MyAsyncStore = {}));
}(this, (function (exports) { 'use strict';

  var call = function (fn) { return fn(); };

  function createAsyncStore() {
      var storeMap = new Map();
      var deps = new Set();
      var isCompleted = function (signs) {
          return signs.map(storeMap.has.bind(storeMap)).every(Boolean);
      };
      function wait() {
          var signs = [];
          for (var _i = 0; _i < arguments.length; _i++) {
              signs[_i] = arguments[_i];
          }
          return new Promise(function (resolve) {
              var isCalled = false;
              var run = function () {
                  if (!isCompleted(signs)) {
                      return;
                  }
                  /* istanbul ignore next */
                  if (isCalled) {
                      throw new Error('Called More Than One Times!');
                  }
                  isCalled = true;
                  deps["delete"](run);
                  resolve();
              };
              run();
              // if `run` not completely called, add to the `deps`
              isCalled || deps.add(run);
          });
      }
      return {
          wait: wait,
          set: function (sign, payload) { return storeMap.set(sign, payload) && deps.forEach(call); },
          get: function (sign) { return storeMap.get(sign); },
          del: function (sign) { return storeMap["delete"](sign); },
          has: function (sign) { return storeMap.has(sign); },
          keys: function () { return Array.from(storeMap.keys()); },
          values: function () { return Array.from(storeMap.values()); },
          all: function () { return Array.from(storeMap); },
          clear: function () { return storeMap.clear(); },
          size: function () { return storeMap.size; },
      };
  }

  var globalStoreMap = new Map();
  /**
   * Return the async store with the supplied namespace.
   *
   * The result object has all other exports methods,
   * and have the extra property `namespace`, means the namespace's name.
   *
   * Store with different namespace will not make influence to each other.
   *
   * API declare detail check [AsyncStore](../types/core.d.ts)
   *
   * @param {*} namespace
   * @return {AsyncStore}
   * @example
   *
   * const { set, get, wait } = namesapce('my-space')
   *
   * set('foo', 'bar')
   * get('foo') // => bar
   * wait('foo').then(() => console.log('works')) // logs: works
   * namespace('my-space').namespace // => my-space
   */
  function namespace(namespace) {
      if (globalStoreMap.has(namespace)) {
          return globalStoreMap.get(namespace);
      }
      var store = createAsyncStore();
      store.namespace = namespace;
      globalStoreMap.set(namespace, store);
      return store;
  }

  var defaultStore = namespace(Symbol('my-async-store'));
  /**
   * Set an sign to the default async store,
   * and only this method can trigger `wait`.
   *
   * And second parameter payload used to carry some extra message.
   *
   * The same sign will replace the old one.
   *
   * @param {*} sign
   * @param {*} [payload]
   * @returns {void}
   * @example
   *
   * wait('foo').then(
   *   () => console.log(`${get('foo')} is ready`)
   * )
   *
   * setTimeout() => set('foo', 'bar'), 30)
   *
   * // after 30 ms logs: bar is ready
   */
  var set = defaultStore.set;
  /**
   * Read the supplied sign corresponding payload,
   * if not exist or not been set return `undefined`.
   *
   * @param {*} sign
   * @returns {*}
   * @example
   *
   * let obj = {}
   *
   * set('foo', obj)
   * get('foo') === obj // => true
   * get('bar') // => undefined
   */
  var get = defaultStore.get;
  /**
   * Check the supplied signs are all been set,
   * when succeed, return a `Promise`, resolve `undefined`.
   *
   * And first set signs, then call this method will also work.
   *
   * @param {...*} signs
   * @returns {Promise<void>}
   * @example
   *
   * set('foo')
   * set('bar')
   *
   * wait('foo', 'bar').then(
   *   () => console.log('foo, bar is ready') // => logs succeed.
   * )
   */
  var wait = defaultStore.wait;
  /**
   * Delete a sign from the store,
   * if not exist will return false, else true.
   *
   * @param {*} sign
   * @returns {boolean}
   * @example
   *
   * set('foo')
   * del('foo') // => true
   * del('foo') // => false
   */
  var del = defaultStore.del;
  /**
   * Check the sign whether exist in the store.
   *
   * @param {*} sign
   * @returns {boolean}
   * @example
   *
   * set('foo')
   * has('foo') // => true
   * del('foo')
   * has('foo') // => false
   */
  var has = defaultStore.has;
  /**
   * Return all keys of the store.
   *
   * @returns {array}
   * @example
   *
   * set('foo')
   * set('bar')
   * keys() // => ['foo', 'bar']
   */
  var keys = defaultStore.keys;
  /**
   * Return all values of the store.
   *
   * @returns {array}
   * @example
   *
   * set('foo')
   * set('bar', 123)
   * values() // => [undefined, 'foo']
   */
  var values = defaultStore.values;
  /**
   * Return all keys and values of the store.
   *
   * @returns {array}
   * @example
   *
   * set('foo')
   * set('bar', 123)
   * all() // => [['foo', undefined], ['bar', 123]]
   */
  var all = defaultStore.all;
  /**
   * Clear all signs from store.
   *
   * @returns {void}
   * @example
   *
   * set('foo')
   * set('bar')
   * clear()
   * has('foo') // => false
   * has('bar') // => false
   */
  var clear = defaultStore.clear;
  /**
   * Return the number of signs.
   *
   * @returns {number}
   * @example
   *
   * set('foo')
   * size() // => 1
   * set('bar')
   * size() // => 2
   * clear()
   * size() // => 0
   */
  var size = defaultStore.size;

  exports.all = all;
  exports.clear = clear;
  exports.del = del;
  exports.get = get;
  exports.has = has;
  exports.keys = keys;
  exports.namespace = namespace;
  exports.set = set;
  exports.size = size;
  exports.values = values;
  exports.wait = wait;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
