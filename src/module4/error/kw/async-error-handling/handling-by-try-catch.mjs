import * as database from './lib/database.mjs'

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


try {
    const physics = await getScorePhysics()
    const chemistry = await getScoreChemistry()
    console.log(physics, chemistry)
} catch (e) {
    console.log(e)
}
