import { ApplicationError } from "./applicationError.js";
import { logError } from "./logger.middleware.js";

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    logError(err);
    res.status(err.code).json({ success: false, message: err.message });
  } else {
    logError(err);
    res.status(500).json({
      success: false,
      message: "Something went wrong, please try later",
    });
  }
};
