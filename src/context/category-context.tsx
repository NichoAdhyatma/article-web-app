'use client'

import { CategoryResponse } from "@/lib/types/category";
import { createContext, ReactNode, useContext } from "react";

type CategoryContextType = {
  categories: CategoryResponse;
};

const CategoryContext = createContext<CategoryContextType | undefined>(
  undefined
);

export const CategoryProvider = ({
  children,
  categories,
}: {
  children: ReactNode;
  categories: CategoryResponse;
}) => {
  return (
    <CategoryContext.Provider value={{ categories }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory must be used within a CategoryProvider");
  }
  return context;
};
