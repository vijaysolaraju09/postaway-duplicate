import express from "express";
import { PostController } from "../controller/post.controller.js";
import { verifyAuth } from "../../../middleware/jwtAuth.js";
import { upload } from "../../../middleware/multer.middleware.js";

const router = express.Router();
const postsController = new PostController();
router.get("/all", postsController.handleGetAllPosts);
router.get("/:id", postsController.handleGetPost);
router.get("/", verifyAuth, postsController.handleGetMyPosts);
router.post(
  "/",
  verifyAuth,
  upload.single("imageUrl"),
  postsController.handleCreatePost
);
router.put("/:id", verifyAuth, postsController.handleUpdatePost);
router.delete("/:id", verifyAuth, postsController.handleDeletePost);

export default router;
