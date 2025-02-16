"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestUtils = void 0;
const getURLObject = (request) => {
    var _a;
    return new URL(`http://${request.headers.host}${(_a = request.url) !== null && _a !== void 0 ? _a : '/'}`);
};
exports.requestUtils = {
    getURLObject
};
