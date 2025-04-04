import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const getBookById: Handler = async (request, response) => {
  const bookId = request.params.book_id

  const targetBook = await prismaInstance.book.findUnique({
    where: {
     book_id: bookId,
    },
  })

  if (!targetBook) {
    throw new HandlerError(status.NOT_FOUND, [`Book is not found`])
  }

  return {
    statusCode: status.OK,
    body: targetBook,
  }
}
