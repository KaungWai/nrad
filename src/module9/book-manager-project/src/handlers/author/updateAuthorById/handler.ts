import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { updateAuthorRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const updateAuthorByIdHandler: Handler = async (request, response) => {
  const authorId = request.params.author_id

  updateAuthorRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = updateAuthorRequestBodySchema.cast(request.body)

  const targetAuthor = await prismaInstance.author.findUnique({
    where: {
      author_id: authorId,
    },
  })

  if (!targetAuthor) {
    throw new HandlerError(status.NOT_FOUND, [`Author with id:${authorId} is not found`])
  }

  const updatedAuthor = await prismaInstance.author.update({
    where: {
      author_id: authorId,
    },
    data: {
      author_name: body.author_name,
      gender: body.gender,
      birth_date: new Date(body.birth_date),
      updated_at: new Date(),
    },
  })

  return {
    statusCode: status.CREATED,
    body: updatedAuthor,
  }
}
