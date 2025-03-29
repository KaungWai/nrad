import * as Yup from 'yup'
import { dateSchema } from '../../../utils/yupUtils'

export const createAuthorRequestBodySchema = Yup.object({
  author_name: Yup.string().max(200).required(),
  gender: Yup.string().oneOf(['MALE', 'FEMALE']).required(),
  birth_date: dateSchema.required(),
})
