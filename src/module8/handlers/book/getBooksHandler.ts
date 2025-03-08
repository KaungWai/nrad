import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from 'yup';
import { prismaInstance } from "../../utils/prisma";
import { queryUtils } from "../../utils/queryUtil";
import { requestUtils } from "../../utils/requestUtils";
import { defaultResponseHeader } from "../../utils/responseUtils";

const querySchema = Yup.object({
    filter: Yup.object({
        book_id: Yup.string().max(36),
        book_name: Yup.string().max(200),
        category_id: Yup.string().min(36).max(36),
        author_id: Yup.string().min(36).max(36),
        publisher_id: Yup.string().min(36).max(36)
    }),
    sorting: Yup.object({
        book_name: Yup.string().oneOf(['asc', 'desc']),
    }),
    skip: Yup.number().required().min(0),
    take: Yup.number().required().min(10).max(100),
})

type SortBy = 'asc' | 'desc'

export async function getBooksHandler(request: MyRequest, response: MyResponse) {
    try {

        const urlObj = requestUtils.getURLObject(request)
        const queryDecoded = queryUtils.decodeQuery(urlObj);

        await querySchema.validate(queryDecoded, {
            abortEarly: false,
            strict: false
        })
        const query = querySchema.cast(queryDecoded)

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
            where: {
                book_id: {
                    startsWith: query.filter.book_id
                },
                book_name: {
                    contains: query.filter.book_name,
                    mode: 'insensitive'
                },
                category_id: query.filter.category_id,
                author_id: query.filter.author_id,
                publisher_id: query.filter.publisher_id
            },
            orderBy: {
                book_name: query.sorting.book_name as SortBy,
            },
            skip: query.skip,
            take: query.take
        })

        response.writeHead(200, defaultResponseHeader)
        response.end(JSON.stringify(books))
    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            response.writeHead(400, defaultResponseHeader)
            response.end(JSON.stringify({
                error: e.errors
            }))
        } else {
            console.log(e)
            response.writeHead(500, defaultResponseHeader)
            response.end(JSON.stringify({
                error: "Internal server error"
            }))
        }
    }
}
