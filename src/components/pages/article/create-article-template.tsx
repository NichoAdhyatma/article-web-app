"use client";

import { FormFilePickerField } from "@/components/global/form/form-file-picker.field";
import { FormInputField } from "@/components/global/form/form-input-field";
import { FormRichTextEditorField } from "@/components/global/form/form-rich-text-editor-field";
import { FormSelectField } from "@/components/global/form/form-select-field";
import AdminBoxWrapper from "@/components/pages/admin/admin-box-wraper";
import Box from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Typography from "@/components/ui/typography";
import {
  CreateArticleForm,
  createArticleSchema,
} from "@/lib/schemas/article/article-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const CreateArticleTemplate = () => {
  const router = useRouter();

  const form = useForm<CreateArticleForm>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  const { control, handleSubmit } = form;

  const handleNavigateToCategory = () => {
    router.push("/admin/category");
  };

  const handleNavigateBack = () => {
    router.back();
  };

  const handleNavigateToPreview = () => {
    router.push("/admin/article/preview");
  };

  const onSubmit = (data: CreateArticleForm) => {
    console.log("Submitted Data:", data);
    // Handle the form submission logic here
  };

  return (
    <AdminBoxWrapper className="p-5">
      <Box
        direction={"row"}
        align={"center"}
        justify={"start"}
        className="gap-2"
      >
        <ArrowLeft
          onClick={handleNavigateBack}
          width={20}
          height={20}
          className="text-slate-900 hover:cursor-pointer"
        />

        <Typography
          weight={"medium"}
          size={"textBase"}
          className="text-slate-900"
        >
          Create Articles
        </Typography>
      </Box>

      <Form {...form}>
        <Box align={"start"} className="mt-10 gap-4">
          <FormFilePickerField
            control={control}
            name="thumbnail"
            label="Thumbnails"
          />

          <FormInputField
            control={control}
            name="title"
            placeholder="Input title"
            label="Title"
          />

          <Box align={"start"}>
            <FormSelectField
              control={control}
              name="category"
              placeholder="Input category"
              label="Category"
              options={[
                { value: "technology", label: "Technology" },
                { value: "health", label: "Health" },
                { value: "lifestyle", label: "Lifestyle" },
              ]}
            />

            <Typography size={"textSm"} className="text-slate-500 mt-1">
              The existing category list can be seen in the{" "}
              <Typography
                as="span"
                size={"textSm"}
                onClick={handleNavigateToCategory}
                className="underline text-blue-500 hover:cursor-pointer"
              >
                category
              </Typography>{" "}
              menu
            </Typography>
          </Box>

          <FormRichTextEditorField
            control={control}
            name="content"
            placeholder="Type a content..."
          />
        </Box>
      </Form>

      <Box direction={"row"} justify={"end"} className="gap-2 py-4 mt-6">
        <Button
          variant={"outline"}
          onClick={handleNavigateBack}
          fullWidth={false}
        >
          Cancel
        </Button>

        <Button
          onClick={handleNavigateToPreview}
          variant={"secondary"}
          fullWidth={false}
        >
          Preview
        </Button>

        <Button onClick={handleSubmit(onSubmit)} fullWidth={false}>
          Upload
        </Button>
      </Box>
    </AdminBoxWrapper>
  );
};

export default CreateArticleTemplate;
