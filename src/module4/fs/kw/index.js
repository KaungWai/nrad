const fs = require("node:fs")

fs.readFile('./data.json', {
    encoding: 'utf-8'
}, (err, data) => {
    if (err) {
        console.log(err.message)
        return
    }

    const arr = JSON.parse(data)

    let csvData = `"name","country","phone"`;

    arr.forEach(element => {
        csvData += "\r\n"
        csvData += `"${element.name}","${element.country}","${element.phone}"`
    });

    fs.writeFile('./data.csv', csvData, {
        encoding: 'utf-8'
    }, () => {
        console.log('write finish')
    })
})
