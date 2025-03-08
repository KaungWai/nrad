import { MyRequest, MyResponse } from "../../types/types";
import { prismaInstance } from "../../utils/prisma";
import { requestUtils } from "../../utils/requestUtils";
import { defaultResponseHeader } from "../../utils/responseUtils";

export async function deleteCategoryByIdHandler(
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

  await prismaInstance.category.delete({
    where: {
      category_id: categoryId,
    },
  });

  response.writeHead(204, defaultResponseHeader);
  response.end();
}
