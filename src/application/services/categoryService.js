import { prisma } from "../../infrastructure/prisma/client.js";
import { CreateCategorySchema } from "../../domain/dtos/CreateCategoryDTO.js";
import { UpdateCategorySchema } from "../../domain/dtos/UpdateCategoryDTO.js";

class CategoryService {
  async getAllCategories() {
    return await prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  async createCategory(input) {
    const dto = CreateCategorySchema.parse(input);
    return await prisma.category.create({
      data: dto,
    });
  }

  async updateCategory(id, input) {
    const dto = UpdateCategorySchema.parse(input);
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
