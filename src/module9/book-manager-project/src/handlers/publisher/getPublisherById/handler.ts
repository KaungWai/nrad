import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const getPublisherById: Handler = async (request, response) => {
  const publisherId = request.params.publisher_id

  const targetPublisher = await prismaInstance.publisher.findUnique({
    where: {
      publisher_id: publisherId,
    },
  })

  if (!targetPublisher) {
    throw new HandlerError(status.NOT_FOUND, [`Publisher with id:${publisherId} is not found`])
  }

  return {
    statusCode: status.OK,
    body: targetPublisher,
  }
}
