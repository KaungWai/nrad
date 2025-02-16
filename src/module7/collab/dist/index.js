"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = __importDefault(require("node:http"));
const router_1 = require("./router");
const notFoundHandler_1 = require("./handlers/notFoundHandler");
const dotenv_1 = require("dotenv");
const requestUtils_1 = require("./utils/requestUtils");
(0, dotenv_1.config)();
const server = node_http_1.default.createServer();
server.on('request', (request, response) => {
    let rawBody = "";
    request.on('data', (chunk) => {
        rawBody += chunk;
    });
    request.on('end', () => {
        var _a;
        if (rawBody.trim() !== "") {
            request.myBody = JSON.parse(rawBody);
        }
        const urlObj = requestUtils_1.requestUtils.getURLObject(request);
        const handlers = (0, router_1.router)(urlObj);
        if (!handlers) {
            (0, notFoundHandler_1.notFoundHandler)(request, response);
        }
        else {
            const targetHandler = handlers[((_a = request.method) !== null && _a !== void 0 ? _a : '')];
            if (targetHandler) {
                targetHandler(request, response);
            }
            else {
                (0, notFoundHandler_1.notFoundHandler)(request, response);
            }
        }
    });
});
server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
