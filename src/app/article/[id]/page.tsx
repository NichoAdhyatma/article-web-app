import ArticleDetailTemplate from "@/components/pages/article/article-detail-template";
import { getArticles, getDetailedArticle } from "@/data/articles";

interface ArticleDetailPageProps {
  params: {
    id?: string;
  };
}

const ArticleDetailPage = async ({ params }: ArticleDetailPageProps) => {
  const { id } = params;

  if (!id) {
    return <div>Article not found</div>;
  }

  const articleDetail = await getDetailedArticle(id);

  const otherArticles = await getArticles({
    page: 1,
    limit: 3,
    category: articleDetail.category?.id,
    sortBy: "createdAt",
  });

  return (
    <ArticleDetailTemplate
      article={articleDetail}
      otherArticles={otherArticles.data ?? []}
    />
  );
};

export default ArticleDetailPage;
