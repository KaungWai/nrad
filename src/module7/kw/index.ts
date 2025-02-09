import http from 'node:http'
import { router } from './router';
import { notFoundHandler } from './handlers/notFoundHandler';
import { config } from 'dotenv'
import { requestUtils } from './utils/requestUtils';

config()

const server = http.createServer()

server.on('request', (request, response) => {
    const urlObj = requestUtils.getURLObject(request)
    const handler = router(urlObj) ?? notFoundHandler
    handler(request, response)
});

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
