import { Request, Response } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export type JwtPayload = {
  user_id: string
  user_name: string
  role: 'ADMIN' | 'USER'
}

export type HandlerResult = {
  statusCode: number
  body?: any
}

export class HandlerError extends Error {
  statusCode: number
  errors: string[]
  constructor(statusCode: number, errors: string[]) {
    super(errors.join(','))
    this.statusCode = statusCode
    this.errors = errors
  }
}

export type Handler = (request: Request, response: Response) => Promise<HandlerResult>

export type Sorting = 'asc' | 'desc' | undefined
