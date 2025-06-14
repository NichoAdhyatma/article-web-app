import EditArticleTemplate from "@/components/pages/article/edit-article-template";
import React from "react";

const EditArticlePage = () => {
  return (
    <EditArticleTemplate
      article={{
        title: "Sample Article Title",
        content: "This is a sample article content.",
        category: "health",
        thumbnailUrl: "https://placehold.co/600x400",
      }}
    />
  );
};

export default EditArticlePage;
