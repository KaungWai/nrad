"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const rootHandler_1 = require("./handlers/rootHandler");
const routes = {
    "/": {
        GET: rootHandler_1.rootHandler,
    }
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
