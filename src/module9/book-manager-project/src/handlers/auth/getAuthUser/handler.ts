import status from 'http-status'
import { Handler } from '../../../types'

export const getAuthUserHandler: Handler = async (request, response) => {
  return {
    statusCode: status.OK,
    body: request.user,
  }
}
