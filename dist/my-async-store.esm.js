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

var defaultStore = namespace(Symbol('my-async-store'));
var add = defaultStore.add;
var del = defaultStore.del;
var has = defaultStore.has;
var wait = defaultStore.wait;
var clear = defaultStore.clear;
var size = defaultStore.size;
var store = defaultStore.store;

export { add, clear, del, has, namespace, size, store, wait };
