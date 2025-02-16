import { createUserHandler } from './handlers/createUserHandler'
import { deleteUserByIdHandler } from './handlers/deleteUserByIdHandler'
import { getUserByIdHandler } from './handlers/getUserByIdHandler'
import { getUsersHandler } from './handlers/getUsersHandler'
import { rootHandler } from './handlers/rootHandler'
import { updateUserByIdHandler } from './handlers/updateUserByIdHandler'

const routes = {
    "/": {
        GET: rootHandler,
    },
    "/users": {
        GET: getUsersHandler,
        POST: createUserHandler
    },
    "/users/:user_id": {
        GET: getUserByIdHandler,
        DELETE: deleteUserByIdHandler,
        PATCH: updateUserByIdHandler
    },
}

type RouterUrl = keyof typeof routes

const areSegmentsSame = (routerSegments: string[], pathNameSegments: string[]): boolean => {
    if (routerSegments.length !== pathNameSegments.length) {
        return false
    }

    let result = true
    for (let i = 0; i < routerSegments.length; i++) {
        const routerSegmet = routerSegments[i]
        const pathNameSegment = pathNameSegments[i]

        if (routerSegmet.indexOf(":") == 0) {
            result = result && true
        } else {
            result =  result && (routerSegmet == pathNameSegment)
        }

        if (result == false) {
            return false;
        }
    }
    return result
}

export const router = (url: URL) => {
    const pathName = url.pathname as RouterUrl
    const pathNameSegments = pathName.split('/').filter(x => x.trim() !== "")
 
    for (const route in routes) {
        const routerSegments = route.split('/').filter(x => x.trim() !== "")
        if (areSegmentsSame(routerSegments, pathNameSegments)) {
            return routes[route as RouterUrl]
        }
    }
    return null
}

/*

/users/:user_id/ = ["users", ":user_id"] = 3

/users/0394a8af-7ae2-4515-8a77-9c6fcf94f065/ = ["users", "0394a8af-7ae2-4515-8a77-9c6fcf94f065"] = 3

*/