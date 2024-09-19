import express from "express";
import { CommentController } from "../controller/comment.controller.js";
import { verifyAuth } from "../../../middleware/jwtAuth.js";

const commentController = new CommentController();
const router = express.Router();

router.get("/:id", commentController.handleGetComments);
router.post("/:id", verifyAuth, commentController.handlePostComments);
router.put("/:id", verifyAuth, commentController.handleUpdateComment);
router.delete("/:id", verifyAuth, commentController.handleDeleteComment);

export default router;
