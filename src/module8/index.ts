import http from 'node:http'
import { router } from './router';
import { notFoundHandler } from './handlers/notFoundHandler';
import { config } from 'dotenv'
import { requestUtils } from './utils/requestUtils';
import { MyRequest, MyResponse } from './types/types';

config()

const server = http.createServer()

server.on('request', (request: MyRequest, response: MyResponse) => {

    let rawBody = ""

    request.on('data', (chunk) => {
        rawBody += chunk
    })

    request.on('end', () => {
        if (rawBody.trim() !== "") {
            request.myBody = JSON.parse(rawBody)
        }

        const urlObj = requestUtils.getURLObject(request)
        const handlers = router(urlObj)
        
        if (!handlers) {
            notFoundHandler(request, response)
        } else {
            const targetHandler = handlers[(request.method ?? '') as keyof typeof handlers]
            if (targetHandler) {
                targetHandler(request, response)
            } else {
                notFoundHandler(request, response)
            }
        }
    })
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
