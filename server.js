import express from "express";
import userRouter from "./src/features/user/routes/user.route.js";
import postRouter from "./src/features/post/routes/post.route.js";
import likeRouter from "./src/features/like/routes/like.route.js";

import cookieParser from "cookie-parser";
import commentRouter from "./src/features/comment/routes/comment.route.js";
import { loggerMiddleware } from "./src/middleware/logger.middleware.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);

app.use("/api", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments/", commentRouter);
app.use("/api/likes", likeRouter);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
