import { Request, Response } from "express";
import status from "http-status";

export const logoutHandler = async(request: Request, response: Response) => {
    response.clearCookie('access_token')
    response.status(status.OK).end()
}
