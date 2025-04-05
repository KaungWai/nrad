export const formatDate = (str: string) => {
    const error = '{date_parse_error}'
    if (typeof str !== 'string' || str.length < 10) {
        return error
    }
    return str.substring(0, 10).replace('-', '/').replace('-', '/')
}

export const formatDateTime = (str: string) => {
    const error = '{date_parse_error}'
    if (typeof str !== 'string' || str.length < 10) {
        return error
    }
    return str.substring(0, 10).replace('-', '/').replace('-', '/') + " " + str.substring(11, 16)
}

export const formatDateToBind = (str: string) => {
    const error = '{date_parse_error}'
    if (typeof str !== 'string' || str.length < 10) {
        return error
    }
    return str.substring(0, 10)
}
