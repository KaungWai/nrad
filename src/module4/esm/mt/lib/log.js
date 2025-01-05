export default {
    doInfoLog: function doInfoLog(text) {
        console.log(`Info: ${text}`)
      },
    doWarningLog: function() {
        console.warn(`Warning: ${text}`)
    },
    doErrorLog: function() {
        console.error(`Error: ${text}`)
    }
      
}