const express = require("express");
require("dotenv").config();
const cors = require("cors");
const globalError = require("./utils/globalError");
const cookiesParser = require("cookie-parser");

const app = express();

const userRouter = require("./routes/userRoute");
const chatRouter = require("./routes/chatRouter");

const AppError = require("./utils/AppError");

app.use(cors());
app.use(express.json());
app.use(cookiesParser());

app.use("/api", userRouter);
app.use("/api", chatRouter);
app.use(globalError);

const connectDB = require("../backend/utils/database");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log("server is listining on 3000");
});
