import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from 'yup'
import { prismaInstance } from '../../utils/prisma';
import { requestUtils } from "../../utils/requestUtils";

const bodySchema = Yup.object({
    author_name: Yup.string().max(200).required(),
})

type Body = Yup.InferType<typeof bodySchema>

export async function updateAuthorByIdHandler(request: MyRequest, response: MyResponse) {
    try {
        const urlObj = requestUtils.getURLObject(request)
        const authorId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1]

        const targetAuthor = await prismaInstance.author.findUnique({
            where: {
                author_id: authorId
            }
        })

        if(!targetAuthor) {
            response.writeHead(404, {
                "Content-Type": "application/json",
            })
            response.end(JSON.stringify({
                error: 'Author not found'
            }))
            return
        }

        await bodySchema.validate(request.myBody, {
            abortEarly: false
        })
        const body = bodySchema.cast(request.myBody)

        const upatedAunthor = await prismaInstance.author.update({
            where: {
                author_id: authorId
            },
            data: {
                author_name: body.author_name,
                updated_at: new Date()
            }
        })

        response.writeHead(201, {
            "Content-Type": "application/json",
        })
        response.end(JSON.stringify(upatedAunthor))
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