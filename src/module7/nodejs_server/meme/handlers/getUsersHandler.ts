import { PrismaClient } from '@prisma/client';
import { MyRequest, MyResponse } from "../types/types";
import * as Yup from 'yup'
import { queryUtils } from '../utils/queryUtil';
import { requestUtils } from '../utils/requestUtils';

const prisma = new PrismaClient()

const querySchema = Yup.object({
    filter: Yup.object({

    }),
    sorting: Yup.object({

    }),
    skip: Yup.number().required().min(0),
    take: Yup.number().required().min(10).max(100),
})

type SortBy = 'asc' | 'desc'

type Query = Yup.InferType<typeof querySchema>

export async function getUsersHandler(request: MyRequest, response: MyResponse) {

}
