const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const auth = (req, res, next) => {
  const token = req.cookies.token;

  if (token) {
    const decode = jwt.decode(token);
    req.id = decode.id;
    next();
  } else {
    next(new AppError(400, ["Please Login"]));
  }
};
module.exports = auth;
