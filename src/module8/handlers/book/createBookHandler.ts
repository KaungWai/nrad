import { MyRequest, MyResponse } from "../../types/types";

import * as Yup from 'yup'
import { prismaInstance } from "../../utils/prisma";

const bodySchema = Yup.object({
    book_name: Yup.string().max(200).required(),
    category_id: Yup.string().max(36).required(),
    author_id: Yup.string().max(36).required(),
    publisher_id: Yup.string().max(36).required(),
})

export async function createBookHandler(request: MyRequest, response: MyResponse) {
    try {
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
            response.writeHead(400, {
                "Content-Type": "application/json",
            })
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
            response.writeHead(400, {
                "Content-Type": "application/json",
            })
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
            response.writeHead(400, {
                "Content-Type": "application/json",
            })
            response.end(JSON.stringify({
                error: 'Unknown publisher id.'
            }))
            return
        }

        const newBook = await prismaInstance.book.create({
            data: {
                book_name: body.book_name,
                category_id: body.category_id,
                author_id: body.author_id,
                publisher_id: body.publisher_id,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        response.writeHead(201, {
            "Content-Type": "application/json",
        })
        response.end(JSON.stringify(newBook))
    } catch (e) {
        if (e instanceof Yup.ValidationError) {
            response.writeHead(400, {
                "Content-Type": "application/json",
            })
            response.end(JSON.stringify({
                error: e.errors
            }))
        } else {
            console.log(e)
            response.writeHead(500, {
                "Content-Type": "application/json",
            })
            response.end(JSON.stringify({
                error: "Internal server error"
            }))
        }
    }
}