import * as Yup from 'yup'
import { dateSchema } from '../../../utils/yupUtils'

export const updateBookRequestBodySchema = Yup.object({
    book_name: Yup.string().max(200).required(),
    published_date : dateSchema.required(),
    category_id: Yup.string().max(36).required(),
    author_id: Yup.string().max(36).required(),
    publisher_id: Yup.string().max(36).required(),
})
