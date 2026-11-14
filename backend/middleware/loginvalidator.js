const { emailValidator, passwordValidator } = require("../utils/helper");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const loginvalidator = (req, res, next) => {
  const errorMessage = [];
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  emailValidator(email, errorMessage);
  passwordValidator(password, errorMessage);

  if (errorMessage.length > 0) {
    return next(new AppError(401, errorMessage));
  }
  next();
};
module.exports = loginvalidator;
