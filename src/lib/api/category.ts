import { client } from "@/lib/axios/client";
import { CategoryQueryParams, CategoryResponse } from "@/lib/types/category";

export const getCategories = async (params: CategoryQueryParams) => {
  try {
    const response = await client.get<CategoryResponse>("/categories", {
      params: {
        limit: params?.limit ?? 1000,
        page: params?.page ?? 1,
        search: params?.title ?? "",
      },
    });

    return response.data;
  } catch (error) {
    console.log("error", error);

    return {};
  }
};
