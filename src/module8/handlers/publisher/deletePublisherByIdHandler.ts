import { MyRequest, MyResponse } from "../../types/types";
import { prismaInstance } from "../../utils/prisma";
import { requestUtils } from "../../utils/requestUtils";


export async function deletePublisherByIdHandler(request: MyRequest, response: MyResponse) {
    const urlObj = requestUtils.getURLObject(request)
    const publisherId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1]

    const publisher = await prismaInstance.publisher.findUnique({
        where: {
            publisher_id: publisherId
        }
    })

    if (!publisher) {
        response.writeHead(404, {
            "Content-Type": "application/json",
        })
        response.end(JSON.stringify({
            error: "publisher not found"
        }))
        return
    }

    await prismaInstance.publisher.delete({
        where: {
            publisher_id: publisherId
        }
    })

    response.writeHead(204)
    response.end()
}