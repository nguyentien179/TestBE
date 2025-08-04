// src/application/services/articleService.js
import { CreateArticleSchema } from "../../domain/DTOs/Article/CreateArticleDTO.js";
import { UpdateArticleSchema } from "../../domain/DTOs/Article/UpdateArticleDTO.js";
import prisma from "../../infrastructure/client.js";

class ArticleService {
  async getAllArticles(filters = {}) {
    const { keyword, categoryId, authorId, fromDate, toDate } = filters;

    const whereClause = {};

    if (keyword) {
      whereClause.OR = [
        { title: { contains: keyword, mode: "insensitive" } },
        { content: { contains: keyword, mode: "insensitive" } },
      ];
    }

    if (categoryId) {
      whereClause.categoryId = categoryId;
    }

    if (authorId) {
      whereClause.authorId = authorId;
    }

    if (fromDate || toDate) {
      whereClause.createdAt = {};
      if (fromDate) {
        whereClause.createdAt.gte = new Date(fromDate);
      }
      if (toDate) {
        whereClause.createdAt.lte = new Date(toDate);
      }
    }

    return await prisma.article.findMany({
      where: whereClause,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
        tags: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getArticleById(id) {
    return await prisma.article.findUnique({
      where: { id },
      include: {
        category: true,
        tags: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          where: { approved: true },
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });
  }

  async createArticle(input) {
    const dto = CreateArticleSchema.parse(input);
    console.log("tagIds from DTO:", dto.tagIds);
    return await prisma.article.create({
      data: {
        title: dto.title,
        content: dto.content,
        featuredImg: dto.featuredImg,
        seoTitle: dto.seoTitle,
        seoDesc: dto.seoDesc,
        seoKeywords: dto.seoKeywords,
        category: { connect: { id: dto.categoryId } },
        tags: {
          connect: (dto.tagIds ?? []).map((id) => ({ id })),
        },
        author: { connect: { id: dto.authorId } },
      },
    });
  }

  async updateArticle(id, input) {
    const dto = UpdateArticleSchema.parse(input);

    const data = {};
    if (dto.title) data.title = dto.title;
    if (dto.content) data.content = dto.content;
    if (dto.featuredImg) data.featuredImg = dto.featuredImg;
    if (dto.seoTitle) data.seoTitle = dto.seoTitle;
    if (dto.seoDesc) data.seoDesc = dto.seoDesc;
    if (dto.seoKeywords) data.seoKeywords = dto.seoKeywords;
    if (dto.categoryId) data.category = { connect: { id: dto.categoryId } };
    if (dto.tagIds) data.tags = { set: dto.tagIds.map((id) => ({ id })) };

    return await prisma.article.update({
      where: { id },
      data,
    });
  }

  async deleteArticle(id) {
    return await prisma.article.delete({
      where: { id },
    });
  }
}

export default new ArticleService();
