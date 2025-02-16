import { MyRequest, MyResponse } from "../types/types";
import * as Yup from 'yup'
import { prismaInstance } from '../utils/prisma';

const bodySchema = Yup.object({
    user_name: Yup.string().max(50).required(),
    user_email: Yup.string().max(200).email().required()
})

type Body = Yup.InferType<typeof bodySchema>

export async function createUserHandler(request: MyRequest, response: MyResponse) {
    try {
        await bodySchema.validate(request.myBody, {
            abortEarly: false,
        })
        const body: Body = bodySchema.cast(request.myBody)

        const newUser = await prismaInstance.user.create({
            data: {
                user_name: body.user_name,
                user_email: body.user_email
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