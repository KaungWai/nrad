import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from 'yup'
import { prismaInstance } from '../../utils/prisma';

const bodySchema = Yup.object({
    author_name: Yup.string().max(200).required(),
})

type Body = Yup.InferType<typeof bodySchema>

export async function createAuthorHandler(request: MyRequest, response: MyResponse) {
    try {
        await bodySchema.validate(request.myBody, {
            abortEarly: false,
        })
        const body: Body = bodySchema.cast(request.myBody)

        const newUser = await prismaInstance.author.create({
            data: {
                author_name: body.author_name,
                created_at: new Date(),
                updated_at: new Date()
            }
        })
        response.writeHead(201, {
            "Content-Type": "application/json",
        })
        response.end(JSON.stringify(newUser))
    } catch(e) {
        if(e instanceof Yup.ValidationError) {
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