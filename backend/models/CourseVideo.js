const mongoose = require("mongoose");

const CourseVideoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String },
    video: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CourseVideo", CourseVideoSchema);