import { MyRequest, MyResponse } from "../../types/types";

import * as Yup from 'yup'
import { requestUtils } from "../../utils/requestUtils";
import { prismaInstance } from "../../utils/prisma";

const bodySchema = Yup.object({
    category_name: Yup.string().max(200).required(),
})

type Body = Yup.InferType<typeof bodySchema>

export async function updateCategoryByIdHandler(request: MyRequest, response: MyResponse) {
    try {
        const urlObj = requestUtils.getURLObject(request)
        const categoryId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1]

        const targetCategory = await prismaInstance.category.findUnique({
            where: {
                category_id: categoryId
            }
        })

        if(!targetCategory) {
            response.writeHead(404, {
                "Content-Type": "application/json",
            })
            response.end(JSON.stringify({
                error: 'Category not found'
            }))
            return
        }

        await bodySchema.validate(request.myBody, {
            abortEarly: false
        })
        const body = bodySchema.cast(request.myBody)

        const upatedUser = await prismaInstance.category.update({
            where: {
                category_id: categoryId
            },
            data: {
                category_name: body.category_name,
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