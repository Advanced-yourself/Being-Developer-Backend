const MONGO_URL = process.env.MONGO_URL

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = () => {
  mongoose
    .connect(MONGO_URL, {})
    .then(() => {
      console.log("Connected to Mongo successful");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
module.exports = connectDB;
