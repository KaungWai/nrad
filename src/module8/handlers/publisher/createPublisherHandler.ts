import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from 'yup'
import { prismaInstance } from "../../utils/prisma";


const publisherSchema = Yup.object({
    publisher_name: Yup.string().max(200).required(),
});

type PublisherType = Yup.InferType<typeof publisherSchema>

export async function createPublisherHandler(request: MyRequest, response: MyResponse) {
    try {
        await publisherSchema.validate(request.myBody, {
            abortEarly: false,
        });

        const publisher: PublisherType = publisherSchema.cast(request.myBody)

        const createPublisher = await prismaInstance.publisher.create({
            data: {
                publisher_name: publisher.publisher_name,
                created_at: new Date(), 
                updated_at: new Date(),
            }
        });
        response.writeHead(201, {
            "Content-Type": "application/json",
        })
        response.end(JSON.stringify(createPublisher));
    } catch (error) {
        if (error instanceof Yup.ValidationError) {
            response.writeHead(401, {
                "Content-Type": "application/json",
            })
            response.end(JSON.stringify({
                error: error.errors
            }))
        } else {
            console.log(error)
            response.writeHead(500, {
                "Content-Type": "application/json",
            })
            response.end(JSON.stringify({
                error: "Internal Server Error"
            }))
        }
    }
}