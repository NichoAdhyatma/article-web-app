import { client } from "@/lib/axios/client";
import { CategoryQueryParams, CategoryResponse } from "@/lib/types/category";
import { authClient } from "../axios/auth-client";
import { handleApiError } from "../handle-api-error";

export const getCategories = async (params: CategoryQueryParams) => {
  try {
    const response = await client.get<CategoryResponse>("/categories", {
      params: {
        limit: params?.limit ?? 1000,
        page: params?.page ?? 1,
        search: params?.search ?? "",
      },
    });

    return response.data;
  } catch (error) {
    console.log("error", error);

    return {} as CategoryResponse;
  }
};

export const createCategory = async (data: { name: string }) => {
  try {
    const response = await authClient.post<CategoryResponse>(
      "/categories",
      data
    );

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateCategory = async (
  id: string,
  data: { name: string }
) => {  
  try {
    const response = await authClient.put<CategoryResponse>(
      `/categories/${id}`,
      data
    );

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}

export const deleteCategory = async (id: string) => {
  try {
    const response = await authClient.delete<CategoryResponse>(
      `/categories/${id}`
    );

    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
}
