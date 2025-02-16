import { MyRequest, MyResponse } from "../types/types";

export function rootHandler(request: MyRequest, response: MyResponse) {
    response.writeHead(200, {
        "Content-Type": "application/json",
    })
    const responseData = { path: 'root' }
    response.end(JSON.stringify(responseData))
}