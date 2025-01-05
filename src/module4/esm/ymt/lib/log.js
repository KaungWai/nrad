export default {
    doInfoLog: function(text){
    console.log(`Info: ${text}`)
  },
  doWarningLog: function(text){
    console.warn(`Warning: ${text}`)
  },
  doErrorLog : function(text) {
    console.error(`Error: ${text}`)
  }
}