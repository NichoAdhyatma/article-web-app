import CategoryTemplate from "@/components/pages/category/category-template";
import { FilterProvider } from "@/context/filter-context";
import { getCategories } from "@/lib/api/category";
import { CategoryQueryParams } from "@/lib/types/category";

interface PageProps {
  searchParams: Promise<CategoryQueryParams>;
}

const CategoryPage = async ({ searchParams }: PageProps) => {
  const searchParamsObj = await searchParams;

  const title = searchParamsObj.title || "";
  const page = searchParamsObj.page || 1;
  const limit = searchParamsObj.limit || 10;

  const categories = await getCategories({
    page,
    limit,
    title
  });

  return (
    <FilterProvider>
      <CategoryTemplate categories={categories} />
    </FilterProvider>
  );
};

export default CategoryPage;
