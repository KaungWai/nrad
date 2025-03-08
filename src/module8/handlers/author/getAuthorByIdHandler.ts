import { MyRequest, MyResponse } from "../../types/types";
import { prismaInstance } from "../../utils/prisma";
import * as Yup from "yup";
import { defaultResponseHeader } from "../../utils/responseUtils";
import { requestUtils } from "../../utils/requestUtils";

export async function getAuthorByIdHandler(
  request: MyRequest,
  response: MyResponse
) {
  try {
    const urlObj = requestUtils.getURLObject(request);
    const authorId = urlObj.pathname
      .split("/")
      .filter((x) => x.trim() !== "")[1];

    const author = await prismaInstance.author.findUnique({
      where: {
        author_id: authorId
      }
    });

    response.writeHead(200, defaultResponseHeader);
    response.end(JSON.stringify(author));
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
