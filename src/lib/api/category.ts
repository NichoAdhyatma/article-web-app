import { client } from "@/lib/axios/client";
import { CategoryResponse } from "@/lib/types/category";

export const getCategories = async (params: { limit?: number }) => {
    
  const response = await client.get<CategoryResponse>("/categories", {
    params: {
      limit: params?.limit ?? 100,
    },
  });

  return response.data;
};
