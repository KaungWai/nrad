// A basic generic function
function identity<T>(value: T): T {
    return value;
}

// Using the function with different types
const num = identity<number>(42); // T is replaced with 'number'
const str = identity<string>('Hello, TypeScript!'); // T is replaced with 'string'


// Generic interface example
interface KeyValuePair<V> {
    key: number;
    value: V;
}
const kv: KeyValuePair<string> = {
    key: 1,
    value: ""
}
