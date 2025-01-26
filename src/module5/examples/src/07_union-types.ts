function getEmployee(id: number | string) {
    if(typeof id === 'string') {
        id.length
    } else {
        id.length // error
    }
}

getEmployee(123)
getEmployee("123")
getEmployee(true) // error

export {}