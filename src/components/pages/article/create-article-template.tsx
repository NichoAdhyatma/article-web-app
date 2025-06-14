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
import { useArticlePreview } from "@/context/article-preview-context";
import {
  useCreateArticle,
  useUploadImage,
} from "@/lib/api/mutation/article-mutation";
import {
  CreateArticleForm,
  createArticleSchema,
} from "@/lib/schemas/article/article-schema";
import { CategoryResponse } from "@/lib/types/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface CreateArticleTemplateProps {
  categories: CategoryResponse;
}

const CreateArticleTemplate = ({ categories }: CreateArticleTemplateProps) => {
  const router = useRouter();

  const form = useForm<CreateArticleForm>({
    resolver: zodResolver(createArticleSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
    },
  });

  const { control, handleSubmit, setError } = form;

  const handleNavigateToCategory = () => {
    router.push("/admin/category");
  };

  const handleNavigateBack = () => {
    clearArticle();
    router.back();
  };

  const { setArticle, article, clearArticle } = useArticlePreview();

  const handleNavigateToPreview = () => {
    const data = form.getValues();

    setArticle({
      title: data.title,
      content: data.content,
      category: data.category,
      thumbnail: data.thumbnail,
    });

    router.push("/preview");
  };

  const { mutate: mutateCreateArticle, isPending: isLoadingCrate } = useCreateArticle();

  const { mutate: mutateUploadImage, isPending: isLoadingUploadImage } = useUploadImage();

  const onSubmit = (data: CreateArticleForm) => {
    if (!data.thumbnail) {
      setError("thumbnail", {
        type: "manual",
        message: "Thumbnail is required.",
      });
      return;
    }

    mutateUploadImage(data.thumbnail as File, {
      onSuccess: (imageUrl) => {
        mutateCreateArticle(
          {
            title: data.title,
            content: data.content,
            categoryId: data.category,
            imageUrl: imageUrl,
          },
          {
            onSuccess: () => {
              router.push("/admin/article");

              toast.success("Article created successfully!");

              clearArticle();
            },
            onError: (error) => {
              setError("title", {
                type: "manual",
                message: `Failed to create article. Please try again. ${error.message}`,
              });

              toast.error(
                `Failed to create article. Please try again. ${error.message}`
              );
            },
          }
        );
      },
      onError: (error) => {
        setError("thumbnail", {
          type: "manual",
          message: `Failed to upload thumbnail. Please try again. ${error.message}`,
        });

        toast.error(
          `Failed to upload thumbnail. Please try again. ${error.message}`
        );
      },
    });
  };

  const categoriesOptions =
    categories.data
      ?.filter(
        (c) => c.id && c.name && c.id.trim() !== "" && c.name.trim() !== ""
      )
      .map((c) => ({
        value: c.id as string,
        label: c.name as string,
      })) ?? [];

  useEffect(() => {
    if (article) {
      form.reset({
        title: article.title || "",
        content: article.content || "",
        category: article.category || "",
      });
    }
  }, [article, form]);

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
              options={categoriesOptions}
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

        <Button isLoading={isLoadingCrate || isLoadingUploadImage} onClick={handleSubmit(onSubmit)} fullWidth={false}>
          Upload
        </Button>
      </Box>
    </AdminBoxWrapper>
  );
};

export default CreateArticleTemplate;
