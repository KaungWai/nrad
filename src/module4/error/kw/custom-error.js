class MinusNumberError extends Error {
    constructor(message) {
        super(message)
    }
}

function getPriceTag(price, productName = "sample") {
    if(!Number.isInteger(price)) {
        throw new TypeError('Price must be an integer value.')
    }

    if (price < 0) {
        throw new MinusNumberError('Price must be a positive value.')
    }

    return `Price of ${productName} is ${price}`
}

console.log(getPriceTag(100, "apple"))
