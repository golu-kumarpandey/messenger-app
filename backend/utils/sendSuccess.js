const sendSuccess = (
  res,
  statusCode = 200,
  message = "success",
  data = null,
) => {
  return res.status(statusCode).json({
    status: true,
    message,
    ...(data && data),
  });
};

module.exports = sendSuccess;
