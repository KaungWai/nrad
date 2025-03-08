import fs from 'node:fs'
import path from 'node:path'
import { MyRequest, MyResponse } from "../types/types";
import { requestUtils } from '../utils/requestUtils';
import { defaultResponseHeader } from '../utils/responseUtils';

const STATIC_FOLDER = path.join(__dirname, '..', '../static')

const CONTENT_TYPE = {
    '.html': "text/html",
    '.css': "text/css",
    '.js': "text/javascript",
    '.json': "application/json",
    '.png': "image/png",
    '.jpg': "image/jpeg",
    '.gif': "image/gif",
}

export function defaultHandler(request: MyRequest, response: MyResponse) {
    const urlObj = requestUtils.getURLObject(request)

    if (request.method == 'OPTIONS') {
        // by-pass pre flight requests
        response.writeHead(200, defaultResponseHeader)
        response.end()
        return
    }

    if (request.method != 'GET') {
        // by-pass pre flight requests
        response.writeHead(404, defaultResponseHeader)
        response.end()
        return
    }

    try {
        const fileLocation = path.join(STATIC_FOLDER, urlObj.pathname)

        const extension = path.parse(fileLocation).ext.toLowerCase() as keyof typeof CONTENT_TYPE

        if (!CONTENT_TYPE[extension]) {
            const responseData = { error: 'Unsupported content type' }
            response.writeHead(400, defaultResponseHeader)
            response.end(JSON.stringify(responseData))
            return
        }

        const content = fs.readFileSync(fileLocation, {
            encoding: 'utf-8'
        })

        response.writeHead(200, {
            "Content-Type": CONTENT_TYPE[extension],
        })
        response.end(content)
    } catch (e) {
        response.writeHead(404, defaultResponseHeader)
        const responseData = { error: 'Not found' }
        response.end(JSON.stringify(responseData))
    }
}
