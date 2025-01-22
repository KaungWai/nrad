import os from 'node:os';

let CpuArc = os.arch();
let NoOfCpu = os.cpus().length;
let RamByte = os.totalmem();
let RamGit =RamByte/ Math.pow(1024, 3);

// Get the CPU architecture
console.log(`CPU architecture: ${CpuArc}`);

// Get the number of CPUs
console.log(`No of CPUs: ${NoOfCpu}`);

// Get the free system memory
console.log(`RAM: ${RamGit}`);