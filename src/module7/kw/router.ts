import { getUsersHandler } from './handlers/getUsersHandler'
import { rootHandler } from './handlers/rootHandler'

export const router = {
    "/": rootHandler,
    "/users": getUsersHandler,
}

export type RouterUrl = keyof typeof router
