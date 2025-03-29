import * as Yup from 'yup'

export const createUserRequestBodySchema = Yup.object({
  user_name: Yup.string().max(200).required(),
  role: Yup.string().oneOf(['ADMIN', 'USER']).required(),
  password: Yup.string().max(20).required(),
})
