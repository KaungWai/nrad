import { Handler, Sorting } from "../../../types";
import { prismaInstance } from "../../../utils/prismaUtil";
import { getPublishersRequestQuerySchema } from "./requestQuery";

export const getPublishersHandler: Handler = async(request, response) => {

    getPublishersRequestQuerySchema.validateSync(request.query, {
        abortEarly: false
    })

    const query = getPublishersRequestQuerySchema.cast(request.query)

    const where = {
        publisher_id: query.filter.publisher_id,
        publisher_name: {
            contains: query.filter.publisher_name
        },
    }

    const publisherscount = await prismaInstance.publisher.count({
        where: where
    })

    const publishers = await prismaInstance.publisher.findMany({
        where: where,
        orderBy: {
            publisher_name: query.sorting.publisher_name as Sorting,
        },
        skip: query.skip,
        take: query.take
    })

    const body = {
        result: publishers,
        meta: {
            total: publisherscount,
            skip: query.skip,
            take: query.take
        }
    }

    return {
        statusCode: 200,
        body: body
    }
}
