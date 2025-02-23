"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdHandler = getUserByIdHandler;
const requestUtils_1 = require("../utils/requestUtils");
const prisma_1 = require("../utils/prisma");
function getUserByIdHandler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlObj = requestUtils_1.requestUtils.getURLObject(request);
        const userId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1];
        const user = yield prisma_1.prismaInstance.user.findUnique({
            where: {
                user_id: userId
            }
        });
        if (!user) {
            response.writeHead(404, {
                "Content-Type": "application/json",
            });
            response.end(JSON.stringify({
                error: "user not found"
            }));
            return;
        }
        response.writeHead(200, {
            "Content-Type": "application/json",
        });
        response.end(JSON.stringify(user));
    });
}
