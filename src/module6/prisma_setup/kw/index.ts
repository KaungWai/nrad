import { config } from 'dotenv';

import { PrismaClient } from '@prisma/client';

config()


const prisma = new PrismaClient()

async function main() {
    const user = await prisma.post.findMany({

    })
}

main()