import { useMutation } from "@tanstack/react-query";
import {
  createArticle,
  deleteArticle,
  updateArticle,
  uploadImage,
} from "@/lib/api/articles";
import { CreateArticlePayload, Article } from "@/lib/types/article";

export const useCreateArticle = () => {
  return useMutation<Article, Error, CreateArticlePayload>({
    mutationFn: createArticle,
  });
};

export const useUploadImage = () => {
  return useMutation<string, Error, File>({
    mutationFn: uploadImage,
  });
};

export const useDeleteArticle = () => {
  return useMutation({
    mutationFn: (id: string) => deleteArticle(id),
  });
};

export const useUpdateArticle = () => {
  return useMutation({
    mutationFn: updateArticle,
  });
};
