const qs = require('qs');

const queryObject = {
    filter: {
        birth_date: '2023-01-20'
    },
    sorting: {
        gender: 'asc',
    },
    skip: 0,
    take: 10,
}

console.log(qs.stringify(queryObject))
// filter%5Bbook_name%5D=1&filter%5Bcategory_id%5D=2&filter%5Bauthor_id%5D=3&filter%5Bpublisher_id%5D=4&sorting%5Bbook_name%5D=asc&skip=0&take=10