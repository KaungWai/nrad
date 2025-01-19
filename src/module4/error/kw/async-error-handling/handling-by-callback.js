const database = require('./lib/database')

async function getScorePhysics() {
    const score = await database.getScore()
    return {
        physics: score
    }
}

function getScoreChemistry() {
    return new Promise((resolve, reject) => {
        database.getScore()
            .then((score) => {
                resolve({
                    chemistry: score
                })
            }).catch((e) => {
                reject(e)
            })
    })
}

getScorePhysics()
    .then((score) => {
        console.log(score)
    }).catch((e) => {
        console.log(e)
    })

getScoreChemistry()
    .then((score) => {
        console.log(score)
    }).catch((e) => {
        console.log(e)
    })
