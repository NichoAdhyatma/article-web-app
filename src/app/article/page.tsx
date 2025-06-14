import HomeTemplate from "@/components/pages/home/home-template";
import { CategoryProvider } from "@/context/category-context";
import { FilterProvider } from "@/context/filter-context";
import { getArticles } from "@/data/articles";
import { getCategories } from "@/data/category";
import { ArticleQueryParams } from "@/lib/types/article";

interface PageProps {
  searchParams: Promise<ArticleQueryParams>;
}

const HomePage = async ({ searchParams }: PageProps) => {
  const searchParamsObj = await searchParams;

  const title = searchParamsObj.title || "";

  const page = Number(searchParamsObj.page || "1");

  const limit = Number(searchParamsObj.limit || "9");

  const category = searchParamsObj.category || "";

  const articleResponse = await getArticles({
    title,
    page,
    limit,
    category,
  });

  const categoryResponse = await getCategories({});

  return (
    <FilterProvider>
      <CategoryProvider categories={categoryResponse}>
        <HomeTemplate
          articleResponse={articleResponse}
          categoryResponse={categoryResponse}
        />
      </CategoryProvider>
    </FilterProvider>
  );
};

export default HomePage;
