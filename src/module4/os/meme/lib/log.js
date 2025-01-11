export default {
    doCPULog: function(text) {
        console.log(`CPU architecture: ${text}`)
    },

    doNoCPULog: function(text) {
        console.log(`No of CPUs: ${text}`)
    },

    doRAMLog: function(text) {
        console.log(`RAM: ${text} GB`)
    },

    doWarningLog: function(text) {
        console.log(`Warning: ${text}`)
    },

    doErrorLog: function(text) {
        console.log(`Error: ${text}`)
    }
}