// normal string
let letString = "Hello World";
letString;

// literal
const constString = "Hello World";
constString;

// literal
let hardString: 'Hello World';
hardString = 'hardString'; // error

// combination of literal and union
interface Log { 
    level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
    message: string 
}
const logObj:Log = {
    level: "INFO",
    message: "Program has started"
}

export {}