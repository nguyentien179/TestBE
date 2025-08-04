import { prisma } from "../../infrastructure/prisma/client.js";
import { CreateTagSchema } from "../../domain/dtos/CreateTagDTO.js";

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
