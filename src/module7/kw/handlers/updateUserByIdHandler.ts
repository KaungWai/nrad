import { MyRequest, MyResponse } from "../types/types";
import * as Yup from 'yup'
import { prismaInstance } from '../utils/prisma';
import { requestUtils } from "../utils/requestUtils";

const bodySchema = Yup.object({
    user_name: Yup.string().max(50).required(),
    user_email: Yup.string().max(200).email().required()
})

type Body = Yup.InferType<typeof bodySchema>

export async function updateUserByIdHandler(request: MyRequest, response: MyResponse) {
    try {
        const urlObj = requestUtils.getURLObject(request)
        const userId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1]

        const targetUser = await prismaInstance.user.findUnique({
            where: {
                user_id: userId
            }
        })

        if(!targetUser) {
            response.writeHead(404, {
                "Content-Type": "application/json",
            })
            response.end(JSON.stringify({
                error: 'User not found'
            }))
            return
        }

        await bodySchema.validate(request.myBody, {
            abortEarly: false
        })
        const body = bodySchema.cast(request.myBody)

        const upatedUser = await prismaInstance.user.update({
            where: {
                user_id: userId
            },
            data: {
                user_name: body.user_name,
                user_email: body.user_email,
                updated_at: new Date()
            }
        })

        response.writeHead(201, {
            "Content-Type": "application/json",
        })
        response.end(JSON.stringify(upatedUser))
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