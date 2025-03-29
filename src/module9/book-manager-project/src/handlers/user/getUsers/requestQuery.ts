import * as Yup from 'yup'

export const getUsersRequestQuerySchema = Yup.object({
    filter: Yup.object({
        user_id: Yup.string(),
        user_name: Yup.string(),
        role: Yup.string().oneOf(['ADMIN', 'USER']),
    }),
    sorting: Yup.object({
        user_name: Yup.string().oneOf(['asc', 'desc']),
        role: Yup.string().oneOf(['asc', 'desc']),
    }),
    skip: Yup.number().min(0).required(),
    take: Yup.number().min(1).max(100).required()
})
