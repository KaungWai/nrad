import * as Yup from 'yup'

export const updateCategoryRequestBodySchema = Yup.object({
  category_name: Yup.string().max(200).required(),
})
