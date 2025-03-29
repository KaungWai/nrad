import * as Yup from 'yup'

export const createCategoryRequestBodySchema = Yup.object({
  category_name: Yup.string().max(200).required(),
})
