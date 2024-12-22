const currentYear = new Date().getFullYear();

const person = {
  name: 'David',
  gender: 'male',
  birthyear: 1990,
}

delete person.gender;
person.age = currentYear - person.birthyear;
console.log(person)