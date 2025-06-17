"use client";

import ListArticleCard from "@/components/global/list-article-card";
import { ResponsiveImage } from "@/components/global/responsive-image";
import NavbarFooterLayout from "@/components/global/layout/navbar-footer-layout";
import { Box } from "@/components/ui/box";
import Typography from "@/components/ui/typography";
import { dateFormat } from "@/lib/format/date-format";
import { Article } from "@/lib/types/article";
import { useEffect } from "react";

interface ArticleDetailTemplateProps {
  article: Article;
  otherArticles: Article[];
}

const ArticleDetailTemplate = ({
  article,
  otherArticles,
}: ArticleDetailTemplateProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <NavbarFooterLayout>
      <Box className="py-10 max-w-[1120px] mx-auto gap-7 px-5">
        <Box className="gap-4 max-w-[642px]">
          <Box direction={"row"} className="gap-2">
            <Typography
              size={"textSm"}
              weight={"medium"}
              className="text-slate-600"
            >
              {dateFormat.MMMMdyyyy(new Date())}
            </Typography>

            <Typography
              size={"textSm"}
              weight={"medium"}
              className="text-slate-600"
            >
              •
            </Typography>
            <Typography
              size={"textSm"}
              weight={"medium"}
              className="text-slate-600"
            >
              Created by {article.user?.username || "Unknown"}
            </Typography>
          </Box>

          <Typography size={"text3xl"} weight={"semibold"} align={"center"}>
            {article.title}
          </Typography>
        </Box>

        <ResponsiveImage
          src={article.imageUrl || "/placeholder-img.png"}
          alt="placeholder-img"
          aspectRatio="1120/480"
          objectFit="cover"
          rounded="rounded-[12px]"
          className="my-4"
          unoptimized
        />

        <div
          dangerouslySetInnerHTML={{ __html: article.content as string }}
          className="text-base text-slate-700"
        />
      </Box>

      <Box
        align={"start"}
        className="gap-3 max-w-[1080px] mx-auto pt-4 pb-25 px-5"
      >
        <Typography size={"textXl"} weight={"bold"}>
          Other articles
        </Typography>

        <ListArticleCard articles={otherArticles} />
      </Box>
    </NavbarFooterLayout>
  );
};

export default ArticleDetailTemplate;
