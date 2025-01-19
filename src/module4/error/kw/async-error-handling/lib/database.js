class ConnectionError extends Error {
    code = 'CONNECTION_ERROR'
    constructor(message) {
        super(message)
    }
}

module.exports = {
    getScore: () => {
        return new Promise((resolve, reject) => {
            const score = (Math.random() * 100).toFixed(0)
            setTimeout(() => {
                if (Math.random() >= 0.6) {
                    resolve(score)
                } else {
                    reject(new ConnectionError(`Cannot reached to database!`))
                }
            }, 2000)
        })
    }
}