import { createAuthorHandler } from "./handlers/author/createAuthorHandler"
import { deleteAuthorByIdHandler } from "./handlers/author/deleteAuthorByIdHandler"
import { getAuthorByIdHandler } from "./handlers/author/getAuthorByIdHandler"
import { getAuthorsHandler } from "./handlers/author/getAuthorsHandler"
import { updateAuthorByIdHandler } from "./handlers/author/updateAuthorByIdHandler"
import { createBookHandler } from "./handlers/book/createBookHandler"
import { deleteBookByIdHandler } from "./handlers/book/deleteBookByIdHandler"
import { getBookByIdHandler } from "./handlers/book/getBookByIdHandler"
import { getBooksHandler } from "./handlers/book/getBooksHandler"
import { updateBookByIdHandler } from "./handlers/book/updateBookByIdHandler"
import { createCategoryHandler } from "./handlers/category/createCategoryHandler"
import { deleteCategoryByIdHandler } from "./handlers/category/deleteCategoryByIdHandler"
import { getCategoriesHandler } from "./handlers/category/getCategoriesHandler"
import { getCategoryByIdHandler } from "./handlers/category/getCategoryByIdHandler"
import { updateCategoryByIdHandler } from "./handlers/category/updateCategoryByIdHandler"
import { createPublisherHandler } from "./handlers/publisher/createPublisherHandler"
import { deletePublisherByIdHandler } from "./handlers/publisher/deletePublisherByIdHandler"
import { getPublisherByIdHandler } from "./handlers/publisher/getPublisherByIdHandler"
import { getPublishersHandler } from "./handlers/publisher/getPublishersHandler"
import { updatePublisherByIdHandler } from "./handlers/publisher/updatePublisherByIdHandler"
import { rootHandler } from "./handlers/rootHandler"
import { getStatsHandler } from "./handlers/stats/getStatsHandler"

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
    "/authors": {
        GET: getAuthorsHandler,
        POST: createAuthorHandler,
    },
    "/authors/:author_id": {
        GET: getAuthorByIdHandler,
        PATCH: updateAuthorByIdHandler,
        DELETE: deleteAuthorByIdHandler,
    },
    "/publishers": {
        GET: getPublishersHandler,
        POST: createPublisherHandler,
    },
    "/publishers/:publisher_id": {
        GET: getPublisherByIdHandler,
        PATCH: updatePublisherByIdHandler,
        DELETE: deletePublisherByIdHandler,
    },
    "/books": {
        GET: getBooksHandler,
        POST: createBookHandler
    },
    "/books/:book_id": {
        GET: getBookByIdHandler,
        PATCH: updateBookByIdHandler,
        DELETE: deleteBookByIdHandler
    },
    "/stats": {
        GET: getStatsHandler
    }
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
