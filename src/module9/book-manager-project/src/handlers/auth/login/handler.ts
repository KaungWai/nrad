import status from 'http-status'
import { loginRequestBodySchema } from './requestBody'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const loginHandler: Handler = async (request, response) => {
  loginRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = loginRequestBodySchema.cast(request.body)

  const findUserResult = await prismaInstance.user.findFirst({
    where: {
      user_name: body.username,
    },
  })

  if (!findUserResult) {
    throw new HandlerError(status.UNAUTHORIZED, ['Username or password is invalid'])
  }

  const isHashMatch = bcrypt.compareSync(body.password, findUserResult.hash)
  if (!isHashMatch) {
    throw new HandlerError(status.UNAUTHORIZED, ['Username or password is invalid'])
  }

  // payload
  const payload = {
    user_id: findUserResult.user_id,
    user_name: findUserResult.user_name,
    role: findUserResult.role,
  }

  // jwt secret
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('secret not found')
  }

  const oneDay = 60 * 60 * 24

  const accessToken = jwt.sign(payload, secret, {
    expiresIn: oneDay,
  })

  response.cookie('access_token', accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: process.env.ENVIRONMENT === 'development' ? 'none' : 'strict',
  })

  return {
    statusCode: status.OK,
    body: payload,
  }
}
