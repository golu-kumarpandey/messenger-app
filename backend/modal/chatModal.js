const { Schema, model } = require("mongoose");
const chatScima = new Schema(
  {
    senderId: {
      type: String,
      required: true,
    },
    reciverId: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    message: {
      text: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: "",
      },
    },
    status: {
      type: String,
      default: "unseen",
    },
  },
  {
    timestamps: true,
  },
);

const Chat = model("Chat", chatScima);

module.exports = Chat;
