const log = require('./lib/log.js')
const math = require('./lib/math.js')

log.doInfoLog('Info');
log.doWarningLog('Warning');
log.doErrorLog('Error');

log.doInfoLog(math.add(1,1));