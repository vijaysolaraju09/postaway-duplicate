class PostSchema {
  constructor(id, userId, caption, imageUrl) {
    this.id = id;
    this.userId = userId;
    this.caption = caption;
    this.imageUrl = imageUrl;
  }
}
const posts = [
  new PostSchema(
    1,
    1,
    "Enjoying the sunny day!",
    "https://example.com/sunny-day.jpg"
  ),
  new PostSchema(2, 2, "My latest artwork", "https://example.com/artwork.jpg"),
  new PostSchema(
    3,
    1,
    "Delicious breakfast!",
    "https://example.com/breakfast.jpg"
  ),
  new PostSchema(
    4,
    3,
    "Traveling to the mountains",
    "https://example.com/mountains.jpg"
  ),
  new PostSchema(5, 4, "Nature is beautiful", "https://example.com/nature.jpg"),
];

export const getAllPosts = () => {
  return posts;
};
export const getPost = (postId) => {
  const post = posts.find((data) => data.id == postId);
  return post;
};
export const getMyPosts = (userId) => {
  const myPosts = posts.filter((data) => data.userId == userId);
  return myPosts;
};
export const addPost = (userId, caption, imageUrl) => {
  if (!userId || !caption || !imageUrl) {
    return { success: false, msg: "provide all the details" };
  } else {
    const post = new PostSchema(posts.length + 1, userId, caption, imageUrl);
    posts.push(post);
    console.log(posts);
    const myPosts = getMyPosts(userId);
    return { success: "success", myPosts: myPosts };
  }
};
export const updatePost = (id, body) => {
  const postIndex = posts.findIndex((data) => data.id == id);
  if (postIndex == -1) {
    return { success: false, msg: "post not found" };
  } else {
    const post = posts[postIndex];
    posts[postIndex] = { ...post, ...body };
    return { success: true, updatedPost: posts };
  }
};
export const deletePost = (id) => {
  const postIndex = posts.findIndex((data) => data.id == id);
  if (postIndex == -1) {
    return { success: false, msg: "post not found" };
  } else {
    const deletedPost = posts.splice(postIndex, 1);
    return { success: true, post: deletedPost };
  }
};
