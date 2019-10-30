(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.MyAsyncStore = {}));
}(this, (function (exports) { 'use strict';

  var call = function (fn) { return fn(); };
  var removeFrom = function (deps) { return function (fn) {
      for (var i = 0; i < deps.length; i++) {
          if (deps[i] === fn) {
              deps.splice(i, 1);
              return;
          }
      }
  }; };

  function createAsyncStore() {
      var store = new Set();
      var deps = [];
      var remove = removeFrom(deps);
      var isCompleted = function (signs) {
          return signs.map(store.has.bind(store)).every(Boolean);
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
                  if (isCalled) {
                      throw new Error('Called More Than One Times!');
                  }
                  isCalled = true;
                  remove(run);
                  resolve();
              };
              run();
              // if `run` not completely called, push to the `deps`
              isCalled || deps.push(run);
          });
      }
      return {
          wait: wait,
          store: store,
          add: function (sign) { return store.add(sign) && deps.forEach(call); },
          del: function (sign) { return store["delete"](sign); },
          has: function (sign) { return store.has(sign); },
          clear: function () { return store.clear(); },
          size: function () { return store.size; },
      };
  }

  var storeMap = new Map();
  /**
   * Return the store with the namespace of the supplied namespace's name.
   *
   * The result object has all other exports methods,
   * and have the extra property `namespace`, means the supplied namespace's name.
   *
   * Different namespace store will not make influence to each other.
   *
   * @param {any} namespace - namespace's name.
   * @return {object}
   */
  function namespace(namespace) {
      if (storeMap.has(namespace)) {
          return storeMap.get(namespace);
      }
      var store = createAsyncStore();
      store.namespace = namespace;
      storeMap.set(namespace, store);
      return store;
  }

  var defaultStore = namespace(Symbol('my-async-store'));
  /**
   * Add an sign to the default store,
   * and only this method can trigger `wait`.
   *
   * @param {*} sign
   * @returns {void}
   */
  var add = defaultStore.add;
  /**
   * Check the supplied signs are all added,
   * when succeed, resolve a `Promise`.
   *
   * And first add signs, then call this method will also be work.
   *
   * @param {...*} signs
   * @returns {Promise<void>}
   */
  var wait = defaultStore.wait;
  /**
   * Delete a sign from the store.
   *
   * @param {*} sign
   * @returns {boolean}
   */
  var del = defaultStore.del;
  /**
   * Check the sign whether exist in the store.
   *
   * @param {*} sign
   * @returns {boolean}
   */
  var has = defaultStore.has;
  /**
   * Clear all signs.
   *
   * @return {void}
   */
  var clear = defaultStore.clear;
  /**
   * Return the number of signs.
   *
   * @return {number}
   */
  var size = defaultStore.size;
  /**
   * Is the property point to the raw `Set` of the store,
   * and **DO NOT** edit this object directly.
   *
   * @type {Set<any>}
   */
  var store = defaultStore.store;

  exports.add = add;
  exports.clear = clear;
  exports.del = del;
  exports.has = has;
  exports.namespace = namespace;
  exports.size = size;
  exports.store = store;
  exports.wait = wait;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
