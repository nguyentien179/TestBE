import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../infrastructure/cloudinary/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "daily-news",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "mov"],
    transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
  },
});

const upload = multer({ storage });

export default upload;
