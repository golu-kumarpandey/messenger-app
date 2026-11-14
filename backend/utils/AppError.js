class AppError extends Error {
  constructor(statusCode, error) {
    super();
    this.statusCode = statusCode || 400;
    this.status = "faild";
    this.error = error || ["someting went wrong"];
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
