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
exports.createUserHandler = createUserHandler;
const yup = __importStar(require("yup"));
const prisma_1 = require("../utils/prisma");
const userSchema = yup.object({
    user_name: yup.string().max(50).required(),
    user_email: yup.string().max(200).email().required(),
});
function createUserHandler(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield userSchema.validate(request.myBody, {
                abortEarly: false,
            });
            const user = userSchema.cast(request.myBody);
            const createUser = yield prisma_1.prismaInstance.user.create({
                data: {
                    user_name: user.user_name,
                    user_email: user.user_email,
                }
            });
            response.writeHead(201, {
                "Content-Type": "application/json",
            });
            response.end(JSON.stringify(createUser));
        }
        catch (error) {
            if (error instanceof yup.ValidationError) {
                response.writeHead(401, {
                    "Content-Type": "application/json",
                });
                response.end(JSON.stringify({
                    error: error.errors
                }));
            }
            else {
                console.log(error);
                response.writeHead(500, {
                    "Content-Type": "application/json",
                });
                response.end(JSON.stringify({
                    error: "Internal Server Error"
                }));
            }
        }
    });
}
