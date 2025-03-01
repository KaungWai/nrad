import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from 'yup';
import { queryUtils } from '../../utils/queryUtil';
import { requestUtils } from '../../utils/requestUtils';
import { prismaInstance } from "../../utils/prisma";

const querySchema = Yup.object({
    filter: Yup.object({
        category_id: Yup.string().min(36).max(36),
        category_name: Yup.string().max(200),
    }),
})

type Query = Yup.InferType<typeof querySchema>

export async function getCategoriesHandler(request: MyRequest, response: MyResponse) {

    const urlObj = requestUtils.getURLObject(request)
    let query: Query = queryUtils.decodeQuery(urlObj);

    try {
        await querySchema.validate(query)
        query = querySchema.cast(query)

        const category = await prismaInstance.category.findMany({
            where: {
                category_id: query.filter.category_id,
                category_name: {
                    contains: query.filter.category_name,
                    mode: 'insensitive'
                },
            },
        })
    
        response.writeHead(200, {
            "Content-Type": "application/json",
        })
    
        const responseData = { category: category }
        response.end(JSON.stringify(responseData))
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
