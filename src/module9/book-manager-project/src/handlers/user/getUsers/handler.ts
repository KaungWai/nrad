import { Handler, Sorting } from "../../../types";
import { prismaInstance } from "../../../utils/prismaUtil";
import { getUsersRequestQuerySchema } from "./requestQuery";

export const getUsersHandler: Handler = async(request, response) => {

    getUsersRequestQuerySchema.validateSync(request.query, {
        abortEarly: false
    })

    const query = getUsersRequestQuerySchema.cast(request.query)

    const where = {
        user_id: query.filter.user_id,
        user_name: {
            contains: query.filter.user_name
        },
        role: query.filter.role as ('ADMIN' | 'USER' | undefined),
    }

    const count = await prismaInstance.user.count({
        where: where
    })

    const authors = await prismaInstance.user.findMany({
        where: where,
        orderBy: {
            user_name: query.sorting.user_name as Sorting,
            role: query.sorting.role as Sorting,
        },
        skip: query.skip,
        take: query.take
    })

    const body = {
        result: authors,
        meta: {
            total: count,
            skip: query.skip,
            take: query.take
        }
    }

    return {
        statusCode: 200,
        body: body
    }
}
