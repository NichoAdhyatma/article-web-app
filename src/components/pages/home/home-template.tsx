"use client";

import { Box } from "@/components/ui/box";
import React, { useEffect, useMemo, useRef, useState } from "react";
import HeaderContent from "./header-content";
import NavbarProfile from "../../global/navbar-profile";
import Typography from "@/components/ui/typography";
import Footer from "@/components/global/footer";
import ListArticleCard from "@/components/global/list-article-card";
import PaginationBuilder from "@/components/global/builder/pagination-builder";
import { ArticleResponse } from "@/lib/types/article";
import { useFilterContext } from "@/context/filter-context";
import { CategoryResponse } from "@/lib/types/category";

interface HomeTemplateProps {
  articleResponse?: ArticleResponse;
  categoryResponse?: CategoryResponse; 
}

const HomeTemplate = ({ articleResponse }: HomeTemplateProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  const { handlePageChange } = useFilterContext();

  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0,
      }
    );

    const headerNode = headerRef.current;

    if (headerNode) {
      observer.observe(headerNode);
    }

    return () => {
      if (headerNode) {
        observer.unobserve(headerNode);
      }
    };
  }, []);

  const getTotalPages = useMemo(() => {
    if (!articleResponse || !articleResponse.total || !articleResponse.limit) {
      return 0;
    }

    return Math.ceil(articleResponse?.total / articleResponse?.limit);
  }, [articleResponse]);

  const getTotalArticles = () => {
    return articleResponse?.total || 0;
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <Box ref={headerRef} className="bg-img-header">
        <Box className="bg-[#2563EB]/[0.86]">
          <NavbarProfile
            responsive={!isScrolled}
            className="fixed top-0 left-0 right-0 z-50"
          />

          <HeaderContent />
        </Box>
      </Box>

      {/* Main Content */}
      <Box justify={"start"} className="flex-1 py-10 px-5 gap-10">
        <Box
          align={"start"}
          justify={"start"}
          className="max-w-[1240px] mx-auto gap-6 pt-10 sm:pt-0"
        >
          <Typography className="text-slate-600 hidden sm:block" align={"left"}>
            Showing : {articleResponse?.data?.length} of {getTotalArticles()}{" "}
            articles
          </Typography>

          <ListArticleCard length={9} articles={articleResponse?.data} />
        </Box>

        {getTotalArticles() > 9 && (
          <PaginationBuilder
            totalPages={getTotalPages}
            currentPage={articleResponse?.page || 1}
            onPageChange={handlePageChange}
          />
        )}
      </Box>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomeTemplate;
