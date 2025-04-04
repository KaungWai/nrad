import { Handler, Sorting } from "../../../types";
import { prismaInstance } from "../../../utils/prismaUtil";
import { getBooksRequestQuerySchema } from "./requestQuery";

export const getBooksHandler: Handler = async(request, response) => {

    getBooksRequestQuerySchema.validateSync(request.query, {
        abortEarly: false
    })

    const query = getBooksRequestQuerySchema.cast(request.query)

    const where = {
        book_id: query.filter.book_id,
        book_name: query.filter.book_name,
        published_date: query.filter.published_date ? new Date(query.filter.published_date) : undefined,
        category_id: query.filter.category_id,
        author_id: query.filter.author_id,
        publisher_id: query.filter.publisher_id,
    }

    const bookscount = await prismaInstance.book.count({
        where: where
    })

    const books = await prismaInstance.book.findMany({
        select: {
            book_id: true,
            book_name: true,
            category: {
                select: {
                    category_id: true,
                    category_name: true,
                }
            },
            author: {
                select: {
                    author_id: true,
                    author_name: true,
                }
            },
            publisher: {
                select: {
                    publisher_id: true,
                    publisher_name: true,
                }
            },
            created_at: true,
            updated_at: true
        },
        where: where,
        orderBy: {
            book_name: query.sorting.book_name as Sorting,
            
        },
        skip: query.skip,
        take: query.take
    })

    const body = {
        result: books,
        meta: {
            total: bookscount,
            skip: query.skip,
            take: query.take
        }
    }

    return {
        statusCode: 200,
        body: body
    }
}
