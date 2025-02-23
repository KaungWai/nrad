"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const createUserHandler_1 = require("./handlers/createUserHandler");
const deleteUserByIdHandler_1 = require("./handlers/deleteUserByIdHandler");
const getUserByIdHandler_1 = require("./handlers/getUserByIdHandler");
const getUsersHandler_1 = require("./handlers/getUsersHandler");
const rootHandler_1 = require("./handlers/rootHandler");
const updateUserByIdHandler_1 = require("./handlers/updateUserByIdHandler");
const routes = {
    "/": {
        GET: rootHandler_1.rootHandler,
    },
    "/users": {
        GET: getUsersHandler_1.getUsersHandler,
        POST: createUserHandler_1.createUserHandler
    },
    "/users/:user_id": {
        GET: getUserByIdHandler_1.getUserByIdHandler,
        DELETE: deleteUserByIdHandler_1.deleteUserByIdHandler,
        PATCH: updateUserByIdHandler_1.updateUserByIdHandler
    },
};
const areSegmentsSame = (routerSegments, pathNameSegments) => {
    if (routerSegments.length !== pathNameSegments.length) {
        return false;
    }
    let result = true;
    for (let i = 0; i < routerSegments.length; i++) {
        const routerSegmet = routerSegments[i];
        const pathNameSegment = pathNameSegments[i];
        if (routerSegmet.indexOf(":") == 0) {
            result = result && true;
        }
        else {
            result = result && (routerSegmet == pathNameSegment);
        }
        if (result == false) {
            return false;
        }
    }
    return result;
};
const router = (url) => {
    const pathName = url.pathname;
    const pathNameSegments = pathName.split('/').filter(x => x.trim() !== "");
    for (const route in routes) {
        const routerSegments = route.split('/').filter(x => x.trim() !== "");
        if (areSegmentsSame(routerSegments, pathNameSegments)) {
            return routes[route];
        }
    }
    return null;
};
exports.router = router;
