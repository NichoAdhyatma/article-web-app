import z from "zod";

export const categorySchema = z.object({
  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category must be less than 100 characters"),
});

export type CategorySchemaType = z.infer<typeof categorySchema>;