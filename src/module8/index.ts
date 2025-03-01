import http from 'node:http'
import { router } from './router';
import { defaultHandler } from './handlers/defaultHandler';
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
        const handlers:any = router(urlObj)

        if (!handlers) {
            defaultHandler(request, response)
        } else {
            const targetHandler = handlers[request.method ?? '']
            if (targetHandler) {
                targetHandler(request, response)
            } else {
                defaultHandler(request, response)
            }
        }
    })
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
