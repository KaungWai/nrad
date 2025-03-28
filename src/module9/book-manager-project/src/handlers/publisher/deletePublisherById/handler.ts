import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const deletePublisherById: Handler = async (request, response) => {
  const publisherId = request.params.publisher_id

  const targetPublisher = await prismaInstance.publisher.findUnique({
    where: {
      publisher_id: publisherId,
    },
  })

  if (!targetPublisher) {
    throw new HandlerError(status.NOT_FOUND, [`Publisher with id:${publisherId} is not found`])
  }

  const book = await prismaInstance.book.findFirst({
    where: {
      publisher_id: publisherId,
    },
  })

  if (book) {
    throw new HandlerError(status.BAD_REQUEST, [`Publisher with id:${publisherId} is using in at least book`])
  }

  await prismaInstance.publisher.delete({
    where: {
      publisher_id: publisherId,
    },
  })

  return {
    statusCode: status.NO_CONTENT,
  }
}
