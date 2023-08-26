
const mongoose = require("mongoose");
const Bookmark = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sheetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sheets",
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "topic",
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "question",
  },
});
module.exports = mongoose.model("Bookmark", Bookmark);