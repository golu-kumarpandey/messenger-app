const express = require("express");
const route = express.Router();
const {
  loginUser,
  createUser,
  getAllUsers,
  logoutUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");
const registerValidator = require("../middleware/registgervalidator");
const loginvalidator = require("../middleware/loginvalidator");

route.post("/register-user", registerValidator, createUser);
route.post("/login-user", loginvalidator, loginUser);
route.get("/get-friends", auth, getAllUsers);
route.delete("/logout-user", auth, logoutUser);

module.exports = route;
