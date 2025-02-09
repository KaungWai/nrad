import { MyRequest } from "../types/types"

const getFullUrl = (request: MyRequest) => {
    return new URL(`http://${request.headers.host}${request.url ?? '/'}`)
}

export const requestUtils = {
    getFullUrl
}