import { FormInputField } from "@/components/global/form/form-input-field";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import {
  categorySchema,
  CategorySchemaType,
} from "@/lib/schemas/category/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

interface EditCategoryDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const useGetCategoryParams = () => {
  const searchParams = useSearchParams();

  const categoryId = useMemo(() => searchParams.get("id"), [searchParams]);
  const categoryName = useMemo(() => searchParams.get("name"), [searchParams]);

  return { categoryId, categoryName };
};

export const EditCategoryDialog = ({
  open,
  onOpenChange,
  trigger,
}: EditCategoryDialogProps) => {
  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: { category: "" },
  });

  const { categoryId, categoryName } = useGetCategoryParams();

  const { control, handleSubmit } = form;

  useEffect(() => {
    if (categoryName && categoryId) {
      form.reset({ category: categoryName });
    }
  }, [categoryId, categoryName, form]);

  const onSubmit = (data: CategorySchemaType) => {
    console.log("Category created:", data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <Typography
              size={"textXl"}
              weight={"semibold"}
              className="text-slate-900"
            >
              Create Category
            </Typography>
          </DialogTitle>
        </DialogHeader>

        <Box className="flex items-center gap-2 py-4">
          <Form {...form}>
            <FormInputField
              control={control}
              name="category"
              label="Category"
              placeholder="Input Category"
            />
          </Form>
        </Box>

        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full sm:w-fit">
              Cancel
            </Button>
          </DialogClose>

          <Button onClick={handleSubmit(onSubmit)} className="w-full sm:w-fit">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
