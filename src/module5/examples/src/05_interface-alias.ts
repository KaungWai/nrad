interface Person {
    name: string,
    age: number,
    speak: () => string,
    eyeColor?: string // this field is optional
}

// adding fields
interface Person {
    race: string
}

let david: Person = {
    name: "David",
    age: 65,
    speak: function (): string {
        return "hello"
    },
    race: 'European'
}

// extending interface
interface Employee extends Person {
    employeeId: number
}

let john: Employee = {
    name: "John",
    age: 25,
    speak: function (): string {
        return "I am John"
    },
    race: 'European',
    employeeId: 1
}

export {}