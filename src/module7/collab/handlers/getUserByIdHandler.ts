import { PrismaClient } from '@prisma/client';
import { MyRequest, MyResponse } from "../types/types";
import * as Yup from 'yup'
import { queryUtils } from '../utils/queryUtil';
import { requestUtils } from '../utils/requestUtils';
import { prismaInstance } from '../utils/prisma';

export async function getUserByIdHandler(request: MyRequest, response: MyResponse) {
    const urlObj = requestUtils.getURLObject(request)
    const userId = urlObj.pathname.split('/').filter(x => x.trim() !== "")[1]

    const user = await prismaInstance.user.findUnique({
        where: {
            user_id: userId
        }
    })

    if (!user) {
        response.writeHead(404, {
            "Content-Type": "application/json",
        })
        response.end(JSON.stringify({
            error: "user not found"
        }))
        return
    }

    response.writeHead(200, {
        "Content-Type": "application/json",
    })
    response.end(JSON.stringify(user))
}
