import { Category } from "./category";

export interface ArticleResponse {
  data?: Article[];
  total?: number;
  page?: number;
  limit?: number;
}

export interface Article {
  id?: string;
  userId?: string;
  categoryId?: string;
  title?: string;
  content?: string;
  imageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  user?: User;
}

export interface User {
  id?: string;
  username?: string;
}

export interface ArticleQueryParams {
  title?: string;
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: "createdAt" | "updatedAt" | "title";
  userId?: string;
}

export type CreateArticlePayload = {
  title: string;
  content: string;
  categoryId: string;
  imageUrl?: string;
};
