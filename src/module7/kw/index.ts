import http from 'node:http'
import { router, RouterUrl } from './router';
import { notFoundHandler } from './handlers/notFoundHandler';
import { config } from 'dotenv'

config()

const server = http.createServer()

server.on('request', (request, response) => {
    const url = request.url as RouterUrl
    const handler = router[url] ?? notFoundHandler
    handler(request, response)
});

server.listen(process.env.PORT)
