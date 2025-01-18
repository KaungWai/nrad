const { temperatureSensor } = require('./sensor')

const firstAlert = (temp) => {
    console.log(`First temp is ${temp}.`)
}
temperatureSensor.once('measure', firstAlert)

// department 1: alert people if temp over 35
const listener1 = (temp) => {
    if(temp > 35) {
        console.log('Department1: Waring! Warning! Temp is ' + temp)
    }
}
temperatureSensor.on('measure', listener1)

// department 2: evacuate people engine if temp over 40
const listener2 = (temp) => {
    if(temp > 40) {
        console.log('Department2: Everybody go to the emergency exit!')
        temperatureSensor.removeListener('measure', listener2)
    }
}
temperatureSensor.on('measure', listener2) 

// department 3: prepare gears if temp over 50
const listener3 = (temp) => {
    if(temp > 50) {
        console.log('Department3: Equipments ready!')
    }
}
temperatureSensor.on('measure', listener3)

const errorListener = (e) => {
    console.log(e.message)
    temperatureSensor.removeAllListeners('measure')
}
temperatureSensor.on("error", errorListener)
