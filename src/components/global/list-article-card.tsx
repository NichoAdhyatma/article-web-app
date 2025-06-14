import React from "react";
import { Box } from "../ui/box";
import ArticleCard from "./article-card";
import { Article } from "@/lib/types/article";
import Typography from "../ui/typography";

interface ListArticleCardProps {
  length?: number;
  articles?: Article[];
}

// const dummyAricles: Article[] = [
//   {
//     id: "1",
//     title: "Sample Article 1",
//     content: "This is a sample article content.",
//     imageUrl: "https://placehold.co/387x240",
//     updatedAt: "2023-10-01T12:00:00Z",
//     category: { name: "Category 1" },
//   },
//   {
//     id: "2",
//     title: "Sample Article 2",
//     content: "This is another sample article content.",
//     imageUrl: "https://placehold.co/387x240",
//     updatedAt: "2023-10-02T12:00:00Z",
//     category: { name: "Category 2" },
//   },
// ];

const ListArticleCard = ({ articles }: ListArticleCardProps) => {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {articles && articles.length > 0 ? (
        articles.map((article, index) => (
          <ArticleCard key={article.id || index} article={article} />
        ))
      ) : (
        <Typography>Data not found.</Typography>
      )}
    </Box>
  );
};

export default ListArticleCard;
