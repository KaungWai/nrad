class NumberTypeError extends TypeError {
    code = 'NUMBER_TYPE_ERROR'
    constructor(message) {
        super(message)
    }
}

class MinusValueError extends Error {
    code = 'MINUS_VALUE_ERROR'
    constructor(message) {
        super(message)
    }
}

function getPriceTag(price, productName = "sample") {
    if(!Number.isInteger(price)) {
        throw new NumberTypeError('Price must be an integer value.')
    }
    if(price < 0) {
        throw new MinusValueError('Price must be an positive value.')
    }
    return `Price of ${productName} is ${price}`
}

try {
    console.log(getPriceTag("str"))
} catch (e) {
    if (e.code === 'MINUS_VALUE_ERROR') {
        console.log('Please input positive value.')
    } else if (e.code === 'NUMBER_TYPE_ERROR') {
        console.log('Please input number value.')
    } else {
        console.log('Program crashed.')
    }
}
