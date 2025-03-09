const bcrypt = require('bcrypt')
const fs = require('fs')
const saltRounds = 10
const myPlaintextPassword = 's0//P4$$w0rD'
const someOtherPlaintextPassword = 'not_bacon'

const uesrnames = ['mgmg', 'aungaung', 'kyaw', 'sansan', 'winwin']
const passwords = ['mgmg', 'aungaung', 'kyaw', 'sansan', 'winwin']

const userTable = []

for (let i = 0; i < uesrnames.length; i++) {
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash = bcrypt.hashSync(passwords[i], salt)
  userTable.push({
    username: uesrnames[i],
    salt,
    hash,
  })
}

console.log(userTable)

fs.writeFileSync('./mock/user_table.json', JSON.stringify(userTable), {
  encoding: 'utf-8'
})
