import fs from 'node:fs'
import path from 'node:path'
import { MyRequest, MyResponse } from "../types/types";
import { requestUtils } from '../utils/requestUtils';

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

    try {
        const fileLocation = path.join(STATIC_FOLDER, urlObj.pathname)

        const extension = path.parse(fileLocation).ext.toLowerCase() as keyof typeof CONTENT_TYPE

        if (!CONTENT_TYPE[extension]) {
            throw new Error()
        }

        const content = fs.readFileSync(fileLocation, {
            encoding: 'utf-8'
        })

        response.writeHead(200, {
            "Content-Type": CONTENT_TYPE[extension],
        })
        response.end(content)
    } catch (e) {
        console.log(e)
        response.writeHead(404, {
            "Content-Type": "application/json",
        })
        const responseData = { error: 'Not found' }
        response.end(JSON.stringify(responseData))
    }
}
