import bcrypt from 'bcrypt'
import status from 'http-status'
import { Handler } from '../../../types'
import { createUserRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const createUserHandler: Handler = async (request, response) => {
  createUserRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = createUserRequestBodySchema.cast(request.body)

  const newUser = await prismaInstance.user.create({
    data: {
      user_name: body.user_name,
      role: body.role,
      hash: bcrypt.hashSync(body.password, 10),
      created_at: new Date(),
      updated_at: new Date(),
    },
  })

  return {
    statusCode: status.CREATED,
    body: newUser,
  }
}
