import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
    for (let i = 0; i < 100; i++) {
        await prisma.user.create({
            data: {
                user_name: faker.internet.username(),
                user_email: faker.internet.email(),
            }
        })
    }
}

main()