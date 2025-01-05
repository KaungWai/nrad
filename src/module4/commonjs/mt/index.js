const log = require("./lib/log");
const math = require("./lib/math");

log.doInfoLog("Hello Node JS");
log.doWarningLog('Hello Node JS');
log.doErrorLog('Hello Node JS');

log.doInfoLog(math.add(1, 2));
log.doInfoLog(math.subtract(10, 2));
log.doInfoLog(math.multiply(10, 5));
log.doInfoLog(math.divide(20, 2));

