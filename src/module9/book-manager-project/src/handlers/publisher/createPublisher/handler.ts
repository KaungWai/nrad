import status from 'http-status'
import { Handler } from '../../../types'
import { createPublisherRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const createPublisherHandler: Handler = async (request, response) => {
  createPublisherRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = createPublisherRequestBodySchema.cast(request.body)

  const newPublisher = await prismaInstance.publisher.create({
    data: {
      publisher_name: body.publisher_name,
      created_at: new Date(),
      updated_at: new Date(),
    },
  })

  return {
    statusCode: status.CREATED,
    body: newPublisher,
  }
}
