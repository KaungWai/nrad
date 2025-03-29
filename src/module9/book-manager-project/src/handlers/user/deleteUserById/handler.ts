import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const deleteUserById: Handler = async (request, response) => {
  const userId = request.params.user_id

  const targetUser = await prismaInstance.user.findUnique({
    where: {
      user_id: userId,
    },
  })

  if (!targetUser) {
    throw new HandlerError(status.NOT_FOUND, [`User with id:${userId} is not found`])
  }

  await prismaInstance.user.delete({
    where: {
      user_id: userId
    }
  })

  return {
    statusCode: status.NO_CONTENT,
  }
}
