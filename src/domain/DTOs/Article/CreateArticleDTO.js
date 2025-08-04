// src/domain/dtos/CreateArticleDTO.js
import { z } from "zod";

export const CreateArticleSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
    })
    .min(1, "Title cannot be empty"),

  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, "Content cannot be empty"),

  featuredImg: z.string().url("Featured image must be a valid URL").optional(),

  seoTitle: z.string().max(255, "SEO title too long").optional(),
  seoDesc: z.string().max(300, "SEO description too long").optional(),
  seoKeywords: z.string().max(255, "SEO keywords too long").optional(),

  categoryId: z
    .string({
      required_error: "Category ID is required",
    })
    .uuid("Invalid category ID"),

  tagIds: z.array(z.string().uuid("Invalid tag ID")).optional(),

  authorId: z
    .string({
      required_error: "Author ID is required",
    })
    .uuid("Invalid author ID"),
});
