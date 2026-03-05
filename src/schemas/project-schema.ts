import { z } from "zod";

export const projectFormSchema = z.object({
  user_id: z.number(),
  project_name: z.string().min(3, {
    message: "Project name must be at least 3 characters long.",
  }),
  explanation: z.string().optional(),
});
