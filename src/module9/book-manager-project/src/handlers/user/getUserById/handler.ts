import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const getUserById: Handler = async (request, response) => {
  const userId = request.params.user_id

  const targetUser = await prismaInstance.user.findUnique({
    where: {
      user_id: userId,
    },
    select: {
      user_id: true,
      user_name: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  })

  if (!targetUser) {
    throw new HandlerError(status.NOT_FOUND, [`User with id:${userId} is not found`])
  }

  return {
    statusCode: status.NO_CONTENT,
    body: targetUser,
  }
}
