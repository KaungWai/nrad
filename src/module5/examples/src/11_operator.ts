// keyof (type from types)
type Point = { x: number; y: number };
type P = keyof Point;

// typeof (type from variables)
let s = "hello";
let n: typeof s;
