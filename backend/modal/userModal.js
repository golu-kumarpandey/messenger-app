const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchima = new Schema(
  {
    userName: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
    },
    password: {
      type: String,
      required: [true, "password is requeired"],
    },
    image: {
      type: Object,
      required: [true, "image is required"],
    },
  },
  {
    timestamps: true,
  },
);

userSchima.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchima.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = model("User", userSchima);
module.exports = User;
