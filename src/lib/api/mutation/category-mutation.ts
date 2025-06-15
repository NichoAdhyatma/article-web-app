// hooks/useCreateCategory.ts
import { useMutation } from "@tanstack/react-query";
import { createCategory, deleteCategory, updateCategory } from "../category";

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: createCategory,
  });
};

export const useUpdateCategory = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: { name: string } }) =>
      updateCategory(id, data),
  });
};

export const useDeleteCategory = () => {
  return useMutation({
    mutationFn: deleteCategory,
  });
};
