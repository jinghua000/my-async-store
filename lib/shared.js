"use strict";
exports.__esModule = true;
exports.call = function (fn) { return fn(); };
exports.removeFrom = function (deps) { return function (fn) {
    for (var i = 0; i < deps.length; i++) {
        if (deps[i] === fn) {
            deps.splice(i, 1);
            return;
        }
    }
}; };
