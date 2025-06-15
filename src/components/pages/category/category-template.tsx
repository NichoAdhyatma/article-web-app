"use client";

import PaginationBuilder from "@/components/global/builder/pagination-builder";
import AdminBoxWrapper from "@/components/pages/admin/admin-box-wraper";
import { CreateCategoryDialog } from "@/components/pages/category/create-category-dialog";
import { EditCategoryDialog } from "@/components/pages/category/edit-category-dialog";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Typography from "@/components/ui/typography";
import { useAlertDialog } from "@/context/alert-dialog-context";
import { useFilterContext } from "@/context/filter-context";
import useDebounce from "@/hooks/use-debounce";
import { useDeleteCategory } from "@/lib/api/mutation/category-mutation";
import { dateFormat } from "@/lib/format/date-format";
import { CategoryResponse } from "@/lib/types/category";
import { cn } from "@/lib/utils";
import { Search, Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CategoryTemplateProps {
  categories: CategoryResponse;
}

const CategoryTemplate = ({ categories }: CategoryTemplateProps) => {
  const { showDialog } = useAlertDialog();

  const router = useRouter();

  const searchParams = useSearchParams();

  const [openCreateCategoryDialog, setOpenCreateCategoryDialog] =
    useState(false);

  const { handleCategorySearch, handlePageChange } = useFilterContext();

  const { mutate: deleteCategory, isPending: isPendingDeleteCategory } =
    useDeleteCategory();

  const [search, setSearch] = useState("");

  const debuncedSearch = useDebounce(search, 500);

  useEffect(
    () => {
      handleCategorySearch(debuncedSearch);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [debuncedSearch]
  );

  const handleNavigateAddCategory = () => {
    setOpenCreateCategoryDialog(true);
  };

  const handleDeleteCategory = (articleId?: string) => {
    if (!articleId) {
      toast.error("Category ID is required to delete.");
      return;
    }

    deleteCategory(articleId, {
      onSuccess: () => {
        toast.success("Category deleted successfully.");
        router.refresh();
      },
      onError: (error) => {
        toast.error(`Failed to delete category: ${error.message}`);
      },
    });
  };

  const handleShowAlertDeleteDialog = ({
    articleId,
    name,
  }: {
    articleId?: string;
    name: string;
  }) => {
    showDialog({
      title: "Delete Article",
      description: `Delete category "${name}"? This will remove it from master data permanently.`,
      actionText: "Delete",
      variant: "destructive",
      onAction: () => handleDeleteCategory(articleId),
    });
  };

  const handleEditCategoryId = ({
    categoryId,
    categoryName,
  }: {
    categoryId?: string;
    categoryName: string;
  }) => {
    if (!categoryId) {
      toast.error("Category ID is required to edit.");
    }

    const params = new URLSearchParams(searchParams.toString());

    params.set("id", categoryId ?? "");
    params.set("name", categoryName);

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleCloseEditCategoryDialog = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("id");
    params.delete("name");

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <AdminBoxWrapper>
      <Box align={"start"} className="p-6 border-b border-slate-200">
        <Typography
          size={"textBase"}
          weight={"medium"}
          className="text-slate-800"
        >
          Total Category : {categories.totalData}
        </Typography>
      </Box>

      <Box
        direction={"row"}
        justify={"between"}
        className="p-6 flex-wrap gap-y-2"
      >
        <Box direction={"row"} className="gap-2 max-w-[240px]">
          <Input
            leftIcon={<Search width={20} height={20} />}
            className="bg-transparent flex-1 w-full"
            placeholder="Search by title"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </Box>

        <Button onClick={handleNavigateAddCategory} fullWidth={false}>
          <Plus /> Add Category
        </Button>

        <CreateCategoryDialog
          open={openCreateCategoryDialog}
          onOpenChange={setOpenCreateCategoryDialog}
        />
      </Box>

      <Box className="overflow-x-auto max-w-sm sm:max-w-full p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.isArray(categories.data) &&
              categories.data.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>
                    <Box className="py-3 px-4">
                      <Typography
                        align={"center"}
                        className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2"
                      >
                        {category.name}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box className="py-3 px-4">
                      <Typography
                        align={"center"}
                        className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2"
                      >
                        {dateFormat.MMMMdyyyyHHmm(category.createdAt ?? "")}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box direction={"row"} className="gap-3">
                      <Suspense fallback={null}>
                        <EditCategoryDialog
                          trigger={
                            <Typography
                              size={"textSm"}
                              weight={"regular"}
                              onClick={() =>
                                handleEditCategoryId({
                                  categoryId: category.id,
                                  categoryName: category.name ?? "-",
                                })
                              }
                              className="text-blue-600 underline hover:cursor-pointer"
                            >
                              Edit
                            </Typography>
                          }
                          onOpenChange={(open) => {
                            if (!open) {
                              handleCloseEditCategoryDialog();
                            }
                          }}
                        />
                      </Suspense>

                      <Typography
                        size={"textSm"}
                        weight={"regular"}
                        className={cn(
                          " underline hover:cursor-pointer text-red-500",
                          isPendingDeleteCategory && "text-gray-400"
                        )}
                        onClick={
                          isPendingDeleteCategory
                            ? () => {}
                            : () =>
                                handleShowAlertDeleteDialog({
                                  articleId: category.id,
                                  name: category.name ?? "-",
                                })
                        }
                      >
                        {isPendingDeleteCategory ? "Deleting..." : "Delete"}
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 px-4">
                <PaginationBuilder
                  currentPage={categories.currentPage ?? 1}
                  totalPages={categories.totalPages ?? 1}
                  onPageChange={handlePageChange}
                />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </AdminBoxWrapper>
  );
};

export default CategoryTemplate;
