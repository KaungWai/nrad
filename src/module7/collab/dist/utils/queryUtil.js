"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryUtils = void 0;
function encodeQuery(targetObj) {
    const processObject = (targetObj, prefix = '') => {
        let queries = [];
        Object.keys(targetObj).forEach(currentKey => {
            if (typeof targetObj[currentKey] == 'object') {
                let nextPrefix = '';
                if (prefix === '') {
                    nextPrefix = currentKey;
                }
                else {
                    nextPrefix = `${prefix}[${currentKey}]`;
                }
                queries = queries.concat(processObject(targetObj[currentKey], nextPrefix));
            }
            else {
                if (prefix === '') {
                    queries.push(`${currentKey}=${targetObj[currentKey]}`);
                }
                else {
                    queries.push(`${prefix}[${currentKey}]=${targetObj[currentKey]}`);
                }
            }
        });
        return queries;
    };
    return processObject(targetObj).join("&");
}
/**
 * Decode Query
 * @param url URL object
 * @returns query object
 * @example
 * const url = new URL("http://example.com/users?filter[role]=employee&filter[age][gte]=25&sorting[name]=asc&sorting[birthdate]=desc&skip=0&limit=10");
 * const query = decodeQuery(url); // query is now an object with nested properties
 *
 * console.log(query.filter.role); // "employee"
 * console.log(query.filter.age.gte); // "25"
 */
function decodeQuery(url) {
    const obj = {};
    if (!url.search || url.search.trim() == '') {
        return obj;
    }
    const queryString = url.search.substring(1); // remove ?
    queryString.split('&').forEach(pair => {
        let [key, value] = pair.split('=');
        key = decodeURIComponent(key);
        value = decodeURIComponent(value);
        const keys = key.replace(/\]/g, '').split('[');
        let current = obj;
        while (keys.length > 1) {
            let subKey = keys.shift();
            if (!current[subKey]) {
                current[subKey] = {};
            }
            current = current[subKey];
        }
        current[keys[0]] = value;
    });
    return obj;
}
exports.queryUtils = {
    encodeQuery,
    decodeQuery
};
