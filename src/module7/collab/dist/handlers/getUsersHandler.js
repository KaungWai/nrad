"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getUsersHandler = getUsersHandler;
const Yup = __importStar(require("yup"));
const queryUtil_1 = require("../utils/queryUtil");
const requestUtils_1 = require("../utils/requestUtils");
const prisma_1 = require("../utils/prisma");
const querySchema = Yup.object({
    filter: Yup.object({
        userId: Yup.string().min(36).max(36),
        userName: Yup.string().max(50),
        userEmail: Yup.string().email().max(200),
    }),
    sorting: Yup.object({
        userId: Yup.string().oneOf(['asc', 'desc']),
        userName: Yup.string().oneOf(['asc', 'desc']),
        userEmail: Yup.string().oneOf(['asc', 'desc']),
    }),
    skip: Yup.number().required().min(0),
    take: Yup.number().required().min(10).max(100),
});
function getUsersHandler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const urlObj = requestUtils_1.requestUtils.getURLObject(request);
        let query = queryUtil_1.queryUtils.decodeQuery(urlObj);
        try {
            yield querySchema.validate(query);
            query = querySchema.cast(query);
            const users = yield prisma_1.prismaInstance.user.findMany({
                where: {
                    user_id: query.filter.userId,
                    user_name: {
                        contains: query.filter.userName,
                        mode: 'insensitive'
                    },
                    user_email: query.filter.userEmail
                },
                orderBy: {
                    user_id: query.sorting.userId,
                    user_name: query.sorting.userName,
                    user_email: query.sorting.userEmail
                },
                skip: query.skip,
                take: query.take
            });
            response.writeHead(200, {
                "Content-Type": "application/json",
            });
            const responseData = { users: users };
            response.end(JSON.stringify(responseData));
        }
        catch (e) {
            if (e instanceof Yup.ValidationError) {
                response.writeHead(400, {
                    "Content-Type": "application/json",
                });
                response.end(JSON.stringify({
                    error: e.errors
                }));
            }
            else {
                console.log(e);
                response.writeHead(500, {
                    "Content-Type": "application/json",
                });
                response.end(JSON.stringify({
                    error: "Internal server error"
                }));
            }
        }
    });
}
