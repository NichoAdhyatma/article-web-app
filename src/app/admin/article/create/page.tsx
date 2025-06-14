import CreateArticleTemplate from "@/components/pages/article/create-article-template";
import { getCategories } from "@/lib/api/category";

const CreateArticlePage = async () => {
  const categoryResponse = await getCategories({});

  return <CreateArticleTemplate categories={categoryResponse} />;
};

export default CreateArticlePage;
