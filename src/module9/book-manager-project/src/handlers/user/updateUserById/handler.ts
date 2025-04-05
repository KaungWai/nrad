import bcrypt from 'bcrypt'
import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { updateUserRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const updateUserHandler: Handler = async (request, response) => {
  const userId = request.params.user_id

  if (userId !== request.user?.user_id) {
    throw new HandlerError(status.FORBIDDEN, [`Not enough permission`])
  }

  updateUserRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = updateUserRequestBodySchema.cast(request.body)

  const targetUser = await prismaInstance.user.findUnique({
    where: {
      user_id: userId,
    },
  })

  if (!targetUser) {
    throw new HandlerError(status.NOT_FOUND, [`User with id:${userId} is not found`])
  }

  const updatedUser = await prismaInstance.user.update({
    where: {
      user_id: userId
    },
    data: {
      hash: bcrypt.hashSync(body.password, 10),
      updated_at: new Date(),
    },
  })

  return {
    statusCode: status.CREATED,
    body: updatedUser,
  }
}
