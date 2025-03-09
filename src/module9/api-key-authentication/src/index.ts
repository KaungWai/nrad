import express from 'express'
import { config } from 'dotenv'

// load .env file
config()

// server instance
const app = express()

const port = process.env.PORT ?? 3000
const apiKeys = (process.env.API_KEYS ?? '').split(',')

// middlware
const auth = function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const apiKey = String(req.header('apiKey'))

  if(apiKeys.indexOf(apiKey) >= 0) {
    // pass
    next()
    return
  }

  // deny
  res.status(401).json(
    {
      error: 'API Key invalid'
    }
  )
}

const myLogger = function (req: express.Request, res: express.Response, next: express.NextFunction) {
  const log = `${new Date()} ${req.method} ${req.url}`
  console.log(log)
  next()
}

// use middleware
app.use(myLogger)
app.use(auth)

// route-handler declaration
app.get('/', (req, res) => {
  res.send('Hello World! Root')
})
app.get('/a', (req, res) => {
  res.send('Hello World! A')
})

// server init
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
