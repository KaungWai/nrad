import { MyRequest, MyResponse } from "../../types/types";
import { prismaInstance } from "../../utils/prisma";
import { requestUtils } from "../../utils/requestUtils";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function getBookByIdHandler(request: MyRequest, response: MyResponse) {
    const urlObj = requestUtils.getURLObject(request)
    const bookId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1]

    const book = await prismaInstance.book.findUnique({
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
            book_id: bookId
        }
    })

    if (!book) {
        response.writeHead(404, defaultResponseHeader)
        response.end(JSON.stringify({
            error: 'Book not found.'
        }))
        return
    }

    response.writeHead(200, defaultResponseHeader)
    response.end(JSON.stringify(book))
}
