import { ApplicationError } from "../../../middleware/applicationError.js";
import {
  deleteComment,
  getComments,
  postComment,
  updateComment,
} from "../model/comment.model.js";

export class CommentController {
  handleGetComments = (req, res, next) => {
    const { id } = req.params;
    try {
      const commentsOfPost = getComments(id);
      if (commentsOfPost.success) {
        res.status(200).json(commentsOfPost);
      } else {
        throw new ApplicationError(commentsOfPost.msg, 400);
      }
    } catch (err) {
      next(err);
    }
  };

  handlePostComments = (req, res, next) => {
    const { content } = req.body;
    const { id } = req.params;
    const { userId } = req;
    try {
      const isPosted = postComment(userId, id, content);
      if (isPosted.success) {
        res.status(200).json(isPosted);
      } else {
        throw new ApplicationError(isPosted.msg, 400);
      }
    } catch (err) {
      next(err);
    }
  };

  handleUpdateComment = (req, res, next) => {
    const { id } = req.params;
    const { content } = req.body;
    try {
      const editedComment = updateComment(id, content);
      if (editedComment.success) {
        res.status(201).json(editedComment);
      } else {
        throw new ApplicationError(editedComment.msg, 401);
      }
    } catch (err) {
      next(err);
    }
  };

  handleDeleteComment = (req, res, next) => {
    const { id } = req.params;
    try {
      const deletedComment = deleteComment(id);
      if (deletedComment.success) {
        res.status(200).json(deletedComment);
      } else {
        throw new ApplicationError(deletedComment.msg, 400);
      }
    } catch (err) {
      next(err);
    }
  };
}
