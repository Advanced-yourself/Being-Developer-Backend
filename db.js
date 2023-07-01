// const mongoose = require("mongoose");

const uri =
  "mongodb+srv://anurag:Anurag123@being-developer.dtzod5p.mongodb.net/";
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
    .connect(uri, {})
    .then(() => {
      console.log("Connected to Mongo successful");
    })
    .catch((e) => {
      console.log(e.message);
    });
};
module.exports = connectDB;