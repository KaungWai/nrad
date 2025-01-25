function getEmployee(id: number | string) {
    // do something
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