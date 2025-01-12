const fs = require("node:fs");

const jsonData = fs.readFileSync("./data.json", {
    encoding: "utf-8"
})

const arr = JSON.parse(jsonData);

let csvData = `"name", "conutry", "phone"`;

arr.forEach(element => {
    csvData += "\r\n";
    csvData += `"${element.name}", "${element.country}", "${element.phone}"`
});

fs.writeFileSync("./data.csv", csvData, {
    encoding: 'utf-8'
})
console.log(csvData)