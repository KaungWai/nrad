import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { updateBookRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const updateBookByIdHandler: Handler = async (request, response) => {
  const bookId = request.params.book_id

  updateBookRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = updateBookRequestBodySchema.cast(request.body)

  const targetBook = await prismaInstance.book.findUnique({
    where: {
      book_id: bookId,
    },
  })

  if (!targetBook) {
    throw new HandlerError(status.NOT_FOUND, [`Book is not found`])
  }

  const category = await prismaInstance.category.findUnique({
    where: {
        category_id: body.category_id
    }
})

if (!category) {
    throw new HandlerError(status.NOT_FOUND, [`Unknown category id`])

}

const author = await prismaInstance.author.findUnique({
    where: {
        author_id: body.author_id
    }
})

if (!author) {
    throw new HandlerError(status.NOT_FOUND, [`Unknown author id`])
}

const publisher = await prismaInstance.publisher.findUnique({
    where: {
        publisher_id: body.publisher_id
    }
})

if (!publisher) {
    throw new HandlerError(status.NOT_FOUND, [`Unknown publisher id`])
}

  const updatedBook = await prismaInstance.book.update({
    where: {
        book_id: bookId,
    },
    data: {
        book_name: body.book_name,
        published_date: new Date(body.published_date),
        category_id: body.category_id,
        author_id: body.author_id,
        publisher_id: body.publisher_id,
        updated_at: new Date()
    },
  })

  return {
    statusCode: status.CREATED,
    body: updatedBook,
  }
}
