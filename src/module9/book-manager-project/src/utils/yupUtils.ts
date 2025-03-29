import * as Yup from 'yup'

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

export const dateSchema = Yup.string()
    .matches(dateRegex, '${path} must be in yyyy-MM-dd format')
    .test('is-date', '${path} must be a valid date', value => {
        if (!value || value == '') {
            return true
        }
        const date = new Date(value as string)
        const dateAsNumber = Number(date)
        return !isNaN(dateAsNumber)
    })
