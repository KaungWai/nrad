"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rootHandler = rootHandler;
function rootHandler(request, response) {
    response.writeHead(200, {
        "Content-Type": "application/json",
    });
    const responseData = { path: 'root' };
    response.end(JSON.stringify(responseData));
}
