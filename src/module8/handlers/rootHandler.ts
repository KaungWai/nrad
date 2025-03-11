import { MyRequest, MyResponse } from "../types/types";
import { defaultResponseHeader } from "../utils/responseUtils";
import { defaultHandler } from "./defaultHandler";

defaultHandler

export function rootHandler(request: MyRequest, response: MyResponse) {
    request.url = '/index.html'
    defaultHandler(request, response)
}