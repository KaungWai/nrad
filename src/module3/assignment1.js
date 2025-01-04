const baseArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const squreArray = baseArray.map(x => x * x);
const largerArray = squreArray.filter(x => x > 20)

const total = largerArray.reduce((p, c) => {
    return p += c
}, 0)

console.log(total)