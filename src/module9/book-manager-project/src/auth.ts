import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JwtPayload } from './types'

export const auth = (roles: ('ADMIN' | 'USER')[]) => {
  return (request: Request, response: Response, next: NextFunction) => {
    // get access token from request cookie
    const accessToken = request.cookies['access_token']
    if (!accessToken) {
      response.status(401).send({
        errors: ['access_token not found'],
      })
      return
    }

    // jwt secret
    const secret = process.env.JWT_SECRET
    if (!secret) {
      request.log.error('secret not found')
      response.status(500).send({
        errors: ['internal server error'],
      })
      return
    }

    try {
      // decode jwt
      const payload = jwt.verify(accessToken, secret) as JwtPayload

      // role check
      if (roles.indexOf(payload.role) < 0) {
        response.status(403).send({
          errors: ['Not enough permissions'],
        })
        return
      }

      // store user info in request object
      request.user = payload

      // forward
      next()
    } catch (e) {
      // jwt errors
      if (e instanceof jwt.JsonWebTokenError || e instanceof jwt.NotBeforeError || e instanceof jwt.TokenExpiredError) {
        response.status(401).send({
          errors: [e.message],
        })
        return
      }
      request.log.error(e)
      response.status(500).send({
        errors: ['internal server error'],
      })
    }
  }
}
