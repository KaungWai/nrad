import { Request, Response } from 'express'
import status from 'http-status'
import { Handler } from '../../../types'

export const logoutHandler: Handler = async (request: Request, response: Response) => {
  response.clearCookie('access_token', {
    httpOnly: true,
    secure: true,
    sameSite: process.env.ENVIRONMENT === 'development' ? 'none' : 'strict',
  })

  return {
    statusCode: status.OK,
  }
}
