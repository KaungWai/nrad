import { PrismaClient } from '@prisma/client';
import { MyRequest, MyResponse } from "../types/types";
import * as Yup from 'yup'
import { queryUtils } from '../utils/queryUtil';
import { requestUtils } from '../utils/requestUtils';
import { prismaInstance } from '../utils/prisma';

export async function deleteUserByIdHandler(request: MyRequest, response: MyResponse) {
    //
}
