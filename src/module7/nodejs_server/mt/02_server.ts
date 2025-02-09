import http from 'node:http'

const server = http.createServer()

server.on('request', (request, response) => {
    if (request.url === '/') {

        response.writeHead(200, {
            "Content-Type": "application/json",
        })
        const responseData = { path: 'root' }
        response.end(JSON.stringify(responseData))

    } else if (request.url === '/users') {

        response.writeHead(200, {
            "Content-Type": "application/json",
        })
        const responseData = { path: 'users' }
        response.end(JSON.stringify(responseData))

    } else {

        response.writeHead(404, {
            "Content-Type": "application/json",
        })
        const responseData = { path: 'unknown' }
        response.end(JSON.stringify(responseData))

    }
});

server.listen(8080)