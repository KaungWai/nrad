import * as Yup from 'yup'

export const createPublisherRequestBodySchema = Yup.object({
  publisher_name: Yup.string().max(200).required(),
})
