function encodeQuery(targetObj) {
    const processObject = (targetObj, prefix = '') => {
        let queries = []
        Object.keys(targetObj).forEach(currentKey => {
            if (typeof targetObj[currentKey] == 'object') {
                let nextPrefix = ''
                if (prefix === '') {
                    nextPrefix = currentKey
                } else {
                    nextPrefix = `${prefix}[${currentKey}]`
                }
                queries = queries.concat(processObject(targetObj[currentKey], nextPrefix))
            } else {
                if (prefix === '') {
                    queries.push(`${currentKey}=${targetObj[currentKey]}`)
                } else {
                    queries.push(`${prefix}[${currentKey}]=${targetObj[currentKey]}`)
                }
            }
        })
        return queries
    }
    return processObject(targetObj).join("&")
}

const query = {
    filter: {
        book_name: 'new',
        // category_id: '',
        // author_id: '',
        // publisher_id: ''
    },
    sorting: {
        book_name: 'asc',
    },
    skip: 0,
    take: 10,
}

console.log(encodeQuery(query))