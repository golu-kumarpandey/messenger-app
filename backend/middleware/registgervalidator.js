const fs = require("fs");
const path = require("path");
const { formidable } = require("formidable");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");

const {
  renameImage,
  emailValidator,
  passwordValidator,
  formatField,
} = require("../utils/helper");

const registerValidator = catchAsync(async (req, res, next) => {
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(new AppError(403, "fomdata  is not valid"));
    }

    const { userName, email, password, confirmPassword } = formatField(fields);

    const { image } = files;
    console.log(image);
    const error = [];

    if (!userName) {
      error.push("please provide username");
    }

    emailValidator(email, error);
    passwordValidator(password, error);

    if (!confirmPassword) {
      error.push("please provide confirmPassword");
    } else if (password && confirmPassword && password !== confirmPassword) {
      error.push("password didin't match");
    }

    if (!image) {
      error.push("please select image");
    }

    if (error.length > 0) {
      return next(new AppError(401, error));
    } else {
      const newImageName = renameImage(image[0]);
      const newPath = path.join(
        __dirname,
        `../../frontend/public/image`,
        newImageName,
      );
      console.log("new path", newPath);
      console.log("filepath", image[0].filepath);

      fs.copyFile(image[0].filepath, newPath, (err) => {
        // if (err) {
        //   return next(new AppError(403, ["image uploaded faild"]));
        // }

        req.body = {
          userName,
          email,
          password,
          image: newImageName,
        };
        next();
      });
    }
  });
});

module.exports = registerValidator;
