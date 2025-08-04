import prisma from "../../infrastructure/client.js";
import slugify from "slugify";
import { CreateCategorySchema } from "../../domain/DTOs/Category/CreateCategoryDTO.js";
import { UpdateCategorySchema } from "../../domain/DTOs/Category/UpdateCategoryDTO.js";

class CategoryService {
  async getAllCategories() {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  async createCategory(input) {
    const withSlug = {
      ...input,
      slug: slugify(input.name, { lower: true }), // auto-generate slug
    };

    const dto = CreateCategorySchema.parse(withSlug);

    return await prisma.category.create({
      data: dto,
    });
  }

  async updateCategory(id, input) {
    const withSlug = {
      ...input,
      slug: slugify(input.name, { lower: true }), // auto-generate slug
    };
    const dto = UpdateCategorySchema.parse(withSlug);
    return await prisma.category.update({
      where: { id },
      data: dto,
    });
  }

  async deleteCategory(id) {
    return await prisma.category.delete({
      where: { id },
    });
  }
  async getCategoryHighlights() {
    const categories = await prisma.category.findMany();

    const highlights = await Promise.all(
      categories.map(async (cat) => {
        const article = await prisma.article.findFirst({
          where: { categoryId: cat.id },
          orderBy: { createdAt: "desc" },
          include: {
            author: true,
          },
        });
        return {
          category: cat.name,
          article,
        };
      })
    );

    return highlights;
  }
}

export default new CategoryService();
