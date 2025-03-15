import https from 'node:https'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { config } from 'dotenv'
import express from 'express'
import PinoHttp from 'pino-http'
import router from './router'

// load env variables
config()

// setup logger
const logger = PinoHttp({
  transport: {
    target: 'pino-pretty'
  }
})

const app = express()
const port = process.env.PORT ?? 8080
const environment = process.env.ENVIRONMENT

app.use(express.json())
app.use(logger)
app.use(router)

app.get('/', (req, res) => {
  res.status(200).send('hello')
})

if (environment == 'development') {
  // express + https server
  const httpsOption: https.ServerOptions = {
    // generated using [https://apps.microsoft.com/detail/9PF4X1JG1D94]
    cert: readFileSync(path.join(__dirname, '../', 'certificates/', 'localhost.crt')),
    key: readFileSync(path.join(__dirname, '../', 'certificates/', 'localhost.key')),
  }
  https.createServer(httpsOption, app).listen(
    {
      port,
    },
    () => {
      console.log('Server listening at port ' + port)
    }
  )
} else {
  // express server
  app.listen(port, (error) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Server listening at port ' + port)
  })
}
