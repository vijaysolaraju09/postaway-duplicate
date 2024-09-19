import { getPost } from "../../post/model/post.model.js";

class LikeModel {
  constructor(id, userId, postId) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
  }
}
const likes = [
  new LikeModel(1, 1, 1),
  new LikeModel(2, 2, 2),
  new LikeModel(3, 3, 3),
  new LikeModel(4, 4, 4),
  new LikeModel(5, 1, 2),
  new LikeModel(6, 2, 3),
  new LikeModel(7, 3, 4),
  new LikeModel(8, 4, 1),
];

export const getLikes = (postId) => {
  const isPost = getPost(postId);
  if (isPost) {
    const likesCount = likes.filter((like) => like.postId == postId).length;
    return { success: true, likes: likesCount };
  } else {
    return { success: false, msg: "post doesn't exist" };
  }
};

export const toggleLike = (userId, postId) => {
  const isPost = getPost(postId);
  if (isPost) {
    const likeIndex = likes.findIndex(
      (like) => like.postId == postId && like.userId == userId
    );
    if (likeIndex == -1) {
      const like = new LikeModel(likes.length + 1, userId, postId);
      likes.push(like);
      return { success: true, msg: `${userId} liked post ${postId}` };
    } else {
      likes.splice(likeIndex, 1);
      return { success: true, msg: `${userId} unliked post ${postId}` };
    }
  } else {
    return { success: false, msg: "post doesn't exist" };
  }
};
