const { EventEmitter } = require('node:events')

// emitter
const temperatureSensor = new EventEmitter()

setInterval(() => {
    const temp = Math.random() * 100
    console.log('Sensor: ', temp)
    if (temp > 80) {
        temperatureSensor.emit('error', new Error('Sensor burned'))
    } else {
        temperatureSensor.emit('measure', temp)
    }
}, 2000)

module.exports = {
    temperatureSensor
}
