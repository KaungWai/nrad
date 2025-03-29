import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const deleteCategoryById: Handler = async (request, response) => {
  const categoryId = request.params.category_id

  const targetCategory = await prismaInstance.category.findUnique({
    where: {
      category_id: categoryId,
    },
  })

  if (!targetCategory) {
    throw new HandlerError(status.NOT_FOUND, [`Category with id:${categoryId} is not found`])
  }

  const book = await prismaInstance.book.findFirst({
    where: {
      category_id: categoryId,
    },
  })

  if (book) {
    throw new HandlerError(status.BAD_REQUEST, [`Category with id:${categoryId} is using in at least book`])
  }

  await prismaInstance.category.delete({
    where: {
      category_id: categoryId,
    },
  })

  return {
    statusCode: status.NO_CONTENT,
  }
}
