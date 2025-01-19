function getPriceTag(price, productName = "sample") {
    if(!Number.isInteger(price)) {
        throw new TypeError('Price must be an integer value.')
    }

    return `Price of ${productName} is ${price}`
}

try {
    console.log(getPriceTag(300, 'apple'))
    console.log(getPriceTag(200, 'orange'))
    console.log(getPriceTag(102.3, 'grape'))
} catch(e) {
    console.log(e.message)
}
