// src/domain/dtos/UpdateArticleDTO.js
import { z } from "zod";

export const UpdateArticleSchema = z
  .object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    content: z.string().min(1, "Content cannot be empty").optional(),

    featuredImg: z
      .string()
      .url("Featured image must be a valid URL")
      .optional(),

    seoTitle: z.string().max(255, "SEO title too long").optional(),
    seoDesc: z.string().max(300, "SEO description too long").optional(),
    seoKeywords: z.string().max(255, "SEO keywords too long").optional(),

    categoryId: z.string().uuid("Invalid category ID").optional(),
    tagIds: z.array(z.string().uuid("Invalid tag ID")).optional(),
  })
  .refine(
    (data) =>
      !!(
        data.title ||
        data.content ||
        data.featuredImg ||
        data.seoTitle ||
        data.seoDesc ||
        data.seoKeywords ||
        data.categoryId ||
        (data.tagIds && data.tagIds.length)
      ),
    {
      message: "At least one field must be provided for update.",
    }
  );
