
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TopicSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sheetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "sheets",
  },
  questions: {
    type: Number,
    default: 0,
  }
});

module.exports = mongoose.model("topic", TopicSchema);