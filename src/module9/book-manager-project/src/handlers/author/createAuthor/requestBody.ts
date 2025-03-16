import * as Yup from 'yup'

export const createAuthorRequestBodySchema = Yup.object({
  author_name: Yup.string().max(200).required(),
  gender: Yup.string().oneOf(['MALE', 'FEMALE']).required(),
  // TODO: strict date validation
  birth_date: Yup.date().required(),
})
