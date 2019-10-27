"use strict";
exports.__esModule = true;
var shared_1 = require("./shared");
function createAsyncStore() {
    var store = new Set();
    var deps = [];
    var remove = shared_1.removeFrom(deps);
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
        add: function (sign) { return store.add(sign) && deps.forEach(shared_1.call); },
        del: function (sign) { return store["delete"](sign); },
        has: function (sign) { return store.has(sign); },
        clear: function () { return store.clear(); },
        size: function () { return store.size; }
    };
}
exports.createAsyncStore = createAsyncStore;
