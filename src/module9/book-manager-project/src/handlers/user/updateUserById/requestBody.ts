import * as Yup from 'yup'

export const updateUserRequestBodySchema = Yup.object({
  password: Yup.string().min(8).max(20).required(),
})
