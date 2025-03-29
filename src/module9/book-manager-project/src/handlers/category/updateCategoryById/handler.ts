import status from 'http-status'
import { Handler, HandlerError } from '../../../types'
import { updateCategoryRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const updateCategoryByIdHandler: Handler = async (request, response) => {
  const categoryId = request.params.category_id

  updateCategoryRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = updateCategoryRequestBodySchema.cast(request.body)

  const targetCategory = await prismaInstance.category.findUnique({
    where: {
      category_id: categoryId,
    },
  })

  if (!targetCategory) {
    throw new HandlerError(status.NOT_FOUND, [`Category with id:${categoryId} is not found`])
  }

  const updatedCategory = await prismaInstance.category.update({
    where: {
      category_id: categoryId,
    },
    data: {
      category_name: body.category_name,
      updated_at: new Date(),
    },
  })

  return {
    statusCode: status.CREATED,
    body: updatedCategory,
  }
}
