function doLog(logObj: { level: string, message: string }) {
    console.log(`[${logObj.level}]: ${logObj.message}`)
}

export {}