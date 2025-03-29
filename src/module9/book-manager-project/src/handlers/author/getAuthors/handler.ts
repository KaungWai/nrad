import { Handler, Sorting } from "../../../types";
import { prismaInstance } from "../../../utils/prismaUtil";
import { getAuthorsRequestQuerySchema } from "./requestQuery";

export const getAuthorsHandler: Handler = async(request, response) => {

    getAuthorsRequestQuerySchema.validateSync(request.query, {
        abortEarly: false
    })

    const query = getAuthorsRequestQuerySchema.cast(request.query)

    const where = {
        author_id: query.filter.author_id,
        author_name: {
            contains: query.filter.author_name
        },
        gender: query.filter.gender as ('MALE' | 'FEMALE' | undefined),
        birth_date: query.filter.birth_date ? new Date(query.filter.birth_date) : undefined
    }

    const authorscount = await prismaInstance.author.count({
        where: where
    })

    const authors = await prismaInstance.author.findMany({
        where: where,
        orderBy: {
            author_name: query.sorting.author_name as Sorting,
            gender: query.sorting.gender as Sorting,
            birth_date: query.sorting.birth_date as Sorting,
        },
        skip: query.skip,
        take: query.take
    })

    const body = {
        result: authors,
        meta: {
            total: authorscount,
            skip: query.skip,
            take: query.take
        }
    }

    return {
        statusCode: 200,
        body: body
    }
}
