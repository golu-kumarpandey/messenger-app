const User = require("../modal/userModal");
const Chat = require("../modal/chatModal");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const createToken = require("../utils/createToken");
const sendSuccess = require("../utils/sendSuccess");
const sendCookies = require("../utils/sendCookies");
const fs = require("fs");
const path = require("path");

const getLastMessage = async (senderId, reciverId) => {
  const msg = await Chat.findOne({
    $or: [
      { senderId: senderId, reciverId: reciverId },
      { senderId: reciverId, reciverId: senderId },
    ],
  }).sort({ createdAt: -1 });

  return msg;
};

const getUnseenCount = async (senderId, reciverId) => {
  const count = await Chat.countDocuments({
    senderId: reciverId,
    reciverId: senderId,
    status: { $ne: "seen" },
  });
  return count;
};

const createUser = catchAsync(async (req, res, next) => {
  const userEmail = await User.findOne({
    email: req.body.email,
  });
  if (userEmail) return next(new AppError(401, ["user already exists"]));

  const userData = await User.create(req.body);

  sendSuccess(res, 201, "user created successfully", { data: userData });
});

const loginUser = async (req, res, next) => {
  const checkUser = await User.findOne({
    email: req.body.email,
  });

  if (!checkUser) return next(new AppError(401, ["inValid user"]));

  const isValidPassword = await checkUser.comparePassword(req.body.password);

  if (!isValidPassword) return next(new AppError(401, ["invalid password"]));

  const authToken = createToken(checkUser);

  sendCookies(res, authToken);
  sendSuccess(res, 200, "login successfully", { token: authToken });
};

const getAllUsers = catchAsync(async (req, res, next) => {
  const userId = req.id;
  const users = await User.find({
    _id: { $ne: userId },
  })
    .select({ __v: 0, password: 0 })
    .lean();

  for (let userObj of users) {
    const lastMessage = await getLastMessage(userId, userObj._id);
    const unseenCount = await getUnseenCount(userId, userObj._id);
    userObj.lastMessage = lastMessage;
    userObj.count = unseenCount;
  }

  sendSuccess(res, 200, "suceess", {
    data: users,
  });
});

const logoutUser = catchAsync(async (req, res, next) => {
  res.clearCoockies("token");
  console.log("user login is working");
  console.log(path);

  sendSuccess(res, 200, "logout success");
});

module.exports = { loginUser, createUser, getAllUsers, logoutUser };
