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
 * @param {any} namespace - namespace's name.
 * @return {AsyncStore}
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
 */
var set = defaultStore.set;
/**
 * Read the supplied sign corresponding payload,
 * if not exist or not been set return `undefined`.
 *
 * @param {*} sign
 * @returns {*}
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
 */
var wait = defaultStore.wait;
/**
 * Delete a sign from the store,
 * if not exist will return false, else true.
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
 * Clear all signs from store.
 *
 * @returns {void}
 */
var clear = defaultStore.clear;
/**
 * Return the number of signs.
 *
 * @returns {number}
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
 */
var storeMap = defaultStore.storeMap;

export { clear, del, get, has, namespace, set, size, storeMap, wait };
