import os from 'node:os';

let cpuArch = os.arch();
let cpus = os.cpus();
let ramByte = os.totalmem();
let ramGB = ramByte / (1024 ** 3) // for kb, mb, gb
let ram = ramGB.toFixed(2);

console.log(`CPU architecture: ${cpuArch}`)

cpus.map((cpu, index) => console.log(`No of CPUs ${index + 1}: ${cpu.speed}`))

console.log(`RAM: ${ram}GB`)


