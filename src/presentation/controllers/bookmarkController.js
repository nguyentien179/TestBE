import BookmarkService from "../../../application/services/bookmarkService.js";

export const getBookmarks = async (req, res) => {
  try {
    const bookmarks = await BookmarkService.getUserBookmarks(req.user.id);
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const addBookmark = async (req, res) => {
  try {
    const bookmark = await BookmarkService.addBookmark(req.user.id, req.params.id);
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const removeBookmark = async (req, res) => {
  try {
    await BookmarkService.removeBookmark(req.user.id, req.params.id);
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
