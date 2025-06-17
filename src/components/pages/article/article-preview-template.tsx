"use client";

import NavbarFooterLayout from "@/components/global/layout/navbar-footer-layout";
import ListArticleCard from "@/components/global/list-article-card";
import { ResponsiveImage } from "@/components/global/responsive-image";
import Box from "@/components/ui/box";
import Typography from "@/components/ui/typography";
import { useArticlePreview } from "@/context/article-preview-context";
import { useAuth } from "@/context/auth-context";
import { getArticles } from "@/lib/api/articles";
import { dummyArticles } from "@/lib/constants";
import { dateFormat } from "@/lib/format/date-format";
import { Article } from "@/lib/types/article";
import { useEffect, useState } from "react";

const ArticlePreviewTemplate = () => {
  const { article } = useArticlePreview();

  const [otherArticles, setOtherArticles] = useState<Article[]>([]);

  const { user } = useAuth();

  const fetchOtherArticles = async () => {
    if (!article || !article.category) {
      return;
    }

    try {
      const articles = await getArticles({
        category: article.category,
        limit: 3,
        page: 1,
        sortBy: "createdAt",
      });
      if (!articles || !articles.data) {
        return;
      }
      setOtherArticles(articles.data);
    } catch (error) {
      console.error("Failed to fetch other articles:", error);
    }
  };

  useEffect(() => {
    fetchOtherArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [article]);

  if (!article) {
    return (
      <NavbarFooterLayout>
        <Typography>No article preview available</Typography>
      </NavbarFooterLayout>
    );
  }

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
              Created by {user?.username || "Unknown"}
            </Typography>
          </Box>

          <Typography size={"text3xl"} weight={"semibold"} align={"center"}>
            {article.title}
          </Typography>
        </Box>

        <ResponsiveImage
          src={article.thumbnailPreview || "https://placehold.co/1120x480"}
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

        <ListArticleCard articles={otherArticles ?? dummyArticles} />
      </Box>
    </NavbarFooterLayout>
  );
};

export default ArticlePreviewTemplate;
