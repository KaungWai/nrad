import { MyRequest, MyResponse } from "../../types/types";
import * as Yup from "yup";
import { queryUtils } from "../../utils/queryUtil";
import { requestUtils } from "../../utils/requestUtils";
import { prismaInstance } from "../../utils/prisma";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function getCategoryByIdHandler(
  request: MyRequest,
  response: MyResponse
) {
  const urlObj = requestUtils.getURLObject(request);
  const categoryId = urlObj.pathname
    .split("/")
    .filter((x) => x.trim() !== "")[1];

  const category = await prismaInstance.category.findUnique({
    where: {
      category_id: categoryId,
    },
  });

  if (!category) {
    response.writeHead(404, defaultResponseHeader);
    response.end(
      JSON.stringify({
        error: "category not found",
      })
    );
    return;
  }

  response.writeHead(200, defaultResponseHeader);
  response.end(JSON.stringify(category));
}
