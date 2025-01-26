const strArray: string[] = ["apple", "oragne", "lemon"]
strArray.forEach((x) => {
    // x is string here
})

interface Product {
    itemId: string,
    itemName: string,
    price: number
}
const myProductArray: Product[] = []
myProductArray.push({
    itemId: "1111111111",
    itemName: "Macbook Air M2",
    price: 200000
})
myProductArray.push({
    itemId: "2222222222",
    itemName: "Macbook Air M2",
    price: 220000
})
myProductArray.forEach((p) => {
    // p is product here
})

export {};
