import React from "react";
import { Box } from "../ui/box";
import ArticleCard from "./article-card";

interface ListArticleCardProps {
  length?: number;
}

const ListArticleCard = ({ length = 0 }: ListArticleCardProps) => {
  return (
    <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
      {Array.from({ length }, (_, index) => (
        <ArticleCard key={index} />
      ))}
    </Box>
  );
};

export default ListArticleCard;
