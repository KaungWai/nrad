import { MyRequest, MyResponse } from "../../types/types";
import { prismaInstance } from "../../utils/prisma";
import * as Yup from 'yup';

export async function getAuthorsHandler(request: MyRequest, response: MyResponse) {
    try {
            const author = await prismaInstance.author.findMany({
                orderBy: {
                    author_name: 'asc'
                }
            })
    
            response.writeHead(200, {
                "Content-Type": "application/json",
            })
        
            const responseData = { author: author }
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