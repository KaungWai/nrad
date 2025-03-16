import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const getAuthorById: Handler = async (request, response) => {
  const authorId = request.params.author_id

  const targetAuthor = await prismaInstance.author.findUnique({
    where: {
      author_id: authorId,
    },
  })

  if (!targetAuthor) {
    throw new HandlerError(status.NOT_FOUND, [`Author with id:${authorId} is not found`])
  }

  return {
    statusCode: status.OK,
    body: targetAuthor,
  }
}
