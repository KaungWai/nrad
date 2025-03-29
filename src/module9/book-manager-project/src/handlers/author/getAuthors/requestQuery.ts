import * as Yup from 'yup'
import { dateSchema } from '../../../utils/yupUtils'

export const getAuthorsRequestQuerySchema = Yup.object({
    filter: Yup.object({
        author_id: Yup.string(),
        author_name: Yup.string(),
        gender: Yup.string().oneOf(['MALE', 'FEMALE']),
        birth_date: dateSchema
    }),
    sorting: Yup.object({
        author_name: Yup.string().oneOf(['asc', 'desc']),
        gender: Yup.string().oneOf(['asc', 'desc']),
        birth_date: Yup.string().oneOf(['asc', 'desc'])
    }),
    skip: Yup.number().min(0).required(),
    take: Yup.number().min(1).max(100).required()
})
