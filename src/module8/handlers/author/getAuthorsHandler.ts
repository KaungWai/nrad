import { MyRequest, MyResponse } from "../../types/types";
import { prismaInstance } from "../../utils/prisma";
import * as Yup from "yup";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function getAuthorsHandler(
  request: MyRequest,
  response: MyResponse
) {
  try {
    const authors = await prismaInstance.author.findMany({
      orderBy: {
        author_name: "asc",
      },
    });

    response.writeHead(200, defaultResponseHeader);
    response.end(JSON.stringify(authors));
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
