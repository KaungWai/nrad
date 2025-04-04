import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { createBookRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const createBookHandler: Handler = async (request, response) => {
    createBookRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = createBookRequestBodySchema.cast(request.body)

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

const newBook = await prismaInstance.book.create({
    data: {
        book_name: body.book_name,
        published_date: new Date(body.published_date),
        category_id: body.category_id,
        author_id: body.author_id,
        publisher_id: body.publisher_id,
        created_at: new Date(),
        updated_at: new Date()
    }
})

  return {
    statusCode: status.CREATED,
    body: newBook,
  }
}
