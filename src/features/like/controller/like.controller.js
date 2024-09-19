import { ApplicationError } from "../../../middleware/applicationError.js";
import { getLikes, toggleLike } from "../model/like.model.js";

export default class LikeController {
  handleGetLikes = (req, res, next) => {
    const { postId } = req.params;
    try {
      const fetchLikes = getLikes(postId);
      if (fetchLikes.success) {
        res.status(200).json(fetchLikes);
      } else {
        throw new ApplicationError(fetchLikes.msg, 400);
      }
    } catch (err) {
      next(err);
    }
  };
  handleToggleLikes = (req, res, next) => {
    const { postId } = req.params;
    const { userId } = req;
    try {
      const fetchLikes = toggleLike(userId, postId);
      res.status(200).json(fetchLikes);
    } catch (err) {
      next(err);
    }
  };
}
