import { PrismaClient } from '@prisma/client';
import { MyRequest, MyResponse } from "../types/types";

const prisma = new PrismaClient()

export async function getUsersHandler(request: MyRequest, response: MyResponse) {
    response.writeHead(200, {
        "Content-Type": "application/json",
    })
    const users = await prisma.user.findMany({
        where : {
            // 
        }
    })
    const responseData = { users: users }
    response.end(JSON.stringify(responseData))
}
