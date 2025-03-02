import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from 'yup';
import { prismaInstance } from "../../utils/prisma";

export async function getPublishersHandler(request: MyRequest, response: MyResponse) {
    try {
        const publisher = await prismaInstance.publisher.findMany({
            orderBy: {
                publisher_name: 'asc'
            }
        })

        response.writeHead(200, {
            "Content-Type": "application/json",
        })
    
        const responseData = { publisher: publisher }
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
