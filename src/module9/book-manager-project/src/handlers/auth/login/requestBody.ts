import * as Yup from 'yup'

export const loginRequestBodySchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
})
