import { MyRequest, MyResponse } from "../../types/types";

import * as Yup from 'yup'
import { prismaInstance } from "../../utils/prisma";
import { requestUtils } from "../../utils/requestUtils";
import { defaultResponseHeader } from "../../utils/responseUtils";

const bodySchema = Yup.object({
    book_name: Yup.string().max(200).required(),
    category_id: Yup.string().max(36).required(),
    author_id: Yup.string().max(36).required(),
    publisher_id: Yup.string().max(36).required(),
})

export async function updateBookByIdHandler(request: MyRequest, response: MyResponse) {
    try {

        const urlObj = requestUtils.getURLObject(request)
        const bookId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1]

        const targetBook = await prismaInstance.book.findUnique({
            where: {
                book_id: bookId
            }
        })

        if (!targetBook) {
            response.writeHead(404, defaultResponseHeader)
            response.end(JSON.stringify({
                error: 'Book not found'
            }))
            return
        }

        await bodySchema.validate(request.myBody, {
            abortEarly: false
        })

        const body = bodySchema.cast(request.myBody)

        const category = await prismaInstance.category.findUnique({
            where: {
                category_id: body.category_id
            }
        })

        if (!category) {
            response.writeHead(400, defaultResponseHeader)
            response.end(JSON.stringify({
                error: 'Unknown category id.'
            }))
            return
        }

        const author = await prismaInstance.author.findUnique({
            where: {
                author_id: body.author_id
            }
        })

        if (!author) {
            response.writeHead(400, defaultResponseHeader)
            response.end(JSON.stringify({
                error: 'Unknown author id.'
            }))
            return
        }

        const publisher = await prismaInstance.publisher.findUnique({
            where: {
                publisher_id: body.publisher_id
            }
        })

        if (!publisher) {
            response.writeHead(400, defaultResponseHeader)
            response.end(JSON.stringify({
                error: 'Unknown publisher id.'
            }))
            return
        }

        const updatedBook = await prismaInstance.book.update({
            where: {
                book_id: bookId
            },
            data: {
                book_name: body.book_name,
                category_id: body.category_id,
                author_id: body.author_id,
                publisher_id: body.publisher_id,
                updated_at: new Date()
            }
        })

        response.writeHead(201, defaultResponseHeader)
        response.end(JSON.stringify(updatedBook))
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
