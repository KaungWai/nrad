import { PrismaClient } from '@prisma/client';
import { MyRequest, MyResponse } from "../types/types";
import * as Yup from 'yup'
import { queryUtils } from '../utils/queryUtil';
import { requestUtils } from '../utils/requestUtils';
import { prismaInstance } from '../utils/prisma';

const querySchema = Yup.object({
    filter: Yup.object({
        userId: Yup.string().min(36).max(36),
        userName: Yup.string().max(50),
        userEmail: Yup.string().email().max(200),
    }),
    sorting: Yup.object({
        userId : Yup.string().oneOf(['asc', 'desc']),
        userName : Yup.string().oneOf(['asc', 'desc']),
        userEmail : Yup.string().oneOf(['asc', 'desc']),
    }),
    skip: Yup.number().required().min(0),
    take: Yup.number().required().min(10).max(100),
})

type SortBy = 'asc' | 'desc'

type Query = Yup.InferType<typeof querySchema>

export async function getUsersHandler(request: MyRequest, response: MyResponse) {

    const urlObj = requestUtils.getURLObject(request)
    let query: Query = queryUtils.decodeQuery(urlObj);

    try {
        await querySchema.validate(query)
        query = querySchema.cast(query)

        const users = await prismaInstance.user.findMany({
            where: {
                user_id: query.filter.userId,
                user_name: {
                    contains: query.filter.userName,
                    mode: 'insensitive'
                },
                user_email:  query.filter.userEmail
            },
            orderBy: {
                user_id: query.sorting.userId as SortBy,
                user_name: query.sorting.userName as SortBy,
                user_email: query.sorting.userEmail as SortBy
            },
            skip: query.skip,
            take: query.take
        })
    
        response.writeHead(200, {
            "Content-Type": "application/json",
        })
    
        const responseData = { users: users }
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
