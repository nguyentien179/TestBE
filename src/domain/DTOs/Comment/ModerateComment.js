import { z } from "zod";
export const ModerateCommentSchema = z.object({
  approved: z.boolean(),
});
