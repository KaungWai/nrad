import http from 'node:http'

const server = http.createServer()

server.on('request', (request, response) => {
    response.writeHead(200, {
        "Content-Type": "application/json",
    })
    const responseData = {
        name: 'vanilla node js',
        version: '1.0.0',
        message: 'hello world'
    }
    response.end(JSON.stringify(responseData))
})

server.listen(8080)
