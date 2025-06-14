"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

type FilterContextType = {
  title: string;
  page: number;
  limit: number;
  category: string; // Assuming you want to add category later
  handleSearch: (title: string) => void;
  handlePageChange: (page: number) => void;
  handleCategoryChange: (category: string) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const title = searchParams.get("title") ?? "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "9", 10);
  const category = searchParams.get("category") ?? "";

  const handleSearch = (newTitle: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newTitle.trim()) {
      params.set("title", newTitle.trim());
    } else {
      params.delete("title");
    }

    params.set("page", "1");

    params.set("limit", limit.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", newPage.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newCategory.trim()) {
      params.set("category", newCategory.trim());
    } else {
      params.delete("category");
    }
    params.set("page", "1");

    params.set("limit", limit.toString());

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const value = useMemo(
    () => ({
      title,
      page,
      limit,
      category,
      handleSearch,
      handlePageChange,
      handleCategoryChange,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [title, page, limit, category]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  }
  return context;
};
