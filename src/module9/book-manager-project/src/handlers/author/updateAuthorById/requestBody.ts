import * as Yup from 'yup'
import { dateSchema } from '../../../utils/yupUtils'

export const updateAuthorRequestBodySchema = Yup.object({
  author_name: Yup.string().max(200).required(),
  gender: Yup.string().oneOf(['MALE', 'FEMALE']).required(),
  // TODO: strict date validation
  birth_date: dateSchema.required(),
})
