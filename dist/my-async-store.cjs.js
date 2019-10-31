'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    var storeMap = new Map();
    var deps = [];
    var remove = removeFrom(deps);
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
                if (isCalled) {
                    throw new Error('Called More Than One Times!');
                }
                isCalled = true;
                remove(run);
                resolve(storeMap);
            };
            run();
            // if `run` not completely called, push to the `deps`
            isCalled || deps.push(run);
        });
    }
    return {
        wait: wait,
        storeMap: storeMap,
        // here needs shallow copy since that function in deps are using splice.
        set: function (sign, payload) { return storeMap.set(sign, payload) && [].concat(deps).forEach(call); },
        get: function (sign) { return storeMap.get(sign); },
        del: function (sign) { return storeMap["delete"](sign); },
        has: function (sign) { return storeMap.has(sign); },
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
 * Different namespace store will not make influence to each other.
 *
 * API declare detail check [AsyncStore](../types/core.d.ts)
 *
 * @param {any} namespace
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
 *   map => console.log(`${map.get('foo')} is ready`)
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
 * when succeed, return a `Promise`,
 * it will resolve the [storeMap](#storeMap)
 * where can get the message you have ever set.
 *
 * And first set signs, then call this method will also work.
 *
 * @param {...*} signs
 * @returns {Promise<Map>}
 * @example
 *
 * set('foo')
 * set('bar')
 *
 * wait('foo', 'bar').then(
 *   map => map === storeMap // => true
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
/**
 * The property point to the raw `Map` of the store.
 *
 * When set signs to the store, first parameter as the Map key,
 * second parameter as the Map value.
 *
 * And it's only used to read,
 * **DO NOT** edit this object directly.
 *
 * @type {Map}
 * @example
 *
 * set('foo', 123)
 * set('bar', 234)
 *
 * storeMap.get('foo') // => 123
 * storeMap.get('bar') // => 123
 * [...storeMap.keys()] // => ['foo', 'bar']
 * [...storeMap.values()] // => [123, 234]
 */
var storeMap = defaultStore.storeMap;

exports.clear = clear;
exports.del = del;
exports.get = get;
exports.has = has;
exports.namespace = namespace;
exports.set = set;
exports.size = size;
exports.storeMap = storeMap;
exports.wait = wait;
