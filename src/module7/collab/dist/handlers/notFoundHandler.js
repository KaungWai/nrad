"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = notFoundHandler;
function notFoundHandler(request, response) {
    response.writeHead(404, {
        "Content-Type": "application/json",
    });
    const responseData = { path: 'unknown' };
    response.end(JSON.stringify(responseData));
}
