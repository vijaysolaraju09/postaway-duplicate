import { ApplicationError } from "../../../middleware/applicationError.js";
import {
  addPost,
  deletePost,
  getAllPosts,
  getMyPosts,
  getPost,
  updatePost,
} from "../model/post.model.js";

export class PostController {
  handleGetAllPosts = (req, res, next) => {
    const allPosts = getAllPosts();
    try {
      if (allPosts) {
        res.status(200).json({ success: true, allPosts: allPosts });
      } else {
        throw new ApplicationError("No posts", 400);
      }
    } catch (err) {
      next(err);
    }
  };

  handleGetPost = (req, res, next) => {
    const { id } = req.params;
    try {
      const post = getPost(id);
      if (post) {
        res.status(200).json({ success: true, post: post });
      } else {
        throw new ApplicationError("post not found", 400);
      }
    } catch (err) {
      next(err);
    }
  };
  handleGetMyPosts = (req, res, next) => {
    const { userId } = req;
    try {
      const myPosts = getMyPosts(userId);
      res.status(200).json({ success: true, myPosts: myPosts });
    } catch (err) {
      next(err);
    }
  };
  handleCreatePost = (req, res, next) => {
    const { userId } = req;
    const { caption } = req.body;
    const imageUrl = `/public/assets/posted-images/${req.file.filename}`;

    try {
      const posts = addPost(userId, caption, imageUrl);
      if (posts.success) {
        res.status(201).json({ success: true, myPosts: posts.myPosts });
      } else {
        throw new ApplicationError(posts.msg, 400);
      }
    } catch (err) {
      next(err);
    }
  };
  handleUpdatePost = (req, res, next) => {
    try {
      const update = updatePost(req.params.id, req.body);
      console.log(update);
      if (update.success) {
        res
          .status(201)
          .json({ success: true, updatedPost: update.updatedPost });
      } else {
        throw new ApplicationError(update.msg, 401);
      }
    } catch (err) {
      next(err);
    }
  };
  handleDeletePost = (req, res, next) => {
    const { id } = req.params;
    try {
      const postDeleted = deletePost(id);
      if (postDeleted.success) {
        res.status(200).json({ success: true, deletedPost: postDeleted.post });
      } else {
        throw new ApplicationError("Can't find post", 400);
      }
    } catch (err) {
      next(err);
    }
  };
}
