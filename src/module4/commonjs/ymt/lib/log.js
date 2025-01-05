module.exports = {
    doInfoLog: (text) => {
        console.log(`Info: ${text}`);
    },
    doWarningLog(text) {
        console.warn(`Warnning: ${text}`);
    },
    doErrorLog: function (text) {
        console.error(`Error: ${text}`);
    }
}