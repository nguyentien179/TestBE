import { prisma } from "../../infrastructure/prisma/client.js";

class BookmarkService {
  async getUserBookmarks(userId) {
    return await prisma.bookmark.findMany({
      where: { userId },
      include: {
        article: {
          include: {
            category: true,
            tags: true,
            author: { select: { id: true, name: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async addBookmark(userId, articleId) {
    // Prevent duplicate bookmarks
    const exists = await prisma.bookmark.findFirst({
      where: { userId, articleId },
    });

    if (exists) throw new Error("Already bookmarked");

    return await prisma.bookmark.create({
      data: { userId, articleId },
    });
  }

  async removeBookmark(userId, articleId) {
    return await prisma.bookmark.deleteMany({
      where: { userId, articleId },
    });
  }
}

export default new BookmarkService();
