const log = require('./lib/log.js')
const math = require('./lib/math.js')

log.doInfoLog('Info');
log.doWarningLog('Warning');
log.doErrorLog('Error');

log.doInfoLog(math.subtract(5,1));