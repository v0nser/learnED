const mongoose = require("mongoose");

const AllCourseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    Instructor: {
      type: String,
      required: true,
    },
    Duration: {
        type: String,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    ImageURL: {
        type: String,
    },
    VideoURL:{
      type : String,
    },
    category: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AllCourse", AllCourseSchema);
