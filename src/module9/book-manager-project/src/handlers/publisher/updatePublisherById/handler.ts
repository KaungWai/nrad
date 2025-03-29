import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { updatePublisherRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const updatePublisherByIdHandler: Handler = async (request, response) => {
  const publisherId = request.params.publisher_id

  updatePublisherRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = updatePublisherRequestBodySchema.cast(request.body)

  const targetPublisher = await prismaInstance.publisher.findUnique({
    where: {
      publisher_id: publisherId,
    },
  })

  if (!targetPublisher) {
    throw new HandlerError(status.NOT_FOUND, [`Publisher with id:${publisherId} is not found`])
  }

  const updatedPublisher = await prismaInstance.publisher.update({
    where: {
      publisher_id: publisherId,
    },
    data: {
      publisher_name: body.publisher_name,
      updated_at: new Date(),
    },
  })

  return {
    statusCode: status.CREATED,
    body: updatedPublisher,
  }
}
