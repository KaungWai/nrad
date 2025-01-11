import log from './lib/log.js'
import { GB } from './lib/math.js'
import os from 'node:os'

// Get the CPU architecture
log.doCPULog(os.arch());

// Get the number of CPUs
log.doNoCPULog(os.cpus().length);

// Get the free system memory
log.doRAMLog(GB(os.totalmem()));