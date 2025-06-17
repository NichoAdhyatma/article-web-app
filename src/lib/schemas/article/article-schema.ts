import { z } from "zod";

export const createArticleSchema = z.object({
  thumbnail: z.union([
    z
      .instanceof(File)
      .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
        message: "Only JPG or PNG files are allowed",
      }),
    z.string().url({ message: "Invalid image URL" }),
  ]),
  title: z.string().min(3, { message: "Title is required (min 3 char)" }),
  category: z.string().min(1, { message: "Category is required" }),
  content: z.string().min(1, { message: "Content cannot be empty" }),
});

export type CreateArticleForm = z.infer<typeof createArticleSchema>;
