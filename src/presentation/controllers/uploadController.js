export const uploadImage = async (req, res, next) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    res.status(201).json({
      url: file.path,
      publicId: file.filename,
    });
  } catch (error) {
    next(error);
  }
};
