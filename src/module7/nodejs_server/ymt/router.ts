import { getUsersHandler } from './handlers/getUsersHandler'
import { rootHandler } from './handlers/rootHandler'

const routes = {
    "/": rootHandler,
    "/users": getUsersHandler,
}

type RouterUrl = keyof typeof routes

export const router = (url: URL) => {
    const pathName = url.pathname as RouterUrl
    return routes[pathName]
}
