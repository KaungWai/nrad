import status from 'http-status'
import { Handler } from '../../../types'
import { prismaInstance } from '../../../utils/prismaUtil'

export const getStatsHandler: Handler = async (request, response) => {
  return {
    statusCode: status.OK,
    body: {
      book: await prismaInstance.book.count(),
      category: await prismaInstance.category.count(),
      author: await prismaInstance.author.count(),
      publisher: await prismaInstance.publisher.count(),
    },
  }
}
