import { client } from "@/lib/axios/client";
import {
  Article,
  ArticleQueryParams,
  ArticleResponse,
  CreateArticlePayload,
} from "@/lib/types/article";
import { authClient } from "../axios/auth-client";
import { handleApiError } from "../handle-api-error";

export const getArticles = async (params: ArticleQueryParams) => {
  const response = await client.get<ArticleResponse>("/articles", {
    params,
  });

  return response.data;
};

export const getDetailedArticle = async (id: string) => {
  const response = await client.get<Article>(`/articles/${id}`);

  return response.data;
};

export const createArticle = async (
  data: CreateArticlePayload
): Promise<Article> => {
  try {
    const response = await authClient.post<Article>("/articles", data);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await authClient.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.imageUrl;
  } catch (error) {
    throw handleApiError(error);
  }
};
