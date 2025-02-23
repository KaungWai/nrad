import { createCategoryHandler } from "./handlers/category/createCategoryHandler"
import { deleteCategoryByIdHandler } from "./handlers/category/deleteCategoryByIdHandler"
import { getCategoriesHandler } from "./handlers/category/getCategoriesHandler"
import { getCategoryByIdHandler } from "./handlers/category/getCategoryByIdHandler"
import { updateCategoryByIdHandler } from "./handlers/category/updateCategoryByIdHandler"
import { rootHandler } from "./handlers/rootHandler"

const routes = {
    "/": {
        GET: rootHandler,
    },
    "/categories": {
        POST: createCategoryHandler,
        GET: getCategoriesHandler
    },
    "/categories/:category_id": {
        GET: getCategoryByIdHandler,
        PATCH: updateCategoryByIdHandler,
        DELETE: deleteCategoryByIdHandler
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
            result = result && (routerSegmet == pathNameSegment)
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
