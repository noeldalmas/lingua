// src/models/Lesson.js
const mongoose = require("mongoose");

// Import the Tag model
const Tag = require("./Tag");

// Define the schema for a file
const fileSchema = new mongoose.Schema({
  name: String,
  type: String,
  format: String,
  url: String, // URL of the file in AWS
});

// Define the schema for a lesson
const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // Title is required
    },
    content: {
      type: String,
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course", // Reference to the Course model
      required: false, // Some lessons may not be associated with any course
    },
    language: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Language",
      required: true,
    },
    quizzes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz", // Reference to the Quiz model
      },
    ],
    files: [fileSchema], // Array of files associated with the lesson
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag", // Reference to the Tag model
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  },
  {
    timestamps: true, // This will automatically create and update `createdAt` and `updatedAt`
  }
);

// Export the model for use in other parts of the application
module.exports = mongoose.model("Lesson", lessonSchema);
