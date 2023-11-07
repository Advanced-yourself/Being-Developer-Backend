// const MONGO_URL = process.env.MONGO_URL

// const mongoose = require("mongoose");

// mongoose.set("strictQuery", true);

// const connectDB = () => {
//   mongoose
//     .connect(MONGO_URL, {})
//     .then(() => {
//       console.log("Connected to Mongo successful");
//     })
//     .catch((e) => {
//       console.log(e.message);
//     });
// };
// module.exports = connectDB;

const MONGO_URL = process.env.MONGO_URL;
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = () => {
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true, // Use the new URL parser (addressing a deprecation warning)
      useUnifiedTopology: true, // Use the new Server Discovery and Monitoring engine (addressing a deprecation warning)
    })
    .then(() => {
      console.log("Connected to MongoDB successful");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};

module.exports = connectDB;

