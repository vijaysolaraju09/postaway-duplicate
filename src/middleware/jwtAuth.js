import jwt from "jsonwebtoken";
import { ApplicationError } from "./applicationError.js";

export const verifyAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (token) {
      const payload = jwt.verify(token, "dontshare");
      req.userId = payload.userId;
      next();
    } else {
      throw new ApplicationError("user verification failed", 401);
    }
  } catch (err) {
    next(err);
  }
};
