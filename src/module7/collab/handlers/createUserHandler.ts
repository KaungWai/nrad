import { MyRequest, MyResponse } from "../types/types";
import * as yup from 'yup';
import { prismaInstance } from '../utils/prisma';

const userSchema = yup.object({
    user_name: yup.string().max(50).required(),
    user_email: yup.string().max(200).email().required(),
});

type userType = yup.InferType<typeof userSchema>

export async function createUserHandler(request: MyRequest, response: MyResponse) {
    try {
        await userSchema.validate (request.myBody, {
            abortEarly: false,
        });
        
        const user: userType = userSchema.cast(request.myBody)       
 
        const createUser = await prismaInstance.user.create({
            data: {
                user_name: user.user_name,
                user_email: user.user_email,
            }     
        });
        response.writeHead( 201, {
            "Content-Type": "application/json",
        })
        response.end(JSON.stringify(createUser));
    } catch (error) {
        if(error instanceof yup.ValidationError) {
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