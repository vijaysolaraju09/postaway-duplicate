import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve("public/assets/posted-images"));
  },
  filename: (req, file, cb) => {
    const name = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, name);
  },
});

export const upload = multer({ storage: storage });
