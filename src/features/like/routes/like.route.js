import express from "express";
import LikeController from "../controller/like.controller.js";
import { verifyAuth } from "../../../middleware/jwtAuth.js";

const router = express.Router();
const likeController = new LikeController();
router.get("/:postId", likeController.handleGetLikes);
router.get("/toggle/:postId", verifyAuth, likeController.handleToggleLikes);

export default router;
