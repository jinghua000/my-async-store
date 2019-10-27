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
  function namespace(namespace) {
      if (storeMap.has(namespace)) {
          return storeMap.get(namespace);
      }
      var store = createAsyncStore();
      store.namespace = namespace;
      storeMap.set(namespace, store);
      return store;
  }

  var _a = namespace(Symbol('my-async-store')), add = _a.add, del = _a.del, has = _a.has, wait = _a.wait, clear = _a.clear, size = _a.size, store = _a.store;

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
