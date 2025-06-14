"use client";

import PaginationBuilder from "@/components/global/builder/pagination-builder";
import { ResponsiveImage } from "@/components/global/responsive-image";
import SelectBuilder from "@/components/global/builder/select-builder";
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
import { Plus, Search } from "lucide-react";
import AdminBoxWrapper from "./admin-box-wraper";
import { useRouter } from "next/navigation";
import { useAlertDialog } from "@/context/alert-dialog-context";

const dummyData = [
  {
    id: 1,
    title: "Cybersecurity Essentials Every Developer Should Know",
    category: "React",
    createdAt: "April 13, 2025 10:55:12",
    thumbnail: "https://placehold.co/600x400",
  },
  {
    id: 2,
    title: "Cybersecurity Essentials Every Developer Should Know",
    category: "React",
    createdAt: "April 13, 2025 10:55:12",
    thumbnail: "https://placehold.co/600x400",
  },
];

const categoryOptions = [
  { label: "Technology", value: "tech" },
  { label: "Health", value: "health" },
  { label: "Education", value: "edu" },
];

const AdminTemplate = () => {
  const router = useRouter();

  const { showDialog } = useAlertDialog();

  const handleNavigateAddArticle = () => {
    router.push("/admin/article/create");
  };

  const handleDeleteArticle = (articleId: number) => {
    // Logic to delete the article
    console.log(`Deleting article with ID: ${articleId}`);
  };

  const handleEditArticle = (articleId: number) => {
    // Logic to edit the article
    console.log(`Editing article with ID: ${articleId}`);
    router.push(`/admin/article/edit/${articleId}`);
  };

  const handlePreviewArticle = (articleId: number) => {
    // Logic to preview the article
    console.log(`Previewing article with ID: ${articleId}`);
    router.push(`/article/${articleId}`);
  };

  const handleShowAlertDeleteDialog = (articleId: number) => {
    // Logic to show alert dialog for deleting the article
    console.log(`Showing delete dialog for article with ID: ${articleId}`);
    showDialog({
      title: "Delete Article",
      description:
        "Deleting this article is permanent and cannot be undone. All related content will be removed.",
      actionText: "Delete",
      variant: "destructive",
      onAction: () => handleDeleteArticle(articleId),
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
          Total Articles : 25
        </Typography>
      </Box>

      <Box
        direction={"row"}
        justify={"between"}
        className="p-6 flex-wrap gap-y-2"
      >
        <Box direction={"row"} className="gap-2 max-w-[357px]">
          <SelectBuilder
            options={categoryOptions}
            placeholder="Select Category"
            value={"tech"}
          />

          <Input
            leftIcon={<Search width={20} height={20} />}
            className="bg-transparent flex-1 w-full"
            placeholder="Search by title"
          />
        </Box>

        <Button onClick={handleNavigateAddArticle} fullWidth={false}>
          <Plus /> Add Articles
        </Button>
      </Box>

      <Box className="overflow-x-auto max-w-sm sm:max-w-full p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Thumbnails</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyData.map((article) => (
              <TableRow key={article.id}>
                <TableCell>
                  <Box className="w-[60px] h-[60px] mx-auto">
                    <ResponsiveImage
                      src={article.thumbnail}
                      alt={article.title}
                      rounded="rounded-[6px]"
                      aspectRatio="60/60"
                      unoptimized
                    />
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2">
                      {article.title}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography
                      align={"center"}
                      className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2"
                    >
                      {article.category}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography
                      align={"center"}
                      className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2"
                    >
                      {article.createdAt}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box direction={"row"} className="gap-3">
                    <Typography
                      size={"textSm"}
                      weight={"regular"}
                      className="text-blue-600 underline hover:cursor-pointer"
                      onClick={() => handlePreviewArticle(article.id)}
                    >
                      Preview
                    </Typography>
                    <Typography
                      size={"textSm"}
                      weight={"regular"}
                      onClick={() => handleEditArticle(article.id)}
                      className="text-blue-600 underline hover:cursor-pointer"
                    >
                      Edit
                    </Typography>

                    <Typography
                      size={"textSm"}
                      weight={"regular"}
                      className="text-red-500 underline hover:cursor-pointer"
                      onClick={() => handleShowAlertDeleteDialog(article.id)}
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

export default AdminTemplate;
