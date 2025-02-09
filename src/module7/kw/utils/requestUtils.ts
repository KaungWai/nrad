import { MyRequest } from "../types/types"

const getURLObject = (request: MyRequest) => {
    return new URL(`http://${request.headers.host}${request.url ?? '/'}`)
}

export const requestUtils = {
    getURLObject
}