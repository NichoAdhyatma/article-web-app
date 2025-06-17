"use client";

import { Box } from "../ui/box";
import { dateFormat } from "@/lib/format/date-format";
import Typography from "../ui/typography";
import { Badge } from "../ui/badge";
import { ResponsiveImage } from "./responsive-image";
import { useRouter } from "next/navigation";
import { Article } from "@/lib/types/article";
import { cleanStringFromHTML } from "@/lib/format/string-format";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const router = useRouter();

  const handleNavigateToDetail = () => {
    router.push(`/article/${article.id}`);
  };

  return (
    <Box
      className="gap-4 sm:max-w-[387px] h-[456px]"
      onClick={handleNavigateToDetail}
    >
      <ResponsiveImage
        src={article.imageUrl || "https://placehold.co/387x240"}
        alt="placeholder-img"
        aspectRatio="387/240"
        objectFit="cover"
        rounded="rounded-[12px]"
        unoptimized
      />

      <Box className="gap-2 min-h-[200px]" align={"start"} justify={"start"}>
        <Typography size={"textSm"} className="text-slate-600">
          {dateFormat.MMMMdyyyy(article.updatedAt ?? "")}
        </Typography>

        <Typography
          size={"textLg"}
          weight={"semibold"}
          className="text-slate-900 line-clamp-2"
        >
          {article.title || "-"}
        </Typography>

        <Typography size={"textBase"} className="text-slate-600 line-clamp-3">
          {cleanStringFromHTML(article.content ?? "-")}
        </Typography>

        <Box justify={"start"} direction={"row"} className="gap-2">
          <Badge> {article.category?.name}</Badge>
        </Box>
      </Box>
    </Box>
  );
};

export default ArticleCard;
