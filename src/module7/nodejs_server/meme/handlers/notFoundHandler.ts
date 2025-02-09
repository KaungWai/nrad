import { MyRequest, MyResponse } from "../types/types";

export function notFoundHandler(request: MyRequest, response: MyResponse) {
    response.writeHead(404, {
        "Content-Type": "application/json",
    })
    const responseData = { path: 'unknown' }
    response.end(JSON.stringify(responseData))
}