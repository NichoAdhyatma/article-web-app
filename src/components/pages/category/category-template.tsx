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
import { Search, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";

const dummyData = [
  {
    id: 1,
    title: "Web Development Basics",
    category: "Frontend",
    createdAt: "April 13, 2025 10:55:12",
  },
  {
    id: 2,
    title: "Understanding Backend Technologies",
    category: "Backend",
    createdAt: "April 14, 2025 11:00:00",
  },
];

const CategoryTemplate = () => {
  const { showDialog } = useAlertDialog();

  const router = useRouter();

  const [openCreateCategoryDialog, setOpenCreateCategoryDialog] =
    useState(false);

  const handleNavigateAddCategory = () => {
    setOpenCreateCategoryDialog(true);
  };

  const handleDeleteCategory = (articleId: number) => {
    // Logic to delete the article
    console.log(`Deleting category with ID: ${articleId}`);
  };

  const handleShowAlertDeleteDialog = (articleId: number, name: string) => {
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
    categoryId: number;
    categoryName: string;
  }) => {
    router.replace(`?id=${categoryId}&name=${categoryName}`, {
      scroll: false,
    });
  };

  return (
    <AdminBoxWrapper>
      <Box align={"start"} className="p-6 border-b border-slate-200">
        <Typography
          size={"textBase"}
          weight={"medium"}
          className="text-slate-800"
        >
          Total Category : 25
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
            {dummyData.map((category) => (
              <TableRow key={category.id}>
                <TableCell>
                  <Box className="py-3 px-4">
                    <Typography
                      align={"center"}
                      className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2"
                    >
                      {category.category}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box className="py-3 px-4">
                    <Typography
                      align={"center"}
                      className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2"
                    >
                      {category.createdAt}
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
                                categoryName: category.category,
                              })
                            }
                            className="text-blue-600 underline hover:cursor-pointer"
                          >
                            Edit
                          </Typography>
                        }
                        onOpenChange={(open) => {
                          if (!open) {
                            router.replace("/admin/category", {
                              scroll: false,
                            });
                          }
                        }}
                      />
                    </Suspense>

                    <Typography
                      size={"textSm"}
                      weight={"regular"}
                      className="text-red-500 underline hover:cursor-pointer"
                      onClick={() =>
                        handleShowAlertDeleteDialog(
                          category.id,
                          category.category
                        )
                      }
                    >
                      Delete
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={5} className="text-center py-6 px-4">
                <PaginationBuilder currentPage={1} totalPages={5} />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Box>
    </AdminBoxWrapper>
  );
};

export default CategoryTemplate;
