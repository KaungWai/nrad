import * as Yup from 'yup'

export const getPublishersRequestQuerySchema = Yup.object({
    filter: Yup.object({
        publisher_id: Yup.string(),
        publisher_name: Yup.string(),
    }),
    sorting: Yup.object({
        publisher_name: Yup.string().oneOf(['asc', 'desc']),
    }),
    skip: Yup.number().min(0).required(),
    take: Yup.number().min(1).max(100).required()
})
