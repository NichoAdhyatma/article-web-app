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
import { useCreateCategory } from "@/lib/api/mutation/category-mutation";
import {
  categorySchema,
  CategorySchemaType,
} from "@/lib/schemas/category/category-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateCategoryDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CreateCategoryDialog = ({
  open,
  onOpenChange,
}: CreateCategoryDialogProps) => {
  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: { name: "" },
  });

  const { control, handleSubmit, setError } = form;

  const router = useRouter();

  const { mutate, isPending } = useCreateCategory();

  const onSubmit = (data: CategorySchemaType) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();

        onOpenChange?.(false);

        router.refresh();
        
        toast.success("Category created successfully!");
      },
      onError: (error) => {
        console.error("Error creating category:", error);
        if (error.message) {
          setError("name", {
            type: "manual",
            message: error.message,
          });
        }

        toast.error("Failed to create category. Please try again.");
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={handleSubmit(onSubmit)}
            className="w-full sm:w-fit"
          >
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
