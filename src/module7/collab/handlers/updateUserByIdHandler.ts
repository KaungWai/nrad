import { MyRequest, MyResponse } from "../types/types";
import * as Yup from 'yup'
import { prismaInstance } from '../utils/prisma';
import { requestUtils } from "../utils/requestUtils";

export async function updateUserByIdHandler(request: MyRequest, response: MyResponse) {
    //
}