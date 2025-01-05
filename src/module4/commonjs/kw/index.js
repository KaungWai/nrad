const logger = require('./lib/log.js')
const math = require('./lib/math.js');

logger.doInfoLog('my text');
logger.doWarningLog('my text');
logger.doErrorLog('my text');

logger.doInfoLog(math.add(1, 2));