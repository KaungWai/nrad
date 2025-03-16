import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const deleteAuthorById: Handler = async (request, response) => {
  const authorId = request.params.author_id

  const targetAuthor = await prismaInstance.author.findUnique({
    where: {
      author_id: authorId,
    },
  })

  if (!targetAuthor) {
    throw new HandlerError(status.NOT_FOUND, [`Author with id:${authorId} is not found`])
  }

  const book = await prismaInstance.book.findFirst({
    where: {
      author_id: authorId,
    },
  })

  if (book) {
    throw new HandlerError(status.BAD_REQUEST, [`Author with id:${authorId} is using in at least book`])
  }

  await prismaInstance.author.delete({
    where: {
      author_id: authorId,
    },
  })

  return {
    statusCode: status.NO_CONTENT,
  }
}
