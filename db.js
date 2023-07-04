// const mongoose = require("mongoose");

const MONGO_URL = process.env.MONGO_URL
// const connectDB = () => {
//   return mongoose.connect(uri, ()=>{
//     console.log("Connected");
//   })
// };

// module.exports = connectDB;

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