
// const mongoose = require("mongoose");
// const { Schema } = mongoose;


// const NotesSchema = new Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   tag: {
//     type: String,
//     default: "General",
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("notes", NotesSchema);



const mongoose = require("mongoose");
const Note = mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topic",
  },
});

module.exports = mongoose.model("note", Note);
