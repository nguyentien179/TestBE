import prisma from "../../infrastructure/client.js";
import { CreateTagSchema } from "../../domain/DTOs/Tags/CreateTagDTO.js";

class TagService {
  async getAllTags() {
    return await prisma.tag.findMany({
      orderBy: { name: "asc" },
    });
  }

  async createTag(input) {
    const dto = CreateTagSchema.parse(input);
    return await prisma.tag.create({
      data: dto,
    });
  }

  async deleteTag(id) {
    return await prisma.tag.delete({
      where: { id },
    });
  }
}

export default new TagService();
