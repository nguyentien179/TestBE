import prisma from "../../infrastructure/client.js";
import { CreateCommentSchema } from "../../domain/DTOs/Comment/CreateCommentDTO.js";
import { ModerateCommentSchema } from "../../domain/DTOs/Comment/ModerateComment.js";

class CommentService {
  async createComment(input, userId) {
    const dto = CreateCommentSchema.parse(input);
    return await prisma.comment.create({
      data: {
        content: dto.content,
        articleId: dto.articleId,
        userId,
        approved: false, // default unapproved
      },
    });
  }

  async getApprovedComments(articleId) {
    return await prisma.comment.findMany({
      where: { articleId, approved: true },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async getAllComments(filter = {}) {
    // For moderator/admin
    return await prisma.comment.findMany({
      where: filter,
      include: {
        article: { select: { id: true, title: true } },
        user: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async moderateComment(commentId, input) {
    const dto = ModerateCommentSchema.parse(input);
    return await prisma.comment.update({
      where: { id: commentId },
      data: { approved: dto.approved },
    });
  }

  async deleteComment(commentId) {
    return await prisma.comment.delete({ where: { id: commentId } });
  }
}

export default new CommentService();
