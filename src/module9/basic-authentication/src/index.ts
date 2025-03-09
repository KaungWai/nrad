import express from 'express'
import bcrypt from 'bcrypt'
import { readFileSync } from 'fs'
import path from 'path'
import { config } from 'dotenv'

// load .env file
config()

// server instance
const app = express()

const port = process.env.PORT ?? 3000
const database = JSON.parse(
  readFileSync(path.join(__dirname, '../', 'mock/user_table.json'), {
    encoding: 'utf-8',
  })
) as { username: string; salt: string; hash: string }[]

// middlware
const auth = function (req: express.Request, res: express.Response, next: express.NextFunction) {
  console.log(req.headers)
  // extract authorization
  const authHeader = req.header('authorization') // 'Basic bWdtZzphYmNk'
  if (!authHeader || authHeader.indexOf('Basic ') != 0) {
    res.status(401).json({
      error: 'Auth header not included',
    })
    return
  }
  // basic token
  const basicToken = authHeader.substring(6)

  // base64 decode
  const basicTokenDecoded = Buffer.from(basicToken, 'base64').toString() // username:password

  // separate username and password
  const [username, password] = basicTokenDecoded.split(':')
  if (!username || !password) {
    res.status(401).json({
      error: 'username and password must be provided',
    })
    return 
  }

  // auth
  const userData = getUser(username)
  if (!userData) {
    res.status(401).json({
      error: 'username not found',
    })
    return 
  }

  if(bcrypt.compareSync(password, userData.hash) == false) {
    res.status(401).json({
      error: 'username or password is invalid',
    })
    return 
  }

  next()
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

/**
 * database mock funtions
 */
function getUser(u: string) {
  const idx = database.findIndex((x) => x.username == u)
  if (idx >= 0) {
    return database[idx]
  }
  return null
}
