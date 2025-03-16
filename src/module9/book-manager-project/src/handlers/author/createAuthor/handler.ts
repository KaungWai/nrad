import status from 'http-status'
import { Handler } from '../../../types'
import { createAuthorRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const createAuthorHandler: Handler = async (request, response) => {
  createAuthorRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = createAuthorRequestBodySchema.cast(request.body)

  const newAuthor = await prismaInstance.author.create({
    data: {
      author_name: body.author_name,
      gender: body.gender,
      birth_date: body.birth_date,
      created_at: new Date(),
      updated_at: new Date(),
    },
  })

  return {
    statusCode: status.CREATED,
    body: newAuthor,
  }
}
