import os from 'node:os';

let cpuArch = os.arch();
let cpus = os.cpus();
let ram = os.totalmem();

console.log(`CPU architecture: ${cpuArch}`)

cpus.map((cpu, index) => console.log(`No of CPUs ${index + 1}: ${cpu.speed}`))

console.log(`RAM: ${ram}GB`)


