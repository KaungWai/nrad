import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const getCategoryById: Handler = async (request, response) => {
  const categoryId = request.params.category_id

  const targetCategory = await prismaInstance.category.findUnique({
    where: {
      category_id: categoryId,
    },
  })

  if (!targetCategory) {
    throw new HandlerError(status.NOT_FOUND, [`Category with id:${categoryId} is not found`])
  }

  return {
    statusCode: status.OK,
    body: targetCategory,
  }
}
