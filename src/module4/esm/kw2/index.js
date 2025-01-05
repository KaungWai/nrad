// dynamic import of default export
const log = await import('./lib/log.js')
// dynamic import of named export
const math = await import('./lib/math.js')

log.default.doInfoLog(math.PI)
