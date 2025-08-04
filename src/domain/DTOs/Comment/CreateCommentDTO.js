import { z } from "zod";

export const CreateCommentSchema = z.object({
  content: z.string().min(1),
  articleId: z.string().uuid(),
});