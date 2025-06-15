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
import { useUpdateCategory } from "@/lib/api/mutation/category-mutation";
import {
  categorySchema,
  CategorySchemaType,
} from "@/lib/schemas/category/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface EditCategoryDialogProps {
  trigger?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  open?: boolean;
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
    defaultValues: { name: "" },
  });

  const { categoryId, categoryName } = useGetCategoryParams();

  const [openDialog, setOpenDialog] = useState(open ?? false);

  const router = useRouter();

  const { control, handleSubmit } = form;

  const { mutate, isPending } = useUpdateCategory();

  useEffect(() => {
    if (categoryName) {
      form.reset({ name: categoryName });
    }
  }, [categoryId, categoryName, form]);

  const onSubmit = (data: CategorySchemaType) => {
    mutate(
      {
        id: categoryId ?? "",
        data: {
          name: data.name,
        },
      },
      {
        onSuccess: () => {
          toast.success("Category updated successfully!");

          router.refresh();

          setOpenDialog(false);

          onOpenChange?.(false);
        },
        onError: (error) => {
          toast.error("Failed to update category. Please try again.");

          if (error.message) {
            form.setError("name", {
              type: "manual",
              message: error.message,
            });
          }
        },
      }
    );
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <Typography
              size={"textXl"}
              weight={"semibold"}
              className="text-slate-900"
            >
              Edit Category
            </Typography>
          </DialogTitle>
        </DialogHeader>

        <Box className="flex items-center gap-2 py-4">
          <Form {...form}>
            <FormInputField
              control={control}
              name="name"
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

          <Button
            isLoading={isPending}
            disabled={categoryId?.trim().length === 0}
            onClick={handleSubmit(onSubmit)}
            className="w-full sm:w-fit"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
