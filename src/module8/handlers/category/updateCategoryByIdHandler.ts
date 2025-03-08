import { MyRequest, MyResponse } from "../../types/types";

import * as Yup from "yup";
import { requestUtils } from "../../utils/requestUtils";
import { prismaInstance } from "../../utils/prisma";
import { defaultResponseHeader } from "../../utils/responseUtils";

const bodySchema = Yup.object({
  category_name: Yup.string().max(200).required(),
});

type Body = Yup.InferType<typeof bodySchema>;

export async function updateCategoryByIdHandler(
  request: MyRequest,
  response: MyResponse
) {
  try {
    const urlObj = requestUtils.getURLObject(request);
    const categoryId = urlObj.pathname
      .split("/")
      .filter((x) => x.trim() !== "")[1];

    const targetCategory = await prismaInstance.category.findUnique({
      where: {
        category_id: categoryId,
      },
    });

    if (!targetCategory) {
      response.writeHead(404, defaultResponseHeader);
      response.end(
        JSON.stringify({
          error: "Category not found",
        })
      );
      return;
    }

    await bodySchema.validate(request.myBody, {
      abortEarly: false,
    });
    const body = bodySchema.cast(request.myBody);

    const upatedCategory = await prismaInstance.category.update({
      where: {
        category_id: categoryId,
      },
      data: {
        category_name: body.category_name,
        updated_at: new Date(),
      },
    });

    response.writeHead(201, defaultResponseHeader);
    response.end(JSON.stringify(upatedCategory));
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
