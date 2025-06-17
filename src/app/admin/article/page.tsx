import AdminTemplate from "@/components/pages/admin/admin-template";
import { FilterProvider } from "@/context/filter-context";
import { getArticles } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/category";
import { ArticleQueryParams } from "@/lib/types/article";
import { cookies } from "next/headers";

interface PageProps {
  searchParams: Promise<ArticleQueryParams>;
}

const AdminPage = async ({ searchParams }: PageProps) => {
  const searchParamsObj = await searchParams;

  const title = searchParamsObj.title || "";

  const page = Number(searchParamsObj.page || "1");

  const limit = Number(searchParamsObj.limit || "9");

  const category = searchParamsObj.category || "";

  const cookiesStore = await cookies();

  const userId = cookiesStore.get("userId")?.value || "";

  const articleResponse = await getArticles({
    title,
    page,
    limit,
    category,
    userId,
    sortBy: "updatedAt",
    sortOrder: "desc",
  });

  const categoryResponse = await getCategories({});

  return (
    <FilterProvider>
      <AdminTemplate articles={articleResponse} categories={categoryResponse} />
    </FilterProvider>
  );
};

export default AdminPage;
