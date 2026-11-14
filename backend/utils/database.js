const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;
console.log(dbUrl);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbUrl);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(` Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
