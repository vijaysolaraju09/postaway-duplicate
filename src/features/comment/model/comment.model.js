import { getPost } from "../../post/model/post.model.js";

class CommentModel {
  constructor(id, userId, postId, content) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.content = content;
  }
}

const comments = [
  new CommentModel(1, 2, 1, "Looks like you're having a great time!"),
  new CommentModel(2, 3, 1, "Beautiful weather!"),
  new CommentModel(3, 1, 2, "This artwork is amazing!"),
  new CommentModel(4, 4, 3, "Yum! That breakfast looks delicious."),
  new CommentModel(5, 2, 4, "I love the mountains too!"),
  new CommentModel(6, 3, 5, "Nature always inspires me."),
];

export const getCommentById = (commentId) => {
  const comment = comments.find((data) => data.id == commentId);
  return comment;
};

export const getComments = (postId) => {
  const post = getPost(postId);
  if (post) {
    const commentsOfPost = comments.filter(
      (comment) => comment.postId == postId
    );
    return { success: true, comments: commentsOfPost };
  } else {
    return { success: false, msg: "Can't find post" };
  }
};

export const postComment = (userId, postId, content) => {
  const post = getPost(postId);
  if (post) {
    const comment = new CommentModel(
      comments.length + 1,
      userId,
      postId,
      content
    );
    comments.push(comment);
    return { success: true, comment: comment };
  } else {
    return { success: true, msg: "Can't find post" };
  }
};

export const updateComment = (commentId, content) => {
  const commentIndex = comments.findIndex((comment) => comment.id == commentId);
  if (commentIndex == -1) {
    return { success: false, msg: "Can't find comment" };
  } else {
    comments[commentIndex].content = content;
    return { success: true, comment: comments[commentIndex] };
  }
};

export const deleteComment = (id) => {
  const commentIndex = comments.findIndex((data) => data.id == id);
  if (commentIndex == -1) {
    return { success: false, msg: "comment not found" };
  } else {
    const deletedcomment = comments.splice(commentIndex, 1);
    return { success: true, comment: deletedcomment };
  }
};
