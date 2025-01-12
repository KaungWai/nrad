const fs = require('node:fs')

const jsonData = fs.readFileSync('./data.json', {
    encoding: 'utf-8'
})

const arr = JSON.parse(jsonData);

let CsvData = `"name","country","phone"`;

arr.forEach(element => {
    CsvData += '/r/n';
    CsvData += `"${element.name}","${element.country}","${element.phone}"`;
});

fs.writeFileSync('./data.csv', CsvData, {
     encoding: 'utf-8'
})