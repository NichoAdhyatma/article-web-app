import { client } from "@/lib/axios/client";
import { Article, ArticleQueryParams, ArticleResponse } from "@/lib/types/article";

export const getArticles = async (params: ArticleQueryParams) => {
  const response = await client.get<ArticleResponse>("/articles", {
    params,
  });

  return response.data;
};

export const getDetailedArticle = async (id: string) => {
  const response = await client.get<Article>(`/articles/${id}`);

  return response.data;
}
