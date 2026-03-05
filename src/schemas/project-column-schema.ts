import { z } from "zod";

export const projectColumnFormSchema = z.object({
  id: z.number().optional(),
  user_id: z.number(),
  project_id: z.number(),
  column_name: z.string().min(3, {
    message: "Column name must be at least 3 characters long.",
  }),
});
