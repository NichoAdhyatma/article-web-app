import z from "zod";

export const registerSchema = z.object({
  username: z.string().min(1, "Username field cannot be empty"),
  password: z
    .string()
    .min(1, "Password field cannot be empty")
    .min(8, "Password must be at least 8 characters long"),
  role: z.enum(["Admin", "User"], {
    message: "Role must be either 'admin' or 'user'",
  }),
});

export type RegisterForm = z.infer<typeof registerSchema>;