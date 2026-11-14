const validate = require("validator");

const renameImage = (image) => {
  const imageName = image.originalFilename;
  const randomNumber = Math.floor(Math.random() * 9999);
  const newImageName = `${randomNumber}${imageName}`;
  image.originalFilename = newImageName;

  return newImageName;
};

const formatField = (fields) => {
  Object.entries(fields).forEach(([key, value]) => {
    fields[key] = value[0];
  });
  return fields;
};

const emailValidator = (email, error) => {
  if (!email) {
    error.push("please provide your email");
  } else if (email && !validate.isEmail(email)) {
    error.push("please enter valid email");
  }
};

const passwordValidator = (password, error) => {
  if (!password) {
    error.push("please provide your password");
  } else if (password && !validate.isLength(password, { min: 4 })) {
    error.push("passowrd must have 4 char");
  }
};

module.exports = {
  renameImage,
  formatField,
  emailValidator,
  passwordValidator,
};
