import CommentService from "../../application/services/commentService.js";

export const createComment = async (req, res) => {
  try {
    const comment = await CommentService.createComment(req.body, req.user.id);
    res.status(201).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.errors ?? err.message });
  }
};

export const getApprovedComments = async (req, res) => {
  try {
    const comments = await CommentService.getApprovedComments(
      req.params.articleId
    );
    res.json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllComments = async (req, res) => {
  try {
    const comments = await CommentService.getAllComments(req.query);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const moderateComment = async (req, res) => {
  try {
    const result = await CommentService.moderateComment(
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (err) {
    res.status(400).json({ error: err.errors ?? err.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    await CommentService.deleteComment(req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
