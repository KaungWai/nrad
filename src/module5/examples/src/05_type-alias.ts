type Person = {
    name: string,
    age: number,
    speak: () => string,
    eyeColor?: string // this field is optional
}

// type alias cannot add fields after declaration

let David: Person = {
    name: "David",
    age: 65,
    speak: function (): string {
        return "hello"
    },
}

// extending type
type Employee = Person & {
    employeeId: number
}

let john: Employee = {
    name: "John",
    age: 25,
    speak: function (): string {
        return "I am John"
    },
    employeeId: 1
}

export {}