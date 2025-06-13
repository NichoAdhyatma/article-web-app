import z from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username field cannot be empty"),
  password: z.string().min(1, "Password field cannot be empty").min(8, "Password must be at least 8 characters long"),
});

export type LoginForm = z.infer<typeof loginSchema>;