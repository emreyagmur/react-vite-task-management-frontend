import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .min(2, {
      message: "Email is required.",
    }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long.",
  }),
});
