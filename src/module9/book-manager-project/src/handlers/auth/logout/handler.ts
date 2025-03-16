import { Request, Response } from 'express'
import status from 'http-status'
import { Handler } from '../../../types'

export const logoutHandler: Handler = async (request: Request, response: Response) => {
  response.clearCookie('access_token')
  return {
    statusCode: status.OK,
  }
}
