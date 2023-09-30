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
