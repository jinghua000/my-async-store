"use strict";
exports.__esModule = true;
var core_1 = require("./core");
var storeMap = new Map();
function namespace(namespace) {
    if (storeMap.has(namespace)) {
        return storeMap.get(namespace);
    }
    var store = core_1.createAsyncStore();
    store.namespace = namespace;
    storeMap.set(namespace, store);
    return store;
}
exports.namespace = namespace;
