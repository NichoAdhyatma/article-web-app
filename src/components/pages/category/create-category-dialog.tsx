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
import React from "react";
import { useForm } from "react-hook-form";

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
    defaultValues: { category: "" },
  });

  const { control, handleSubmit } = form;

  const onSubmit = (data: CategorySchemaType) => {
    console.log("Category created:", data);
    // Here you would typically send the data to your API or state management
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
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
