import ArticleDetailTemplate from "@/components/pages/article/article-detail-template";
import { getArticles, getDetailedArticle } from "@/lib/api/articles";
import { redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ArticleDetailPage = async ({ params }: PageProps) => {
  const { id } = await params;

  const articleDetail = await getDetailedArticle(id);

  const otherArticles = await getArticles({
    category: articleDetail.category?.id,
    sortBy: "updatedAt",
  });

  otherArticles.data = otherArticles.data?.filter(
    (article) => article.id !== articleDetail.id
  );

  otherArticles.data = otherArticles.data?.slice(0, 3);

  if (!articleDetail.id) {
    return redirect("/404");
  }

  return (
    <ArticleDetailTemplate
      article={articleDetail}
      otherArticles={otherArticles.data ?? []}
    />
  );
};

export default ArticleDetailPage;
