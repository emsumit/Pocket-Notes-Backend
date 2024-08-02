const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  noteDate: {
    type: String,
    required: true,
  },
  timestamp: {
    type: String,
    required: true,
  },
});

const groupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    notes: [noteSchema],
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
