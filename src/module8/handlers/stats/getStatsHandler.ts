import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from 'yup';
import { prismaInstance } from "../../utils/prisma";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function getStatsHandler(request: MyRequest, response: MyResponse) {
    try {
        const categoryCount = await prismaInstance.category.count()
        const authorCount = await prismaInstance.author.count()
        const publisherCount = await prismaInstance.publisher.count()
        const bookCount = await prismaInstance.book.count()

        response.writeHead(200, defaultResponseHeader)

        const responseData = {
            category: categoryCount,
            author: authorCount,
            publisher: publisherCount,
            book: bookCount
        }
        response.end(JSON.stringify(responseData))
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
