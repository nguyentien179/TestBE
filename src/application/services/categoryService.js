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
}

export default new CategoryService();
