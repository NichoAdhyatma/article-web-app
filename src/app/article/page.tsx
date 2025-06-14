import HomeTemplate from "@/components/pages/home/home-template";
import { CategoryProvider } from "@/context/category-context";
import { FilterProvider } from "@/context/filter-context";
import { getArticles } from "@/data/articles";
import { getCategories } from "@/data/category";
import { ArticleQueryParams } from "@/lib/types/article";

interface PageProps {
  searchParams: ArticleQueryParams;
}

const HomePage = async ({ searchParams }: PageProps) => {
  const title =
    typeof searchParams.title === "string" ? searchParams.title : "";
  const page = Number(
    typeof searchParams.page === "string" ? searchParams.page : "1"
  );
  const limit = Number(
    typeof searchParams.limit === "string" ? searchParams.limit : "9"
  );
  const category =
    typeof searchParams.category === "string" ? searchParams.category : "";

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
