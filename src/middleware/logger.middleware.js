import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "request-logging" },
  transports: [
    new winston.transports.File({ filename: "requests.log" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});

export const loggerMiddleware = async (req, res, next) => {
  if (!(req.url.includes("signin") || req.url.includes("signup"))) {
    const logData = `URL: ${req.url} => ${JSON.stringify(req.body)}`;
    logger.info(logData);
  }
  next();
};

export const logError = (err) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    status: err.code || 500,
  });
};
