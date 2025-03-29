import status from 'http-status'
import { Handler } from '../../../types'
import { createCategoryRequestBodySchema } from './requestBody'
import { prismaInstance } from '../../../utils/prismaUtil'

export const createCategoryHandler: Handler = async (request, response) => {
  createCategoryRequestBodySchema.validateSync(request.body, {
    abortEarly: false,
  })

  const body = createCategoryRequestBodySchema.cast(request.body)

  const newCategory = await prismaInstance.category.create({
    data: {
      category_name: body.category_name,
      created_at: new Date(),
      updated_at: new Date(),
    },
  })

  return {
    statusCode: status.CREATED,
    body: newCategory,
  }
}
