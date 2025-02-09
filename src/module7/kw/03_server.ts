import http from 'node:http'

type MyRequest = http.IncomingMessage
type MyResponse = http.ServerResponse<http.IncomingMessage> & {
    req: http.IncomingMessage;
}

const rootHandler = (request: MyRequest, response: MyResponse) => {
    response.writeHead(200, {
        "Content-Type": "application/json",
    })
    const responseData = { path: 'root' }
    response.end(JSON.stringify(responseData))
}

const getUsersHandler = (request: MyRequest, response: MyResponse) => {
    response.writeHead(200, {
        "Content-Type": "application/json",
    })
    const responseData = { path: 'users' }
    response.end(JSON.stringify(responseData))
}

const notFoundHandler = (request: MyRequest, response: MyResponse) => {
    response.writeHead(404, {
        "Content-Type": "application/json",
    })
    const responseData = { path: 'unknown' }
    response.end(JSON.stringify(responseData))
}

const router = {
    '/': rootHandler,
    '/users': getUsersHandler,
}

type RouterUrl = keyof typeof router

const server = http.createServer()

server.on('request', (request, response) => {
    const url = request.url as RouterUrl
    const handler = router[url] ?? notFoundHandler
    handler(request, response)
});

server.listen(8080)