import * as Yup from 'yup'

export const loginBodySchema = Yup.object({
    username: Yup.string().required(),
    password: Yup.string().required()
})
