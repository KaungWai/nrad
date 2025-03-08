import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from "yup";
import { prismaInstance } from "../../utils/prisma";
import { defaultResponseHeader } from "../../utils/responseUtils";
import { requestUtils } from "../../utils/requestUtils";

export async function getPublisherByIdHandler(
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

    response.writeHead(200, defaultResponseHeader);
    response.end(JSON.stringify(publisher));
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
