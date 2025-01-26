interface Person {
    name: string,
    age: number,
    speak: () => string,
    eyeColor?: string,
    passport: {
        passport_no: string,
        valid_to: Date,
        birth_place: string,
        nationality: string
    }
}

type PersonKeys = keyof Person

const myKey: PersonKeys = 'age'; // 'name' | 'age' | 'speak' | 'eyeColor' | 'passport'

export {}