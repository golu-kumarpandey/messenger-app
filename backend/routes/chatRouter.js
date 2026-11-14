const { Router } = require("express");
const route = Router();
const {
  createChat,
  getChatById,
  uploadChatImage,
  seenMessage,
  deleveredMessage,
  seenAllMessage,
} = require("../controllers/chatController");
const auth = require("../middleware/auth");

route.post("/create-chat", auth, createChat);
route.get("/get-chat/:id", auth, getChatById);
route.post("/send-image", auth, uploadChatImage);
route.put("/seen-message", auth, seenMessage);
route.put("/delevered-message", auth, deleveredMessage);
route.put("/seen-all-message", auth, seenAllMessage);
module.exports = route;
