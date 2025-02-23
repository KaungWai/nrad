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
exports.updateUserByIdHandler = updateUserByIdHandler;
const Yup = __importStar(require("yup"));
const prisma_1 = require("../utils/prisma");
const requestUtils_1 = require("../utils/requestUtils");
const bodySchema = Yup.object({
    user_id: Yup.string(),
    user_name: Yup.string().max(50).required(),
    user_email: Yup.string().max(200).email().required()
});
function updateUserByIdHandler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const urlObj = requestUtils_1.requestUtils.getURLObject(request);
            const userId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1];
            const targetUser = yield prisma_1.prismaInstance.user.findUnique({
                where: {
                    user_id: userId
                }
            });
            if (!targetUser) {
                response.writeHead(404, {
                    "Content-Type": "application/json",
                });
                response.end(JSON.stringify({
                    error: 'User not found'
                }));
                return;
            }
            yield bodySchema.validate(request.myBody, {
                abortEarly: false
            });
            const body = bodySchema.cast(request.myBody);
            const upatedUser = yield prisma_1.prismaInstance.user.update({
                where: {
                    user_id: userId
                },
                data: {
                    user_id: body.user_id,
                    user_name: body.user_name,
                    user_email: body.user_email,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            });
            response.writeHead(201, {
                "Content-Type": "application/json",
            });
            response.end(JSON.stringify(upatedUser));
        }
        catch (e) {
            if (e instanceof Yup.ValidationError) {
                response.writeHead(401, {
                    "Content-Type": "application/json",
                });
                response.end(JSON.stringify({
                    error: ["error message1", "error message2"]
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
