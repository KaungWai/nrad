import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from "yup";
import { prismaInstance } from "../../utils/prisma";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function getPublishersHandler(
  request: MyRequest,
  response: MyResponse
) {
  try {
    const publishers = await prismaInstance.publisher.findMany({
      orderBy: {
        publisher_name: "asc",
      },
    });

    response.writeHead(200, defaultResponseHeader);

    response.end(JSON.stringify(publishers));
  } catch (e) {
    if (e instanceof Yup.ValidationError) {
      response.writeHead(400, defaultResponseHeader);
      response.end(
        JSON.stringify({
          error: e.errors,
        })
      );
    } else {
      console.log(e);
      response.writeHead(500, defaultResponseHeader);
      response.end(
        JSON.stringify({
          error: "Internal server error",
        })
      );
    }
  }
}
