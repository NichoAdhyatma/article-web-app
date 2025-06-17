"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface ReusablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  maxVisiblePages?: number;
}

const PaginationBuilder = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
}: ReusablePaginationProps) => {
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];

  const half = Math.floor(maxVisiblePages / 2);
  let start = Math.max(1, currentPage - half);
  let end = Math.min(totalPages, currentPage + half);

  if (currentPage <= half) {
    end = Math.min(totalPages, maxVisiblePages);
  }

  if (currentPage > totalPages - half) {
    start = Math.max(1, totalPages - maxVisiblePages + 1);
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (start > 1) {
    pages.unshift("...");
    pages.unshift(1);
  }

  if (end < totalPages) {
    pages.push("...");
    pages.push(totalPages);
  }

  return (
    <Pagination className="w-full">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();

              onPageChange?.(Math.max(1, currentPage - 1));
            }}
          />
        </PaginationItem>

        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {page === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();

                  onPageChange?.(Number(page));
                }}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();

              onPageChange?.(Math.min(totalPages, currentPage + 1));
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationBuilder;
