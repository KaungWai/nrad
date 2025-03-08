import { MyRequest, MyResponse } from "../types/types";
import { defaultResponseHeader } from "../utils/responseUtils";

export function rootHandler(request: MyRequest, response: MyResponse) {
    response.writeHead(200, defaultResponseHeader)
    const responseData = { path: 'root' }
    response.end(JSON.stringify(responseData))
}