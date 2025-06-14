import EditArticleTemplate from "@/components/pages/article/edit-article-template";
import { getDetailedArticle } from "@/lib/api/articles";
import { getCategories } from "@/lib/api/category";

interface PageProps {
  params: Promise<{ id: string }>;
}

const EditArticlePage = async ({ params }: PageProps) => {
  const { id } = await params;

  const articleDetail = await getDetailedArticle(id);

   const categoryResponse = await getCategories({});

  return (
    <EditArticleTemplate
      article={{
        id: articleDetail.id ?? "",
        title: articleDetail.title ?? "",
        content:  articleDetail.content ?? "",
        category:  articleDetail.category?.id ?? "",
        thumbnailUrl:  articleDetail.imageUrl ?? "",
      }}
      categoryResponse={categoryResponse}
    />
  );
};

export default EditArticlePage;
