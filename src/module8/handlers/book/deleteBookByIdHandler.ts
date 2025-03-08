import { MyRequest, MyResponse } from "../../types/types";
import { requestUtils } from '../../utils/requestUtils';
import { prismaInstance } from '../../utils/prisma';
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function deleteBookByIdHandler(request: MyRequest, response: MyResponse) {
    try {
        const urlObj = requestUtils.getURLObject(request)
        const bookId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1]

        const book = await prismaInstance.book.findUnique({
            where: {
                book_id: bookId
            }
        })

        if (!book) {
            response.writeHead(404, defaultResponseHeader)
            response.end(JSON.stringify({
                error: "author not found"
            }))
            return
        }

        await prismaInstance.book.delete({
            where: {
                book_id: bookId
            }
        })

        response.writeHead(204)
        response.end()
    } catch (e) {
        console.log(e)
        response.writeHead(500, defaultResponseHeader)
        response.end(JSON.stringify({
            error: "Internal server error"
        }))
    }
}
