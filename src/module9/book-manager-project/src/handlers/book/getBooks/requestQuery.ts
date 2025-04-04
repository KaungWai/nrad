import * as Yup from 'yup'
import { dateSchema } from '../../../utils/yupUtils'

export const getBooksRequestQuerySchema = Yup.object({
    filter: Yup.object({
        book_id: Yup.string().max(36),
        book_name: Yup.string().max(200),
        published_date : dateSchema,
        category_id: Yup.string().min(36).max(36),
        author_id: Yup.string().min(36).max(36),
        publisher_id: Yup.string().min(36).max(36)
    }),
    sorting: Yup.object({
        book_name: Yup.string().oneOf(['asc', 'desc']),
    }),
    skip: Yup.number().min(0).required(),
    take: Yup.number().min(1).max(100).required()
})
