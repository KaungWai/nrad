import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from "yup";
import { prismaInstance } from "../../utils/prisma";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function getCategoriesHandler(
  request: MyRequest,
  response: MyResponse
) {
  try {
    const categories = await prismaInstance.category.findMany({
      orderBy: {
        category_name: "asc",
      },
    });

    response.writeHead(200, defaultResponseHeader);
    response.end(JSON.stringify(categories));
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
