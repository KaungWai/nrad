function f(n) {
    if (n === 0) throw Error()
    f(n - 1)
}

f(99)