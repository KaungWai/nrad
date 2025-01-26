const david = {
    name: "",
    age: 0,
    speak: function (): string {
        return 'hello'
    },
    passport: {
        passport_no: "ABC123456",
        valid_to: new Date('2025-01-01'),
        birth_place: 'Longdon',
        nationality: "United Kingdom"
    }
}
type Person = typeof david
type Passport = typeof david['passport']

const newPassport: Passport = {
    passport_no: "",
    valid_to: new Date(),
    birth_place: "",
    nationality: ""
}

export {}