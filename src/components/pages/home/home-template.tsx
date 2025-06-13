"use client";

import { Box } from "@/components/ui/box";
import React, { useEffect, useRef, useState } from "react";
import HeaderContent from "./header-content";
import NavbarProfile from "../../global/navbar-profile";
import Typography from "@/components/ui/typography";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Footer from "@/components/global/footer";
import ListArticleCard from "@/components/global/list-article-card";

const HomeTemplate = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.2
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

  return (
    <>
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
      <Box className="flex-1 py-10 px-5 gap-10">
        <Box
          align={"start"}
          justify={"start"}
          className="max-w-[1240px] mx-auto gap-6"
        >
          <Typography className="text-slate-600" align={"left"}>
            Showing : 20 of 240 articles
          </Typography>

          <ListArticleCard length={9} />
        </Box>

        <Pagination className="w-full">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>

            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>

            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>

            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default HomeTemplate;
