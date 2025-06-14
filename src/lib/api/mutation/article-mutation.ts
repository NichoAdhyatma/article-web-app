import { useMutation } from "@tanstack/react-query";
import { createArticle, uploadImage } from "@/lib/api/articles";
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
