import * as Yup from 'yup'

export const getCategoriesRequestQuerySchema = Yup.object({
    filter: Yup.object({
        category_id: Yup.string(),
        category_name: Yup.string(),
    }),
    sorting: Yup.object({
        category_name: Yup.string().oneOf(['asc', 'desc']),
    }),
    skip: Yup.number().min(0).required(),
    take: Yup.number().min(1).max(100).required()
})
