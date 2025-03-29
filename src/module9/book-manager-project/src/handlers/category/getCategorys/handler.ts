import { Handler, Sorting } from "../../../types";
import { prismaInstance } from "../../../utils/prismaUtil";
import { getCategorysRequestQuerySchema } from "./requestQuery";

export const getCategorysHandler: Handler = async(request, response) => {

    getCategorysRequestQuerySchema.validateSync(request.query, {
        abortEarly: false
    })

    const query = getCategorysRequestQuerySchema.cast(request.query)

    const where = {
        category_id: query.filter.category_id,
        category_name: {
            contains: query.filter.category_name
        }
    }

    const categoryscount = await prismaInstance.category.count({
        where: where
    })

    const categorys = await prismaInstance.category.findMany({
        where: where,
        orderBy: {
            category_name: query.sorting.category_name as Sorting,
        },
        skip: query.skip,
        take: query.take
    })

    const body = {
        result: categorys,
        meta: {
            total: categoryscount,
            skip: query.skip,
            take: query.take
        }
    }

    return {
        statusCode: 200,
        body: body
    }
}
