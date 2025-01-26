const myNumberArray: number[] = [2, 3, 4]
myNumberArray.push(5)
myNumberArray.push('six') // error

interface Product {
    itemId: string,
    itemName: string,
    price: number
}
const myProductArray: Product[] = []
myProductArray.push({
    itemId: "1234567890",
    itemName: "Macbook Air M2",
    price: 200000
})
myProductArray.push({}) // error

export {};
