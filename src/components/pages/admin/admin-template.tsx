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

      <Box direction={"row"} justify={"between"} className="p-6">
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

        <Button fullWidth={false}>
          <Plus /> Add Articles
        </Button>
      </Box>

      <Box>
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
                  <Typography className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2">
                    {article.title}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    align={"center"}
                    className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2"
                  >
                    {article.category}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    align={"center"}
                    className="max-w-[225px] w-full text-ellipsis whitespace-break-spaces line-clamp-2"
                  >
                    {article.createdAt}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box direction={"row"} className="gap-3">
                    <Typography
                      size={"textSm"}
                      weight={"regular"}
                      className="text-blue-600 underline hover:cursor-pointer"
                    >
                      Preview
                    </Typography>
                    <Typography
                      size={"textSm"}
                      weight={"regular"}
                      className="text-blue-600 underline hover:cursor-pointer"
                    >
                      Edit
                    </Typography>
                    <Typography
                      size={"textSm"}
                      weight={"regular"}
                      className="text-red-500 underline hover:cursor-pointer"
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
