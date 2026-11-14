const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const Chat = require("../modal/chatModal");
const sendSuccess = require("../utils/sendSuccess");
const { formidable } = require("formidable");
const { formatField, renameImage } = require("../utils/helper");
const path = require("path");
const fs = require("fs");

const createChat = catchAsync(async (req, res, next) => {
  const senderId = req.id;
  const { senderName, reciverId, message } = req.body;

  const chatData = {
    senderId,
    senderName,
    reciverId,
    message: {
      text: message,
      image: "",
    },
  };
  const newChat = await Chat.create(chatData);
  sendSuccess(res, 201, "chat created", {
    data: newChat,
  });
});

const uploadChatImage = catchAsync(async (req, res, next) => {
  console.log("upload chat image function is working");
  const form = formidable({});

  form.parse(req, (err, fields, files) => {
    if (err) {
      return next(new AppError(403, "fomdata  is not valid"));
    }
    const { reciverId, senderName, newImageName } = formatField(fields);
    const { message } = files;
    const image = message[0];
    console.log(newImageName);
    image.originalFilename = newImageName;

    const newPath = path.join(
      __dirname,
      `../../frontend/public/image/${image.originalFilename}`,
    );
    fs.copyFile(image.filepath, newPath, async (err) => {
      if (err) {
        return next(new AppError(400, "image upload fail"));
      }

      const chatDetails = {
        senderId: req.id,
        reciverId,
        senderName,
        message: {
          image: newImageName,
          text: "",
        },
      };

      const newChat = await Chat.create(chatDetails);
      sendSuccess(res, 200, "success", { data: newChat });
    });
  });
});

const getChatById = catchAsync(async (req, res, next) => {
  const senderId = req.id;
  const reciverId = req.params.id;

  const chatData = await Chat.find({
    $or: [
      { senderId: senderId, reciverId: reciverId },
      { senderId: reciverId, reciverId: senderId },
    ],
  });
  sendSuccess(res, 200, "success", { data: chatData });
});

const seenMessage = catchAsync(async (req, res, next) => {
  const messageId = req.body._id;
  const msg = await Chat.findByIdAndUpdate(messageId, { status: "seen" });
  sendScucuess(201, "update message");
});

const seenAllMessage = catchAsync(async (req, res, next) => {
  console.log("seen All message is working backend");

  const senderId = req.id;
  const reciverId = req.body.reciverId;

  const msg = await Chat.updateMany(
    {
      $or: [
        {
          senderId: reciverId,
          reciverId: senderId,
          status: { $ne: "seen" },
        },
        {
          senderId: senderId,
          reciverId: reciverId,
          status: { $ne: "seen" },
        },
      ],
    },
    { status: "seen" },
  );
  sendScucuess(201, "updated all message");
});

const deleveredMessage = catchAsync(async (req, res, next) => {
  const messageId = req.body._id;
  const msg = await Chat.findByIdAndUpdate(messageId, { status: "delevered" });
  sendScucuess(201, "success", { data: msg });
});

module.exports = {
  createChat,
  getChatById,
  uploadChatImage,
  seenMessage,
  deleveredMessage,
  seenAllMessage,
};
