class NumberTypeError extends TypeError {
    constructor(message) {
        super(message)
    }
}

class MinusValueError extends Error {
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
    console.log(getPriceTag(-1))
} catch (e) {
    if (e instanceof MinusValueError) {
        console.log('Please input positive value.')
        return
    }
    if (e instanceof NumberTypeError) {
        console.log('Please input number value.')
        return
    }
}
