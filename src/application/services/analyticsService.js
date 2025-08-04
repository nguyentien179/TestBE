import prisma from "../../infrastructure/client.js";
import { subDays } from "date-fns";

class AnalyticsService {
  async getDashboardStats() {
    const [totalUsers, totalArticles, totalComments, pendingComments] =
      await Promise.all([
        prisma.user.count(),
        prisma.article.count(),
        prisma.comment.count(),
        prisma.comment.count({ where: { approved: false } }),
      ]);

    const articlesPerCategory = await prisma.category.findMany({
      select: {
        name: true,
        _count: { select: { articles: true } },
      },
    });

    const topTags = await prisma.tag.findMany({
      take: 5,
      orderBy: { articles: { _count: "desc" } },
      select: {
        name: true,
        _count: { select: { articles: true } },
      },
    });

    const recentSignups = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: subDays(new Date(), 30),
        },
      },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
      },
    });

    const topArticles = await prisma.article.findMany({
      take: 5,
      orderBy: {
        comments: { _count: "desc" },
      },
      select: {
        id: true,
        title: true,
        _count: {
          select: {
            comments: true,
            bookmarks: true,
          },
        },
      },
    });

    return {
      totalUsers,
      totalArticles,
      totalComments,
      pendingComments,
      articlesPerCategory,
      topTags,
      recentSignups,
      topArticles,
    };
  }
}

export default new AnalyticsService();
