// src/interfaces/controllers/articleController.js
import articleService from "../../application/services/articleService.js";

export const getAllArticles = async (req, res, next) => {
  try {
    const filters = {
    keyword: req.query.keyword,
    categoryId: req.query.categoryId,
    authorId: req.query.authorId,
    fromDate: req.query.fromDate,
    toDate: req.query.toDate,
    };

    const articles = await ArticleService.getAllArticles(filters);
    res.json(articles);
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const article = await articleService.getArticleById(req.params.id);
    if (!article) return res.status(404).json({ error: "Article not found" });
    res.json(article);
  } catch (err) {
    next(err);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const article = await articleService.createArticle(req.body);
    res.status(201).json(article);
  } catch (err) {
    next(err);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const updated = await articleService.updateArticle(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    await articleService.deleteArticle(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
