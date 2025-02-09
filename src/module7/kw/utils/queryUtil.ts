function encodeQuery(targetObj: any) {
    const processObject = (targetObj: any, prefix = '') => {
        let queries: string[] = []
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

function decodeQuery(url: URL) {
    const obj: any = {};

    if (url.search) {
        return obj
    }

    const queryString = url.search.substring(1) // remove ?
    queryString.split('&').forEach(pair => {
        let [key, value] = pair.split('=');
        key = decodeURIComponent(key);
        value = decodeURIComponent(value);
        const keys = key.replace(/\]/g, '').split('[');
        let current = obj;
        while (keys.length > 1) {
            let subKey = keys.shift() as string;
            if (!current[subKey]) {
                current[subKey] = {};
            }
            current = current[subKey];
        }
        current[keys[0]] = value;
    });
    return obj;
}

export const queryUtils = {
    encodeQuery,
    decodeQuery
}
