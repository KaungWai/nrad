import { MyRequest, MyResponse } from "../../types/types";
import { requestUtils } from "../../utils/requestUtils";
import { prismaInstance } from "../../utils/prisma";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function deleteAuthorByIdHandler(
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
        author_id: authorId,
      },
    });

    if (!author) {
      response.writeHead(404, defaultResponseHeader);
      response.end(
        JSON.stringify({
          error: "author not found",
        })
      );
      return;
    }

    await prismaInstance.author.delete({
      where: {
        author_id: authorId,
      },
    });

    response.writeHead(204, defaultResponseHeader);
    response.end();
  } catch (e) {
    console.log(e);
    response.writeHead(500, defaultResponseHeader);
    response.end(
      JSON.stringify({
        error: "Internal server error",
      })
    );
  }
}
