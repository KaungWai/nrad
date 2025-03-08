import { MyRequest, MyResponse } from "../../types/types";
import { prismaInstance } from "../../utils/prisma";
import { requestUtils } from "../../utils/requestUtils";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function deletePublisherByIdHandler(
  request: MyRequest,
  response: MyResponse
) {
  try {
    const urlObj = requestUtils.getURLObject(request);
    const publisherId = urlObj.pathname
      .split("/")
      .filter((x) => x.trim() !== "")[1];

    const publisher = await prismaInstance.publisher.findUnique({
      where: {
        publisher_id: publisherId,
      },
    });

    if (!publisher) {
      response.writeHead(404, defaultResponseHeader);
      response.end(
        JSON.stringify({
          error: "publisher not found",
        })
      );
      return;
    }

    await prismaInstance.publisher.delete({
      where: {
        publisher_id: publisherId,
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
