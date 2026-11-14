const jwt = require("jsonwebtoken");
const AppError = require("./AppError");

const createToken = (userDetails = null) => {
  if (!userDetails) throw new AppError(401, ["invalid token"]);
  const payload = {
    id: userDetails._id,
    email: userDetails.email,
    userName: userDetails.userName,
    image: userDetails.image,
    createdAt: userDetails.createdAt,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return token;
};
module.exports = createToken;
