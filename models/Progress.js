const mongoose = require("mongoose");
const Progress = mongoose.Schema({
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
  completedAt: {
    type: Date,
    default: Date.now(),
  },
  revisited: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("progress", Progress);