import bcrypt from 'bcrypt'
import status from 'http-status'
import { Handler } from '../../../types'
import { updateUserRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const updateUserHandler: Handler = async (request, response) => {
  updateUserRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = updateUserRequestBodySchema.cast(request.body)

  const updatedUser = await prismaInstance.user.create({
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
    body: updatedUser,
  }
}
