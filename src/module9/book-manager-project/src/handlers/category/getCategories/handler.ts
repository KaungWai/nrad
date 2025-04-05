import { Handler, Sorting } from "../../../types";
import { prismaInstance } from "../../../utils/prismaUtil";
import { getCategoriesRequestQuerySchema } from "./requestQuery";

export const getCategoriesHandler: Handler = async(request, response) => {

    getCategoriesRequestQuerySchema.validateSync(request.query, {
        abortEarly: false
    })

    const query = getCategoriesRequestQuerySchema.cast(request.query)

    const where = {
        category_id: query.filter.category_id,
        category_name: {
            contains: query.filter.category_name
        }
    }

    const categoriescount = await prismaInstance.category.count({
        where: where
    })

    const categories = await prismaInstance.category.findMany({
        where: where,
        orderBy: {
            category_name: query.sorting.category_name as Sorting,
        },
        skip: query.skip,
        take: query.take
    })

    const body = {
        result: categories,
        meta: {
            total: categoriescount,
            skip: query.skip,
            take: query.take
        }
    }

    return {
        statusCode: 200,
        body: body
    }
}
